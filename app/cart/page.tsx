'use client'

import { useCart } from '../../context/CartContext'
import Image from 'next/image'
import { urlFor } from '../../lib/sanity'

export default function CartPage() {
  const { state, dispatch } = useCart()

  const handleRemoveItem = (productId: string, size: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } })
  }

  const handleUpdateQuantity = (productId: string, size: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } })
  }

  const handleWhatsAppCheckout = () => {
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '254745759290'
    const items = state.items.map(item =>
      `${item.product.name} (Size: ${item.size}) x${item.quantity} - $${item.product.price * item.quantity}`
    ).join('\n')
    const message = `Hi, I'd like to place an order:\n\n${items}\n\nTotal: $${state.total}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phone}?text=${encodedMessage}`, '_blank')
  }

  if (state.items.length === 0) {
    return (
      <div className="py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <a href="/" className="btn">Continue Shopping</a>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={`${item.product._id}-${item.size}`} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
              <div className="w-20 h-20 relative">
                {item.product.images && item.product.images[0] && (
                  <Image
                    src={urlFor(item.product.images[0]).width(80).height(80).url()}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded"
                  />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">Size: {item.size}</p>
                <p className="text-gray-600">${item.product.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateQuantity(item.product._id, item.size, item.quantity - 1)}
                  className="px-2 py-1 border rounded"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.product._id, item.size, item.quantity + 1)}
                  className="px-2 py-1 border rounded"
                >
                  +
                </button>
              </div>
              <div className="text-right">
                <p className="font-semibold">${item.product.price * item.quantity}</p>
                <button
                  onClick={() => handleRemoveItem(item.product._id, item.size)}
                  className="text-red-600 text-sm hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xl font-semibold">Total: ${state.total}</span>
          </div>
          <button
            onClick={handleWhatsAppCheckout}
            className="relative z-50 w-full btn bg-green-600 hover:bg-green-700"
          >
            Checkout via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
