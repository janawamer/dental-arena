import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ICONS = ['🦷','🔬','💊','🩺','⚕️','🏥','🔧','🧪']
const COLORS = ['bg-blue-50','bg-purple-50','bg-green-50','bg-orange-50','bg-teal-50']

const COUPONS = { 'ARENA10': 0.10, 'DENTAL20': 0.20, 'WELCOME15': 0.15 }

export default function Cart() {
  const { cart, removeFromCart, setQty, clearCart, subtotal } = useCart()
  const [coupon, setCoupon] = useState('')
  const [discount, setDiscount] = useState(0)
  const [couponMsg, setCouponMsg] = useState(null)
  const navigate = useNavigate()

  function applyCoupon() {
    const rate = COUPONS[coupon.trim().toUpperCase()]
    if (rate) {
      setDiscount(rate)
      setCouponMsg({ ok: true, text: `✓ ${(rate * 100)}% discount applied!` })
    } else {
      setDiscount(0)
      setCouponMsg({ ok: false, text: 'Invalid promo code.' })
    }
  }

  const discountAmt = Math.round(subtotal * discount)
  const tax = Math.round((subtotal - discountAmt) * 0.14)
  const total = subtotal - discountAmt + tax

  if (cart.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
      <div className="text-7xl mb-6">🛒</div>
      <h2 className="text-2xl font-black text-gray-800 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 mb-8">Looks like you haven't added anything yet.</p>
      <Link to="/shop" className="btn-primary text-base px-8 py-3.5">Browse Products <ArrowRight size={18} /></Link>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-900">Shopping Cart</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1.5 transition-colors">
          <Trash2 size={14} /> Clear All
        </button>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
        {/* Cart items */}
        <div className="flex flex-col gap-3">
          {cart.map((item, i) => (
            <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-card p-4 flex items-center gap-4">
              <div className={`w-18 h-16 ${COLORS[i % COLORS.length]} rounded-xl flex items-center justify-center text-3xl shrink-0 w-16`}>
                {ICONS[i % ICONS.length]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-sm truncate">{item.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{item.brand}</div>
                <div className="text-arena-blue font-bold text-sm mt-1">EGP {item.price.toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => item.qty === 1 ? removeFromCart(item.id) : setQty(item.id, item.qty - 1)} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Minus size={13} />
                </button>
                <span className="w-6 text-center font-bold text-sm">{item.qty}</span>
                <button onClick={() => setQty(item.id, item.qty + 1)} className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <Plus size={13} />
                </button>
              </div>
              <div className="font-black text-gray-900 text-sm shrink-0 w-24 text-right">
                EGP {(item.price * item.qty).toLocaleString()}
              </div>
              <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-red-50 rounded-xl text-red-400 hover:text-red-600 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <Link to="/shop" className="flex items-center gap-2 text-arena-blue text-sm font-semibold hover:underline mt-2 w-fit">
            <ShoppingBag size={15} /> Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 sticky top-24">
          <h3 className="font-black text-gray-900 text-lg mb-5">Order Summary</h3>

          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-semibold">EGP {subtotal.toLocaleString()}</span></div>
            {discount > 0 && <div className="flex justify-between text-green-600"><span>Discount ({(discount * 100).toFixed(0)}%)</span><span className="font-semibold">-EGP {discountAmt.toLocaleString()}</span></div>}
            <div className="flex justify-between text-gray-600"><span>Shipping</span><span className="text-green-600 font-semibold">Free</span></div>
            <div className="flex justify-between text-gray-600"><span>Tax (14%)</span><span className="font-semibold">EGP {tax.toLocaleString()}</span></div>
            <div className="flex justify-between font-black text-gray-900 text-base border-t border-gray-100 pt-3">
              <span>Total</span><span className="text-arena-blue">EGP {total.toLocaleString()}</span>
            </div>
          </div>

          {/* Coupon */}
          <div className="mt-5">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Promo Code</label>
            <div className="flex gap-2">
              <input value={coupon} onChange={e => setCoupon(e.target.value)} onKeyDown={e => e.key === 'Enter' && applyCoupon()} placeholder="Enter code" className="input text-sm flex-1 py-2" />
              <button onClick={applyCoupon} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-semibold rounded-xl transition-colors flex items-center gap-1">
                <Tag size={13} /> Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`text-xs mt-1.5 font-medium ${couponMsg.ok ? 'text-green-600' : 'text-red-500'}`}>{couponMsg.text}</p>
            )}
            <p className="text-xs text-gray-400 mt-1">Try: ARENA10, DENTAL20, WELCOME15</p>
          </div>

          <button onClick={() => navigate('/checkout')} className="btn-primary w-full justify-center mt-5 py-3.5 text-base">
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div className="flex justify-center gap-4 mt-4 opacity-40 text-3xl">
            💳 💰 🏦
          </div>
        </div>
      </div>
    </div>
  )
}
