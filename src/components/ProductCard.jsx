import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const oldPrice = product.old_price ?? product.oldPrice
  const discount = oldPrice ? Math.round((1 - product.price / oldPrice) * 100) : null

  function handleAdd() {
    addToCart({ id: product.id, name: product.name, price: product.price, brand: product.brand, image_url: product.image_url })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card group flex flex-col overflow-hidden">
      {/* Product image */}
      <div className="relative h-36 sm:h-44 bg-gray-100 overflow-hidden">
        {product.image_url
          ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
              <span className="text-slate-400 text-xs font-medium uppercase tracking-widest">No Image</span>
            </div>
        }
        {discount && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 flex-1">
        <div className="text-xs font-semibold text-arena-teal uppercase tracking-wide truncate">{product.brand}</div>
        <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={10} fill={i < Math.round(product.rating) ? '#f59e0b' : 'none'} stroke={i < Math.round(product.rating) ? '#f59e0b' : '#d1d5db'} />
            ))}
          </div>
          <span className="text-xs text-gray-400">({product.reviews || product.reviews_count || 0})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1.5 mt-auto pt-1.5 sm:pt-2 flex-wrap">
          <span className="text-sm sm:text-base font-black text-arena-blue">EGP {product.price.toLocaleString()}</span>
          {oldPrice && <span className="text-xs text-gray-400 line-through">EGP {oldPrice.toLocaleString()}</span>}
        </div>

        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
            added ? 'bg-green-500 text-white' : 'bg-arena-blue text-white hover:bg-arena-navy'
          }`}
        >
          <ShoppingCart size={13} className="sm:w-4 sm:h-4" />
          {added ? 'Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
