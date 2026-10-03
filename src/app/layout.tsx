import type { Metadata, Viewport } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
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
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: "#123B5D",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.escaneapp.com"),

  title: {
    default:
      "EscaneApp | Evalúa un carro usado antes de comprarlo",
    template: "%s | EscaneApp",
  },

  description:
    "Evalúa un carro usado en Colombia antes de comprarlo. Consulta antecedentes, revisa 80 puntos de inspección y estima sus costos antes de pagar un peritaje.",

  alternates: {
    canonical: "https://www.escaneapp.com/",
  },

  manifest: "/manifest.json",

  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon.png",
        type: "image/png",
        sizes: "48x48",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },

  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "EscaneApp",
  },

  openGraph: {
    title: "EscaneApp | Evalúa un carro usado antes de comprarlo",
    description:
      "Evalúa un carro usado en Colombia antes de comprarlo. Consulta antecedentes, revisa 80 puntos y estima sus costos.",
    url: "https://www.escaneapp.com/",
    siteName: "EscaneApp",
    locale: "es_CO",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "EscaneApp | Evalúa un carro usado antes de comprarlo",
    description:
      "Evalúa un carro usado en Colombia antes de comprarlo. Consulta antecedentes, revisa 80 puntos y estima sus costos.",
  },

  verification: {
    

    other: {
      "google-adsense-account": "ca-pub-4990996804813930",
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
      className={`${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/print.css" media="print" />
        <Script
          id="google-adsense"
          async
          strategy="lazyOnload"
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
