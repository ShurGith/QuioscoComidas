import LinkAmber from "@/components/LinkAmber";
import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPaginator from "@/components/products/ProductsPaginator";
import ProductTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { redirect } from "next/navigation";
// NUEVO: Importamos el nuevo componente de filtro
import AvailabilityFilter from "@/components/products/AvailabilityFilter";

// TIPO PARA EL FILTRO
type AvailabilityStatus = 'true' | 'false' | 'all';

// MODIFICADO: Ahora acepta un estado de disponibilidad
async function productsCount(available?: AvailabilityStatus) {
  // Construimos la cláusula 'where' dinámicamente
  const where = available && available !== 'all' ? { available: available === 'true' } : {};

  return await prisma.product.count({ where });
}
// MODIFICADO: Ahora acepta un estado de disponibilidad
async function getProducts(page: number, pageSize: number, available?: AvailabilityStatus) {
  const skip = (page - 1) * pageSize;
  // Construimos la cláusula 'where' dinámicamente
  const where = available && available !== 'all' ? { available: available === 'true' } : {};

  return await prisma.product.findMany({
    where, // Aplicamos el filtro
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  });
}


export type ProductsCount = Awaited<ReturnType<typeof productsCount>>;
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({ searchParams }: {
  searchParams: { page?: string, available?: AvailabilityStatus }
}) {
  //const { page: pageParam } = await searchParams
  const page = Number(searchParams.page) || 1;
  // Leemos el nuevo parámetro del filtro
  const available = searchParams.available;

  if (page < 1) redirect('/admin/products');

  const pageSize = Number(process.env.PAGE_SIZE) || 25;

  // Pasamos el filtro a las funciones de obtención de datos
  const productosPromise = getProducts(page, pageSize, available);
  const totalProductsPromise = productsCount(available);

  const [products, cuentaProductos] = await Promise.all([
    productosPromise,
    totalProductsPromise,
  ]);

  //const productos = getProducts(page, pageSize);
  //const totalProducts = productsCount();

  //const [products, cuentaProductos] = await Promise.all([productos, totalProducts]);
  const totalPages = Math.ceil(cuentaProductos / pageSize);
  if (page > totalPages || page < 1) redirect('/admin/products');

  if (page > totalPages && cuentaProductos > 0) redirect(`/admin/products?page=1${available ? `&available=${available}` : ''}`);


  return (
    <>
      <Heading>Administrar Productos</Heading>
      <div className="flex items-center mb-4 gap-x-4">

        <p>{cuentaProductos} productos encontrados</p>
        <LinkAmber texto='Crear Producto' enlace='/admin/products/new' />
      </div>
      <div className="grid grid-cols-4 gap-8 w-full  justify-around items-center">
        <ProductSearchForm />   <AvailabilityFilter />

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
