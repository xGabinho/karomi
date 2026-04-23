"use client";

import Image from "next/image";
import { SiGmail } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white shadow-2xl rounded-t-4xl mt-20">

  <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Marca */}
    <div>
      <Image
        src="/img/Karomi.svg"
        alt="Karomi"
        width={100}
        height={100}
      />
      <p className="text-gray-500 text-sm mt-3">
        Tu tienda confiable de productos seleccionados. Compra fácil, rápido y seguro.
      </p>
    </div>

    {/* Contacto rápido */}
    <div>
      <h4 className="font-semibold text-[var(--color-fourth)] mb-3">
        Contacto
      </h4>
      <div className="flex items-center gap-2">
        <a href="https://wa.me/3155382276" target="_blank" className="flex items-center gap-2 text-gray-600 text-sm hover:text-blue-500">
        <FaWhatsapp className="text-green-500 text-xl"/>
         +57 315 538 2276
        </a>
      </div>
      <div className="flex items-center gap-2">
        <SiGmail className="text-red-500 text-xl"/> 
        <p className="text-gray-600 text-sm">Email: karomi@gmail.com</p>
      </div>
      <p className="text-gray-600 text-sm mt-2">
        Atención: Lun - Sáb / 9am - 7pm
      </p>
    </div>

    {/* compra segura */}
 <div>
  <h4 className="font-semibold">Compra segura</h4>
  <p className="text-sm text-gray-600 mt-2">
    ✔ Pagos por transferencia verificada<br/>
    ✔ Atención personalizada<br/>
    ✔ Respuesta rápida
  </p>
</div>

  </div>

  {/* Bottom bar */}
  <div className="border-[0.5px] py-4 text-center text-xs text-gray-400">
    © {new Date().getFullYear()} KAROMI. Todos los derechos reservados.
  </div>

</footer>
    );
}