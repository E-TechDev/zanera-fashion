import { Instagram, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || '254745759290'

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-6 text-white">
              ZANERA
            </h3>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Premium men's fashion for the contemporary gentleman. Quality garments crafted with attention to detail.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/zanerafashions_men/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={`https://wa.me/${phone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 p-3 rounded-lg hover:bg-green-500 transition-colors"
              >
                <Phone className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a></li>
              <li><a href="/category/suits" className="text-gray-300 hover:text-white transition-colors">Suits</a></li>
              <li><a href="/category/casual" className="text-gray-300 hover:text-white transition-colors">Casual</a></li>
              <li><a href="/category/shirts" className="text-gray-300 hover:text-white transition-colors">Shirts</a></li>
              <li><a href="/category/tshirts" className="text-gray-300 hover:text-white transition-colors">T-Shirts</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white transition-colors">Shopping Cart</a></li>
            </ul>
          </div>

          {/* Store Location */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Visit Our Store</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                <div className="text-gray-300">
                  <p className="font-medium text-white">Meru South Hse</p>
                  <p>2nd Floor, Shop 217</p>
                  <p>Opp Fire Station (Khoja)</p>
                  <p>Nairobi, Kenya 🇰🇪</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <a href={`tel:+${phone}`} className="text-gray-300 hover:text-white transition-colors">
                  +{phone.replace(/(\d{3})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4')}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:info@zanera.com" className="text-gray-300 hover:text-white transition-colors">
                  info@zanera.com
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left">
              &copy; 2026 Zanera Fashion. All rights reserved. Developed by JayB.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                Shipping Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}