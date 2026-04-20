'use client'

import { MessageCircle } from 'lucide-react'

export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '254745759290'

  const handleClick = () => {
    const message = encodeURIComponent("Hi! I'm interested in your fashion collection.")
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white p-4 rounded-full shadow-2xl hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-110 z-50 group border border-green-400/30"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6 group-hover:animate-pulse" />
      <div className="absolute -top-12 right-0 bg-slate-900/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-green-500/30 shadow-xl">
        <div className="flex items-center gap-2">
          <span>Chat with us!</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        </div>
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900/90"></div>
      </div>
      {/* Floating particles */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className="absolute top-1 left-1 w-1 h-1 bg-white/60 rounded-full animate-ping"></div>
        <div className="absolute bottom-1 right-1 w-1 h-1 bg-white/40 rounded-full animate-ping delay-300"></div>
      </div>
    </button>
  )
}