import DashboardLayout from '@/components/layouts/DashboardLayout'

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout role="seller">{children}</DashboardLayout>
}


