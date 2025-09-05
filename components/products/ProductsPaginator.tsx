"use client"
import { generatePaginationT3 } from "@/app/admin/functions/paginateFunctionUno";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type ProductsPaginatorProps = {
  page: number;
  totalPages: number;
};

export default function ProductsPaginator({ page, totalPages }: ProductsPaginatorProps) {
  // 2. Obtén la ruta actual de la URL (ej: /admin/products/search)
  const pathname = usePathname();
  const params = useSearchParams();
  const searchTerm = params.get('search');
  const searchParam = searchTerm ? `&search=${searchTerm}` : "";

  const claseLinks = "px-4 py-2 rounded hover:bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-none focus:ring-2";

  const pagesToShow = generatePaginationT3(totalPages, page)

  return (
    <nav className="flex justify-center items-center py-10">
      {page > 1 && (
        <Link
          className={`${claseLinks} bg-white`}
          href={`${pathname}?page=${page - 1}${searchParam}`}
        >&laquo;</Link>
      )}

      {pagesToShow.map((p, index) => {
        if (typeof p === 'string') {
          return (
            <span key={`ellipsis-${index}`} className="px-4 py-2 text-gray-500 ring-1 ring-inset ring-gray-300">
              {p}
            </span>
          );
        }

        return (
          <Link
            key={p}
            className={`${claseLinks} ${page === p ? 'pointer-events-none bg-indigo-600 text-white' : 'bg-white'}`}
            href={`${pathname}?page=${p}${searchParam}`}
          >
            {p}
          </Link>
        );
      })}

      {page < totalPages && (
        <Link
          className={`${claseLinks} bg-white`}
          href={`${pathname}?page=${page + 1}${searchParam}`}
        >&raquo;</Link>
      )}
    </nav>
  )
}