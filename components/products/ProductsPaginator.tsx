"use client"
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
  const availableTerm = params.get("available");
  const availableParam = availableTerm ? `&available=${availableTerm}` : "";

  const claseLinks = "px-4 py-2 rounded hover:bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-none focus:ring-2";

  const pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className="flex justify-center items-center py-10">
      {page > 1 && (
        <Link
          className={`${claseLinks} bg-white`}
          href={`${pathname}?page=${page - 1}${searchParam}${availableParam}`}
        >&laquo;</Link>
      )}

      {pagesToShow.map((p) => {

        return (
          <Link
            key={p}
            className={`${claseLinks} ${page === p ? 'pointer-events-none bg-indigo-600  text-white' : 'bg-white'}`}
            href={`${pathname}?page=${p}${searchParam}${availableParam}`}
          >
            {p}
          </Link>
        );
      })}

      {page !== totalPages && (
        <Link
          className={`${claseLinks} bg-white`}
          href={`${pathname}?page=${page + 1}${searchParam}${availableParam}`}
        >&raquo;</Link>
      )}
    </nav>
  )
}