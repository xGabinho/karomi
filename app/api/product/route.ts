// app/api/products/route.ts
import { NextResponse } from "next/server";
// Ajusta esta ruta dependiendo de dónde guardaste tu archivo product.ts
import { products } from "@/data/products"; 

export async function GET() {
  // NextResponse.json() convierte tu array de productos en un JSON válido
  return NextResponse.json(products);
}