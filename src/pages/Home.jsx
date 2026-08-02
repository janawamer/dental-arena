import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag, Flame, Store, Star } from 'lucide-react'
import TrustBadges from '../components/TrustBadges'
import { supabase } from '../lib/supabase'

const HERO_IMG    = 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=700&h=600&fit=crop&q=80'
const SHOP_IMG    = '/section-shop.png'
const DEALS_IMG   = '/section-hot-deals.png'
const MARKET_IMG  = '/section-marketplace.png'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])

  useEffect(() => {
    supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('rating', { ascending: false })
      .limit(4)
      .then(({ data }) => setFeaturedProducts(data || []))
  }, [])

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
                <Flame size={16} className="text-arena-teal" /> Hot Deals
              </Link>
            </div>
          </div>

          {/* Hero photo */}
          <div className="hidden md:block relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-[4/3]">
              <img src={HERO_IMG} alt="Professional dental clinic" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-arena-navy/40 to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <ShoppingBag size={18} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500">Products Available</div>
                <div className="font-black text-gray-900 text-sm">500+ Items</div>
              </div>
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
              <div className="relative h-52 overflow-hidden bg-white flex items-center justify-center">
                <img src={SHOP_IMG} alt="Dental products" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 p-2" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-arena-navy/80 to-transparent px-4 py-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ShoppingBag size={14} className="text-white" />
                  </div>
                  <span className="font-black text-white text-base">SHOP</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-4">All your dental equipment from top global brands.</p>
                <Link to="/shop" className="btn-primary w-full justify-center text-sm py-2.5">
                  Browse Products <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Hot Deals */}
            <div className="card overflow-hidden group cursor-pointer" onClick={() => window.location.href='/hot-deals'}>
              <div className="h-2 sm:h-3 bg-gradient-to-r from-arena-blue to-arena-teal" />
              <div className="relative h-52 overflow-hidden bg-white flex items-center justify-center">
                <img src={DEALS_IMG} alt="Hot deals" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 p-2" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-arena-navy/80 to-transparent px-4 py-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Flame size={14} className="text-white" />
                  </div>
                  <span className="font-black text-white text-base">HOT DEALS</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-4">Big savings on items near expiry or with special discounts.</p>
                <Link to="/hot-deals" className="btn-primary w-full justify-center text-sm py-2.5">
                  View Hot Deals <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Marketplace */}
            <div className="card overflow-hidden group cursor-pointer" onClick={() => window.location.href='/marketplace'}>
              <div className="h-2 sm:h-3 bg-gradient-to-r from-arena-blue to-arena-teal" />
              <div className="relative h-52 overflow-hidden bg-white flex items-center justify-center">
                <img src={MARKET_IMG} alt="Dental marketplace" className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-500 p-2" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-arena-navy/80 to-transparent px-4 py-3 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Store size={14} className="text-white" />
                  </div>
                  <span className="font-black text-white text-base">MARKETPLACE</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-4">Buy or sell used dental equipment safely and easily.</p>
                <Link to="/marketplace" className="btn-primary w-full justify-center text-sm py-2.5">
                  Go to Marketplace <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {featuredProducts.length > 0 && (
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {featuredProducts.map((p) => {
                const oldPrice = p.old_price || p.oldPrice
                const discount = oldPrice ? Math.round((1 - p.price / oldPrice) * 100) : null
                return (
                  <div key={p.id} className="card group flex flex-col overflow-hidden">
                    <div className="relative h-28 sm:h-40 overflow-hidden bg-gray-100">
                      {p.image_url
                        ? <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        : <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <ShoppingBag size={24} className="text-gray-200" />
                          </div>
                      }
                      {discount && <span className="absolute top-2 right-2 bg-arena-teal text-white text-xs font-bold px-1.5 py-0.5 rounded-full">-{discount}%</span>}
                    </div>
                    <div className="p-2.5 sm:p-3 flex flex-col gap-1 flex-1">
                      <div className="text-xs text-arena-teal font-medium truncate">{p.brand}</div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug">{p.name}</h4>
                      <div className="mt-auto pt-1.5 flex items-baseline gap-1 flex-wrap">
                        <span className="text-sm font-black text-arena-blue">EGP {p.price.toLocaleString()}</span>
                        {oldPrice && <span className="text-xs text-gray-400 line-through hidden sm:inline">EGP {oldPrice.toLocaleString()}</span>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* SPONSORS BANNER */}
      <section className="relative overflow-hidden">
        <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&h=300&fit=crop&q=80"
          alt="Dental clinic" className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-arena-navy/90 via-arena-blue/80 to-arena-teal/70 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 w-full flex-wrap">
            <div className="text-white">
              <div className="font-black text-xl sm:text-2xl mb-1">Sponsors & Exclusive Offers</div>
              <div className="text-white/70 text-sm">Check out amazing offers from our trusted partners.</div>
            </div>
            <Link to="/sponsors" className="btn-white flex items-center gap-2 text-sm py-2.5 px-6">
              View Offers <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <TrustBadges />
    </div>
  )
}
