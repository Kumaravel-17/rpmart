'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import { IoAddOutline, IoSearchOutline, IoPencilOutline, IoTrashOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'

// Mock data
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    category: 'Electronics',
    brand: 'TechBrand',
    price: 99.99,
    discount: 10,
    finalPrice: 89.99,
    stock: 45,
    sku: 'WH-001',
    status: 'active',
    images: ['/product1.jpg'],
  },
  {
    id: '2',
    name: 'Smart Watch',
    category: 'Electronics',
    brand: 'WatchCo',
    price: 199.99,
    discount: 15,
    finalPrice: 169.99,
    stock: 0,
    sku: 'SW-001',
    status: 'active',
    images: ['/product2.jpg'],
  },
  {
    id: '3',
    name: 'Laptop Stand',
    category: 'Accessories',
    brand: 'DeskPro',
    price: 49.99,
    discount: 0,
    finalPrice: 49.99,
    stock: 120,
    sku: 'LS-001',
    status: 'inactive',
    images: ['/product3.jpg'],
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <IoAddOutline className="w-5 h-5 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
            </Select>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3"></div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{formatCurrency(product.finalPrice)}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>
                    <div>
                      <p className="text-gray-900">{formatCurrency(product.finalPrice)}</p>
                      {product.discount > 0 && (
                        <p className="text-sm text-gray-500 line-through">{formatCurrency(product.price)}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={product.stock === 0 ? 'text-red-600 font-medium' : ''}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                  <TableCell>
                    <Badge variant={product.status === 'active' ? 'success' : 'default'}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Link href={`/admin/products/${product.id}/edit`}>
                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <IoPencilOutline className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        {product.status === 'active' ? (
                          <IoEyeOffOutline className="w-4 h-4" />
                        ) : (
                          <IoEyeOutline className="w-4 h-4" />
                        )}
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <IoTrashOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Product"
        size="xl"
      >
        <AddProductForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  )
}

function AddProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    brand: '',
    description: '',
    price: '',
    discount: '',
    stock: '',
    sku: '',
    status: 'active',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Product Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          label="SKU"
          value={formData.sku}
          onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
        </Select>
        <Select
          label="Subcategory"
          value={formData.subcategory}
          onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
        >
          <option value="">Select Subcategory</option>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Brand"
          value={formData.brand}
          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
          required
        />
        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Description
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Price"
          type="number"
          step="0.01"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <Input
          label="Discount (%)"
          type="number"
          value={formData.discount}
          onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
        />
        <Input
          label="Stock Quantity"
          type="number"
          value={formData.stock}
          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Product Images
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-600">Click to upload or drag and drop</p>
          <p className="text-sm text-gray-500 mt-1">Multiple images supported</p>
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Product</Button>
      </div>
    </form>
  )
}


