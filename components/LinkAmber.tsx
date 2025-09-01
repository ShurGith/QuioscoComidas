import Link from "next/link";

type LinkAmberProps = {
  texto: string,
  enlace: string;
};

export default function LinkAmber({ texto, enlace }: LinkAmberProps) {
  return (
    <Link
      href={enlace}
      className="min-w-fit bg-amber-400 px-10 py-3 w-full lg:w-auto text-xl text-center font-bold rounded-md hover:bg-amber-500 transition-colors"
    >
      {texto}</Link>

  )
}