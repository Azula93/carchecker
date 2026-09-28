import Link from 'next/link';
import type { Metadata } from 'next';
import { CalculadoraCostoReal } from '@/components/calculator/CalculadoraCostoReal';
import { FaqAccordion, FaqItem } from '@/components/calculator/FaqAccordion';
import { Calculator, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
  description:
    'Calcula cuánto cuesta realmente mantener un carro usado en Colombia. Incluye gasolina con precios CREG, SOAT oficial SFC, tecnomecánica, impuesto vehicular, mantenimiento y financiación.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia',
  },
  openGraph: {
    title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
    description:
      'Calcula cuánto cuesta realmente mantener un carro usado en Colombia. Incluye gasolina, SOAT, tecnomecánica, impuesto vehicular, mantenimiento y financiación.',
    url: 'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia',
    siteName: 'Car Checker Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

const FAQ_ITEMS: FaqItem[] = [
  {
    pregunta: '¿Cuánto cuesta mantener un carro usado al año en Colombia?',
    respuesta:
      'El costo total anual de mantener un automóvil particular de gama media suele ubicarse entre $9.000.000 y $15.000.000 COP al año (aproximadamente $750.000 a $1.250.000 COP al mes), considerando un recorrido promedio de 12.000 km al año, combustible, SOAT, tecnomecánica, impuesto vehicular, mantenimiento preventivo y parqueadero.',
  },
  {
    pregunta: '¿Qué gastos debo tener en cuenta al comprar un carro usado?',
    respuesta:
      'Debes diferenciar entre costos obligatorios de tenencia (SOAT, impuesto vehicular y tecnomecánica), costos directos de uso (gasolina, parqueadero, peajes y lavado), mantenimiento preventivo programado (cambio de aceite y filtros), y un fondo de reserva para imprevistos mecánicos (llantas, batería, suspensión y frenos). Si compras mediante crédito, debes añadir la cuota de financiación mensual.',
  },
  {
    pregunta: '¿El SOAT está incluido en el costo anual?',
    respuesta:
      'Sí. El SOAT es un seguro obligatorio de pago único anual expedido bajo tarifas fijadas por la Superintendencia Financiera de Colombia (SFC). En la herramienta lo calculamos como parte del costo anual y mostramos su provisión mensual únicamente como ayuda para presupuestar tus finanzas personales.',
  },
  {
    pregunta: '¿El impuesto vehicular se paga mensualmente?',
    respuesta:
      'No. El impuesto sobre vehículos automotores es una obligación tributaria que se cancela una sola vez al año ante la Secretaría de Hacienda de tu departamento o distrito. La cifra mensual que muestra la calculadora es un equivalente de referencia para que reserves periódicamente el dinero de ese pago.',
  },
  {
    pregunta: '¿Cuánto cuesta la revisión tecnomecánica?',
    respuesta:
      'El costo suele ubicarse en un rango de $280.000 a $350.000 COP al año en Centros de Diagnóstico Automotor (CDA) autorizados por el Ministerio de Transporte. En vehículos particulares nuevos empieza a exigirse al cumplir el quinto o sexto año desde su fecha de matrícula inicial.',
  },
  {
    pregunta: '¿Cuánto debería reservar para reparaciones imprevistas en un carro usado?',
    respuesta:
      'Para un carro usado de más de 4 años de antigüedad se recomienda reservar entre $100.000 y $200.000 COP al mes ($1.200.000 a $2.400.000 COP al año). Este fondo amortigua gastos eventuales por desgaste natural como pastillas de freno, embrague, amortiguadores o cambio de batería.',
  },
];

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia#article',
  headline: '¿Cuánto cuesta mantener un carro usado en Colombia?',
  description:
    'Calcula cuánto cuesta realmente mantener un carro usado en Colombia con tarifas oficiales de SOAT, impuestos, gasolina CREG y mantenimiento.',
  url: 'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia',
  inLanguage: 'es-CO',
  isPartOf: {
    '@id': 'https://carchecker.kodiquett.com/#webapp',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Car Checker',
    url: 'https://carchecker.kodiquett.com',
  },
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
    <main className="w-full bg-[#F7F9FA] min-h-screen">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ==================================================== */}
        {/* MIGAS DE PAN (Breadcrumbs)                           */}
        {/* ==================================================== */}
        <nav aria-label="Migas de pan" className="mb-6 print:hidden">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#66727D]">
            <li>
              <Link href="/" className="hover:text-[#123B5D] transition-colors font-medium">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <Calculator className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA ESCANEAPP · COSTOS & MANTENIMIENTO TCO</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            ¿Cuánto cuesta mantener un carro usado en Colombia?
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl">
            Comprar un carro usado no significa únicamente pagar el precio de venta. Durante su tenencia y uso aparecen gastos obligatorios y operativos que debes presupuestar para no llevarte sorpresas.
          </p>
        </header>

        {/* ==================================================== */}
        {/* INTRODUCCIÓN BREVE                                  */}
        {/* ==================================================== */}
        <section className="mb-10 text-sm sm:text-base text-[#475569] leading-relaxed space-y-3 bg-white border border-[#CBD5E1] p-5 sm:p-6 rounded-2xl shadow-xs print:hidden">
          <p>
            El costo real de un vehículo depende de cuatro factores clave: las <strong className="text-[#17212B]">obligaciones legales</strong> (SOAT, impuesto vehicular y tecnomecánica), los <strong className="text-[#17212B]">gastos directos de uso</strong> (gasolina oficial CREG, parqueadero, peajes y lavado), el <strong className="text-[#17212B]">mantenimiento preventivo e imprevistos</strong> y la <strong className="text-[#17212B]">financiación</strong> si adquieres el vehículo mediante crédito vehicular.
          </p>
        </section>

        {/* ==================================================== */}
        {/* ¿CUÁNTO ME VA A COSTAR REALMENTE? (Herramienta)     */}
        {/* ==================================================== */}
        <section id="calculadora" className="scroll-mt-6 mb-16">
          <div className="border-b border-[#E2E8F0] pb-4 mb-8 print:hidden">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8BCF3F]/20 text-[#123B5D] text-xs font-mono font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#2EAD68] animate-pulse"></span>
              <span>CALCULADORA INTERACTIVA DE COSTO TOTAL</span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#17212B]">
              Calcula el costo real de tu próximo carro
            </h2>
            <p className="text-xs sm:text-sm text-[#66727D] mt-1.5 leading-relaxed max-w-2xl">
              Estima los gastos reales que asumirás durante un año completo con tarifas oficiales vigentes y parámetros 100% personalizables.
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
            <span className="text-xs font-mono font-bold text-[#123B5D] uppercase tracking-wider block mb-1">
              RECOMENDACIONES PRÁCTICAS
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#17212B]">
              Consejos para reducir el costo de mantener un carro usado
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Consejo 1 */}
            <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#123B5D]/40 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#123B5D] text-white font-mono text-xs font-bold shrink-0">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#17212B]">
                    Revisa el estado del vehículo antes de comprar
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed pl-9">
                  Un carro que requiera cambio urgente de llantas, embrague o suspensión puede costarte millones adicionales en sus primeros meses. Consulta nuestra guía sobre{' '}
                  <Link
                    href="/que-revisar-carro-usado"
                    className="font-bold text-[#123B5D] hover:underline underline-offset-4"
                  >
                    qué revisar en un carro usado →
                  </Link>
                </p>
              </div>
            </div>

            {/* Consejo 2 */}
            <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#123B5D]/40 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#123B5D] text-white font-mono text-xs font-bold shrink-0">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#17212B]">
                    Consulta los antecedentes antes de pagar
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed pl-9">
                  Asegúrate de que el vehículo esté al día en impuestos y no arrastre multas o embargos. Aprende cómo{' '}
                  <Link
                    href="/antecedentes-vehiculo-colombia"
                    className="font-bold text-[#123B5D] hover:underline underline-offset-4"
                  >
                    consultar antecedentes de un vehículo en Colombia →
                  </Link>
                </p>
              </div>
            </div>

            {/* Consejo 3 */}
            <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#123B5D]/40 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#123B5D] text-white font-mono text-xs font-bold shrink-0">
                    3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#17212B]">
                    Conduce de forma eficiente
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed pl-9">
                  Evitar aceleraciones bruscas, mantener la presión adecuada en las llantas y reducir peso innecesario puede disminuir el consumo real de gasolina entre un 10% y un 20% mensual.
                </p>
              </div>
            </div>

            {/* Consejo 4 */}
            <div className="bg-white rounded-2xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-[#123B5D]/40 transition-all">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#123B5D] text-white font-mono text-xs font-bold shrink-0">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#17212B]">
                    No descuides los cambios de aceite
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed pl-9">
                  El mantenimiento preventivo programado es hasta 5 veces más económico que reparar daños mayores en motor o transmisión provocados por lubricación deficiente.
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
            <span className="text-xs font-mono font-bold text-[#123B5D] uppercase tracking-wider block mb-1">
              RESOLUCIÓN DE DUDAS
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#17212B]">
              Preguntas frecuentes sobre el costo de mantener un carro en Colombia
            </h2>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </section>

        {/* ==================================================== */}
        {/* TAMBIÉN TE PUEDE INTERESAR                           */}
        {/* ==================================================== */}
        <section className="mb-16 border-t border-[#CBD5E1] pt-10 print:hidden">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#66727D] font-bold block mb-1">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17212B] mb-6">
            También te puede interesar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <Link
              href="/que-revisar-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-6 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                Qué revisar en un carro usado
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Lista de inspección de motor, carrocería, frenos e interiores antes de comprar.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-6 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                Revisión del kilometraje
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Aprende a interpretar el kilometraje real anual y compararlo con el desgaste físico.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-6 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                Antecedentes del vehículo
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Historial de siniestros, embargos, comparendos pendientes y limitaciones a la propiedad.
              </p>
            </Link>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CTA FINAL: INICIAR EVALUACIÓN                        */}
        {/* ==================================================== */}
        <section className="rounded-2xl bg-[#123B5D] px-6 py-10 sm:px-12 sm:py-12 text-center mb-10 shadow-md print:hidden">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-snug">
              ¿Estás pensando comprar un carro usado?
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Evalúalo antes de comprarlo con EscaneApp. Detecta alertas mecánicas, kilometrajes sospechosos y antecedentes legales en minutos.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-xl bg-[#8BCF3F] hover:bg-[#7ab837] text-[#123B5D] text-sm font-extrabold transition-all shadow-sm active:scale-98"
              >
                <span>Iniciar evaluación</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* AVISO DE ALCANCE LEGAL                              */}
        {/* ==================================================== */}
        <p className="text-[11px] text-[#66727D] leading-relaxed text-center sm:text-left print:hidden">
          <strong>Aviso de orientación:</strong> Los cálculos y referencias presentados en este portal corresponden a estimaciones promedio basadas en datos oficiales vigentes en Colombia. No constituyen una cotización vinculante ni reemplazan una inspección mecánica o peritaje profesional presencial.
        </p>
      </div>
    </main>
  );
}
