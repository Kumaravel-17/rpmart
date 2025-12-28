'use client'

import { useEffect, useState } from 'react'
import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { IoArrowForwardOutline, IoSparklesOutline } from 'react-icons/io5'

// Mock data
const categories = [
  { id: '1', name: 'Electronics', image: '/cat1.jpg', count: 234, icon: '⚡' },
  { id: '2', name: 'Accessories', image: '/cat2.jpg', count: 156, icon: '🎧' },
  { id: '3', name: 'Fashion', image: '/cat3.jpg', count: 89, icon: '👕' },
  { id: '4', name: 'Home & Living', image: '/cat4.jpg', count: 145, icon: '🏠' },
]

const trendingProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    discount: 10,
    finalPrice: 89.99,
    image: '/product1.jpg',
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    discount: 15,
    finalPrice: 169.99,
    image: '/product2.jpg',
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 49.99,
    discount: 0,
    finalPrice: 49.99,
    image: '/product3.jpg',
    rating: 4.2,
  },
  {
    id: '4',
    name: 'USB-C Cable',
    price: 19.99,
    discount: 5,
    finalPrice: 18.99,
    image: '/product4.jpg',
    rating: 4.0,
  },
]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <CustomerNav />

      {/* Hero Banner with Animation */}
      <section className="relative overflow-hidden gradient-bg text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full animate-fade-in-down">
              <IoSparklesOutline className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium">New Collection 2024</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block">Welcome to</span>
              <span className="block gradient-text bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">
                KMart
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Discover amazing products at unbeatable prices
            </p>
            <div className="animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" variant="secondary" className="group hover:scale-110 transition-transform duration-300 shadow-2xl">
                Shop Now
                <IoArrowForwardOutline className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid with Stagger Animation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-3 animate-fade-in-up">
            Shop by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-gray-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Explore our wide range of products
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="card-hover border-2 border-transparent hover:border-primary-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-primary-100 to-pink-100 rounded-t-lg relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:opacity-40 transition-opacity">
                      {category.icon}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-5 bg-white">
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{category.count} products</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products with Animation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-white/50">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="gradient-text">Trending</span> Products
            </h2>
            <p className="text-gray-600">Most popular items this week</p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="group">
              View All
              <IoArrowForwardOutline className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product, index) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="card-hover border-2 border-transparent hover:border-primary-300 overflow-hidden bg-white">
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-600/0 via-transparent to-transparent group-hover:from-primary-600/20 transition-all duration-500"></div>
                    {product.discount > 0 && (
                      <div className="absolute top-3 right-3 z-10 animate-bounce-slow">
                        <Badge variant="danger" className="shadow-lg">
                          -{product.discount}%
                        </Badge>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                        <span className="text-sm font-semibold text-primary-600">Quick View</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 bg-white">
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xl font-bold text-primary-600">
                          {formatCurrency(product.finalPrice)}
                        </p>
                        {product.discount > 0 && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.price)}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary-500 to-pink-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals of the Day with Enhanced Animation */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-pink-500 opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="danger" className="mb-4 text-lg px-4 py-2 animate-pulse">
              Limited Time Offer
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">
              Deals of the <span className="gradient-text">Day</span>
            </h2>
            <p className="text-gray-600">Don't miss out on these amazing discounts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingProducts.slice(0, 3).map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <Card className="card-hover border-2 border-primary-200 hover:border-primary-400 bg-gradient-to-br from-white to-primary-50/30 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative aspect-square bg-gradient-to-br from-primary-100 to-pink-100 rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 to-transparent"></div>
                      <div className="absolute top-4 left-4 z-10">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-bounce-slow">
                          SALE
                        </div>
                      </div>
                      <div className="absolute bottom-4 right-4 z-10">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg group-hover:scale-110 transition-transform">
                          <IoSparklesOutline className="w-6 h-6 text-primary-600" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-2xl font-bold text-primary-600">
                            {formatCurrency(product.finalPrice)}
                          </p>
                          {product.discount > 0 && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.price)}
                            </p>
                          )}
                        </div>
                        <Badge variant="danger" className="text-lg px-3 py-1">
                          -{product.discount}%
                        </Badge>
                      </div>
                      <Button className="w-full group-hover:scale-105 transition-transform">
                        Shop Now
                        <IoArrowForwardOutline className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold mb-4 gradient-text bg-gradient-to-r from-primary-400 to-pink-400 bg-clip-text text-transparent">
                KMart
              </h3>
              <p className="text-gray-400">Your trusted e-commerce platform</p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products" className="hover:text-primary-400 transition-colors">Products</Link></li>
                <li><Link href="/categories" className="hover:text-primary-400 transition-colors">Categories</Link></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/contact" className="hover:text-primary-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-primary-400 transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KMart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
