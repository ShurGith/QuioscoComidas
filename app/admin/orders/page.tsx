import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function getPendingOrders() {
  const orders = await prisma.order.findMany({
    where: {
      status: false,
    },
    include: {
      orderProducts: {
        include: {
          product: true
        }
      }
    }
  })
  return orders;
}
export default async function POrdersPage() {
  const pendingOrders = await getPendingOrders();
  //console.log(pendingOrders);
  return (
    <>
      <Heading>Administrar Pedidos</Heading>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
        {pendingOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  )
}
