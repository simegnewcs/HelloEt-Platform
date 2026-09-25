'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { 
  LayoutDashboard, Building2, Star, TrendingUp, 
  MessageSquare, Settings, CreditCard, Search,
  Bookmark, History, Bell, PlusCircle, FileText,
  LogOut, ChevronRight, Sparkles
} from 'lucide-react'

interface NavItem {
  name: string
  href: string
  icon: any
  badge?: string | number
}

const businessOwnerItems: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Businesses', href: '/dashboard/listings', icon: Building2, badge: '3' },
  { name: 'Add Business', href: '/dashboard/businesses/new', icon: PlusCircle },
  { name: 'Customer Reviews', href: '/dashboard/reviews', icon: Star, badge: '12' },
  { name: 'Analytics', href: '/dashboard/analytics', icon: TrendingUp },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '5' },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

const userItems: NavItem[] = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Find Businesses', href: '/businesses', icon: Search },
  { name: 'My Reviews', href: '/my-reviews', icon: Star, badge: '5' },
  { name: 'Saved Places', href: '/saved', icon: Bookmark },
  { name: 'Recent Activity', href: '/activity', icon: History },
  { name: 'Notifications', href: '/notifications', icon: Bell, badge: '2' },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const isBusinessOwner = session?.user?.role === 'BUSINESS_OWNER'
  const sidebarItems = isBusinessOwner ? businessOwnerItems : userItems
  const userName = session?.user?.name || 'User'
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 bg-white border-r border-neutral-100 h-full flex flex-col shadow-sm">
      
      {/* Logo */}
      <div className="p-5 border-b border-neutral-100">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-xl flex items-center justify-center shadow-sm">
            <span className="text-white font-black text-lg font-display">H</span>
          </div>
          <div>
            <div className="font-display font-black text-neutral-900 leading-none">
              Hello<span className="text-[#006747]">ET</span>
            </div>
            <div className="text-[10px] text-neutral-400 font-medium mt-0.5">
              {isBusinessOwner ? 'Business Dashboard' : 'User Dashboard'}
            </div>
          </div>
        </Link>
      </div>

      {/* Upgrade Banner (for business owner on free plan) */}
      {isBusinessOwner && (
        <div className="mx-3 my-3 p-3 bg-gradient-to-br from-[#004d34] to-[#006747] rounded-xl text-white">
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#EEF578]" />
            <span className="text-xs font-bold">Free Plan</span>
          </div>
          <p className="text-[10px] text-white/70 mb-2 leading-relaxed">Upgrade to Premium for advanced analytics &amp; featured listings</p>
          <Link href="/dashboard/billing" className="flex items-center justify-between text-[11px] font-semibold bg-[#EEF578] text-[#004d34] px-3 py-1.5 rounded-lg">
            <span>Upgrade Now</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto scrollbar-thin">
        {/* Section label */}
        <p className="text-[10px] text-neutral-400 font-semibold uppercase tracking-wider px-3 py-2 mt-1">
          {isBusinessOwner ? 'Business' : 'Navigation'}
        </p>
        
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? 'bg-[#006747] text-white shadow-sm'
                  : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-600'}`} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 text-[10px] font-bold rounded-full min-w-[18px] text-center ${
                  active 
                    ? 'bg-white/25 text-white' 
                    : 'bg-[#D1EFE4] text-[#006747]'
                }`}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t border-neutral-100 space-y-1">
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 transition-colors"
        >
          <FileText className="w-4 h-4 text-neutral-400" />
          <span className="text-sm font-medium">Help &amp; Support</span>
        </Link>
        
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>

        {/* User info card */}
        <div className="mt-2 p-3 bg-neutral-50 rounded-xl border border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs">{userInitials}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-neutral-900 truncate">{userName}</div>
              <div className="text-xs text-neutral-400 truncate">{session?.user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
