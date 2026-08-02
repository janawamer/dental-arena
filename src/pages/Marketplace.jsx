import { useState, useEffect } from 'react'
import { Store, Phone, ShoppingCart, X, Plus, Filter, Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import SubNav from '../components/SubNav'
import TrustBadges from '../components/TrustBadges'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function Marketplace() {
  const { addToCart } = useCart()
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filterCat, setFilterCat]   = useState('')
  const [filterCond, setFilterCond] = useState('')
  const [search, setSearch]         = useState('')
  const [postOpen, setPostOpen]     = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [posting, setPosting]       = useState(false)

  useEffect(() => {
    supabase
      .from('marketplace_listings')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setListings(data || [])
        setLoading(false)
      })
  }, [])

  const allCategories = [...new Set(listings.map(l => l.category).filter(Boolean))]

  const filtered = listings.filter(l => {
    const title = l.title || ''
    const seller = l.seller_name || ''
    return (
      (!filterCat  || l.category  === filterCat)  &&
      (!filterCond || l.condition === filterCond) &&
      (!search     || title.toLowerCase().includes(search.toLowerCase()) || seller.toLowerCase().includes(search.toLowerCase()))
    )
  })

  function openPost() {
    if (!user) { navigate('/signin'); return }
    setPostOpen(true)
  }

  async function handlePost(e) {
    e.preventDefault()
    setPosting(true)
    const fd = new FormData(e.target)
    const { error } = await supabase.from('marketplace_listings').insert({
      user_id: user.id,
      seller_name: profile?.full_name || fd.get('seller_name'),
      title: fd.get('title'),
      category: fd.get('category'),
      condition: fd.get('condition'),
      price: Number(fd.get('price')),
      description: fd.get('description'),
      phone: fd.get('phone'),
      status: 'pending',
    })
    setPosting(false)
    if (!error) {
      setSubmitted(true)
      setTimeout(() => { setSubmitted(false); setPostOpen(false) }, 2000)
    }
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
            onClick={openPost}
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
            {allCategories.map(c => <option key={c}>{c}</option>)}
          </select>
          <select value={filterCond} onChange={e => setFilterCond(e.target.value)} className="input py-2 text-sm w-40">
            <option value="">Any Condition</option>
            <option>New</option>
            <option>Used</option>
          </select>
          <span className="text-sm text-gray-400 ml-auto">
            {loading ? 'Loading...' : `${filtered.length} listing${filtered.length !== 1 ? 's' : ''}`}
          </span>
        </div>
      </div>

      {/* Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400 text-sm">Loading listings...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Package size={48} className="text-gray-200 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700 mb-2">No listings found</h3>
            <p className="text-gray-400 text-sm">Be the first to post equipment for sale.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((l) => {
              const title = l.title || 'Untitled'
              const seller = l.seller_name || 'Verified Seller'
              return (
                <div key={l.id} className="card flex flex-col overflow-hidden group">
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    {l.image_url
                      ? <img src={l.image_url} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-teal-50">
                          <Store size={32} className="text-green-200" />
                        </div>
                    }
                  </div>
                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <div className="flex gap-2 flex-wrap">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${l.condition === 'New' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                        {l.condition}
                      </span>
                      {l.category && <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{l.category}</span>}
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">{title}</h4>
                    {l.description && <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{l.description}</p>}
                    <div className="text-base font-black text-green-600 mt-auto">EGP {l.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">{seller}{l.city ? ` · ${l.city}` : ''}</div>
                    <div className="flex gap-2">
                      {l.phone && (
                        <a
                          href={`tel:${l.phone}`}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-xl transition-colors"
                        >
                          <Phone size={12} /> Contact
                        </a>
                      )}
                      <button
                        onClick={() => addToCart({ id: l.id, name: title, price: l.price, brand: seller, image_url: l.image_url })}
                        className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
                      >
                        <ShoppingCart size={14} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
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
              <div>
                <label className="block text-sm font-semibold mb-1.5">Item Title *</label>
                <input name="title" className="input" placeholder="e.g. Dental Chair 2020 Model" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Category *</label>
                <select name="category" className="input" required>
                  <option value="">Select category</option>
                  {['Imaging','Dental Chairs','Motors & Handpieces','Sterilization','Microscopes','Scanners','Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Condition *</label>
                <select name="condition" className="input" required>
                  <option value="">Select condition</option>
                  {['New','Used – Like New','Used – Good','Used – Fair'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Price (EGP) *</label>
                <input name="price" className="input" type="number" placeholder="Enter price" required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Description</label>
                <textarea name="description" className="input min-h-24 resize-y" placeholder="Describe the item, age, usage, reason for selling..." />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1.5">Phone Number *</label>
                <input name="phone" className="input" type="tel" placeholder="+20 xxx xxx xxxx" required />
              </div>
              {!profile?.full_name && (
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Your Name *</label>
                  <input name="seller_name" className="input" placeholder="Your full name" required />
                </div>
              )}
              <p className="text-xs text-gray-400">Your listing will be reviewed by our team before it goes live.</p>
              <button type="submit" disabled={posting || submitted} className={`w-full py-3 rounded-xl font-bold text-white transition-colors ${submitted ? 'bg-green-500' : 'bg-green-600 hover:bg-green-700'}`}>
                {submitted ? '✓ Submitted for Review!' : posting ? 'Submitting...' : 'Submit Listing'}
              </button>
            </form>
          </div>
        </div>
      )}

      <TrustBadges />
    </div>
  )
}
