import Image from "next/image";

import AddProductButton from "@/components/products/AddProductButton";
//import { Product } from "@prisma/client";

import type { Product } from "@prisma/client";
import { formatCurrency, getImagePath } from "../../src/lib/utils/index";

type ProductCardProps = {
  product: Product

}

export default function ProductCard({ product }: ProductCardProps) {
  const imagePath = getImagePath(product.image);
  return (
    <div className="flex flex-col justify-between  border min-h-[635px] border-gray-500 rounded-xl hover:shadow-md transition duration-150 bg-white ">
      <Image
        width={400}
        height={500}
        quality={50}
        className="rounded-t-xl  border-gray-500"
        src={imagePath}
        alt={`Imagen de ${product.name}`}
      />
      <div className="h-[250px] flex flex-col items-center  justify-between p-6">
        <h3 className="text-lg font-bold text-gray-500 text-center">{product.name}</h3>
        <p className="mt-5 text-sm font-black text-amber-500">
          {formatCurrency(product.price)}
        </p>
        <AddProductButton
          product={product}
        />
      </div>
    </div>
  );
}