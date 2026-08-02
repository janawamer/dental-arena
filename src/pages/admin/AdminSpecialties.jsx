import { useState, useEffect } from 'react'
import { Plus, Edit2, Trash2, X, ChevronDown, ChevronRight } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

const EMPTY = { id: '', label: '', icon: '🦷', description: '', sort_order: 0 }

export default function AdminSpecialties() {
  const [specialties, setSpecialties] = useState([])
  const [categories, setCategories] = useState({}) // { specialty_id: [{id, name}] }
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState(null)    // null | 'add' | specialty obj
  const [form, setForm] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [expanded, setExpanded] = useState(null)
  const [newCat, setNewCat] = useState({})   // { specialty_id: string }
  const { addToast } = useToast()

  async function load() {
    const [{ data: specs }, { data: cats }] = await Promise.all([
      supabase.from('specialties').select('*').order('sort_order'),
      supabase.from('specialty_categories').select('*').order('sort_order'),
    ])
    setSpecialties(specs || [])
    const map = {}
    for (const c of cats || []) {
      if (!map[c.specialty_id]) map[c.specialty_id] = []
      map[c.specialty_id].push(c)
    }
    setCategories(map)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  function openAdd() {
    setForm({ ...EMPTY, sort_order: specialties.length })
    setModal('add')
  }

  function openEdit(s) {
    setForm({ id: s.id, label: s.label, icon: s.icon, description: s.description || '', sort_order: s.sort_order })
    setModal(s)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const payload = {
        label: form.label,
        icon: form.icon || '🦷',
        description: form.description || null,
        sort_order: +form.sort_order || 0,
      }
      let error
      if (modal === 'add') {
        const id = form.id.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        if (!id) throw new Error('Specialty ID is required')
        ;({ error } = await supabase.from('specialties').insert({ id, ...payload }))
      } else {
        ;({ error } = await supabase.from('specialties').update(payload).eq('id', modal.id))
      }
      if (error) throw error
      addToast(modal === 'add' ? 'Specialty added!' : 'Specialty updated!', 'success')
      setModal(null)
      load()
    } catch (err) {
      addToast(err.message || 'Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this specialty? Products using it will lose their specialty assignment.')) return
    const { error } = await supabase.from('specialties').delete().eq('id', id)
    if (error) addToast(error.message, 'error')
    else { addToast('Specialty deleted', 'success'); load() }
  }

  async function addCategory(specialtyId) {
    const name = (newCat[specialtyId] || '').trim()
    if (!name) return
    const sortOrder = (categories[specialtyId] || []).length
    const { error } = await supabase.from('specialty_categories').insert({ specialty_id: specialtyId, name, sort_order: sortOrder })
    if (error) addToast(error.message, 'error')
    else {
      setNewCat(n => ({ ...n, [specialtyId]: '' }))
      load()
    }
  }

  async function deleteCategory(catId) {
    const { error } = await supabase.from('specialty_categories').delete().eq('id', catId)
    if (error) addToast(error.message, 'error')
    else load()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Specialties</h1>
          <p className="text-gray-400 text-sm">{specialties.length} specialties with linked categories</p>
        </div>
        <button onClick={openAdd} className="btn-primary gap-2"><Plus size={16} /> Add Specialty</button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40">
          <div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {specialties.map(s => (
            <div key={s.id} className="card overflow-hidden">
              {/* Specialty row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-xl shrink-0 select-none">
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{s.label}</div>
                  <div className="text-xs text-gray-400">
                    {(categories[s.id] || []).length} categories · ID: <code className="bg-gray-100 px-1 rounded">{s.id}</code>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => openEdit(s)} className="p-1.5 text-gray-400 hover:text-arena-blue hover:bg-blue-50 rounded-lg transition-colors" title="Edit">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
                    <Trash2 size={14} />
                  </button>
                  <button
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    title="Manage categories"
                  >
                    {expanded === s.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </button>
                </div>
              </div>

              {/* Categories panel */}
              {expanded === s.id && (
                <div className="border-t border-gray-100 px-4 py-4 bg-gray-50">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Categories</div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(categories[s.id] || []).length === 0 && (
                      <span className="text-sm text-gray-400 italic">No categories yet</span>
                    )}
                    {(categories[s.id] || []).map(cat => (
                      <span key={cat.id} className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1 text-sm text-gray-700">
                        {cat.name}
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors -mr-0.5"
                          title="Remove category"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      value={newCat[s.id] || ''}
                      onChange={e => setNewCat(n => ({ ...n, [s.id]: e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCategory(s.id))}
                      placeholder="New category name…"
                      className="input text-sm flex-1 py-2"
                    />
                    <button onClick={() => addCategory(s.id)} className="btn-primary py-2 px-4 text-sm gap-1">
                      <Plus size={13} /> Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          {!specialties.length && (
            <div className="text-center py-16 text-gray-400">No specialties yet. Add one to get started.</div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-black text-gray-900">{modal === 'add' ? 'Add Specialty' : 'Edit Specialty'}</h2>
              <button onClick={() => setModal(null)} className="p-2 hover:bg-gray-100 rounded-xl"><X size={18} /></button>
            </div>

            <form onSubmit={handleSave} className="p-6 flex flex-col gap-4">
              {modal === 'add' && (
                <div>
                  <label className="block text-sm font-semibold mb-1.5">ID (slug) *</label>
                  <input
                    value={form.id}
                    onChange={e => setForm(f => ({ ...f, id: e.target.value }))}
                    className="input"
                    placeholder="e.g. endodontics or oral-surgery"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">Lowercase letters and hyphens only. Cannot be changed later.</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold mb-1.5">Display Name *</label>
                <input
                  value={form.label}
                  onChange={e => setForm(f => ({ ...f, label: e.target.value }))}
                  className="input"
                  placeholder="e.g. Endodontics"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Icon (emoji)</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-2xl shrink-0 select-none">
                    {form.icon || '🦷'}
                  </div>
                  <input
                    value={form.icon}
                    onChange={e => setForm(f => ({ ...f, icon: e.target.value }))}
                    className="input flex-1"
                    placeholder="Paste an emoji here"
                    maxLength={8}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Description</label>
                <input
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="input"
                  placeholder="Short description shown in the shop"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1.5">Display Order</label>
                <input
                  type="number"
                  value={form.sort_order}
                  onChange={e => setForm(f => ({ ...f, sort_order: e.target.value }))}
                  className="input"
                  min="0"
                  placeholder="0 = first"
                />
              </div>

              <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
                <button type="button" onClick={() => setModal(null)} className="btn-outline">Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
                  {saving ? 'Saving…' : modal === 'add' ? 'Add Specialty' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
