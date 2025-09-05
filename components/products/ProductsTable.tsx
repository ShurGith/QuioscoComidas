"use client"
import { ProductsWithCategory } from "@/app/admin/products/page";
import AvailabilityToggle from "@/components/products/AvailabilityToggle";
import DeleteProductButton from "@/components/products/DeleteProductButton";
import Bulb from "@/components/ui/Bulb";
import { formatCurrency } from "@/src/lib/utils";
import { Icon } from "@iconify/react";
import Link from "next/link";

type ProductTableProps = {
  products: ProductsWithCategory
};
const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
  // Buscar el checkbox más cercano dentro de la misma celda <td>
  const checkbox = e.currentTarget
    .closest("td")
    ?.querySelector<HTMLInputElement>("input[type='checkbox']");

  if (checkbox) {
    checkbox.click(); // Simula el click en el checkbox
    console.log("Checkbox toggled:", checkbox.checked);
  } else {
    console.log("No se encontró ningún checkbox cercano");
  }
};

export default function ProductTable({ products }: ProductTableProps) {

  return (
    <div className="overflow-x-auto mt-12 px-20 shadow-md sm:rounded-lg">
      <div className="grid grid-cols-10 min-w-full border-b border-gray-300 ">
        <h3 className="col-span-5 px-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
          Producto
        </h3>
        <h3 className="text-center px-3 py-3.5 text-sm font-semibold text-gray-900">
          Precio
        </h3>
        <h3 className="px-3 py-3.5 text-sm font-semibold text-gray-900">
          Disponible
        </h3>
        <h3 className="px-3 py-3.5 text-sm font-semibold text-gray-900 ">
          Categoría
        </h3>
        <h3 className="col-span-2 px-3 py-3.5 text-center text-sm font-semibold text-gray-900  sm:pr-0">
          Acciones
          <span className="sr-only">Acciones</span>
        </h3>
      </div>
      {products.map((product) => (
        <div key={product.id} className="grid grid-cols-10 min-w-full border-b border-gray-300">
          <div className="col-span-5 px-3 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
            {product.name}
          </div>
          <div className="text-center px-3 py-4 text-sm text-gray-500">
            {formatCurrency(product.price)}
          </div>
          <div className="flex items-center justify-center relative">
            <AvailabilityToggle product={product} thisHidden={true} />
            <div className="cursor-pointer" onClick={handleClick}>
              <Bulb width={40} fill={product.available ? "#ffe064" : "#8a8a8a29"} />
            </div>
          </div>
          <div className="px-3 py-4 text-sm text-gray-500 group">
            <Link href={`/order/${product.category.slug}`} className="py-2 rounded-md hover:underline group-hover:text-green-700 group-hover:bg-gray-200 flex w-full justify-center items-center gap-2">
              {product.category.name}
            </Link>
          </div>
          <div className="col-span-2 flex items-center justify-center gap-4 p-3">
            <Link href={`/admin/products/${product.id}/view`}>
              <Icon icon="emojione:eye" width="30" height="30" />
            </Link>
            <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
              <Icon icon="iconoir:page-edit" width="30" height="30" />
              <span className="sr-only">, {product.name}</span>
            </Link>
            <DeleteProductButton product={product} />
          </div>
        </div>
      ))}
    </div>
  )
}