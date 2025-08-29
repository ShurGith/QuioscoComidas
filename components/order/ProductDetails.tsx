
import { formatCurrency, MAX_ITEMS, MIN_ITEMS } from "@/src/lib/utils";
import { useStore } from "@/src/store";
import { OrderItem } from "@/src/types";
import { MinusIcon, PlusIcon, XCircleIcon } from "@heroicons/react/16/solid";
import { useMemo } from "react";


type ProductDetailsProps = {
  item: OrderItem
}



export default function ProductDetails({ item }: ProductDetailsProps) {
  const increaseQuantity = useStore((state) => state.increaseQuantity)
  const decreaseQuantity = useStore((state) => state.decreaseQuantity)
  const removeProductFromOrder = useStore((state) => state.removeProductFromOrder)
  const disableDecreaseButton = useMemo(() => item.quantity === MIN_ITEMS, [item]);
  const disableIncreaseButton = useMemo(() => item.quantity >= MAX_ITEMS, [item])

  return (
    <div className="shadow space-y-1 p-4 bg-white  border-t border-gray-200 ">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <p className="text-xl font-bold">{item.name} </p>

          <button
            type="button"
            title="Eliminar producto del pedido"
            className="cursor-pointer hover:text-red-100 transition-colors duration-300 ease-in-out"
            onClick={() => removeProductFromOrder(item.id)}
          >
            <XCircleIcon className="text-red-600 h-8 w-8" />
          </button>
        </div>
        <p className="text-2xl text-amber-500 font-black">
          {formatCurrency(item.price)}
        </p>
        <div className="flex gap-5 px-10 py-2 bg-gray-100 w-fit rounded-lg">
          <button
            title="Disminuir cantidad"
            type="button"
            disabled={disableDecreaseButton}
            className="cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={() => decreaseQuantity(item.id)}
          >
            <MinusIcon className="h-6 w-6" />
          </button>

          <p className="text-lg font-black ">
            {item.quantity}
          </p>

          <button
            title="Aumentar cantidad"
            disabled={disableIncreaseButton}
            type="button"
            className="cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
            onClick={() => increaseQuantity(item.id)}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xl font-black text-gray-700">
          Subtotal: {''}
          <span className="font-normal">
            {formatCurrency(item.subtotal)}
          </span>
        </p>
      </div>
    </div>
  )
}
