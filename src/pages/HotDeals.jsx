import { useState, useEffect } from 'react'
import { Flame, Clock, ShoppingCart, Filter } from 'lucide-react'
import SubNav from '../components/SubNav'
import TrustBadges from '../components/TrustBadges'
import { useCart } from '../context/CartContext'
import { supabase } from '../lib/supabase'

function Countdown({ expiryDays = 7 }) {
  const end = Date.now() + expiryDays * 86400000
  const [tick, setTick] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const diff = Math.max(0, end - tick)
  const d = Math.floor(diff / 86400000)
  const h = Math.floor(diff / 3600000) % 24
  const m = Math.floor(diff / 60000) % 60
  const s = Math.floor(diff / 1000) % 60
  const pad = n => String(n).padStart(2, '0')

  return (
    <div className="flex items-center gap-1.5 text-xs">
      {[['D', d], ['H', h], ['M', m], ['S', s]].map(([label, val]) => (
        <div key={label} className="flex items-center gap-0.5">
          <span className="bg-arena-navy text-white font-mono font-bold px-2 py-1 rounded-lg text-xs">{pad(val)}</span>
          <span className="text-gray-400 text-[10px]">{label}</span>
        </div>
      ))}
    </div>
  )
}

export default function HotDeals() {
  const { addToCart } = useCart()
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterDiscount, setFilterDiscount] = useState(0)
  const [sortBy, setSortBy] = useState('discount')

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .eq('is_hot_deal', true)
      .then(({ data }) => {
        setDeals(data || [])
        setLoading(false)
      })
  }, [])

  const allCategories = [...new Set(deals.map(d => d.category).filter(Boolean))]

  const filtered = deals
    .filter(d => !filterCategory || d.category === filterCategory)
    .filter(d => {
      const oldPrice = d.old_price || d.oldPrice
      if (!oldPrice) return true
      const pct = Math.round((1 - d.price / oldPrice) * 100)
      return pct >= filterDiscount
    })
    .sort((a, b) => {
      const aOld = a.old_price || a.oldPrice || a.price
      const bOld = b.old_price || b.oldPrice || b.price
      if (sortBy === 'discount') return (1 - b.price / bOld) - (1 - a.price / aOld)
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'expiry') return (a.expiry_days || 7) - (b.expiry_days || 7)
      return 0
    })

  return (
    <div>
      <SubNav />

      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-600 to-red-500 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-300/20 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <Flame size={24} className="text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white">HOT DEALS</h1>
          </div>
          <p className="text-orange-100 max-w-lg">Big savings on items near expiry or with special discounts. Limited time — grab them before they're gone!</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <Filter size={15} className="text-gray-400 shrink-0" />
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="input py-2 text-sm w-44">
            <option value="">All Categories</option>
            {allCategories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filterDiscount} onChange={e => setFilterDiscount(Number(e.target.value))} className="input py-2 text-sm w-40">
            <option value={0}>Any Discount</option>
            <option value={10}>10%+ off</option>
            <option value={20}>20%+ off</option>
            <option value={30}>30%+ off</option>
            <option value={40}>40%+ off</option>
          </select>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input py-2 text-sm w-44">
            <option value="discount">Highest Discount</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="expiry">Expiring Soon</option>
          </select>
          <span className="text-sm text-gray-400 ml-auto">
            {loading ? 'Loading...' : `${filtered.length} deal${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading deals...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Flame size={48} className="text-orange-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">No hot deals right now</h3>
            <p className="text-gray-400 text-sm">Check back soon — the admin adds new deals regularly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((deal) => {
              const oldPrice = deal.old_price || deal.oldPrice
              const discount = oldPrice ? Math.round((1 - deal.price / oldPrice) * 100) : null
              const expiryDays = deal.expiry_days || 7
              return (
                <div key={deal.id} className="card flex flex-col overflow-hidden group">
                  {/* Card image */}
                  <div className="relative h-36 bg-gray-100 overflow-hidden">
                    {deal.image_url
                      ? <img src={deal.image_url} alt={deal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <div className="w-full h-full flex items-center justify-center bg-orange-50">
                          <Flame size={32} className="text-orange-200" />
                        </div>
                    }
                    {discount && (
                      <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    )}
                    <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Clock size={9} /> {expiryDays}d left
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div className="text-xs font-medium text-arena-teal uppercase tracking-wide">{deal.brand}</div>
                    {deal.category && <div className="text-xs text-gray-400 bg-gray-50 rounded-full px-2 py-0.5 w-fit">{deal.category}</div>}
                    <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{deal.name}</h4>

                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-black text-orange-500">EGP {deal.price.toLocaleString()}</span>
                      {oldPrice && <span className="text-xs text-gray-400 line-through">EGP {oldPrice.toLocaleString()}</span>}
                    </div>

                    <Countdown expiryDays={expiryDays} />

                    <button
                      onClick={() => addToCart({ id: deal.id, name: deal.name, price: deal.price, brand: deal.brand, image_url: deal.image_url })}
                      className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
                    >
                      <ShoppingCart size={14} /> Grab Deal
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <TrustBadges />
    </div>
  )
}
