'use client'

import { useRouter, useSearchParams } from "next/navigation"
const method = [
  { id: 'all', title: 'Todos' },
  { id: 'true', title: 'Disponibles' },
  { id: 'false', title: 'No disponibles' },
]

export default function AvailabilityFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // La función es la misma, ahora se activa con el click en un radio.
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const params = new URLSearchParams(searchParams.toString())

    if (value === 'all') {
      params.delete('available')
    } else {
      params.set('available', value)
    }
    // Reiniciamos a la página 1 cada vez que cambia el filtro
    params.set('page', '1')

    router.push(`/admin/products?${params.toString()}`)
  }

  // Obtenemos el valor actual para determinar cuál input está 'checked'
  const currentFilter = searchParams.get('available')
  return (
    <fieldset className="border-t border-t-gray-300">
      <legend className="text-center text-sm/6 font-semibold text-gray-900 dark:text-white">
        Filtrar por disponibilidad
      </legend>
      <div className="items-center justify-center flex sm:items-center sm:space-y-0 sm:space-x-10">
        {method.map((method) => (
          <label key={method.id}
            className="flex items-center cursor-pointer text-sm/6 font-medium text-gray-900 dark:text-white"
          >
            <input
              id={method.id}
              name="availability"
              value={method.id}
              onChange={handleFilterChange}
              checked={method.id === 'all' ? currentFilter === null : currentFilter === method.id}
              type="radio"
              className="relative mr-3 size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 dark:border-white/10 dark:bg-white/5 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:focus-visible:outline-indigo-500 dark:disabled:border-white/5 dark:disabled:bg-white/10 dark:disabled:before:bg-white/20 forced-colors:appearance-auto forced-colors:before:hidden"
            />
            {method.title}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
