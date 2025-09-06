import LinkAmber from "@/components/LinkAmber";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPaginator from "@/components/products/ProductsPaginator";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

const pageSize = Number(process.env.PAGE_SIZE) || 20;
interface SearchPageProps {
  searchParams: Promise<{
    page: number,
    search: string,
  }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { page, search } = await searchParams
  const searchTerm = search;
  const pageCheck = page ?? 1;

  if (!searchTerm) {
    redirect('/admin/products');
  }
  const totalProducts = await prisma.product.count({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    }
  });

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    take: pageSize,
    skip: (pageCheck - 1) * pageSize, // Saltarse las páginas anteriores
    include: {
      category: true
    },
    orderBy: {
      name: 'asc'
    }
  });
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (pageCheck < 1 || (pageCheck > totalPages && totalProducts > 0)) {
    redirect(`/admin/products/search?search=${searchTerm}`);
  }

  return (
    <>
      <Heading >
        Resultados para: <span className="font-black">&quot;{searchTerm}&quot;</span>
        &nbsp;({totalProducts})
      </Heading >

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5 my-10">
        <ProductSearchForm />
      </div>

      {
        products.length === 0 ? (
          <div className="text-center">
            <p className="text-center text-lg m-10">No se encontraron resultados para tu búsqueda</p>

            <LinkAmber texto='Volver a la lista' enlace='/admin/products' />
          </div>
        ) : (
          <>
            <ProductTable products={products} />
            <ProductsPaginator
              page={page}
              totalPages={totalPages}
            />
          </>
        )
      }
    </>
  )
}