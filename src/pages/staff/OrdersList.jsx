import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, FileSpreadsheet, ShoppingCart } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import DateRangeFilter from '../../components/staff/DateRangeFilter'
import Pagination from '../../components/staff/Pagination'
import { apiFetch } from '../../lib/apiClient'
import { useStaffAuth } from '../../context/StaffAuthContext'
import { exportOrdersToExcel, exportOrdersToPdf } from '../../utils/orderExport'

const PAGE_SIZE = 25
const MAX_EXPORT_PAGES = 40 // safety cap: up to 4000 orders (pageSize 100)

const statusColors = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-green-100 text-green-700',
  closed: 'bg-gray-200 text-gray-700'
}

function buildQuery({ from, to }) {
  const params = new URLSearchParams()
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  return params
}

async function fetchAllOrders(filters) {
  const params = buildQuery(filters)
  params.set('pageSize', '100')

  let all = []
  for (let page = 1; page <= MAX_EXPORT_PAGES; page++) {
    params.set('page', String(page))
    const result = await apiFetch(`/orders?${params.toString()}`, { auth: true })
    all = all.concat(result.orders)
    if (all.length >= result.total || result.orders.length === 0) break
  }
  return all
}

const OrdersList = () => {
  const { staff } = useStaffAuth()
  const isAdmin = staff?.role === 'admin'
  const [orders, setOrders] = useState([])
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(null)

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError('')
    const params = buildQuery({ from: dateFrom, to: dateTo })
    params.set('page', String(page))
    params.set('pageSize', String(PAGE_SIZE))
    apiFetch(`/orders?${params.toString()}`, { auth: true })
      .then((result) => { setOrders(result.orders); setTotal(result.total) })
      .catch((err) => setError(err.message || 'Failed to load orders.'))
      .finally(() => setLoading(false))
  }, [dateFrom, dateTo, page])

  const handleDateChange = ({ from, to }) => {
    setPage(1)
    setDateFrom(from)
    setDateTo(to)
  }

  const handleExport = async (format) => {
    setExporting(format)
    setError('')
    try {
      const filters = { from: dateFrom, to: dateTo }
      const all = await fetchAllOrders(filters)
      if (!all.length) {
        setError('No orders to export.')
        return
      }
      const subtitle = (dateFrom || dateTo) ? `${dateFrom || 'earliest'} to ${dateTo || 'today'}` : undefined
      if (format === 'pdf') {
        exportOrdersToPdf(all, { subtitle })
      } else {
        exportOrdersToExcel(all)
      }
    } catch (err) {
      setError(err.message || 'Export failed.')
    } finally {
      setExporting(null)
    }
  }

  return (
    <StaffLayout
      title={isAdmin ? 'Orders' : 'My Orders'}
      action={
        <Link to="/staff/orders/new" className="btn-primary inline-flex items-center gap-2 !py-2 !px-4 text-sm">
          <ShoppingCart size={16} /> New Order
        </Link>
      }
    >
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <DateRangeFilter from={dateFrom} to={dateTo} onChange={handleDateChange} />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleExport('pdf')}
              disabled={exporting !== null || orders.length === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText size={16} />
              {exporting === 'pdf' ? 'Exporting...' : 'Export PDF'}
            </button>
            <button
              type="button"
              onClick={() => handleExport('excel')}
              disabled={exporting !== null || orders.length === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet size={16} />
              {exporting === 'excel' ? 'Exporting...' : 'Export Excel'}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>}

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, i) => (
            <div key={order.id} className="bg-white rounded-xl shadow border-2 border-gray-100 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <p className="font-semibold"><span className="text-gray-400 font-normal mr-1">{(page - 1) * PAGE_SIZE + i + 1}.</span>{order.customerName} {order.companyName ? `· ${order.companyName}` : ''}</p>
                  <p className="text-sm text-gray-500">{order.phone} {order.email ? `· ${order.email}` : ''}</p>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                  {order.status}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {order.items.map((item, i) => (
                  <span key={i} className="text-xs bg-orange-50 text-primary px-3 py-1 rounded-full">
                    {item.productName} × {item.quantity}
                  </span>
                ))}
              </div>
              {order.notes && <p className="text-sm text-gray-600 mb-2">{order.notes}</p>}
              <p className="text-xs text-gray-400">
                Placed by {order.staffName} on {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
          <Pagination page={page} pageSize={PAGE_SIZE} total={total} onChange={setPage} />
        </div>
      )}
    </StaffLayout>
  )
}

export default OrdersList
