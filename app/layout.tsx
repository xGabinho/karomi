import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Mulish, Pixelify_Sans, Tangerine } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "../components/SmoothScroll";


const mulish = Mulish({ subsets: ["latin"] });
const pixelify = Pixelify_Sans({ subsets: ["latin"] });
const tangerine = Tangerine({
  subsets: ["latin"],
  weight: ["400", "700"]
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Karomi",
  description: "Artesanias de Colombia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[var(--foreground)]">
        
        {/* 🔵 AQUÍ ENVOLVEMOS TODO CON EL CARRITO */}
        <CartProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </CartProvider>

      </body>
    </html>
  );
}