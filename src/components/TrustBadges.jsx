import { ShieldCheck, Tag, RefreshCw, Headphones } from 'lucide-react'

const badges = [
  { Icon: ShieldCheck, color: 'text-arena-blue bg-blue-50',   title: 'Trusted & Secure',  desc: 'Verified sellers and secure transactions.' },
  { Icon: Tag,         color: 'text-arena-teal bg-teal-50',   title: 'Best Deals',         desc: 'Hot deals, big discounts and exclusive offers.' },
  { Icon: RefreshCw,   color: 'text-green-600 bg-green-50',   title: 'Buy & Sell Used',   desc: 'Marketplace for new and pre-owned items.' },
  { Icon: Headphones,  color: 'text-purple-600 bg-purple-50', title: 'Expert Support',    desc: 'We are here to help you anytime.' },
]

export default function TrustBadges() {
  return (
    <section className="bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {badges.map(({ Icon, color, title, desc }) => (
          <div key={title} className="flex items-start gap-2.5 sm:gap-3">
            <div className={`w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <div className="font-semibold text-xs sm:text-sm text-gray-900">{title}</div>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed hidden sm:block">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
