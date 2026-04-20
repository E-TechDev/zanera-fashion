export const dynamic = 'force-dynamic'
export const revalidate = 30 // Revalidate every 30 seconds

import { client } from '../../../lib/sanity'
import ProductCard from '../../../components/ProductCard'
import { Product } from '../../../context/CartContext'

async function getProductsByCategory(category: string) {
  return client.fetch(`
    *[_type == "product" && category == $category] {
      _id,
      name,
      price,
      category,
      sizes,
      images,
      description,
      inStock,
      featured
    }
  `, { category })
}

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProductsByCategory(params.slug)

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 capitalize">{params.slug}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found in this category.</p>
        )}
      </div>
    </div>
  )
}