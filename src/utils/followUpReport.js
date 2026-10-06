import * as XLSX from 'xlsx'
import { printDocument } from './printExport'

export const GROUP_OPTIONS = [
  { value: 'day', label: 'Daily' },
  { value: 'week', label: 'Weekly' },
  { value: 'month', label: 'Monthly' }
]

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1)
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const dayOf = (createdAt) => String(createdAt).slice(0, 10) // server sends 'YYYY-MM-DD HH:MM:SS'

// Monday-based week start, computed in UTC so the date string never shifts.
function weekStart(day) {
  const d = new Date(`${day}T00:00:00Z`)
  const offset = (d.getUTCDay() + 6) % 7
  d.setUTCDate(d.getUTCDate() - offset)
  return d.toISOString().slice(0, 10)
}

export function periodKey(createdAt, groupBy) {
  const day = dayOf(createdAt)
  if (groupBy === 'month') return day.slice(0, 7)
  if (groupBy === 'week') return weekStart(day)
  return day
}

export function periodLabel(key, groupBy) {
  if (groupBy === 'week') return `Week of ${key}`
  return key
}

function tally(rows, keyFn) {
  const map = new Map()
  rows.forEach((r) => {
    const k = keyFn(r)
    if (!map.has(k)) map.set(k, { key: k, count: 0, customers: new Set() })
    const g = map.get(k)
    g.count += 1
    g.customers.add(r.customerId)
  })
  return [...map.values()].map((g) => ({ key: g.key, count: g.count, customers: g.customers.size }))
}

export function buildSummary(rows, groupBy, stages) {
  const byPeriod = tally(rows, (r) => periodKey(r.createdAt, groupBy)).sort((a, b) => (a.key < b.key ? 1 : -1))
  const byStaff = tally(rows, (r) => r.staffName).sort((a, b) => b.count - a.count)
  const stageTally = tally(rows, (r) => r.stage)
  const byStage = stages.map((s) => stageTally.find((t) => t.key === s) || { key: s, count: 0, customers: 0 })

  // staff x period matrix, so admin can compare staff activity per day/week/month
  const periods = [...byPeriod].reverse().map((p) => p.key)
  const staffNames = byStaff.map((s) => s.key)
  const matrix = staffNames.map((name) => ({
    name,
    cells: periods.map((p) => rows.filter((r) => r.staffName === name && periodKey(r.createdAt, groupBy) === p).length)
  }))

  return {
    total: rows.length,
    customers: new Set(rows.map((r) => r.customerId)).size,
    staffCount: byStaff.length,
    byPeriod,
    byStaff,
    byStage,
    periods,
    matrix
  }
}

const DETAIL_HEADERS = ['Date', 'Time', 'Staff', 'Customer', 'Company', 'Phone', 'Business Type', 'Software', 'Stage', 'Note', 'Next Follow-up']

function detailRow(r) {
  const created = String(r.createdAt)
  return [
    created.slice(0, 10), created.slice(11, 16), r.staffName, r.customerName, r.companyName || '-', r.phone || '-',
    r.businessType || '-', r.softwareInterested || '-', cap(r.stage), r.note, r.nextFollowUp || '-'
  ]
}

export function exportFollowUpsToExcel(rows, summary, groupBy, filename = 'cloudnet-follow-up-report') {
  const wb = XLSX.utils.book_new()
  const addSheet = (name, headers, data, widths) => {
    const sheet = XLSX.utils.aoa_to_sheet([headers, ...data])
    sheet['!cols'] = widths.map((wch) => ({ wch }))
    XLSX.utils.book_append_sheet(wb, sheet, name)
  }

  addSheet('All Follow-ups', DETAIL_HEADERS, rows.map(detailRow), [12, 8, 18, 22, 22, 16, 18, 18, 14, 60, 14])
  addSheet('By Period', [cap(groupBy), 'Follow-ups', 'Unique Customers'],
    summary.byPeriod.map((p) => [periodLabel(p.key, groupBy), p.count, p.customers]), [22, 12, 16])
  addSheet('By Staff', ['Staff', 'Follow-ups', 'Unique Customers'],
    summary.byStaff.map((s) => [s.key, s.count, s.customers]), [24, 12, 16])
  addSheet('By Stage', ['Stage', 'Follow-ups', 'Unique Customers'],
    summary.byStage.map((s) => [cap(s.key), s.count, s.customers]), [18, 12, 16])
  addSheet('Staff x Period', ['Staff', ...summary.periods.map((p) => periodLabel(p, groupBy))],
    summary.matrix.map((m) => [m.name, ...m.cells]), [24, ...summary.periods.map(() => 16)])

  XLSX.writeFile(wb, `${filename}.xlsx`)
}

export function exportFollowUpsToPdf(rows, summary, groupBy, subtitle) {
  const countRows = (list, labelFn) => list.map((g) => [esc(labelFn(g)), g.count, g.customers])
  printDocument({
    title: 'Follow-up Report',
    subtitle,
    filename: 'cloudnet-follow-up-report',
    sections: [
      {
        type: 'kpi',
        title: 'Summary',
        items: [
          { label: 'Follow-ups', value: summary.total },
          { label: 'Customers contacted', value: summary.customers },
          { label: 'Active staff', value: summary.staffCount }
        ]
      },
      {
        type: 'table',
        title: `By ${cap(groupBy === 'day' ? 'day' : groupBy)}`,
        headers: [cap(groupBy), 'Follow-ups', 'Customers'],
        rows: countRows(summary.byPeriod, (p) => periodLabel(p.key, groupBy))
      },
      {
        type: 'table',
        title: 'By Staff',
        headers: ['Staff', 'Follow-ups', 'Customers'],
        rows: countRows(summary.byStaff, (s) => s.key)
      },
      {
        type: 'table',
        title: 'By Lead Stage',
        headers: ['Stage', 'Follow-ups', 'Customers'],
        rows: countRows(summary.byStage, (s) => cap(s.key))
      },
      {
        type: 'table',
        title: 'All Follow-ups',
        headers: ['Date', 'Staff', 'Customer', 'Phone', 'Stage', 'Note', 'Next'],
        rows: rows.map((r) => [
          esc(String(r.createdAt).slice(0, 16)), esc(r.staffName), esc(r.customerName + (r.companyName ? ` (${r.companyName})` : '')),
          esc(r.phone || '-'), esc(cap(r.stage)), esc(r.note), esc(r.nextFollowUp || '-')
        ])
      }
    ]
  })
}
