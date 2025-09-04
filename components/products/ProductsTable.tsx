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
    <div className="px-4 sm:px-6 lg:px-8 mt-4">
      <div className="mt-8 flow-root ">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 bg-white p-5 ">
            <table className="min-w-full divide-y divide-gray-300 ">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Producto
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Precio
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900">
                    Disponible
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 ">
                    Categoría
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-sm font-semibold text-gray-900 relative pl-3 pr-4 sm:pr-0">
                    Acciones
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="flex items-center justify-center">
                      <AvailabilityToggle product={product} hiddenTitle={true} thisHidden={true} />
                      <div className="cursor-pointer" onClick={handleClick}>
                        <Bulb width={40} fill={product.available ? "#facc15" : "#8a8a8a29"} />
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-gray-500 group">
                      <Link href={`/order/${product.category.slug}`} className="py-2 rounded-md hover:underline group-hover:text-green-700 group-hover:bg-gray-200 flex w-full justify-center items-center gap-2">
                        {product.category.name}
                      </Link>
                    </td>
                    <td className="flex items-center justify-center gap-4 py-4">
                      <Link href={`/admin/products/${product.id}/view`}>
                        <Icon icon="emojione:eye" width="30" height="30" />
                      </Link>
                      <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                        <Icon icon="iconoir:page-edit" width="30" height="30" />
                        <span className="sr-only">, {product.name}</span></Link>
                      <DeleteProductButton key={product.id}
                        product={product} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}