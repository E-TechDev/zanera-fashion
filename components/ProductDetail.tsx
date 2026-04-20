'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import { urlFor } from '../lib/sanity'
import { useCart } from '../context/CartContext'
import { Product } from '../context/CartContext'

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState('')
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size')
      return
    }
    dispatch({ type: 'ADD_ITEM', payload: { product, size: selectedSize } })
    alert('Added to cart!')
  }

  const handleWhatsAppOrder = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '254745759290'
    const message = `Hi, I'd like to order: ${product.name} - Size: ${selectedSize} - Price: $${product.price}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square relative">
            {product.images && product.images[0] && (
              <Image
                src={urlFor(product.images[0]).width(600).height(600).url()}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-gray-900 mb-4">${product.price}</p>
            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
              >
                <option value="">Select size</option>
                {product.sizes?.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="btn"
                disabled={!product.inStock}
                aria-label="Add to cart"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="w-full btn bg-green-600 hover:bg-green-700"
              >
                Order Now
              </button>

              <a
                href="tel:0745759290"
                className="w-full btn bg-blue-600 hover:bg-blue-700 text-center block"
              >
                Call to Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}