"use client"
type ButtonAmberProps = {
  texto: string;
  action: () => void;
}

export default function ButtonAmber({ texto, action }: ButtonAmberProps) {
  return (
    <button
      onClick={action}
      className="bg-amber-400 w-full lg:w-auto text-xl text-center font-bold cursor-pointer px-10 py-3 rounded-md hover:bg-amber-600 hover:text-white not-first-of-type: transition-colors duration-300 ease-in-out"
    >
      {texto}
    </button>

  )
}