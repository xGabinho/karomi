"use client";

import { useEffect, useState, use } from "react";
import { useCart } from "@/context/CartContext";

interface Product {
  id: number;
  category: string;
  name: string;
  price: string;
  description?: string;
}

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Type according to the Product interface
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch all products since there is no /api/product/[id] endpoint yet
    fetch(`/api/product`)
      .then(res => res.json())
      .then((data: Product[]) => {
        const found = data.find((p) => p.id.toString() === id);
        setProduct(found || null);
      });
  }, [id]);

  if (!product) {
    return <p className="text-center py-10">Cargando producto...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">

      {/* 🖼 GALERÍA */}
      <div className="bg-gray-100 h-80 rounded-xl flex items-center justify-center">
        <span>Imagen</span>
      </div>

      {/* 📄 INFO */}
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-gray-600 mb-4">
          {product.price} COP
        </p>

        <p className="text-gray-500 mb-6">
          {product.description}
        </p>

        <button 
          onClick={() => addToCart({
            id: Number(product.id),
            name: product.name,
            price: String(product.price),
            category: product.category
          })}
          className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-full hover:scale-105 transition-transform"
        >
          Agregar al carrito
        </button>
      </div>

    </div>
  );
}