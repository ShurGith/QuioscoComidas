/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // Si es un componente cliente en Next.js App Router

import { DeleteProductAction } from "@/actions/delete-product-action";
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { toast } from "react-toastify";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
}
export default function DeleteProductButton({ product }: { product: Product }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);
  const [productNameToDelete, setProductNameToDelete] = useState<string | null>(null);

  const openDeleteModal = (id: number, name: string) => {
    setProductIdToDelete(id);
    setProductNameToDelete(name);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
    setProductNameToDelete(null);
  };

  const handleConfirmDelete = async () => {
    closeDeleteModal();

    if (productIdToDelete === null || productNameToDelete === null) {
      //  console.error('Error: No hay producto seleccionado para eliminar.');
      toast.error("Error: No hay producto seleccionado para eliminar.");
      return;
    }

    try {
      const deletedProduct = await DeleteProductAction(productIdToDelete);

      if (deletedProduct) {
        //console.log('Producto eliminado con éxito:', deletedProduct.name);
        toast.success(`"${productNameToDelete}" eliminado con éxito.`); // Ejemplo simple
      }
    } catch (error: any) {
      //console.error('Error al intentar eliminar el producto:', error.message);
      toast(`Error al intentar eliminar el producto: "${productNameToDelete}": ${error.message}`);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label={`Eliminar producto ${product.name}`}
        // Al hacer clic, abre el modal y pasa el ID y nombre del producto
        onClick={() => openDeleteModal(product.id, product.name)}
        className="text-red-600 hover:text-red-400 cursor-pointer p-2 rounded-full hover:bg-red-50 transition-colors"
      >
        <Icon icon="ei:trash" width="28" height="28" />
        <span className="sr-only">, {product.name}</span>
      </button>

      {/* Renderiza el modal */}
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        //    message={product.name}
        product={product}
      />
    </>
  );
}