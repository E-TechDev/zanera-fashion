'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { urlFor } from '../lib/sanity'

interface Promotion {
  _id: string
  title: string
  discount: string
  description: string
  endDate: string
  product: {
    images: any[]
  }
  isActive: boolean
  priority: number
}

interface PromotionsProps {
  promotions: Promotion[]
}

function CountdownTimer({ endDate }: { endDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const end = new Date(endDate).getTime()
      const difference = end - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className="flex space-x-2 text-center">
      <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
        <div className="text-lg font-bold text-white">{timeLeft.days}</div>
        <div className="text-xs text-white/80">Days</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
        <div className="text-lg font-bold text-white">{timeLeft.hours}</div>
        <div className="text-xs text-white/80">Hours</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
        <div className="text-lg font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-xs text-white/80">Min</div>
      </div>
      <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1">
        <div className="text-lg font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-xs text-white/80">Sec</div>
      </div>
    </div>
  )
}

export default function Promotions({ promotions }: PromotionsProps) {
  const activePromotions = promotions
    .filter(promo => promo.isActive)
    .sort((a, b) => b.priority - a.priority)

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Promotions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited-time offers on premium fashion pieces. Don''t miss out on these exclusive deals.
          </p>
        </div>

        {activePromotions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-2 border-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading promotions...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activePromotions.map((promotion, index) => (
              <motion.div
                key={promotion._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={promotion.product?.images?.[0] ? urlFor(promotion.product.images[0]).width(400).height(400).url() : `https://via.placeholder.com/400x300/0f172a/06b6d4?text=${promotion.title}`}
                    alt={promotion.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Discount Badge */}
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {promotion.discount}
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Countdown Timer */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CountdownTimer endDate={promotion.endDate} />
                  </div>
                </div>

                <div className="bg-white p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    {promotion.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {promotion.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
