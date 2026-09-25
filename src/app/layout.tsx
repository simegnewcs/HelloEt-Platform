import './globals.css'
import { Inter, Outfit } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import { SessionProvider } from '@/components/providers/SessionProvider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

export const metadata = {
  title: 'HelloET — Discover Local Businesses in Ethiopia',
  description: 'Ethiopia\'s most trusted local discovery platform. Find hotels, restaurants, cafés, and thousands of businesses across 80+ cities.',
  keywords: 'Ethiopia, businesses, restaurants, hotels, Addis Ababa, local discovery, HelloET',
  openGraph: {
    title: 'HelloET — Discover Local Businesses in Ethiopia',
    description: 'Find the best businesses across Ethiopia',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className={inter.className}>
        <SessionProvider>
          <Navbar />
          <main>
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  )
}
