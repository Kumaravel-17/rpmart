'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { 
  IoHomeOutline, 
  IoGridOutline, 
  IoFolderOutline, 
  IoCartOutline, 
  IoPeopleOutline,
  IoLogOutOutline,
  IoMenuOutline,
  IoCloseOutline
} from 'react-icons/io5'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface SidebarItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface SidebarProps {
  role: 'admin' | 'seller'
}

const adminMenuItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/admin', icon: IoHomeOutline },
  { name: 'Products', href: '/admin/products', icon: IoGridOutline },
  { name: 'Categories', href: '/admin/categories', icon: IoFolderOutline },
  { name: 'Orders', href: '/admin/orders', icon: IoCartOutline },
  { name: 'Users & Sellers', href: '/admin/users', icon: IoPeopleOutline },
]

const sellerMenuItems: SidebarItem[] = [
  { name: 'Dashboard', href: '/seller', icon: IoHomeOutline },
  { name: 'Products', href: '/seller/products', icon: IoGridOutline },
  { name: 'Orders', href: '/seller/orders', icon: IoCartOutline },
]

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const menuItems = role === 'admin' ? adminMenuItems : sellerMenuItems

  useEffect(() => {
    const email = localStorage.getItem('admin_email') || 'Admin User'
    setUserEmail(email)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_email')
    if (role === 'admin') {
      router.push('/admin/login')
    } else {
      router.push('/seller/login')
    }
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-white shadow-md"
        >
          {isMobileOpen ? (
            <IoCloseOutline className="w-6 h-6" />
          ) : (
            <IoMenuOutline className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="px-6 py-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold gradient-text">KMart</h1>
            <p className="text-sm text-gray-500 capitalize font-medium">{role} Panel</p>
            {userEmail && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">Logged in as</p>
                <p className="text-sm font-semibold text-gray-700 truncate">{userEmail}</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    'flex items-center px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  )}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              <IoLogOutOutline className="w-5 h-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

