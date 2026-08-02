import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <Heart size={28} className="text-red-400" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Sign in to see your wishlist</h2>
        <p className="text-gray-400 mb-8">Save products you love and access them anytime.</p>
        <Link to="/signin" className="btn-primary text-base px-8 py-3.5">Sign In</Link>
      </div>
    )
  }

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
          <Heart size={28} className="text-red-300" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-400 mb-8">Browse products and tap the heart to save them here.</p>
        <Link to="/shop" className="btn-primary text-base px-8 py-3.5">Browse Products <ArrowRight size={18} /></Link>
      </div>
    )
  }

  function handleAddToCart(item) {
    addToCart({
      id: item.product_id,
      name: item.name,
      price: item.price,
      brand: item.brand,
      image_url: item.image_url,
    })
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center">
          <Heart size={18} className="text-red-500" fill="currentColor" />
        </div>
        <h1 className="text-2xl font-black text-gray-900">My Wishlist</h1>
        <span className="text-sm text-gray-400 font-medium">({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})</span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {wishlist.map(item => (
          <div key={item.id} className="card group flex flex-col overflow-hidden">
            <div className="relative h-40 bg-gray-100 overflow-hidden">
              {item.image_url
                ? <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                    <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">No Image</span>
                  </div>
              }
              <button
                onClick={() => removeFromWishlist(item.product_id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center shadow-sm transition-all opacity-0 group-hover:opacity-100"
                title="Remove from wishlist"
              >
                <Trash2 size={13} />
              </button>
            </div>

            <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1">
              {item.brand && (
                <div className="text-xs font-semibold text-arena-teal uppercase tracking-wide truncate">{item.brand}</div>
              )}
              <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 flex-1">{item.name}</h3>
              <div className="text-base font-black text-arena-blue mt-auto">EGP {item.price.toLocaleString()}</div>
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-arena-blue text-white hover:bg-arena-navy transition-colors"
              >
                <ShoppingCart size={14} /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
