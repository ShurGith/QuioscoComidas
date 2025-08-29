"use client"

import { useStore } from "@/src/store";
import { Product } from "@prisma/client";

type AddProductButtonProps = {
  product: Product;
}


export default function AddProductButton({ product }: AddProductButtonProps) {
  const addToCart = useStore((state) => state.addToCart);
  return (
    <button className="w-full p-3 mt-5 text-sm uppercase font-medium tracking-wide bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-150 cursor-pointer"
      onClick={() => addToCart(product)}>
      Agregar
    </button>
  )
}
