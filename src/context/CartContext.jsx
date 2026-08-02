import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'

const CartContext = createContext()

function storageKey(userId) {
  return userId ? `da_cart_${userId}` : 'da_cart_guest'
}

export function CartProvider({ children }) {
  const { user, loading } = useAuth()
  const [cart, setCart] = useState([])

  // Load cart when auth resolves or user changes
  useEffect(() => {
    if (loading) return
    const key = storageKey(user?.id)
    const saved = JSON.parse(localStorage.getItem(key) || '[]')

    if (user) {
      // Merge any guest cart items into the user cart on login
      const guestCart = JSON.parse(localStorage.getItem('da_cart_guest') || '[]')
      if (guestCart.length > 0) {
        localStorage.removeItem('da_cart_guest')
        const merged = [...saved]
        for (const g of guestCart) {
          const ex = merged.find(i => i.id === g.id)
          if (ex) ex.qty += g.qty
          else merged.push(g)
        }
        setCart(merged)
        return
      }
    }

    setCart(saved)
  }, [user?.id, loading])

  // Persist whenever cart changes
  useEffect(() => {
    if (loading) return
    localStorage.setItem(storageKey(user?.id), JSON.stringify(cart))
  }, [cart, user?.id, loading])

  const addToCart = useCallback((item) => setCart(prev => {
    const ex = prev.find(i => i.id === item.id)
    if (ex) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i)
    return [...prev, { ...item, qty: 1 }]
  }), [])

  const removeFromCart = useCallback((id) => setCart(prev => prev.filter(i => i.id !== id)), [])
  const setQty = useCallback((id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)), [])
  const clearCart = useCallback(() => setCart([]), [])

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
