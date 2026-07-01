import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, SlidersHorizontal, Search } from 'lucide-react'
import SubNav from '../components/SubNav'
import ProductCard from '../components/ProductCard'
import TrustBadges from '../components/TrustBadges'
import { specialties, categories, products } from '../data/products'

const SPECIALTY_ICONS = {
  endodontics: '🦷', orthodontics: '😁', restorative: '🔬',
  implantology: '🏥', 'oral-surgery': '⚕️', periodontics: '🩺',
  prosthodontics: '👑', pediatric: '👶', 'infection-control': '🛡️',
  digital: '💻', microscopes: '🔭', all: '⬛',
}

export default function Shop() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''

  const [selectedSpecialty, setSelectedSpecialty] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortBy, setSortBy] = useState('default')
  const [priceMax, setPriceMax] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)

  useEffect(() => {
    if (searchQuery) setSelectedSpecialty('all')
  }, [searchQuery])

  const specialtyProducts = selectedSpecialty
    ? selectedSpecialty === 'all'
      ? products
      : products.filter(p => p.specialty === selectedSpecialty)
    : []

  const filteredProducts = specialtyProducts
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .filter(p => !priceMax || p.price <= Number(priceMax))
    .filter(p => !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
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
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">{SPECIALTY_ICONS[s.id]}</div>
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
                <span className="text-xl">{SPECIALTY_ICONS[selectedSpecialty]}</span>
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
              <span className="text-sm text-gray-500">{filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}</span>
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

            {filteredProducts.length === 0 ? (
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
