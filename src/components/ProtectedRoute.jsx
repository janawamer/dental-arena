import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>
  if (!isLoggedIn) return <Navigate to="/signin" state={{ from: location }} replace />
  return children
}

export function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth()
  const location = useLocation()
  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>
  if (!isLoggedIn) return <Navigate to="/signin" state={{ from: location }} replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}
