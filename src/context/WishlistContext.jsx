import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const { user } = useAuth()
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    if (!user) { setWishlist([]); return }
    supabase
      .from('wishlist_items')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .then(({ data }) => setWishlist(data || []))
  }, [user?.id])

  const addToWishlist = useCallback(async (product) => {
    if (!user) return
    const row = {
      user_id: user.id,
      product_id: product.id,
      name: product.name,
      price: product.price,
      brand: product.brand || null,
      image_url: product.image_url || null,
    }
    const { data, error } = await supabase.from('wishlist_items').insert(row).select().single()
    if (!error && data) setWishlist(prev => [data, ...prev])
  }, [user])

  const removeFromWishlist = useCallback(async (productId) => {
    if (!user) return
    await supabase.from('wishlist_items').delete().eq('user_id', user.id).eq('product_id', productId)
    setWishlist(prev => prev.filter(w => w.product_id !== productId))
  }, [user])

  const isWishlisted = useCallback((productId) => {
    return wishlist.some(w => w.product_id === productId)
  }, [wishlist])

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isWishlisted, totalWishlist: wishlist.length }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)
