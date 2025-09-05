"use client"

import { createProduct } from "@/actions/create-product-action"
import { ProductSchema } from "@/src/schema"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"


export default function AddProductForm({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const handleSubmit = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: formData.get("price"),
      categoryId: formData.get("categoryId"),
      image: formData.get("image"),
      available: formData.get("available") === 'on' ? true : false,
    }
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => {
        toast.error(issue.message)
        console.log(issue.message);
      })
      return;
    }
    const response = await createProduct(result.data)
    if (response?.errors) {
      response.errors.forEach(issue =>
        toast.error(issue.message)
      )
      return;
    }
    toast.success("Producto creado con éxito!")
    router.push("/admin/products")
  }
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto">
      <form
        action={handleSubmit}
        className="space-y-5">
        {children}
        <input
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full p-3 uppercase font-bold cursor-pointer transition-all duration-200 ease-in-out"
          value="Registrar Producto" />
      </form>
    </div>
  )
}