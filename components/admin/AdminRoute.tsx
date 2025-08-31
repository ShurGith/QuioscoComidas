"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

type AdminRouteProps = {
  link: {
    url: string;
    text: string;
    blank: boolean;
  }
}
export default function AdminRoute({ link }: AdminRouteProps) {
  const pathName = usePathname();
  const isActive = pathName === link.url;
  return (
    <>
      <Link
        className={`${isActive && 'bg-amber-400'} ${!isActive && 'hover:bg-gray-100'}  block w-full font-bold text-lg border-t border-gray-300 p-3 last-of-type:border-b`}
        href={link.url}
        target={link.blank ? '_blank' : ''}>{link.text}
      </Link>

    </>
  )
}
