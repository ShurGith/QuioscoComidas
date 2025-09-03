import AvailabilityToggle from "@/components/products/AvailabilityToggle";
import { ProductCardComplete } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency, getImagePath } from "../../src/lib/utils/index";


type ProductCardProps = {
  product: ProductCardComplete;
}

export default async function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col mx-auto mt-4 py-8 justify-between max-w-3xl w-full rounded-xl bg-gray-200 shadow-md hover:bg-white transition duration-700 ">
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
      <div className="h-[250px] flex flex-col items-center  justify-between p-6">
        <h3 className="text-lg font-bold text-gray-500 text-center">{product.name}</h3>
        <p className="text-gray-600">Descripción: {product.description ?? 'Sin descripción'}</p>
        <AvailabilityToggle product={product} />
        <Link
          href={`/admin/products/${product.id}/edit`}
          className="hover:text-blue-500">
          {product.category ? `Categoria:${product.category.name}` : ""}
        </Link>
        <p className="mt-5 text-sm font-black text-amber-500">
          {formatCurrency(product.price)}
        </p>

      </div>
    </div>
  );
}