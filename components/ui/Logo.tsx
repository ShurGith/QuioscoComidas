import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <div className="flex justify-center mt-5">
      <div className="relative w-40 h-40">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={160}
            height={160}
            priority
          />
        </Link>
      </div>
    </div>
  )
}
