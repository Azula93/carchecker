import Link from 'next/link';
import type { Metadata } from 'next';
import { CalculadoraCostoReal } from '@/components/calculator/CalculadoraCostoReal';
import { FaqAccordion, FaqItem } from '@/components/calculator/FaqAccordion';
import { Calculator, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
  description:
    'Calcula cuánto cuesta mantener un carro usado en Colombia: gasolina, SOAT, tecnomecánica, impuesto vehicular, repuestos y crédito automotriz.',
  alternates: {
    canonical: '/cuanto-cuesta-mantener-carro-usado-colombia',
  },
  openGraph: {
    title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
    description:
      'Calcula cuánto cuesta mantener un carro usado en Colombia: gasolina, SOAT, tecnomecánica, impuestos y mantenimiento.',
    url: 'https://www.escaneapp.com/cuanto-cuesta-mantener-carro-usado-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/pexels-mikebird-20475010.jpg',
        width: 1200,
        height: 630,
        alt: 'Calculadora de costos para mantener un carro usado en Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
    description:
      'Calcula cuánto cuesta mantener un carro usado en Colombia: gasolina, SOAT, tecnomecánica, impuestos y mantenimiento.',
    images: ['/pexels-mikebird-20475010.jpg'],
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    pregunta: '¿Cuánto cuesta mantener un carro usado al año en Colombia?',
    respuesta:
      'En promedio, mantener un carro estándar en Colombia cuesta entre $750.000 y $1.250.000 COP al mes (entre $9.000.000 y $15.000.000 COP al año). Esto incluye gasolina (calculando unos 1.000 km al mes), papeles obligatorios (SOAT, impuesto y tecnomecánica), cambios de aceite periódicos y parqueadero.',
  },
  {
    pregunta: '¿Qué gastos debo tener en cuenta al comprar un carro usado?',
    respuesta:
      'Debes tener en cuenta 4 grupos de gastos: 1) Papeles que exige la ley para rodar (SOAT, impuesto vehicular y tecnomecánica), 2) Gastos del día a día (gasolina, parqueadero, peajes y lavadas), 3) Mantenimiento básico (cambio de aceite y filtros cada 5.000 o 10.000 km), y 4) Un ahorro para imprevistos (batería, llantas o frenos). Si vas a comprar con préstamo, debes sumar la cuota mensual del banco.',
  },
  {
    pregunta: '¿El SOAT está incluido en el costo anual?',
    respuesta:
      'Sí. El SOAT es un seguro obligatorio que se paga completo una sola vez al año. En nuestra calculadora te mostramos el valor dividido entre 12 meses únicamente para que sepas cuánta plata guardar mes a mes y no te tome por sorpresa cuando se venza.',
  },
  {
    pregunta: '¿El impuesto del carro se paga mensual?',
    respuesta:
      'No. El impuesto sobre el vehículo se cancela una sola vez al año ante la gobernación o alcaldía donde esté matriculada la placa. Mostramos el valor mensual como una ayuda para que puedas ir guardando el dinero poco a poco durante el año.',
  },
  {
    pregunta: '¿Cuánto debería ahorrar para arreglos y repuestos de un carro usado?',
    respuesta:
      'Para un carro usado con más de 4 años de uso se recomienda guardar entre $100.000 y $150.000 COP al mes en una alcancía o cuenta. Así, cuando toque cambiar llantas, batería o pastillas de frenos, tendrás la plata lista sin desacomodar tu bolsillo ni endeudarte.',
  },
];

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://www.escaneapp.com/cuanto-cuesta-mantener-carro-usado-colombia#article',
  headline: '¿Cuánto cuesta mantener un carro usado en Colombia?',
  description:
    'Calcula cuánto cuesta realmente mantener un carro usado en Colombia con tarifas oficiales de SOAT, impuestos, gasolina CREG y mantenimiento.',
  url: 'https://www.escaneapp.com/cuanto-cuesta-mantener-carro-usado-colombia',
  inLanguage: 'es-CO',
  datePublished: '2025-01-25T08:00:00+00:00',
  dateModified: '2026-10-15T12:00:00+00:00',
  image: 'https://www.escaneapp.com/pexels-mikebird-20475010.jpg',
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
      name: 'Cuánto cuesta mantener un carro usado',
      item: 'https://www.escaneapp.com/cuanto-cuesta-mantener-carro-usado-colombia',
    },
  ],
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question',
    name: item.pregunta,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.respuesta,
    },
  })),
};

export default function CuantoCuestaMantenerCarroUsadoPage() {
  return (
    <div className="w-full bg-[#F7F9FA] min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ==================================================== */}
        {/* MIGAS DE PAN (Breadcrumbs)                           */}
        {/* ==================================================== */}
        <nav aria-label="Migas de pan" className="mb-6 print:hidden">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#66727D]">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="text-[#17212B] font-bold">
                Costo de mantener un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* ==================================================== */}
        {/* HERO                                                 */}
        {/* ==================================================== */}
        <header className="mb-10 print:hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 font-mono font-semibold text-xs mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUÍA PRÁCTICA · COSTO DE MANTENER TU CARRO EN COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-tight mb-4">
            ¿Cuánto cuesta mantener un carro usado en Colombia?
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Comprar un carro usado va más allá del precio que te pide el vendedor. Descubre cuánto gastarás al mes en gasolina, papeles obligatorios y repuestos para saber si se acomoda a tu presupuesto antes de comprarlo.
          </p>
        </header>

        {/* ==================================================== */}
        {/* ¿CUÁNTO ME VA A COSTAR REALMENTE? (Herramienta)     */}
        {/* ==================================================== */}
        <section id="calculadora" className="scroll-mt-6 mb-16">
          <div className="border-b border-slate-200 pb-4 mb-8 print:hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>CALCULADORA DE GASTOS MES A MES</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              Calcula los gastos de tu próximo carro
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed max-w-2xl">
              Calcula con tarifas oficiales vigentes y ajusta los valores según tus recorridos y tu ciudad.
            </p>
          </div>

          {/* Componente Interactivo Central con Grid de 2 Columnas y Sidebar Sticky */}
          <CalculadoraCostoReal />
        </section>

        {/* ==================================================== */}
        {/* CONSEJOS PARA REDUCIR EL COSTO                       */}
        {/* ==================================================== */}
        <section className="mb-16 print:hidden">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
              CONSEJOS ÚTILES
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              Consejos para no gastar de más al tener un carro usado
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Consejo 1 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold shrink-0">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Revisa el estado mecánico antes de comprar
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                  Un carro que tenga llantas gastadas, frenos acabados o fugas de aceite puede costarte millones de pesos en sus primeros meses. Consulta nuestra guía sobre{' '}
                  <Link
                    href="/costo-peritaje-colombia"
                    className="font-bold text-slate-900 hover:underline underline-offset-4"
                  >
                    cuánto vale un peritaje en Colombia →
                  </Link>
                </p>
              </div>
            </div>

            {/* Consejo 2 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold shrink-0">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Revisa multas y papeles antes de soltar un peso
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                  Asegúrate de que el carro esté a paz y salvo en impuestos y no arrastre comparendos o embargos del dueño anterior. Aprende cómo{' '}
                  <Link
                    href="/antecedentes-vehiculo-colombia"
                    className="font-bold text-slate-900 hover:underline underline-offset-4"
                  >
                    consultar antecedentes de un carro en Colombia →
                  </Link>
                </p>
              </div>
            </div>

            {/* Consejo 3 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold shrink-0">
                    3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Maneja suave y cuida el aire de las llantas
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                  Evitar acelerones bruscos, mantener las llantas con la presión correcta y no cargar peso innecesario en el baúl te puede ahorrar hasta un 20% de gasolina cada mes.
                </p>
              </div>
            </div>

            {/* Consejo 4 */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold shrink-0">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    Cambia el aceite a tiempo
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-9">
                  Un cambio de aceite a tiempo cuesta poco; reparar un motor desbielado o fundido por falta de lubricación cuesta millones de pesos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* PREGUNTAS FRECUENTES (FAQ con Acordeones)            */}
        {/* ==================================================== */}
        <section className="mb-16 print:hidden">
          <div className="mb-6">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
              PREGUNTAS FRECUENTES
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              Dudas comunes sobre el costo de mantener un carro en Colombia
            </h2>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </section>

        {/* ==================================================== */}
        {/* TAMBIÉN TE PUEDE INTERESAR                           */}
        {/* ==================================================== */}
        <section className="mb-16 border-t border-slate-200 pt-10 print:hidden">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
            GUÍAS RELACIONADAS
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Otras guías recomendadas para compradores
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              href="/costo-peritaje-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-slate-400 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Cuánto cuesta un peritaje
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Precios de peritaje en Colombia, qué revisan y qué preguntas hacerle al técnico.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-slate-400 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Revisión del kilometraje
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Aprende a saber si le bajaron el kilometraje al carro comparándolo con el desgaste real.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-6 hover:border-slate-400 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors">
                Antecedentes del vehículo
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Historial de choques, embargos, multas pendientes y problemas de papeles.
              </p>
            </Link>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CTA FINAL: INICIAR EVALUACIÓN                        */}
        {/* ==================================================== */}
        <section className="rounded-3xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center mb-10 shadow-md print:hidden border border-slate-800">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-snug">
              ¿Vas a ver o comprar un carro usado?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              No compres a ciegas. Usa nuestra herramienta paso a paso para detectar arreglos pendientes, multas viejas y calcular el descuento justo que debes pedirle al vendedor.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Hacer revisión de compra</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* AVISO DE ALCANCE LEGAL                              */}
        {/* ==================================================== */}
        <p className="text-[11px] text-slate-500 leading-relaxed text-center sm:text-left print:hidden">
          <strong>Aviso informativo:</strong> Los cálculos y referencias presentados son estimaciones promedio basadas en datos oficiales vigentes en Colombia. Te sirven de guía para planear tu presupuesto de compra, pero no sustituyen una revisión mecánica o peritaje presencial.
        </p>
      </div>
    </div>
  );
}
