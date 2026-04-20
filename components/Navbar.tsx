'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X, Search } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { state } = useCart()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e)
    }
  }

  const navigationItems = [
    { name: 'Home', href: '/' },
    { name: 'Suits', href: '/category/suits' },
    { name: 'Casual', href: '/category/casual' },
    { name: 'Shirts', href: '/category/shirts' },
    { name: 'T-Shirts', href: '/category/tshirts' },
    { name: 'Pants', href: '/category/pants' },
  ]

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-black hover:text-gray-700 transition-colors">
                ZANERA FASHION
              </Link>
            </div>

            {/* Search Bar - Center */}
            <div className="flex-1 max-w-md mx-8">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:border-black focus:ring-2 focus:ring-black/10 transition-all duration-300 outline-none"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </form>
            </div>

            {/* Right side - Cart and Menu */}
            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative group p-2">
                <ShoppingCart className="h-6 w-6 text-gray-700 group-hover:text-black transition-colors" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 text-gray-700 hover:text-black transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <div className={`fixed inset-0 z-50 ${isSidebarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div className={`absolute right-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 text-lg text-gray-700 hover:text-black transition-colors border-b border-gray-100 last:border-b-0"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Premium fashion for the modern gentleman
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
