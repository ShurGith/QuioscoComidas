"use client"
import { useEffect } from "react";

export default function Sidebar() {
  useEffect(() => {
    console.log("DESDE EL CLIENTE");
  }, [])
  console.log("desde el Sidebar");
  return (
    <div>Sidebar</div>
  )
}
