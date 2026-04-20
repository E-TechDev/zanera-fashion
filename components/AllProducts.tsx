import React from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  sizes: string[];
  images: any[];
  description: string;
  inStock: boolean;
  featured: boolean;
  trending: boolean;
}

interface AllProductsProps {
  products: Product[];
}

const AllProducts = ({ products }: AllProductsProps) => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            All Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete collection of premium fashion items.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProducts;