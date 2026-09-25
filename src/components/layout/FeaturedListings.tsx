import { Star, MapPin, Phone, ArrowUpRight, Clock, BadgeCheck, Sparkles } from 'lucide-react'
import Link from 'next/link'

const featuredBusinesses = [
  {
    id: 1,
    slug: 'kuriftu-resort-spa',
    name: 'Kuriftu Resort & Spa',
    category: 'Hotel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85',
    location: 'Bole, Addis Ababa',
    rating: 4.8,
    reviews: 324,
    isOpen: true,
    phone: '+251 116 670 000',
    description: 'Luxury resort with world-class spa, conference facilities and breathtaking views.',
    badge: 'Top Rated',
    badgeColor: 'bg-amber-100 text-amber-700',
  },
  {
    id: 2,
    slug: 'tomoca-coffee',
    name: 'Tomoca Coffee',
    category: 'Café',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=85',
    location: 'Piassa, Addis Ababa',
    rating: 4.6,
    reviews: 189,
    isOpen: true,
    phone: '+251 111 565 775',
    description: 'Iconic traditional Ethiopian coffee house serving since 1953. A true Addis institution.',
    badge: 'Historic',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    id: 3,
    slug: 'yod-abyssinia',
    name: 'Yod Abyssinia',
    category: 'Restaurant',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=85',
    location: 'Bole, Addis Ababa',
    rating: 4.7,
    reviews: 456,
    isOpen: true,
    phone: '+251 116 617 034',
    description: 'Authentic Ethiopian cuisine paired with mesmerizing traditional cultural shows.',
    badge: 'Cultural',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    id: 4,
    slug: 'aster-pharmacy',
    name: 'Aster Pharmacy',
    category: 'Pharmacy',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=600&q=85',
    location: 'Mekanisa, Addis Ababa',
    rating: 4.5,
    reviews: 98,
    isOpen: true,
    phone: '+251 113 770 919',
    description: 'Full-service pharmacy stocking a comprehensive range of medical supplies and drugs.',
    badge: 'Verified',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    id: 5,
    slug: 'shoa-supermarket',
    name: 'Shoa Supermarket',
    category: 'Supermarket',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&q=85',
    location: 'Bole, Addis Ababa',
    rating: 4.4,
    reviews: 267,
    isOpen: false,
    phone: '+251 116 630 025',
    description: 'Wide selection of fresh produce, groceries, and household essentials.',
    badge: null,
    badgeColor: '',
  },
  {
    id: 6,
    slug: 'national-museum-ethiopia',
    name: 'National Museum',
    category: 'Tourist Attraction',
    image: 'https://images.unsplash.com/photo-1572004476178-6132bae9b5de?w=600&q=85',
    location: 'Arada, Addis Ababa',
    rating: 4.9,
    reviews: 523,
    isOpen: true,
    phone: '+251 111 119 266',
    description: 'Home to Lucy and thousands of Ethiopian historical artifacts spanning millennia.',
    badge: 'Must Visit',
    badgeColor: 'bg-rose-100 text-rose-700',
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star 
          key={i} 
          className={`w-3.5 h-3.5 ${
            i < Math.floor(rating) 
              ? 'fill-amber-400 text-amber-400' 
              : i < rating 
                ? 'fill-amber-200 text-amber-300'
                : 'text-neutral-200'
          }`} 
        />
      ))}
    </div>
  )
}

export default function FeaturedListings() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#006747]/8 border border-[#006747]/15 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-[#006747]" />
              <span className="text-sm font-semibold text-[#006747]">Handpicked for You</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black text-neutral-900 mb-3">
              Top Rated Businesses
            </h2>
            <p className="text-neutral-500 text-lg max-w-lg leading-relaxed">
              Discover the most loved businesses across Ethiopia, curated by our community
            </p>
          </div>
          <Link 
            href="/businesses"
            className="inline-flex items-center gap-2 text-[#006747] font-semibold hover:text-[#004d34] transition-colors whitespace-nowrap group"
          >
            View all businesses
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBusinesses.map((business) => (
            <Link
              key={business.id}
              href={`/business/${business.slug}`}
              className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 hover:border-transparent hover:shadow-2xl transition-all duration-400 hover:-translate-y-1"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={business.image}
                  alt={business.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Top badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-lg text-xs font-semibold text-neutral-700">
                    {business.category}
                  </span>
                  {business.badge && (
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${business.badgeColor}`}>
                      {business.badge}
                    </span>
                  )}
                </div>

                {/* Open/Closed indicator */}
                <div className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg backdrop-blur-sm text-xs font-semibold ${
                  business.isOpen 
                    ? 'bg-emerald-500/90 text-white' 
                    : 'bg-neutral-800/70 text-white/80'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${business.isOpen ? 'bg-white animate-pulse-soft' : 'bg-white/60'}`} />
                  {business.isOpen ? 'Open' : 'Closed'}
                </div>

                {/* Verified badge on hover */}
                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1 bg-[#006747] text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    Verified
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                {/* Name + Arrow */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-display font-bold text-neutral-900 text-base leading-tight group-hover:text-[#006747] transition-colors">
                    {business.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-[#006747] flex-shrink-0 mt-0.5 transition-colors" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <StarRating rating={business.rating} />
                  <span className="text-sm font-bold text-neutral-800">{business.rating}</span>
                  <span className="text-xs text-neutral-400">({business.reviews.toLocaleString()})</span>
                </div>
                
                {/* Description */}
                <p className="text-sm text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                  {business.description}
                </p>
                
                {/* Footer info */}
                <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <MapPin className="w-3.5 h-3.5 text-[#006747]" />
                    <span className="truncate max-w-[140px]">{business.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Phone className="w-3.5 h-3.5 text-[#006747]" />
                    <span className="truncate max-w-[100px]">{business.phone}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="text-center mt-14">
          <Link 
            href="/businesses"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-[#006747] to-[#008B5F] hover:from-[#008B5F] hover:to-[#006747] text-white px-10 py-4 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-sm group"
          >
            <span>Explore All Businesses</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
