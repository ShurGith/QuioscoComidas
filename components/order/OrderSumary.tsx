"use client"
import { createOrder } from "@/actions/create-order-actions";
import ProductDetails from "@/components/order/ProductDetails";
import { formatCurrency } from "@/src/lib/utils";
import { OrderSchema } from "@/src/schema";
import { useStore } from "@/src/store";
import { useMemo } from "react";
import { toast } from "react-toastify";

export default function OrderSumary() {
  const order = useStore((state) => state.order)
  const clearOrder = useStore((state) => state.clearOrder)
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0), [order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get("name"),
      total, order
    }

    const result = OrderSchema.safeParse(data)
    if (!result.success) {
      result.error.issues.forEach(issue => toast.error(issue.message))
      return;
    }
    const response = await createOrder(data)
    if (response?.errors) {
      response.errors.forEach(error =>
        toast.error(error.message)
      )
    }
    toast.success("Peido creado con éxito!")
    clearOrder()
  }

  return (
    <aside className="lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5">
      <h1 className="text-4xl text-center font-black"> Mi Pedido</h1>
      {order.length === 0 ? (
        <p className="mt-5 text-gray-700 text-center">No hay productos en el pedido</p>
      ) : (
        <div className="mt-5">
          {order.map(item =>
            <ProductDetails
              key={item.id}
              item={item} />
          )}

          <p className="mt-3 text-xl font-bold">Total: {formatCurrency(total)}</p>
          <form
            className="w-full mt-10 space-y-5"
            action={handleCreateOrder}>

            <input
              type="text"
              placeholder="Tu Nombre"
              className="border border-gray-200 bg-white px-4 p-2 rounded-lg w-full"
              name="name"
            />


            <input
              type="submit"
              className="py-2 mt-4 font-bold rounded uppercase text-white bg-black w-full text-center cursor-pointer"
              value="Confirmar Pedido"
            />
          </form>


        </div>
      )}
    </aside>
  )
}
