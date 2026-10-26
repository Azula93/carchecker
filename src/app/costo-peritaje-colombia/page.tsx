import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  DollarSign,
  Car,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '¿Cuánto cuesta un peritaje vehicular en Colombia? Precios y Guía',
  description:
    'Precios reales de peritaje vehicular en Colombia: cuánto cobran Colserauto, Automás y Elperito. Diferencias entre básico y completo y qué incluye cada paquete.',
  alternates: {
    canonical: '/costo-peritaje-colombia',
  },
  openGraph: {
    title: '¿Cuánto cuesta un peritaje vehicular en Colombia? Precios y Guía',
    description:
      'Compara precios de peritaje vehicular en Colombia, paquetes en sede y a domicilio, y qué pruebas mecánicas y legales pedir antes de comprar.',
    url: 'https://www.escaneapp.com/costo-peritaje-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/artppal-pexels-freestockpro-12969398.jpg',
        width: 1200,
        height: 630,
        alt: 'Peritaje vehicular en Colombia y revisión técnica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Cuánto cuesta un peritaje vehicular en Colombia? Precios y Guía',
    description:
      'Compara precios de peritaje vehicular en Colombia, qué incluye cada paquete y consejos clave antes de contratar.',
    images: ['/artppal-pexels-freestockpro-12969398.jpg'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/costo-peritaje-colombia#article',
  headline: '¿Cuánto cuesta un peritaje vehicular en Colombia y qué incluye?',
  description:
    'Guía completa sobre tarifas de peritaje en Colombia, comparación entre paquetes básicos y completos, pruebas incluidas y consejos para compradores de carros usados.',
  url: 'https://www.escaneapp.com/costo-peritaje-colombia',
  image: 'https://www.escaneapp.com/artppal-pexels-freestockpro-12969398.jpg',
  inLanguage: 'es-CO',
  datePublished: '2025-01-10T08:00:00+00:00',
  dateModified: '2026-10-25T12:00:00+00:00',
  author: [
    {
      '@type': 'Organization',
      name: 'Equipo Editorial EscaneApp',
      url: 'https://www.escaneapp.com',
    },
  ],
  isPartOf: {
    '@id': 'https://www.escaneapp.com/#webapp',
  },
  publisher: {
    '@type': 'Organization',
    name: 'EscaneApp',
    url: 'https://www.escaneapp.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.escaneapp.com/01_logo_horizontal_principal.png',
    },
  },
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta un peritaje para carro en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En promedio, un peritaje básico cuesta entre $169.000 y $296.000 COP (solo inspección visual). Un peritaje completo y recomendado cuesta entre $327.000 y $456.000 COP e incluye escáner electrónico, chasis en elevador y prueba de ruta. Para autos de alta gama puede superar los $600.000 COP.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Quién debe pagar el peritaje: el comprador o el vendedor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Por costumbre en Colombia lo paga el comprador, ya que el informe es para su propia seguridad e independencia. Sin embargo, en muchos casos las partes acuerdan pagar mitad y mitad si el vehículo aprueba la revisión.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué diferencia hay entre un peritaje en sede y uno a domicilio?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En una sede física el carro se sube a una rampa o fosa elevadora, lo que permite ver el chasis por debajo, fugas ocultas y suspensión con iluminación completa. A domicilio es más cómodo, pero el técnico solo puede revisar lo accesible al nivel del piso con linterna y gato.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El peritaje garantiza que el carro no va a fallar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No garantiza el futuro, pero es la mejor herramienta para conocer el estado real actual del carro: si fue chocado de gravedad, si tiene masilla oculta, si el motor tiene buena compresión o si tiene embargos pendientes.',
      },
    },
  ],
};

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Inicio',
      item: 'https://www.escaneapp.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Costo de peritaje en Colombia',
      item: 'https://www.escaneapp.com/costo-peritaje-colombia',
    },
  ],
};

export default function CostoPeritajeColombiaPage() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="text-slate-900 font-bold">
                Costo de peritaje vehicular en Colombia
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-900 border border-slate-200/90 font-mono font-semibold text-xs mb-3">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUÍA DE TARIFAS Y SERVICIOS · COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            ¿Cuánto cuesta un peritaje vehicular en Colombia y qué incluye?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            Llevar un carro a peritaje es la inversión más inteligente que puedes hacer antes de comprarlo: te permite saber si fue chocado, si el motor está desgastado o si tiene problemas de papeles, evitando perder millones de pesos.
          </p>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
            <Image
              src="/artppal-pexels-freestockpro-12969398.jpg"
              alt="Peritaje vehicular en Colombia y revisión técnica"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </header>

        {/* Introducción */}
        <section className="mb-8 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-xs text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
          <p>
            En Colombia, el peritaje es como la revisión médica integral de un vehículo. Un técnico capacitado revisa la carrocería con aparatos de medición, sube el carro a una rampa para revisar el chasis por debajo, le conecta un escáner electrónico al computador de a bordo y revisa que los números de motor y chasis coincidan con los documentos oficiales.
          </p>
          <p>
            Sin embargo, los precios varían notablemente según la empresa y el paquete que elijas: van desde <strong>$169.000 COP</strong> para revisiones básicas hasta más de <strong>$680.000 COP</strong> para paquetes completos en vehículos de alta gama.
          </p>
        </section>

        {/* 1. Precios de peritaje en Colombia */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Tarifas promedio de peritaje en Colombia
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Para facilitarte la comparación, los paquetes de peritaje en el mercado colombiano se dividen principalmente en <strong>tres niveles</strong> según qué tan profunda sea la inspección:
          </p>

          {/* Tarjetas resumen por nivel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
            <div className="p-5 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-slate-800 text-white uppercase tracking-wider">
                Nivel 1 · Básico
              </span>
              <div className="text-xl font-black text-slate-900 font-mono">$169.000 – $296.000</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Revisión visual general de pintura y carrocería, luces y consulta básica de papeles en el RUNT. No incluye elevador ni escáner profundo.
              </p>
            </div>

            <div className="p-5 rounded-xl border-2 border-emerald-600/40 bg-emerald-50/40 space-y-2 relative shadow-xs">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-emerald-700 text-white uppercase tracking-wider">
                Nivel 2 · Completo (Recomendado)
              </span>
              <div className="text-xl font-black text-slate-900 font-mono">$327.000 – $456.000</div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Suma escáner computarizado OBD2, prueba de manejo en ruta, chasis en rampa elevadora, compresión y estudio legal completo de antecedentes.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold font-mono bg-slate-800 text-white uppercase tracking-wider">
                Nivel 3 · Alta Gama
              </span>
              <div className="text-xl font-black text-slate-900 font-mono">$520.000 – $684.000+</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Diseñado para marcas prémium (BMW, Mercedes, Audi) o camionetas grandes con múltiples módulos electrónicos y cajas automáticas complejas.
              </p>
            </div>
          </div>

          {/* Tabla comparativa estructurada */}
          <div className="overflow-x-auto rounded-xl border border-slate-200/90">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Proveedor / Ubicación</th>
                  <th className="py-3 px-4 font-bold">Paquete y alcance</th>
                  <th className="py-3 px-4 font-bold text-right">Tarifa aproximada (COP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {/* GRUPO 1: BÁSICOS */}
                <tr className="bg-slate-100/90 text-slate-800 font-mono font-bold text-xs uppercase tracking-wider border-y border-slate-200">
                  <td colSpan={3} className="py-2.5 px-4 font-bold text-xs tracking-wider font-mono">
                    🟢 Paquetes Básicos / Esenciales · $169.000 a $296.000 COP
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">CDA Chía Tres Esquinas</td>
                  <td className="py-3 px-4 text-slate-600">Combo esencial (inspección visual básica)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$169.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">Peritaje de Vehículos</td>
                  <td className="py-3 px-4 text-slate-600">Peritaje básico (cobertura nacional)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$170.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://elperito.com/peritaje-cali/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Elperito.com
                    </a> (Cali / Bogotá)
                  </td>
                  <td className="py-3 px-4 text-slate-600">Peritaje básico (revisión de estructura y lámina)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$194.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://www.autolab.com.co/peritaje-para-carros/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Autolab
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Compra Segura (revisión de puntos mecánicos clave)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$246.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://www.colserauto.com/servicios-avaluo-y-peritaje" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Colserauto
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Plan Basic (avalúo técnico + consulta RUNT)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$294.100</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://automas.com.co/peritaje-cali/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Automás
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Peritaje liviano (revisión base en sede)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$296.000</td>
                </tr>

                {/* GRUPO 2: COMPLETOS */}
                <tr className="bg-slate-900 text-white font-mono font-bold text-xs uppercase tracking-wider">
                  <td colSpan={3} className="py-2.5 px-4 font-bold text-xs tracking-wider font-mono">
                    🔵 Paquetes Completos / Estándar (Recomendados) · $327.000 a $456.000 COP
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://elperito.com/peritaje-cali/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Elperito.com
                    </a> (Cali / Bogotá)
                  </td>
                  <td className="py-3 px-4 text-slate-600">Peritaje completo (agrega escáner, prueba de ruta y estudio jurídico)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$327.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://www.autolab.com.co/peritaje-para-carros/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Autolab
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Compra Segura Plus (diagnóstico integral y escaneo)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$344.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">CDA Chía Tres Esquinas</td>
                  <td className="py-3 px-4 text-slate-600">Combo Expert (inspección detallada de sistemas y estructura)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$360.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://automas.com.co/peritaje-cali/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Automás
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Peritaje a domicilio (inspección técnica en ubicación del cliente)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$426.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://www.colserauto.com/servicios-avaluo-y-peritaje" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Colserauto
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Plan Excellence (prueba de ruta, compresión relativa y estructura)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$455.900</td>
                </tr>

                {/* GRUPO 3: PREMIUM */}
                <tr className="bg-slate-100/90 text-slate-800 font-mono font-bold text-xs uppercase tracking-wider border-y border-slate-200">
                  <td colSpan={3} className="py-2.5 px-4 font-bold text-xs tracking-wider font-mono">
                    🟣 Paquetes Prémium y Alta Gama · $523.000 a $684.000 COP
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://elperito.com/peritaje-cali/" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Elperito.com
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Peritaje alta gama (marcas europeas o deportivas)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$523.000</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://www.colserauto.com/servicios-avaluo-y-peritaje" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Colserauto
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Plan Premium (evaluación técnica exhaustiva de todos los módulos)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$581.300</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    <a href="https://www.colserauto.com/servicios-avaluo-y-peritaje" target="_blank" rel="noopener noreferrer" className="text-slate-900 hover:text-emerald-700 underline">
                      Colserauto
                    </a>
                  </td>
                  <td className="py-3 px-4 text-slate-600">Plan High Performance (deportivos de alto desempeño)</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">$683.900</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            * Precios de referencia vigentes en las principales ciudades de Colombia (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga). Cada centro puede actualizar tarifas según la ciudad o promociones vigentes.
          </p>
        </section>

        {/* 2. En sede vs A domicilio */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Peritaje en taller o a domicilio?
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Muchos vendedores prefieren que el perito vaya al conjunto cerrado o parqueadero donde está guardado el carro. ¿Qué ventajas y desventajas tiene cada opción?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 text-slate-900" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  En sede o taller autorizado (Recomendado)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tienen <strong>rampa elevadora</strong> para ver el chasis por debajo, equipo de alineación computarizada, fosa iluminada y bancos para probar suspensión y frenos. Es la opción más completa si quieres asegurarte de que el carro nunca tuvo un golpe estructural grave.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-900" />
                <h3 className="font-bold text-sm sm:text-base text-slate-900">
                  A domicilio (Más cómodo pero con limitaciones)
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                El perito se desplaza al parqueadero con medidor de pintura, escáner y linterna. Es ideal si el carro no tiene SOAT vigente o si el vendedor no quiere desplazarse por el tráfico, pero el técnico solo puede ver lo que queda a la altura del piso sin rampa.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Qué incluye un peritaje completo */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Qué pruebas incluye un peritaje completo?
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                titulo: '1. Medición de pintura y carrocería',
                desc: 'Usan un aparato micrométrico que mide el grosor de la pintura en cada puerta, guardabarros y techo. Si una pieza tiene pintura muy gruesa, significa que tiene capas de masilla por choques anteriores.',
              },
              {
                titulo: '2. Estructura y chasis en elevador',
                desc: 'Revisan las puntas del chasis, compactos, tijeras y piso del baúl. Comprueban que no haya soldaduras rústicas o piezas enderezadas a golpes tras un choque fuerte.',
              },
              {
                titulo: '3. Escáner electrónico al computador',
                desc: 'Conectan un escáner OBD2 al puerto del vehículo. Detecta códigos de error guardados en la memoria, fallas intermitentes de inyección, sensores dañados y verifica que los módulos de Airbag y ABS no estén desconectados.',
              },
              {
                titulo: '4. Prueba de compresión del motor',
                desc: 'Mide la presión de aire que genera cada cilindro del motor. Si un cilindro tiene baja compresión, el motor tiene desgaste interno severo y requerirá una reparación costosa (reparación de motor).',
              },
              {
                titulo: '5. Prueba de ruta y suspensión',
                desc: 'El perito maneja el carro unos kilómetros para sentir la suavidad del embrague, si la caja patina o golpea al meter los cambios, y si los amortiguadores y frenos responden con seguridad.',
              },
              {
                titulo: '6. Verificación de improntas y legal',
                desc: 'Toman las improntas (calcos en cinta de los números de serie grabados en el motor y chasis) y revisan que no tengan limaduras, regrabaciones fraudulentas o inconsistencias con el RUNT.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1">
                <span className="font-bold text-sm text-slate-900 block">
                  {item.titulo}
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. ¿Quién debe pagar el peritaje? */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Quién debe pagar el peritaje: comprador o vendedor?
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            En Colombia no hay ninguna ley que obligue a uno o al otro; es un acuerdo voluntario entre las partes. Sin embargo, en la práctica se acostumbra lo siguiente:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <strong className="text-sm font-bold text-slate-900 block">
                El comprador lo paga (Lo más común y sano)
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Al pagar tú el peritaje, tú eres el cliente del centro de diagnóstico. Tú escoges el taller de tu confianza y te aseguras de que el informe sea 100% independiente, sin favoritismos hacia el vendedor.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <strong className="text-sm font-bold text-slate-900 block">
                Acuerdo de reembolso condicional
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Un acuerdo muy usado es: el comprador paga el peritaje, pero si el carro sale con el chasis torcido o el motor dañado (algo que el vendedor aseguró que no tenía), el vendedor le reembolsa el costo del peritaje al comprador.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Preguntas clave antes de contratar */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Qué debes preguntar al centro de peritaje antes de pagar
            </h2>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              '¿Tienen elevador para mirar el chasis por debajo?',
              '¿Incluye medición de pintura con micrómetro?',
              '¿Conectan escáner OBD2 para ver fallas electrónicas?',
              '¿Incluye prueba de ruta en calle?',
              '¿Entregan informe digital con fotos en el mismo día?',
              '¿El perito me explica personalmente los resultados al terminar?',
            ].map((preg, idx) => (
              <li key={idx} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{preg}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Cómo ayuda EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Ahorra plata: no lleves cualquier carro a peritaje
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Si llevas a peritaje cada carro que ves publicado, te vas a gastar fácilmente $1.000.000 COP en 3 revisiones fallidas.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Con <strong>EscaneApp</strong>, haces primero una preevaluación visual gratuita desde tu celular en 10 minutos. Si el carro tiene fugas graves de aceite, líneas de carrocería chuecas o multas en el SIMIT, lo descartas de inmediato sin gastar un solo peso en peritajes innecesarios.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Hacer preevaluación gratis en mi celular</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            <h2 className="text-2xl font-black text-slate-900">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Cuánto dura un peritaje completo?',
                a: 'En promedio tarda entre 1 hora y 2 horas, dependiendo de si incluye prueba de ruta y revisión minuciosa del chasis.',
              },
              {
                q: '¿Un peritaje garantiza que el carro está perfecto?',
                a: 'No garantiza el futuro, pero sí te dice la verdad sobre su estado actual: si fue chocado, si tiene fugas o si le bajaron el kilometraje. Es tu mayor protección como comprador.',
              },
              {
                q: '¿Puedo negociar el precio del carro con el resultado del peritaje?',
                a: '¡Totalmente! Si el peritaje reporta que las pastillas de frenos están gastadas, que las llantas necesitan cambio o que hay un empaque húmedo, cotizas ese arreglo y le pides al vendedor descontar ese valor del precio final.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Recursos relacionados */}
        <section className="border-t border-slate-200/90 pt-10 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Otras guías recomendadas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/como-revisar-carro-usado"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cómo revisar un carro usado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paso a paso para inspeccionar un carro usado tú mismo antes del peritaje.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cómo revisar el kilometraje
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aprende a interpretar el odómetro y detectar alteraciones.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Antecedentes de un vehículo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cómo consultar multas, embargos y propietarios en RUNT y SIMIT.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>FILTRO PREVIO INTELIGENTE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Evalúa tu próximo carro antes de pagar peritajes
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Detecta fallas visibles, fugas y papeles pendientes en minutos con la guía interactiva de EscaneApp.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Iniciar evaluación gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <p className="text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
          <strong>Aviso de orientación:</strong> Los precios y descripciones de servicios corresponden a referencias del mercado colombiano y pueden variar según la empresa, la ciudad y el modelo del vehículo. EscaneApp es una plataforma informativa independiente.
        </p>
      </article>
    </div>
  );
}
