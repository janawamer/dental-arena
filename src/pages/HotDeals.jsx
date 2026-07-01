import { useState, useEffect } from 'react'
import { Flame, Clock, ShoppingCart, Filter } from 'lucide-react'
import SubNav from '../components/SubNav'
import TrustBadges from '../components/TrustBadges'
import { useCart } from '../context/CartContext'
import { hotDeals } from '../data/products'

function Countdown({ expiryDays }) {
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
  const [filterCategory, setFilterCategory] = useState('')
  const [filterDiscount, setFilterDiscount] = useState(0)
  const [sortBy, setSortBy] = useState('discount')

  const categories = [...new Set(hotDeals.map(d => d.category))]

  const filtered = hotDeals
    .filter(d => !filterCategory || d.category === filterCategory)
    .filter(d => {
      const pct = Math.round((1 - d.price / d.oldPrice) * 100)
      return pct >= filterDiscount
    })
    .sort((a, b) => {
      if (sortBy === 'discount') return (1 - b.price / b.oldPrice) - (1 - a.price / a.oldPrice)
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'expiry') return a.expiryDays - b.expiryDays
      return 0
    })

  const ICONS = ['🦷','🔬','🧤','😁','💊','🩺','😷','💉','⚗️','🔧','🌸','🧴']
  const COLORS = ['bg-blue-50','bg-purple-50','bg-green-50','bg-orange-50','bg-teal-50','bg-red-50']

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
            {categories.map(c => <option key={c}>{c}</option>)}
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
          <span className="text-sm text-gray-400 ml-auto">{filtered.length} deal{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((deal, i) => {
            const discount = Math.round((1 - deal.price / deal.oldPrice) * 100)
            const icon = ICONS[i % ICONS.length]
            const bgColor = COLORS[i % COLORS.length]
            return (
              <div key={deal.id} className="card flex flex-col overflow-hidden group">
                {/* Card image */}
                <div className={`relative h-36 ${bgColor} flex items-center justify-center text-5xl`}>
                  {icon}
                  <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                    -{discount}%
                  </span>
                  <span className="absolute top-3 left-3 bg-red-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock size={9} /> {deal.expiryDays}d left
                  </span>
                </div>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="text-xs font-medium text-arena-teal uppercase tracking-wide">{deal.brand}</div>
                  <div className="text-xs text-gray-400 bg-gray-50 rounded-full px-2 py-0.5 w-fit">{deal.category}</div>
                  <h4 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2">{deal.name}</h4>

                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-black text-orange-500">EGP {deal.price.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 line-through">EGP {deal.oldPrice.toLocaleString()}</span>
                  </div>

                  <Countdown expiryDays={deal.expiryDays} />

                  <button
                    onClick={() => addToCart({ id: deal.id, name: deal.name, price: deal.price, brand: deal.brand })}
                    className="mt-auto w-full flex items-center justify-center gap-2 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <ShoppingCart size={14} /> Grab Deal
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <TrustBadges />
    </div>
  )
}
