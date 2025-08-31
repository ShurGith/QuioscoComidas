import { ProductsWithCategory } from "@/app/admin/products/page";
import { formatCurrency } from "@/src/lib/utils";
//import { Category, Product } from "@prisma/client";
import Link from "next/link";

type ProductTableProps = {
  //products: Product[];
  /*   products: ({
      category: Category
    } & Product)[] */
  products: ProductsWithCategory
};

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-20">
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
                  <th scope="col" className="px-3 py-3.5  text-sm font-semibold text-gray-900 ">
                    Categoría
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 relative pl-3 pr-4 sm:pr-0">
                    Acciones
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      {product.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 group">
                      <Link href={`/order/${product.category.slug}`} className="py-2 rounded-md hover:underline group-hover:text-green-700 group-hover:bg-gray-200 flex w-full justify-center items-center gap-2">
                        {product.category.name}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                          version="1.1" aria-hidden="true" id="Eye--Streamline-Heroicons" height="24" width="24">
                          <path d="M12 15a3 3 0 1 0 0 -6 3 3 0 0 0 0 6Z" strokeWidth="1"></path>
                          <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69 0.12 0.362 0.12 0.752 0 1.113 -1.487 4.471 -5.705 7.697 -10.677 7.697 -4.97 0 -9.186 -3.223 -10.675 -7.69a1.762 1.762 0 0 1 0 -1.113ZM17.25 12a5.25 5.25 0 1 1 -10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" strokeWidth="1"></path>
                        </svg>
                      </Link>
                    </td>
                    <td className="flex items-center justify-center gap-4 py-4">
                      <Link href={`/admin/products/${product.id}/edit`} className="text-indigo-600 hover:text-indigo-900">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" version="1.1" aria-hidden="true" id="Pencil-Square--Streamline-Heroicons" height="24" width="24">
                          <path d="M21.731 2.269a2.625 2.625 0 0 0 -3.712 0l-1.157 1.157 3.712 3.712 1.157 -1.157a2.625 2.625 0 0 0 0 -3.712Zm-2.218 5.93 -3.712 -3.712 -8.4 8.4a5.25 5.25 0 0 0 -1.32 2.214l-0.8 2.685a0.75 0.75 0 0 0 0.933 0.933l2.685 -0.8a5.25 5.25 0 0 0 2.214 -1.32l8.4 -8.4Z" strokeWidth="1"></path>
                          <path d="M5.25 5.25a3 3 0 0 0 -3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3 -3V13.5a0.75 0.75 0 0 0 -1.5 0v5.25a1.5 1.5 0 0 1 -1.5 1.5H5.25a1.5 1.5 0 0 1 -1.5 -1.5V8.25a1.5 1.5 0 0 1 1.5 -1.5h5.25a0.75 0.75 0 0 0 0 -1.5H5.25Z" strokeWidth="1"></path>
                        </svg>
                        <span className="sr-only">, {product.name}</span></Link>
                      <Link href={`/admin/products/${product.id}/delete`} className="text-red-600 hover:text-red-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" id="Trash--Streamline-Bootstrap" height="16" width="16">
                          <path d="M5.5 5.5A0.5 0.5 0 0 1 6 6v6a0.5 0.5 0 0 1 -1 0V6a0.5 0.5 0 0 1 0.5 -0.5m2.5 0a0.5 0.5 0 0 1 0.5 0.5v6a0.5 0.5 0 0 1 -1 0V6a0.5 0.5 0 0 1 0.5 -0.5m3 0.5a0.5 0.5 0 0 0 -1 0v6a0.5 0.5 0 0 0 1 0z" strokeWidth="1"></path>
                          <path d="M14.5 3a1 1 0 0 1 -1 1H13v9a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V4h-0.5a1 1 0 0 1 -1 -1V2a1 1 0 0 1 1 -1H6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1 -1V4.059L11.882 4zM2.5 3h11V2h-11z" strokeWidth="1"></path>
                        </svg>
                        <span className="sr-only">, {product.name}</span></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}