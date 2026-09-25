'use client'

import Link from 'next/link'
import { 
  Utensils, Bed, Coffee, Pill, ShoppingCart, 
  Camera, MapPin, Wrench, ArrowUpRight, Sparkles,
  Scissors, Car, Dumbbell, BookOpen
} from 'lucide-react'

const categories = [
  {
    icon: Utensils,
    title: 'Restaurants',
    description: 'Authentic dining experiences',
    count: '2,847',
    gradient: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
    href: '/businesses?category=restaurant'
  },
  {
    icon: Bed,
    title: 'Hotels',
    description: 'Comfortable stays for every budget',
    count: '1,523',
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50',
    iconColor: 'text-blue-600',
    href: '/businesses?category=hotel'
  },
  {
    icon: Coffee,
    title: 'Cafés',
    description: 'Perfect spots for coffee & work',
    count: '892',
    gradient: 'from-amber-500 to-orange-600',
    bg: 'bg-amber-50',
    iconColor: 'text-amber-600',
    href: '/businesses?category=cafe'
  },
  {
    icon: Pill,
    title: 'Pharmacies',
    description: 'Health and wellness essentials',
    count: '456',
    gradient: 'from-rose-500 to-pink-600',
    bg: 'bg-rose-50',
    iconColor: 'text-rose-600',
    href: '/businesses?category=pharmacy'
  },
  {
    icon: ShoppingCart,
    title: 'Supermarkets',
    description: 'Groceries and daily necessities',
    count: '678',
    gradient: 'from-green-500 to-lime-600',
    bg: 'bg-green-50',
    iconColor: 'text-green-600',
    href: '/businesses?category=supermarket'
  },
  {
    icon: Camera,
    title: 'Tourist Spots',
    description: "Explore Ethiopia's treasures",
    count: '234',
    gradient: 'from-purple-500 to-violet-600',
    bg: 'bg-purple-50',
    iconColor: 'text-purple-600',
    href: '/businesses?category=tourist-attraction'
  },
  {
    icon: Car,
    title: 'Auto Services',
    description: 'Car care and repair shops',
    count: '389',
    gradient: 'from-slate-500 to-gray-600',
    bg: 'bg-slate-50',
    iconColor: 'text-slate-600',
    href: '/businesses?category=auto-service'
  },
  {
    icon: Dumbbell,
    title: 'Fitness & Gyms',
    description: 'Wellness and training centers',
    count: '201',
    gradient: 'from-orange-500 to-red-600',
    bg: 'bg-orange-50',
    iconColor: 'text-orange-600',
    href: '/businesses?category=fitness'
  }
]

export default function CategoryGrid() {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-[#FAFAFA] via-[#D1EFE4]/20 to-[#FAFAFA]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#006747]/8 border border-[#006747]/15 rounded-full px-4 py-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#006747]" />
            <span className="text-sm font-semibold text-[#006747]">Browse by Category</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-neutral-900 mb-4">
            Find What You{' '}
            <span className="relative inline-block">
              <span className="text-[#006747]">Need</span>
              <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 120 8" fill="none">
                <path d="M2 6C20 2 40 6 60 4C80 2 100 6 118 4" stroke="#EEF578" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Explore thousands of verified businesses across every category in Ethiopia
          </p>
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={category.href}
              className="group relative bg-white rounded-2xl p-5 md:p-6 cursor-pointer transition-all duration-400 hover:scale-[1.02] hover:-translate-y-1 border border-neutral-100 hover:border-transparent hover:shadow-2xl"
              style={{
                animationDelay: `${index * 80}ms`
              }}
            >
              {/* Hover gradient border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-400 -z-10 blur-sm`} />
              <div className="absolute inset-[1px] rounded-2xl bg-white -z-10" />
              
              {/* Hover bg tint */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-400`} />
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className={`w-14 h-14 ${category.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className={`w-7 h-7 ${category.iconColor}`} />
                </div>
                
                {/* Title + Arrow */}
                <div className="flex items-start justify-between mb-1.5">
                  <h3 className="font-display font-bold text-neutral-900 text-base md:text-lg leading-tight group-hover:text-[#006747] transition-colors duration-300">
                    {category.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-[#006747] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 flex-shrink-0 mt-0.5" />
                </div>
                
                {/* Description */}
                <p className="text-xs md:text-sm text-neutral-500 mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                {/* Count */}
                <div className="flex items-center gap-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${category.gradient}`} />
                  <span className="text-xs font-semibold text-neutral-500">
                    {category.count} listings
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/businesses"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-green-200/50 text-sm group"
          >
            <span>Browse All Categories</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
