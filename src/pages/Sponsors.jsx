import { useState } from 'react'
import { Copy, Check, ArrowRight, Link } from 'lucide-react'
import { sponsors } from '../data/products'
import TrustBadges from '../components/TrustBadges'

const COLOR_MAP = {
  blue:   'from-blue-50 to-blue-100 text-blue-600 border-blue-200',
  indigo: 'from-indigo-50 to-indigo-100 text-indigo-600 border-indigo-200',
  purple: 'from-purple-50 to-purple-100 text-purple-600 border-purple-200',
  orange: 'from-orange-50 to-orange-100 text-orange-600 border-orange-200',
  green:  'from-green-50 to-green-100 text-green-600 border-green-200',
  teal:   'from-teal-50 to-teal-100 text-teal-600 border-teal-200',
}

const BRAND_EMOJIS = ['🦷','🔬','⚕️','🏥','🧬','🔭','💊','🩺','🧪','💉','🔧','🌿']
const BRANDS = ['3M','Dentsply Sirona','Ivoclar','Hu-Friedy','Geistlich','EMS','Ormco','Nobel Biocare','Straumann','Kerr','GC America','Septodont']

export default function Sponsors() {
  const [copied, setCopied] = useState(null)

  function copyCode(code) {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(code)
      setTimeout(() => setCopied(null), 2000)
    })
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-arena-navy via-arena-blue to-arena-teal py-16 relative overflow-hidden text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-white/5 blur-3xl rounded-full" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center text-3xl mx-auto mb-5">🎁</div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">Sponsors &amp; Offers</h1>
          <p className="text-white/70 max-w-lg mx-auto">Exclusive deals and special offers from our trusted brand partners. Limited time — don't miss out!</p>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-xl font-black text-gray-900 mb-2">Featured Sponsor Offers</h2>
        <div className="w-10 h-1 bg-arena-blue rounded-full mb-8" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sponsors.map(s => {
            const cls = COLOR_MAP[s.color] || COLOR_MAP.blue
            const isCopied = copied === s.code
            return (
              <div key={s.id} className="card flex flex-col overflow-hidden">
                <div className={`bg-gradient-to-br ${cls} border-b p-5 flex items-center gap-4`}>
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm shrink-0">🏷️</div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide opacity-60">{s.brand}</div>
                    <div className="font-bold text-sm text-gray-900 leading-snug">{s.title}</div>
                  </div>
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>

                  {/* Code */}
                  <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mb-0.5">Promo Code</div>
                      <div className="font-black text-arena-blue tracking-widest text-sm">{s.code}</div>
                    </div>
                    <button onClick={() => copyCode(s.code)} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${isCopied ? 'bg-green-500 text-white' : 'bg-arena-blue text-white hover:bg-arena-navy'}`}>
                      {isCopied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                    </button>
                  </div>

                  <div className="text-xs text-red-500 font-medium flex items-center gap-1.5">⏰ Expires: {s.expiry}</div>
                  <a href="/shop" className="btn-primary text-sm justify-center mt-auto">Shop Now <ArrowRight size={14} /></a>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-black text-gray-900 text-center mb-2">Our Trusted Brand Partners</h2>
          <div className="w-10 h-1 bg-arena-blue rounded-full mx-auto mb-10" />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {BRANDS.map((brand, i) => (
              <div key={brand} className="bg-white border border-gray-100 rounded-2xl p-4 text-center shadow-card hover:shadow-hover hover:border-arena-blue/20 transition-all cursor-pointer">
                <div className="text-2xl mb-2">{BRAND_EMOJIS[i % BRAND_EMOJIS.length]}</div>
                <div className="text-xs font-bold text-gray-700 leading-tight">{brand}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a sponsor CTA */}
      <section className="bg-gradient-to-r from-arena-blue to-arena-teal py-12 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-black text-white mb-3">Want to Partner With Us?</h2>
          <p className="text-white/75 text-sm mb-6">Reach thousands of dental professionals across Egypt with Dental Arena.</p>
          <a href="/contact" className="inline-flex items-center gap-2 bg-white text-arena-blue font-bold px-8 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
            Get in Touch <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <TrustBadges />
    </div>
  )
}
