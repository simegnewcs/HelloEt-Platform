import { CheckCircle, Users, Shield, Star, TrendingUp, MapPin } from 'lucide-react'

const trustItems = [
  {
    icon: CheckCircle,
    value: '10K+',
    title: 'Verified Listings',
    description: 'All businesses are authenticated',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Users,
    value: '50K+',
    title: 'Happy Users',
    description: 'Trusted by Ethiopians nationwide',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: MapPin,
    value: '80+',
    title: 'Cities Covered',
    description: 'Across all Ethiopian regions',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Star,
    value: '4.8★',
    title: 'Average Rating',
    description: 'From real customer reviews',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  }
]

export default function TrustStrip() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-[#006747] via-[#007a55] to-[#006747] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#EEF578]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {trustItems.map((item, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/25 transition-colors duration-300 group-hover:scale-110 transform transition-transform">
                <item.icon className="w-7 h-7 text-white" />
              </div>
              
              {/* Value */}
              <div className="text-3xl font-black text-white font-display mb-1 leading-none">
                {item.value}
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-white/90 text-sm mb-1">{item.title}</h3>
              
              {/* Description */}
              <p className="text-white/55 text-xs leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
