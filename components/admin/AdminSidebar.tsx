import AdminRoute from "@/components/admin/AdminRoute"
import Logo from "@/components/ui/Logo"

const adminNavigation = [
  { url: '/admin/orders', text: 'Ordenes', blank: false },
  { url: '/admin/products', text: 'Productos', blank: false },
  { url: '/order/cafe', text: 'Ver Quiosco', blank: true },
]

export default function AdminSidebar() {

  return (
    <>

      <div className="space-y-3 ">
        <Logo />
        <nav className="flex flex-col">
          {adminNavigation.map(link => (
            <AdminRoute
              key={link.url}
              link={link}
            />

          ))}
        </nav>
      </div>
    </>

  )
}