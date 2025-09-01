"use server"
import { prisma } from "@/src/lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export async function DeleteProductAction(id: number) {
  // Asegúrate de que este console.log aparece en tu terminal del servidor
  console.log("Attempting to delete product with ID:", id); // Más descriptivo

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id: id,
      }
    });
    console.info("Producto eliminado exitosamente")
    console.dir(deletedProduct, { depth: null }); // Para ver todos los detalles del producto eliminado
    return true; // Retorna el objeto del producto eliminado
    // O si solo quieres un indicador de éxito: return true;

  } catch (error) { // Es buena idea tipar 'error'
    console.error(`Error al eliminar el producto con ID ${id}`);
    if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
      throw new Error('El producto no existe');
    } else {
      throw new Error('Ocurrió un error inesperado');
    }
  }
}