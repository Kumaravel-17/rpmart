'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { IoSearchOutline } from 'react-icons/io5'
import { formatCurrency, formatDate } from '@/lib/utils'
import Button from '@/components/ui/Button'

// Mock data
const orders = [
  {
    id: '1',
    orderNumber: 'ORD-001',
    customerName: 'John Doe',
    totalAmount: 299.99,
    status: 'pending',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    orderNumber: 'ORD-002',
    customerName: 'Jane Smith',
    totalAmount: 149.99,
    status: 'confirmed',
    createdAt: '2024-01-14',
  },
]

const getStatusBadge = (status: string) => {
  const variants: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info'> = {
    pending: 'warning',
    confirmed: 'info',
    processing: 'info',
    shipped: 'info',
    delivered: 'success',
  }
  return variants[status] || 'default'
}

export default function SellerOrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assigned Orders</h1>
        <p className="text-gray-600 mt-1">Manage delivery status for your assigned orders</p>
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
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderNumber}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell className="font-semibold">{formatCurrency(order.totalAmount)}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadge(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(order.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => setSelectedOrder(order.id)}
                    >
                      Update Status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Update Status Modal */}
      {selectedOrder && (
        <UpdateStatusModal
          orderId={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  )
}

function UpdateStatusModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const order = orders.find((o) => o.id === orderId)
  const [status, setStatus] = useState(order?.status || 'pending')

  if (!order) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Status updated:', status)
    onClose()
  }

  return (
    <Modal isOpen={true} onClose={onClose} title={`Update Order ${order.orderNumber}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Status
          </label>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </Select>
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Update Status</Button>
        </div>
      </form>
    </Modal>
  )
}


