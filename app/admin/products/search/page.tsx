import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

async function searchedProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    include: {
      category: true
    }
  })
  return products;
}
export default async function SearchPage({ searchParams }: { searchParams: { search: string } }) {
  const products = await searchedProducts(searchParams.search);

  return (
    <>
      <Heading >
        Resultados de la Búsqueda de: <b> {searchParams.search.toUpperCase()}</b>
        &nbsp; ({products.length})
      </Heading>
      <hr className="text-slate-300 w-full border-b-2 border-dashed" />
      {products.length === 0 && (<p>No hay resultados para tu búsqueda</p>)}
      {products.length > 0 &&
        <ProductTable
          products={products} />
      }
    </>
  )
}
