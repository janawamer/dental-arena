import { Link } from 'react-router-dom'
import { Award, Truck, Headphones, ArrowRight } from 'lucide-react'
import TrustBadges from '../components/TrustBadges'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-arena-navy py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"><div className="absolute top-0 right-0 w-80 h-80 bg-arena-blue/20 blur-3xl rounded-full" /></div>
        <div className="relative max-w-3xl mx-auto px-4">
          <img src="/logo.png" alt="Dental Arena" className="h-20 w-auto object-contain mx-auto mb-5 brightness-0 invert" />
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3">About Dental Arena</h1>
          <p className="text-slate-400 leading-relaxed">Egypt's trusted all-in-one dental supply platform — bringing premium products, unbeatable deals, and a safe marketplace to every dental professional.</p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-5">Our Story</h2>
          <div className="flex flex-col gap-4 text-gray-500 text-sm leading-relaxed">
            <p>Dental Arena was founded with a single mission: make dental supplies accessible, affordable, and easy to buy for every dental professional in Egypt and beyond.</p>
            <p>We saw that dental professionals were wasting hours sourcing products from multiple vendors, missing out on deals, and had no safe way to buy or sell used equipment. We built the solution.</p>
            <p>Today we serve thousands of dentists, clinics, and dental students across Egypt with a curated catalog of premium products, exclusive hot deals, and a verified marketplace for pre-owned equipment.</p>
          </div>
          <Link to="/shop" className="btn-primary inline-flex mt-8">Start Shopping <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[['5,000+','Products Available','text-arena-blue bg-blue-50'],['2,000+','Happy Customers','text-arena-teal bg-teal-50'],['500+','Marketplace Listings','text-green-600 bg-green-50'],['50+','Trusted Brands','text-purple-600 bg-purple-50']].map(([num,label,cls]) => (
            <div key={label} className={`rounded-2xl p-6 text-center ${cls}`}>
              <div className="text-3xl font-black mb-1">{num}</div>
              <div className="text-xs font-medium opacity-70">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Us */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900">Why Choose Dental Arena</h2>
            <div className="w-12 h-1 bg-arena-blue rounded-full mx-auto mt-3" />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { Icon: Award,      color: 'bg-blue-50 text-arena-blue',   title: 'Genuine Products',  desc: 'All items sourced from authorized distributors with full warranties and certifications.' },
              { Icon: Truck,      color: 'bg-teal-50 text-arena-teal',   title: 'Fast Delivery',      desc: 'Nationwide delivery across Egypt with real-time tracking and reliable logistics.' },
              { Icon: Headphones, color: 'bg-green-50 text-green-600',   title: 'Expert Support',     desc: 'Our dental supply specialists help you choose the right products for your practice.' },
            ].map(({ Icon, color, title, desc }) => (
              <div key={title} className="card p-7 text-center">
                <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-5`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TrustBadges />
    </div>
  )
}
