'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { IoSearchOutline, IoEyeOutline } from 'react-icons/io5'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock data
const orders = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    sellerName: 'Seller A',
    totalAmount: 299.99,
    status: 'pending',
    paymentStatus: 'paid',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    sellerName: null,
    totalAmount: 149.99,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    orderNumber: 'ORD-003',
    customerName: 'Bob Johnson',
    sellerName: 'Seller B',
    totalAmount: 89.99,
    status: 'shipped',
    paymentStatus: 'paid',
    createdAt: '2024-01-13',
  },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    pending: 'warning',
    confirmed: 'info',
    processing: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'danger',
  }
  return variants[status] || 'default'
}

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-600 mt-1">Manage and track all orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order Number</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Seller</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    {order.sellerName || (
                      <span className="text-gray-400">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="font-semibold">{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={order.paymentStatus === 'paid' ? 'success' : 'warning'}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelectedOrder(order.id)}
                      className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                      <IoEyeOutline className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  )
}

function OrderDetailsModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const order = orders.find((o) => o.id === orderId)
  const [status, setStatus] = useState(order?.status || 'pending')
  const [sellerId, setSellerId] = useState(order?.sellerName || '')

  if (!order) return null

  return (
    <Modal isOpen={true} onClose={onClose} title={`Order ${order.orderNumber}`} size="lg">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Customer</p>
            <p className="font-medium">{order.customerName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="font-medium text-lg">{formatCurrency(order.totalAmount)}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assign to Seller
          </label>
          <Select value={sellerId} onChange={(e) => setSellerId(e.target.value)}>
            <option value="">Select Seller</option>
            <option value="seller-a">Seller A</option>
            <option value="seller-b">Seller B</option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update Status
          </label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </Select>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  )
}


