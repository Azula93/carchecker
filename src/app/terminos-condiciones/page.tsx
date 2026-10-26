import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Términos y Condiciones de Uso | EscaneApp Colombia',
  description:
    'Términos y condiciones de uso de EscaneApp. Conoce el alcance de nuestra herramienta de revisión preliminar y estimación de costos en Colombia.',
  alternates: {
    canonical: '/terminos-condiciones',
  },
  openGraph: {
    title: 'Términos y Condiciones | EscaneApp',
    description:
      'Términos y condiciones de uso de la plataforma EscaneApp Colombia.',
    url: 'https://www.escaneapp.com/terminos-condiciones',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/01_logo_horizontal_principal.png',
        width: 1200,
        height: 630,
        alt: 'Términos y Condiciones EscaneApp',
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
      name: 'Términos y Condiciones',
      item: 'https://www.escaneapp.com/terminos-condiciones',
    },
  ],
};

export default function TerminosCondicionesPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-slate-800 antialiased py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ==================================================== */}
        {/* ENCABEZADO EDITORIAL                                 */}
        {/* ==================================================== */}
        <header className="space-y-4 border-b border-slate-200/90 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>TRANSPARENCIA LEGAL · CONDICIONES DE USO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Términos y Condiciones de Uso
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Última actualización: 2026 · Plataforma independiente desarrollada en Colombia por AzulaDev.
          </p>
        </header>

        {/* ==================================================== */}
        {/* RESUMEN CLARO (EDITORIAL CALLOUT)                    */}
        {/* ==================================================== */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center shrink-0 border border-slate-700">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                LO MÁS IMPORTANTE
              </span>
              <h2 className="text-lg font-bold text-white">
                Resumen de 1 minuto para compradores
              </h2>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-300 space-y-2.5 leading-relaxed">
            <p>
              1. <strong>EscaneApp es una guía de inspección previa:</strong> Te sirve para revisar con tus propios ojos, descartar rápido carros con problemas graves y negociar un descuento justo con el vendedor.
            </p>
            <p>
              2. <strong>No reemplaza un peritaje oficial:</strong> Si el carro pasa tu revisión con buen puntaje, nuestro consejo siempre es llevarlo a un Centro de Diagnóstico Automotor (CDA) con elevador y escáner antes de firmar o pagar.
            </p>
            <p>
              3. <strong>Uso 100% gratuito:</strong> No te cobramos por evaluar ni te pedimos dinero por consultar las calculadoras.
            </p>
          </div>
        </div>

        {/* ==================================================== */}
        {/* ARTÍCULOS Y CLÁUSULAS COMPLETAS                      */}
        {/* ==================================================== */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-2xs space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          {/* Cláusula 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">1</span>
              <span>Aceptación de los términos</span>
            </h2>
            <p>
              Al ingresar, navegar o utilizar las herramientas interactivas de EscaneApp (incluyendo el Wizard de Evaluación, calculadoras de costos, liquidador de impuestos y guías técnicas), aceptas cumplir estos Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, te invitamos a abstenerte de utilizar la plataforma.
            </p>
          </section>

          {/* Cláusula 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">2</span>
              <span>Naturaleza y alcance del servicio</span>
            </h2>
            <p>
              EscaneApp es una herramienta tecnológica informativa de orientación preliminar. Su propósito es ayudar al comprador a organizar su inspección visual y contrastar antecedentes legales básicos.
            </p>
            <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-xs text-amber-900 space-y-1.5">
              <span className="font-bold block">Aviso Legal Expreso:</span>
              <p>
                EscaneApp <strong>no constituye ni reemplaza un peritaje técnico o mecánico formal, ni un dictamen judicial, ni una certificación de asegurabilidad, ni una garantía comercial</strong> sobre el estado presente o futuro del vehículo.
              </p>
            </div>
          </section>

          {/* Cláusula 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">3</span>
              <span>Puntuaciones, cálculos y estimaciones económicas</span>
            </h2>
            <p>
              Los puntajes de 0 a 100, veredictos (&ldquo;Buena opción&rdquo;, &ldquo;Peligro / No comprar&rdquo;), cálculos de repuestos y propuestas de descuento para negociación son estimaciones pedagógicas elaboradas a partir de los datos que tú mismo introduces y de valores de referencia del mercado automotor colombiano.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Cada vehículo usado es único y su valor comercial final depende del acuerdo libre entre comprador y vendedor. EscaneApp no se hace responsable por las negociaciones o acuerdos que pactes con terceros.
            </p>
          </section>

          {/* Cláusula 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">4</span>
              <span>Enlaces a portales oficiales de Colombia</span>
            </h2>
            <p>
              La plataforma enlaza a sitios web de consulta pública y oficial (RUNT, SIMIT, Fasecolda, Secretarías de Movilidad). Dichas entidades son las únicas responsables por la exactitud, actualización y disponibilidad de sus bases de datos. EscaneApp no altera ni certifica la información proveniente de esos servidores externos.
            </p>
          </section>

          {/* Cláusula 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">5</span>
              <span>Responsabilidad del usuario y deber de diligencia</span>
            </h2>
            <p>
              Como comprador o usuario, eres el único responsable de verificar físicamente la tarjeta de propiedad, confrontar la cédula del vendedor contra el certificado de tradición y libertad del RUNT, comprobar que no existan regrabaciones de chasis o motor ante la DIJIN y solicitar el peritaje técnico presencial en un CDA debidamente autorizado por el Ministerio de Transporte.
            </p>
          </section>

          {/* Cláusula 6 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">6</span>
              <span>Propiedad intelectual</span>
            </h2>
            <p>
              El código fuente, arquitectura de evaluación, diseño visual, textos de las guías, algoritmos de cálculo, logotipos y marcas de EscaneApp son propiedad de <strong>AzulaDev</strong> y están protegidos por las leyes de propiedad intelectual de Colombia y tratados internacionales. Queda prohibida su reproducción no autorizada con fines comerciales.
            </p>
          </section>

          {/* Cláusula 7 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">7</span>
              <span>Contacto y dudas legales</span>
            </h2>
            <p>
              Si tienes preguntas respecto a estos términos, puedes escribirnos a nuestro canal de soporte:{' '}
              <a
                href="mailto:azuladev93@gmail.com"
                className="font-mono font-bold text-slate-900 underline hover:text-emerald-700"
              >
                azuladev93@gmail.com
              </a>{' '}
              o a través de nuestra página de{' '}
              <Link
                href="/contacto"
                className="font-semibold text-slate-900 underline hover:text-emerald-700"
              >
                Contacto
              </Link>.
            </p>
          </section>
        </div>

        {/* ==================================================== */}
        {/* BANNER COMPLEMENTARIO                                */}
        {/* ==================================================== */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>¿Quieres conocer cómo protegemos tus datos personales?</span>
          </div>
          <Link
            href="/politica-privacidad"
            className="font-bold text-slate-900 hover:text-emerald-700 underline shrink-0 font-mono"
          >
            Ver Política de Privacidad →
          </Link>
        </div>
      </article>
    </div>
  );
}
