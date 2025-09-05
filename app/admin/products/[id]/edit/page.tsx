
import GoBackButton from "@/components/GoBackButton";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";

async function getProductById(id: Product["id"]) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true
    }
  })
  if (!product)
    notFound();
  return product;
}

export default async function EditProductsPage({ params }: { params: Promise<{ id: string }> }) {
  const product = await getProductById(+(await params).id)
  return (
    <>
      <Heading>Editar el producto <span className="font-black underlinte">{product?.name}</span> </Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm product={product} />
      </EditProductForm>

    </>
  )
}