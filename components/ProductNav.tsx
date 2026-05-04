"use client";

import { ShoppingBag, X, Trash2 } from "lucide-react"; // Agregué X y Trash2 para el diseño del carrito
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../context/CartContext"; // 1. Importamos el contexto

export default function ProductosNavbar() {
  const [open, setOpen] = useState(false);
  
  // 2. Traemos los datos y funciones desde el "Cerebro" del carrito
  const { cart, totalItems, removeFromCart, updateQuantity } = useCart();

  // 3. Función auxiliar para sumar el total en dinero
  const cartTotal = cart.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    return acc + (numericPrice * item.quantity);
  }, 0);

  return (
    <>
      {/* --- NAVBAR PRINCIPAL --- */}
      {/* --- NAVBAR PRINCIPAL --- */}
<nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
  <div className="w-full max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
    
    {/* 1. Logo (Izquierda) */}
    <a href="/">
      <Image
        src="/img/KAROMI.svg"
        alt="Logo"
        width={120}
        height={40}
        className="w-auto h-10 hover:scale-105 transition-transform duration-300 cursor-pointer"
      />
    </a>

    {/* 2. Botón de Inicio (Centro/Derecha - Separado) */}
    <div className="flex-1 flex justify-center"> {/* flex-1 empuja los lados */}
      <a
        href="/"
        className="font-semibold text-[var(--color-fourth)] hover:bg-[var(--color-primary-10)] hover:text-[var(--color-primary)] px-4 py-2 rounded-full transition-colors duration-300"
      >
        Inicio
      </a>
    </div>

    {/* 3. Botón del Carrito (Derecha) */}
    <div className="flex items-center">
      <button 
        onClick={() => setOpen(true)} 
        className="relative bg-white text-[var(--color-third)] px-3 py-2 rounded-full border cursor-pointer shadow-lg hover:bg-[var(--color-third)] hover:text-white transition-colors duration-300"
      >
        <ShoppingBag />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
    </div>

  </div>
</nav>

      {/* --- EL CARRITO LATERAL (DRAWER) --- */}

      {/* 5. Fondo oscuro (Overlay) que cierra el carrito si haces clic fuera */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity"
          onClick={() => setOpen(false)}
        />
      )}

      {/* 6. El panel deslizable */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {/* Cabecera del Carrito */}
        <div className="p-5 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-[var(--color-secondary)]">Tu Bolsa</h2>
          <button 
            onClick={() => setOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-red-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* 7. Lista de Productos */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <ShoppingBag size={48} className="mb-4 opacity-50" />
              <p>Tu bolsa está vacía</p>
            </div>
          ) : (
            cart.map((item) => (
            <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
              
              {/* Imagen (puedes poner item.image si la tienes) */}
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-sm leading-tight text-gray-800">
                  {item.name}
                </h4>
                <p className="text-[var(--color-primary)] font-bold text-sm mt-1">
                  {item.price}
                </p>
                
                {/* Controles de cantidad que pasaste */}
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
                <Trash2 size={18} /> {/* ⚠️ Ojo: quité las comillas de {18} */}
              </button>
            </div>
          ))
        )}
      </div>

        {/* 8. Footer (Total y Pago) */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600 font-medium">Total:</span>
              <span className="text-xl font-bold text-[var(--color-secondary)]">
                ${cartTotal.toLocaleString("es-CO")}
              </span>
            </div>
            
            <button className="w-full bg-[var(--color-primary)] text-white py-3 rounded-xl font-semibold shadow-lg hover:brightness-110 transition-all">
              Proceder al pago
            </button>
          </div>
        )}

      </div>
    </>
  );
}