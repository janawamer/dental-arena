import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './components/Toast'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute, AdminRoute } from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import HotDeals from './pages/HotDeals'
import Marketplace from './pages/Marketplace'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import Contact from './pages/Contact'
import Sponsors from './pages/Sponsors'
import About from './pages/About'
import { Terms, Privacy, Refund } from './pages/Legal'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import Checkout from './pages/Checkout'
import AdminLayout from './pages/admin/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminListings from './pages/admin/AdminListings'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <Routes>
              {/* Admin routes — no main Header/Footer */}
              <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="listings" element={<AdminListings />} />
              </Route>

              {/* Public routes */}
              <Route path="*" element={
                <div className="min-h-screen flex flex-col">
                  <Header />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/"            element={<Home />} />
                      <Route path="/shop"        element={<Shop />} />
                      <Route path="/hot-deals"   element={<HotDeals />} />
                      <Route path="/marketplace" element={<Marketplace />} />
                      <Route path="/cart"        element={<Cart />} />
                      <Route path="/checkout"    element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                      <Route path="/orders"      element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                      <Route path="/orders/:id"  element={<ProtectedRoute><OrderDetail /></ProtectedRoute>} />
                      <Route path="/signin"      element={<SignIn />} />
                      <Route path="/contact"     element={<Contact />} />
                      <Route path="/sponsors"    element={<Sponsors />} />
                      <Route path="/about"       element={<About />} />
                      <Route path="/terms"       element={<Terms />} />
                      <Route path="/privacy"     element={<Privacy />} />
                      <Route path="/refund"      element={<Refund />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
