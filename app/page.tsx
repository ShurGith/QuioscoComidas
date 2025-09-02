import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center  min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Image src="/logo.svg" alt="Logo" width={400} height={100} />
      <h1 className="text-5xl font-bold">My App de Restaurante</h1>
      <div className="flex gap-4">
        <Link href="/order"
          className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer">
          Camareros Mesas
        </Link>
        <Link href="/admin/orders"
          className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer">
          Administrar Cocina
        </Link>
      </div>
    </div>
  );
}
