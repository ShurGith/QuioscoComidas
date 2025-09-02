
"use client"
import { DeleteProductAction } from "@/actions/delete-product-action";
import { Icon } from "@iconify/react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type DeleteProductButtonProps = {
  product: Product,
};

export function DeleteProductButton({ product }: DeleteProductButtonProps) {
  const router = useRouter();

  const handleDeleteProduct = async (productId: number, productName: string) => {
    if (!confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}"?`)) {
      return;
    }

    try {
      const deletedProduct = await DeleteProductAction(productId);

      if (deletedProduct) {
        toast.success('Producto eliminado con éxito:' + productName);
        router.refresh();
      } else {
        toast.error('El producto no se pudo eliminar o no existía.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(`Error al intentar eliminar el producto: ${error.message || 'Error desconocido'}`);
    }
  };
  return (
    <button
      type="button"
      aria-label={`Eliminar producto ${product.name}`}
      onClick={() => handleDeleteProduct(product.id, product.name)}
      className="text-red-600 hover:text-red-400 cursor-pointer"
    >
      <Icon icon="ei:trash" width="40" height="40" />
      <span className="sr-only">, {product.name}</span>
    </button>
  )
}