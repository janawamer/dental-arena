import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Users, TrendingUp, Package, Clock, CheckCircle, Truck } from 'lucide-react'
import { supabase } from '../../lib/supabase'

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-700',
  confirmed:  'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped:    'bg-cyan-100 text-cyan-700',
  delivered:  'bg-green-100 text-green-700',
  cancelled:  'bg-red-100 text-red-700',
}

function KPI({ label, value, sub, icon: Icon, color }) {
  return (
    <div className="card p-5 flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-black text-gray-900">{value}</div>
        <div className="text-sm font-semibold text-gray-700">{label}</div>
        {sub && <div className="text-xs text-gray-400">{sub}</div>}
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, customers: 0, products: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [
        { count: orderCount },
        { data: orders },
        { count: customers },
        { count: products },
        { data: orderItems },
      ] = await Promise.all([
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total, status, created_at, shipping_name, shipping_city, id').order('created_at', { ascending: false }).limit(8),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'customer'),
        supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('order_items').select('product_name, product_brand, image_url, qty, price'),
      ])

      const revenue = (orders || []).reduce((s, o) => s + +o.total, 0)
      setStats({ orders: orderCount || 0, revenue, customers: customers || 0, products: products || 0 })
      setRecentOrders(orders || [])

      // Aggregate top products
      const map = {}
      for (const item of orderItems || []) {
        const key = item.product_name
        if (!map[key]) map[key] = { name: item.product_name, brand: item.product_brand, image_url: item.image_url, totalQty: 0, totalRevenue: 0 }
        map[key].totalQty += item.qty
        map[key].totalRevenue += item.qty * item.price
      }
      const sorted = Object.values(map).sort((a, b) => b.totalQty - a.totalQty).slice(0, 6)
      setTopProducts(sorted)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="p-6 max-w-7xl mx-auto w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back. Here's what's happening today.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <KPI label="Total Orders"    value={stats.orders}   icon={ShoppingBag}  color="bg-arena-blue" />
        <KPI label="Revenue (EGP)"   value={`EGP ${stats.revenue.toLocaleString('en', {maximumFractionDigits:0})}`} icon={TrendingUp} color="bg-green-500" />
        <KPI label="Customers"       value={stats.customers} icon={Users}        color="bg-purple-500" />
        <KPI label="Active Products" value={stats.products}  icon={Package}      color="bg-arena-teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-arena-blue font-semibold hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map(o => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{o.shipping_name}</div>
                  <div className="text-xs text-gray-400">{o.shipping_city} · {new Date(o.created_at).toLocaleDateString()}</div>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full capitalize ${STATUS_COLORS[o.status] || 'bg-gray-100 text-gray-600'}`}>{o.status}</span>
                <div className="text-sm font-black text-gray-900 shrink-0">EGP {(+o.total).toFixed(0)}</div>
              </div>
            ))}
            {!recentOrders.length && <div className="px-5 py-10 text-center text-gray-400 text-sm">No orders yet</div>}
          </div>
        </div>

        {/* Top products */}
        <div className="card">
          <div className="px-5 py-4 border-b border-gray-50">
            <h2 className="font-bold text-gray-900">Most Ordered</h2>
          </div>
          <div className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3 px-5 py-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-black text-gray-500">{i + 1}</div>
                <img src={p.image_url || `https://placehold.co/32x32/e0e7ff/1a3fa3?text=${encodeURIComponent(p.name[0])}`}
                  alt={p.name} className="w-9 h-9 rounded-lg object-cover bg-gray-100 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{p.name}</div>
                  <div className="text-xs text-gray-400">{p.totalQty} units sold</div>
                </div>
                <div className="text-xs font-bold text-gray-700 shrink-0">EGP {p.totalRevenue.toLocaleString('en', {maximumFractionDigits:0})}</div>
              </div>
            ))}
            {!topProducts.length && <div className="px-5 py-10 text-center text-gray-400 text-sm">No sales data yet</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
