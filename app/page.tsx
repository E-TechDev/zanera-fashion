import { Suspense } from 'react'
import { client } from '../lib/sanity'
import HeroSection from '../components/HeroSection'
import Promotions from '../components/Promotions'
import CategorySection from '../components/CategorySection'
import TrendingProducts from '../components/TrendingProducts'
import AllProducts from '../components/AllProducts'
import AnimatedBackground from '../components/AnimatedBackground'
import { ProductCardSkeleton } from '../components/Loading'

export const dynamic = 'force-dynamic'
export const revalidate = 60 // Revalidate every 60 seconds

async function getPromotions() {
  try {
    const promotions = await client.fetch(`
      *[_type == "promotion"] {
        _id,
        title,
        discount,
        description,
        product-> { images },
        endDate,
        isActive,
        priority
      }
    `)
    console.log('Promotions found:', promotions.length)
    return promotions
  } catch (error) {
    console.error('Error fetching promotions:', error)
    return []
  }
}

async function getTrendingProducts() {
  try {
    const products = await client.fetch(`
      *[_type == "product" && trending == true] | order(_createdAt desc)[0...8] {
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
      }
    `)
    return products
  } catch (error) {
    console.error('Error fetching trending products:', error)
    return []
  }
}

async function getAllProducts() {
  try {
    const products = await client.fetch(`
      *[_type == "product"] | order(_createdAt desc) {
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
      }
    `)
    console.log('All products found:', products.length)
    return products
  } catch (error) {
    console.error('Error fetching all products:', error)
    return []
  }
}

function PromotionsWrapper() {
  return (
    <Suspense fallback={
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-16 bg-gradient-to-r from-gray-300/30 to-gray-400/30 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-300/20 to-gray-400/20 rounded w-2xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    }>
      <PromotionsContent />
    </Suspense>
  )
}

function TrendingProductsWrapper() {
  return (
    <Suspense fallback={
      <section className="py-24 bg-gradient-to-b from-slate-900 via-purple-900/10 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="h-16 bg-gradient-to-r from-cyan-500/30 to-purple-500/30 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded w-2xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    }>
      <TrendingProductsContent />
    </Suspense>
  )
}

function AllProductsWrapper() {
  return (
    <Suspense fallback={
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-16 bg-gradient-to-r from-gray-300/30 to-gray-400/30 rounded w-96 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-gradient-to-r from-gray-300/20 to-gray-400/20 rounded w-2xl mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    }>
      <AllProductsContent />
    </Suspense>
  )
}

async function PromotionsContent() {
  const promotions = await getPromotions()

  return <Promotions promotions={promotions} />
}

async function TrendingProductsContent() {
  const trendingProducts = await getTrendingProducts()

  return <TrendingProducts products={trendingProducts} />
}

async function AllProductsContent() {
  const allProducts = await getAllProducts()

  return <AllProducts products={allProducts} />
}

export default function Home() {
  return (
    <div>
      <AnimatedBackground />
      <HeroSection />
      <CategorySection />
      <PromotionsWrapper />
      <TrendingProductsWrapper />
      <AllProductsWrapper />
    </div>
  )
}
