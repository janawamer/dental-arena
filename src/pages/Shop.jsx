import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, Search } from 'lucide-react'
import SubNav from '../components/SubNav'
import ProductCard from '../components/ProductCard'
import TrustBadges from '../components/TrustBadges'
import { supabase } from '../lib/supabase'
import { useSpecialties } from '../hooks/useSpecialties'
import { renderSpecialtyIcon } from '../lib/specialtyIcons'

function SpecialtyIcon({ iconKey, small = false }) {
  const size = small ? 'w-6 h-6' : 'w-12 h-12 mb-3'
  return (
    <div className={`${size} rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform group-hover:bg-indigo-100 shrink-0`}>
      {renderSpecialtyIcon(iconKey)}
    </div>
  )
}

const ALL_SPECIALTY = { id: 'all', label: 'All Specialties', icon: 'all', description: 'Browse our complete catalog.' }

export default function Shop() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const { specialties, categories, loading: specsLoading } = useSpecialties()

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortBy, setSortBy] = useState('default')
  const [priceMax, setPriceMax] = useState('')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const allSpecialties = [...specialties, ALL_SPECIALTY]

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

  const activeSpecialty = allSpecialties.find(s => s.id === selectedSpecialty)

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
              {specsLoading ? (
                <div className="col-span-full flex justify-center py-16">
                  <div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" />
                </div>
              ) : allSpecialties.map(s => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSpecialty(s.id)}
                  className="card p-5 text-left hover:border-arena-blue hover:scale-[1.02] transition-all duration-200 group"
                >
                  <SpecialtyIcon iconKey={s.icon} />
                  <div className="font-bold text-sm text-gray-900 mb-1">{s.label}</div>
                  <div className="text-xs text-gray-400 leading-relaxed line-clamp-2">{s.description}</div>
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
                <SpecialtyIcon iconKey={activeSpecialty?.icon} small />
                <span className="font-bold text-gray-900">{activeSpecialty?.label}</span>
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
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-gray-300" />
                </div>
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
