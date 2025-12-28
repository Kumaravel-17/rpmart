'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Don't check auth on login page
    if (pathname === '/admin/login') {
      setIsAuthenticated(true)
      return
    }

    // Check authentication
    const authStatus = localStorage.getItem('admin_authenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
      router.push('/admin/login')
    }
  }, [pathname, router])

  // Show loading state while checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-600 via-primary-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  // Don't render dashboard layout on login page
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  // Render dashboard if authenticated
  if (isAuthenticated) {
    return <DashboardLayout role="admin">{children}</DashboardLayout>
  }

  return null
}
