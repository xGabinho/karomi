"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { MoveLeft, ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { cart, totalItems } = useCart();
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    whatsapp: "",
  });

  const cartTotal = cart.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    return acc + (numericPrice * item.quantity);
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Crear mensaje de WhatsApp
    let message = `*¡Hola! Quiero confirmar mi pedido:*%0A%0A`;
    message += `*Datos del Cliente:*%0A`;
    message += `- Nombre: ${formData.nombre} ${formData.apellido}%0A`;
    message += `- Dirección: ${formData.direccion}%0A`;
    message += `- Teléfono: ${formData.whatsapp}%0A%0A`;
    message += `*Detalle de la Factura:*%0A`;
    
    cart.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.price})%0A`;
    });
    
    message += `%0A*TOTAL: $${cartTotal.toLocaleString("es-CO")} COP*`;

    // Redirigir a WhatsApp (usaremos un número genérico para el demo, el usuario lo puede cambiar)
    const phoneNumber = "573000000000"; // Número por defecto
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag size={64} className="text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tu bolsa está vacía</h1>
        <p className="text-gray-500 mb-8 max-w-md">Parece que aún no has agregado ningún producto a tu carrito. ¡Explora nuestra tienda y encuentra algo increíble!</p>
        <Link href="/productos" className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg">
          Explorar Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link href="/productos" className="inline-flex items-center text-gray-500 hover:text-[var(--color-primary)] mb-8 transition-colors">
          <MoveLeft className="mr-2 h-5 w-5" />
          Seguir comprando
        </Link>

        <h1 className="text-4xl font-bold text-gray-900 mb-10">Finalizar Compra</h1>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Columna Izquierda: Formulario de Envío */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Datos de Envío</h2>
              
              <form onSubmit={handleConfirmOrder} className="space-y-6" id="checkout-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      name="nombre" 
                      required
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                      placeholder="Ej. Juan"
                    />
                  </div>
                  <div>
                    <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                    <input 
                      type="text" 
                      id="apellido" 
                      name="apellido" 
                      required
                      value={formData.apellido}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                      placeholder="Ej. Pérez"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">Dirección de Entrega *</label>
                  <input 
                    type="text" 
                    id="direccion" 
                    name="direccion" 
                    required
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                    placeholder="Calle, Carrera, Barrio, Conjunto..."
                  />
                </div>

                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">Número de WhatsApp *</label>
                  <input 
                    type="tel" 
                    id="whatsapp" 
                    name="whatsapp" 
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                    placeholder="Ej. 3001234567"
                  />
                  <p className="text-xs text-gray-500 mt-2">Usaremos este número para coordinar el envío.</p>
                </div>
              </form>
            </div>
          </div>

          {/* Columna Derecha: Resumen de Compra (Factura) */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Resumen de la Orden</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item) => {
                  const itemTotal = parseInt(item.price.replace(/[^0-9]/g, ""), 10) * item.quantity;
                  return (
                    <div key={item.id} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm leading-snug">{item.name}</p>
                        <p className="text-gray-500 text-xs mt-1">Cant: {item.quantity}</p>
                      </div>
                      <div className="font-semibold text-gray-900 text-sm whitespace-nowrap">
                        ${itemTotal.toLocaleString("es-CO")}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${cartTotal.toLocaleString("es-CO")}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm">
                  <span>Envío</span>
                  <span className="text-green-600 font-medium">Por calcular</span>
                </div>
                
                <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-4">
                  <span className="text-lg font-bold text-gray-800">Total Final</span>
                  <span className="text-2xl font-bold text-[var(--color-secondary)]">
                    ${cartTotal.toLocaleString("es-CO")}
                  </span>
                </div>
              </div>

              <button 
                type="submit" 
                form="checkout-form"
                className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg mt-8 shadow-[0_10px_20px_-10px_var(--color-primary)] hover:scale-[1.02] hover:brightness-110 transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                Confirmar por WhatsApp
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center">
                 Pagarás de forma segura al coordinar con nuestro asesor.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
