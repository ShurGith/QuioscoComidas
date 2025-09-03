"use server"

import { prisma } from "@/src/lib/prisma"
import { revalidatePath } from "next/cache"

export async function updateProductAvailability(id: number, available: boolean) {
  try {
    await prisma.product.update({
      where: { id },
      data: { available }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${id}/view`)
  } catch (error) {
    console.log(error)
  }
}

