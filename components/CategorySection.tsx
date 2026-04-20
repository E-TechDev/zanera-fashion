'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function CategorySection() {
  const categories = [
    {
      name: 'Suits',
      slug: 'suits',
      description: 'Elegant formal wear',
      image: '/images/suits.jpg'
    },
    {
      name: 'Casual',
      slug: 'casual',
      description: 'Comfortable everyday fashion',
      image: '/images/casual.jpg'
    },
    {
      name: 'Shirts',
      slug: 'shirts',
      description: 'Premium shirts for any style',
      image: '/images/shirts.jpg'
    },
    {
      name: 'T-Shirts',
      slug: 'tshirts',
      description: 'Modern casual tees',
      image: '/images/tshirts.jpg'
    },
    {
      name: 'Pants',
      slug: 'pants',
      description: 'Tailored trousers & chinos',
      image: '/images/pants.jpg'
    },
  ]

  // Duplicate categories for seamless loop
  const duplicatedCategories = [...categories, ...categories]

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let startTime: number | null = null
    const duration = 20000 // 20 seconds for one full cycle

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = (elapsed % duration) / duration

      const totalWidth = scrollContainer.scrollWidth / 2 // Since we duplicated
      const currentPosition = progress * totalWidth

      scrollContainer.style.transform = `translateX(-${currentPosition}px)`

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId)
    }

    const handleMouseLeave = () => {
      startTime = null
      animationId = requestAnimationFrame(animate)
    }

    scrollContainer.addEventListener('mouseenter', handleMouseEnter)
    scrollContainer.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter)
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections designed for the modern gentleman.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-6 transition-transform duration-300 ease-linear"
            style={{ width: `${duplicatedCategories.length * 320}px` }} // Approximate width per card
          >
            {duplicatedCategories.map((category, index) => (
              <Link
                key={`${category.slug}-${index}`}
                href={`/category/${category.slug}`}
                className="group block flex-shrink-0 w-72"
              >
                <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 hover:scale-105">
                  <div className="aspect-square relative bg-gray-100">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = `https://via.placeholder.com/400x400/f3f4f6/6b7280?text=${category.name}`
                      }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-black transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}