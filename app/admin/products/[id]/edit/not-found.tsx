import Heading from "@/components/ui/Heading";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-[70%]  gap-y-8  pt-24 mt-8" >
      <Image src="/ui/cohete.webp" alt="imagen cohete" className='' width={256} height={89} />
      <Heading>Producto No Encontrado</Heading>
      <Link
        href='/admin/products'
        className="bg-amber-400 rounded-2xl hover:text-white  hover:bg-amber-500 transition duration-300 ease-in-out text-black px-10 py-3 text-xl text-center font-bold cursor-pointer w-full lg:w-auto"
      >
        Ir a Productos
      </Link>
    </div>
  )
}
