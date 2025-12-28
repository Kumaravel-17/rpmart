'use client'

import CustomerNav from '@/components/layouts/CustomerNav'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useState } from 'react'
import { IoPencilOutline, IoTrashOutline } from 'react-icons/io5'

// Mock data
const userProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 234 567 8900',
}

const orders = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    date: '2024-01-15',
    total: 299.99,
    status: 'delivered',
    items: 2,
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    date: '2024-01-10',
    total: 149.99,
    status: 'shipped',
    items: 1,
  },
]

const addresses = [
  {
    id: '1',
    name: 'John Doe',
    address: '123 Main St, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    isDefault: true,
  },
  {
    id: '2',
    name: 'John Doe',
    address: '456 Oak Ave',
    city: 'Los Angeles',
    state: 'CA',
    zipCode: '90001',
    isDefault: false,
  },
]

const wishlist = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 89.99,
    image: '/product1.jpg',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 169.99,
    image: '/product2.jpg',
  },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'wishlist'>('profile')
  const [profileData, setProfileData] = useState(userProfile)

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
      pending: 'warning',
      confirmed: 'info',
      shipped: 'info',
      delivered: 'success',
      cancelled: 'danger',
    }
    return variants[status] || 'default'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            {[
              { id: 'profile', label: 'Profile' },
              { id: 'orders', label: 'Orders' },
              { id: 'addresses', label: 'Addresses' },
              { id: 'wishlist', label: 'Wishlist' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                />
                <Button>Save Changes</Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Number</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{formatDate(order.date)}</TableCell>
                      <TableCell>{order.items}</TableCell>
                      <TableCell>{formatCurrency(order.total)}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusBadge(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          View Details
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
              <Button>Add New Address</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <Card key={address.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-medium text-gray-900">{address.name}</p>
                        <p className="text-gray-600 mt-1">{address.address}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      {address.isDefault && (
                        <Badge variant="success">Default</Badge>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <IoPencilOutline className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        <IoTrashOutline className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist Tab */}
        {activeTab === 'wishlist' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-lg font-bold text-primary-600 mb-4">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">Add to Cart</Button>
                        <Button size="sm" variant="outline">
                          <IoTrashOutline className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


