import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import { CheckCircle, XCircle, Clock } from 'lucide-react'

export default function AdminListings() {
  const [listings, setListings] = useState([])
  const [filter, setFilter] = useState('pending')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const { addToast } = useToast()

  async function load() {
    let q = supabase.from('marketplace_listings').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    const { data } = await q
    setListings(data || [])
    setLoading(false)
  }

  useEffect(() => { setLoading(true); load() }, [filter])

  async function updateStatus(id, status) {
    setUpdating(id)
    const { error } = await supabase.from('marketplace_listings').update({ status }).eq('id', id)
    if (error) addToast('Update failed', 'error')
    else { addToast(`Listing ${status}`, 'success'); load() }
    setUpdating(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Marketplace Listings</h1>
        <p className="text-gray-400 text-sm">Review and approve user-submitted listings</p>
      </div>

      <div className="flex gap-2 mb-6">
        {['pending','active','sold','rejected','all'].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold capitalize transition-all border ${filter === s ? 'bg-arena-blue text-white border-arena-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-arena-blue'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {listings.map(l => (
            <div key={l.id} className="card p-4 flex flex-col gap-3">
              {l.image_url && (
                <img src={l.image_url} alt={l.title} className="w-full h-40 object-cover rounded-xl bg-gray-100" />
              )}
              <div>
                <div className="font-bold text-gray-900">{l.title}</div>
                <div className="text-sm text-gray-400">{l.category} · {l.condition}</div>
                <div className="font-black text-arena-blue text-lg mt-1">EGP {(+l.price).toFixed(0)}</div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="font-semibold">{l.seller_name}</div>
                <div className="text-gray-400">{l.phone} · {l.city}</div>
              </div>
              {l.description && <p className="text-xs text-gray-500 line-clamp-2">{l.description}</p>}
              <div className="text-xs text-gray-400">{new Date(l.created_at).toLocaleDateString()}</div>
              {l.status === 'pending' && (
                <div className="flex gap-2 mt-auto">
                  <button onClick={() => updateStatus(l.id, 'active')} disabled={updating === l.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white text-sm font-bold transition-colors disabled:opacity-50">
                    <CheckCircle size={14} /> Approve
                  </button>
                  <button onClick={() => updateStatus(l.id, 'rejected')} disabled={updating === l.id}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-bold transition-colors disabled:opacity-50">
                    <XCircle size={14} /> Reject
                  </button>
                </div>
              )}
              {l.status !== 'pending' && (
                <div className={`text-xs font-bold px-2 py-1 rounded-full capitalize text-center ${
                  l.status === 'active' ? 'bg-green-100 text-green-700' :
                  l.status === 'sold'   ? 'bg-blue-100 text-blue-700' :
                  'bg-red-100 text-red-700'
                }`}>{l.status}</div>
              )}
            </div>
          ))}
          {!listings.length && <div className="col-span-full text-center py-16 text-gray-400">No listings found</div>}
        </div>
      )}
    </div>
  )
}
