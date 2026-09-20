import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Car,
  Gauge,
  ShieldCheck,
  ClipboardCheck,
  Calculator,
  ExternalLink,
  Timer,
  ArrowRight,
  Gavel,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  MinusCircle,
  FileCheck2,
} from 'lucide-react';
import { ENLACES_PORTALES } from '../../lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION (Apple Minimal + Automotive Structural Precision) */}
      <section className="relative w-full pt-10 md:pt-14 pb-16 bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Brand Logo Showcase from public/logos (1).png */}
          <div className="mb-5 flex justify-center">
            <Image
              src="/logos (1).png"
              alt="Car Checker Colombia — Logo Oficial"
              width={260}
              height={130}
              priority
              className="h-16 sm:h-20 w-auto object-contain"
            />
          </div>

          {/* Overline Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[#475569] text-xs font-mono uppercase tracking-wider mb-6 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span>Herramienta para revisar un carro usado en Colombia</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] lg:leading-[60px] font-bold text-[#0F1B2B] tracking-tight max-w-4xl mx-auto mb-6">
            ¿Vale la pena llevar este carro a un peritaje?
          </h1>

          {/* Supporting Editorial Subtitle */}
          <p className="text-base md:text-lg text-[#475569] max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Revisa un carro usado en Colombia antes de comprarlo. Evalúa kilometraje, antecedentes, estado físico y posibles costos ocultos antes de pagar un peritaje profesional.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 w-full max-w-md">
            <Link
              href="/evaluacion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-12 rounded-lg bg-[#0F1B2B] text-white text-sm font-semibold shadow-sm hover:bg-[#1A2B42] transition-all duration-200 active:scale-98"
            >
              <Car className="w-5 h-5" />
              <span>Comenzar evaluación</span>
            </Link>
            <a
              href="#metodologia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 h-12 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] text-sm font-semibold hover:bg-[#F1F5F9] transition-colors"
            >
              <span>Explorar metodología</span>
            </a>
          </div>

          {/* Microcopy Technical Specs */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-mono text-[#64748B] mb-12">
            <span>Revisión preliminar</span>
            <span className="text-[#CBD5E1]">·</span>
            <span>Sin registro previo</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#166534] font-semibold">100% gratuita</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="inline-flex items-center gap-1">
              <Timer className="w-3.5 h-3.5" /> 8–12 minutos
            </span>
          </div>

          {/* Inspection Studio Banner with HUD Markers */}
          <div className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-[#E2E8F0] shadow-sm bg-white p-6 sm:p-10 flex flex-col items-center justify-center">
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#0F1B2B]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
              <span className="font-semibold uppercase tracking-wider">MODO INSPECCIÓN TÉCNICA</span>
            </div>
            <div className="absolute bottom-4 right-4 hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-mono text-[#475569]">
              <span>INSPECCIÓN FÍSICA MULTICRITERIO</span>
            </div>

            <div className="py-8 sm:py-12 flex flex-col items-center text-center max-w-lg">
              <div className="w-16 h-16 rounded-2xl bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B] mb-4 shadow-xs">
                <Car className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-2">
                Inspección de un carro usado paso a paso
              </h2>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Diseñado para usarse directamente junto al vehículo desde tu teléfono o computador. Registra hallazgos, calcula deducciones y obtén una puntuación estimada antes de pagar un peritaje.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EJES DE EVALUACIÓN (4-Column Layout) */}
      <section className="w-full py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                Ejes de evaluación
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B]">
                Qué revisar antes de comprar un carro usado
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Kilometraje */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B] mb-5">
                  <Gauge className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider block mb-1">
                  Eje 01
                </span>
                <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">Kilometraje del carro usado</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Calcula el promedio de km/año contra el estándar colombiano (10.000 a 15.000 km/año) y detecta odómetros sospechosos o desgaste severo.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span>Fórmula analítica</span>
              </div>
            </div>

            {/* Card 2: Antecedentes */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B] mb-5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider block mb-1">
                  Eje 02
                </span>
                <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">Antecedentes</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Consulta guiada de RUNT, SIMIT y Fasecolda para verificar comparendos pendientes, prendas, regrabaciones y siniestros de mayor cuantía.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span>3 Bases oficiales</span>
              </div>
            </div>

            {/* Card 3: Inspección Física */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B] mb-5">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider block mb-1">
                  Eje 03
                </span>
                <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">Inspección Física</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Chequeo visual de carrocería, pintura, mecánica, habitáculo y prueba de ruta.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span>Checkeo rápido</span>
              </div>
            </div>

            {/* Card 4: Costos */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col justify-between hover:border-[#CBD5E1] transition-all shadow-xs">
              <div>
                <div className="w-10 h-10 rounded-lg bg-white border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B] mb-5">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono uppercase text-[#64748B] tracking-wider block mb-1">
                  Eje 04
                </span>
                <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">Costos ocultos de un carro usado</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Estima el presupuesto de reparaciones inmediatas y utilízalo como argumento para negociar el precio final de compra.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-mono text-[#64748B]">
                <span>Poder de negociación</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METODOLOGÍA TÉCNICA (5 ÁREAS) */}
      <section className="w-full py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]" id="metodologia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-1">
              Inspección integral en campo
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] mb-3">
              Metodología de 5 áreas técnicas
            </h2>
            <p className="text-sm md:text-base text-[#475569] leading-relaxed">
              Diseñada para recorrer el automóvil en un flujo ergonómico continuo y metódico, sin omitir puntos de falla estructural ni detalles mecánicos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Area 1 */}
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0F1B2B] block mb-3">01</span>
                <h3 className="text-base font-bold text-[#0F1B2B] mb-1.5">Estructura y carrocería</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Líneas de paneles, puntas de chasis, espesores de pintura, corrosión y soldaduras de fábrica.
                </p>
              </div>
              <div className="mt-5 text-[11px] font-mono text-[#64748B] font-medium">
                15 verificaciones
              </div>
            </div>

            {/* Area 2 */}
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0F1B2B] block mb-3">02</span>
                <h3 className="text-base font-bold text-[#0F1B2B] mb-1.5">Motor y mecánica</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Fugas de fluidos, ruidos en ralentí, mangueras, correas, batería y humo del escape.
                </p>
              </div>
              <div className="mt-5 text-[11px] font-mono text-[#64748B] font-medium">
                14 verificaciones
              </div>
            </div>

            {/* Area 3 */}
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0F1B2B] block mb-3">03</span>
                <h3 className="text-base font-bold text-[#0F1B2B] mb-1.5">Habitáculo e interior</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Climatización, testigos del tablero, cojiniería, elevavidrios y humedad oculta.
                </p>
              </div>
              <div className="mt-5 text-[11px] font-mono text-[#64748B] font-medium">
                14 verificaciones
              </div>
            </div>

            {/* Area 4 */}
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0F1B2B] block mb-3">04</span>
                <h3 className="text-base font-bold text-[#0F1B2B] mb-1.5">Prueba de ruta</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Caja de cambios, embrague, vibraciones de frenado, suspensión, dirección y rampa en reversa.
                </p>
              </div>
              <div className="mt-5 text-[11px] font-mono text-[#64748B] font-medium">
                15 verificaciones
              </div>
            </div>

            {/* Area 5 */}
            <div className="bg-white border border-[#E2E8F0] p-5 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-2xl font-bold font-mono text-[#0F1B2B] block mb-3">05</span>
                <h3 className="text-base font-bold text-[#0F1B2B] mb-1.5">Inspección inferior y legal</h3>
                <p className="text-xs text-[#475569] leading-relaxed">
                  Chasis sin remiendos, exosto, ejes, improntas vs tarjeta de propiedad y kit reglamentario.
                </p>
              </div>
              <div className="mt-5 text-[11px] font-mono text-[#64748B] font-medium">
                22 verificaciones
              </div>
            </div>
          </div>

          {/* Interactive Preview of 4-State Segmented Control */}
          <div className="mt-10 p-6 md:p-8 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-[11px] font-mono text-[#64748B] uppercase tracking-wider block mb-1">
                Control operativo de campo
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-1">
                Checklist de inspección física
              </h3>
              <p className="text-xs sm:text-sm text-[#475569]">
                Inspecciona visualmente cada componente y selecciona su estado técnico.
              </p>
            </div>

            <div className="flex items-center gap-1.5 p-1.5 bg-[#F1F5F9] rounded-lg w-full max-w-md border border-[#E2E8F0]">
              <div className="flex-1 py-2 px-2.5 rounded bg-white shadow-xs flex items-center justify-center gap-1 text-[#166534] text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Bueno</span>
              </div>
              <div className="flex-1 py-2 px-2.5 rounded flex items-center justify-center gap-1 text-[#D97706] text-xs font-medium">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Regular</span>
              </div>
              <div className="flex-1 py-2 px-2.5 rounded flex items-center justify-center gap-1 text-[#DC2626] text-xs font-medium">
                <XCircle className="w-3.5 h-3.5" />
                <span>Malo</span>
              </div>
              <div className="flex-1 py-2 px-2.5 rounded flex items-center justify-center gap-1 text-[#64748B] text-xs font-medium">
                <MinusCircle className="w-3.5 h-3.5" />
                <span>N/A</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CÓMO FUNCIONA CAR CHECKER (4 Pasos) */}
      <section className="w-full py-20 bg-white border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-1">
              Flujo de trabajo
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B] mb-2">
              Así funciona Car Checker
            </h2>
            <p className="text-sm text-[#475569]">
              Cuatro pasos metódicos diseñados para ser ejecutados directamente frente al vehículo o anuncio del vendedor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0F1B2B] text-white flex items-center justify-center font-mono text-sm font-semibold mb-5">
                1
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1">
                Paso 01
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">REVISA</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Ingresa datos básicos: placa, línea, año modelo y kilometraje actual. El algoritmo calcula el ritmo de desgaste por año.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0F1B2B] text-white flex items-center justify-center font-mono text-sm font-semibold mb-5">
                2
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1">
                Paso 02
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">CONSULTA</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Verifica antecedentes legales en los enlaces oficiales (RUNT, SIMIT, Fasecolda) y registra los hallazgos en la plataforma.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0F1B2B] text-white flex items-center justify-center font-mono text-sm font-semibold mb-5">
                3
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1">
                Paso 03
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">INSPECCIONA</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Sigue la lista guiada de chequeo visual junto al carro seleccionando Bueno, Regular, Malo o N/A con instrucciones prácticas.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col shadow-xs">
              <div className="w-10 h-10 rounded-full bg-[#0F1B2B] text-white flex items-center justify-center font-mono text-sm font-semibold mb-5">
                4
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] mb-1">
                Paso 04
              </span>
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-2">DECIDE</h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Obtén una puntuación estimada de referencia, costos ocultos proyectados de reparación y argumentos concretos de negociación antes de peritar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONSULTA DE ANTECEDENTES OFICIALES (3 Cards) */}
      <section className="w-full py-20 bg-[#F8FAFC] border-b border-[#E2E8F0]" id="antecedentes">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] block mb-1">
                Acceso directo a fuentes estatales
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F1B2B]">
                Consulta de antecedentes oficiales
              </h2>
            </div>
            <p className="text-sm text-[#475569] max-w-lg">
              Consulta directamente las fuentes oficiales del Estado colombiano y registra los resultados en tu evaluación. Car Checker no almacena claves ni finge conexiones inexistentes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: RUNT */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#F1F5F9] text-[#0F1B2B] text-xs font-mono uppercase font-semibold">
                    Oficial
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">MinTransporte</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2B] mb-2">RUNT Ciudadano</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                  Historial de propietarios anteriores, limitaciones a la propiedad, prendas bancarias vigentes, embargos y antecedentes de servicio público o escuela.
                </p>
              </div>
              <a
                href={ENLACES_PORTALES.RUNT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 inline-flex items-center justify-between px-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] text-xs font-semibold hover:bg-[#F1F5F9] transition-colors"
              >
                <span>Consultar en RUNT</span>
                <ExternalLink className="w-4 h-4 text-[#64748B]" />
              </a>
            </div>

            {/* Card 2: SIMIT */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#F1F5F9] text-[#0F1B2B] text-xs font-mono uppercase font-semibold">
                    Multas
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">Fedemunicipios</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2B] mb-2">SIMIT Infracciones</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                  Comparendos pendientes por fotomultas o agentes de tránsito, acuerdos de pago activos y restricciones legales para realizar el traspaso.
                </p>
              </div>
              <a
                href={ENLACES_PORTALES.SIMIT}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 inline-flex items-center justify-between px-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] text-xs font-semibold hover:bg-[#F1F5F9] transition-colors"
              >
                <span>Consultar en SIMIT</span>
                <ExternalLink className="w-4 h-4 text-[#64748B]" />
              </a>
            </div>

            {/* Card 3: FASECOLDA */}
            <div className="bg-white border border-[#E2E8F0] p-6 sm:p-8 rounded-xl shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded bg-[#F1F5F9] text-[#0F1B2B] text-xs font-mono uppercase font-semibold">
                    Siniestros
                  </span>
                  <span className="text-xs font-mono text-[#64748B]">Aseguradoras</span>
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2B] mb-2">Fasecolda Guía</h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-6">
                  Historial de reclamaciones a pólizas todo riesgo por pérdida parcial o total de mayor cuantía y valor asegurado comercial de referencia.
                </p>
              </div>
              <a
                href={ENLACES_PORTALES.FASECOLDA}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 inline-flex items-center justify-between px-4 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] text-xs font-semibold hover:bg-[#F1F5F9] transition-colors"
              >
                <span>Consultar en Fasecolda</span>
                <ExternalLink className="w-4 h-4 text-[#64748B]" />
              </a>
            </div>
          </div>

          {/* 3-Step Process Flow Banner */}
          <div className="w-full py-4 px-6 rounded-xl bg-white border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#0F1B2B]">1. CONSULTA ↗</span>
              <span className="text-xs text-[#64748B]">en pestañas separadas</span>
            </div>
            <span className="hidden sm:inline text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#0F1B2B]">2. REGISTRA ✍</span>
              <span className="text-xs text-[#64748B]">los hallazgos en Car Checker</span>
            </div>
            <span className="hidden sm:inline text-[#CBD5E1]">→</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold text-[#166534]">3. CONTINÚA ✓</span>
              <span className="text-xs text-[#64748B]">con la inspección física</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. AVISO LEGAL DE ALCANCE */}
      <section className="w-full py-12 bg-white border-b border-[#E2E8F0]" id="aviso-legal">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-6 rounded-xl flex flex-col sm:flex-row items-start gap-4 shadow-xs">
            <div className="p-2.5 rounded-lg bg-white border border-[#E2E8F0] text-[#0F1B2B] shrink-0">
              <Gavel className="w-5 h-5 text-[#64748B]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F1B2B] mb-1">
                Car Checker NO reemplaza un peritaje profesional
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Esta es una herramienta de revisión preliminar diseñada para ayudarte a detectar señales de alerta obvias antes de desembolsar el costo de una inspección técnica profesional. No constituye una certificación comercial, dictamen pericial judicial ni diagnóstico mecánico de desarme vinculante.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA FINAL */}
      <section className="w-full py-20 bg-[#F8FAFC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-[#E2E8F0] p-10 md:p-16 rounded-2xl shadow-sm text-center relative overflow-hidden">
            <div className="relative z-10 flex flex-col items-center">
              <span className="text-xs font-mono uppercase tracking-wider text-[#64748B] mb-3">
                Toma el control de tu compra
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F1B2B] tracking-tight mb-4">
                ¿Ya tienes un carro en mente?
              </h2>
              <p className="text-sm md:text-base text-[#475569] max-w-xl mb-8 leading-relaxed">
                Revísalo antes de invertir en el peritaje. Evita anticipos de dinero en vehículos con señales críticas de alerta.
              </p>
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-10 h-12 rounded-lg bg-[#0F1B2B] text-white text-sm font-semibold shadow-sm hover:bg-[#1A2B42] transition-colors mb-4 active:scale-98"
              >
                <FileCheck2 className="w-5 h-5" />
                <span>Comenzar evaluación gratuita</span>
              </Link>
              <span className="text-xs text-[#475569]">
                Diseñado para usar directamente junto al vehículo desde cualquier navegador móvil o de escritorio.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
