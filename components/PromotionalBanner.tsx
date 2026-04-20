import React from 'react';

const PromotionalBanner = () => {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-black text-white rounded-lg mb-6 text-sm font-semibold">
            Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Seasonal Sale
          </h2>
          <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Up to <span className="text-red-600">50% OFF</span>
          </div>
        </div>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Discover our latest collection with exclusive discounts on premium men's fashion.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/category/suits"
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            Shop Now
          </a>
          <a
            href="#featured"
            className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            View Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner;