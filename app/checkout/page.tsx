"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { MoveLeft, ShoppingBag, Copy, CheckCircle2, UploadCloud, Check, CreditCard } from "lucide-react";

export default function CheckoutPage() {
  const { cart, totalItems } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    direccion: "",
  });
  const [copied, setCopied] = useState("");
  const [fileName, setFileName] = useState("");

  const steps = [
    { id: 1, name: "Datos" },
    { id: 2, name: "Transferencia" },
    { id: 3, name: "Subir comprobante" },
    { id: 4, name: "Confirmación" },
  ];

  const cartTotal = cart.reduce((acc, item) => {
    const numericPrice = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
    return acc + (numericPrice * item.quantity);
  }, 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(""), 2000);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
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
          
          {/* Columna Izquierda: Flujo de Checkout */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
              
              {/* Stepper */}
              <div className="flex items-center justify-between mb-8 relative">
                <div className="absolute left-0 top-4 -z-10 w-full h-[2px] bg-gray-100">
                  <div className="h-full bg-[var(--color-primary)] transition-all duration-300" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}></div>
                </div>
                {steps.map((s) => (
                  <div key={s.id} className="flex flex-col items-center bg-white px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mb-2 shadow-sm transition-colors duration-300 ${step >= s.id ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {step > s.id ? <Check size={16} /> : s.id}
                    </div>
                    <span className={`text-xs text-center hidden sm:block transition-colors duration-300 ${step >= s.id ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Paso 1: Datos */}
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Datos del Cliente</h2>
                  <form onSubmit={handleConfirmOrder} className="space-y-6" id="checkout-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                        <input 
                          type="text" id="nombre" name="nombre" required value={formData.nombre} onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                          placeholder="Ej. Juan"
                        />
                      </div>
                      <div>
                        <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                        <input 
                          type="text" id="apellido" name="apellido" required value={formData.apellido} onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                          placeholder="Ej. Pérez"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="correo" className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico *</label>
                        <input 
                          type="email" id="correo" name="correo" required value={formData.correo} onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                          placeholder="Ej. juan@correo.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                        <input 
                          type="tel" id="telefono" name="telefono" required value={formData.telefono} onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                          placeholder="Ej. 3001234567"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">Dirección de Entrega *</label>
                      <input 
                        type="text" id="direccion" name="direccion" required value={formData.direccion} onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-shadow"
                        placeholder="Calle, Carrera, Barrio, Conjunto..."
                      />
                    </div>
                    
                    <button 
                      type="submit" 
                      className="w-full bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg mt-8 shadow-[0_10px_20px_-10px_var(--color-primary)] hover:scale-[1.02] hover:brightness-110 transition-all active:scale-95 flex justify-center items-center gap-2"
                    >
                      Continuar a Transferencia
                    </button>
                  </form>
                </div>
              )}

              {/* Paso 2: Transferencia */}
              {step === 2 && (
                <div className="space-y-6 text-center py-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-500 mb-4">
                    <CreditCard size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Realiza tu transferencia</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-8">
                    Por favor, realiza el pago utilizando uno de nuestros métodos disponibles a la derecha. 
                    Una vez realizada, procede al siguiente paso para subir tu comprobante.
                  </p>
                  
                  <button 
                    onClick={() => setStep(3)} 
                    className="w-full sm:w-auto px-8 bg-[var(--color-primary)] text-white py-4 rounded-xl font-bold text-lg shadow-[0_10px_20px_-10px_var(--color-primary)] hover:scale-[1.02] hover:brightness-110 transition-all active:scale-95"
                  >
                    Ya realicé la transferencia
                  </button>
                  <div className="mt-4">
                    <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-gray-700 underline">
                      Volver a modificar datos
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 3: Subir comprobante */}
              {step === 3 && (
                <div className="space-y-6 text-center py-6">
                  <h3 className="text-2xl font-bold text-gray-800">Sube tu comprobante</h3>
                  <p className="text-gray-500 max-w-md mx-auto mb-6">
                    Adjunta una imagen o PDF del recibo de tu transferencia para verificar el pago.
                  </p>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 hover:border-[var(--color-primary)] transition-colors cursor-pointer bg-gray-50 relative">
                    <input 
                      type="file" 
                      id="comprobante" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} 
                    />
                    <div className="flex flex-col items-center pointer-events-none">
                      <UploadCloud size={48} className={`mb-4 ${fileName ? 'text-[var(--color-primary)]' : 'text-gray-400'}`} />
                      <span className={`font-medium mb-1 ${fileName ? 'text-[var(--color-primary)]' : 'text-gray-600'}`}>
                        {fileName ? fileName : "Haz clic para seleccionar o arrastra tu archivo aquí"}
                      </span>
                      <span className="text-xs text-gray-400">JPG, PNG o PDF (Max. 5MB)</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button onClick={() => setStep(2)} className="px-6 py-4 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                      Atrás
                    </button>
                    <button 
                      onClick={() => setStep(4)} 
                      disabled={!fileName} 
                      className={`px-8 py-4 rounded-xl font-bold text-lg text-white transition-all ${!fileName ? 'bg-gray-300 cursor-not-allowed' : 'bg-[var(--color-primary)] shadow-[0_10px_20px_-10px_var(--color-primary)] hover:scale-[1.02] hover:brightness-110 active:scale-95'}`}
                    >
                      Enviar comprobante
                    </button>
                  </div>
                </div>
              )}

              {/* Paso 4: Confirmación */}
              {step === 4 && (
                <div className="py-6">
                  <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-6">
                      <CheckCircle2 size={40} />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido Recibido!</h3>
                    <p className="text-gray-500">Estamos verificando tu pago. Te notificaremos cuando el estado de tu pedido se actualice.</p>
                  </div>

                  <div className="max-w-md mx-auto bg-gray-50 rounded-2xl p-6 border border-gray-100">
                    <h4 className="font-bold text-gray-800 mb-6 text-center">Estado del pedido</h4>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                      {['Comprobante recibido', 'Pago verificado', 'Pedido procesado', 'Completado'].map((status, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${index === 0 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                            {index === 0 ? <Check size={14} /> : <div className="w-2 h-2 rounded-full bg-gray-400"></div>}
                          </div>
                          <div className={`w-[calc(100%-3rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border ${index === 0 ? 'border-green-200 bg-green-50' : 'border-gray-100 bg-white'}`}>
                            <div className={`font-semibold text-sm ${index === 0 ? 'text-green-700' : 'text-gray-500'}`}>{status}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center mt-10">
                    <Link href="/productos" className="text-[var(--color-primary)] font-semibold hover:underline">
                      Volver a la tienda
                    </Link>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Columna Derecha: Resumen de Compra y Métodos de Pago */}
          <div className="w-full lg:w-[400px]">
            <div className="lg:sticky lg:top-6 space-y-6 max-h-[calc(100vh-3rem)] overflow-y-auto pb-4 scrollbar-hide">
              
              {/* Contenedor del Resumen de la Orden */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 shrink-0">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Resumen de la Orden</h2>
                
                {/* Estado e Info */}
                <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-2 text-orange-700 font-semibold text-sm mb-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    Pendiente de verificación
                  </div>
                <p className="text-xs text-orange-600">Tiempo estimado de validación: 15 - 30 minutos</p>
              </div>
              
              {/* Productos */}
              <div className="space-y-4 mb-6 max-h-[30vh] overflow-y-auto pr-2">
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

              {/* Totales */}
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
              </div>

            {/* Métodos de Pago */}
            {step < 4 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 shrink-0">
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-4">Métodos de Pago</h2>
                
                {/* Tarjeta Bancolombia */}
                <div className="rounded-xl p-5 mb-4 relative overflow-hidden" style={{ backgroundColor: 'rgb(254, 217, 38)' }}>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">Bancolombia</h3>
                  <div className="space-y-1.5 text-sm text-gray-900">
                    <p><span className="font-bold">Titular:</span> Empresa S.A.S</p>
                    <p><span className="font-bold">Documento:</span> NIT 900.000.000-1</p>
                    <p><span className="font-bold">Ahorros:</span> 123456789</p>
                  </div>
                  <button 
                    onClick={() => handleCopy("123456789", "bancolombia")}
                    className="absolute top-4 right-4 bg-white/50 hover:bg-white/80 text-gray-900 p-2 rounded-lg transition-colors flex items-center justify-center w-8 h-8"
                    title="Copiar número de cuenta"
                  >
                    {copied === "bancolombia" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>

                {/* Tarjeta Nequi */}
                <div className="rounded-xl p-5 relative overflow-hidden text-white" style={{ backgroundColor: '#1c021f' }}>
                  <h3 className="font-bold text-lg mb-3">Nequi</h3>
                  <div className="space-y-1.5 text-sm text-gray-200">
                    <p><span className="font-bold">Titular:</span> Juan Pérez</p>
                    <p><span className="font-bold">Documento:</span> CC 1.234.567.890</p>
                    <p><span className="font-bold">Número:</span> 3001234567</p>
                  </div>
                  <button 
                    onClick={() => handleCopy("3001234567", "nequi")}
                    className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors flex items-center justify-center w-8 h-8"
                    title="Copiar número de Nequi"
                  >
                    {copied === "nequi" ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>
            )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
