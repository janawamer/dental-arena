import { useState } from 'react'
import { Store, Phone, ShoppingCart, X, Plus, Filter } from 'lucide-react'
import SubNav from '../components/SubNav'
import TrustBadges from '../components/TrustBadges'
import { useCart } from '../context/CartContext'
import { listings } from '../data/products'

const ICONS = ['🖥️','🪑','⚙️','🔊','🔭','📱','🧯','🔧']
const COLORS = ['bg-blue-50','bg-green-50','bg-purple-50','bg-orange-50','bg-teal-50','bg-red-50']

export default function Marketplace() {
  const { addToCart } = useCart()
  const [filterCat, setFilterCat]   = useState('')
  const [filterCond, setFilterCond] = useState('')
  const [search, setSearch]         = useState('')
  const [postOpen, setPostOpen]     = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  const categories = [...new Set(listings.map(l => l.category))]

  const filtered = listings.filter(l => {
    return (
      (!filterCat  || l.category  === filterCat)  &&
      (!filterCond || l.condition === filterCond) &&
      (!search     || l.name.toLowerCase().includes(search.toLowerCase()) || l.seller.toLowerCase().includes(search.toLowerCase()))
    )
  })

  function handlePost(e) {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setPostOpen(false) }, 2000)
  }

  return (
    <div>
      <SubNav />

      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 to-teal-600 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-300/10 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                <Store size={24} className="text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white">MARKETPLACE</h1>
            </div>
            <p className="text-green-100 max-w-lg">Buy or sell used dental equipment safely and easily. All sellers verified.</p>
          </div>
          <button
            onClick={() => setPostOpen(true)}
            className="flex items-center gap-2 bg-white text-green-700 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-green-50 transition-colors"
          >
            <Plus size={18} /> Post a Listing
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-3 gap-4 text-center">
          {[['📸','Post Your Item','List equipment with photos & details'],['🤝','Connect with Buyers','Interested buyers contact you directly'],['✅','Safe Transaction','Complete the sale securely']].map(([icon,title,desc]) => (
            <div key={title} className="flex flex-col items-center gap-1">
              <div className="text-2xl mb-1">{icon}</div>
              <div className="font-semibold text-sm text-gray-900">{title}</div>
              <div className="text-xs text-gray-400">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3 flex-wrap">
          <Filter size={15} className="text-gray-400 shrink-0" />
          <div className="relative">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings..." className="input py-2 text-sm w-52" />
          </div>
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="input py-2 text-sm w-44">
            <option value="">All Categories</option>
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filterCond} onChange={e => setFilterCond(e.target.value)} className="input py-2 text-sm w-40">
            <option value="">Any Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <span className="text-sm text-gray-400 ml-auto">{filtered.length} listing{filtered.length !== 1 ? 's' : ''}</span>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((l, i) => (
            <div key={l.id} className="card flex flex-col overflow-hidden group">
              <div className={`h-36 ${COLORS[i % COLORS.length]} flex items-center justify-center text-5xl`}>
                {ICONS[i % ICONS.length]}
              </div>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${l.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                    {l.condition}
                  </span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{l.category}</span>
                </div>
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">{l.name}</h4>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{l.desc}</p>
                <div className="text-base font-black text-green-600 mt-auto">EGP {l.price.toLocaleString()}</div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="text-base">👤</span> {l.seller} · {l.city}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart({ id: l.id, name: l.name, price: l.price, brand: l.seller })}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl transition-colors"
                  >
                    <Phone size={12} /> Contact
                  </button>
                  <button
                    onClick={() => addToCart({ id: l.id, name: l.name, price: l.price, brand: l.seller })}
                    className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                  >
                    <ShoppingCart size={14} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POST MODAL */}
      {postOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={e => e.target === e.currentTarget && setPostOpen(false)}>
          <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-lg font-black text-gray-900">Post a Listing</h2>
              <button onClick={() => setPostOpen(false)} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handlePost} className="p-6 flex flex-col gap-4">
              <div><label className="block text-sm font-semibold mb-1.5">Item Title *</label><input className="input" placeholder="e.g. Dental Chair 2020 Model" required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Category *</label>
                <select className="input" required><option value="">Select category</option>{['Imaging','Dental Chairs','Motors & Handpieces','Sterilization','Microscopes','Scanners','Other'].map(c => <option key={c}>{c}</option>)}</select>
              </div>
              <div><label className="block text-sm font-semibold mb-1.5">Condition *</label>
                <select className="input" required><option value="">Select condition</option>{['New','Used – Like New','Used – Good','Used – Fair'].map(c => <option key={c}>{c}</option>)}</select>
              </div>
              <div><label className="block text-sm font-semibold mb-1.5">Price (EGP) *</label><input className="input" type="number" placeholder="Enter price" required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Description</label><textarea className="input min-h-24 resize-y" placeholder="Describe the item, age, usage, reason for selling..." /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Phone Number *</label><input className="input" type="tel" placeholder="+20 xxx xxx xxxx" required /></div>
              <button type="submit" className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${submitted ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'}`}>
                {submitted ? '✓ Submitted!' : 'Submit Listing'}
              </button>
            </form>
          </div>
        </div>
      )}

      <TrustBadges />
    </div>
  )
}
