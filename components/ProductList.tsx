"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Link from "next/link";

// 🔥 1. Tipos de TypeScript para evitar errores en rojo
interface Product {
  id: number;
  category: string;
  name: string;
  price: string;
}

interface ProductListProps {
  selectedFilters: string[];
  sortBy: string;      // Nuevo estado que viene de ProductosPage
  searchTerm: string;  // Nuevo estado que viene de ProductosPage
}

function ProductList({ selectedFilters = [], sortBy = "destacados", searchTerm = "" }: ProductListProps) {
  // 🔥 estados
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

// 🔥 traer productos
  useEffect(() => {
    fetch("/api/product")
      .then((res) => {
        // Verificamos si la respuesta del servidor fue exitosa (código 200)
        if (!res.ok) {
          throw new Error("Error en la respuesta del servidor o ruta no encontrada");
        }
        return res.json();
      })
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al hacer fetch:", error);
        setLoading(false);
      });
  }, []);

  // 🔥 loading
  if (loading) {
    return <p className="text-center py-10 font-medium text-gray-500">Cargando productos...</p>;
  }

  // 🔥 LÓGICA DE FILTRADO Y BÚSQUEDA
  let processedProducts = [...products];

  // 1. Filtrar por categorías
  if (selectedFilters.length > 0) {
    processedProducts = processedProducts.filter((p) =>
      selectedFilters.includes(p.category)
    );
  }

  // 2. Filtrar por búsqueda de texto
  if (searchTerm && searchTerm.trim() !== "") {
    processedProducts = processedProducts.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 🔥 LÓGICA DE ORDENAMIENTO
  // Función auxiliar para convertir "$25.000" en el número 25000
  const parsePriceToNumber = (priceString: string) => {
    return parseInt(priceString.replace(/[^0-9]/g, ""), 10);
  };

  processedProducts.sort((a, b) => {
    switch (sortBy) {
      case "a-z":
        return a.name.localeCompare(b.name);
      case "z-a":
        return b.name.localeCompare(a.name);
      case "precio-asc":
        return parsePriceToNumber(a.price) - parsePriceToNumber(b.price);
      case "precio-desc":
        return parsePriceToNumber(b.price) - parsePriceToNumber(a.price);
      default:
        // Si es "destacados" o "mas-vendidos" (y no tienes esa info en DB), se mantiene el orden normal
        return 0; 
    }
  });

  // Si después de filtrar no queda nada, mostramos un aviso amigable
  if (processedProducts.length === 0) {
    return (
      <div className="w-full text-center py-20 text-gray-500">
        <h3 className="text-xl font-bold mb-2">No se encontraron productos</h3>
        <p>Intenta cambiar los filtros o el término de búsqueda.</p>
      </div>
    );
  }

  // 🔥 render
  return (
    <section className="w-full mx-auto pb-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {processedProducts.map((p) => (
          <Link href={`/productos/${p.id}`} key={p.id}>
            <ProductCard 
              id={p.id}
              name={p.name} 
              price={p.price} 
              category={p.category} 
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ProductList;