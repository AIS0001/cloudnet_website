import { useEffect, useState } from 'react'
import { Search, Phone, Mail, Building2, MessageCircle, FileText, FileSpreadsheet } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import DateRangeFilter from '../../components/staff/DateRangeFilter'
import { apiFetch } from '../../lib/apiClient'
import { exportCustomersToExcel, exportCustomersToPdf } from '../../utils/customerExport'
import { useStaffAuth } from '../../context/StaffAuthContext'

const MAX_EXPORT_PAGES = 40 // safety cap: up to 4000 customers (pageSize 100)

function buildQuery({ search, from, to }) {
  const params = new URLSearchParams()
  if (search) params.set('search', search)
  if (from) params.set('from', from)
  if (to) params.set('to', to)
  return params
}

// The list endpoint is paginated; exporting needs every matching row, so
// this pages through the API until it has them all (or hits the safety cap).
async function fetchAllCustomers(filters) {
  const params = buildQuery(filters)
  params.set('pageSize', '100')

  let all = []
  for (let page = 1; page <= MAX_EXPORT_PAGES; page++) {
    params.set('page', String(page))
    const result = await apiFetch(`/customers?${params.toString()}`, { auth: true })
    all = all.concat(result.customers)
    if (all.length >= result.total || result.customers.length === 0) break
  }
  return all
}

const CustomersList = () => {
  const { staff } = useStaffAuth()
  const isAdmin = staff?.role === 'admin'
  const [customers, setCustomers] = useState([])
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(null)

  const load = async (filters) => {
    setLoading(true)
    setError('')
    try {
      const params = buildQuery(filters)
      const qs = params.toString()
      const result = await apiFetch(`/customers${qs ? `?${qs}` : ''}`, { auth: true })
      setCustomers(result.customers)
    } catch (err) {
      setError(err.message || 'Failed to load customers.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load({ search, from: dateFrom, to: dateTo }) }, [search, dateFrom, dateTo])

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(searchInput)
  }

  const handleDateChange = ({ from, to }) => {
    setDateFrom(from)
    setDateTo(to)
  }

  const handleExport = async (format) => {
    setExporting(format)
    setError('')
    try {
      const filters = { search, from: dateFrom, to: dateTo }
      const all = await fetchAllCustomers(filters)
      if (!all.length) {
        setError('No customers to export.')
        return
      }
      const parts = []
      if (search) parts.push(`search "${search}"`)
      if (dateFrom || dateTo) parts.push(`${dateFrom || 'earliest'} to ${dateTo || 'today'}`)
      if (format === 'pdf') {
        exportCustomersToPdf(all, { subtitle: parts.length ? `Filtered by ${parts.join(', ')}` : undefined })
      } else {
        exportCustomersToExcel(all)
      }
    } catch (err) {
      setError(err.message || 'Export failed.')
    } finally {
      setExporting(null)
    }
  }

  return (
    <StaffLayout title={isAdmin ? 'Customers' : 'My Customers'}>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-md flex-1">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search name, company, phone, email..."
              className="flex-1 px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none"
            />
            <button type="submit" className="bg-primary hover:bg-primary-600 text-white px-4 rounded-lg transition-colors">
              <Search size={18} />
            </button>
          </form>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleExport('pdf')}
              disabled={exporting !== null || customers.length === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText size={16} />
              {exporting === 'pdf' ? 'Exporting...' : 'Export PDF'}
            </button>
            <button
              type="button"
              onClick={() => handleExport('excel')}
              disabled={exporting !== null || customers.length === 0}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-white border-2 border-gray-200 hover:border-primary text-gray-700 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileSpreadsheet size={16} />
              {exporting === 'excel' ? 'Exporting...' : 'Export Excel'}
            </button>
          </div>
        </div>

        <DateRangeFilter from={dateFrom} to={dateTo} onChange={handleDateChange} />
      </div>

      {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 mb-6 text-red-700 text-sm">{error}</div>}

      {loading ? (
        <p className="text-gray-500 text-center py-6">Loading...</p>
      ) : customers.length === 0 ? (
        <p className="text-gray-500 text-center py-6">No customers found.</p>
      ) : (
        <>
          {/* Mobile: card list */}
          <div className="space-y-3 md:hidden">
            {customers.map((c) => (
              <div key={c.id} className="bg-white rounded-xl shadow border-2 border-gray-100 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold">{c.name}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  {c.companyName && <p className="flex items-center gap-2"><Building2 size={14} className="text-gray-400" /> {c.companyName}</p>}
                  {c.phone && <p className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> {c.phone}</p>}
                  {c.email && <p className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {c.email}</p>}
                  {(c.lineId || c.whatsapp) && (
                    <p className="flex items-center gap-2">
                      <MessageCircle size={14} className="text-gray-400" />
                      {[c.lineId && `Line: ${c.lineId}`, c.whatsapp && `WhatsApp: ${c.whatsapp}`].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-2">Collected by {c.collectedBy}</p>
              </div>
            ))}
          </div>

          {/* Desktop / tablet: table */}
          <div className="hidden md:block bg-white rounded-xl shadow border-2 border-gray-100 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-left text-gray-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Line ID</th>
                  <th className="px-4 py-3">WhatsApp</th>
                  <th className="px-4 py-3">Collected By</th>
                  <th className="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{c.companyName || '-'}</td>
                    <td className="px-4 py-3">{c.phone || '-'}</td>
                    <td className="px-4 py-3">{c.email || '-'}</td>
                    <td className="px-4 py-3">{c.lineId || '-'}</td>
                    <td className="px-4 py-3">{c.whatsapp || '-'}</td>
                    <td className="px-4 py-3">{c.collectedBy}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </StaffLayout>
  )
}

export default CustomersList
