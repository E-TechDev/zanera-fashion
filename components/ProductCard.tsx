import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'
import { Product } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
      <Link href={`/product/${product._id}`}>
        <div className="aspect-square relative overflow-hidden bg-gray-50">
          {product.images && product.images[0] && (
            <Image
              src={urlFor(product.images[0]).width(400).height(400).url()}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          )}
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
            <span className="bg-white text-black px-4 py-2 rounded-md font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              View Details
            </span>
          </div>
          {/* Stock status */}
          {!product.inStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
              Out of Stock
            </div>
          )}
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${product._id}`}>
          <h3 className="text-sm font-medium text-gray-900 hover:text-black transition-colors mb-1 line-clamp-2">
            {product.name}
          </h3>
        </Link>
        <p className="text-lg font-semibold text-black mb-2">
          ${product.price}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide px-2 py-1 bg-gray-100 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  )
}