'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { 
  Search, Menu, X, User, LogIn, LogOut, Plus, 
  ChevronDown, LayoutDashboard, Bell, Sparkles,
  MapPin, Building2
} from 'lucide-react'
import UniversalSidebar from '@/components/layout/UniversalSidebar'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  
  const isLoggedIn = status === 'authenticated'
  
  // Handle scroll for sticky nav styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close profile menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navigationItems = [
    { name: 'Explore', href: '/businesses', icon: MapPin },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  ]

  const userName = session?.user?.name || 'User'
  const userInitials = userName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-md border-b border-neutral-100' 
          : 'bg-white/90 backdrop-blur-lg border-b border-neutral-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Left: Hamburger + Logo */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
                className="p-2 rounded-xl hover:bg-neutral-100 transition-colors text-neutral-600"
              >
                <Menu className="w-5 h-5" />
              </button>
              
              <Link href="/" className="flex items-center gap-2.5 group">
                <div className="w-9 h-9 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                  <span className="text-white font-black text-base font-display">H</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-black text-neutral-900 font-display tracking-tight">Hello</span>
                  <span className="text-xl font-black text-[#006747] font-display tracking-tight">ET</span>
                </div>
              </Link>
            </div>

            {/* Center: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-neutral-600 hover:text-[#006747] hover:bg-[#006747]/5 transition-all duration-200 font-medium text-sm"
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              
              {/* Add Business CTA */}
              <Link 
                href="/dashboard/businesses/new" 
                className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] text-white px-4 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>Add Business</span>
              </Link>

              {/* Profile dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  id="profile-menu-btn"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 ${
                    isLoggedIn 
                      ? 'bg-[#D1EFE4] hover:bg-[#B8E5D0] text-[#006747]' 
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                  }`}
                >
                  {isLoggedIn ? (
                    <>
                      <div className="w-7 h-7 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-lg flex items-center justify-center shadow-sm">
                        <span className="text-white font-bold text-xs">{userInitials}</span>
                      </div>
                      <span className="text-sm font-semibold hidden sm:block">
                        {userName.split(' ')[0]}
                      </span>
                    </>
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-neutral-100 py-2 animate-scaleIn origin-top-right">
                    {isLoggedIn ? (
                      <>
                        <div className="px-4 py-3 border-b border-neutral-100">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-xl flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{userInitials}</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-neutral-900">{session?.user?.name || 'User'}</p>
                              <p className="text-xs text-neutral-500 truncate max-w-[130px]">{session?.user?.email}</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-1">
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-[#D1EFE4] hover:text-[#006747] transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                          </Link>
                          <Link
                            href="/businesses"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-[#D1EFE4] hover:text-[#006747] transition-colors"
                            onClick={() => setIsProfileMenuOpen(false)}
                          >
                            <Building2 className="w-4 h-4" />
                            <span>Explore Businesses</span>
                          </Link>
                          <div className="border-t border-neutral-100 my-1" />
                          <button
                            onClick={() => {
                              signOut({ callbackUrl: '/' })
                              setIsProfileMenuOpen(false)
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="py-1">
                        <Link
                          href="/auth/login"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-[#D1EFE4] hover:text-[#006747] transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <LogIn className="w-4 h-4" />
                          <span>Sign In</span>
                        </Link>
                        <Link
                          href="/auth/register"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-[#006747] hover:bg-[#D1EFE4] transition-colors"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>Create Account</span>
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-btn"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-neutral-100 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen 
                  ? <X className="w-5 h-5 text-neutral-600" />
                  : <Menu className="w-5 h-5 text-neutral-600" />
                }
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral-100 bg-white animate-slideDown">
            <div className="px-4 py-4 space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 hover:bg-[#D1EFE4] hover:text-[#006747] font-medium transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-neutral-100">
                <Link 
                  href="/dashboard/businesses/new" 
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] text-white px-4 py-3 rounded-xl font-semibold transition-colors w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Plus className="w-4 h-4" />
                  Add Your Business
                </Link>
              </div>

              {!isLoggedIn && (
                <div className="flex gap-2">
                  <Link
                    href="/auth/login"
                    className="flex-1 flex items-center justify-center gap-2 border border-[#006747] text-[#006747] px-4 py-3 rounded-xl font-semibold transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </div>
              )}

              {isLoggedIn && (
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' })
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 text-red-500 border border-red-200 px-4 py-3 rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      
      <UniversalSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  )
}
