'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Car,
  Calculator,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { ENLACES_PORTALES } from '../../lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#F7F9FA] text-[#17212B] overflow-x-hidden">
      {/* ========================================================
          1. HERO SECTION (Composición de Referencia)
         ======================================================== */}
      <section className="relative w-full pt-8 md:pt-14 pb-16 md:pb-24 bg-[#F7F9FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Lado Izquierdo: Copy y CTAs */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Overline Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EBF7DF] border border-[#D7EFC2] text-[#3B6615] text-[11px] font-bold uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#8BCF3F] animate-pulse"></span>
                <span>EVALUACIÓN INTELIGENTE DE VEHÍCULOS</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] lg:leading-[1.15] font-extrabold text-[#17212B] tracking-tight mb-6">
                ¿VISTE UN AUTO
                <br />
                QUE TE GUSTA?
                <br />
                ANTES DE COMPRARLO,
                <br />
                <span className="inline-block bg-[#E2EEF8] text-[#123B5D] px-3 py-1 rounded-xl mt-1.5 shadow-2xs font-extrabold">
                  ESCANÉALO.
                </span>
              </h1>

              {/* Texto Descriptivo */}
              <p className="text-sm sm:text-base text-[#66727D] max-w-xl mb-8 leading-relaxed font-normal">
                EscaneApp es la herramienta que unifica lo que debes revisar en un vehículo usado: datos de bases públicas, puntos de inspección crítica y costos ocultos en un solo lugar.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
                <Link
                  href="/evaluacion"
                  className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-[#8BCF3F] text-[#17212B] text-sm font-bold shadow-xs hover:bg-[#7EC134] hover:shadow transition-all duration-200 active:scale-98"
                >
                  <span>Escanear vehículo</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                <Link
                  href="/cuanto-cuesta-mantener-carro-usado-colombia"
                  className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-white border border-[#CBD5E1] text-[#17212B] text-sm font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
                >
                  <span>Calcular costos</span>
                  <ArrowRight className="w-4 h-4 text-[#66727D]" />
                </Link>
              </div>
            </div>

            {/* Lado Derecho: Imagen del Vehículo + Gauge + Tarjeta de Costo */}
            <div className="lg:col-span-6 relative w-full flex justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md bg-white">
                {/* Imagen del vehículo en estudio fotográfico */}
                <div className="relative w-full h-[280px] sm:h-[360px] md:h-[400px]">
                  <Image
                    src="/pexels-mikebird-20475010.jpg"
                    alt="Inspección inteligente de vehículo sedán en estudio"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  {/* Overlay gradiente muy sutil para destacar las tarjetas flotantes */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10 pointer-events-none"></div>
                </div>

                {/* 1. GAUGE DE PUNTUACIÓN (Superpuesto en esquina superior izquierda con efecto glass) */}
                <div className="absolute top-3.5 sm:top-5 left-3.5 sm:left-5 bg-white/70  rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_0_rgba(15,27,43,0.14)] border border-white/60 flex flex-col items-center min-w-[130px] sm:min-w-[150px] animate-fadeIn">
                  {/* Etiqueta Superior */}
                  <span className="text-[9px] sm:text-[10px] font-extrabold text-[#66727D] uppercase tracking-wider mb-2 text-center">
                    PUNTUACIÓN ESTIMADA
                  </span>

                  {/* Gauge Circular SVG */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90 transform"
                      viewBox="0 0 100 100"
                    >
                      {/* Fondo del arco */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#E2E8F0"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                        strokeLinecap="round"
                      />
                      {/* Progreso del arco (75 / 100 -> color atención #E5A72B) */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#E5A72B"
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset="110"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    {/* Contenido Central */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="flex items-baseline gap-0.5 leading-none">
                        <span className="text-xl sm:text-2xl font-extrabold text-[#17212B]">
                          75
                        </span>
                        <span className="text-[10px] sm:text-xs text-[#66727D] font-medium">
                          /100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Estado del Gauge */}
                  <div className="mt-2 px-2.5 py-0.5 rounded-full bg-[#FEF3C7]/90 border border-[#FDE68A] text-[#B45309] text-[10px] font-bold shadow-2xs">
                    Revisar
                  </div>
                </div>

                {/* 2. TARJETA DE COSTO DE PROPIEDAD (Superpuesta en esquina inferior derecha con efecto glass) */}
                <div className="absolute bottom-3.5 sm:bottom-5 right-3.5 sm:right-5 bg-white/70  rounded-2xl p-3.5 sm:p-4 shadow-[0_8px_32px_0_rgba(15,27,43,0.14)] border border-white/60 min-w-[210px] sm:min-w-[250px] animate-fadeIn">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] font-extrabold tracking-wider text-[#66727D] uppercase">
                      COSTO ESTIMADO
                    </span>
                    <span className="text-[9px] font-bold text-[#123B5D] bg-[#EBF3FA] px-1.5 py-0.5 rounded">
                      Proyección
                    </span>
                  </div>

                  <p className="text-[11px] text-[#66727D] font-medium">
                    Costo de propiedad
                  </p>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-base sm:text-lg font-extrabold text-[#123B5D]">
                      $7.820.000
                    </span>
                    <span className="text-[11px] text-[#66727D]">/ año</span>
                  </div>

                  {/* Barra de desglose multicriterio */}
                  <div className="w-full h-1.5 rounded-full bg-[#E2E8F0]/80 overflow-hidden flex gap-0.5 mt-2">
                    <div className="h-full bg-[#3578B8] w-[55%]" title="Combustible: 55%"></div>
                    <div className="h-full bg-[#8BCF3F] w-[25%]" title="Mantenimiento: 25%"></div>
                    <div className="h-full bg-[#E5A72B] w-[20%]" title="Impuestos y SOAT: 20%"></div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-[#66727D] mt-1.5 font-medium">
                    <span>Combustible 55%</span>
                    <span>Mant. 25%</span>
                    <span>SOAT 20%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. SECCIÓN DE SERVICIOS ("NUESTROS SERVICIOS")
         ======================================================== */}
      <section className="w-full py-16 md:py-20 bg-white border-y border-[#E2E8F0]" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header de Sección */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7DF] text-[#3B6615] text-[11px] font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#8BCF3F]" />
              <span>NUESTROS SERVICIOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17212B] tracking-tight mb-3">
              TODO LO QUE NECESITAS ANTES DE COMPRAR UN CARRO USADO.
            </h2>
            <p className="text-sm sm:text-base text-[#66727D] leading-relaxed">
              Herramientas diseñadas para evaluar aspectos técnicos, legales y financieros de forma independiente o complementaria.
            </p>
          </div>

          {/* Grid de Servicios */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Card Principal: EVALUAR UN VEHÍCULO (Col 7) */}
            <div className="lg:col-span-7 bg-[#F7F9FA] border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all duration-200">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#EBF3FA] text-[#123B5D]">
                    MÓDULO PRINCIPAL
                  </span>
                  <div className="w-10 h-10 rounded-2xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#123B5D] shadow-2xs">
                    <Car className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#17212B] mb-3">
                  EVALUAR UN VEHÍCULO
                </h3>
                <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed mb-6">
                  Realiza una revisión completa paso a paso: historial en bases oficiales, checklist visual de 80 puntos y proyección de costos ocultos de reparación.
                </p>

                {/* Pastilla con los 4 Ejes / Checks */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 mb-8 shadow-2xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold text-[#17212B]">
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#EBF7DF] text-[#3B6615] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Historial y antecedentes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#EBF7DF] text-[#3B6615] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Revisión de 80 puntos críticos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#EBF7DF] text-[#3B6615] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Proyección de costos ocultos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#EBF7DF] text-[#3B6615] flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span>Score unificado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Link
                  href="/evaluacion"
                  className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-full bg-[#8BCF3F] text-[#17212B] text-xs sm:text-sm font-bold shadow-xs hover:bg-[#7EC134] transition-colors"
                >
                  <span>Escanear vehículo</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              </div>
            </div>

            {/* Columna Derecha: Tarjetas Secundarias Apiladas (Col 5) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 2: CALCULAR COSTO REAL */}
              <div className="bg-[#F7F9FA] border border-[#E2E8F0] rounded-3xl p-6 sm:p-7 flex flex-col justify-between flex-1 shadow-2xs hover:shadow-sm transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#66727D]">
                      MÓDULO DE COSTOS
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#123B5D]">
                      <Calculator className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#17212B] mb-2">
                    CALCULAR COSTO REAL
                  </h3>
                  <p className="text-xs text-[#66727D] leading-relaxed mb-4">
                    Calcula los gastos reales de tener el vehículo: consumo de combustible según kilometraje estimado, mantenimiento anual y gastos recurrentes.
                  </p>
                </div>
                <div>
                  <Link
                    href="/cuanto-cuesta-mantener-carro-usado-colombia"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B5D] hover:text-[#0E2F4B] transition-colors group"
                  >
                    <span>Ir a la calculadora</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Card 3: APRENDER ANTES DE COMPRAR */}
              <div className="bg-[#F7F9FA] border border-[#E2E8F0] rounded-3xl p-6 sm:p-7 flex flex-col justify-between flex-1 shadow-2xs hover:shadow-sm transition-all duration-200">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#66727D]">
                      GUÍAS Y RECURSOS
                    </span>
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#123B5D]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#17212B] mb-2">
                    APRENDER ANTES DE COMPRAR
                  </h3>
                  <p className="text-xs text-[#66727D] leading-relaxed mb-4">
                    Aprende qué revisar en cada componente con guías prácticas paso a paso para que no dependas de nadie antes de solicitar un peritaje oficial.
                  </p>
                </div>
                <div>
                  <Link
                    href="/#guias"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#123B5D] hover:text-[#0E2F4B] transition-colors group"
                  >
                    <span>Ver guías</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. SECCIÓN "¿CÓMO FUNCIONA ESCANEAPP?" (4 Pasos)
         ======================================================== */}
      <section className="w-full py-16 md:py-24 bg-[#F7F9FA]" id="como-funciona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Lado Izquierdo: Fotografía de inspección con puertas abiertas */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative w-full h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-md bg-white">
                <Image
                  src="/pexels-mikebird-20475072.jpg"
                  alt="Inspección detallada de vehículo con puertas y baúl abiertos"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />

                {/* Floating dark badge inferior */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#123B5D]/95 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-lg text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-[#8BCF3F] shrink-0" />
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#8BCF3F]">
                      MÉTODO ESTRUCTURADO
                    </span>
                  </div>
                  <p className="text-xs text-slate-200 font-normal leading-relaxed">
                    Pasos guiados y objetivos, sin conocimiento técnico previo.
                  </p>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Los 4 Pasos */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7DF] text-[#3B6615] text-[11px] font-bold uppercase tracking-wider mb-3 w-fit">
                <span>EL PROCESO EN 4 PASOS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17212B] tracking-tight mb-3">
                ¿CÓMO FUNCIONA ESCANEAPP?
              </h2>
              <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed mb-8 max-w-xl">
                El proceso combina consulta de bases públicas, inspección visual asistida y cálculo de costos ocultos para darte un veredicto preliminar antes de pagar un peritaje profesional.
              </p>

              {/* 4 Pasos Apilados */}
              <div className="space-y-3.5">
                {/* Paso 01 */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:border-[#CBD5E1] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#123B5D] font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17212B] mb-1">
                      REVISA
                    </h3>
                    <p className="text-xs text-[#66727D] leading-relaxed">
                      Ingresa los datos del vehículo: modelo, kilometraje y valor preliminar.
                    </p>
                  </div>
                </div>

                {/* Paso 02 */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:border-[#CBD5E1] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#123B5D] font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17212B] mb-1">
                      CONSULTA
                    </h3>
                    <p className="text-xs text-[#66727D] leading-relaxed">
                      Consulta antecedentes y siniestros en las fuentes oficiales integradas: RUNT, SIMIT y Fasecolda.
                    </p>
                  </div>
                </div>

                {/* Paso 03 */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:border-[#CBD5E1] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF3FA] text-[#123B5D] font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#17212B] mb-1">
                      INSPECCIONA
                    </h3>
                    <p className="text-xs text-[#66727D] leading-relaxed">
                      Revisa los elementos clave del vehículo mediante nuestra lista de 80 puntos estructurada por áreas.
                    </p>
                  </div>
                </div>

                {/* Paso 04 */}
                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 sm:p-5 flex items-start gap-4 shadow-2xs hover:border-[#CBD5E1] transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#EBF7DF] text-[#3B6615] font-mono text-xs font-extrabold flex items-center justify-center shrink-0">
                    04
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-[#17212B]">
                        DECIDE
                      </h3>
                      {/* Puntos de semáforo */}
                      <div className="flex items-center gap-1 ml-1">
                        <span className="w-2 h-2 rounded-full bg-[#2EAD68]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#E5A72B]"></span>
                        <span className="w-2 h-2 rounded-full bg-[#D64545]"></span>
                      </div>
                    </div>
                    <p className="text-xs text-[#66727D] leading-relaxed">
                      Accede al reporte final con análisis completo y recomendaciones claras para tomar decisiones con criterio antes de comprar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          4. SECCIÓN GUÍAS ("APRENDE A REVISAR UN CARRO USADO.")
         ======================================================== */}
      <section className="w-full py-16 md:py-20 bg-white border-t border-[#E2E8F0]" id="guias">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7DF] text-[#3B6615] text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>GUÍAS PARA COMPRADORES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17212B] tracking-tight mb-3">
              APRENDE A REVISAR UN CARRO USADO.
            </h2>
            <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
              Información práctica para evaluar un vehículo usado antes de comprarlo y saber cuándo necesitas un peritaje profesional.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Guía 1: Motor */}
            <Link
              href="/como-revisar-carro-usado"
              className="bg-[#F7F9FA] border border-[#E2E8F0] p-6 rounded-3xl flex flex-col justify-between hover:border-[#123B5D] hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[10px] font-bold text-[#123B5D]">
                    Guía
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#66727D] font-medium">
                    <Clock className="w-3 h-3" /> 5 min
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                  ¿Cómo revisar un carro usado?
                </h3>
                <p className="text-xs text-[#66727D] leading-relaxed">
                  Conoce un proceso ordenado para revisar un vehículo usado antes de comprarlo.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#123B5D] inline-flex items-center gap-1">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Guía 2: Pintura */}
            <Link
              href="/que-revisar-carro-usado"
              className="bg-[#F7F9FA] border border-[#E2E8F0] p-6 rounded-3xl flex flex-col justify-between hover:border-[#123B5D] hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[10px] font-bold text-[#123B5D]">
                    Checklist
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#66727D] font-medium">
                    <Clock className="w-3 h-3" /> 4 min
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                  Qué componentes revisar en un carro usado
                </h3>
                <p className="text-xs text-[#66727D] leading-relaxed">
                  Descubre los principales componentes que debes revisar antes de tomar una deceisión de compra.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#123B5D] inline-flex items-center gap-1">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Guía 3: Chasis */}
            <Link
              href="/kilometraje-carro-usado"
              className="bg-[#F7F9FA] border border-[#E2E8F0] p-6 rounded-3xl flex flex-col justify-between hover:border-[#123B5D] hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[10px] font-bold text-[#123B5D]">
                    Kilometraje
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#66727D] font-medium">
                    <Clock className="w-3 h-3" /> 6 min
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                  ¿Cómo revisar el kilometraje?
                </h3>
                <p className="text-xs text-[#66727D] leading-relaxed">
                  Aprende que significa el kilometraje y que señales conviene analizar antes de comprar.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#123B5D] inline-flex items-center gap-1">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>

            {/* Guía 4: Legal */}
            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-[#F7F9FA] border border-[#E2E8F0] p-6 rounded-3xl flex flex-col justify-between hover:border-[#123B5D] hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full bg-white border border-[#E2E8F0] text-[10px] font-bold text-[#123B5D]">
                    Antecedentes
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] text-[#66727D] font-medium">
                    <Clock className="w-3 h-3" /> 5 min
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#17212B] mb-2 group-hover:text-[#123B5D] transition-colors">
                  Antecedentes de un vehículo.
                </h3>
                <p className="text-xs text-[#66727D] leading-relaxed">
                  Conoce que información consular y qué revisar antes de comprar un vehículo usado en Colombia.
                </p>
              </div>
              <span className="mt-5 text-xs font-bold text-[#123B5D] inline-flex items-center gap-1">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. SECCIÓN FUENTES OFICIALES (RUNT, SIMIT, FASECOLDA)
         ======================================================== */}
      <section className="w-full py-16 md:py-24 bg-[#F7F9FA] border-t border-[#E2E8F0]" id="metodologia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7DF] text-[#3B6615] text-[11px] font-bold uppercase tracking-wider mb-3">
              <span>ACCESO A FUENTES OFICIALES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#17212B] tracking-tight mb-3">
              CONSULTA LAS FUENTES OFICIALES
            </h2>
            <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
              Para evitar fraudes o problemas legales, consulta siempre las fuentes del Estado antes de negociar. Enlaces directos a los portales oficiales de Colombia:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Card 1: RUNT */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 bg-slate-100 border-b border-[#E2E8F0]">
                  <Image
                    src="/logo-runt.png"
                    alt="logo del  registro único nacional de tránsito"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#66727D] block mb-1">
                    Registro Único Nacional de Tránsito
                  </span>
                  <h3 className="text-xl font-extrabold text-[#17212B] mb-2">
                    RUNT
                  </h3>
                  <p className="text-xs text-[#66727D] leading-relaxed">
                    Historial de propietarios anteriores, limitaciones a la propiedad, prendas bancarias vigentes, embargos y antecedentes de servicio público o escuela.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={ENLACES_PORTALES.RUNT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-[#17212B] text-xs font-bold hover:bg-[#EBF3FA] hover:text-[#123B5D] hover:border-[#123B5D] transition-all"
                >
                  <span>Consultar RUNT</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#66727D]" />
                </a>
              </div>
            </div>

            {/* Card 2: SIMIT */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-center p-6">
                  <Image
                    src="/logo-simit.png"
                    alt="Logotipo oficial SIMIT Federación Colombiana de Municipios"
                    width={220}
                    height={70}
                    className="object-contain max-h-24 w-auto"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#66727D] block mb-1">
                    Sistema Integrado de Multas
                  </span>
                  <h3 className="text-xl font-extrabold text-[#17212B] mb-2">
                    SIMIT
                  </h3>
                  <p className="text-xs text-[#66727D] leading-relaxed">
                    Comparendos pendientes por fotomultas o agentes de tránsito, acuerdos de pago activos y restricciones legales para realizar el traspaso.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={ENLACES_PORTALES.SIMIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-[#17212B] text-xs font-bold hover:bg-[#EBF3FA] hover:text-[#123B5D] hover:border-[#123B5D] transition-all"
                >
                  <span>Consultar SIMIT</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#66727D]" />
                </a>
              </div>
            </div>

            {/* Card 3: FASECOLDA */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl overflow-hidden shadow-2xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-44 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-center p-6">
                  <Image
                    src="/logo-fasecolda.png"
                    alt="Logotipo oficial Fasecolda 50 años"
                    width={220}
                    height={70}
                    className="object-contain max-h-24 w-auto"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#66727D] block mb-1">
                    Federación de Aseguradores Colombianos
                  </span>
                  <h3 className="text-xl font-extrabold text-[#17212B] mb-2">
                    FASECOLDA
                  </h3>
                  <p className="text-xs text-[#66727D] leading-relaxed">
                    Historial de reclamaciones a pólizas todo riesgo por pérdida parcial o total de mayor cuantía y valor asegurado comercial de referencia.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={ENLACES_PORTALES.FASECOLDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-[#17212B] text-xs font-bold hover:bg-[#EBF3FA] hover:text-[#123B5D] hover:border-[#123B5D] transition-all"
                >
                  <span>Consultar FASECOLDA</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#66727D]" />
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================
              6. BLOQUE DE TRANSPARENCIA Y HONESTIDAD TÉCNICA
             ======================================================== */}
          <div className="max-w-3xl mx-auto my-12 bg-[#123B5D] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1A4B74] text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#8BCF3F] mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 tracking-tight">
              Transparencia y honestidad técnica
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              EscaneApp no es un peritaje oficial ni reemplaza la inspección de un perito certificado. Es una herramienta de preevaluación estructurada para descartar opciones antes de gastar en un peritaje presencial.
            </p>
          </div>

          {/* ========================================================
              7. AVISO SOBRE EL PERITAJE PROFESIONAL (4 Columnas)
             ======================================================== */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xs" id="aviso-legal">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8 pb-4 border-b border-[#E2E8F0]">
              <span className="px-2.5 py-1 rounded-md bg-[#FFFBEB] text-[#B45309] text-[10px] font-extrabold uppercase tracking-wider w-fit">
                LÍMITES DE LA HERRAMIENTA
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-[#17212B] tracking-tight">
                ESCANEAPP TE AYUDA A REVISAR, NO REEMPLAZA UN PERITAJE.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-[#66727D]">
              <div>
                <h4 className="font-bold text-[#17212B] mb-2 text-sm">
                  1. Para descartar antes
                </h4>
                <p className="leading-relaxed">
                  Funciona como un filtro analítico preliminar para descartar autos con problemas evidentes antes de pagar peritajes mayores.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#17212B] mb-2 text-sm">
                  2. Qué puedes verificar
                </h4>
                <p className="leading-relaxed">
                  Condición del vehículo, historial básico, desgastes visibles y costos estimativos que influyen en el precio y la decisión.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#17212B] mb-2 text-sm">
                  3. Si todo luce correcto, perita
                </h4>
                <p className="leading-relaxed">
                  Si el auto pasa la inspección visual preliminar y los antecedentes son limpios, contrata un peritaje profesional con equipos de diagnóstico.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-[#17212B] mb-2 text-sm">
                  4. No somos intermediarios
                </h4>
                <p className="leading-relaxed">
                  No recibimos comisiones del vendedor ni de talleres. Nuestra herramienta es independiente y orientada al comprador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CTA FINAL (Bloque Oscuro)
         ======================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#123B5D] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-[#8BCF3F] text-[11px] font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8BCF3F]"></span>
            <span>PREEVALUACIÓN DISPONIBLE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
            ¿YA TIENES UN CARRO EN MENTE?
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-xl mb-8 leading-relaxed">
            Haz una evaluación preliminar antes de pagar un peritaje completo o cerrar el negocio.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 w-full sm:w-auto">
            <Link
              href="/evaluacion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 h-12 rounded-full bg-[#8BCF3F] text-[#17212B] text-sm font-bold shadow-sm hover:bg-[#7EC134] transition-colors"
            >
              <span>Escanear vehículo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-[#18446B] border border-white/20 text-white text-sm font-semibold hover:bg-[#1E5280] transition-colors"
            >
              <span>Calcular costos</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#8BCF3F] stroke-[2.5]" /> Puntos Clave
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#8BCF3F] stroke-[2.5]" /> Bases Legales  RUNT / SIMIT / FASECOLDA
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-[#8BCF3F] stroke-[2.5]" /> Estimación de Costos Ocultos
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
