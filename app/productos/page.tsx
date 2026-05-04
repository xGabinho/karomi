"use client"

import ProductList from "@/components/ProductList";
import ProductNav from "@/components/ProductNav";
import ProductFilters from "@/components/FiltersBar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function ProductosPage() {
  // 1. Estados separados para filtros, orden y búsqueda
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("destacados");
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <>
      <ProductNav />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">
          Todos los <span className="text-[var(--color-primary)] italic underline">productos</span>
        </h1>

        {/* Buscador conectado al estado */}
        <div className="flex gap-4 mb-6">
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-[var(--color-primary)] rounded-xl p-2 w-full outline-[var(--color-primary)]"
          />
        </div>

        <div className="flex-1 h-px bg-gray-300 w-full mb-6"></div>

        {/* Contenedor de Categorías y Ordenar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          
          {/* Sección Categorías */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold whitespace-nowrap">Categorías:</h2>
            <ProductFilters selected={selectedFilters} setSelected={setSelectedFilters} />
          </div>

          {/* Sección Ordenar */}
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Ordenar:</h2>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-full border border-gray-300 bg-white text-sm outline-[var(--color-primary)] cursor-pointer text-gray-700 shadow-sm transition-all hover:border-[var(--color-primary)]"
            >
              <option value="destacados">Destacados</option>
              <option value="mas-vendidos">Más Vendidos</option>
              <option value="a-z">Nombre: A - Z</option>
              <option value="z-a">Nombre: Z - A</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
            </select>
          </div>

        </div>

        {/* Separador decorativo con bolitas */}
        <div className="flex items-center w-full max-w-md mx-auto my-10">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="flex items-center gap-2 px-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)]"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-third)]"></span>
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Pasamos TODOS los estados al ProductList para que haga el trabajo */}
        <ProductList 
          selectedFilters={selectedFilters} 
          sortBy={sortBy} 
          searchTerm={searchTerm} 
        />
        
      </main>

      <Footer />
    </>
  );
}