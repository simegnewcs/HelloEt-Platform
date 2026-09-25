'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft, Eye, EyeOff, Building2, Mail,
  User, Briefcase, X, Lock, Star, TrendingUp,
  ChevronRight, CheckCircle2, ShieldCheck, Sparkles
} from 'lucide-react'

type Step = 'role' | 'details'

export default function RegisterPage() {
  const [step, setStep] = useState<Step>('role')
  const [userType, setUserType] = useState<'user' | 'business' | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) { setError('Full name is required'); return false }
    if (!formData.email.trim()) { setError('Email is required'); return false }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) { setError('Please enter a valid email address'); return false }
    if (!formData.password) { setError('Password is required'); return false }
    if (formData.password.length < 8) { setError('Password must be at least 8 characters'); return false }
    if (formData.password !== formData.confirmPassword) { setError('Passwords do not match'); return false }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name.trim(), email: formData.email.trim(), password: formData.password, userType }),
      })
      const data = await response.json()
      if (response.ok) {
        setSuccess('Account created! Redirecting to sign in...')
        setTimeout(() => { window.location.href = '/auth/login' }, 2000)
      } else {
        setError(data.message || 'Registration failed. Please try again.')
      }
    } catch {
      setError('Network error. Please check your connection.')
    } finally {
      setIsLoading(false)
    }
  }

  const passwordStrength = (pwd: string) => {
    if (!pwd) return 0
    let score = 0
    if (pwd.length >= 8) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return score
  }

  const strength = passwordStrength(formData.password)
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
  const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-blue-400', 'bg-green-500']

  /* ─── STEP 1: Role Selection ─── */
  if (step === 'role') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl">
          
          <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#006747] transition-colors mb-8 text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to HelloET
          </Link>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-2xl mb-5 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-4xl font-black text-neutral-900 mb-3">Create Your Account</h1>
            <p className="text-neutral-500 text-base max-w-md mx-auto leading-relaxed">
              Tell us who you are — this personalizes your HelloET experience from the start.
            </p>
          </div>

          {/* Role Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
            
            {/* Regular User */}
            <button
              id="role-user"
              type="button"
              onClick={() => setUserType('user')}
              className={`group relative p-7 rounded-2xl border-2 text-left transition-all duration-300 ${
                userType === 'user'
                  ? 'border-[#006747] bg-[#006747] shadow-xl shadow-[#006747]/20 scale-[1.01]'
                  : 'border-neutral-200 bg-white hover:border-[#006747]/40 hover:shadow-lg'
              }`}
            >
              {userType === 'user' && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                userType === 'user' ? 'bg-white/20' : 'bg-[#D1EFE4] group-hover:bg-[#B8E5D0]'
              }`}>
                <User className={`w-7 h-7 ${userType === 'user' ? 'text-white' : 'text-[#006747]'}`} />
              </div>
              <div className={`font-display font-black text-xl mb-2 ${userType === 'user' ? 'text-white' : 'text-neutral-900'}`}>
                Regular User
              </div>
              <p className={`text-sm leading-relaxed mb-5 ${userType === 'user' ? 'text-white/75' : 'text-neutral-500'}`}>
                Discover, explore, and review Ethiopian businesses. Access your personal dashboard.
              </p>
              <ul className={`space-y-2 text-xs ${userType === 'user' ? 'text-white/65' : 'text-neutral-400'}`}>
                {['Browse & search businesses', 'Write reviews & ratings', 'Save your favorites'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${userType === 'user' ? 'bg-[#EEF578]' : 'bg-[#006747]'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </button>

            {/* Business Owner */}
            <button
              id="role-business"
              type="button"
              onClick={() => setUserType('business')}
              className={`group relative p-7 rounded-2xl border-2 text-left transition-all duration-300 ${
                userType === 'business'
                  ? 'border-[#006747] bg-[#006747] shadow-xl shadow-[#006747]/20 scale-[1.01]'
                  : 'border-neutral-200 bg-white hover:border-[#006747]/40 hover:shadow-lg'
              }`}
            >
              {userType === 'business' && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
              )}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors ${
                userType === 'business' ? 'bg-white/20' : 'bg-[#D1EFE4] group-hover:bg-[#B8E5D0]'
              }`}>
                <Briefcase className={`w-7 h-7 ${userType === 'business' ? 'text-white' : 'text-[#006747]'}`} />
              </div>
              <div className={`font-display font-black text-xl mb-2 ${userType === 'business' ? 'text-white' : 'text-neutral-900'}`}>
                Business Owner
              </div>
              <p className={`text-sm leading-relaxed mb-5 ${userType === 'business' ? 'text-white/75' : 'text-neutral-500'}`}>
                List and manage your business. Get analytics, respond to reviews, and grow your customer base.
              </p>
              <ul className={`space-y-2 text-xs ${userType === 'business' ? 'text-white/65' : 'text-neutral-400'}`}>
                {['Business dashboard & analytics', 'Manage listings & photos', 'Respond to customer reviews'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${userType === 'business' ? 'bg-[#EEF578]' : 'bg-[#006747]'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </button>
          </div>

          {/* Selection Indicator */}
          {userType && (
            <div className="flex items-center justify-center gap-2 mb-6 animate-scaleIn">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#D1EFE4] border border-[#006747]/20 rounded-full text-[#006747] text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                {userType === 'user' ? 'Regular User' : 'Business Owner'} selected
              </div>
            </div>
          )}

          <button
            id="continue-to-details"
            type="button"
            disabled={!userType}
            onClick={() => setStep('details')}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] disabled:from-neutral-200 disabled:to-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
          >
            Continue
            <ChevronRight className="w-5 h-5" />
          </button>

          <p className="text-center text-sm text-neutral-500 mt-5">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-[#006747] font-semibold hover:text-[#004d34]">Sign in</Link>
          </p>
        </div>
      </div>
    )
  }

  /* ─── STEP 2: Registration Form ─── */
  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4">
      <div className="max-w-lg mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            type="button"
            onClick={() => { setStep('role'); setError('') }}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-[#006747] transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Change role
          </button>

          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${
            userType === 'business'
              ? 'bg-amber-50 border-amber-200 text-amber-700'
              : 'bg-[#D1EFE4] border-[#006747]/20 text-[#006747]'
          }`}>
            {userType === 'business' ? <Briefcase className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
            {userType === 'business' ? 'Business Owner' : 'Regular User'}
          </div>
        </div>

        <div className="mb-8">
          <h1 className="font-display text-3xl font-black text-neutral-900 mb-2">
            {userType === 'business' ? 'Set up your account' : 'Complete your profile'}
          </h1>
          <p className="text-neutral-500 text-sm">
            {userType === 'business'
              ? 'Create your account — then add your business listing from the dashboard.'
              : "Just a few details and you're in."}
          </p>
        </div>

        {/* Error / Success */}
        {error && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <X className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="mb-5 p-4 bg-green-50 border border-green-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] text-sm transition-all"
                  placeholder="Your full name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] text-sm transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-12 py-3 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] text-sm transition-all"
                  placeholder="Min. 8 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Password strength */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= strength ? strengthColors[strength] : 'bg-neutral-200'}`} />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${
                    strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-amber-500' : strength === 3 ? 'text-blue-500' : 'text-green-600'
                  }`}>
                    {strengthLabel}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1.5">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:outline-none focus:ring-2 text-sm transition-all ${
                    formData.confirmPassword && formData.password !== formData.confirmPassword
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400'
                      : formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-green-400 focus:ring-green-200 focus:border-green-500'
                        : 'border-neutral-200 focus:ring-[#006747]/20 focus:border-[#006747]'
                  }`}
                  placeholder="Confirm your password"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600">
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <CheckCircle2 className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                )}
              </div>
            </div>

            {/* Business info note */}
            {userType === 'business' && (
              <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                <Building2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-amber-800">Business details come next</p>
                  <p className="text-xs text-amber-700 mt-0.5">
                    After creating your account you&apos;ll be taken to your Business Dashboard to add your listing, photos, and more.
                  </p>
                </div>
              </div>
            )}

            {/* Terms */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                id="terms"
                required
                className="mt-0.5 w-4 h-4 accent-[#006747] rounded"
              />
              <span className="text-sm text-neutral-600 leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-[#006747] font-semibold hover:text-[#004d34]">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#006747] font-semibold hover:text-[#004d34]">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button
              id="submit-register"
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-300 text-sm shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>{userType === 'business' ? 'Create Account & Go to Dashboard' : 'Create My Account'}</span>
                </>
              )}
            </button>

            <p className="text-center text-sm text-neutral-500">
              Already have an account?{' '}
              <Link href="/auth/login" className="text-[#006747] font-semibold hover:text-[#004d34]">Sign in</Link>
            </p>
          </form>
        </div>

        {/* Benefits */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: Building2, title: 'Get Discovered', desc: 'Reach thousands of customers' },
            { icon: Star, title: 'Build Trust', desc: 'Collect real reviews' },
            { icon: TrendingUp, title: 'Grow Faster', desc: 'Insights and analytics' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center">
              <div className="w-10 h-10 bg-[#D1EFE4] rounded-xl flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5 text-[#006747]" />
              </div>
              <h3 className="font-bold text-neutral-800 text-xs mb-0.5">{title}</h3>
              <p className="text-xs text-neutral-400">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}