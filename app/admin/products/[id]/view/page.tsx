
import GoBackButton from "@/components/GoBackButton";
import AvailabilityToggle from "@/components/products/AvailabilityToggle";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { formatCurrency, getImagePath } from "@/src/lib/utils/index";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    }
  })
  if (!product)
    notFound();
  console.log(product);
  return product;
}

export default async function ViewProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const product = await getProductById(+(await params).id)

  return (
    <>
      <Heading>Viendo  <span className="font-black underlinte">{product?.name}</span></Heading>
      <GoBackButton />
      <div className="flex flex-col mx-auto py-4 justify-between max-w-6xl w-full rounded-xl bg-gray-200 shadow-md">
        <div className="w-fit h-fit rounded-xl mx-auto bg-white p-6 ">
          <Image
            width={500}
            height={600}
            quality={50}
            className="rounded-xl mx-auto "
            src={getImagePath(product.image)}
            alt={`Imagen de ${product.name}`}
          />
        </div>
        <div className="min-h-[250px] px-24 flex flex-col items-center  justify-between p-6">
          <p className="text-gray-500">{product.description ?? 'Sin descripción'}</p>
          <div className="flex my-8 justify-center gap-24 w-full border-t border-gray-300 pt-6">
            <h5 className="text-gray-500 font-semibold flex flex-col items-center">Disponibilidad
              <AvailabilityToggle product={product} /></h5>
            <h5 className="text-gray-500 font-semibold flex flex-col items-center">Categoría
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="hover:text-blue-500 font-bold">
                {product.category.name}
              </Link>
            </h5>
            <h5 className="text-gray-500 font-semibold flex flex-col items-center">
              <span>Precio:</span>
              {formatCurrency(product.price)}
            </h5>
          </div>
        </div>
      </div>
    </>
  )
} 