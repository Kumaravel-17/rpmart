'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { IoCubeOutline, IoCartOutline, IoCashOutline } from 'react-icons/io5'
import { formatCurrency } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'

// Mock data
const summaryData = {
  assignedProducts: 45,
  assignedOrders: 12,
  totalRevenue: 12450,
}

const assignedProducts = [
  { id: '1', name: 'Wireless Headphones', stock: 45, status: 'active' },
  { id: '2', name: 'Smart Watch', stock: 0, status: 'active' },
  { id: '3', name: 'Laptop Stand', stock: 120, status: 'active' },
]

const assignedOrders = [
  { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', amount: 299.99, status: 'pending' },
  { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', amount: 149.99, status: 'confirmed' },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    pending: 'warning',
    confirmed: 'info',
    shipped: 'info',
    delivered: 'success',
  }
  return variants[status] || 'default'
}

export default function SellerDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your assigned products and orders</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.assignedProducts}</p>
              </div>
              <div className="p-3 bg-primary-100 rounded-lg">
                <IoCubeOutline className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assigned Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.assignedOrders}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <IoCartOutline className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(summaryData.totalRevenue)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <IoCashOutline className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assigned Products */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Assigned Products</h2>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? 'text-red-600 font-medium' : ''}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'success' : 'default'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Assigned Orders */}
      <Card>
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Assigned Orders</h2>
        </div>
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{formatCurrency(order.amount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Update Status
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}


