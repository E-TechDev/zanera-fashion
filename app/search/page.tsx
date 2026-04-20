'use client'

export const dynamic = 'force-dynamic'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { client } from '../../lib/sanity'
import ProductCard from '../../components/ProductCard'
import { ProductCardSkeleton } from '../../components/Loading'

interface Product {
  _id: string
  name: string
  price: number
  category: string
  sizes: string[]
  images: any[]
  description: string
  inStock: boolean
  featured: boolean
  trending: boolean
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const results = await client.fetch(`*[_type == "product" && name match "*${query.toLowerCase()}*"] {
          name,
          price,
          category,
          sizes,
          images,
          description,
          inStock,
          featured,
          trending
        }`)

        setProducts(results)
        setError(null)
      } catch (err) {
        console.error('Search error:', err)
        setError('Failed to search products')
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      searchProducts()
    } else {
      setProducts([])
      setLoading(false)
    }
  }, [query])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>
          {query && (
            <p className="text-lg text-gray-600">
              Showing results for "{query}"
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-300">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">
              {query ? `No products match "${query}". Try a different search term.` : 'Enter a search term to find products.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
