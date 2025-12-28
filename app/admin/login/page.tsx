'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { IoLockClosedOutline, IoMailOutline, IoEyeOutline, IoEyeOffOutline, IoShieldCheckmarkOutline, IoSparklesOutline } from 'react-icons/io5'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    // Check if already logged in
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (isAuthenticated === 'true') {
      router.push('/admin')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Demo credentials - in production, this would be an API call
      if (email === 'admin@kmart.com' && password === 'admin123') {
        localStorage.setItem('admin_authenticated', 'true')
        localStorage.setItem('admin_email', email)
        router.push('/admin')
      } else {
        setError('Invalid email or password')
        setIsLoading(false)
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`relative z-10 w-full max-w-md ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
        {/* Logo/Header */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-4 shadow-xl">
            <IoShieldCheckmarkOutline className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-2">Admin Portal</h1>
          <p className="text-white/80 text-lg">Sign in to access the dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="glass-effect border-2 border-white/20 shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <IoSparklesOutline className="w-6 h-6 text-primary-600" />
              Welcome Back
            </CardTitle>
            <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <IoMailOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="admin@kmart.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 pr-4 py-3 border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <IoLockClosedOutline className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-12 pr-12 py-3 border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    {showPassword ? (
                      <IoEyeOffOutline className="w-5 h-5" />
                    ) : (
                      <IoEyeOutline className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl animate-fade-in-up">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full hover:scale-105 transition-transform shadow-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-primary-50 rounded-xl border border-primary-200 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <p className="text-xs font-semibold text-primary-700 mb-2">Demo Credentials:</p>
                <p className="text-xs text-gray-600">Email: <span className="font-mono font-semibold">admin@kmart.com</span></p>
                <p className="text-xs text-gray-600">Password: <span className="font-mono font-semibold">admin123</span></p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-white/80 text-sm">
            © 2024 KMart. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}


