"use client";

import Image from "next/image";
import { ShoppingBag } from 'lucide-react';
import { useState, useCallback } from "react";
import { useLenis } from "./SmoothScroll";
import { Menu, X } from "lucide-react";


function Navbar() {
    const [active, setActive] = useState("inicio");
    const [open, setOpen] = useState(false);
    const lenis = useLenis();

    const scrollTo = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setActive(id);

        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: -80, duration: 1.4 });
        } else {
            // Fallback si Lenis no está listo
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [lenis]);

    return (
        <div className="bg-white shadow-md">

            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">

                <div className="w-full mx-auto px-6 flex justify-between items-center h-16">
                    <button
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <X /> : <Menu />}
                    </button>

                {/* logo */}
                <a href="#inicio" onClick={(e) => scrollTo(e, "inicio")}>
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
                <ul className={`
                        flex flex-col md:flex-row gap-4
                        absolute md:static top-16 left-0 w-full md:w-auto
                        bg-white md:bg-transparent
                        p-4 md:p-0
                        shadow-md md:shadow-none
                        transition-all
                        ${open ? "block" : "hidden md:flex"}
                    `}>
                    <li><a
                        href="#inicio"
                        onClick={(e) => scrollTo(e, "inicio")}
                        className={`px-4 py-2 rounded-full ${active === "inicio"
                            ? "text-[var(--color-secondary)] bg-[var(--color-secondary-10)] transition-colors duration-300"
                            : "font-semibold text-[var(--color-fourth)] hover:bg-[var(--color-primary-10)] hover:text-[var(--color-primary)] transition-colors duration-300"
                            }`}>
                        Inicio
                    </a></li>
                    <li><a
                        href="#productos"
                        onClick={(e) => scrollTo(e, "productos")}
                        className={`px-4 py-2 rounded-full ${active === "productos"
                            ? "text-[var(--color-secondary)] bg-[var(--color-secondary-10)] transition-colors duration-300"
                            : "font-semibold text-[var(--color-fourth)] hover:bg-[var(--color-primary-10)] hover:text-[var(--color-primary)] transition-colors duration-300"
                            }`}>
                        Productos</a></li>
                    <li><a
                        href="#sobre-nosotros"
                        onClick={(e) => scrollTo(e, "sobre-nosotros")}
                        className={`px-4 py-2 rounded-full ${active === "sobre-nosotros"
                            ? "text-[var(--color-secondary)] bg-[var(--color-secondary-10)] transition-colors duration-300"
                            : "font-semibold text-[var(--color-fourth)] hover:bg-[var(--color-primary-10)] hover:text-[var(--color-primary)] transition-colors duration-300"
                            }`}>
                        Sobre nosotros</a></li>
                    <li><a
                        href="#contacto"
                        onClick={(e) => scrollTo(e, "contacto")}
                        className={`px-4 py-2 rounded-full ${active === "contacto"
                            ? "text-[var(--color-secondary)] bg-[var(--color-secondary-10)] transition-colors duration-300"
                            : "font-semibold text-[var(--color-fourth)] hover:bg-[var(--color-primary-10)] hover:text-[var(--color-primary)] transition-colors duration-300"
                            }`}>
                        Contacto</a></li>

                        
                </ul>
                <a href="#" className="bg-white text-[var(--color-third)] px-3 py-2 rounded-full border cursor-pointer shadow-lg hover:bg-[var(--color-third)] hover:text-white transition-colors duration-300">
                    <ShoppingBag />
                </a>

                </div>
            </nav>
        </div>
    )
}

export default Navbar