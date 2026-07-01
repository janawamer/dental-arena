import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Package, ChevronRight, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-cyan-100 text-cyan-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('orders')
      .select('*, order_items(product_name, qty, image_url)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => { setOrders(data || []); setLoading(false) })
  }, [user])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>

  if (!orders.length) return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <Package size={48} className="text-gray-300 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-600 mb-2">No orders yet</h2>
      <p className="text-gray-400 mb-6">Your orders will appear here once you place one.</p>
      <Link to="/shop" className="btn-primary">Shop Now</Link>
    </div>
  )

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900 mb-6">My Orders</h1>
      <div className="flex flex-col gap-4">
        {orders.map(order => (
          <Link key={order.id} to={`/orders/${order.id}`}
            className="card p-5 hover:shadow-hover transition-shadow flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <span className="font-mono text-xs text-gray-400">#{order.id.slice(0, 8).toUpperCase()}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>
                  {order.status}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={11} /> {new Date(order.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex gap-1.5 mb-2">
                {order.order_items?.slice(0, 4).map((item, i) => (
                  <img key={i} src={item.image_url || `https://placehold.co/40x40/e0e7ff/1a3fa3?text=${encodeURIComponent((item.product_name||'?')[0])}`}
                    alt={item.product_name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 border border-gray-100" />
                ))}
                {order.order_items?.length > 4 && <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">+{order.order_items.length - 4}</div>}
              </div>
              <div className="text-sm text-gray-500">{order.order_items?.length} item{order.order_items?.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="font-black text-gray-900">EGP {(+order.total).toFixed(2)}</div>
                <div className="text-xs text-gray-400">{order.shipping_city}</div>
              </div>
              <ChevronRight size={18} className="text-gray-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
