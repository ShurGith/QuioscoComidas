import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-5xl font-bold">My App de Restaurante</h1>
      <Link href="/order" className="bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 ease-in-out cursor-pointer">Comidas</Link>
    </div>
  );
}
