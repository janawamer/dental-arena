import { NavLink } from 'react-router-dom'
import { ShoppingBag, Flame, Store } from 'lucide-react'

const links = [
  { to: '/shop',        label: 'Shop',        Icon: ShoppingBag },
  { to: '/hot-deals',   label: 'Hot Deals',   Icon: Flame       },
  { to: '/marketplace', label: 'Marketplace', Icon: Store       },
]

export default function SubNav() {
  return (
    <nav className="bg-white border-b border-gray-100 overflow-x-auto hide-scrollbar">
      <div className="max-w-7xl mx-auto px-4 flex min-w-max sm:min-w-0">
        {links.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-1.5 sm:gap-2 px-4 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-semibold border-b-2 transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'border-arena-blue text-arena-blue'
                  : 'border-transparent text-gray-500 hover:text-arena-blue hover:border-arena-blue/40'
              }`
            }
          >
            <Icon size={14} className="sm:w-4 sm:h-4" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
