"use server"
import { prisma } from "@/src/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function DeleteProductAction(id: number) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      }
    });
    console.info("Producto eliminado exitosamente")
    console.dir(deletedProduct, { depth: null });
    return true;

  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id}`);
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      throw new Error('El producto no existe');
    } else {
      throw new Error('Ocurrió un error inesperado');
    }
  }
}