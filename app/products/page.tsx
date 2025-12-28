'use client'

import { useState, useEffect } from 'react'
import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import Skeleton from '@/components/ui/Skeleton'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { IoSearchOutline, IoGridOutline, IoListOutline, IoSparklesOutline } from 'react-icons/io5'

// Mock data
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    discount: 10,
    finalPrice: 89.99,
    image: '/product1.jpg',
    rating: 4.5,
    reviewsCount: 234,
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    discount: 15,
    finalPrice: 169.99,
    image: '/product2.jpg',
    rating: 4.8,
    reviewsCount: 189,
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 49.99,
    discount: 0,
    finalPrice: 49.99,
    image: '/product3.jpg',
    rating: 4.2,
    reviewsCount: 156,
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'USB-C Cable',
    price: 19.99,
    discount: 5,
    finalPrice: 18.99,
    image: '/product4.jpg',
    rating: 4.0,
    reviewsCount: 145,
    category: 'Accessories',
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [sortBy, setSortBy] = useState('default')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.finalPrice - b.finalPrice
    if (sortBy === 'price-high') return b.finalPrice - a.finalPrice
    if (sortBy === 'rating') return b.rating - a.rating
    return 0
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/20">
      <CustomerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`mb-8 ${isVisible ? 'animate-fade-in-down' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
            Explore <span className="gradient-text">Products</span>
          </h1>
          <p className="text-gray-600 text-lg">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar with Animation */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24 border-2 border-primary-100 hover:border-primary-300 transition-colors">
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-pink-50">
                <div className="flex items-center gap-2">
                  <IoSparklesOutline className="w-5 h-5 text-primary-600" />
                  <h2 className="font-bold text-gray-900">Filters</h2>
                </div>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative group">
                    <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                  </Select>
                </div>

                <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <Select
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="all">All Prices</option>
                    <option value="0-50">$0 - $50</option>
                    <option value="50-100">$50 - $100</option>
                    <option value="100-200">$100 - $200</option>
                    <option value="200+">$200+</option>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar with Animation */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 animate-fade-in-up">
              <p className="text-gray-600 font-medium">
                Showing <span className="text-primary-600 font-bold">{sortedProducts.length}</span> products
              </p>
              <div className="flex items-center space-x-4">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-48 focus:ring-2 focus:ring-primary-500"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-low">Sort by: Price Low to High</option>
                  <option value="price-high">Sort by: Price High to Low</option>
                  <option value="rating">Sort by: Rating</option>
                </Select>
                <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden hover:border-primary-300 transition-colors">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-all duration-300 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-primary-600 to-pink-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IoGridOutline className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-primary-600 to-pink-500 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <IoListOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <Skeleton height="h-48" className="rounded-t-lg" />
                    <CardContent className="p-4">
                      <Skeleton height="h-4" className="mb-2" />
                      <Skeleton height="h-4" className="w-2/3" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {sortedProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <Card className="card-hover border-2 border-transparent hover:border-primary-300 overflow-hidden bg-white">
                      <CardContent className="p-0">
                        <div className="relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/0 via-transparent to-transparent group-hover:from-primary-600/30 transition-all duration-500"></div>
                          {product.discount > 0 && (
                            <div className="absolute top-3 right-3 z-10">
                              <Badge variant="danger" className="shadow-lg animate-bounce-slow">
                                -{product.discount}%
                              </Badge>
                            </div>
                          )}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl transform group-hover:scale-110 transition-transform">
                              <span className="text-sm font-semibold text-primary-600">Quick View</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 bg-white">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
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
                              <span className="text-xs text-gray-500 ml-1">({product.reviewsCount})</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-500 to-pink-500 rounded-full transition-all duration-1000"
                              style={{ width: `${(product.rating / 5) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
