'use client'

import { useRouter, useSearchParams } from "next/navigation"

export default function AvailabilityFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all') {
      params.delete('available')
    } else {
      params.set('available', value)
    }
    params.set('page', '1')

    router.push(`/admin/products?${params.toString()}`)
  }

  return (
    <div className="flex items-center bg-red-400 p-3 rounded-lg shadow">
      <label htmlFor="available" className="text-gray-600 font-semibold mr-1 w-1/3 border ">
        Filtrar por:
      </label>
      <select
        id="available"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-amber-500 focus:border-amber-500 w-full py-2.5"
        onChange={handleChange}
        defaultValue={searchParams.get('available') || 'all'}
      >
        <option value="all">Todos</option>
        <option value="true">Disponibles</option>
        <option value="false">No Disponibles</option>
      </select>
    </div>
  )
}