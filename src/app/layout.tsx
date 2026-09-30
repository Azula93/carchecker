import type { Metadata, Viewport } from "next";
import { Manrope, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PwaRegister } from "../components/pwa/PwaRegister";
import { StructuredData } from "./structured-data";
import Script from "next/script";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#123B5D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "EscaneApp | Escanea antes de comprar — Evaluación Inteligente de Vehículos",
  description:
    "Revisa un carro usado en Colombia antes de comprarlo. Evalúa antecedentes oficiales, checklist y costos ocultos antes de pagar un peritaje profesional.",
  alternates: {
    canonical: "https://escaneapp.com",
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EscaneApp",
  },

  openGraph: {
    title: "EscaneApp | Escanea antes de comprar — Evaluación Inteligente de Vehículos",
    description:
      "Revisa un carro usado en Colombia antes de comprarlo. Evalúa antecedentes oficiales, checklist y costos ocultos antes de pagar un peritaje profesional.",
    url: "https://escaneapp.com",
    siteName: "EscaneApp",
    locale: "es_CO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "EscaneApp | Escanea antes de comprar",
    description:
      "Revisa un carro usado en Colombia antes de comprarlo. Evalúa antecedentes oficiales, checklist y costos ocultos antes de pagar un peritaje profesional.",
  },

  verification: {
    google: "jAkT-r4Ebm19Fa3s1miIE-YzD96-DRIrzXY5cMkVe7Q",

    other: {
  'google-adsense-account': 'ca-pub-4990996804813930',
},
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
        <head>
      <Script
        id="google-adsense"
        async
        strategy="beforeInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4990996804813930"
        crossOrigin="anonymous"
      />
    </head>
      <body className="min-h-full flex flex-col bg-[#F7F9FA] text-[#17212B] font-sans selection:bg-[#8BCF3F]/30 selection:text-[#123B5D]">
        <PwaRegister />
        <StructuredData />
        <Header />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
