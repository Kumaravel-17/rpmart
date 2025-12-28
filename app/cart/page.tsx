'use client'

import { useState } from 'react'
import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { IoTrashOutline, IoChevronBackOutline } from 'react-icons/io5'

// Mock data
const cartItems = [
  {
    productId: '1',
    productName: 'Wireless Headphones',
    image: '/product1.jpg',
    price: 89.99,
    quantity: 2,
    stock: 45,
  },
  {
    productId: '2',
    productName: 'Smart Watch',
    image: '/product2.jpg',
    price: 169.99,
    quantity: 1,
    stock: 0,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (productId: string, newQuantity: number) => {
    setItems(items.map(item =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, Math.min(item.stock, newQuantity)) }
        : item
    ))
  }

  const removeItem = (productId: string) => {
    setItems(items.filter(item => item.productId !== productId))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = 10
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <CustomerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-8 group animate-fade-in-down transition-colors">
          <IoChevronBackOutline className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </Link>

        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 animate-fade-in-up">
          Shopping <span className="gradient-text">Cart</span>
        </h1>
        <p className="text-gray-600 mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>Review your items</p>

        {items.length === 0 ? (
          <Card className="animate-scale-in">
            <CardContent className="p-12 text-center">
              <p className="text-gray-600 mb-4 text-lg">Your cart is empty</p>
              <Link href="/products">
                <Button className="hover:scale-110 transition-transform">Start Shopping</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <Card
                  key={item.productId}
                  className="card-hover border-2 border-transparent hover:border-primary-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex-shrink-0 hover:scale-110 transition-transform"></div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.productName}</h3>
                        <p className="text-xl font-bold gradient-text mb-4">
                          {formatCurrency(item.price)}
                        </p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-500 hover:scale-110 transition-all font-bold"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-bold text-lg">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-primary-50 hover:border-primary-500 hover:scale-110 transition-all font-bold"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all hover:scale-110"
                          >
                            <IoTrashOutline className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold gradient-text">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 border-2 border-primary-100 hover:border-primary-300 transition-colors animate-fade-in-left">
                <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-pink-50">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span className="font-semibold">{formatCurrency(tax)}</span>
                  </div>
                  <div className="border-t-2 border-primary-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-xl font-bold text-gray-900">Total</span>
                      <span className="text-2xl font-extrabold gradient-text">
                        {formatCurrency(total)}
                      </span>
                    </div>
                  </div>
                  <Link href="/checkout" className="block">
                    <Button size="lg" className="w-full hover:scale-105 transition-transform shadow-lg">
                      Proceed to Checkout
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

