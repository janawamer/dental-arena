import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

const STATUSES = ['pending','confirmed','processing','shipped','delivered','cancelled']

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-cyan-100 text-cyan-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(null)
  const { addToast } = useToast()

  async function load() {
    let q = supabase.from('orders').select('*, order_items(product_name, qty)').order('created_at', { ascending: false })
    if (filter !== 'all') q = q.eq('status', filter)
    const { data } = await q
    setOrders(data || [])
    setLoading(false)
  }

  useEffect(() => { setLoading(true); load() }, [filter])

  async function updateStatus(id, status) {
    setUpdating(id)
    const { error } = await supabase.from('orders').update({ status }).eq('id', id)
    if (error) { addToast('Failed to update status', 'error') }
    else { addToast(`Order marked as ${status}`, 'success'); load() }
    setUpdating(null)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-900">All Orders</h1>
          <p className="text-gray-400 text-sm">{orders.length} order{orders.length !== 1 ? 's' : ''} found</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', ...STATUSES].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold capitalize transition-all border ${filter === s ? 'bg-arena-blue text-white border-arena-blue' : 'bg-white text-gray-600 border-gray-200 hover:border-arena-blue'}`}>
            {s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-40"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-500 text-xs font-semibold">
                <tr>
                  <th className="px-4 py-3 text-left">Order</th>
                  <th className="px-4 py-3 text-left">Customer</th>
                  <th className="px-4 py-3 text-left">City</th>
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Update</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-mono text-xs text-gray-400">#{o.id.slice(0,8).toUpperCase()}</td>
                    <td className="px-4 py-3 font-semibold text-gray-900">{o.shipping_name}<div className="text-xs text-gray-400 font-normal">{o.shipping_phone}</div></td>
                    <td className="px-4 py-3 text-gray-600">{o.shipping_city}</td>
                    <td className="px-4 py-3 text-gray-600">{o.order_items?.length} items</td>
                    <td className="px-4 py-3 font-black text-gray-900">EGP {(+o.total).toFixed(0)}</td>
                    <td className="px-4 py-3 text-gray-400">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={o.status}
                        disabled={updating === o.id}
                        onChange={e => updateStatus(o.id, e.target.value)}
                        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white focus:outline-none focus:border-arena-blue disabled:opacity-50"
                      >
                        {STATUSES.map(s => <option key={s} value={s} className="capitalize">{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!orders.length && <div className="text-center py-12 text-gray-400">No orders found</div>}
          </div>
        </div>
      )}
    </div>
  )
}
