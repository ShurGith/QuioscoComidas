/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { prisma } from "@/src/lib/prisma";
import { revalidatePath } from "next/cache";

export async function DeleteProductAction(productId: number) {
  try {
    const orderCount = await prisma.orderProducts.count({
      where: { productId: productId },
    });
    if (orderCount > 0) {
      throw new Error('Este producto no se puede eliminar porque ya forma parte de pedidos existentes.');
    }
    const deletedProduct = await prisma.product.delete({
      where: { id: productId },
    });
    revalidatePath('/products');
    return deletedProduct;
  } catch (error: any) {
    console.error('Error al eliminar el producto:', error);
    throw new Error(error.message || 'Ocurrió un error inesperado.');
  }
}