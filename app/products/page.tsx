


import Enlace from "@/components/Enlace";
import Sidebar from "@/components/Sidebar";

export default function ProductsPage() {
  console.log("DESDE EL SERVIDOR");

  return (
    <div className="container mx-auto py-10 px-4 ">
      <p>ProductsPage</p>
      <Sidebar />
      <Enlace />
    </div>
  )
}
