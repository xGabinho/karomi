export async function GET() {
  return Response.json([
    {
      id: 1,
      name: "Camiseta básica",
      price: 25000,
      category: "Ropa"
    },
    {
      id: 2,
      name: "Audífonos",
      price: 80000,
      category: "Tecnología"
    },
    {
      id: 3,
      name: "Vaso térmico",
      price: 30000,
      category: "Hogar"
    },
    {
      id: 4,
      name: "Mouse gamer",
      price: 120000,
      category: "Tecnología"
    }
  ]);
}