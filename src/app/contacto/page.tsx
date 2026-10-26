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
  title: 'Contacto y Soporte | EscaneApp Colombia',
  description:
    'Ponte en contacto con el equipo de EscaneApp para resolver dudas, reportar errores o compartir sugerencias sobre nuestra herramienta para evaluar carros usados en Colombia.',
  alternates: {
    canonical: '/contacto',
  },
  openGraph: {
    title: 'Contacto y Soporte | EscaneApp',
    description:
      'Ponte en contacto con el equipo de EscaneApp Colombia para dudas o sugerencias.',
    url: 'https://www.escaneapp.com/contacto',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/01_logo_horizontal_principal.png',
        width: 1200,
        height: 630,
        alt: 'Contacto y soporte EscaneApp Colombia',
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
      name: 'Contacto y Soporte',
      item: 'https://www.escaneapp.com/contacto',
    },
  ],
};

export default function ContactoPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-slate-800 antialiased py-8 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ==================================================== */}
        {/* BREADCRUMBS                                          */}
        {/* ==================================================== */}
        <nav aria-label="Migas de pan">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="text-slate-900 font-bold">Contacto y Soporte</span>
            </li>
          </ol>
        </nav>

        {/* ==================================================== */}
        {/* HERO SECTION EDITORIAL                               */}
        {/* ==================================================== */}
        <header className="border-b border-slate-200/90 pb-8 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>CANALES DE ATENCIÓN Y CONTACTO DIRECTO</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
            Estamos aquí para escucharte y ayudarte
          </h1>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            ¿Tienes alguna duda sobre una revisión, encontraste un dato que no te cuadra o tienes una idea para mejorar la plataforma? Escríbenos y te responderemos personalmente.
          </p>
        </header>

        {/* ==================================================== */}
        {/* GRID PRINCIPAL: INFORMACIÓN + FORMULARIO             */}
        {/* ==================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Columna Izquierda: ¿Cómo podemos ayudarte? + Datos de contacto */}
          <div className="lg:col-span-5 space-y-5">
            {/* Tarjeta de Opciones de Ayuda */}
            <section className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  ORIENTACIÓN
                </span>
                <h2 className="text-base font-bold text-slate-900">
                  ¿Cómo podemos ayudarte?
                </h2>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Elige el motivo de tu consulta para atenderte con mayor rapidez:
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Opción 1: Preguntas sobre EscaneApp */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <HelpCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">
                      Preguntas sobre la revisión
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Dudas sobre los 80 puntos del checklist, cómo interpretar el puntaje o cómo negociar el precio con el vendedor.
                    </p>
                  </div>
                </div>

                {/* Opción 2: Reportar un error */}
                <div className="p-3.5 rounded-xl bg-rose-50/40 border border-rose-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700 shrink-0 mt-0.5">
                    <Bug className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-rose-900">
                      Reportar un error técnico
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Si alguna calculadora falló, un enlace no abrió o viste un botón con problemas en tu celular.
                    </p>
                  </div>
                </div>

                {/* Opción 3: Sugerencias o comentarios */}
                <div className="p-3.5 rounded-xl bg-emerald-50/30 border border-emerald-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                    <MessageSquareQuote className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-emerald-950">
                      Sugerencias y nuevas ideas
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Modelos de carro que quieras que analicemos o mejoras que te gustaría ver en la aplicación.
                    </p>
                  </div>
                </div>

                {/* Opción 4: Consultas generales */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-slate-900">
                      Consultas generales
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed mt-0.5">
                      Menciones en medios, alianzas educativas o dudas sobre el proyecto independiente.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Tarjeta de Correo Directo Editorial */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xs space-y-3 border border-slate-800">
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>CANAL DIRECTO</span>
              </div>
              <h3 className="text-base font-bold text-white">
                Bandeja de Correo Electrónico
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Si prefieres escribirnos directamente desde tu cuenta personal:
              </p>
              <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-between">
                <a
                  href="mailto:azuladev93@gmail.com"
                  className="font-mono text-xs sm:text-sm font-bold text-emerald-400 hover:underline"
                >
                  azuladev93@gmail.com
                </a>
              </div>
              <p className="text-[11px] text-slate-400">
                Respondemos en menos de 24 horas hábiles.
              </p>
            </div>

            {/* Nota de Privacidad */}
            <div className="p-4 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-600 flex items-start gap-3 shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Tus datos nunca serán vendidos ni utilizados para publicidad molesta o spam. Consulta nuestra{' '}
                <Link
                  href="/politica-privacidad"
                  className="font-bold text-slate-900 hover:text-emerald-700 underline"
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
        <section className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="font-mono text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                HERRAMIENTAS 100% GRATUITAS
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              ¿Aún no has revisado el carro que tienes en mente?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Evalúa un vehículo usado con nuestra guía paso a paso de 80 puntos o calcula cuánto te costará mantenerlo al año en Colombia.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold transition-all shadow-xs active:scale-98"
            >
              <span>Evaluar carro</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
            </Link>

            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="inline-flex items-center gap-2 px-5 h-11 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition-all active:scale-98"
            >
              <span>Calcular costos</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
