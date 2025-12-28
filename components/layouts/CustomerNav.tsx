'use client'

import Link from 'next/link'
import { IoCartOutline, IoPersonOutline, IoSearchOutline, IoMenuOutline, IoCloseOutline, IoFlashOutline } from 'react-icons/io5'
import { useState } from 'react'
import Input from '@/components/ui/Input'

export default function CustomerNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 border-b-2 border-primary-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Animation */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-pink-500 text-white px-3 py-1.5 rounded-lg font-black text-xl">
                K
              </div>
            </div>
            <span className="text-3xl font-extrabold gradient-text group-hover:scale-105 transition-transform duration-300">
              Mart
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full group">
              <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-primary-600 transition-colors" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-2.5 w-full rounded-full border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-600 to-pink-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:scale-105 transition-transform">
                Search
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-600 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link 
              href="/products" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110 relative group"
            >
              Products
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-600 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
            <Link 
              href="/deals" 
              className="px-4 py-2 text-gray-700 hover:text-primary-600 font-semibold transition-all duration-300 hover:scale-110 relative group flex items-center gap-1"
            >
              <IoFlashOutline className="w-4 h-4 text-yellow-500" />
              Deals
              <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-600 to-pink-500 group-hover:w-full transition-all duration-300 rounded-full"></span>
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110"
            >
              <IoSearchOutline className="w-6 h-6" />
            </button>
            
            <Link 
              href="/cart" 
              className="relative p-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110 group"
            >
              <IoCartOutline className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-primary-600 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse group-hover:scale-125 transition-transform">
                0
              </span>
            </Link>
            
            <Link 
              href="/profile" 
              className="p-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300 hover:scale-110"
            >
              <IoPersonOutline className="w-6 h-6" />
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? (
                <IoCloseOutline className="w-6 h-6" />
              ) : (
                <IoMenuOutline className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4 animate-fade-in-down">
            <div className="relative">
              <IoSearchOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-2.5 w-full rounded-full border-2 border-gray-200 focus:border-primary-500"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu with Animation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 space-y-1">
            <Link 
              href="/" 
              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-pink-50 hover:text-primary-600 rounded-lg transition-all duration-300 hover:translate-x-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-pink-50 hover:text-primary-600 rounded-lg transition-all duration-300 hover:translate-x-2 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/deals" 
              className="block px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-primary-50 hover:to-pink-50 hover:text-primary-600 rounded-lg transition-all duration-300 hover:translate-x-2 font-medium flex items-center gap-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <IoFlashOutline className="w-4 h-4 text-yellow-500" />
              Deals
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
