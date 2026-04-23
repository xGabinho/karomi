"use client";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import { Tangerine } from "next/font/google";
import Image from "next/image";
import { SiGmail } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "../components/Footer";
import { MoveRight } from 'lucide-react';


const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-tangerine"
});

export default function Home() {
  return (
    <>
      {/* navbar */}
      <Navbar />


      {/* Hero */}
      <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--background)] ">

        {/* Fondo animado tipo blobs */}
        <div className="absolute w-[500px] h-[500px] bg-[var(--color-primary)] opacity-20 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2 animate-pulse"></div>

        <div className="absolute w-[350px] h-[350px] bg-[var(--color-third)] opacity-20 blur-3xl rounded-full bottom-0 right-10 animate-pulse"></div>

        <div className="absolute w-[250px] h-[250px] bg-[var(--color-secondary)] opacity-20 blur-3xl rounded-full bottom-20 left-10 animate-pulse"></div>

        {/* Contenido */}
        <div className="relative z-10 text-center max-w-3xl px-6">

          <h1 className="text-5xl md:text-6xl font-bold text-[var(--color-fourth)] leading-tight">
            Todo lo que necesitas, <br /> en un solo lugar
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Compra productos únicos con pago seguro, rápido y confiable desde cualquier lugar.
          </p>

          <div className="mt-8 flex justify-center gap-4">

            {/* Botón principal */}
            <a
              href="#productos"
              className="px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium hover:scale-105 transition-transform"
            >
              Ver productos
            </a>

          </div>

        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent to-[var(--background)]"></div>
      </section>


      {/* Productos */}
      <section id="productos" className="bg-[var(--background)] w-full ">
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="inline-flex items-center justify-center px-4 py-2 mb-10 rounded-full bg-[var(--color-secondary-10)] text-[var(--color-secondary)] text-xs font-medium mx-auto"> LO MÁS QUERIDO </h1>
          <h2 className="text-4xl font-bold text-[var(--color-fourth)] mb-8">
            Productos <span className="text-[var(--color-primary)] italic underline">Populares</span>
          </h2>
          <p className="text-gray-600 text-center mb-8">Una selección de los favoritos de nuestros clientes, <br /> con mucho amor en cada detalle.</p>

          <div className="flex items-center w-full max-w-md mx-auto my-10">

            {/* Línea izquierda */}
            <div className="flex-1 h-px bg-gray-300"></div>

            {/* Bolitas */}
            <div className="flex items-center gap-2 px-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary)]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-secondary)]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-third)]"></span>
            </div>

            {/* Línea derecha */}
            <div className="flex-1 h-px bg-gray-300"></div>

          </div>
          <ProductList />

          <a href="/productos" className="flex items-center justify-center px-6 py-3 rounded-full bg-[var(--color-primary)] text-white font-medium hover:scale-105 transition-transform">
            Ver más productos
            <MoveRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>

      {/* About */}

      <section id="sobre-nosotros" className="w-full  mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10 bg-[var(--background)]">
        <div className="flex w-max-7xl mx-auto">

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-[var(--color-fourth)]">
              Sobre <span className="text-[var(--color-primary)]"> KA</span><span className="text-[var(--color-secondary)]">RO</span><span className="text-[var(--color-third)]">MI</span>
            </h2>
            <p className="mt-4 text-gray-600">
              Vendemos productos seleccionados con un sistema de compra simple y seguro...
            </p>
          </div>

          <div className="flex-1">
            <Image
              src="/img/Karomi.svg"
              alt="Sobre nosotros"
              width={400}
              height={400}
              className="ml-8 float drop-shadow-xl animate-pulse"
            />
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="w-full mx-auto px-6 py-20 bg-[var(--background)] flex flex-col items-center">
        <h2 className="text-3xl font-bold">Contacto</h2>

        <p className="mt-2 text-gray-600">
          ¿Tienes dudas? Escríbenos y te respondemos rápido.
        </p>
        {/* cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 justify-center w-max-full mx-auto">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300">
            <a href="https://wa.me/3155382276" target="_blank" className="flex flex-col items-center justify-center text-gray-600 text-sm hover:text-blue-500 transition-colors">
              <FaWhatsapp className="text-green-500 text-3xl mb-5 mx-auto" />
              <h3 className="font-semibold">WhatsApp</h3>
              <p className="text-gray-600 text-sm mt-2">
                Atención rápida y personalizada
              </p>
              <p>+57 315 538 2276</p>
            </a>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 ">
            <a href="mailto:karomi@[EMAIL_ADDRESS]" target="_blank" className="flex items-center justify-center">
              <SiGmail className="text-red-500 text-3xl mb-5 mx-auto" />
            </a>
            <h3 className="font-semibold">Email</h3>
            <p className="text-gray-600 text-sm mt-2">
              karomi@gmail.com
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
            <h3 className="font-semibold">Horario</h3>
            <p className="text-gray-600 text-sm mt-2">
              Lun - Sáb / 9am - 7pm
            </p>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </>
  );
}
