'use client'

import { useState, useEffect } from 'react'
import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { IoFlashOutline, IoTimeOutline, IoArrowForwardOutline, IoSparklesOutline } from 'react-icons/io5'

// Mock data - Deals with countdown
const deals = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    discount: 30,
    finalPrice: 69.99,
    image: '/product1.jpg',
    rating: 4.5,
    timeLeft: '2h 30m',
    stock: 12,
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    discount: 40,
    finalPrice: 119.99,
    image: '/product2.jpg',
    rating: 4.8,
    timeLeft: '5h 15m',
    stock: 8,
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 49.99,
    discount: 25,
    finalPrice: 37.49,
    image: '/product3.jpg',
    rating: 4.2,
    timeLeft: '1h 45m',
    stock: 20,
  },
  {
    id: '4',
    name: 'USB-C Cable Pack',
    price: 29.99,
    discount: 50,
    finalPrice: 14.99,
    image: '/product4.jpg',
    rating: 4.0,
    timeLeft: '3h 20m',
    stock: 15,
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    price: 39.99,
    discount: 35,
    finalPrice: 25.99,
    image: '/product5.jpg',
    rating: 4.6,
    timeLeft: '4h 10m',
    stock: 18,
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 79.99,
    discount: 45,
    finalPrice: 43.99,
    image: '/product6.jpg',
    rating: 4.7,
    timeLeft: '6h 30m',
    stock: 10,
  },
]

export default function DealsPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <CustomerNav />

      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-bg text-white py-20">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full animate-bounce-slow">
              <IoFlashOutline className="w-6 h-6 text-yellow-300" />
              <span className="font-bold">Limited Time Offers</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="block">Flash</span>
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-200 to-white bg-clip-text text-transparent">
                Deals
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Don't miss out on these amazing discounts! Limited stock available.
            </p>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="gradient-text">Hot Deals</span>
            </h2>
            <p className="text-gray-600">Limited time offers - Shop now before they're gone!</p>
          </div>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full">
            <IoTimeOutline className="w-5 h-5 text-red-600 animate-pulse" />
            <span className="text-red-600 font-bold">Ending Soon</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <Link
              key={deal.id}
              href={`/products/${deal.id}`}
              className="group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="card-hover border-2 border-red-200 hover:border-red-400 overflow-hidden bg-white relative">
                {/* Flash Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-xl animate-bounce-slow flex items-center gap-1">
                    <IoFlashOutline className="w-4 h-4" />
                    FLASH SALE
                  </div>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="danger" className="text-lg px-3 py-1 shadow-xl">
                    -{deal.discount}%
                  </Badge>
                </div>

                {/* Time Left Badge */}
                <div className="absolute top-16 right-4 z-10">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1">
                    <IoTimeOutline className="w-4 h-4" />
                    {deal.timeLeft}
                  </div>
                </div>

                <CardContent className="p-0">
                  <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-red-600/0 via-transparent to-transparent group-hover:from-red-600/30 transition-all duration-500"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl transform group-hover:scale-110 transition-transform">
                        <span className="text-sm font-semibold text-primary-600">Quick View</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="font-bold text-gray-900 text-xl mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {deal.name}
                    </h3>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-extrabold gradient-text">
                          {formatCurrency(deal.finalPrice)}
                        </p>
                        <p className="text-sm text-gray-500 line-through">
                          {formatCurrency(deal.price)}
                        </p>
                      </div>
                      <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                        <span className="text-yellow-500 text-sm">★</span>
                        <span className="text-sm text-gray-700 ml-1 font-medium">{deal.rating}</span>
                      </div>
                    </div>
                    
                    {/* Stock Indicator */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Stock Available</span>
                        <span className="font-bold text-red-600">{deal.stock} left</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-red-500 to-pink-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(deal.stock / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <Button className="w-full group-hover:scale-105 transition-transform shadow-lg">
                      Shop Now
                      <IoArrowForwardOutline className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 via-primary-500 to-pink-500 py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/20 backdrop-blur-md rounded-full">
            <IoSparklesOutline className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">New Deals Every Day</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Subscribe for Exclusive Deals
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get notified about flash sales, special discounts, and limited-time offers before anyone else!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full border-0 focus:ring-2 focus:ring-white/50 text-gray-900"
            />
            <Button variant="secondary" size="lg" className="whitespace-nowrap hover:scale-105 transition-transform">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


