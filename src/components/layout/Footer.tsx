import Link from 'next/link'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, ArrowUpRight } from 'lucide-react'

const footerLinks = {
  discover: [
    { name: 'Browse Businesses', href: '/businesses' },
    { name: 'Restaurants', href: '/businesses?category=restaurant' },
    { name: 'Hotels', href: '/businesses?category=hotel' },
    { name: 'Cafés', href: '/businesses?category=cafe' },
    { name: 'Pharmacies', href: '/businesses?category=pharmacy' },
  ],
  business: [
    { name: 'Add Your Business', href: '/dashboard/businesses/new' },
    { name: 'Business Dashboard', href: '/dashboard' },
    { name: 'Subscription Plans', href: '/pricing' },
    { name: 'Analytics', href: '/dashboard/analytics' },
  ],
  company: [
    { name: 'About HelloET', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Cookie Policy', href: '/cookies' },
  ]
}

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-14 pb-14 border-b border-white/10">
          
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-[#006747] to-[#008B5F] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg font-display">H</span>
              </div>
              <div>
                <span className="text-xl font-black text-white font-display tracking-tight">Hello</span>
                <span className="text-xl font-black text-[#EEF578] font-display tracking-tight">ET</span>
              </div>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs mb-6">
              Ethiopia&apos;s most trusted local business discovery platform. Connecting communities with verified local businesses across 80+ cities.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-[#006747]" />
                <span>Addis Ababa, Ethiopia</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <Mail className="w-4 h-4 text-[#006747]" />
                <span>support@helloet.com</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                <Phone className="w-4 h-4 text-[#006747]" />
                <span>+251 911 000 000</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 bg-white/8 hover:bg-[#006747] rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  <Icon className="w-4 h-4 text-neutral-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-white text-sm mb-4 font-display">Discover</h4>
              <ul className="space-y-2.5">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-[#EEF578] text-sm transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4 font-display">For Business</h4>
              <ul className="space-y-2.5">
                {footerLinks.business.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-[#EEF578] text-sm transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-sm mb-4 font-display">Company</h4>
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-neutral-400 hover:text-[#EEF578] text-sm transition-colors duration-200">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mb-12 p-6 bg-white/5 border border-white/10 rounded-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <h4 className="font-bold text-white mb-1">Stay in the loop 🇪🇹</h4>
              <p className="text-neutral-400 text-sm">Get the latest businesses and updates from HelloET</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-neutral-500 text-sm outline-none focus:border-[#006747] transition-colors"
              />
              <button className="px-5 py-2.5 bg-gradient-to-r from-[#006747] to-[#008B5F] text-white rounded-xl font-semibold text-sm hover:from-[#008B5F] hover:to-[#006747] transition-all duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            © 2026 HelloET. Built with ❤️ for Ethiopian communities.
          </p>
          <div className="flex items-center gap-5">
            {footerLinks.legal.map((link) => (
              <Link key={link.name} href={link.href} className="text-neutral-500 hover:text-neutral-300 text-xs transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
