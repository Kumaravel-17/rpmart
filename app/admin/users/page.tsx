'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Badge from '@/components/ui/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { IoSearchOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'
import { formatDate } from '@/lib/utils'

// Mock data
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'customer',
    isActive: true,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'customer',
    isActive: true,
    createdAt: '2024-01-02',
  },
]

const sellers = [
  {
    id: '1',
    name: 'Seller A',
    email: 'seller-a@example.com',
    role: 'seller',
    verificationStatus: 'verified',
    isActive: true,
    assignedProducts: 45,
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'Seller B',
    email: 'seller-b@example.com',
    role: 'seller',
    verificationStatus: 'pending',
    isActive: true,
    assignedProducts: 23,
    createdAt: '2024-01-03',
  },
]

export default function UsersPage() {
  const [activeTab, setActiveTab] = useState<'users' | 'sellers'>('users')
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users & Sellers</h1>
        <p className="text-gray-600 mt-1">Manage users and seller accounts</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('sellers')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sellers'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            Sellers
          </button>
        </nav>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      {activeTab === 'users' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="default">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'success' : 'default'}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        {user.isActive ? (
                          <IoEyeOffOutline className="w-4 h-4" />
                        ) : (
                          <IoEyeOutline className="w-4 h-4" />
                        )}
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Sellers Table */}
      {activeTab === 'sellers' && (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Verification</TableHead>
                  <TableHead>Assigned Products</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sellers.map((seller) => (
                  <TableRow key={seller.id}>
                    <TableCell className="font-medium">{seller.name}</TableCell>
                    <TableCell>{seller.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          seller.verificationStatus === 'verified'
                            ? 'success'
                            : seller.verificationStatus === 'pending'
                            ? 'warning'
                            : 'danger'
                        }
                      >
                        {seller.verificationStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>{seller.assignedProducts}</TableCell>
                    <TableCell>
                      <Badge variant={seller.isActive ? 'success' : 'default'}>
                        {seller.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(seller.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          Verify
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          {seller.isActive ? (
                            <IoEyeOffOutline className="w-4 h-4" />
                          ) : (
                            <IoEyeOutline className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}


