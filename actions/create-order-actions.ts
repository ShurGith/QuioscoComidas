"use server"

import { prisma } from "@/src/lib/prisma";
import { OrderSchema } from "@/src/schema";
//import { bgBlue, bgWhite } from "colors"
export async function createOrder(data: unknown) {
  //console.log(bgWhite.bold("\n \n  create order action Hello World \n ".green))
  const result = OrderSchema.safeParse(data)
  //  console.log(bgBlue.bold("\n\n === \n" + result.success + " \n ===\n\n".green))

  if (!result.success) {
    return {
      errors: result.error.issues
    }
  }

  try {
    await prisma.order.create({
      data: {
        name: result.data.name,
        total: result.data.total,
        orderProducts: {
          create: result.data.order.map(product => ({
            productId: product.id,
            quantity: product.quantity
          }))
        }
      }
    })
  } catch (error) {
    console.log(error);
  }
}