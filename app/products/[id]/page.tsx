'use client'

import { useState, useEffect } from 'react'
import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { IoCartOutline, IoHeartOutline, IoStar, IoChevronBackOutline, IoSparklesOutline } from 'react-icons/io5'

// Mock data
const product = {
  id: '1',
  name: 'Wireless Headphones',
  description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
  category: 'Electronics',
  brand: 'TechBrand',
  price: 99.99,
  discount: 10,
  finalPrice: 89.99,
  stock: 45,
  sku: 'WH-001',
  rating: 4.5,
  reviewsCount: 234,
  images: ['/product1.jpg', '/product1-2.jpg', '/product1-3.jpg'],
}

const reviews = [
  {
    id: '1',
    user: 'John Doe',
    rating: 5,
    comment: 'Excellent sound quality and comfortable to wear for long periods.',
    date: '2024-01-10',
  },
  {
    id: '2',
    user: 'Jane Smith',
    rating: 4,
    comment: 'Great headphones, but battery could last longer.',
    date: '2024-01-08',
  },
]

const similarProducts = [
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
    finalPrice: 49.99,
    image: '/product3.jpg',
    rating: 4.2,
  },
]

export default function ProductDetailsPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <CustomerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 group animate-fade-in-down transition-colors"
        >
          <IoChevronBackOutline className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery with Animation */}
          <div className={`${isVisible ? 'animate-fade-in-right' : 'opacity-0'}`}>
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl mb-6 shadow-xl overflow-hidden group">
              <div className="w-full h-full bg-gradient-to-br from-primary-100 to-pink-100 group-hover:scale-110 transition-transform duration-700"></div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl transition-all duration-300 hover:scale-110 ${
                    selectedImage === index
                      ? 'ring-4 ring-primary-500 shadow-lg scale-105'
                      : 'hover:ring-2 hover:ring-primary-300'
                  }`}
                ></button>
              ))}
            </div>
          </div>

          {/* Product Info with Animation */}
          <div className={`${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="mb-4 animate-scale-in">
              <Badge variant="info" className="text-sm px-3 py-1">
                {product.category}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 animate-fade-in-up">
              {product.name}
            </h1>
            <div className="flex items-center mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <IoStar
                    key={i}
                    className={`w-6 h-6 transition-all duration-300 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-500 fill-current animate-scale-in'
                        : 'text-gray-300'
                    }`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <span className="ml-3 text-gray-600 font-medium">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            <div className="mb-8 p-6 bg-gradient-to-r from-primary-50 to-pink-50 rounded-2xl animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-extrabold gradient-text">
                  {formatCurrency(product.finalPrice)}
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-2xl text-gray-500 line-through">
                      {formatCurrency(product.price)}
                    </span>
                    <Badge variant="danger" className="text-lg px-3 py-1 animate-bounce-slow">
                      -{product.discount}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
            </div>

            <div className="mb-8 space-y-3 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-gray-700 w-24">Brand:</span>
                <span className="text-gray-900">{product.brand}</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-gray-700 w-24">SKU:</span>
                <span className="text-gray-900 font-mono">{product.sku}</span>
              </div>
              <div className="flex items-center p-3 bg-white rounded-lg border border-gray-200 hover:border-primary-300 transition-colors">
                <span className="font-semibold text-gray-700 w-24">Stock:</span>
                <span className={product.stock > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                  {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
                </span>
              </div>
            </div>

            <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Quantity
              </label>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-xl hover:bg-primary-50 hover:border-primary-500 hover:scale-110 transition-all duration-300 font-bold text-lg"
                >
                  -
                </button>
                <span className="w-16 text-center font-bold text-xl text-gray-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-12 h-12 border-2 border-gray-300 rounded-xl hover:bg-primary-50 hover:border-primary-500 hover:scale-110 transition-all duration-300 font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex space-x-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <Button size="lg" className="flex-1 group hover:scale-105 transition-transform shadow-lg">
                <IoCartOutline className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="group hover:scale-105 transition-transform hover:border-primary-500 hover:text-primary-600">
                <IoHeartOutline className="w-5 h-5 group-hover:scale-110 group-hover:fill-red-500 transition-all" />
              </Button>
            </div>
          </div>
        </div>

        {/* Reviews Section with Animation */}
        <Card className="mb-16 border-2 border-primary-100 hover:border-primary-300 transition-colors animate-fade-in-up">
          <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-pink-50">
            <div className="flex items-center gap-2">
              <IoSparklesOutline className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Reviews ({product.reviewsCount})</h2>
            </div>
          </div>
          <CardContent className="p-8">
            <div className="space-y-8">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-8 last:border-0 last:pb-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-bold text-gray-900 text-lg">{review.user}</p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <IoStar
                            key={i}
                            className={`w-5 h-5 transition-all ${
                              i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Similar Products with Animation */}
        <div className="animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Similar <span className="gradient-text">Products</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product, index) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="card-hover border-2 border-transparent hover:border-primary-300 overflow-hidden bg-white">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-600/0 via-transparent to-transparent group-hover:from-primary-600/30 transition-all duration-500"></div>
                    </div>
                    <div className="p-5 bg-white">
                      <h3 className="font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <p className="text-xl font-bold text-primary-600">
                          {formatCurrency(product.finalPrice)}
                        </p>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                          <span className="text-yellow-500 text-sm">★</span>
                          <span className="text-sm text-gray-700 ml-1 font-medium">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
