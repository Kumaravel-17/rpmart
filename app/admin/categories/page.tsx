'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Modal from '@/components/ui/Modal'
import Badge from '@/components/ui/Badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { IoAddOutline, IoPencilOutline, IoTrashOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5'

// Mock data
const categories = [
  {
    id: '1',
    name: 'Electronics',
    slug: 'electronics',
    isActive: true,
    subcategories: [
      { id: '1-1', name: 'Smartphones', slug: 'smartphones', isActive: true },
      { id: '1-2', name: 'Laptops', slug: 'laptops', isActive: true },
    ],
  },
  {
    id: '2',
    name: 'Accessories',
    slug: 'accessories',
    isActive: true,
    subcategories: [
      { id: '2-1', name: 'Cases', slug: 'cases', isActive: true },
    ],
  },
]

export default function CategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-600 mt-1">Manage product categories and subcategories</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <IoAddOutline className="w-5 h-5 mr-2" />
          Add Category
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <>
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell className="font-mono text-sm">{category.slug}</TableCell>
                    <TableCell>
                      <button
                        onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
                        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                      >
                        {category.subcategories.length} subcategories
                      </button>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.isActive ? 'success' : 'default'}>
                        {category.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                          <IoPencilOutline className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                          {category.isActive ? (
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
                  {expandedCategory === category.id && (
                    <TableRow>
                      <TableCell colSpan={5} className="bg-gray-50">
                        <div className="pl-8 space-y-2">
                          {category.subcategories.map((sub) => (
                            <div key={sub.id} className="flex items-center justify-between py-2">
                              <div>
                                <span className="font-medium">{sub.name}</span>
                                <span className="ml-2 text-sm text-gray-500 font-mono">({sub.slug})</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge variant={sub.isActive ? 'success' : 'default'}>
                                  {sub.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                                <button className="p-1 text-primary-600 hover:bg-primary-50 rounded">
                                  <IoPencilOutline className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                                  <IoTrashOutline className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                          <Button size="sm" variant="outline" className="mt-2">
                            <IoAddOutline className="w-4 h-4 mr-1" />
                            Add Subcategory
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Category"
      >
        <CategoryForm onClose={() => setIsAddModalOpen(false)} />
      </Modal>
    </div>
  )
}

function CategoryForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    isActive: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Category submitted:', formData)
    onClose()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
        required
      />
      <Input
        label="Slug"
        value={formData.slug}
        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
        required
      />
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isActive"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
        />
        <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
          Active
        </label>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">Add Category</Button>
      </div>
    </form>
  )
}


