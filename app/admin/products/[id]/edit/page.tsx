
import GoBackButton from "@/components/GoBackButton";
import EditProductForm from "@/components/products/EditProductForm";
import ProductForm from "@/components/products/ProductForm";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import { notFound } from "next/navigation";

async function getProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  })
  if (!product)
    notFound();
  return product;
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(Number(params.id))


  return (
    <>
      <Heading>Editar el producto {product?.name} </Heading>
      <GoBackButton />
      <EditProductForm>
        <ProductForm
          product={product}
        />
      </EditProductForm>

    </>
  )
}