'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { 
  Mail, Lock, Eye, EyeOff, ArrowLeft, AlertCircle, 
  Sparkles, Shield, TrendingUp, Star, ChevronRight,
  CheckCircle2
} from 'lucide-react'

const features = [
  { icon: Shield, text: 'Verified business listings' },
  { icon: Star, text: 'Real community reviews' },
  { icon: TrendingUp, text: 'Business analytics & insights' },
]

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') || '/'
  
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill in all fields')
      setIsLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password. Please try again.')
        setIsLoading(false)
        return
      }

      const sessionRes = await fetch('/api/auth/session')
      const session = await sessionRes.json()

      if (session?.user?.role === 'BUSINESS_OWNER') {
        window.location.href = '/dashboard'
      } else if (callbackUrl && callbackUrl !== '/') {
        window.location.href = callbackUrl
      } else {
        window.location.href = '/'
      }
    } catch (error) {
      setError('Something went wrong. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      
      {/* Left Panel — decorative (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-[#004d34] via-[#006747] to-[#008B5F] flex-col justify-between p-12 relative overflow-hidden">
        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#EEF578]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

        {/* Logo */}
        <div className="relative">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <span className="text-white font-black text-xl font-display">H</span>
            </div>
            <span className="text-2xl font-black text-white font-display tracking-tight">
              Hello<span className="text-[#EEF578]">ET</span>
            </span>
          </Link>
        </div>

        {/* Middle content */}
        <div className="relative space-y-8">
          <div>
            <h2 className="font-display text-4xl font-black text-white leading-tight mb-4">
              Discover Ethiopia&apos;s finest businesses
            </h2>
            <p className="text-white/70 text-base leading-relaxed">
              Sign in to manage your listings, review businesses, and connect with local communities.
            </p>
          </div>

          <div className="space-y-4">
            {features.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-[#EEF578]" />
                </div>
                <span className="text-white/80 text-sm">{text}</span>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5">
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#EEF578] text-[#EEF578]" />
              ))}
            </div>
            <p className="text-white/85 text-sm leading-relaxed italic mb-3">
              "HelloET helped my restaurant reach thousands of new customers. The analytics alone are worth it!"
            </p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#EEF578]/30 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xs">AT</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold">Abebe Tadesse</p>
                <p className="text-white/50 text-xs">Yod Restaurant, Addis Ababa</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="relative">
          <p className="text-white/40 text-xs">© 2026 HelloET. Built for Ethiopian communities.</p>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-6 lg:px-16 xl:px-24">
        
        {/* Back link (mobile + desktop) */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#006747] transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to HelloET
          </Link>
        </div>

        <div className="max-w-md w-full mx-auto lg:mx-0">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-9 h-9 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-base">H</span>
            </div>
            <span className="text-xl font-black text-neutral-900">Hello<span className="text-[#006747]">ET</span></span>
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-black text-neutral-900 mb-2">
              Welcome back 👋
            </h1>
            <p className="text-neutral-500 text-base">
              Sign in to continue exploring Ethiopia&apos;s best businesses
            </p>
          </div>

          {/* Redirect notice */}
          {callbackUrl !== '/' && (
            <div className="mb-5 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-700">Sign in to continue where you left off</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] bg-white text-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-semibold text-neutral-700">
                  Password
                </label>
                <Link href="/auth/forgot-password" className="text-xs text-[#006747] hover:text-[#004d34] font-medium">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] bg-white text-sm transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 accent-[#006747] rounded"
              />
              <label htmlFor="remember" className="text-sm text-neutral-600">
                Keep me signed in
              </label>
            </div>

            {/* Submit */}
            <button
              id="submit-login"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-neutral-200" />
            <span className="text-xs text-neutral-400 font-medium">New to HelloET?</span>
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          {/* Register CTA */}
          <Link
            href="/auth/register"
            className="w-full flex items-center justify-center gap-2 border-2 border-[#006747]/20 hover:border-[#006747] text-[#006747] font-bold py-3.5 rounded-xl transition-all duration-300 text-sm hover:bg-[#006747]/5"
          >
            <Sparkles className="w-4 h-4" />
            Create a Free Account
          </Link>

          {/* Demo accounts */}
          <div className="mt-8 p-5 bg-neutral-50 border border-neutral-200 rounded-2xl">
            <p className="text-xs font-bold text-neutral-600 mb-3 uppercase tracking-wider">Demo Accounts</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Business Owner', email: 'business@helloet.com', pass: 'demo123' },
                { label: 'Regular User', email: 'user@helloet.com', pass: 'demo123' },
              ].map((demo) => (
                <button
                  key={demo.label}
                  onClick={() => setFormData({ email: demo.email, password: demo.pass })}
                  className="text-left p-3 bg-white border border-neutral-200 rounded-xl hover:border-[#006747]/40 hover:bg-[#D1EFE4]/30 transition-all group"
                >
                  <p className="text-xs font-semibold text-neutral-700 group-hover:text-[#006747] transition-colors">{demo.label}</p>
                  <p className="text-xs text-neutral-400 truncate mt-0.5">{demo.email}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-[#D1EFE4] border-t-[#006747] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
