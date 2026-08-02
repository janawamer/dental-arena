import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ShoppingBag, ArrowRight, CheckCircle, Truck, Banknote } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'
import { useToast } from '../components/Toast'

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart()
  const { user, profile } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [shippingFee, setShippingFee] = useState(0)

  useEffect(() => {
    supabase
      .from('settings')
      .select('value')
      .eq('key', 'shipping_fee')
      .single()
      .then(({ data }) => setShippingFee(Number(data?.value) || 0))
  }, [])

  const total = subtotal + shippingFee

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!cart.length) return
    setLoading(true)
    const fd = new FormData(e.target)

    try {
      const { data: order, error: orderErr } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          status: 'pending',
          subtotal: +subtotal.toFixed(2),
          discount: 0,
          tax: 0,
          shipping_fee: +shippingFee.toFixed(2),
          total: +total.toFixed(2),
          shipping_name: fd.get('name'),
          shipping_phone: fd.get('phone'),
          shipping_address: fd.get('address'),
          shipping_city: fd.get('city'),
          notes: fd.get('notes'),
        })
        .select()
        .single()

      if (orderErr) throw orderErr

      const items = cart.map(item => ({
        order_id: order.id,
        product_id: item.id,
        product_name: item.name,
        product_brand: item.brand,
        image_url: item.image_url,
        price: item.price,
        qty: item.qty,
      }))

      const { error: itemsErr } = await supabase.from('order_items').insert(items)
      if (itemsErr) throw itemsErr

      clearCart()
      setOrderId(order.id)
      setDone(true)
    } catch (err) {
      addToast(err.message || 'Order failed. Please try again.', 'error')
    } finally {
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Order Placed!</h1>
        <p className="text-gray-500 mb-8">Your order has been received and is being processed. We'll notify you once it's confirmed.</p>
        <div className="flex gap-3 justify-center">
          <Link to="/orders" className="btn-primary">Track Orders</Link>
          <Link to="/shop" className="btn-outline">Continue Shopping</Link>
        </div>
      </div>
    )
  }

  if (!cart.length) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
        <Link to="/shop" className="btn-primary">Shop Now</Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-black text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-2 flex flex-col gap-6">
          <div className="card p-6">
            <h2 className="font-bold text-gray-900 mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-1.5">Full Name</label>
                <input name="name" className="input" defaultValue={profile?.full_name || ''} required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Phone</label>
                <input name="phone" type="tel" className="input" defaultValue={profile?.phone || ''} required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">City</label>
                <input name="city" className="input" defaultValue={profile?.city || ''} required /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-1.5">Address</label>
                <input name="address" className="input" placeholder="Street, building, floor, apartment" required /></div>
              <div className="sm:col-span-2"><label className="block text-sm font-semibold mb-1.5">Order Notes (optional)</label>
                <textarea name="notes" className="input h-20 resize-none" placeholder="Any special instructions…" /></div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-gray-900 mb-4">Payment</h2>
            <div className="flex items-center gap-3 bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800">
              <Banknote size={20} className="shrink-0 text-arena-teal" />
              <div><strong>Cash on Delivery</strong> — Pay when your order arrives. No online payment required.</div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary py-4 justify-center text-base disabled:opacity-60">
            {loading ? 'Placing Order…' : <><span>Place Order · EGP {total.toFixed(2)}</span><ArrowRight size={20} /></>}
          </button>
        </form>

        {/* Summary */}
        <div className="card p-6 h-fit sticky top-24">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
            {cart.map(item => (
              <div key={item.id} className="flex gap-3">
                <img src={item.image_url || `https://placehold.co/60x60/e0e7ff/1a3fa3?text=${encodeURIComponent(item.name[0])}`}
                  alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-800 truncate">{item.name}</div>
                  <div className="text-xs text-gray-400">x{item.qty}</div>
                </div>
                <div className="text-sm font-bold text-gray-900 shrink-0">EGP {(item.price * item.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>EGP {subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600 items-center">
              <span className="flex items-center gap-1.5"><Truck size={13} className="text-arena-teal" /> Shipping</span>
              <span>{shippingFee === 0 ? <span className="text-green-600 font-semibold">Free</span> : `EGP ${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-gray-900 font-black text-base pt-2 border-t border-gray-100">
              <span>Total</span><span>EGP {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
