'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { IoCubeOutline, IoCartOutline, IoCashOutline, IoAlertCircleOutline } from 'react-icons/io5'
import { formatCurrency } from '@/lib/utils'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'

// Mock data
const summaryData = {
  totalProducts: 1248,
  totalOrders: 3421,
  revenue: 245890,
  outOfStock: 23,
}

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
]

const topProducts = [
  { id: '1', name: 'Wireless Headphones', sales: 234, revenue: 23400 },
  { id: '2', name: 'Smart Watch', sales: 189, revenue: 37800 },
  { id: '3', name: 'Laptop Stand', sales: 156, revenue: 7800 },
  { id: '4', name: 'USB-C Cable', sales: 145, revenue: 2900 },
  { id: '5', name: 'Wireless Mouse', sales: 132, revenue: 13200 },
]

const recentOrders = [
  { id: '1', orderNumber: 'ORD-001', customer: 'John Doe', amount: 299.99, status: 'pending' },
  { id: '2', orderNumber: 'ORD-002', customer: 'Jane Smith', amount: 149.99, status: 'confirmed' },
  { id: '3', orderNumber: 'ORD-003', customer: 'Bob Johnson', amount: 89.99, status: 'shipped' },
  { id: '4', orderNumber: 'ORD-004', customer: 'Alice Brown', amount: 199.99, status: 'delivered' },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'warning' | 'danger'> = {
    pending: 'warning',
    confirmed: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'danger',
  }
  return variants[status] || 'default'
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.totalProducts}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.totalOrders}</p>
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
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(summaryData.revenue)}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <IoCashOutline className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{summaryData.outOfStock}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <IoAlertCircleOutline className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.sales} sales</p>
                  </div>
                  <p className="font-semibold text-primary-600">{formatCurrency(product.revenue)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
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
              {recentOrders.map((order) => (
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
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


