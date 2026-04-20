import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { urlFor } from '../lib/sanity';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  images: Array<{ _key: string; url: string }>;
  description?: string;
}

interface TrendingProductsProps {
  products: Product[];
}

const TrendingProducts = ({ products }: TrendingProductsProps) => {
  // Mock ratings for demonstration - in a real app, this would come from the database
  const getMockRating = (index: number) => {
    const ratings = [4.5, 4.8, 4.2, 4.7, 4.9, 4.3, 4.6, 4.4];
    return ratings[index % ratings.length];
  };

  const getReviewCount = (index: number) => {
    const counts = [124, 89, 156, 67, 203, 98, 145, 76];
    return counts[index % counts.length];
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trending Now
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what's popular among our customers. These trending pieces are flying off the shelves.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => {
            const rating = getMockRating(index);
            const reviewCount = getReviewCount(index);

            return (
              <div
                key={product._id}
                className="group bg-white rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <Link href={`/product/${product._id}`}>
                    <div className="aspect-square relative bg-gray-50">
                      <Image
                        src={product.images?.[0] ? urlFor(product.images[0]).width(400).height(400).url() : '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                    </div>
                  </Link>
                  <div className="absolute top-3 right-3 bg-white rounded-full px-2 py-1 shadow-sm border">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-medium text-gray-900">{rating}</span>
                    </div>
                  </div>
                  {/* Trending Badge */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    TRENDING
                  </div>
                </div>

                <div className="p-4">
                  <Link href={`/product/${product._id}`}>
                    <h3 className="font-medium text-sm text-gray-900 mb-2 line-clamp-2 hover:text-black transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : i < rating
                              ? 'fill-yellow-400/50 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({reviewCount})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      ${product.price}
                    </span>
                    <Link
                      href={`/product/${product._id}`}
                      className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors font-medium text-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 border-2 border-gray-300 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Loading trending products...</p>
          </div>
        )}

        {products.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/category/suits"
              className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;