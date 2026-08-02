import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import SubNav from '../components/SubNav'
import ProductCard from '../components/ProductCard'
import TrustBadges from '../components/TrustBadges'
import { specialties, categories } from '../data/products'
import { supabase } from '../lib/supabase'

const SPECIALTY_EMOJI = {}

const ic = (children) => (
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
    {children}
  </svg>
)

const SPECIALTY_SVG = {
  endodontics: ic(<>
    <path d="M15 9C11 9 8 13 9 19L12 37C12.5 40 14 41 16 41C18 41 19.5 39 20 36L24 27L28 36C28.5 39 30 41 32 41C34 41 35.5 40 36 37L39 19C40 13 37 9 33 9C30 6 18 6 15 9Z"/>
    <line x1="20" y1="18" x2="19" y2="33"/>
    <line x1="28" y1="18" x2="29" y2="33"/>
  </>),

  orthodontics: ic(<>
    <path d="M7 10C5 10 4 13 5 17L7 33C7.5 35 8.5 36 10 36C11.5 36 12.5 35 13 33L14 17C14.5 13 13 10 11 10L7 10Z"/>
    <path d="M17 9C15 9 14 12 14.5 17L16 35C16.5 37 17.5 38 19 38C20.5 38 21.5 37 22 35L23 17C23.5 12 22 9 20 9L17 9Z"/>
    <path d="M28 9C26 9 25 12 25.5 17L27 35C27.5 37 28.5 38 30 38C31.5 38 32.5 37 33 35L34 17C34.5 12 33 9 31 9L28 9Z"/>
    <path d="M39 10C37 10 36 13 36.5 17L38 33C38.5 35 39.5 36 41 36C42.5 36 43.5 35 44 33L45 17C45.5 13 44 10 42 10L39 10Z"/>
    <line x1="4" y1="21" x2="46" y2="21"/>
    <rect x="7" y="19" width="5" height="4" rx="1"/>
    <rect x="17.5" y="19" width="5" height="4" rx="1"/>
    <rect x="27.5" y="19" width="5" height="4" rx="1"/>
    <rect x="38" y="19" width="5" height="4" rx="1"/>
  </>),

  restorative: ic(<>
    <path d="M15 9C11 9 8 13 9 19L12 37C12.5 40 14 41 16 41C18 41 19.5 39 20 36L24 27L28 36C28.5 39 30 41 32 41C34 41 35.5 40 36 37L39 19C40 13 37 9 33 9C30 6 18 6 15 9Z"/>
    <path d="M15 9C18 6 30 6 33 9L36 16H12L15 9Z" fill="currentColor" opacity="0.15"/>
    <path d="M12 16H36" />
  </>),

  implantology: ic(<>
    <path d="M24 6L20 10H28L24 6Z"/>
    <rect x="20" y="10" width="8" height="6" rx="1"/>
    <line x1="24" y1="16" x2="24" y2="42"/>
    <line x1="20" y1="20" x2="24" y2="20"/>
    <line x1="20" y1="24" x2="24" y2="24"/>
    <line x1="20" y1="28" x2="24" y2="28"/>
    <line x1="20" y1="32" x2="24" y2="32"/>
    <line x1="20" y1="36" x2="24" y2="36"/>
    <line x1="28" y1="20" x2="24" y2="20"/>
    <line x1="28" y1="24" x2="24" y2="24"/>
    <line x1="28" y1="28" x2="24" y2="28"/>
    <line x1="28" y1="32" x2="24" y2="32"/>
    <line x1="28" y1="36" x2="24" y2="36"/>
    <ellipse cx="24" cy="42" rx="6" ry="2"/>
  </>),

  'oral-surgery': ic(<>
    <path d="M6 8L18 22M6 22L18 8" strokeWidth="2.5"/>
    <circle cx="12" cy="15" r="3"/>
    <path d="M18 22L26 32C27 33 27 35 26 36L25 37C24 38 22 38 21 37L12 28"/>
    <path d="M26 32L36 36C38 37 40 36 41 34L42 32C43 30 42 28 40 27L32 24"/>
    <path d="M26 36C27 38 26 41 24 42C21 44 18 42 18 39"/>
  </>),

  periodontics: ic(<>
    <path d="M16 10C13 10 10 13 11 19L14 38C14.5 41 16 42 18 42C20 42 21.5 40 22 37L24 28L26 37C26.5 40 28 42 30 42C32 42 33.5 41 34 38L37 19C38 13 35 10 32 10C29 7 19 7 16 10Z"/>
    <path d="M8 20C12 14 20 12 24 14C28 12 36 14 40 20" strokeWidth="1.5" opacity="0.6"/>
    <line x1="42" y1="12" x2="38" y2="38" strokeWidth="1.5"/>
    <circle cx="42" cy="11" r="2.5" fill="currentColor" opacity="0.3"/>
  </>),

  prosthodontics: ic(<>
    <path d="M8 16C8 14 10 12 12 12H36C38 12 40 14 40 16V20H8V16Z"/>
    <path d="M8 20H40"/>
    <path d="M12 20C12 20 11 22 11 26C11 32 13 36 16 36C19 36 20 32 20 28H28C28 32 29 36 32 36C35 36 37 32 37 26C37 22 36 20 36 20"/>
    <line x1="16" y1="20" x2="16" y2="36"/>
    <line x1="32" y1="20" x2="32" y2="36"/>
    <path d="M11 14C11 10 13 8 16 8C19 8 20 10 20 12"/>
    <path d="M28 12C28 10 29 8 32 8C35 8 37 10 37 14"/>
  </>),

  consumables: ic(<>
    <path d="M30 6L34 10L18 26L14 22L30 6Z"/>
    <path d="M34 10L38 14L36 16L32 12L34 10Z"/>
    <path d="M14 22L10 26L8 32L6 38L12 36L18 34L22 30L18 26L14 22Z"/>
    <line x1="8" y1="32" x2="14" y2="26"/>
    <path d="M36 20C36 20 40 22 42 28C44 34 40 42 34 42C28 42 24 38 24 32"/>
    <path d="M36 20C33 18 30 19 28 22"/>
    <path d="M42 28C40 26 38 26 36 28"/>
  </>),

  instruments: ic(<>
    <circle cx="10" cy="12" r="6"/>
    <circle cx="10" cy="12" r="3" fill="currentColor" opacity="0.15"/>
    <line x1="14" y1="16" x2="38" y2="40"/>
    <path d="M36 38L40 34L44 38L40 42L36 38Z"/>
    <line x1="28" y1="6" x2="28" y2="42" strokeWidth="1.5" opacity="0.5"/>
    <line x1="28" y1="6" x2="30" y2="10"/>
    <line x1="28" y1="6" x2="26" y2="10"/>
    <line x1="28" y1="42" x2="26" y2="38"/>
    <line x1="28" y1="42" x2="30" y2="38"/>
  </>),

  bleaching: ic(<>
    <path d="M15 10C11 10 8 14 9 20L12 38C12.5 41 14 42 16 42C18 42 19.5 40 20 37L24 28L28 37C28.5 40 30 42 32 42C34 42 35.5 41 36 38L39 20C40 14 37 10 33 10C30 7 18 7 15 10Z"/>
    <line x1="6" y1="8" x2="8" y2="12"/>
    <line x1="4" y1="14" x2="8" y2="14"/>
    <line x1="6" y1="20" x2="8" y2="16"/>
    <line x1="42" y1="8" x2="40" y2="12"/>
    <line x1="44" y1="14" x2="40" y2="14"/>
    <line x1="42" y1="20" x2="40" y2="16"/>
    <line x1="24" y1="4" x2="24" y2="8"/>
  </>),

  'infection-control': ic(<>
    <path d="M24 5L8 11V24C8 33 15 40 24 43C33 40 40 33 40 24V11L24 5Z"/>
    <line x1="24" y1="17" x2="24" y2="31"/>
    <line x1="17" y1="24" x2="31" y2="24"/>
  </>),

  microscopes: ic(<>
    <rect x="20" y="5" width="8" height="5" rx="1.5"/>
    <line x1="24" y1="10" x2="24" y2="20"/>
    <path d="M18 20H30L28 24H20L18 20Z"/>
    <line x1="24" y1="24" x2="24" y2="32"/>
    <line x1="14" y1="32" x2="34" y2="32"/>
    <rect x="16" y="36" width="16" height="5" rx="2"/>
    <path d="M24 10C24 10 34 10 34 22"/>
    <circle cx="34" cy="22" r="2" fill="currentColor" opacity="0.2"/>
  </>),

  digital: ic(<>
    <rect x="6" y="9" width="36" height="24" rx="2"/>
    <rect x="8" y="11" width="32" height="20" rx="1"/>
    <path d="M4 33H44L42 38H6L4 33Z"/>
    <path d="M19 15C17 15 16 17 16.5 20L18 27C18.5 29 19.5 30 21 30C22.5 30 23.5 29 24 27L24.5 25L25 27C25.5 29 26.5 30 28 30C29.5 30 30.5 29 31 27L32.5 20C33 17 32 15 30 15C28 13.5 21 13.5 19 15Z" strokeWidth="1.4"/>
  </>),

  pediatric: ic(<>
    <path d="M17 12C14 12 12 15 13 19L15 34C15.5 36.5 17 37.5 19 37.5C21 37.5 22.5 36 23 33.5L24 28L25 33.5C25.5 36 27 37.5 29 37.5C31 37.5 32.5 36.5 33 34L35 19C36 15 34 12 31 12C28.5 10 19.5 10 17 12Z"/>
    <circle cx="20" cy="19" r="1.8" fill="currentColor"/>
    <circle cx="28" cy="19" r="1.8" fill="currentColor"/>
    <path d="M20 24Q24 28 28 24"/>
  </>),

  all: ic(<>
    <rect x="6" y="6" width="15" height="15" rx="2"/>
    <rect x="27" y="6" width="15" height="15" rx="2"/>
    <rect x="6" y="27" width="15" height="15" rx="2"/>
    <rect x="27" y="27" width="15" height="15" rx="2"/>
  </>),
}

function SpecialtyIcon({ id }) {
  if (SPECIALTY_EMOJI[id]) {
    return <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{SPECIALTY_EMOJI[id]}</div>
  }
  return (
    <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mb-3 text-indigo-600 group-hover:scale-110 transition-transform group-hover:bg-indigo-100">
      {SPECIALTY_SVG[id] ?? <span className="text-2xl">🦷</span>}
    </div>
  )
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortBy, setSortBy] = useState('default')
  const [priceMax, setPriceMax] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchQuery) setSelectedSpecialty('all')
  }, [searchQuery])

  useEffect(() => {
    if (!selectedSpecialty) return
    setLoading(true)
    setProducts([])

    let query = supabase.from('products').select('*').eq('is_active', true)
    if (selectedSpecialty !== 'all') query = query.eq('specialty', selectedSpecialty)

    query.then(({ data }) => {
      setProducts(data || [])
      setLoading(false)
    })
  }, [selectedSpecialty])

  const filteredProducts = products
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => !priceMax || p.price <= Number(priceMax))
    .filter(p => !searchQuery ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand || '').toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0)
      return 0
    })

  const currentCategories = selectedSpecialty && selectedSpecialty !== 'all'
    ? categories[selectedSpecialty] || []
    : []

  return (
    <div>
      <SubNav />

      {!selectedSpecialty ? (
        <>
          {/* SHOP HERO */}
          <div className="bg-gradient-to-br from-slate-900 to-arena-navy py-14 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute right-0 top-0 w-96 h-96 bg-arena-blue/20 blur-3xl rounded-full" />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Shop by Specialty</h1>
              <p className="text-slate-400">Everything your dental practice needs, all in one arena.</p>
            </div>
          </div>

          {/* SPECIALTY GRID */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {specialties.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpecialty(s.id)}
                  className="card p-5 text-left hover:border-arena-blue hover:scale-[1.02] transition-all duration-200 group"
                >
                  <SpecialtyIcon id={s.id} />
                  <div className="font-bold text-sm text-gray-900 mb-1">{s.label}</div>
                  <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Specialty header */}
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
              <button onClick={() => { setSelectedSpecialty(null); setSelectedCategory(null) }}
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-arena-blue transition-colors">
                <ChevronLeft size={16} /> Back
              </button>
              <span className="text-gray-300">/</span>
              <div className="flex items-center gap-2">
                <span className="text-xl">{SPECIALTY_EMOJI[selectedSpecialty] ?? '🦷'}</span>
                <span className="font-bold text-gray-900">{specialties.find(s => s.id === selectedSpecialty)?.label}</span>
              </div>
              {searchQuery && <span className="text-gray-400 text-sm">• Search: "{searchQuery}"</span>}
            </div>
          </div>

          {/* Category chips */}
          {currentCategories.length > 0 && (
            <div className="bg-gray-50 border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex gap-2 overflow-x-auto hide-scrollbar">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!selectedCategory ? 'bg-arena-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                >
                  All
                </button>
                {currentCategories.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                    className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === selectedCategory ? 'bg-arena-blue text-white' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Filters + Products */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <span className="text-sm text-gray-500">
                {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Max price (EGP)"
                  value={priceMax}
                  onChange={e => setPriceMax(e.target.value)}
                  className="w-40 input py-2 text-sm"
                />
                <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="input py-2 text-sm w-44">
                  <option value="default">Sort: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="w-10 h-10 border-4 border-arena-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400 text-sm">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your filters or search query.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </>
      )}

      <TrustBadges />
    </div>
  )
}
