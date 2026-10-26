import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  Building2,
  Calendar,
  Percent,
  Search,
} from 'lucide-react';
import { CalculadoraImpuestoVehicular } from '@/components/calculator/CalculadoraImpuestoVehicular';

export const metadata: Metadata = {
  title: 'Liquidador de Impuesto Vehicular 2026 en Colombia | Tarifas y Avalúo',
  description:
    'Calcula gratis el impuesto vehicular 2026 en Colombia con las tablas oficiales del Ministerio de Transporte. Consulta avalúo, tarifas y descuentos por departamento.',
  alternates: {
    canonical: '/liquidador-impuesto-vehicular-colombia',
  },
  openGraph: {
    title: 'Liquidador de Impuesto Vehicular 2026 en Colombia | Tarifas y Avalúo',
    description:
      'Calcula en segundos el impuesto vehicular 2026 con avalúos oficiales del Ministerio de Transporte. Tarifas del 1.5%, 2.5%, 3.5% y descuentos vigentes.',
    url: 'https://www.escaneapp.com/liquidador-impuesto-vehicular-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/artppal-pexels-cottonbro-7541354 (7).jpg',
        width: 1200,
        height: 630,
        alt: 'Liquidador de impuesto vehicular en Colombia con tablas oficiales del Ministerio de Transporte',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Liquidador de Impuesto Vehicular 2026 en Colombia',
    description:
      'Calcula el impuesto de tu carro o moto con las tablas oficiales de avalúo MinTransporte y conoce los descuentos por departamento.',
    images: ['/artppal-pexels-cottonbro-7541354 (7).jpg'],
  },
};

const webAppStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  '@id': 'https://www.escaneapp.com/liquidador-impuesto-vehicular-colombia#webapp',
  name: 'Liquidador de Impuesto Vehicular Colombia 2026',
  url: 'https://www.escaneapp.com/liquidador-impuesto-vehicular-colombia',
  description:
    'Herramienta gratuita para liquidar el impuesto sobre vehículos automotores en Colombia con base en las tablas de avalúo fiscal del Ministerio de Transporte.',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'All',
  inLanguage: 'es-CO',
  isAccessibleForFree: true,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'COP',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/liquidador-impuesto-vehicular-colombia#article',
  headline: 'Liquidador de Impuesto Vehicular 2026 en Colombia: Tarifas, Avalúos y Fechas de Pago',
  description:
    'Guía completa y herramienta interactiva para calcular el impuesto sobre vehículos automotores en Colombia: tablas de avalúo comercial MinTransporte, tarifas DIAN, descuentos por pronto pago y calendario tributario.',
  url: 'https://www.escaneapp.com/liquidador-impuesto-vehicular-colombia',
  image: 'https://www.escaneapp.com/artppal-pexels-cottonbro-7541354 (7).jpg',
  inLanguage: 'es-CO',
  datePublished: '2026-10-25T08:00:00+00:00',
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
      name: 'Liquidador de impuesto vehicular 2026',
      item: 'https://www.escaneapp.com/liquidador-impuesto-vehicular-colombia',
    },
  ],
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cómo se calcula el impuesto vehicular en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Se toma el avalúo oficial que fija el Ministerio de Transporte cada año y se multiplica por la tarifa que le corresponde según su valor (1.5% para carros de hasta $54 millones, 2.5% para carros de hasta $121 millones, y 3.5% para carros más costosos). Al final se le suman unos $75.000 COP de derechos de semaforización.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El avalúo del Ministerio es el mismo precio al que vendo el carro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El avalúo oficial suele estar entre un 10% y un 25% por debajo del precio comercial de venta en el mercado de usados. El impuesto se calcula obligatoriamente sobre el valor de la tabla del Ministerio.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Quién debe pagar el impuesto si compro un carro usado a mitad de año?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para poder radicar el traspaso en el tránsito, el impuesto de todo el año debe estar pagado al 100%. Por lo general, el vendedor lo paga completo y en el contrato de compraventa acuerdan que el comprador le reembolse la parte proporcional de los meses que va a disfrutar el carro.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si no pago el impuesto vehicular a tiempo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Te cobran intereses moratorios diarios muy altos y una sanción mínima por pagar tarde que supera los $250.000 COP. Además, la Secretaría de Hacienda puede embargarte cuentas bancarias y no podrás hacer ningún trámite de traspaso.',
      },
    },
  ],
};

export default function LiquidadorImpuestoVehicularPage() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-slate-800">
      {/* Marcado Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webAppStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
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
                Liquidador de impuesto vehicular 2026
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado Principal */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-900 border border-slate-200/90 font-mono font-semibold text-xs mb-3">
            <Building2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>TABLAS OFICIALES MINTRANSPORTE Y DIAN 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            Liquidador de Impuesto Vehicular 2026 en Colombia
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            Calcula en segundos cuánto debes pagar de impuesto por tu carro o moto en Bogotá, Cundinamarca, Antioquia, Valle del Cauca y todo el país. Basado en las tablas de avalúo comercial oficiales del Ministerio de Transporte.
          </p>

          <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm mb-8">
            <Image
              src="/pexels-n-voitkevich-8927682.jpg"
              alt="Cálculo y liquidación de impuesto vehicular en Colombia con tablas oficiales"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </header>

        {/* ========================================================= */}
        {/* HERRAMIENTA INTERACTIVA: LIQUIDADOR EN TIEMPO REAL       */}
        {/* ========================================================= */}
        <section className="mb-12">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    Calcula el avalúo e impuesto de tu carro
                  </h2>
                  <p className="text-xs text-slate-500">
                    Selecciona la marca, modelo y año para consultar el valor oficial
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Tarifas 2026
              </span>
            </div>

            {/* Componente Interactivo Oficial */}
            <CalculadoraImpuestoVehicular
              categoriaInicial="automoviles"
              marcaInicial="MAZDA"
              anioModeloInicial={2022}
              yaCalculado={true}
            />
          </div>
        </section>

        {/* 1. Tabla Oficial de Rangos y Tarifas 2026 */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              <Percent className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Cómo se calcula? Tarifas por rango de precio
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            El gobierno divide los carros en 3 grupos según su valor oficial en la tabla del Ministerio de Transporte. Entre más caro es el carro, mayor porcentaje paga:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200/90">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0F172A] text-white font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 sm:p-4">Valor del carro en la tabla oficial</th>
                  <th className="p-3.5 sm:p-4">Tarifa de impuesto</th>
                  <th className="p-3.5 sm:p-4">Ejemplos de carros comunes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Hasta $54.057.000 COP
                    <span className="block text-[11px] font-normal text-slate-500">Gama económica y usados populares</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">1.5%</td>
                  <td className="p-3.5 sm:p-4 text-xs text-slate-600">Chevrolet Spark, Renault Logan/Sandero, Kia Picanto, Mazda 2 usados.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    De $54.057.001 hasta $121.625.000 COP
                    <span className="block text-[11px] font-normal text-slate-500">Gama media y camionetas familiares</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">2.5%</td>
                  <td className="p-3.5 sm:p-4 text-xs text-slate-600">Mazda 3, Renault Duster reciente, Toyota Corolla, Chevrolet Tracker, Nissan Kicks.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Más de $121.625.000 COP
                    <span className="block text-[11px] font-normal text-slate-500">Gama alta y camionetas grandes</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-rose-700">3.5%</td>
                  <td className="p-3.5 sm:p-4 text-xs text-slate-600">Toyota Prado, Fortuner, BMW Serie 3, Mercedes-Benz, Audi Q5.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-emerald-50/30">
                  <td className="p-3.5 sm:p-4 font-semibold text-emerald-900">
                    Carros 100% Eléctricos
                    <span className="block text-[11px] font-normal text-emerald-700">Beneficio por ley ambiental</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-emerald-800">1.0%</td>
                  <td className="p-3.5 sm:p-4 text-xs text-emerald-700">BYD Yuan, Renault Zoe, Nissan Leaf, Tesla. Tienen tarifa reducida fija del 1%.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Motos de más de 125 cc
                    <span className="block text-[11px] font-normal text-slate-500">Motos medianas y grandes</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">1.5%</td>
                  <td className="p-3.5 sm:p-4 text-xs text-slate-600">Motos de 150cc en adelante. (Motos de 125cc o menos no pagan este impuesto).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs text-slate-700 leading-relaxed">
            <strong>Derechos de semaforización:</strong> Al resultado del porcentaje siempre se le suma un cobro fijo para el mantenimiento de semáforos de la ciudad (en Bogotá son aprox. $75.000 COP).
          </div>
        </section>

        {/* 2. Calendario de pago y descuentos por departamento */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Descuentos del 10% por pagar temprano
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Casi todas las gobernaciones premian a quienes pagan en los primeros meses con un <strong>10% de descuento directo</strong> sobre el valor del impuesto:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-sm text-slate-900 block">
                Bogotá D.C. (Secretaría de Hacienda)
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>10% de descuento:</strong> Pagando antes de mayo o principios de junio.</li>
                <li>• <strong>Límite sin sanción:</strong> Hasta mediados de julio.</li>
                <li>• <strong>Carros híbridos:</strong> Tienen 40% de descuento durante los primeros 5 años.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-sm text-slate-900 block">
                Antioquia (Medellín y municipios)
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>10% de descuento:</strong> Para pagos realizados entre febrero y abril.</li>
                <li>• <strong>Beneficio eléctrico:</strong> Descuentos de hasta el 20% para carros 100% eléctricos.</li>
                <li>• <strong>Límite sin sanción:</strong> Mes de julio.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-sm text-slate-900 block">
                Cundinamarca (Gobernación)
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>10% de descuento:</strong> Pagos en el primer tramo del año.</li>
                <li>• <strong>5% de descuento:</strong> Segundo corte de pronto pago.</li>
                <li>• <strong>Incentivo por matrícula:</strong> Beneficios si trasladas la cuenta a Cundinamarca.</li>
              </ul>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-sm text-slate-900 block">
                Valle del Cauca (Cali y municipios)
              </span>
              <ul className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
                <li>• <strong>Calendario por placas:</strong> Fechas escalonadas según el último número de tu placa.</li>
                <li>• <strong>Pago por internet:</strong> En la web de Rentas Departamentales del Valle por PSE.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3. Paso a paso para pagar en línea por PSE */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              <Calculator className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Cómo pagar el impuesto por internet en 5 minutos
            </h2>
          </div>

          <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <ol className="space-y-3 list-decimal list-inside">
              <li className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50">
                <strong>Entra a la página de Hacienda de tu departamento:</strong> En Bogotá es la <em>Oficina Virtual de Hacienda</em>, en Antioquia es <em>Vehículos Antioquia</em>, etc.
              </li>
              <li className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50">
                <strong>Escribe la placa y la cédula del dueño:</strong> Con esos dos datos el sistema busca automáticamente tu carro.
              </li>
              <li className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50">
                <strong>Verifica los datos:</strong> Revisa que la marca, modelo y cilindraje coincidan con tu tarjeta de propiedad.
              </li>
              <li className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50">
                <strong>Paga por PSE:</strong> Pagas desde tu cuenta de banco (Bancolombia, Nequi, Davivienda, etc.) y en 24 a 48 horas el paz y salvo queda subido al sistema del RUNT.
              </li>
            </ol>
          </div>
        </section>

        {/* Cómo ayuda EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Calcula todos los costos del carro con EscaneApp
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            El impuesto es solo un gasto del año. Con nuestro evaluador completo calculas el costo real de tener el carro: gasolina mensual según tu ciudad, SOAT, tecnomecánica, llantas y mantenimientos preventivos.
          </p>

          <div className="pt-2">
            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Ver calculadora de costos de mantenimiento</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            <h2 className="text-2xl font-black text-slate-900">
              Preguntas frecuentes sobre el impuesto vehicular
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Si el carro estuvo guardado todo el año en el garaje debe pagar impuesto?',
                a: 'Sí. El impuesto vehicular grava la propiedad del carro en el RUNT, no el uso. La única manera de dejar de pagar impuesto es dar de baja la matrícula definitivamente por chatarrización.',
              },
              {
                q: '¿Se puede pagar el impuesto a cuotas?',
                a: 'En Bogotá existe la modalidad de 4 cuotas a lo largo del año sin intereses (SPAC), inscribiéndote en las primeras semanas del año. En la mayoría de los demás departamentos se paga en una sola cuota.',
              },
              {
                q: '¿Qué pasa si compro un carro con impuestos atrasados de años anteriores?',
                a: 'El organismo de tránsito no permitirá hacer el traspaso hasta que todas las vigencias atrasadas estén en paz y salvo con sus respectivos intereses y sanciones.',
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
              href="/traspaso-carro-usado-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Traspaso de carro usado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Costos reales 2026, división de gastos 50/50 y requisitos de tránsito.
              </p>
            </Link>

            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cuánto cuesta mantener un carro
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Calculadora de gastos anuales: SOAT, gasolina, seguro y llantas.
              </p>
            </Link>

            <Link
              href="/carros-salvamento-perdida-total-fasecolda"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Carros de salvamento y Fasecolda
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aprende a detectar carros que tuvieron pérdida total o choques graves.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>EVALUACIÓN INTELIGENTE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Evalúa tu próximo carro antes de comprar
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Comprueba el estado físico, los antecedentes legales y calcula todos los gastos antes de negociar.
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
          <strong>Aviso de orientación:</strong> Los cálculos arrojados por este liquidador son aproximaciones fundamentadas en las resoluciones oficiales del Ministerio de Transporte y las secretarías de hacienda departamentales. El valor final liquidado puede variar según derechos de semaforización y recargos locales.
        </p>
      </article>
    </div>
  );
}
