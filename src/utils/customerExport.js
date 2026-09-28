import * as XLSX from 'xlsx'
import { printDocument } from './printExport'

const COLUMNS = [
  { key: 'name', label: 'Name' },
  { key: 'companyName', label: 'Company' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'lineId', label: 'Line ID' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'collectedBy', label: 'Collected By' },
  { key: 'createdAt', label: 'Date' }
]

function formatRow(customer) {
  return COLUMNS.map((col) => {
    if (col.key === 'createdAt') return new Date(customer.createdAt).toLocaleDateString('en-GB')
    return customer[col.key] || '-'
  })
}

export function exportCustomersToExcel(customers, filename = 'cloudnet-customers') {
  const rows = customers.map((c) => {
    const row = {}
    COLUMNS.forEach((col, i) => { row[col.label] = formatRow(c)[i] })
    return row
  })

  const sheet = XLSX.utils.json_to_sheet(rows, { header: COLUMNS.map((c) => c.label) })
  sheet['!cols'] = COLUMNS.map(() => ({ wch: 20 }))

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet, 'Customers')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export function exportCustomersToPdf(customers, { subtitle } = {}) {
  printDocument({
    title: 'Customer List',
    subtitle: subtitle || `${customers.length} customer${customers.length === 1 ? '' : 's'}`,
    filename: 'cloudnet-customers',
    sections: [
      {
        type: 'table',
        title: 'Customers',
        headers: COLUMNS.map((c) => c.label),
        rows: customers.map((c) => formatRow(c))
      }
    ]
  })
}
