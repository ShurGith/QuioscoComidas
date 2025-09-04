"use client"

import { updateProductAvailability } from "@/actions/update-product-availability-action"
import { ProductCardComplete } from "@/src/types"
import { useTransition } from "react"
import { toast } from "react-toastify"

type AvailabilityToggleProps = {
  product: ProductCardComplete,
  hiddenTitle?: boolean,
  thisHidden?: boolean
}

export default function AvailabilityToggle({ product, hiddenTitle, thisHidden }: AvailabilityToggleProps) {
  const [isPending, startTransition] = useTransition()

  const handleChange = () => {
    startTransition(async () => {
      const result = await updateProductAvailability(product.id, !product.available)
      if (result === null || result === undefined) {
        toast.success('Disponibilidad actualizada correctamente')
      } else {
        toast.error('Hubo un error al actualizar la disponibilidad')
      }
    })
  }

  return (
    <div className={`${thisHidden ? 'hidden' : ' flex flex-col items-center gap-2'}`}>
      {!hiddenTitle && <p className="text-gray-600 font-bold">Disponible:</p>}
      <label htmlFor={`toggle-${product.id}`}
        className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id={`toggle-${product.id}`} className="sr-only peer"
          defaultChecked={product.available}
          onChange={handleChange}
          disabled={isPending}
          name="available" />
        <div className="w-11 h-6 bg-red-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600
         peer-checked:bg-green-600"></div>
      </label>
    </div>
  )
}

