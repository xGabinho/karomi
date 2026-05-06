"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Menu, X, Trash2 } from 'lucide-react';
import { useState, useCallback } from "react";
import { useLenis } from "./SmoothScroll";
import { useCart } from "../context/CartContext";


function Navbar() {
    const [active, setActive] = useState("inicio");
    const [open, setOpen] = useState(false);
    const [cartOpen, setCartOpen] = useState(false);
    const lenis = useLenis();

    const { cart, totalItems, removeFromCart, updateQuantity } = useCart();

    const cartTotal = cart.reduce((acc, item) => {
        const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
        return acc + (numericPrice * item.quantity);
    }, 0);

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

                <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
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
                <div className="flex items-center">
                    <button 
                        onClick={() => setCartOpen(true)} 
                        className="relative bg-white text-[var(--color-third)] px-3 py-2 rounded-full border cursor-pointer shadow-lg hover:bg-[var(--color-third)] hover:text-white transition-colors duration-300"
                    >
                        <ShoppingBag />
                        {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-[#FF7FB5] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {totalItems}
                        </span>
                        )}
                    </button>
                </div>

                </div>
            </nav>

            {/* --- EL CARRITO LATERAL (DRAWER) --- */}

            {/* Fondo oscuro (Overlay) que cierra el carrito si haces clic fuera */}
            {cartOpen && (
                <div 
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
                onClick={() => setCartOpen(false)}
                />
            )}

            {/* El panel deslizable */}
            <div 
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
                ${cartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                
                {/* Cabecera del Carrito */}
                <div className="p-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[var(--color-secondary)]">Tu Bolsa</h2>
                <button 
                    onClick={() => setCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
                >
                    <X size={20} />
                </button>
                </div>

                {/* Lista de Productos */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <ShoppingBag size={48} className="mb-4 opacity-50" />
                    <p>Tu bolsa está vacía</p>
                    </div>
                ) : (
                    cart.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                    
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                    
                    <div className="flex-1">
                        <h4 className="font-semibold text-sm leading-tight text-gray-800">
                        {item.name}
                        </h4>
                        <p className="text-[var(--color-primary)] font-bold text-sm mt-1">
                        {item.price}
                        </p>
                        
                        <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden shadow-sm">
                            <button
                            onClick={() => updateQuantity(item.id, "decrease")}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                            -
                            </button>
                            <span className="px-3 text-sm font-semibold border-x border-gray-200">
                            {item.quantity}
                            </span>
                            <button
                            onClick={() => updateQuantity(item.id, "increase")}
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                            +
                            </button>
                        </div>
                        </div>
                    </div>

                    <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 p-2 transition-colors"
                    >
                        <Trash2 size={18} />
                    </button>
                    </div>
                ))
                )}
            </div>

                {/* Footer (Total y Pago) */}
                {cart.length > 0 && (
                <div className="p-5 border-t border-gray-100 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600 font-medium">Total:</span>
                    <span className="text-xl font-bold text-[var(--color-secondary)]">
                        ${cartTotal.toLocaleString("es-CO")}
                    </span>
                    </div>
                    
                    <Link 
                        href="/checkout"
                        onClick={() => setCartOpen(false)}
                        className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold shadow-lg hover:brightness-110 transition-all block text-center"
                    >
                    Proceder al pago
                    </Link>
                </div>
                )}

            </div>
        </div>
    )
}

export default Navbar