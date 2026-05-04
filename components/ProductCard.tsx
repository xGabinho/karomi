"use client";

// 1. IMPORTANTE: Importamos el hook de nuestro carrito
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  id?: string | number; 
  name: string;
  price: number | string;
  category: string;
}

// 2. Extraemos el 'id' de las props (es vital para que el carrito sepa qué producto es)
export default function ProductCard({ id = 0, name, price, category }: ProductCardProps) {
  
  // 3. Traemos la función para guardar productos
  const { addToCart } = useCart();

  // 4. Creamos la acción del botón
  const handleAddToCart = () => {
    // Le enviamos los datos al contexto. Convertimos el ID a número y el precio a string por si acaso.
    addToCart({ 
      id: Number(id), 
      name, 
      price: String(price), 
      category 
    });
  };

  return (
    <div className="relative bg-white p-4 rounded-xl shadow-md overflow-hidden hover:scale-105 transition-transform duration-300">

      {/* Badge */}
      {category === "Popular" && (
        <span className="absolute top-3 left-3 bg-[var(--color-third-10)] text-[var(--color-third)] font-semibold text-xs px-3 py-1 rounded-full shadow">
          Popular
        </span>
      )}

      {/* Imagen */}
      <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
        <span className="text-gray-400 text-sm">Imagen</span>
      </div>

      {/* Info */}
      <h5 className="text-[var(--color-secondary)] mt-3 text-sm mb-1 font-semibold">
        {category}
      </h5>

      <h3 className="font-semibold">{name}</h3>

      <p className="text-gray-600">
        {price} <span className="text-xs text-gray-400">COP</span>
      </p>

      {/* 5. CONECTAMOS EL BOTÓN AL CLIC */}
      <button 
        onClick={handleAddToCart}
        className="mt-3 w-full bg-white border border-[var(--color-primary)] text-[var(--color-primary)] py-2 rounded-full cursor-pointer shadow hover:bg-[var(--color-primary)] hover:text-white transition-colors"
      >
        Agregar a la bolsa
      </button>
    </div>
  );
}