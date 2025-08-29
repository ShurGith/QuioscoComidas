"use client"

import { MAX_ITEMS } from "@/src/lib/utils";
import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
}


export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToOrder = useStore((state) => state.addToOrder);
  const order = useStore((state) => state.order)
  const disabledButton = (order.find(item => item.id === product.id)?.quantity || 0) >= MAX_ITEMS
  //const disabledButton = order.quantity

  return (
    <button
      title="Agregar al pedido"
      aria-label={`Añadir ${product.name}`}
      data-testid="add-product-button"
      disabled={disabledButton}
      type="button"
      className="w-full p-3 mt-5 text-sm uppercase font-medium tracking-wide bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-150 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
      onClick={() => addToOrder(product)}>
      {disabledButton ? 'Maximo alcanzado' : 'Agregar al pedido'}
    </button>
  )
}
