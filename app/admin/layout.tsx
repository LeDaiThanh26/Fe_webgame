import AdminHeader from "./components/AdminHeader"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AdminHeader />
      <main className="max-w-[1860px] mx-auto px-6 py-8 w-full">{children}</main>
    </div>
  )
}
