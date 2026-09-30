import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  HelpCircle,
  Bug,
  MessageSquareQuote,
  Mail,
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ContactForm } from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto | EscaneApp',
  description:
    'Ponte en contacto con EscaneApp para resolver dudas, reportar errores o compartir sugerencias sobre nuestra herramienta para evaluar vehículos usados.',
  alternates: {
    canonical: 'https://carchecker.kodiquett.com/contacto',
  },
  openGraph: {
    title: 'Contacto | EscaneApp',
    description:
      'Ponte en contacto con EscaneApp para resolver dudas, reportar errores o compartir sugerencias sobre nuestra herramienta para evaluar vehículos usados.',
    url: 'https://carchecker.kodiquett.com/contacto',
    siteName: 'EscaneApp Colombia',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function ContactoPage() {
  return (
    <main className="w-full bg-[#F7F9FA] min-h-screen text-[#17212B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* ==================================================== */}
        {/* BREADCRUMBS                                          */}
        {/* ==================================================== */}
        <nav aria-label="Migas de pan" className="mb-6">
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
              <span className="text-[#17212B] font-bold">Contacto</span>
            </li>
          </ol>
        </nav>

        {/* ==================================================== */}
        {/* HERO SECTION                                         */}
        {/* ==================================================== */}
        <header className="mb-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <Mail className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>CANALES DE ATENCIÓN Y CONTACTO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            Contacto
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed">
            ¿Tienes una pregunta, encontraste un problema o quieres compartir una sugerencia sobre EscaneApp? Estamos aquí para escucharte.
          </p>
        </header>

        {/* ==================================================== */}
        {/* GRID PRINCIPAL: INFORMACIÓN + FORMULARIO             */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Columna Izquierda: ¿Cómo podemos ayudarte? + Datos de contacto */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tarjeta de Opciones de Ayuda */}
            <section className="bg-white border border-[#CBD5E1] rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
              <div className="border-b border-[#E2E8F0] pb-3">
                <span className="text-xs font-mono font-bold text-[#123B5D] uppercase tracking-wider block mb-1">
                  ORIENTACIÓN
                </span>
                <h2 className="text-lg font-extrabold text-[#17212B]">
                  ¿Cómo podemos ayudarte?
                </h2>
                <p className="text-xs text-[#66727D] mt-1 leading-relaxed">
                  Elige el motivo que mejor describa tu necesidad para atenderte con mayor agilidad:
                </p>
              </div>

              <div className="space-y-3">
                {/* Opción 1: Preguntas sobre EscaneApp */}
                <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#123B5D]/10 flex items-center justify-center text-[#123B5D] shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#17212B]">
                      Preguntas sobre EscaneApp
                    </h3>
                    <p className="text-[11px] text-[#66727D] leading-relaxed mt-0.5">
                      Dudas sobre el funcionamiento del evaluador de vehículos, la calculadora de costos o interpretación de resultados.
                    </p>
                  </div>
                </div>

                {/* Opción 2: Reportar un error */}
                <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#D64545] shrink-0 mt-0.5">
                    <Bug className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#17212B]">
                      Reportar un error
                    </h3>
                    <p className="text-[11px] text-[#66727D] leading-relaxed mt-0.5">
                      Comportamientos anómalos en los formularios, fallas técnicas en selectores o errores al calcular datos.
                    </p>
                  </div>
                </div>

                {/* Opción 3: Sugerencias o comentarios */}
                <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#2EAD68] shrink-0 mt-0.5">
                    <MessageSquareQuote className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#17212B]">
                      Sugerencias o comentarios
                    </h3>
                    <p className="text-[11px] text-[#66727D] leading-relaxed mt-0.5">
                      Propuestas de nuevas características, modelos de autos a incorporar o mejoras a la experiencia de usuario.
                    </p>
                  </div>
                </div>

                {/* Opción 4: Consultas generales */}
                <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#123B5D] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#17212B]">
                      Consultas generales
                    </h3>
                    <p className="text-[11px] text-[#66727D] leading-relaxed mt-0.5">
                      Alianzas institucionales, menciones de prensa y cualquier otra inquietud relacionada con EscaneApp.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tarjeta de Correo Directo */}
            <div className="bg-[#123B5D] text-white rounded-2xl p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8BCF3F]">
                <Clock className="w-3.5 h-3.5" />
                <span>CANAL DIRECTO</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Correo Electrónico Oficial
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Puedes escribirnos de manera directa a nuestra bandeja de entrada:
              </p>
              <div className="p-3 rounded-xl bg-white/10 border border-white/15 flex items-center justify-between">
                <a
                  href="mailto:azuladev93@gmail.com"
                  className="font-mono text-xs sm:text-sm font-bold text-[#8BCF3F] hover:underline"
                >
                  azuladev93@gmail.com
                </a>
              </div>
              <p className="text-[11px] text-slate-300">
                Respondemos habitualmente en menos de 24 horas hábiles.
              </p>
            </div>

            {/* Nota de Privacidad */}
            <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#66727D] flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Tus datos no serán cedidos a terceros ni utilizados con fines de spam publicitario. Consulta nuestra{' '}
                <Link
                  href="/politica-privacidad"
                  className="font-bold text-[#123B5D] hover:underline"
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        {/* ==================================================== */}
        {/* BANNER INFORMATIVO INFERIOR                          */}
        {/* ==================================================== */}
        <section className="bg-white border border-[#CBD5E1] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-[#8BCF3F]" />
              <span className="font-mono text-xs font-bold text-[#123B5D] uppercase">
                HERRAMIENTAS GRATUITAS
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#17212B]">
              ¿Aún no has probado las herramientas de EscaneApp?
            </h3>
            <p className="text-xs text-[#66727D] max-w-xl">
              Evalúa un vehículo usado con nuestro checklist de 80 puntos o proyecta el costo real de tenencia anual y mensual.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-[#8BCF3F] hover:bg-[#7CBF32] text-[#123B5D] text-xs font-extrabold transition-all shadow-xs active:scale-98"
            >
              <span>Evaluar carro</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-[#F7F9FA] hover:bg-[#E2E8F0] border border-[#CBD5E1] text-[#17212B] text-xs font-bold transition-all shadow-2xs"
            >
              <span>Calcular costos</span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
