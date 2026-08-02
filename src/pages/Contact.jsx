import { useState } from 'react'
import { Phone, Mail, MapPin, MessageCircle, ChevronDown, Send, ShoppingBag, Zap, Store, RotateCcw, CheckCircle } from 'lucide-react'
import TrustBadges from '../components/TrustBadges'

const faqs = [
  { q: 'How do I place an order?', a: 'Browse our shop, add items to your cart, and proceed to checkout. You can pay securely online or choose cash on delivery.' },
  { q: 'Do you ship across Egypt?', a: 'Yes! We deliver to all governorates in Egypt. Delivery usually takes 2–5 business days depending on your location.' },
  { q: 'How do I sell on the Marketplace?', a: 'Click "Post a Listing" on the Marketplace page, fill in your item details, and submit. Our team will review and publish within 24 hours.' },
  { q: 'Are the products genuine?', a: 'Absolutely. All products are sourced from authorized distributors and carry full manufacturer warranties.' },
  { q: 'What is your return policy?', a: 'We accept returns within 14 days for unopened items. Visit our Refund Policy page for full details.' },
  { q: 'Can I get a bulk/clinic discount?', a: 'Yes! Contact us directly via phone or WhatsApp for special pricing on bulk orders and clinic supply contracts.' },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-card">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-5 py-4 text-left font-semibold text-gray-900 text-sm hover:bg-gray-50 transition-colors">
        {q}
        <ChevronDown size={16} className={`text-gray-400 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed border-t border-gray-50">{a}</div>}
    </div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    e.target.reset()
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-900 to-arena-navy py-14 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-arena-teal/10 blur-3xl rounded-full" />
        </div>
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Phone size={26} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">Contact Us</h1>
          <p className="text-slate-400 max-w-md mx-auto">We're here to help. Reach out and we'll get back to you as soon as possible.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-xl font-black text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-8">Have questions about products, orders, or the marketplace? Our team is ready to assist you.</p>

          <div className="flex flex-col gap-5 mb-8">
            {[
              { Icon: Phone, label: 'Phone', val: '+20 115 918 8819', sub: 'Sun – Thu, 9am – 6pm', href: 'tel:+201159188819' },
              { Icon: Mail,  label: 'Email', val: 'Dentalarenastore@gmail.com', sub: 'Reply within 24 hours', href: 'mailto:Dentalarenastore@gmail.com' },
              { Icon: MessageCircle, label: 'WhatsApp', val: '+20 114 112 9291', sub: 'Available 24/7 for urgent queries', href: 'https://wa.me/201141129291' },
              { Icon: MapPin, label: 'Address', val: 'Cairo, Egypt', sub: null, href: null },
            ].map(({ Icon, label, val, sub, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-arena-blue" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-gray-900">{label}</div>
                  {href ? <a href={href} target={href.startsWith('https') ? '_blank' : undefined} rel="noopener noreferrer" className="text-sm text-arena-blue hover:underline">{val}</a> : <div className="text-sm text-gray-600">{val}</div>}
                  {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
            <div className="font-semibold text-sm text-gray-900 mb-3">Quick Links</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                [ShoppingBag, 'Browse Shop',   '/shop'],
                [Zap,         'Hot Deals',     '/hot-deals'],
                [Store,       'Marketplace',   '/marketplace'],
                [RotateCcw,   'Refund Policy', '/refund'],
              ].map(([Icon, label, to]) => (
                <a key={label} href={to} className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-arena-blue bg-white border border-gray-100 rounded-xl px-3 py-2.5 transition-colors hover:border-arena-blue/30">
                  <Icon size={13} className="shrink-0" />{label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6">
          <h3 className="font-black text-gray-900 text-lg mb-5">Send Us a Message</h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              <div><label className="block text-sm font-semibold mb-1.5">First Name *</label><input className="input" placeholder="First" required /></div>
              <div><label className="block text-sm font-semibold mb-1.5">Last Name *</label><input className="input" placeholder="Last" required /></div>
            </div>
            <div><label className="block text-sm font-semibold mb-1.5">Email *</label><input type="email" className="input" placeholder="you@example.com" required /></div>
            <div><label className="block text-sm font-semibold mb-1.5">Phone</label><input type="tel" className="input" placeholder="+20 xxx xxx xxxx" /></div>
            <div><label className="block text-sm font-semibold mb-1.5">Subject *</label>
              <select className="input" required>
                <option value="">Select a subject</option>
                {['Product Inquiry','Order Issue','Marketplace Support','Hot Deals & Offers','Technical Support','Partnership','Other'].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div><label className="block text-sm font-semibold mb-1.5">Message *</label><textarea className="input min-h-28 resize-y" placeholder="How can we help you?" required /></div>
            <button type="submit" className={`btn-primary w-full justify-center py-3.5 ${sent ? '!bg-green-500' : ''}`}>
              {sent ? <><CheckCircle size={16} /> Message Sent!</> : <><Send size={16} /> Send Message</>}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-black text-gray-900">Frequently Asked Questions</h2>
            <div className="w-12 h-1 bg-arena-blue rounded-full mx-auto mt-3" />
          </div>
          <div className="flex flex-col gap-3">
            {faqs.map(f => <FAQ key={f.q} {...f} />)}
          </div>
        </div>
      </div>

      <TrustBadges />
    </div>
  )
}
