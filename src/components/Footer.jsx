import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-arena-navy text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3 sm:mb-4">
            <img src="/logo.png" alt="Dental Arena" className="h-14 w-auto object-contain brightness-0 invert" />
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
            <a href="tel:+201159188819" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={13} className="text-arena-teal shrink-0" /> +20 115 918 8819
            </a>
            <a href="https://wa.me/201141129291" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-arena-teal shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              +20 114 112 9291
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
