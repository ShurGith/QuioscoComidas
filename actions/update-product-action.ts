"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { revalidatePath } from "next/cache"

export async function updateProductAction(data: unknown, id: number) {
  const result = await ProductSchema.safeParseAsync(data)

  if (!result.success) {
    console.error("Error de validación de Zod:", result.error.issues); // <--- Necesito la salida de esto
    return {
      errors: result.error.issues
    }
  }
  await prisma.product.update({
    where: {
      id,
    },
    data: result.data
  })
  revalidatePath("/admin/products")
}
