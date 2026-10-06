import { useEffect, useMemo, useState } from 'react'
import { Search, FileText, FileSpreadsheet } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import DateRangeFilter from '../../components/staff/DateRangeFilter'
import Pagination from '../../components/staff/Pagination'
import { apiFetch } from '../../lib/apiClient'
import {
  GROUP_OPTIONS, buildSummary, periodLabel, exportFollowUpsToExcel, exportFollowUpsToPdf
} from '../../utils/followUpReport'

const STAGES = ['new', 'contacted', 'interested', 'demo', 'negotiation', 'won', 'lost']
const PAGE_SIZE = 25
const cap =(s) => s.charAt(0).toUpperCase() + s.slice(1)
const fmt = (d) => d.toLocaleDateString('en-CA')

function presetRange(preset) {
  const now = new Date()
  const to = fmt(now)
  if (preset === 'today') return { from: to, to }
  if (preset === 'week') {
    const d = new Date(now)
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7))
    return { from: fmt(d), to }
  }
  if (preset === 'month') return { from: fmt(new Date(now.getFullYear(), now.getMonth(), 1)), to }
  if (preset === 'last30') {
    const d = new Date(now)
    d.setDate(d.getDate() - 29)
    return { from: fmt(d), to }
  }
  return { from: '', to: '' }
}

const PRESETS = [
  ['today', 'Today'], ['week', 'This week'], ['month', 'This month'], ['last30', 'Last 30 days'], ['all', 'All time']
]

const THEMES = {
  slate: { box: 'bg-slate-50 border-slate-200', head: 'bg-slate-100 text-slate-800', th: 'bg-slate-100/70' },
  blue: { box: 'bg-blue-50 border-blue-200', head: 'bg-blue-100 text-blue-800', th: 'bg-blue-100/60' },
  green: { box: 'bg-emerald-50 border-emerald-200', head: 'bg-emerald-100 text-emerald-800', th: 'bg-emerald-100/60' },
  purple: { box: 'bg-purple-50 border-purple-200', head: 'bg-purple-100 text-purple-800', th: 'bg-purple-100/60' },
  amber: { box: 'bg-amber-50 border-amber-200', head: 'bg-amber-100 text-amber-800', th: 'bg-amber-100/60' },
  teal: { box: 'bg-teal-50 border-teal-200', head: 'bg-teal-100 text-teal-800', th: 'bg-teal-100/60' }
}

const STAGE_TEXT = {
  new: 'bg-gray-100 text-gray-700', contacted: 'bg-blue-100 text-blue-700', interested: 'bg-cyan-100 text-cyan-700',
  demo: 'bg-purple-100 text-purple-700', negotiation: 'bg-amber-100 text-amber-700', won: 'bg-green-100 text-green-700', lost: 'bg-red-100 text-red-700'
}

const inputClass = 'px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-primary focus:outline-none bg-white'

const SummaryTable = ({ title, headers, rows, theme }) => (
  <div className={`rounded-xl shadow border-2 overflow-hidden ${THEMES[theme].box}`}>
    <h3 className={`px-4 py-3 font-semibold ${THEMES[theme].head}`}>{title}</h3>
    <div className="overflow-x-auto max-h-80">
      <table className="w-full text-sm">
        <thead className={`text-left text-gray-600 sticky top-0 ${THEMES[theme].th}`}>
          <tr>{headers.map((h, i) => <th key={h} className={`px-4 py-2 ${i > 0 ? 'text-right' : ''}`}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-4 py-4 text-gray-400 text-center">No data</td></tr>
          ) : rows.map((r) => (
            <tr key={r[0]} className="border-t border-white/70">
              {r.map((cell, i) => <td key={i} className={`px-4 py-2 ${i > 0 ? 'text-right' : 'font-medium'}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
)

const FollowUpReports = () => {
  const initial = presetRange('month')
  const [preset, setPreset] = useState('month')
  const [from, setFrom] = useState(initial.from)
  const [to, setTo] = useState(initial.to)
  const [staffId, setStaffId] = useState('')
  const [stage, setStage] = useState('')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [groupBy, setGroupBy] = useState('day')
  const [staffList, setStaffList] = useState([])
  const [rows, setRows] = useState([])
  const [truncated, setTruncated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    apiFetch('/staff', { auth: true }).then((r) => setStaffList(r.staff || [])).catch(() => {})
  }, [])

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      setLoading(true)
      setError('')
      try {
        const params = new URLSearchParams()
        if (from) params.set('from', from)
        if (to) params.set('to', to)
        if (staffId) params.set('staffId', staffId)
        if (stage) params.set('stage', stage)
        if (search) params.set('search', search)
        const r = await apiFetch(`/follow-ups/report?${params.toString()}`, { auth: true })
        if (cancelled) return
        setRows(r.followUps || [])
        setPage(1)
        setTruncated(Boolean(r.truncated))
      } catch (err) {
        if (cancelled) return
        setRows([])
        setError(err.message || 'Failed to load report.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    run()
    return () => { cancelled = true }
  }, [from, to, staffId, stage, search])

  const summary = useMemo(() => buildSummary(rows, groupBy, STAGES), [rows, groupBy])

  const applyPreset = (key) => {
    const range = presetRange(key)
    setPreset(key)
    setFrom(range.from)
    setTo(range.to)
  }

  const subtitle = () => {
    const parts = [`${from || 'earliest'} to ${to || 'today'}`]
    if (staffId) parts.push(`staff: ${staffList.find((s) => String(s.id) === staffId)?.fullName || staffId}`)
    if (stage) parts.push(`stage: ${cap(stage)}`)
    if (search) parts.push(`search "${search}"`)
    return parts.join(' · ')
  }

  const canExport = !loading && rows.length > 0

  return (
    <StaffLayout title="Follow-up Reports">
      <div className="bg-slate-50 rounded-xl shadow border-2 border-slate-200 p-4 mb-6 space-y-3">
        <div className="flex flex-wrap gap-2">
          {PRESETS.map(([key, label]) => (
            <button
              key={key} type="button" onClick={() => applyPreset(key)}
              className={`text-sm font-semibold px-3 py-1.5 rounded-lg border-2 transition-colors ${preset === key ? 'bg-primary border-primary text-white' : 'border-gray-200 text-gray-700 hover:border-primary'}`}
            >{label}</button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <DateRangeFilter from={from} to={to} onChange={({ from: f, to: t }) => { setPreset('custom'); setFrom(f); setTo(t) }} />
          <select value={staffId} onChange={(e) => setStaffId(e.target.value)} className={inputClass}>
            <option value="">All staff</option>
            {staffList.map((s) => <option key={s.id} value={s.id}>{s.fullName}</option>)}
          </select>
          <select value={stage} onChange={(e) => setStage(e.target.value)} className={inputClass}>
            <option value="">All stages</option>
            {STAGES.map((s) => <option key={s} value={s}>{cap(s)}</option>)}
          </select>
          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className={inputClass} aria-label="Group by">
            {GROUP_OPTIONS.map((g) => <option key={g.value} value={g.value}>Group: {g.label}</option>)}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput) }} className="flex gap-2 max-w-md flex-1">
            <input
              type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search customer, company, phone, note..." className={`${inputClass} flex-1`}
            />
            <button type="submit" className="bg-primary hover:bg-primary-600 text-white px-4 rounded-lg"><Search size={18} /></button>
          </form>
          <div className="flex gap-2">
            <button
              type="button" disabled={!canExport}
              onClick={() => exportFollowUpsToPdf(rows, summary, groupBy, subtitle())}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            ><FileText size={16} /> Export PDF</button>
            <button
              type="button" disabled={!canExport}
              onClick={() => exportFollowUpsToExcel(rows, summary, groupBy)}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            ><FileSpreadsheet size={16} /> Export Excel</button>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>}
      {truncated && (
        <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-3 mb-6 text-amber-800 text-sm">
          Showing the latest 10,000 follow-ups only. Narrow the date range for complete figures.
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading...</p>
      ) : error ? null : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[['Follow-ups', summary.total, 'blue'], ['Customers contacted', summary.customers, 'green'], ['Active staff', summary.staffCount, 'purple']].map(([label, value, theme]) => (
              <div key={label} className={`rounded-xl shadow border-2 p-4 ${THEMES[theme].box}`}>
                <p className="text-xs text-gray-600">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-4 mb-6">
            <SummaryTable
              title={`By ${GROUP_OPTIONS.find((g) => g.value === groupBy).label.replace('ly', '').replace('Dai', 'day')}`}
              headers={[cap(groupBy), 'Follow-ups', 'Customers']}
              rows={summary.byPeriod.map((p) => [periodLabel(p.key, groupBy), p.count, p.customers])}
              theme="blue"
            />
            <SummaryTable
              title="By staff" headers={['Staff', 'Follow-ups', 'Customers']}
              rows={summary.byStaff.map((s) => [s.key, s.count, s.customers])}
              theme="green"
            />
            <SummaryTable
              title="By lead stage" headers={['Stage', 'Follow-ups', 'Customers']}
              rows={summary.byStage.map((s) => [cap(s.key), s.count, s.customers])}
              theme="purple"
            />
          </div>

          {summary.matrix.length > 0 && (
            <div className="bg-amber-50 rounded-xl shadow border-2 border-amber-200 overflow-hidden mb-6">
              <h3 className="px-4 py-3 font-semibold bg-amber-100 text-amber-800">Staff activity by {groupBy}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-amber-100/60 text-left text-gray-600">
                    <tr>
                      <th className="px-4 py-2">Staff</th>
                      {summary.periods.map((p) => <th key={p} className="px-4 py-2 text-right whitespace-nowrap">{periodLabel(p, groupBy)}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {summary.matrix.map((m) => (
                      <tr key={m.name} className="border-t border-white/70">
                        <td className="px-4 py-2 font-medium whitespace-nowrap">{m.name}</td>
                        {m.cells.map((n, i) => <td key={i} className={`px-4 py-2 text-right ${n ? '' : 'text-gray-300'}`}>{n}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-teal-50 rounded-xl shadow border-2 border-teal-200 overflow-hidden">
            <h3 className="px-4 py-3 font-semibold bg-teal-100 text-teal-800">All follow-ups ({rows.length})</h3>
            {rows.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No follow-ups in this range.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-teal-100/60 text-left text-gray-600">
                    <tr>
                      {['Date', 'Staff', 'Customer', 'Phone', 'Stage', 'Note', 'Next'].map((h) => <th key={h} className="px-4 py-2">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((r) => (
                      <tr key={r.id} className="border-t border-white/70 align-top">
                        <td className="px-4 py-2 whitespace-nowrap">{String(r.createdAt).slice(0, 16)}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{r.staffName}</td>
                        <td className="px-4 py-2">
                          <p className="font-medium">{r.customerName}</p>
                          {r.companyName && <p className="text-xs text-gray-500">{r.companyName}</p>}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">{r.phone || '-'}</td>
                        <td className="px-4 py-2"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${STAGE_TEXT[r.stage] || STAGE_TEXT.new}`}>{cap(r.stage)}</span></td>
                        <td className="px-4 py-2 min-w-[16rem] whitespace-pre-wrap">{r.note}</td>
                        <td className="px-4 py-2 whitespace-nowrap">{r.nextFollowUp || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Pagination page={page} pageSize={PAGE_SIZE} total={rows.length} onChange={setPage} />
        </>
      )}
    </StaffLayout>
  )
}

export default FollowUpReports
