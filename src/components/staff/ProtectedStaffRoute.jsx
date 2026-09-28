import { Navigate, useLocation } from 'react-router-dom'
import { useStaffAuth } from '../../context/StaffAuthContext'

const ProtectedStaffRoute = ({ children, adminOnly = false }) => {
  const { staff, loading } = useStaffAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    )
  }

  if (!staff) {
    return <Navigate to="/staff/login" state={{ from: location }} replace />
  }

  if (adminOnly && staff.role !== 'admin') {
    return <Navigate to="/staff" replace />
  }

  return children
}

export default ProtectedStaffRoute
