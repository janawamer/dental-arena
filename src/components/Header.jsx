import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ShoppingCart, User, Headphones, Search, Menu, X, LayoutDashboard, Package, LogOut, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { totalItems } = useCart()
  const { isLoggedIn, isAdmin, profile, signOut } = useAuth()
  const [query, setQuery] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`)
      setQuery('')
      setMobileOpen(false)
    }
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img src="/logo.png" alt="Dental Arena" className="h-12 sm:h-14 w-auto object-contain" />
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-lg">
            <div className="flex w-full rounded-full border border-gray-200 bg-gray-50 overflow-hidden focus-within:border-arena-blue focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search products, brands, specialties..."
                className="flex-1 px-5 py-2.5 text-sm bg-transparent outline-none"
              />
              <button type="submit" className="px-4 bg-arena-blue text-white hover:bg-arena-navy transition-colors shrink-0">
                <Search size={16} />
              </button>
            </div>
          </form>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-5 ml-auto">
            {/* Cart */}
            <Link to="/cart" className="relative flex flex-col items-center gap-0.5 text-gray-600 hover:text-arena-blue transition-colors group">
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-arena-blue text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Support */}
            <Link to="/contact" className="flex flex-col items-center gap-0.5 text-gray-600 hover:text-arena-blue transition-colors group">
              <Headphones size={20} className="group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium">Support</span>
            </Link>

            {/* User menu */}
            {isLoggedIn ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-full px-3 py-1.5 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-arena-blue flex items-center justify-center text-white text-xs font-bold">
                    {profile?.full_name?.[0]?.toUpperCase() || '?'}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[80px] truncate">
                    {profile?.full_name?.split(' ')[0] || 'Account'}
                  </span>
                  {isAdmin && <span className="text-[10px] bg-arena-blue text-white px-1.5 py-0.5 rounded-full font-bold">ADMIN</span>}
                  <ChevronDown size={14} className="text-gray-400" />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <div className="text-sm font-semibold text-gray-900 truncate">{profile?.full_name}</div>
                      <div className="text-xs text-gray-400 truncate">{profile?.role}</div>
                    </div>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-arena-blue transition-colors">
                        <LayoutDashboard size={15} /> Admin Dashboard
                      </Link>
                    )}
                    <Link to="/orders" onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <Package size={15} /> My Orders
                    </Link>
                    <div className="border-t border-gray-50 mt-1" />
                    <button onClick={() => { signOut(); setUserMenuOpen(false) }}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/signin" className="btn-primary py-2 px-5 text-sm">Sign In</Link>
            )}
          </nav>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100" onClick={() => setMobileOpen(o => !o)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pb-4 flex flex-col gap-1">
          {[['/', 'Home'], ['/shop', 'Shop'], ['/hot-deals', 'Hot Deals'], ['/marketplace', 'Marketplace'], ['/cart', `Cart (${totalItems})`], ['/contact', 'Contact']].map(([to, label]) => (
            <Link key={to} to={to} onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-arena-blue"
            >{label}</Link>
          ))}
          {isLoggedIn ? (
            <>
              {isAdmin && <Link to="/admin" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 rounded-xl text-sm font-bold text-arena-blue hover:bg-blue-50">Admin Dashboard</Link>}
              <Link to="/orders" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50">My Orders</Link>
              <button onClick={() => { signOut(); setMobileOpen(false) }} className="text-left py-2.5 px-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50">Sign Out</button>
            </>
          ) : (
            <Link to="/signin" onClick={() => setMobileOpen(false)} className="py-2.5 px-3 rounded-xl text-sm font-bold text-arena-blue">Sign In</Link>
          )}
        </div>
      )}
    </header>
  )
}
