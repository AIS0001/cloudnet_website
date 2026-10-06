import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, ShoppingCart, Users, ClipboardList, PhoneCall } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'
import { apiFetch } from '../../lib/apiClient'

const cards = [
  {
    to: '/staff/customers/new',
    icon: <UserPlus size={28} />,
    title: 'Add Customer',
    description: 'Collect a new lead\'s contact details in the field.'
  },
  {
    to: '/staff/orders/new',
    icon: <ShoppingCart size={28} />,
    title: 'Place Order',
    description: 'Record what a customer wants to buy (paper roll, POS machine, etc.).'
  },
  {
    to: '/staff/customers',
    icon: <Users size={28} />,
    title: 'View Customers',
    description: 'Browse everyone collected so far.'
  },
  {
    to: '/staff/orders',
    icon: <ClipboardList size={28} />,
    title: 'View Orders',
    description: 'Track orders placed by the whole team.'
  }
]

const today = () => new Date().toLocaleDateString('en-CA')
const DUE_LIMIT = 10

// Customers whose next follow-up date is today or earlier (the API scopes this to the logged-in staff).
const DueFollowUps = () => {
  const [customers, setCustomers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    apiFetch(`/follow-ups?due=1&page=1&pageSize=${DUE_LIMIT}`, { auth: true })
      .then((r) => { setCustomers(r.customers || []); setTotal(r.total || 0) })
      .catch((err) => setError(err.message || 'Failed to load follow-ups.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <PhoneCall size={20} className="text-primary" /> Follow-ups due
          {total > 0 && <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{total}</span>}
        </h2>
        <Link to="/staff/follow-ups" className="text-sm text-primary font-semibold">View all</Link>
      </div>

      {error && <div className="bg-red-50 border-2 border-red-500 rounded-xl p-3 text-red-700 text-sm">{error}</div>}
      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : !error && customers.length === 0 ? (
        <p className="text-gray-500 text-sm bg-white border-2 border-gray-100 rounded-xl p-4">No follow-ups due today. You're all caught up.</p>
      ) : (
        <div className="space-y-2">
          {customers.map((c) => {
            const overdue = c.nextFollowUp < today()
            return (
              <Link
                key={c.id}
                to={`/staff/follow-ups?customer=${c.id}`}
                className="bg-white border-2 border-gray-100 rounded-xl p-4 flex items-center justify-between gap-3 hover:border-primary transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-semibold truncate">{c.name}</p>
                  <p className="text-sm text-gray-500 truncate">{[c.companyName, c.phone].filter(Boolean).join(' · ') || '-'}</p>
                </div>
                <span className={`text-xs font-semibold whitespace-nowrap px-2 py-1 rounded-full ${overdue ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                  {overdue ? 'Overdue' : 'Today'} · {c.nextFollowUp}
                </span>
              </Link>
            )
          })}
          {total > customers.length && (
            <Link to="/staff/follow-ups" className="block text-center text-sm text-primary font-semibold pt-1">
              +{total - customers.length} more
            </Link>
          )}
        </div>
      )}
    </section>
  )
}

const StaffDashboard = () => (
  <StaffLayout title="Dashboard">
    <div className="grid sm:grid-cols-2 gap-6">
      {cards.map((card) => (
        <Link
          key={card.to}
          to={card.to}
          className="bg-white border-2 border-gray-100 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all duration-300 group"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 text-primary rounded-full mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
            {card.icon}
          </div>
          <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
          <p className="text-gray-600 text-sm">{card.description}</p>
        </Link>
      ))}
    </div>
    <DueFollowUps />
  </StaffLayout>
)

export default StaffDashboard
