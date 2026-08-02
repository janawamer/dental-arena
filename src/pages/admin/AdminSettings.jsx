import { useState, useEffect } from 'react'
import { Settings, Truck, Save } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useToast } from '../../components/Toast'

export default function AdminSettings() {
  const { addToast } = useToast()
  const [shippingFee, setShippingFee] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    supabase
      .from('settings')
      .select('value')
      .eq('key', 'shipping_fee')
      .single()
      .then(({ data }) => {
        setShippingFee(data?.value ?? '0')
        setLoading(false)
      })
  }, [])

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const { error } = await supabase
        .from('settings')
        .upsert({ key: 'shipping_fee', value: String(Number(shippingFee) || 0), updated_at: new Date().toISOString() })
      if (error) throw error
      addToast('Settings saved!', 'success')
    } catch (err) {
      addToast(err.message || 'Failed to save settings', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-arena-blue/10 flex items-center justify-center">
          <Settings size={20} className="text-arena-blue" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900">Settings</h1>
          <p className="text-gray-400 text-sm">Configure store-wide options</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20">
          <div className="w-8 h-8 border-4 border-arena-blue border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      ) : (
        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Shipping */}
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <Truck size={18} className="text-arena-blue" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Shipping Fee</h2>
                <p className="text-xs text-gray-400">Applied to every order at checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xs">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">EGP</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={shippingFee}
                  onChange={e => setShippingFee(e.target.value)}
                  className="input pl-12 text-lg font-bold"
                  placeholder="0.00"
                  required
                />
              </div>
              <p className="text-sm text-gray-400">Set to 0 for free shipping</p>
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-xs text-arena-blue">
              Customers will see this fee in their cart and at checkout. Changes take effect immediately for all new orders.
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary py-3 justify-center self-start px-8 gap-2"
          >
            <Save size={16} />
            {saving ? 'Saving…' : 'Save Settings'}
          </button>
        </form>
      )}
    </div>
  )
}
