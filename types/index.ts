export type UserRole = 'admin' | 'seller' | 'customer'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  isActive: boolean
  createdAt: string
}

export interface Seller extends User {
  role: 'seller'
  verificationStatus: 'pending' | 'verified' | 'rejected'
  assignedProducts: string[]
}

export interface Product {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  brand: string
  price: number
  discount: number
  finalPrice: number
  stock: number
  sku: string
  status: 'active' | 'inactive'
  images: string[]
  rating: number
  reviewsCount: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon?: string
  image?: string
  isActive: boolean
  subcategories: Subcategory[]
  createdAt: string
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  categoryId: string
  isActive: boolean
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  sellerId?: string
  sellerName?: string
  items: OrderItem[]
  totalAmount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  shippingAddress: Address
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'failed'
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  total: number
  image: string
}

export interface Address {
  id: string
  name: string
  phone: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface CartItem {
  productId: string
  productName: string
  image: string
  price: number
  quantity: number
  stock: number
}


