import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const PRODUCT_ICONS = ['🦷','🔬','💊','🩺','⚕️','🏥','🔧','🧪','💉','🔭','🖥️','🧲']
const PRODUCT_COLORS = [
  'from-blue-50 to-blue-100 text-blue-600',
  'from-purple-50 to-purple-100 text-purple-600',
  'from-green-50 to-green-100 text-green-600',
  'from-orange-50 to-orange-100 text-orange-600',
  'from-teal-50 to-teal-100 text-teal-600',
  'from-rose-50 to-rose-100 text-rose-600',
]

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const icon = product.image_url ? null : PRODUCT_ICONS[index % PRODUCT_ICONS.length]
  const colorClass = PRODUCT_COLORS[index % PRODUCT_COLORS.length]
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null

  function handleAdd() {
    addToCart({ id: product.id, name: product.name, price: product.price, brand: product.brand, image_url: product.image_url })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="card group flex flex-col overflow-hidden">
      {/* Image / placeholder */}
      <div className={`relative h-36 sm:h-44 flex items-center justify-center overflow-hidden ${product.image_url ? 'bg-gray-50' : `bg-gradient-to-br ${colorClass}`}`}>
        {product.image_url
          ? <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
          : <span className="text-4xl sm:text-5xl">{icon}</span>
        }
        {discount && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      <div className="p-3 sm:p-4 flex flex-col gap-1.5 sm:gap-2 flex-1">
        <div className="text-xs font-medium text-arena-teal uppercase tracking-wide truncate">{product.brand}</div>
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
          {product.oldPrice && <span className="text-xs text-gray-400 line-through">EGP {product.oldPrice.toLocaleString()}</span>}
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
