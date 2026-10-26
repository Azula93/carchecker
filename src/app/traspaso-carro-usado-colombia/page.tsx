import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  AlertTriangle,
  Scale,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Traspaso de Carro en Colombia: Costos, Requisitos y Trámite (Guía Fácil)',
  description:
    'Guía sencilla sobre el traspaso de carro en Colombia: cuánto cuesta, quién paga qué (50/50), requisitos de RUNT y SIMIT, y cómo evitar estafas.',
  alternates: {
    canonical: '/traspaso-carro-usado-colombia',
  },
  openGraph: {
    title: 'Traspaso de Carro en Colombia: Costos, Requisitos y Trámite (Guía Fácil)',
    description:
      'Aprende cuánto cuesta el traspaso de un vehículo usado en Colombia, qué documentos necesitas, cómo se divide el pago y cómo hacer el trámite seguro.',
    url: 'https://www.escaneapp.com/traspaso-carro-usado-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/artppal-pexels-cottonbro-7541354 (5).jpg',
        width: 1200,
        height: 630,
        alt: 'Traspaso de carro usado en Colombia: contrato, costos y requisitos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Traspaso de Carro en Colombia: Costos, Requisitos y Trámite',
    description:
      'Guía completa del trámite de traspaso de vehículos usados en Colombia en lenguaje claro y accesible.',
    images: ['/artppal-pexels-cottonbro-7541354 (5).jpg'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/traspaso-carro-usado-colombia#article',
  headline: 'Traspaso de Carro Usado en Colombia: Costos, Requisitos y Paso a Paso',
  description:
    'Guía detallada sobre los trámites de traspaso de vehículos automotores en Colombia: tarifas vigentes, distribución de gastos, requisitos legales en RUNT y SIMIT, y recomendaciones para proteger tu patrimonio.',
  url: 'https://www.escaneapp.com/traspaso-carro-usado-colombia',
  image: 'https://www.escaneapp.com/artppal-pexels-cottonbro-7541354 (5).jpg',
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
      name: 'Traspaso de carro usado en Colombia',
      item: 'https://www.escaneapp.com/traspaso-carro-usado-colombia',
    },
  ],
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta el traspaso de un carro en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El costo total oscila entre $350.000 y más de $900.000 COP dependiendo del valor del carro. Se compone de los derechos de tránsito (aprox. $200.000 a $255.000 COP) más la retención en la fuente del 1% sobre el avalúo del carro.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Quién debe pagar el traspaso: el comprador o el vendedor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Por costumbre en Colombia, los derechos de tránsito y las improntas se dividen por mitad (50% comprador y 50% vendedor). La retención en la fuente del 1% le corresponde pagarla en su totalidad al vendedor.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué es el peligroso «traspaso abierto»?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'El traspaso abierto es vender o comprar un carro dejando el formulario en blanco sin registrar al nuevo dueño en el tránsito. Es muy peligroso: si el carro causa un accidente, el dueño que aún figura en el RUNT responde civil y penalmente con sus bienes y salarios.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué requisitos se necesitan para radicar el traspaso?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ambas personas inscritas en el RUNT con huella digital, paz y salvo del SIMIT (sin multas pendientes), impuesto vehicular del año pago, SOAT y tecnomecánica vigentes, y las improntas de motor y chasis.',
      },
    },
  ],
};

export default function TraspasoCarroUsadoPage() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-slate-800">
      {/* Marcado Schema.org */}
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
                Traspaso de carro usado en Colombia
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado Principal */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-900 border border-slate-200/90 font-mono font-semibold text-xs mb-3">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUÍA DE TRÁMITES Y COSTOS · COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            Traspaso de Carro Usado en Colombia: Costos, Requisitos y Paso a Paso
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            Comprar o vender un carro no se cierra con un apretón de manos ni con la entrega de las llaves. La ley colombiana dice que el carro solo es legalmente tuyo cuando el organismo de tránsito aprueba el traspaso en el RUNT. Conoce cuánto cuesta, quién debe pagar cada cosa y cómo evitar deudas ajenas.
          </p>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm mb-8">
            <Image
              src="/unnamed (1).jpg"
              alt="Firma de contrato de compraventa y trámite de traspaso de carro en Colombia"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* Resumen rápido */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Lo que debes tener claro antes de negociar:
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px] sm:min-w-[160px]">• Costo aproximado:</span>
                <span>Entre <strong>$350.000 y más de $1.000.000 COP</strong> (derechos de tránsito de ~$200.000-$255.000 más el 1% de retención en la fuente).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px] sm:min-w-[160px]">• ¿Quién paga qué?</span>
                <span>Por costumbre comercial, los derechos de tránsito se pagan <strong>mitad y mitad (50/50)</strong>. La retención del 1% la asume el <strong>vendedor</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px] sm:min-w-[160px]">• Requisitos previos:</span>
                <span>Comprador y vendedor deben estar a paz y salvo en el <strong>SIMIT (sin multas)</strong>, impuestos del año pagos y <strong>SOAT / Tecnomecánica</strong> cargados en RUNT.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[140px] sm:min-w-[160px]">• Regla de oro:</span>
                <span><strong>Jamás aceptes comprar ni vender con traspaso abierto.</strong> Es el error número uno que causa embargos de cuentas bancarias y problemas penales.</span>
              </li>
            </ul>
          </div>
        </header>

        {/* 1. Cuánto cuesta el traspaso y quién paga qué */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Cuánto cuesta el traspaso y cómo se divide el pago?
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Una de las dudas más frecuentes es quién debe pagar cada recibo en la ventanilla de movilidad. En Colombia, la costumbre mercantil avalada por las cámaras de comercio establece esta división:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200/90">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0F172A] text-white font-mono text-xs uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 sm:p-4">Concepto</th>
                  <th className="p-3.5 sm:p-4">Valor aproximado</th>
                  <th className="p-3.5 sm:p-4">¿Quién lo paga?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Derechos de Trámite de Traspaso
                    <span className="block text-[11px] font-normal text-slate-500">Lo cobra el Tránsito / VUS por expedir la nueva tarjeta</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">$195.000 – $255.000 COP</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                      50% Comprador / 50% Vendedor
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Retención en la Fuente (Impuesto DIAN)
                    <span className="block text-[11px] font-normal text-slate-500">1% sobre el valor del avalúo fiscal del carro</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">1% del avalúo (ej: $350.000 en carro de $35M)</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200">
                      100% Vendedor
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Toma de Improntas
                    <span className="block text-[11px] font-normal text-slate-500">Cintas adhesivas frotadas del motor y chasis</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">$25.000 – $45.000 COP</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200">
                      50% / 50%
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Certificado de Tradición del RUNT
                    <span className="block text-[11px] font-normal text-slate-500">Historial oficial de propietarios y embargos</span>
                  </td>
                  <td className="p-3.5 sm:p-4 font-mono font-bold text-slate-900">$35.000 – $42.000 COP</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                      100% Comprador
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Ejemplo práctico numérico */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Ejemplo real: Carro valorado en $40.000.000 COP
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                <span className="font-bold text-slate-900 block mb-1">Gasto para el VENDEDOR:</span>
                <p>• Retención en la fuente (1%): <strong>$400.000</strong></p>
                <p>• Mitad de derechos de tránsito: <strong>~$115.000</strong></p>
                <p>• Mitad de improntas: <strong>$15.000</strong></p>
                <p className="pt-1 text-sm font-black text-slate-900">Total vendedor: ~$530.000 COP</p>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200/90 space-y-1">
                <span className="font-bold text-slate-900 block mb-1">Gasto para el COMPRADOR:</span>
                <p>• Mitad de derechos de tránsito: <strong>~$115.000</strong></p>
                <p>• Mitad de improntas: <strong>$15.000</strong></p>
                <p>• Certificado de tradición / RUNT: <strong>$38.000</strong></p>
                <p className="pt-1 text-sm font-black text-slate-900">Total comprador: ~$168.000 COP</p>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Requisitos indispensables para radicar */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Los 6 requisitos indispensables para radicar el traspaso
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Si falta uno solo de estos documentos, en la ventanilla de tránsito te rebotarán el trámite:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                1. Registro activo en el RUNT
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tanto tú como el vendedor deben estar registrados previamente en el RUNT con su huella digital y cédula.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                2. Paz y salvo de multas (SIMIT)
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ni el carro ni ninguna de las dos personas pueden tener fotomultas o comparendos pendientes de pago.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                3. Impuestos del año al día
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                El impuesto vehicular del año en curso debe figurar como pagado en la Secretaría de Hacienda departamental.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                4. SOAT y Tecnomecánica vigentes
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ambos deben estar activos y cargados en el sistema del RUNT (no basta tener el papel impreso).
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                5. Formulario Único (FUN) e improntas
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                El formulario de solicitud de trámite firmado por las dos partes, con las improntas físicas de motor y chasis pegadas al respaldo.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                6. Levantamiento de prenda (si aplica)
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si el carro fue sacado a crédito, el banco debe haber expedido la carta de levantamiento de prenda y estar cargada en el RUNT.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Paso a paso para hacer el traspaso */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Paso a paso para hacer el trámite sin enredos
            </h2>
          </div>

          <div className="space-y-3">
            {[
              {
                num: '1',
                titulo: 'Revisa papeles antes de dar cualquier dinero',
                desc: 'Consulta en RUNT y SIMIT que el carro no tenga embargos ni multas. Nunca des adelantos en efectivo antes de verificar esto.',
              },
              {
                num: '2',
                titulo: 'Toma las improntas del carro',
                desc: 'Ve con el carro a un CDA o con un perito para que calque en cinta los números del motor y chasis. Deben ser idénticos a los de la tarjeta de propiedad.',
              },
              {
                num: '3',
                titulo: 'Firma el contrato de compraventa con fecha y hora',
                desc: 'Anota en el contrato la fecha y la hora exacta en la que entregas el carro. Si el comprador comete una fotomulta 20 minutos después, esa hora te salvará de pagar esa multa.',
              },
              {
                num: '4',
                titulo: 'Radica los documentos en el tránsito',
                desc: 'Pide cita en el organismo de tránsito (ej. VUS en Bogotá o tránsito del municipio donde esté matriculado). Acudan juntos, paguen los derechos en ventanilla y entreguen los papeles.',
              },
              {
                num: '5',
                titulo: 'Reclama la nueva tarjeta de propiedad',
                desc: 'En un plazo de 1 a 5 días hábiles, el tránsito emitirá la tarjeta nueva a nombre del comprador. En ese instante el negocio es 100% oficial y seguro.',
              },
            ].map((paso) => (
              <div key={paso.num} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-[#0F172A] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {paso.num}
                  </span>
                  <span className="font-bold text-sm text-slate-900">
                    {paso.titulo}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {paso.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. El peligro mortal del traspaso abierto */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-rose-700 text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              El error más peligroso: vender con traspaso abierto
            </h2>
          </div>

          <div className="p-5 rounded-xl bg-rose-50 border border-rose-200 space-y-3">
            <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
              Muchos vendedores dicen: <em>«Fírmeme el formulario en blanco y yo me encargo de hacer el traspaso cuando lo revenda»</em>. <strong>¡Nunca aceptes esto!</strong>
            </p>
            <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
              Mientras el carro no esté a nombre del nuevo comprador en el RUNT, <strong>tú sigues siendo el dueño legal ante los jueces</strong>. Si ese carro:
            </p>
            <ul className="text-xs sm:text-sm text-rose-950 space-y-1 list-disc list-inside">
              <li>Acumula millones de pesos en fotomultas o peajes sin pagar.</li>
              <li>Atropella a una persona o causa un accidente grave.</li>
              <li>Es utilizado en un atraco o transporte ilegal de mercancía.</li>
            </ul>
            <p className="text-xs sm:text-sm text-rose-950 font-bold pt-1">
              La Fiscalía y los jueces te embargarán a ti tu sueldo, tus cuentas bancarias y tu casa. Exige siempre radicar el traspaso con nombre y cédula del nuevo propietario.
            </p>
          </div>
        </section>

        {/* Cómo ayuda EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Chequea el carro antes de firmar con EscaneApp
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Nuestra herramienta gratuita te guía para revisar los papeles en RUNT, SIMIT y Fasecolda antes de hacer promesas de compraventa. Además, calcula los gastos ocultos del primer mes para que negocies con números reales.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Hacer chequeo de compra en mi celular</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            <h2 className="text-2xl font-black text-slate-900">
              Preguntas frecuentes sobre el traspaso
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Se puede hacer traspaso si el carro está matriculado en otra ciudad?',
                a: 'Sí. Se llama traspaso intermunicipal. Los documentos se envían al organismo de tránsito de origen o se gestionan a través de una ventanilla autorizada.',
              },
              {
                q: '¿Qué pasa si el dueño anterior falleció?',
                a: 'No se puede hacer un traspaso común. Los herederos deben hacer primero el trámite legal de sucesión ante un juzgado o notaría para poder poner el carro en venta.',
              },
              {
                q: '¿Las improntas se vencen?',
                a: 'No tienen fecha exacta de vencimiento legal, pero el tránsito rechaza improntas viejas, borrosas o despegadas. Se recomienda tomarlas con menos de 30 días de anticipación.',
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
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Antecedentes en RUNT y SIMIT
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cómo consultar multas, prendas y embargos judiciales paso a paso.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>COMPRA SEGURA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Comprueba el carro antes de firmar el traspaso
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Usa la lista interactiva de EscaneApp desde tu celular y asegura que tu inversión esté libre de sorpresas legales.
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
          <strong>Aviso de orientación:</strong> La información sobre tarifas y procedimientos de traspaso tiene fines orientativos y se fundamenta en las normas vigentes de tránsito en Colombia. Cada secretaría de movilidad municipal puede aplicar tarifas administrativas específicas.
        </p>
      </article>
    </div>
  );
}
