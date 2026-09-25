'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { 
  Search, 
  Filter, 
  MapPin, 
  Star, 
  Phone, 
  Globe,
  Building2,
  Utensils,
  Bed,
  Coffee,
  Pill,
  ShoppingCart,
  Camera,
  ChevronDown,
  Grid,
  List
} from 'lucide-react'

interface Business {
  id: number
  slug: string
  name: string
  description?: string
  category: string
  location: string
  address?: string
  phone?: string
  website?: string
  verified: boolean
  image?: string
  rating: number
  reviewCount: number
  latitude?: number
  longitude?: number
}

interface Category {
  id: number
  name: string
  description?: string
  icon?: string
  businessCount: number
}

const categoryIcons: Record<string, any> = {
  'restaurants': Utensils,
  'hotels': Bed,
  'cafes': Coffee,
  'pharmacies': Pill,
  'supermarkets': ShoppingCart,
  'tourist attractions': Camera,
  'default': Building2
}

export default function AllBusinessesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams?.get('category') || 'all'
  
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl)
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  const locations = [
    'All Locations',
    'Addis Ababa',
    'Bole',
    'Piassa',
    'Mekanisa',
    'Airport',
    'Kazanchis',
    'Piazza'
  ]

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
  }, [categoryFromUrl])

  // Handle category change - update URL
  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory)
    if (newCategory === 'all') {
      router.push('/businesses')
    } else {
      router.push(`/businesses?category=${encodeURIComponent(newCategory)}`)
    }
  }

  useEffect(() => {
    fetchData()
  }, [categoryFromUrl]) // Re-fetch when category from URL changes

  const fetchData = async () => {
    try {
      // Fetch businesses with category filter if provided
      const categoryParam = categoryFromUrl !== 'all' ? `&category=${categoryFromUrl}` : ''
      const businessesResponse = await fetch(`/api/search?q=&limit=100${categoryParam}`)
      const businessesData = await businessesResponse.json()
      
      if (businessesData.success) {
        setBusinesses(businessesData.data.businesses)
      }

      // Fetch categories
      const categoriesResponse = await fetch('/api/categories')
      const categoriesData = await categoriesResponse.json()
      
      if (categoriesData.success) {
        setCategories(categoriesData.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter businesses - only apply search and location filters since category is already filtered by API
  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = !searchTerm || 
                         business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesLocation = selectedLocation === 'all' || 
                           business.location.toLowerCase().includes(selectedLocation.toLowerCase())
    
    return matchesSearch && matchesLocation
  }).sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.reviewCount - a.reviewCount
      case 'verified':
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0)
      default:
        return 0
    }
  })

  const getCategoryIcon = (categoryName: string) => {
    const normalizedName = categoryName.toLowerCase()
    return categoryIcons[normalizedName] || categoryIcons.default
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-3 border-[#D1EFE4] border-t-[#006747] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-neutral-500 font-medium">Finding businesses...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#004d34] via-[#006747] to-[#008B5F] py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`, backgroundSize: '40px 40px' }} />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
              <Building2 className="w-3.5 h-3.5 text-[#EEF578]" />
              <span className="text-white/80 text-xs font-medium">Ethiopia's Business Directory</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-black text-white mb-3">
              {categoryFromUrl !== 'all' ? `${categoryFromUrl} Businesses` : 'All Businesses in Ethiopia'}
            </h1>
            <p className="text-white/70 text-lg max-w-xl mx-auto">
              {categoryFromUrl !== 'all' 
                ? `Discover trusted ${categoryFromUrl.toLowerCase()} businesses across Ethiopia`
                : 'Discover trusted local businesses across all categories and locations'
              }
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 flex items-center gap-2 shadow-xl">
              <div className="flex-1 flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl">
                <Search className="w-4 h-4 text-[#006747] flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search businesses, categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 outline-none text-neutral-800 placeholder-neutral-400 text-sm bg-transparent"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all font-semibold text-sm ${showFilters ? 'bg-[#EEF578] text-[#004d34]' : 'bg-white/15 text-white hover:bg-white/25'}`}
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white border-b border-neutral-100 px-4 py-5 shadow-sm">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] text-sm bg-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name} ({category.businessCount})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] text-sm bg-white"
                >
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006747]/20 focus:border-[#006747] text-sm bg-white"
                >
                  <option value="name">Name A-Z</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="verified">Verified First</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">View</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border rounded-xl transition-all text-sm font-medium ${
                      viewMode === 'grid' 
                        ? 'bg-[#006747] text-white border-[#006747] shadow-md' 
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-[#006747]/40'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border rounded-xl transition-all text-sm font-medium ${
                      viewMode === 'list' 
                        ? 'bg-[#006747] text-white border-[#006747] shadow-md' 
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-[#006747]/40'
                    }`}
                  >
                    <List className="w-4 h-4" />
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold text-neutral-900">
              <span className="text-[#006747]">{filteredBusinesses.length}</span> Businesses Found
            </h2>
            <p className="text-neutral-500 text-sm mt-0.5">
              {selectedCategory !== 'all' && <span className="inline-flex items-center gap-1 bg-[#D1EFE4] text-[#006747] px-2 py-0.5 rounded-full text-xs font-semibold mr-2">{selectedCategory}</span>}
              {selectedLocation !== 'all' && <span className="inline-flex items-center gap-1 bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full text-xs font-semibold mr-2">{selectedLocation}</span>}
              Sorted by {sortBy}
            </p>
          </div>
        </div>
      </div>

      {/* Business List */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        {filteredBusinesses.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBusinesses.map((business) => {
                const CategoryIcon = getCategoryIcon(business.category)
                return (
                  <Link
                    key={business.id}
                    href={`/business/${business.slug}`}
                    className="group bg-white rounded-2xl border border-neutral-100 overflow-hidden hover:border-transparent hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-48 overflow-hidden bg-neutral-100">
                      {business.image ? (
                        <img
                          src={business.image}
                          alt={business.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#D1EFE4] to-[#006747]/20 flex items-center justify-center">
                          <CategoryIcon className="w-14 h-14 text-[#006747]/40" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-semibold text-neutral-700">
                        {business.category}
                      </div>
                      {business.verified && (
                        <div className="absolute top-3 right-3 bg-[#006747] text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                          <span>✓</span> Verified
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-display font-bold text-base text-neutral-900 mb-2 group-hover:text-[#006747] transition-colors leading-tight">
                        {business.name}
                      </h3>
                      
                      <div className="flex items-center gap-1.5 mb-2">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-neutral-800">{business.rating.toFixed(1)}</span>
                        <span className="text-xs text-neutral-400">({business.reviewCount})</span>
                      </div>
                      
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-[#006747]" />
                        <span className="truncate">{business.location}</span>
                      </div>
                      
                      {business.description && (
                        <p className="text-xs text-neutral-500 line-clamp-2 mb-4 leading-relaxed">
                          {business.description}
                        </p>
                      )}
                      
                      <div className="inline-flex items-center gap-1.5 bg-[#D1EFE4] text-[#006747] px-3 py-1.5 rounded-lg text-xs font-bold group-hover:bg-[#006747] group-hover:text-white transition-colors">
                        <span>View Details</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
              <div className="divide-y divide-neutral-200">
                {filteredBusinesses.map((business) => (
                  <Link
                    key={business.id}
                    href={`/business/${business.slug}`}
                    className="block p-6 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-20 h-20 bg-neutral-200 rounded-lg overflow-hidden flex-shrink-0">
                        {business.image ? (
                          <img
                            src={business.image}
                            alt={business.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-neutral-300 flex items-center justify-center">
                            <Building2 className="w-8 h-8 text-neutral-400" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-800 truncate">
                            {business.name}
                          </h3>
                          {business.verified && (
                            <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                              <span>✓</span>
                              <span>Verified</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-2">
                          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs font-medium">
                            {business.category}
                          </span>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{business.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{business.rating.toFixed(1)}</span>
                            <span className="text-neutral-500">({business.reviewCount})</span>
                          </div>
                        </div>
                        
                        {business.description && (
                          <p className="text-sm text-neutral-600 line-clamp-2">
                            {business.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end space-y-2">
                        <Link
                          href={`/business/${business.slug}`}
                          className="inline-flex items-center gap-1 bg-primary-500 hover:bg-primary-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                        >
                          <span>View Details</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        {business.phone && (
                          <div className="flex items-center space-x-1 text-sm text-neutral-600">
                            <Phone className="w-3 h-3" />
                            <span>{business.phone}</span>
                          </div>
                        )}
                        {business.website && (
                          <div className="flex items-center space-x-1 text-sm text-primary-600">
                            <Globe className="w-3 h-3" />
                            <span>Website</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#D1EFE4] rounded-3xl flex items-center justify-center mx-auto mb-5">
              <Building2 className="w-10 h-10 text-[#006747]" />
            </div>
            <h3 className="font-display text-xl font-bold text-neutral-900 mb-2">
              {categoryFromUrl !== 'all' ? `No ${categoryFromUrl} businesses found` : 'No businesses found'}
            </h3>
            <p className="text-neutral-500 mb-6 text-sm max-w-sm mx-auto">
              {categoryFromUrl !== 'all' 
                ? 'Try selecting a different category or clearing filters'
                : 'Try adjusting your search criteria or filters'
              }
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedLocation('all')
                handleCategoryChange('all')
              }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#006747] to-[#008B5F] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all hover:shadow-lg"
            >
              {categoryFromUrl !== 'all' ? 'Show All Businesses' : 'Clear Filters'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
