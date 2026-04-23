"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

function ProductList({ selectedFilters }) {

  // 🔥 estados
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 traer productos
  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  // 🔥 loading
  if (loading) {
    return <p className="text-center py-10">Cargando productos...</p>;
  }

  // 🔥 filtro
  const filteredProducts =
    selectedFilters.length === 0
      ? products
      : products.filter((p) =>
          selectedFilters.includes(p.category)
        );

  // 🔥 render
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} {...p} />
        ))}
      </div>
    </section>
  );
}

export default ProductList;