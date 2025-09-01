import LinkAmber from "@/components/LinkAmber";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPaginator from "@/components/products/ProductsPaginator";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

async function productsCount() {
  return await prisma.product.count();
}


async function getProducts(page: number, pageSize: number) {

  const skip = (page - 1) * pageSize;
  return await prisma.product.findMany(
    {
      take: pageSize,
      skip,
      include: {
        category: true,
      }
    }
  );
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: { searchParams: { page: string } }) {
  const page = +searchParams.page || 1;

  if (page < 1) redirect('/admin/products');

  const pageSize = Number(process.env.PAGE_SIZE) || 25;
  const productos = getProducts(page, pageSize);
  const totalProducts = productsCount();
  const [products, cuentaProductos] = await Promise.all([productos, totalProducts]);
  const totalPages = Math.ceil(cuentaProductos / pageSize);
  if (page > totalPages || page < 1) redirect('/admin/products');

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex flex-col gap-5 lg:gap-3 lg:flex-row justify-center items-center lg:max-w-3xl">

        <LinkAmber texto='Crear Producto' enlace='/admin/products/new' />
        <ProductSearchForm />
      </div>
      <ProductTable
        products={products}
      />
      <ProductsPaginator
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
