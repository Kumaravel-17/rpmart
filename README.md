# KMart - Enterprise E-Commerce Platform

A modern, production-ready e-commerce web application built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. This application implements an **admin-controlled product model** where only admins can create and manage products, while sellers can view assigned products and manage orders.

## 🚀 Features

### Admin Panel
- **Dashboard**: Analytics, sales charts, top products, and recent orders
- **Product Management**: Full CRUD operations (Admin-only)
  - Product list with search, filter, and sort
  - Add/Edit products with rich forms
  - Multiple image upload support
  - Price, discount, and stock management
- **Category Management**: Create and manage categories & subcategories
- **Order Management**: View, assign to sellers, and update order status
- **User & Seller Management**: Manage users and verify sellers

### Seller Panel
- **Dashboard**: Overview of assigned products and orders
- **Assigned Products**: Read-only view of assigned products
- **Order Management**: Update delivery status for assigned orders
- **Sales Summary**: Revenue and order statistics

### Customer UI
- **Home Page**: Hero banner, categories, trending products, deals
- **Product Listing**: Grid/list view with filters and sorting
- **Product Details**: Image gallery, reviews, similar products
- **Shopping Cart**: Add/remove items, quantity management
- **Checkout**: Multi-step checkout (address, payment, review)
- **User Profile**: Orders, wishlist, saved addresses

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **React**: React 19
- **Language**: TypeScript 5.6+
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: React Icons
- **Design**: Modern, minimal, enterprise-grade UI

## 📁 Project Structure

```
kmart/
├── app/
│   ├── admin/              # Admin panel pages
│   │   ├── page.tsx        # Admin dashboard
│   │   ├── products/       # Product management
│   │   ├── categories/     # Category management
│   │   ├── orders/         # Order management
│   │   └── users/          # User & seller management
│   ├── seller/             # Seller panel pages
│   │   ├── page.tsx        # Seller dashboard
│   │   ├── products/       # Assigned products (read-only)
│   │   └── orders/         # Assigned orders
│   ├── products/           # Customer product pages
│   │   ├── page.tsx        # Product listing
│   │   └── [id]/           # Product details
│   ├── cart/               # Shopping cart
│   ├── checkout/           # Checkout flow
│   ├── profile/            # User profile
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── layouts/            # Layout components
│   │   ├── Sidebar.tsx     # Admin/Seller sidebar
│   │   ├── DashboardLayout.tsx
│   │   └── CustomerNav.tsx # Customer navigation
│   └── ui/                 # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       ├── Input.tsx
│       ├── Select.tsx
│       ├── Badge.tsx
│       ├── Modal.tsx
│       ├── Table.tsx
│       └── Skeleton.tsx
├── lib/
│   └── utils.ts            # Utility functions
├── types/
│   └── index.ts            # TypeScript types
└── package.json
```

## 🎨 Design Features

- **Fully Responsive**: Mobile-first design, works on all devices
- **Modern UI**: Clean, professional, enterprise-grade interface
- **Consistent Design System**: Reusable components with consistent styling
- **Accessibility**: Proper spacing, readable fonts, keyboard navigation
- **Loading States**: Skeleton loaders for async content
- **Role-Based UI**: Different layouts for admin, seller, and customer

## 🚦 Getting Started

### Prerequisites

- Node.js 20.9+ (required for Next.js 16)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📋 User Roles & Permissions

### Admin
- ✅ Create, edit, delete products
- ✅ Manage categories and subcategories
- ✅ View and assign orders to sellers
- ✅ Manage users and sellers
- ✅ View analytics and reports

### Seller
- ✅ View assigned products (read-only)
- ✅ View assigned orders
- ✅ Update order delivery status
- ❌ Cannot create or edit products

### Customer
- ✅ Browse products and categories
- ✅ Add products to cart
- ✅ Place orders
- ✅ Manage profile and addresses
- ❌ Cannot access admin/seller panels

## 🎯 Key Features Implementation

### Admin-Controlled Product Model
- Products can only be created/edited by admins
- Sellers have read-only access to assigned products
- Clear role separation in UI and routing

### Product Management
- Rich product forms with validation
- Multiple image upload support
- Price calculation with discounts
- Stock management
- SKU generation

### Order Management
- Order assignment to sellers
- Status tracking (pending → delivered)
- Payment status tracking
- Order details view

### Responsive Design
- Mobile-first approach
- Sidebar navigation for admin/seller
- Top navigation for customers
- Grid/list view toggle for products

## 🔧 Customization

### Colors
Edit `tailwind.config.ts` to customize the color palette:
```typescript
colors: {
  primary: {
    // Your primary colors
  }
}
```

### Components
All UI components are in `components/ui/` and can be customized as needed.

## 📝 Notes

- This is a frontend-only implementation
- Mock data is used for demonstration
- Backend API integration needed for production
- Authentication/authorization needs to be implemented
- Image upload functionality needs backend support

## 🚀 Next Steps

1. **Backend Integration**: Connect to your API
2. **Authentication**: Implement login/signup
3. **Image Upload**: Add file upload functionality
4. **State Management**: Add Redux/Zustand if needed
5. **Testing**: Add unit and integration tests
6. **SEO**: Add meta tags and SEO optimization

## 📄 License

This project is open source and available for use.

---

Built with ❤️ using Next.js and Tailwind CSS
