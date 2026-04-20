import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../context/CartContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GoogleAnalytics from '../components/GoogleAnalytics'
import WhatsAppButton from '../components/WhatsAppButton'
import BackgroundAnimation from '../components/BackgroundAnimation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zanera Fashion - Luxury Menswear',
  description: 'Discover timeless elegance and contemporary style in our curated collection of premium men\'s fashion. Luxury suits, casual wear, and shirts for the modern gentleman.',
  icons: {
    icon: '/images/logo.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GoogleAnalytics />
        <BackgroundAnimation />
        <CartProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  )
}