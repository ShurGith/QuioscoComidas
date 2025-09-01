import OrderCard from "@/components/order/OrderCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

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

  return (
    <>
      <Heading>Administrar Pedidos</Heading>
      <form
        action={async () => {
          "use server"
          revalidatePath("/admin/orders");
        }}
      >
        <input
          type="submit"
          value="Actualizar pedidos"
          className="min-w-fit bg-amber-400 px-10 py-3 w-full lg:w-auto text-xl text-center font-bold rounded-md hover:bg-amber-500 transition-colors cursor-pointer" />
      </form>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
        {pendingOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </>
  )
}
