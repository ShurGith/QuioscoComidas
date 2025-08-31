"use client"

import { SearhSchema } from "@/src/schema";
//import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


export default function ProductSearchForm() {
  const router = useRouter();
  const handleSearchForm = (formData: FormData) => {
    const data = {
      search: formData.get('search')
    }
    const result = SearhSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return;
    }
    router.push(`/admin/products/search?search=${result.data.search}`);

  }


  return (
    <form
      action={handleSearchForm}
      className="flex items-center justify-center gap-2 w-full">
      <input type="text" placeholder="Buscar producto..."
        className="p-2 placeholder-gray-400 w-full bg-white border border-gray-300 rounded-md focus:border-indigo-500 outline-none focus:ring-1 ring-indigo-500"
        name="search"
      />
      <button
        className="bg-indigo-600 text-white p-2 rounded-md cursor-pointer hover:bg-indigo-700 transition-colors duration-300">
        Buscar</button>
    </form>
  )
}
