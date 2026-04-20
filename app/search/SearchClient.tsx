'use client'

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

export default function SearchClient() {
  const searchParams = useSearchParams()
  const query = searchParams?.get('q') || ''
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const results = await client.fetch(`*[_type == "product" && name match "*${query.toLowerCase()}*"] {
          _id,
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
      <div className="max-w-7xl mx-auto px-4 py-16">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              {query
                ? `No products match "${query}".`
                : 'Enter a search term.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
