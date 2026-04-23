"use client";

// 🔵 CAMBIO: navbar SOLO con Inicio + Carrito
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductosNavbar() {
    const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">

        <div className="w-full mx-auto px-6 flex justify-between items-center h-16">

            {/* logo */}
                <a href="/">
                    <Image
                        src="/img/KAROMI.svg"
                        alt="Logo"
                        width={120}
                        height={40}
                        loading="eager"
                        className="w-auto h-10 hover:scale-105 transition-transform duration-300 cursor-pointer"
                    />
                </a>
                {/* menu */}
                    <a
                        href="/"
                        className="
                             font-semibold text-[var(--color-fourth)] hover:bg-[var(--color-primary-10)] hover:text-[var(--color-primary)] px-4 py-2  rounded-full transition-colors duration-300">
                        Inicio
                    </a>

                        
                <a href="#" className="bg-white text-[var(--color-third)] px-3 py-2 rounded-full border cursor-pointer shadow-lg hover:bg-[var(--color-third)] hover:text-white transition-colors duration-300">
                    <ShoppingBag />
                </a>

                </div>
    </nav>
    );
}