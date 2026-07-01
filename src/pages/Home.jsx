import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Flame, Store, Star } from 'lucide-react'
import TrustBadges from '../components/TrustBadges'
import { products } from '../data/products'

const featuredProducts = products.slice(0, 4)

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-arena-navy to-arena-blue min-h-[420px] sm:min-h-[500px] flex items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-80px] right-[-80px] w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-arena-teal/20 blur-3xl" />
          <div className="absolute bottom-[-60px] left-[-60px] w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-blue-500/20 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 grid md:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-arena-teal text-xs font-semibold px-3 py-1.5 rounded-full mb-4 sm:mb-6 border border-white/10">
              <Star size={12} fill="currentColor" /> Egypt's #1 Dental Supply Platform
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-3 sm:mb-4">
              Your Trusted<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-arena-teal to-blue-300">Dental Arena</span><br />
              <span className="text-white/80 text-2xl sm:text-3xl md:text-4xl font-bold">All in One Place.</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
              Shop new products, discover amazing deals, and buy or sell used dental equipment easily.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/shop" className="btn-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5">
                Explore Now <ArrowRight size={16} />
              </Link>
              <Link to="/hot-deals" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base">
                <Flame size={16} className="text-orange-400" /> Hot Deals
              </Link>
            </div>
          </div>

          {/* Hero visual — hidden on small screens */}
          <div className="hidden md:flex justify-center">
            <div className="relative">
              <div className="w-64 lg:w-72 h-64 lg:h-72 rounded-full bg-gradient-to-br from-arena-teal/30 to-blue-400/20 border border-white/10 flex items-center justify-center">
                <div className="w-44 lg:w-52 h-44 lg:h-52 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-7xl lg:text-8xl">
                  🦷
                </div>
              </div>
              {[{emoji:'🔬',pos:'top-4 -left-8'},{emoji:'⚕️',pos:'top-4 -right-8'},{emoji:'💊',pos:'-bottom-4 left-8'},{emoji:'🩺',pos:'-bottom-4 right-8'}].map(({emoji,pos}) => (
                <div key={pos} className={`absolute ${pos} w-12 lg:w-14 h-12 lg:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-xl lg:text-2xl backdrop-blur-sm`}>
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <TrustBadges />

      {/* EXPLORE SECTIONS */}
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">Explore Our Sections</h2>
            <div className="w-12 h-1 bg-arena-blue rounded-full mx-auto mt-3" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {/* Shop */}
            <div className="card overflow-hidden group cursor-pointer" onClick={() => window.location.href='/shop'}>
              <div className="h-2 sm:h-3 bg-gradient-to-r from-arena-blue to-arena-teal" />
              <div className="p-5 sm:p-6">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 flex items-center justify-center mb-3 sm:mb-4">
                  <ShoppingBag size={20} className="text-arena-blue" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-arena-blue mb-1">SHOP</h3>
                <p className="text-gray-500 text-sm mb-4 sm:mb-5">All your dental supplies and equipment from top global brands.</p>
                <div className="h-20 sm:h-28 flex items-center justify-center text-5xl sm:text-6xl bg-blue-50 rounded-xl mb-4 sm:mb-5">🦷</div>
                <Link to="/shop" className="btn-primary w-full justify-center text-sm py-2.5">
                  Browse Products <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Hot Deals */}
            <div className="card overflow-hidden group cursor-pointer" onClick={() => window.location.href='/hot-deals'}>
              <div className="h-2 sm:h-3 bg-gradient-to-r from-orange-400 to-red-400" />
              <div className="p-5 sm:p-6">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 flex items-center justify-center mb-3 sm:mb-4">
                  <Flame size={20} className="text-orange-500" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-orange-500 mb-1">HOT DEALS</h3>
                <p className="text-gray-500 text-sm mb-4 sm:mb-5">Big savings on items near expiry or with special discounts.</p>
                <div className="h-20 sm:h-28 flex items-center justify-center text-5xl sm:text-6xl bg-orange-50 rounded-xl mb-4 sm:mb-5">🔥</div>
                <Link to="/hot-deals" className="btn-orange w-full justify-center text-sm py-2.5">
                  View Hot Deals <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Marketplace */}
            <div className="card overflow-hidden group cursor-pointer" onClick={() => window.location.href='/marketplace'}>
              <div className="h-2 sm:h-3 bg-gradient-to-r from-green-500 to-teal-500" />
              <div className="p-5 sm:p-6">
                <div className="w-11 h-11 rounded-2xl bg-green-50 flex items-center justify-center mb-3 sm:mb-4">
                  <Store size={20} className="text-green-600" />
                </div>
                <h3 className="text-base sm:text-lg font-black text-green-600 mb-1">MARKETPLACE</h3>
                <p className="text-gray-500 text-sm mb-4 sm:mb-5">Buy or sell used dental equipment safely and easily.</p>
                <div className="h-20 sm:h-28 flex items-center justify-center text-5xl sm:text-6xl bg-green-50 rounded-xl mb-4 sm:mb-5">🏥</div>
                <Link to="/marketplace" className="btn-green w-full justify-center text-sm py-2.5">
                  Go to Marketplace <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900">Featured Products</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">Top-rated picks from our catalog</p>
            </div>
            <Link to="/shop" className="btn-outline text-xs sm:text-sm py-1.5 sm:py-2 px-3 sm:px-5">
              View All <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {featuredProducts.map((p, i) => {
              const colors = ['from-blue-50 to-blue-100 text-blue-600','from-purple-50 to-purple-100 text-purple-600','from-green-50 to-green-100 text-green-600','from-orange-50 to-orange-100 text-orange-600']
              const icons = ['🦷','🔬','💊','🩺']
              const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null
              return (
                <div key={p.id} className="card group flex flex-col overflow-hidden">
                  <div className={`relative h-28 sm:h-36 bg-gradient-to-br ${colors[i]} flex items-center justify-center text-3xl sm:text-4xl`}>
                    {icons[i]}
                    {discount && <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">-{discount}%</span>}
                  </div>
                  <div className="p-2.5 sm:p-3 flex flex-col gap-1 flex-1">
                    <div className="text-xs text-arena-teal font-medium truncate">{p.brand}</div>
                    <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">{p.name}</h4>
                    <div className="mt-auto pt-1.5 sm:pt-2 flex items-baseline gap-1 flex-wrap">
                      <span className="text-sm font-black text-arena-blue">EGP {p.price.toLocaleString()}</span>
                      {p.oldPrice && <span className="text-xs text-gray-400 line-through hidden sm:inline">EGP {p.oldPrice.toLocaleString()}</span>}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* SPONSORS BANNER */}
      <section className="bg-gradient-to-r from-arena-navy via-arena-blue to-arena-teal py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl sm:text-3xl shrink-0">🎁</div>
            <div className="text-white">
              <div className="font-black text-base sm:text-lg">Sponsors &amp; Offers</div>
              <div className="text-white/70 text-xs sm:text-sm">Check out amazing offers from our trusted partners.</div>
            </div>
          </div>
          <Link to="/sponsors" className="btn-white flex items-center gap-2 text-sm py-2.5 px-5">
            View Offers <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <TrustBadges />
    </div>
  )
}
