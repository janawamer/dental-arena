import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle, Clock, Truck, Package, XCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

const STEPS = [
  { key: 'pending',    label: 'Order Placed',   icon: Clock },
  { key: 'confirmed',  label: 'Confirmed',       icon: CheckCircle },
  { key: 'processing', label: 'Processing',      icon: Package },
  { key: 'shipped',    label: 'Shipped',         icon: Truck },
  { key: 'delivered',  label: 'Delivered',       icon: CheckCircle },
]

const STATUS_ORDER = ['pending','confirmed','processing','shipped','delivered']

export default function OrderDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [order, setOrder] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: o } = await supabase.from('orders').select('*').eq('id', id).eq('user_id', user.id).single()
      const { data: i } = await supabase.from('order_items').select('*').eq('order_id', id)
      setOrder(o)
      setItems(i || [])
      setLoading(false)
    }
    if (user) load()
  }, [id, user])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>
  if (!order) return <div className="text-center py-20 text-gray-500">Order not found.</div>

  const currentStep = STATUS_ORDER.indexOf(order.status)
  const isCancelled = order.status === 'cancelled'

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link to="/orders" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-arena-blue mb-6">
        <ArrowLeft size={15} /> Back to Orders
      </Link>

      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-gray-900">Order #{order.id.slice(0,8).toUpperCase()}</h1>
          <p className="text-sm text-gray-400">{new Date(order.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' })}</p>
        </div>
        <span className={`text-sm font-bold px-3 py-1 rounded-full capitalize ${isCancelled ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
          {order.status}
        </span>
      </div>

      {/* Status tracker */}
      {!isCancelled && (
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
            <div className="absolute top-5 left-0 h-0.5 bg-arena-blue transition-all" style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }} />
            {STEPS.map((step, i) => {
              const Icon = step.icon
              const done = i <= currentStep
              return (
                <div key={step.key} className="flex flex-col items-center gap-1 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${done ? 'bg-arena-blue border-arena-blue text-white' : 'bg-white border-gray-200 text-gray-300'}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-xs font-semibold text-center leading-tight ${done ? 'text-arena-blue' : 'text-gray-400'}`}>{step.label}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}
      {isCancelled && (
        <div className="card p-4 mb-6 flex items-center gap-3 bg-red-50 border border-red-100">
          <XCircle size={20} className="text-red-500 shrink-0" />
          <span className="text-sm text-red-700 font-semibold">This order has been cancelled.</span>
        </div>
      )}

      {/* Items */}
      <div className="card p-6 mb-6">
        <h2 className="font-bold text-gray-900 mb-4">Items Ordered</h2>
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-4 items-center">
              <img src={item.image_url || `https://placehold.co/60x60/e0e7ff/1a3fa3?text=${encodeURIComponent((item.product_name||'?')[0])}`}
                alt={item.product_name} className="w-14 h-14 rounded-xl object-cover bg-gray-100 shrink-0" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900">{item.product_name}</div>
                <div className="text-sm text-gray-400">{item.product_brand} · x{item.qty}</div>
              </div>
              <div className="font-black text-gray-900">EGP {(item.price * item.qty).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary + Shipping */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">Shipping Details</h2>
          <div className="text-sm text-gray-600 space-y-1">
            <div className="font-semibold text-gray-900">{order.shipping_name}</div>
            <div>{order.shipping_phone}</div>
            <div>{order.shipping_address}</div>
            <div>{order.shipping_city}</div>
            {order.notes && <div className="text-gray-400 text-xs pt-1">{order.notes}</div>}
          </div>
        </div>
        <div className="card p-5">
          <h2 className="font-bold text-gray-900 mb-3 text-sm">Payment Summary</h2>
          <div className="text-sm space-y-1.5">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>EGP {(+order.subtotal).toFixed(2)}</span></div>
            {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-EGP {(+order.discount).toFixed(2)}</span></div>}
            <div className="flex justify-between text-gray-600"><span>Tax</span><span>EGP {(+order.tax).toFixed(2)}</span></div>
            <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-100">
              <span>Total</span><span>EGP {(+order.total).toFixed(2)}</span>
            </div>
            <div className="text-xs text-gray-400 pt-1">💵 Cash on Delivery</div>
          </div>
        </div>
      </div>
    </div>
  )
}
