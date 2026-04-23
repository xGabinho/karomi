"use client"

import ProductList from "@/components/ProductList";
import ProductNav from "@/components/ProductNav";
import ProductFilters from "@/components/FiltersBar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ProductosPage() {
  const [selectedFilters, setSelectedFilters] = useState([]);

  return (
    <>
    <ProductNav />

    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-bold mb-6">
          Todos los <span className="text-[var(--color-primary)] italic underline">productos</span>
      </h1>

      <div className="flex gap-4 mb-4">
        <input type="text" placeholder="Buscar" className="border border-[var(--color-primary)] rounded-xl p-2 w-full outline-[var(--color-primary)]"/>
        <button className="bg-white text-[var(--color-primary)] px-3 py-2 rounded-full border cursor-pointer shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors duration-300">
          Buscar
        </button>
      </div>
      <div className="flex-1 h-px bg-gray-300"></div>
      <div className="flex items-center justify-center mt-5 mb-5">

          <h2 className="text-xl font-bold mb-2 mr-5">Categorias: </h2>
        <div>
          <ProductFilters selected={selectedFilters} setSelected={setSelectedFilters} />
        </div>
      </div>
      <div className="flex-1 h-px bg-gray-300"></div>
      <div className="flex gap-4 mb-4 mt-2 w-full">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row gap-2 justify-center">
          </div>
          <div className="flex flex-col gap-2 items-center">
            <h2 className="text-xl font-bold mb-2">Ordenar</h2>
            <ProductFilters selected={selectedFilters} setSelected={setSelectedFilters} />
          </div>
        </div>
      </div>
      <div className="flex items-center w-full max-w-md mx-auto my-10">

            {/* Línea izquierda */}
            <div className="flex-1 h-px bg-gray-300"></div>

            {/* Bolitas */}
            <div className="flex items-center gap-2 px-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-third)]"></span>
            </div>

            {/* Línea derecha */}
            <div className="flex-1 h-px bg-gray-300"></div>

          </div>

      <ProductList selectedFilters={selectedFilters} />

    </div>

    <Footer />
    </>
  );
}