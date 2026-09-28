import * as XLSX from 'xlsx'
import { printDocument } from './printExport'

const COLUMNS = [
  { key: 'customerName', label: 'Customer' },
  { key: 'companyName', label: 'Company' },
  { key: 'phone', label: 'Phone' },
  { key: 'products', label: 'Products' },
  { key: 'status', label: 'Status' },
  { key: 'staffName', label: 'Placed By' },
  { key: 'createdAt', label: 'Date' }
]

function formatRow(order) {
  const products = (order.items || [])
    .map((item) => `${item.productName} x${item.quantity}`)
    .join(', ')

  return COLUMNS.map((col) => {
    if (col.key === 'products') return products || '-'
    if (col.key === 'createdAt') return new Date(order.createdAt).toLocaleDateString('en-GB')
    return order[col.key] || '-'
  })
}

export function exportOrdersToExcel(orders, filename = 'cloudnet-orders') {
  const rows = orders.map((o) => {
    const row = {}
    COLUMNS.forEach((col, i) => { row[col.label] = formatRow(o)[i] })
    return row
  })

  const sheet = XLSX.utils.json_to_sheet(rows, { header: COLUMNS.map((c) => c.label) })
  sheet['!cols'] = COLUMNS.map(() => ({ wch: 22 }))

  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet, 'Orders')
  XLSX.writeFile(workbook, `${filename}.xlsx`)
}

export function exportOrdersToPdf(orders, { subtitle } = {}) {
  printDocument({
    title: 'Order List',
    subtitle: subtitle || `${orders.length} order${orders.length === 1 ? '' : 's'}`,
    filename: 'cloudnet-orders',
    sections: [
      {
        type: 'table',
        title: 'Orders',
        headers: COLUMNS.map((c) => c.label),
        rows: orders.map((o) => formatRow(o))
      }
    ]
  })
}
