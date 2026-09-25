import HeroSection from '@/components/layout/HeroSection'
import TrustStrip from '@/components/layout/TrustStrip'
import CategoryGrid from '@/components/layout/CategoryGrid'
import FeaturedListings from '@/components/layout/FeaturedListings'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'
import { ArrowUpRight, Plus, Sparkles } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <HeroSection />
      <TrustStrip />
      <CategoryGrid />
      <FeaturedListings />

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-[#004d34] via-[#006747] to-[#008B5F] relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z' fill='none' stroke='%23ffffff' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#EEF578]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-[#EEF578]" />
            <span className="text-sm font-semibold text-white">Grow Your Business</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.05]">
            Ready to List Your
            <span className="block text-transparent bg-clip-text"
              style={{ backgroundImage: 'linear-gradient(135deg, #EEF578, #F5F89A)' }}>
              Ethiopian Business?
            </span>
          </h2>
          
          <p className="text-white/75 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Join thousands of Ethiopian businesses already on HelloET. 
            Get discovered by customers, manage your reviews, and grow your online presence — all for free to start.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/auth/register"
              className="flex items-center gap-2.5 bg-[#EEF578] hover:bg-[#F5F89A] text-[#004d34] px-8 py-4 rounded-2xl font-black text-base transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 group"
            >
              <Plus className="w-5 h-5" />
              <span>List Your Business — Free</span>
            </Link>
            <Link 
              href="/businesses"
              className="flex items-center gap-2.5 border-2 border-white/30 hover:border-white/60 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300 hover:bg-white/10 group"
            >
              <span>Explore Businesses</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Social proof under CTA */}
          <p className="text-white/50 text-sm mt-8">
            ✓ No credit card required &nbsp;·&nbsp; ✓ Setup in minutes &nbsp;·&nbsp; ✓ Free forever plan
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
