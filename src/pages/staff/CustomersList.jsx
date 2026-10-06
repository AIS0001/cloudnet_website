import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Phone, Mail, Building2, MessageCircle, FileText, FileSpreadsheet, Briefcase, Pencil, PhoneCall, Trash2, UserPlus } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import DateRangeFilter from '../../components/staff/DateRangeFilter'
import EditCustomerModal from '../../components/staff/EditCustomerModal'
import { apiFetch } from '../../lib/apiClient'
import { exportCustomersToExcel, exportCustomersToPdf } from '../../utils/customerExport'
import { useStaffAuth } from '../../context/StaffAuthContext'

// wa.me opens WhatsApp Web in a new tab, or the desktop/mobile app if installed.
const waLink = (num) => `https://wa.me/${String(num).replace(/\D/g, '')}`

const WhatsAppLink = ({ number, children }) => number ? (
  <a
    href={waLink(number)} target="_blank" rel="noopener noreferrer"
    className="text-green-600 hover:text-green-700 hover:underline font-medium"
    title="Chat on WhatsApp"
  >
    {children || number}
  </a>
) : '-'

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
  const [editing, setEditing] = useState(null)

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

  const handleDelete = async (c) => {
    if (!window.confirm(`Delete customer "${c.name}"? This also removes their follow-up history and cannot be undone.`)) return
    setError('')
    try {
      await apiFetch(`/customers/${c.id}`, { method: 'DELETE', auth: true })
      setCustomers((list) => list.filter((x) => x.id !== c.id))
    } catch (err) {
      setError(err.message || 'Failed to delete customer.')
    }
  }

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
    <StaffLayout
      title={isAdmin ? 'Customers' : 'My Customers'}
      action={
        <Link to="/staff/customers/new" className="btn-primary inline-flex items-center gap-2 !py-2 !px-4 text-sm">
          <UserPlus size={16} /> Add Customer
        </Link>
      }
    >
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
                  {c.phone && <p className="flex items-center gap-2"><Phone size={14} className="text-gray-400" /> <WhatsAppLink number={c.phone} /></p>}
                  {c.email && <p className="flex items-center gap-2"><Mail size={14} className="text-gray-400" /> {c.email}</p>}
                  {c.lineId && <p className="flex items-center gap-2"><MessageCircle size={14} className="text-gray-400" /> Line: {c.lineId}</p>}
                  {c.whatsapp && <p className="flex items-center gap-2"><MessageCircle size={14} className="text-green-500" /> WhatsApp: <WhatsAppLink number={c.whatsapp} /></p>}
                  {(c.businessType || c.softwareInterested) && (
                    <p className="flex items-center gap-2"><Briefcase size={14} className="text-gray-400" /> {[c.businessType, c.softwareInterested].filter(Boolean).join(' · ')}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400">Collected by {c.collectedBy}</p>
                  <div className="flex items-center gap-4">
                    <Link to={`/staff/follow-ups?customer=${c.id}`} className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
                      <PhoneCall size={14} /> Follow up
                    </Link>
                    <button type="button" onClick={() => setEditing(c)} className="inline-flex items-center gap-1 text-sm text-primary font-semibold">
                      <Pencil size={14} /> Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(c)} className="inline-flex items-center gap-1 text-sm text-red-600 font-semibold">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
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
                  <th className="px-4 py-3">Business Type</th>
                  <th className="px-4 py-3">Software Interested</th>
                  <th className="px-4 py-3">Collected By</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-t border-gray-100">
                    <td className="px-4 py-3 font-medium">{c.name}</td>
                    <td className="px-4 py-3">{c.companyName || '-'}</td>
                    <td className="px-4 py-3"><WhatsAppLink number={c.phone} /></td>
                    <td className="px-4 py-3">{c.email || '-'}</td>
                    <td className="px-4 py-3">{c.lineId || '-'}</td>
                    <td className="px-4 py-3"><WhatsAppLink number={c.whatsapp} /></td>
                    <td className="px-4 py-3">{c.businessType || '-'}</td>
                    <td className="px-4 py-3">{c.softwareInterested || '-'}</td>
                    <td className="px-4 py-3">{c.collectedBy}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <Link to={`/staff/follow-ups?customer=${c.id}`} className="inline-flex items-center gap-1 text-xs font-semibold bg-primary text-white px-3 py-1.5 rounded-lg mr-2 align-middle hover:bg-primary-600">
                        <PhoneCall size={14} /> Follow up
                      </Link>
                      <button type="button" onClick={() => setEditing(c)} title="Edit customer" aria-label="Edit customer" className="text-gray-500 hover:text-primary align-middle">
                        <Pencil size={16} />
                      </button>
                      <button type="button" onClick={() => handleDelete(c)} title="Delete customer" aria-label="Delete customer" className="text-gray-500 hover:text-red-600 align-middle ml-3">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {editing && (
        <EditCustomerModal
          customer={editing}
          onClose={() => setEditing(null)}
          onSaved={() => { setEditing(null); load({ search, from: dateFrom, to: dateTo }) }}
        />
      )}
    </StaffLayout>
  )
}

export default CustomersList
