import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Users, ClipboardList, UserPlus, ShoppingCart, ShieldCheck, LayoutDashboard, KeyRound } from 'lucide-react'
import { useStaffAuth } from '../../context/StaffAuthContext'

const StaffLayout = ({ title, children }) => {
  const { staff, logout } = useStaffAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const confirmLogout = () => {
    logout()
    navigate('/staff/login')
  }

  const navItems = [
    { to: '/staff', label: 'Dashboard', shortLabel: 'Home', icon: LayoutDashboard, end: true },
    { to: '/staff/customers/new', label: 'Add Customer', shortLabel: 'Add', icon: UserPlus },
    { to: '/staff/customers', label: 'Customers', shortLabel: 'List', icon: Users },
    { to: '/staff/orders/new', label: 'Place Order', shortLabel: 'New', icon: ShoppingCart },
    { to: '/staff/orders', label: 'Orders', shortLabel: 'Orders', icon: ClipboardList }
  ]

  if (staff?.role === 'admin') {
    navItems.push({ to: '/staff/team', label: 'Team', shortLabel: 'Team', icon: ShieldCheck })
  }

  const isActive = (item) => (item.end ? location.pathname === item.to : location.pathname.startsWith(item.to))

  return (
    <div className="min-h-[70vh] bg-gray-50 pb-16 sm:pb-0 overflow-x-hidden">
      <div className="bg-gray-900 text-white sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-gray-400 leading-none mb-1">CloudNet Field App</p>
            <p className="font-semibold text-sm sm:text-base truncate">
              {staff?.full_name} <span className="text-xs text-gray-400">({staff?.role})</span>
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              to="/staff/change-password"
              title="Change password"
              aria-label="Change password"
              className="inline-flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <KeyRound size={16} /> <span className="hidden sm:inline">Password</span>
            </Link>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="inline-flex items-center gap-2 text-sm bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={16} /> <span className="hidden sm:inline">Log out</span>
            </button>
          </div>
        </div>

        {/* Desktop / tablet nav */}
        <div className="hidden sm:flex container mx-auto px-4 pb-3 flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg transition-colors ${
                isActive(item) ? 'bg-primary text-white' : 'bg-gray-800/60 hover:bg-gray-800'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 sm:py-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-5 sm:mb-6">{title}</h1>
        {children}
      </div>

      {/* Mobile bottom tab bar — app-style navigation */}
      <nav className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-gray-900 border-t border-gray-800 flex w-full overflow-x-hidden">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex-1 min-w-0 basis-0 flex flex-col items-center justify-center gap-1 py-2 px-1 text-[10px] leading-tight transition-colors ${
                active ? 'text-primary' : 'text-gray-400'
              }`}
            >
              <item.icon size={19} className="flex-shrink-0" />
              <span className="truncate max-w-full">{item.shortLabel}</span>
            </Link>
          )
        })}
      </nav>

      {showLogoutConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowLogoutConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold mb-2">Log out?</h2>
            <p className="text-gray-600 text-sm mb-6">You'll need to log in again to access the field app.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors"
              >
                <LogOut size={16} /> Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StaffLayout
