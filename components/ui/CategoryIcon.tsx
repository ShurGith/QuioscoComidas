"use client"
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Category } from "@prisma/client";

type CategoryIconProps = {
  category: Category
}
export default function CategoryIcon({ category }: CategoryIconProps) {
  const params = useParams();


  return (
    <div className={`${params.category === category.slug ? 'bg-amber-500' : ''} flex items-center gap-4 w-full border-gray-200 p-3 border-t last-of-type:border-b`}>
      <Link href={`/order/${category.slug}`} className="text-lg font-bold flex items-center gap-2">
        <div className="h-16 w-16 relative">
          <Image
            fill
            src={`/icon_${category.slug}.svg`}
            alt="Imagen categoria"
          />
        </div>
        {category.name}
      </Link>
    </div>
  )
}
