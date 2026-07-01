import { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.item.id)
      if (existing) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'SET_QTY':
      return state.map(i => i.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const saved = JSON.parse(localStorage.getItem('da_cart') || '[]')
  const [cart, dispatch] = useReducer(cartReducer, saved)

  useEffect(() => {
    localStorage.setItem('da_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = item => dispatch({ type: 'ADD', item })
  const removeFromCart = id => dispatch({ type: 'REMOVE', id })
  const setQty = (id, qty) => dispatch({ type: 'SET_QTY', id, qty })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const totalItems = cart.reduce((s, i) => s + i.qty, 0)
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, setQty, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
