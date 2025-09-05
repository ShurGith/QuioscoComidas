import LinkAmber from "@/components/LinkAmber";
import AvailabilityFilter from "@/components/products/AvailabilityFilter";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPaginator from "@/components/products/ProductsPaginator";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";

type AvailabilityStatus = 'true' | 'false' | 'all';
async function productsCount(available?: AvailabilityStatus) {
  const where = available && available !== 'all' ? { available: available === 'true' } : {};
  return await prisma.product.count({ where });
}
async function getProducts(page: number, pageSize: number, available?: AvailabilityStatus) {
  const skip = (page - 1) * pageSize;
  const where = available && available !== 'all' ? { available: available === 'true' } : {};

  return await prisma.product.findMany({
    where,
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
}

export type ProductsCount = Awaited<ReturnType<typeof productsCount>>;
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({
  searchParams,
}: { // Definimos el tipo directamente aquí
  searchParams?: {
    page?: string;
    available?: AvailabilityStatus;
  };
}) {
  const pageParam = searchParams?.page;
  const availableParam = searchParams?.available;

  const page = Number(pageParam ?? "1");
  const available = (availableParam ?? "all") as AvailabilityStatus;

  if (isNaN(page) || page < 1) redirect('/admin/products');

  const pageSize = Number(process.env.PAGE_SIZE) || 25;
  const productosPromise = getProducts(page, pageSize, available);
  const totalProductsPromise = productsCount(available);
  const [products, cuentaProductos] = await Promise.all([
    productosPromise,
    totalProductsPromise,
  ]);

  const totalPages = Math.ceil(cuentaProductos / pageSize);

  if (page > totalPages && totalPages > 0) {
    redirect(`/admin/products?page=${totalPages}${available && available !== 'all' ? `&available=${available}` : ''}`);
  }
  if (page < 1) {
    redirect(`/admin/products?page=1${available && available !== 'all' ? `&available=${available}` : ''}`);
  }

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex items-center mb-4 gap-x-4">
        <p>{cuentaProductos} productos encontrados</p>
        <LinkAmber texto='Crear Producto' enlace='/admin/products/new' />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-8 w-full justify-around items-center">
        <ProductSearchForm />
        <AvailabilityFilter />
      </div>
      <ProductTable
        products={products} />
      <ProductsPaginator
        page={page}
        totalPages={totalPages} />
    </>
  )
}