'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Product {
  _id: string
  name: string
  price: number
  category: string
  sizes: string[]
  images: any[]
  description: string
  inStock: boolean
  featured: boolean
}

export interface CartItem {
  product: Product
  quantity: number
  size: string
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; size: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: string; quantity: number } }
  | { type: 'CLEAR_CART' }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size } = action.payload
      const existingItem = state.items.find(
        item => item.product._id === product._id && item.size === size
      )

      let newItems
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product._id === product._id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        newItems = [...state.items, { product, quantity: 1, size }]
      }

      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      return { items: newItems, total }
    }
    case 'REMOVE_ITEM': {
      const { productId, size } = action.payload
      const newItems = state.items.filter(
        item => !(item.product._id === productId && item.size === size)
      )
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      return { items: newItems, total }
    }
    case 'UPDATE_QUANTITY': {
      const { productId, size, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { productId, size } })
      }
      const newItems = state.items.map(item =>
        item.product._id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
      const total = newItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
      return { items: newItems, total }
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}