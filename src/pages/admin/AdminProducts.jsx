import { useEffect, useState, useRef } from 'react'
import { Plus, Edit2, Trash2, X, Upload, Search } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'
import { specialties as SPECIALTY_LIST } from '../../data/products'

const EMPTY = { name:'', brand:'', specialty:'', category:'', price:'', old_price:'', stock:'', description:'', image_url:'', rating:'', reviews_count:'', is_hot_deal:false, hot_deal_expiry_days:'', is_active:true }

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null) // null | 'add' | product obj
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef()
  const { addToast } = useToast()

  async function load() {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    setProducts(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openAdd() { setForm(EMPTY); setModal('add') }
  function openEdit(p) { setForm({ ...p, price: String(p.price), old_price: String(p.old_price||''), stock: String(p.stock), rating: String(p.rating||''), reviews_count: String(p.reviews_count||''), hot_deal_expiry_days: String(p.hot_deal_expiry_days||'') }); setModal(p) }

  async function handleUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('products').upload(path, file, { upsert: true })
    if (error) { addToast('Image upload failed: ' + error.message, 'error'); setUploading(false); return }
    const { data } = supabase.storage.from('products').getPublicUrl(path)
    setForm(f => ({ ...f, image_url: data.publicUrl }))
    setUploading(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        name: form.name, brand: form.brand, specialty: form.specialty, category: form.category,
        price: +form.price, old_price: form.old_price ? +form.old_price : null,
        stock: +form.stock || 0, description: form.description, image_url: form.image_url || null,
        rating: +form.rating || 0, reviews_count: +form.reviews_count || 0,
        is_hot_deal: form.is_hot_deal, hot_deal_expiry_days: form.is_hot_deal ? +form.hot_deal_expiry_days || null : null,
        is_active: form.is_active,
      }
      let error
      if (modal === 'add') {
        ;({ error } = await supabase.from('products').insert(payload))
      } else {
        ;({ error } = await supabase.from('products').update(payload).eq('id', modal.id))
      }
      if (error) addToast(error.message, 'error')
      else { addToast(modal === 'add' ? 'Product added!' : 'Product updated!', 'success'); setModal(null); load() }
    } catch (err) {
      addToast('Error saving product: ' + (err?.message || 'Unknown error'), 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) addToast(error.message, 'error')
    else { addToast('Product deleted', 'success'); load() }
  }

  async function toggleActive(product) {
    await supabase.from('products').update({ is_active: !product.is_active }).eq('id', product.id)
    load()
  }

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase()) ||
    p.specialty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm">{products.length} total products</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2"><Plus size={16} /> Add Product</button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products…" className="input pl-9 text-sm" />
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Specialty</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url || `https://placehold.co/36x36/e0e7ff/1a3fa3?text=${encodeURIComponent(p.name[0])}`}
                          alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" />
                        <div>
                          <div className="font-semibold text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-400">{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{p.specialty}</td>
                    <td className="px-4 py-3 font-black text-gray-900">EGP {(+p.price).toFixed(0)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold ${p.stock < 5 ? 'text-red-500' : 'text-gray-600'}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleActive(p)} className={`text-xs font-bold px-2 py-0.5 rounded-full transition-all ${p.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.is_active ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-arena-blue hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={14} /></button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filtered.length && <div className="text-center py-12 text-gray-400">No products found</div>}
          </div>
        </div>
      )}

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl my-6 shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-gray-900">{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18} /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold mb-1.5">Product Image</label>
                <div className="flex items-center gap-3">
                  {form.image_url && <img src={form.image_url} alt="Preview" className="w-16 h-16 rounded-xl object-cover bg-gray-100" />}
                  <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
                    className="flex items-center gap-2 btn-outline py-2 px-4 text-sm disabled:opacity-50">
                    <Upload size={14} /> {uploading ? 'Uploading…' : 'Upload Image'}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                  <span className="text-xs text-gray-400">or paste URL below</span>
                </div>
                <input value={form.image_url} onChange={e => setForm(f=>({...f,image_url:e.target.value}))} className="input mt-2 text-sm" placeholder="https://… image URL" />
              </div>

              <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-1.5">Product Name *</label><input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className="input" required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Brand *</label><input value={form.brand} onChange={e=>setForm(f=>({...f,brand:e.target.value}))} className="input" required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Category</label><input value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} className="input" placeholder="e.g. Rotary Files" /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Specialty *</label>
                <select value={form.specialty} onChange={e=>setForm(f=>({...f,specialty:e.target.value}))} className="input" required>
                  <option value="">Select…</option>
                  {SPECIALTY_LIST.filter(s => s.id !== 'all').map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
                </select>
              </div>
              <div><label className="block text-sm font-semibold mb-1.5">Price (EGP) *</label><input type="number" step="0.01" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} className="input" required min="0" /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Old Price (EGP)</label><input type="number" step="0.01" value={form.old_price} onChange={e=>setForm(f=>({...f,old_price:e.target.value}))} className="input" min="0" /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Stock</label><input type="number" value={form.stock} onChange={e=>setForm(f=>({...f,stock:e.target.value}))} className="input" min="0" /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Rating (0–5)</label><input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={e=>setForm(f=>({...f,rating:e.target.value}))} className="input" /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Reviews Count</label><input type="number" value={form.reviews_count} onChange={e=>setForm(f=>({...f,reviews_count:e.target.value}))} className="input" min="0" /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-1.5">Description</label><textarea value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))} className="input h-24 resize-none" /></div>
              <div className="sm:col-span-2 flex items-center gap-6 flex-wrap">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input type="checkbox" checked={form.is_hot_deal} onChange={e=>setForm(f=>({...f,is_hot_deal:e.target.checked}))} /> Hot Deal
                </label>
                {form.is_hot_deal && (
                  <div className="flex items-center gap-2"><label className="text-sm font-semibold">Expiry Days</label><input type="number" value={form.hot_deal_expiry_days} onChange={e=>setForm(f=>({...f,hot_deal_expiry_days:e.target.value}))} className="input w-24" min="1" /></div>
                )}
                <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold">
                  <input type="checkbox" checked={form.is_active} onChange={e=>setForm(f=>({...f,is_active:e.target.checked}))} /> Active (visible in shop)
                </label>
              </div>
              <div className="sm:col-span-2 flex gap-3 justify-end pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setModal(null)} className="btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">{saving ? 'Saving…' : modal === 'add' ? 'Add Product' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
