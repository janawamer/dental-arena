import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-arena-navy text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-arena-blue to-arena-teal flex items-center justify-center text-base shrink-0">🦷</div>
            <span className="font-black text-white text-sm tracking-wide">DENTAL ARENA</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 sm:mb-5">
            Egypt's trusted all-in-one dental supply platform — premium products, hot deals, and a secure marketplace.
          </p>
          <div className="flex gap-2 sm:gap-3">
            {[['📸','Instagram'],['📘','Facebook'],['💬','WhatsApp']].map(([emoji, label]) => (
              <a key={label} href="#" aria-label={label} className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl bg-white/5 hover:bg-arena-blue flex items-center justify-center transition-colors text-sm">
                {emoji}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 sm:mb-4">Help</h4>
          <div className="flex flex-col gap-2 sm:gap-2.5 text-xs sm:text-sm">
            {[['About Us', '/about'], ['Terms & Conditions', '/terms'], ['Privacy Policy', '/privacy'], ['Refund Policy', '/refund']].map(([label, to]) => (
              <Link key={to} to={to} className="text-slate-400 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 sm:mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2 sm:gap-2.5 text-xs sm:text-sm">
            {[['Shop', '/shop'], ['Hot Deals', '/hot-deals'], ['Marketplace', '/marketplace'], ['Sponsors', '/sponsors']].map(([label, to]) => (
              <Link key={to} to={to} className="text-slate-400 hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3 sm:mb-4">Contact</h4>
          <div className="flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-400">
            <a href="tel:+201234567890" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={13} className="text-arena-teal shrink-0" /> +20 123 456 7890
            </a>
            <a href="mailto:Dentalarenastore@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors break-all">
              <Mail size={13} className="text-arena-teal shrink-0" /> Dentalarenastore@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={13} className="text-arena-teal shrink-0" /> Cairo, Egypt
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 py-4 text-center text-xs text-slate-500 px-4">
        © 2024 Dental Arena. All rights reserved.
      </div>
    </footer>
  )
}
