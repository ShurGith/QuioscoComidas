"use client"
import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { RELOAD_DELAY } from "@/src/lib/utils";
import { OrderWithProducts } from "@/src/types";
import useSWR from "swr";


export default function OrdersPage() {
  const url = "/admin/orders/api"
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data);
  const { data, error, isLoading } = useSWR<OrderWithProducts[]>(url, fetcher, {
    refreshInterval: RELOAD_DELAY,
    revalidateOnFocus: false,
  });
  if (isLoading) return (<p>Cargando...</p>)
  if (error) return (<p>Error al cargar los pedidos</p>)
  if (data) return (
    <>
      <Heading>Administrar Pedidos</Heading>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
        {data.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  )
}
