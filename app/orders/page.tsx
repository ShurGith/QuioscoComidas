"use client"
import LatestOrderItem from "@/components/order/LatestOrderItem";
import Logo from "@/components/ui/Logo";
import { RELOAD_DELAY } from "@/src/lib/utils";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";

export default function Orderspage() {
  const url = "/orders/api"
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: RELOAD_DELAY,
    revalidateOnFocus: false,
  });
  if (isLoading) return (<p>Cargando...</p>)
  if (error) return (<p>Error al cargar los pedidos</p>)
  if (data) return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">
        Ordenes Listas
      </h1>
      <Logo />
      {data.length ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map((order) => (
            <LatestOrderItem
              key={order.id}
              order={order} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <span>No hay ordenes listas</span>
        </div>
      )}
    </>
  )
}