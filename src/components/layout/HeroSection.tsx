'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Search, MapPin, ChevronRight, Sparkles, 
  Play, Pause, Star, ArrowUpRight, Shield, Users, TrendingUp
} from 'lucide-react'

const ethiopianLandmarks = [
  {
    name: 'Lalibela Rock Churches',
    image: 'https://images.unsplash.com/photo-1535320404287-416e1c1b2e70?w=1920&q=90',
    subtitle: 'UNESCO World Heritage',
    city: 'Lalibela'
  },
  {
    name: 'Simien Mountains',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=90',
    subtitle: 'Breathtaking Highlands',
    city: 'Gondar'
  },
  {
    name: 'Addis Ababa',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1920&q=90',
    subtitle: 'Capital of Ethiopia',
    city: 'Addis Ababa'
  },
  {
    name: 'Axum Ancient Stelae',
    image: 'https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920&q=90',
    subtitle: 'Ancient Axumite Empire',
    city: 'Axum'
  },
  {
    name: 'Blue Nile Falls',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1920&q=90',
    subtitle: 'Tis Issat — Smoking Water',
    city: 'Bahir Dar'
  }
]

const ethiopianCities = [
  'All Locations', 'Addis Ababa', 'Bahir Dar', 'Hawassa', 'Mekelle',
  'Dire Dawa', 'Adama', 'Gondar', 'Jimma', 'Jijiga', 'Dessie',
  'Arba Minch', 'Sodo', 'Lalibela', 'Axum', 'Harar', 'Debre Markos'
]

const statsData = [
  { value: '10K+', label: 'Businesses', icon: TrendingUp },
  { value: '80+', label: 'Cities', icon: MapPin },
  { value: '50K+', label: 'Reviews', icon: Star },
  { value: '4.8★', label: 'Platform Rating', icon: Shield },
]

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [currentBgIndex, setCurrentBgIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
    if (!isAutoPlay) return
    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % ethiopianLandmarks.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlay])

  return (
    <div className="relative min-h-[88vh] overflow-hidden flex items-center">
      
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {ethiopianLandmarks.map((landmark, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out ${
              index === currentBgIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
            style={{ backgroundImage: `url(${landmark.image})` }}
          />
        ))}
        
        {/* Multi-layer gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#004d34]/95 via-[#006747]/75 to-[#006747]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-transparent" />

        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-[#EEF578]/10 rounded-full blur-3xl animate-float pointer-events-none" />
        <div className="absolute bottom-32 right-10 w-72 h-72 bg-[#006747]/20 rounded-full blur-3xl animate-float-reverse pointer-events-none" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content — spans 7 cols */}
            <div className={`lg:col-span-7 text-white space-y-8 ${isLoaded ? '' : 'opacity-0'}`}>
              
              {/* Location badge */}
              <div className="animate-fadeIn">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                  <div className="w-2 h-2 bg-[#EEF578] rounded-full animate-pulse-soft" />
                  <span className="text-sm font-medium text-white/90">
                    {ethiopianLandmarks[currentBgIndex].city} &bull; {ethiopianLandmarks[currentBgIndex].subtitle}
                  </span>
                </div>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h1 className="font-display animate-slideUp">
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05]">
                    Discover
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-transparent bg-clip-text" 
                    style={{ backgroundImage: 'linear-gradient(135deg, #EEF578, #F5F89A, #EEF578)' }}>
                    Ethiopia&apos;s Best
                  </span>
                  <span className="block text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] animate-slideUp animation-delay-200">
                    Places &amp; Businesses
                  </span>
                </h1>
              </div>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed animate-fadeIn animation-delay-300">
                From the ancient wonders of Lalibela to vibrant Addis Ababa — 
                find verified hotels, restaurants, cafés, and local businesses across 
                <span className="text-[#EEF578] font-semibold"> 80+ Ethiopian cities</span>.
              </p>

              {/* Search Bar */}
              <div className="animate-fadeIn animation-delay-400">
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-2 max-w-2xl shadow-2xl">
                  <div className="flex flex-col sm:flex-row items-stretch gap-2">
                    {/* Search Input */}
                    <div className="flex-1 flex items-center gap-3 px-4 py-3.5 bg-white rounded-xl">
                      <Search className="w-5 h-5 text-[#006747] flex-shrink-0" />
                      <input
                        type="text"
                        id="hero-search"
                        placeholder="Hotels, restaurants, cafés..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            window.location.href = `/businesses?search=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedLocation)}`
                          }
                        }}
                        className="flex-1 outline-none text-neutral-800 placeholder-neutral-400 bg-transparent text-sm font-medium"
                      />
                    </div>
                    
                    {/* Location Selector */}
                    <div className="flex items-center gap-2 px-4 py-3.5 bg-white rounded-xl min-w-0 sm:min-w-[160px]">
                      <MapPin className="w-4 h-4 text-[#006747] flex-shrink-0" />
                      <select 
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                        className="outline-none text-neutral-700 bg-transparent text-sm cursor-pointer font-medium w-full"
                      >
                        {ethiopianCities.map((city, i) => (
                          <option key={i} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>

                    {/* Search CTA */}
                    <Link 
                      href={`/businesses?search=${encodeURIComponent(searchQuery)}&city=${encodeURIComponent(selectedLocation)}`}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                    >
                      <span>Search</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Quick search suggestions */}
                <div className="flex flex-wrap gap-2 mt-3 animate-fadeIn animation-delay-500">
                  <span className="text-white/50 text-xs font-medium">Popular:</span>
                  {['Restaurants', 'Hotels', 'Cafés', 'Pharmacies'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white/80 text-xs font-medium transition-colors backdrop-blur-sm"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex flex-wrap items-center gap-6 animate-fadeIn animation-delay-600">
                {statsData.map(({ value, label, icon: Icon }, i) => (
                  <div key={i} className="flex items-center gap-2 group">
                    <div className="w-9 h-9 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-[#EEF578]/20 transition-colors">
                      <Icon className="w-4 h-4 text-[#EEF578]" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm leading-none">{value}</div>
                      <div className="text-white/60 text-xs leading-none mt-0.5">{label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content — spans 5 cols, desktop only */}
            <div className="hidden lg:block lg:col-span-5 animate-fadeIn animation-delay-600">
              <div className="relative">
                {/* Main card */}
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-white font-bold text-base flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#EEF578]" />
                        Featured Destinations
                      </h3>
                      <p className="text-white/50 text-xs mt-0.5">Explore Ethiopia&apos;s finest</p>
                    </div>
                    <span className="text-white/40 text-xs bg-white/10 px-2 py-1 rounded-full">
                      {currentBgIndex + 1} / {ethiopianLandmarks.length}
                    </span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {ethiopianLandmarks.map((landmark, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentBgIndex(index)
                          setIsAutoPlay(false)
                        }}
                        className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 text-left group ${
                          currentBgIndex === index
                            ? 'bg-gradient-to-r from-white/20 to-white/10 border border-[#EEF578]/40 shadow-lg'
                            : 'bg-white/5 border border-white/10 hover:bg-white/12 hover:border-white/20'
                        }`}
                      >
                        <div className={`w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 ring-2 transition-all duration-300 ${
                          currentBgIndex === index ? 'ring-[#EEF578]/60' : 'ring-white/20 group-hover:ring-white/40'
                        }`}>
                          <img 
                            src={landmark.image} 
                            alt={landmark.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-semibold text-sm truncate transition-colors ${
                            currentBgIndex === index ? 'text-white' : 'text-white/80'
                          }`}>
                            {landmark.name}
                          </h4>
                          <p className="text-white/50 text-xs mt-0.5">{landmark.subtitle}</p>
                        </div>
                        {currentBgIndex === index && (
                          <div className="w-2 h-2 bg-[#EEF578] rounded-full flex-shrink-0 animate-pulse-soft shadow-lg" 
                            style={{ boxShadow: '0 0 8px rgba(238, 245, 120, 0.8)' }} />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link 
                    href="/businesses"
                    className="mt-5 w-full flex items-center justify-center gap-2 bg-[#EEF578]/15 hover:bg-[#EEF578]/25 border border-[#EEF578]/30 text-white py-3 rounded-xl font-semibold transition-all duration-300 group text-sm"
                  >
                    <span>Browse All Businesses</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>

                {/* Floating mini-card: Verified badge */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-neutral-100">
                  <div className="w-10 h-10 bg-[#D1EFE4] rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#006747]" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-800">Verified Listings</p>
                    <p className="text-xs text-neutral-500">100% Authentic</p>
                  </div>
                </div>

                {/* Floating mini-card: Users */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-3.5 border border-neutral-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#006747]" />
                    <div>
                      <p className="text-xs font-bold text-neutral-800">50K+ Users</p>
                      <p className="text-xs text-neutral-500">Trust HelloET</p>
                    </div>
                  </div>
                </div>

                {/* Decorative glows */}
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#EEF578]/20 rounded-full blur-3xl animate-pulse-soft" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slideshow Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md rounded-full px-4 py-2">
          {ethiopianLandmarks.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentBgIndex(index)
                setIsAutoPlay(false)
              }}
              className={`transition-all duration-300 rounded-full ${
                currentBgIndex === index 
                  ? 'w-8 h-2 bg-[#EEF578]' 
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="w-8 h-8 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60L1440 60L1440 20C1200 55 960 5 720 25C480 45 240 0 0 30L0 60Z" fill="#FAFAFA"/>
        </svg>
      </div>
    </div>
  )
}
