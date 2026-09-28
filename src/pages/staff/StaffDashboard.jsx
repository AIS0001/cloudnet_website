import { Link } from 'react-router-dom'
import { UserPlus, ShoppingCart, Users, ClipboardList } from 'lucide-react'
import StaffLayout from '../../components/staff/StaffLayout'

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
  </StaffLayout>
)

export default StaffDashboard
