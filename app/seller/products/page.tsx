'use client'

import { Card, CardContent } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { IoSearchOutline } from 'react-icons/io5'
import { formatCurrency } from '@/lib/utils'
import { useState } from 'react'

// Mock data - read-only products assigned to seller
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
  },
]

export default function SellerProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assigned Products</h1>
        <p className="text-gray-600 mt-1">View your assigned products (read-only)</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}


