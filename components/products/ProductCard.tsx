import Image from "next/image";

import AddProductButton from "@/components/products/AddProductButton";
import { Product } from "@prisma/client";

import { formatCurrency } from "../../src/lib/utils/index";

type ProductCardProps = {
  product: Product

}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-200 rounded-xl hover:shadow-md transition duration-150 bg-white">
      <Image
        width={400}
        height={500}
        quality={50}
        className="rounded-t-xl"
        src={`/products/${product.image}.jpg`} alt={`Imagen de ${product.name}`}
      />
      <div className="p-5">
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