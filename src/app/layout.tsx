import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { PwaRegister } from '../components/pwa/PwaRegister';
import { StructuredData } from './structured-data';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0F1B2B',
  width: 'device-width',
  initialScale: 1,
  
};

export const metadata: Metadata = {
  title: 'Car Checker Colombia | Revisa un carro usado antes de comprar',
  description:
    'Revisa un carro usado en Colombia antes de comprarlo. Evalúa kilometraje, antecedentes, estado físico y posibles costos ocultos antes de pagar un peritaje profesional.',
    alternates: {
  canonical: 'https://carchecker.kodiquett.com',
},
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Car Checker',
  },

  openGraph: {
  title: 'Car Checker Colombia | Revisa un carro usado antes de comprar',
  description:
    'Revisa un carro usado en Colombia antes de comprarlo. Evalúa kilometraje, antecedentes, estado físico y posibles costos ocultos antes de pagar un peritaje profesional.',
  url: 'https://carchecker.kodiquett.com',
  siteName: 'Car Checker Colombia',
  locale: 'es_CO',
  type: 'website',
},
twitter: {
  card: 'summary_large_image',
  title: 'Car Checker Colombia | Revisa un carro usado antes de comprar',
  description:
    'Revisa un carro usado en Colombia antes de comprarlo. Evalúa kilometraje, antecedentes, estado físico y posibles costos ocultos antes de pagar un peritaje profesional.',
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-brand-secondary selection:text-white">
        <PwaRegister />
        <StructuredData />
        <Header />
        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
