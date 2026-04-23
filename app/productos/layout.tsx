// ❗ ESTE ES EL CAMBIO: nuevo layout SOLO para /productos

import ProductNav from "@/components/ProductNav";

export default function ProductosLayout({ children }) {
  return (
    <>
      {/* 🔵 CAMBIO: navbar específico de productos */}
      <ProductNav />

      {/* 🔵 CAMBIO: espacio para que no lo tape el navbar fijo */}
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}