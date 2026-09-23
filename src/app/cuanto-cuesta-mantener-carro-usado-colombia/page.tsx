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
    <main className="w-full bg-[#F8FAFC]">
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        {/* ==================================================== */}
        {/* MIGAS DE PAN (Breadcrumbs)                           */}
        {/* ==================================================== */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
            <li>
              <Link href="/" className="hover:text-[#0F1B2B] transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="text-[#0F1B2B] font-medium">
                Costo de mantener un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* ==================================================== */}
        {/* HERO                                                 */}
        {/* ==================================================== */}
        <header className="mb-8">
          <p className="text-xs sm:text-sm font-mono font-semibold text-[#166534] mb-2.5 tracking-wide">
            GUÍA CAR CHECKER · COSTOS Y MANTENIMIENTO
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1B2B] leading-tight mb-4">
            ¿Cuánto cuesta mantener un carro usado en Colombia?
          </h1>

          <p className="text-base sm:text-lg text-[#475569] leading-relaxed max-w-3xl">
            Comprar un carro usado no significa únicamente pagar el precio de compra. Durante su tenencia y uso aparecen gastos obligatorios y operativos que debes presupuestar para no llevarte sorpresas.
          </p>
        </header>

        {/* ==================================================== */}
        {/* INTRODUCCIÓN BREVE                                  */}
        {/* ==================================================== */}
        <section className="mb-8 text-sm sm:text-base text-slate-700 leading-relaxed space-y-3">
          <p>
            El costo real de un vehículo depende de cuatro factores clave: las <strong>obligaciones legales</strong> (SOAT, impuesto y tecnomecánica), los <strong>gastos de uso</strong> (gasolina y parqueadero), el <strong>mantenimiento mecánico</strong> y la <strong>financiación</strong> si lo compras con crédito.
          </p>
        </section>

        {/* ==================================================== */}
        {/* ¿CUÁNTO ME VA A COSTAR REALMENTE? (Herramienta)     */}
        {/* ==================================================== */}
        <section id="calculadora" className="scroll-mt-6 mb-14">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 sm:p-8 md:p-10 shadow-xs mb-8">
            <div className="border-b border-[#E2E8F0] pb-6 mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-mono font-semibold mb-3">
                <Calculator className="w-3.5 h-3.5" />
                <span>HERRAMIENTA INTERACTIVA DE COSTOS</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F1B2B]">
                ¿Cuánto me va a costar realmente?
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] mt-1.5 leading-relaxed max-w-2xl">
                Calcula una estimación de los gastos que tendrás que asumir para usar y mantener un vehículo durante un año con tarifas oficiales vigentes y valores personalizables.
              </p>
            </div>

            {/* Componente Interactivo Central */}
            <CalculadoraCostoReal />
          </div>
        </section>

        {/* ==================================================== */}
        {/* CONSEJOS PARA REDUCIR EL COSTO                       */}
        {/* ==================================================== */}
        <section className="mb-14">
          <div className="mb-6">
            <span className="text-xs font-mono font-semibold text-[#166534] uppercase tracking-wider block mb-1">
              RECOMENDACIONES PRÁCTICAS
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F1B2B]">
              Consejos para reducir el costo de mantener un carro usado
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* Consejo 1 */}
            <div className="bg-white rounded-xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-colors">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white font-mono text-xs font-bold shrink-0">
                    1
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F1B2B]">
                    Revisa el estado del vehículo antes de comprar
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-9">
                  Un carro que requiera cambio urgente de llantas, embrague o suspensión puede costarte millones adicionales en sus primeros meses. Consulta nuestra guía sobre{' '}
                  <Link
                    href="/que-revisar-carro-usado"
                    className="font-semibold text-[#166534] hover:underline underline-offset-4"
                  >
                    qué revisar en un carro usado →
                  </Link>
                </p>
              </div>
            </div>

            {/* Consejo 2 */}
            <div className="bg-white rounded-xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-colors">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white font-mono text-xs font-bold shrink-0">
                    2
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F1B2B]">
                    Consulta los antecedentes antes de pagar
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-9">
                  Asegúrate de que el vehículo esté al día en impuestos y no arrastre multas o embargos. Aprende cómo{' '}
                  <Link
                    href="/antecedentes-vehiculo-colombia"
                    className="font-semibold text-[#166534] hover:underline underline-offset-4"
                  >
                    consultar antecedentes de un vehículo en Colombia →
                  </Link>
                </p>
              </div>
            </div>

            {/* Consejo 3 */}
            <div className="bg-white rounded-xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-colors">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white font-mono text-xs font-bold shrink-0">
                    3
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F1B2B]">
                    Conduce de forma eficiente
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-9">
                  Evitar aceleraciones bruscas, mantener la presión adecuada en las llantas y reducir peso innecesario puede disminuir el consumo real de gasolina entre un 10% y un 20% mensual.
                </p>
              </div>
            </div>

            {/* Consejo 4 */}
            <div className="bg-white rounded-xl border border-[#CBD5E1] p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:border-slate-400 transition-colors">
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white font-mono text-xs font-bold shrink-0">
                    4
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F1B2B]">
                    No descuides los cambios de aceite
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed pl-9">
                  El mantenimiento preventivo programado es hasta 5 veces más económico que reparar daños mayores en motor o transmisión provocados por lubricación deficiente.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* PREGUNTAS FRECUENTES (FAQ con Acordeones)            */}
        {/* ==================================================== */}
        <section className="mb-14">
          <div className="mb-6">
            <span className="text-xs font-mono font-semibold text-[#166534] uppercase tracking-wider block mb-1">
              RESOLUCIÓN DE DUDAS
            </span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0F1B2B]">
              Preguntas frecuentes sobre el costo de mantener un carro en Colombia
            </h2>
          </div>

          <FaqAccordion items={FAQ_ITEMS} />
        </section>

        {/* ==================================================== */}
        {/* TAMBIÉN TE PUEDE INTERESAR                           */}
        {/* ==================================================== */}
        <section className="mb-14 border-t border-[#E2E8F0] pt-8">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B] mb-5">
            También te puede interesar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/que-revisar-carro-usado"
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#0F1B2B] mb-1.5 group-hover:text-[#166534] transition-colors">
                Qué revisar en un carro usado
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Lista de inspección de motor, carrocería, frenos e interiores antes de comprar.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#0F1B2B] mb-1.5 group-hover:text-[#166534] transition-colors">
                Revisión del kilometraje
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Aprende a interpretar el kilometraje real anual y compararlo con el desgaste físico.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#0F1B2B] mb-1.5 group-hover:text-[#166534] transition-colors">
                Antecedentes del vehículo
              </h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Historial de siniestros, embargos, comparendos pendientes y limitaciones a la propiedad.
              </p>
            </Link>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CTA FINAL: INICIAR EVALUACIÓN                        */}
        {/* ==================================================== */}
        <section className="rounded-2xl bg-[#0F1B2B] px-6 py-8 sm:px-10 sm:py-10 text-center mb-8 shadow-md">
          <div className="max-w-xl mx-auto space-y-3">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
              ¿Estás pensando comprar un carro usado?
            </h2>

            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed">
              Evalúalo antes de comprarlo con CarChecker. Detecta alertas mecánicas, kilometrajes sospechosos y antecedentes legales en minutos.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-lg bg-white text-[#0F1B2B] text-sm font-semibold hover:bg-slate-100 transition-colors shadow-xs"
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
        <p className="text-[11px] text-[#64748B] leading-relaxed text-center sm:text-left">
          <strong>Aviso de orientación:</strong> Los cálculos y referencias presentados en este portal corresponden a estimaciones promedio basadas en datos oficiales vigentes en Colombia. No constituyen una cotización vinculante ni reemplazan una inspección mecánica o peritaje profesional presencial.
        </p>
      </div>
    </main>
  );
}
