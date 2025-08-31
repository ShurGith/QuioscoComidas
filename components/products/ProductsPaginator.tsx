import Link from "next/link";

type ProductsPaginatorProps = {
  page: number;
  totalPages: number;
};


export default function ProductsPaginator({ page, totalPages }: ProductsPaginatorProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const claseLinks = "px-4 py-2 rounded hover:bg-gray-200 text-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-none focus:ring-2"
  return (
    <nav className="flex justify-center py-10">
      {page > 1 && (
        <Link
          className={`${claseLinks} bg-white`}
          href={`/admin/products?page=${page - 1}`}
        >&laquo;</Link>
      )}
      {pages.map((currentPage) => (
        <Link key={currentPage} className={`${claseLinks} ${page === currentPage ? ' pointer-events-none bg-gray-300' : 'bg-white'}`}
          href={`/admin/products?page=${currentPage}`}>
          {currentPage}
        </Link>
      ))}
      {page < totalPages && (
        <Link
          className={`${claseLinks} bg-white`}
          href={`/admin/products?page=${page + 1}`}
        >&raquo;</Link>
      )}
    </nav>
  )
}
