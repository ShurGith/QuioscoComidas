
import GoBackButton from "@/components/GoBackButton";
import ProductCompleteCard from "@/components/products/ProductCompleteCard";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
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
      <Heading>Editar el producto {product?.name} </Heading>
      <GoBackButton />
      <ProductCompleteCard product={product} />

    </>
  )
} 