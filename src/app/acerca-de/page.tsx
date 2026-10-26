import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HeartHandshake,
  Database,
  ArrowRight,
  Car,
  Compass,
  Building2,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Acerca de EscaneApp | Nuestra Misión y Metodología Independiente',
  description:
    'Conoce qué es EscaneApp, por qué nació y cómo ayudamos a personas y familias en Colombia a revisar carros usados sin dejarse engañar y con total independencia.',
  alternates: {
    canonical: '/acerca-de',
  },
  openGraph: {
    title: 'Acerca de EscaneApp | Quiénes Somos y Metodología',
    description:
      'Herramienta gratuita e independiente para revisar carros usados en Colombia antes de comprar.',
    url: 'https://www.escaneapp.com/acerca-de',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/01_logo_horizontal_principal.png',
        width: 1200,
        height: 630,
        alt: 'Acerca de EscaneApp Colombia',
      },
    ],
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
      name: 'Acerca de EscaneApp',
      item: 'https://www.escaneapp.com/acerca-de',
    },
  ],
};

export default function AcercaDePage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-slate-800 antialiased py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ==================================================== */}
        {/* ENCABEZADO EDITORIAL HERO                            */}
        {/* ==================================================== */}
        <header className="space-y-4 border-b border-slate-200/90 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>TRANSPARENCIA E INDEPENDENCIA · COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Por qué creamos EscaneApp y cómo te protege al comprar carro
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
            Comprar un carro usado en Colombia no debería sentirse como una lotería ni requerir un título de mecánico. Construimos esta herramienta para poner de tu lado las preguntas correctas, los números claros y el poder de negociación.
          </p>
        </header>

        {/* ==================================================== */}
        {/* CARTA DE PRINCIPIOS (EDITORIAL CALLOUT)             */}
        {/* ==================================================== */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0">
              <Compass className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                NUESTRO PROPÓSITO
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                El dinero que ahorraste con tanto esfuerzo merece estar seguro
              </h2>
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            En el mercado de carros usados abundan trampas frecuentes: odómetros alterados para disimular un desgaste brutal, vehículos que fueron pérdida total en aseguradora y se vendieron maquillados, o compradores que firman promesas sin saber que el carro arrastra comparendos millonarios o embargos.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            <strong>EscaneApp nació para equilibrar la balanza.</strong> Te da una lista paso a paso de 80 puntos fáciles de revisar, te conecta con las bases oficiales del Estado y te calcula cuánto te costarían los arreglos para que puedas pedir un descuento justo o alejarte a tiempo de un mal negocio.
          </p>
        </div>

        {/* ==================================================== */}
        {/* PILARES FUNDAMENTALES (3 TARJETAS)                  */}
        {/* ==================================================== */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Nuestros tres pilares de trabajo</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pilar 1 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-200">
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">100% Independientes</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No compramos ni vendemos vehículos, ni recibimos comisiones de concesionarios o intermediarios. Nuestro único compromiso es darte una opinión honesta y objetiva.
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center border border-slate-200">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Fuentes Oficiales</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Te guiamos directamente hacia las plataformas oficiales en Colombia (RUNT, SIMIT, Fasecolda y MinTransporte) para que verifiques la legalidad sin intermediarios.
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center border border-amber-200">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Lenguaje Sencillo</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sin tecnicismos complicados. Traducimos conceptos mecánicos en consejos cotidianos que cualquier persona puede mirar, tocar y entender al lado del carro.
              </p>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* CLARIDAD TOTAL: LO QUE ES Y LO QUE NO ES            */}
        {/* ==================================================== */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-2xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              CLARIDAD Y RESPONSABILIDAD
            </span>
            <h2 className="text-xl font-bold text-slate-900">
              ¿Qué es y qué NO es EscaneApp?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Creemos en la honestidad radical sobre el alcance de nuestra plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lo que SÍ es */}
            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Lo que SÍ es EscaneApp</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                <li>Un <strong>filtro previo inteligente</strong> para descartar rápido carros sospechosos sin gastar plata en peritajes inútiles.</li>
                <li>Una <strong>guía de 80 puntos</strong> para saber exactamente qué revisar con tus propios ojos cuando vas a ver el vehículo.</li>
                <li>Una <strong>calculadora de descuentos</strong> para negociar el precio con el vendedor basándote en los desgastes que encontraste.</li>
                <li>Una estimación del <strong>costo real anual</strong> (SOAT, impuesto vehicular, gasolina y seguro).</li>
              </ul>
            </div>

            {/* Lo que NO es */}
            <div className="p-5 rounded-xl bg-rose-50/40 border border-rose-200 space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Lo que NO es EscaneApp</span>
              </div>
              <ul className="text-xs text-slate-700 space-y-2 list-disc list-inside leading-relaxed">
                <li><strong>No es un peritaje técnico oficial:</strong> no subimos el carro a elevador ni medimos compresión de cilindros.</li>
                <li><strong>No es una certificación judicial ni garantía:</strong> no garantizamos que el carro nunca falle.</li>
                <li><strong>No reemplaza al mecánico profesional:</strong> si el carro pasa tu revisión con buen puntaje, nuestro consejo siempre es llevarlo al CDA antes de dar el dinero.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* QUIÉN ESTÁ DETRÁS & CÓMO SE FINANCIA                 */}
        {/* ==================================================== */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <Building2 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">¿Quién desarrolla EscaneApp?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              EscaneApp es un proyecto tecnológico independiente creado en Colombia por <strong>AzulaDev</strong>. Nuestro equipo diseña herramientas digitales pensadas para empoderar al consumidor cotidiano con tecnología intuitiva y datos abiertos.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">¿Cómo se financia?</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              El uso de todas nuestras herramientas es y seguirá siendo <strong>100% gratuito</strong> para compradores. Para cubrir los costos de servidores e infraestructura, la plataforma puede incorporar publicidad no invasiva o enlaces informativos. Consulta nuestra{' '}
              <Link href="/politica-privacidad" className="font-semibold text-slate-900 underline hover:text-emerald-700">
                Política de Privacidad
              </Link>.
            </p>
          </div>
        </section>

        {/* ==================================================== */}
        {/* BANNER CTA FINAL                                     */}
        {/* ==================================================== */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-xs border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Empieza gratis hoy</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              ¿Vas a ver un carro usado esta semana?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Abre el evaluador en tu celular, haz la revisión paso a paso y negocia con total confianza.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap justify-center">
            <Link
              href="/evaluacion"
              className="h-11 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-xs flex items-center gap-2 transition-all active:scale-[0.98]"
            >
              <Car className="w-4 h-4 text-emerald-600" />
              <span>Iniciar revisión</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/contacto"
              className="h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-[0.98]"
            >
              <span>Escríbenos</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
