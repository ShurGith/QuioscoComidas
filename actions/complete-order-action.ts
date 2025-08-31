"use server"
import { prisma } from "@/src/lib/prisma";
import { bgGreen, bgRed } from "colors";
import { revalidatePath } from "next/cache";

export async function completeOrder(formData: FormData) {
  //console.log(formData.get("order_id"));
  console.log(bgGreen("!!! ESTO VIENE DEL CLIENTE ¡¡¡¡".white));
  const orderId = formData.get("order_id");
  try {
    await prisma.order.update({
      where: {
        id: +orderId!,
      },
      data: {
        status: true,
        orderReadyAt: new Date(Date.now()),
      },
    });
    revalidatePath("/admin/orders");
  } catch (error) {
    console.log(bgRed(error + " !!! ERROR AL COMPLETAR EL PEDIDO !!!".white));
  }
}