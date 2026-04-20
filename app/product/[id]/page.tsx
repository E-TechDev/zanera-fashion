export const dynamic = 'force-dynamic'
export const revalidate = 30 // Revalidate every 30 seconds

import { client } from '../../../lib/sanity'
import ProductDetail from '../../../components/ProductDetail'

async function getProduct(id: string) {
  console.log('Looking for product with ID:', id)

  const product = await client.fetch(`
    *[_type == "product" && _id == $id][0] {
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
  `, { id })

  console.log('Product found:', product ? product.name : 'null')

  return product
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    return <div className="py-16 text-center">Product not found</div>
  }

  return <ProductDetail product={product} />
}