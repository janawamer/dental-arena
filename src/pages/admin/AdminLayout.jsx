import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Package, ShoppingBag, ListChecks, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin',           label: 'Dashboard',   icon: LayoutDashboard, end: true },
  { to: '/admin/products',  label: 'Products',    icon: Package },
  { to: '/admin/orders',    label: 'Orders',      icon: ShoppingBag },
  { to: '/admin/listings',  label: 'Marketplace', icon: ListChecks },
  { to: '/admin/settings',  label: 'Settings',    icon: Settings },
]

export default function AdminLayout() {
  const { signOut, profile } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/signin')
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar — icon-only on small screens, full on lg */}
      <aside className="w-14 sm:w-16 lg:w-60 bg-arena-navy flex flex-col shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="px-3 lg:px-5 py-5 lg:py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-arena-blue to-arena-teal flex items-center justify-center text-base shrink-0">🦷</div>
            <div className="hidden lg:block">
              <div className="text-white font-black text-sm">DENTAL ARENA</div>
              <div className="text-white/40 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2 lg:px-3 py-4 flex flex-col gap-1">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) => `flex items-center gap-2.5 px-2 lg:px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
              title={label}
            >
              <Icon size={16} className="shrink-0" />
              <span className="hidden lg:inline">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-2 lg:px-3 pb-5 border-t border-white/10 pt-4">
          <div className="hidden lg:flex items-center gap-2.5 px-3 py-2 mb-2">
            <div className="w-7 h-7 rounded-full bg-arena-blue flex items-center justify-center text-white text-xs font-bold shrink-0">
              {profile?.full_name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white text-xs font-semibold truncate">{profile?.full_name || 'Admin'}</div>
              <div className="text-white/40 text-xs">Administrator</div>
            </div>
          </div>
          <button onClick={handleSignOut} title="Sign Out"
            className="flex items-center gap-2 px-2 lg:px-3 py-2 text-sm text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all w-full">
            <LogOut size={14} className="shrink-0" />
            <span className="hidden lg:inline">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-auto">
        <Outlet />
      </div>
    </div>
  )
}
