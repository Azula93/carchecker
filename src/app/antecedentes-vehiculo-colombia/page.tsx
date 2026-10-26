import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Antecedentes de un Vehículo en Colombia: RUNT, SIMIT y Fasecolda (Guía Fácil)',
  description:
    'Aprende a consultar antecedentes de un carro usado en Colombia en 5 minutos: multas en SIMIT, embargos y prendas en RUNT, y choques en Fasecolda.',
  alternates: {
    canonical: '/antecedentes-vehiculo-colombia',
  },
  openGraph: {
    title: 'Antecedentes de un Vehículo en Colombia: RUNT, SIMIT y Fasecolda (Guía Fácil)',
    description:
      'Guía paso a paso y sin enredos para consultar multas, embargos, siniestros y propietarios antes de comprar un carro usado en Colombia.',
    url: 'https://www.escaneapp.com/antecedentes-vehiculo-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/artppal-pexels-cottonbro-7541354 (2).jpg',
        width: 1200,
        height: 630,
        alt: 'Consulta de antecedentes de vehículos usados en Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antecedentes de un Vehículo en Colombia: RUNT, SIMIT y Fasecolda',
    description:
      'Aprende qué consultar en RUNT, SIMIT y Fasecolda antes de comprar un carro usado en Colombia.',
    images: ['/artppal-pexels-cottonbro-7541354 (2).jpg'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/antecedentes-vehiculo-colombia#article',
  headline: 'Antecedentes de un vehículo en Colombia: qué consultar antes de comprar',
  description:
    'Guía paso a paso para consultar el RUNT, SIMIT y Fasecolda antes de comprar un carro usado en Colombia, y cómo contrastar los antecedentes con el vehículo físico.',
  url: 'https://www.escaneapp.com/antecedentes-vehiculo-colombia',
  image: 'https://www.escaneapp.com/artppal-pexels-cottonbro-7541354 (2).jpg',
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
      name: 'Antecedentes de vehículo en Colombia',
      item: 'https://www.escaneapp.com/antecedentes-vehiculo-colombia',
    },
  ],
};

const PASOS_RUTA = [
  {
    step: '1',
    title: 'Pide la tarjeta de propiedad y la cédula',
    desc: 'Necesitas la placa exacta y el número de documento del dueño registrado.',
  },
  {
    step: '2',
    title: 'Consulta RUNT, SIMIT y Fasecolda',
    desc: 'Revisa embargos, multas pendientes y reportes de choques asegurados.',
  },
  {
    step: '3',
    title: 'Comprueba los números en el carro físico',
    desc: 'Verifica que la placa metálica y el número de chasis coincidan con los papeles.',
  },
  {
    step: '4',
    title: 'Paz y salvo antes de firmar traspaso',
    desc: 'Asegúrate de que no haya prendas bancarias ni multas que frenen el trámite.',
  },
];

export default function AntecedentesVehiculoColombiaPage() {
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
                Antecedentes de vehículo en Colombia
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-900 border border-slate-200/90 font-mono font-semibold text-xs mb-3">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUÍA LEGAL Y DOCUMENTAL · COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            Antecedentes de un vehículo en Colombia: qué consultar antes de comprar
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            Antes de entregar cualquier anticipo o firmar una promesa de compraventa, debes confirmar que el carro esté libre de embargos judiciales, prendas de bancos, fotomultas o siniestros graves. Te explicamos cómo consultarlo en internet en 5 minutos.
          </p>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
            <Image
              src="/artppal-pexels-cottonbro-7541354 (2).jpg"
              alt="Consulta de antecedentes de vehículos usados en Colombia"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </header>

        {/* 1. Ruta de 4 pasos */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              La ruta de revisión en cuatro pasos sencillos
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            No necesitas contratar a un tramitador costoso para el primer filtro. Puedes seguir este orden práctico:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {PASOS_RUTA.map((paso) => (
              <div
                key={paso.step}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                    {paso.step}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">
                    {paso.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Qué datos pedirle al vendedor */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Los datos que debes pedirle al vendedor
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Antes de hacer las consultas en línea, pídele al vendedor una foto nítida de:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              'Placa completa del vehículo (letras y números).',
              'Cédula de ciudadanía o NIT del propietario que figura en la tarjeta.',
              'Tarjeta de propiedad (Licencia de Tránsito) por ambos lados.',
              'Número de chasis / VIN y número de motor.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200/90 text-xs sm:text-sm text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            <strong>Atención:</strong> Si el vendedor dice «el carro está a nombre de una tía / amigo que vive en otra ciudad y no tengo contacto», ten mucho cuidado. Para que el traspaso sea legal, el propietario registrado debe firmar el formulario de traspaso y el contrato de compraventa.
          </div>
        </section>

        {/* 3. Las tres fuentes oficiales en Colombia */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Las tres consultas indispensables en Colombia
            </h2>
          </div>

          <div className="space-y-5">
            {/* RUNT */}
            <div className="border border-slate-200/90 rounded-2xl p-5 sm:p-6 bg-slate-50 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200/90 shrink-0 p-1 flex items-center justify-center shadow-2xs">
                    <Image
                      src="/logo-runt.png"
                      alt="Logo oficial RUNT"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      REGISTRO NACIONAL DE TRÁNSITO
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      1. RUNT: Historial del vehículo y limitaciones
                    </h3>
                  </div>
                </div>

                <a
                  href="https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Abrir portal RUNT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                El RUNT es la «cédula» del carro en Colombia. Con la placa y la cédula del dueño puedes ver si el carro está activo, la vigencia del SOAT y de la tecnomecánica, y si tiene <strong>gravámenes a la propiedad (prendas con bancos por créditos no terminados de pagar) o embargos judiciales</strong>.
              </p>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-700 leading-relaxed">
                <strong>Consejo experto:</strong> También puedes solicitar en la web del RUNT el <strong>Histórico Vehicular RUNT</strong> (tarifa oficial aprox. $35.000 COP). Te entrega la lista de todos los dueños anteriores, los accidentes registrados y el kilometraje anotado en cada tecnomecánica anual.
              </div>
            </div>

            {/* SIMIT */}
            <div className="border border-slate-200/90 rounded-2xl p-5 sm:p-6 bg-slate-50 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200/90 shrink-0 p-1 flex items-center justify-center shadow-2xs">
                    <Image
                      src="/logo-simit.png"
                      alt="Logo oficial SIMIT"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      MULTAS Y COMPARENDOS
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      2. SIMIT: Multas de tránsito y fotomultas
                    </h3>
                  </div>
                </div>

                <a
                  href="https://www.fcm.org.co/simit/#/home-public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Abrir portal SIMIT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                El SIMIT reúne las multas y fotomultas de todas las secretarías de tránsito del país. <strong>Debes consultar dos cosas por separado:</strong>
              </p>

              <ul className="space-y-1.5 text-xs text-slate-700 pl-2">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Consulta por placa:</strong> para ver si el carro tiene fotomultas pendientes asociadas directamente al vehículo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Consulta por cédula del vendedor:</strong> las secretarías de tránsito exigen que el vendedor esté en paz y salvo total por multas para poder autorizar el traspaso.</span>
                </li>
              </ul>
            </div>

            {/* Fasecolda */}
            <div className="border border-slate-200/90 rounded-2xl p-5 sm:p-6 bg-slate-50 space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-200/90 shrink-0 p-1 flex items-center justify-center shadow-2xs">
                    <Image
                      src="/logo-fasecolda.png"
                      alt="Logo oficial Fasecolda"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                      HISTORIAL ASEGURADOR
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      3. Fasecolda: Historial de choques y siniestros asegurados
                    </h3>
                  </div>
                </div>

                <a
                  href="https://www.fasecolda.com/ramos/automoviles/camara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                >
                  <span>Abrir portal Fasecolda</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Fasecolda es la federación de aseguradoras de Colombia. Su consulta gratuita te muestra si el carro tuvo algún siniestro grave pagado por aseguradora desde 2008 (pérdida de mayor cuantía por daño o hurto recuperado).
              </p>

              <div className="p-3.5 bg-white rounded-xl border border-slate-200/90 text-xs text-slate-600 leading-relaxed">
                <strong>Ojo con el límite de Fasecolda:</strong> Solo aparecen los choques donde el dueño tenía póliza todo riesgo y reclamó al seguro. Si el dueño se estrelló y lo mandó arreglar a un taller de barrio de su propio bolsillo, <strong>no aparecerá en Fasecolda</strong> (por eso el peritaje físico siempre es necesario).
              </div>
            </div>
          </div>
        </section>

        {/* 4. Tabla de contraste */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Qué hacer con los resultados que encuentres
            </h2>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200/90">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Situación encontrada</th>
                  <th className="py-3 px-4 font-bold">Riesgo para ti</th>
                  <th className="py-3 px-4 font-bold">Cómo actuar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    Multas pendientes en SIMIT
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    El organismo de tránsito bloqueará el trámite de traspaso de inmediato.
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    El vendedor debe pagarlas antes de radicar los documentos o descontarlas del pago si tú acuerdas pagarlas.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    Prenda bancaria activa en RUNT
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    El carro está como garantía de un crédito. No se puede transferir a tu nombre.
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    El banco debe emitir la carta de levantamiento de prenda y registrarse en el RUNT antes del negocio.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    Embargo judicial en RUNT
                  </td>
                  <td className="py-3.5 px-4 text-slate-700 font-semibold text-rose-800">
                    Riesgo extremo: el carro puede ser inmovilizado por la policía en cualquier retén.
                  </td>
                  <td className="py-3.5 px-4 text-rose-800 font-semibold">
                    Cancela el negocio de inmediato. No entregues dinero bajo ninguna promesa verbal.
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                    Siniestro de mayor cuantía en Fasecolda
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    El carro sufrió un choque muy fuerte donde la estructura o el motor resultaron gravemente afectados.
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">
                    Exige peritaje estructural minucioso en elevador para verificar si el chasis quedó derecho y seguro.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Cómo ayuda EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Registra y organiza los antecedentes con EscaneApp
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Nuestra herramienta de evaluación incluye una sección dedicada a la verificación legal. Marca qué consultaste en RUNT, SIMIT y Fasecolda, y guarda un reporte integral junto a las fotos de la inspección mecánica para tener todo organizado antes de cerrar la compra.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Abrir asistente de evaluación guiada</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
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
                Guía completa de 10 pasos para revisar motor, carrocería y cabina.
              </p>
            </Link>

            <Link
              href="/costo-peritaje-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cuánto cuesta un peritaje
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tarifas y centros autorizados en Colombia para peritar un carro.
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
                Aprende a interpretar el odómetro y detectar alteraciones fraudulentas.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>SEGURIDAD EN TU COMPRA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Comprueba el carro antes de comprometer tu dinero
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Usa la lista interactiva de EscaneApp desde tu teléfono y toma la mejor decisión con tranquilidad.
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
          <strong>Aviso de orientación:</strong> La información contenida en esta guía tiene propósito orientativo. Las consultas oficiales deben realizarse directamente a través de las entidades competentes (RUNT, SIMIT, Fasecolda o secretarías de tránsito correspondientes).
        </p>
      </article>
    </div>
  );
}
