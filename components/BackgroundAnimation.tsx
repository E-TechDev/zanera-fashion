'use client'

import { motion } from 'framer-motion'

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-lg opacity-30"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25"
        animate={{
          x: [0, 120, 0],
          y: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg opacity-20"
        animate={{
          x: [0, -100, 0],
          y: [0, 50, 0],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-36 h-36 bg-gradient-to-r from-red-400 to-pink-500 rounded-full opacity-15"
        animate={{
          x: [0, 80, -80, 0],
          y: [0, -60, 60, 0],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Additional smaller shapes */}
      <motion.div
        className="absolute top-60 right-40 w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-40"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-60 left-20 w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg opacity-35"
        animate={{
          x: [0, -60, 0],
          y: [0, 40, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}