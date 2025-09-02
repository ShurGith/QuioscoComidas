import { getImagePath } from '@/src/lib/utils';
import { Product } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  product: Product
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  product,
}) => {
  //& Estado interno para controlar la animación del modal y su contenido
  const [shouldRender, setShouldRender] = useState(false); // Controla si el modal está en el DOM
  const [showContent, setShowContent] = useState(false);   // Controla las transiciones del contenido


  useEffect(() => {
    let openTimer: NodeJS.Timeout;
    let closeTimer: NodeJS.Timeout;

    if (isOpen) {
      setShouldRender(true);
      //& Pequeño retraso para que el componente esté en el DOM antes de aplicar las clases de show
      openTimer = setTimeout(() => {
        setShowContent(true);
        document.body.style.overflow = 'hidden';
      }, 150);
    } else {
      setShowContent(false); // Iniciar transición de cierre
      document.body.style.overflow = '';

      //& Esperar a que la transición termine antes de desmontar el componente
      closeTimer = setTimeout(() => {
        setShouldRender(false);
      }, 250);
    }
    return () => {
      clearTimeout(openTimer);
      clearTimeout(closeTimer);
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  //& Renderizar null si el componente no debe estar en el DOM
  if (!shouldRender) return null;
  return (
    <div
      className={`fixed inset-0 bg-white/20 backdrop-blur-xs  ${showContent ? 'bg-opacity-80' : 'bg-opacity-100'} transition-all duration-500 ease-out`}
    //  onClick={onClose} // Cerrar modal al hacer clic fuera
    >
      <div
        //& Detener la propagación del evento para que no se cierre el modal al hacer clic dentro de su contenido
        onClick={(e) => e.stopPropagation()}
        className={`bg-white 00 p-6 rounded-b-lg shadow-2xl shadow-black max-w-4xl w-full relative text-center mx-auto border border-gray-300 
                    transition-all duration-400 ease-out
                    ${showContent ? '-translate-y-1  opacity-100 scale-100' : '-translate-y-100 opacity-100 scale-100'}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold cursor-pointer"
          aria-label="Cerrar modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-900">Confirmar Eliminado de un producto</h2>
        <p className="mb-6 text-gray-700 text-center font-semibold flex flex-col">¿Confirmas la retirada del producto?
          <span className='font-black'>{product.name}</span>
        </p>
        <Image
          src={getImagePath(product.image)}
          className='rounded-md mx-auto m-8 border border-gray-300'
          alt="" width={100} height={100} />

        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 cursor-pointer"
          >
            No, cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 cursor-pointer"
          >
            Si, eliminar
          </button>
        </div>
      </div>
    </div>
  );
};