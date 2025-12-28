import { ReactNode } from 'react'
import Sidebar from './Sidebar'
import { UserRole } from '@/types'

interface DashboardLayoutProps {
  children: ReactNode
  role: 'admin' | 'seller'
}

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar role={role} />
      <main className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  )
}


