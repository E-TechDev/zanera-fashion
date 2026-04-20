'use client'

import { useState } from 'react'
import { client } from '../../lib/sanity'

interface DashboardStats {
  totalProducts: number
  featuredProducts: number
  categoryDistribution: { [key: string]: number }
}

export default function Dashboard() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      fetchStats()
    } else {
      alert('Incorrect password')
    }
  }

  const fetchStats = async () => {
    try {
      const products = await client.fetch(`
        *[_type == "product"] {
          _id,
          category,
          featured
        }
      `)

      const totalProducts = products.length
      const featuredProducts = products.filter((p: { featured: boolean }) => p.featured).length

      const categoryDistribution: { [key: string]: number } = {}
      products.forEach((product: { category: string }) => {
        categoryDistribution[product.category] = (categoryDistribution[product.category] || 0) + 1
      })

      setStats({ totalProducts, featuredProducts, categoryDistribution })
    } catch (error) {
      console.error('Error fetching stats:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Admin Dashboard
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <input
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Total Products</h3>
              <p className="text-3xl font-bold">{stats.totalProducts}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Featured Products</h3>
              <p className="text-3xl font-bold">{stats.featuredProducts}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Categories</h3>
              <div className="space-y-1">
                {Object.entries(stats.categoryDistribution).map(([category, count]) => (
                  <p key={category} className="text-sm">
                    {category}: {count}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-8">
          <a
            href="/studio"
            target="_blank"
            className="btn bg-blue-600 hover:bg-blue-700"
          >
            Open Sanity Studio
          </a>
        </div>
      </div>
    </div>
  )
}