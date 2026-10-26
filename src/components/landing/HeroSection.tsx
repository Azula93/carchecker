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
  Clock,
  Sparkles,
  Search,
  Scale,
  Fuel,
  CheckCircle2,
} from 'lucide-react';
import { ENLACES_PORTALES } from '../../lib/constants';

export const HeroSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col bg-[#FBFBFD] text-[#0F172A] overflow-x-hidden selection:bg-slate-900 selection:text-white">
      {/* ========================================================
          1. HERO MASTHEAD (Editorial / Premium)
         ======================================================== */}
      <section className="relative w-full pt-10 md:pt-16 pb-16 md:pb-24 border-b border-slate-200/80 bg-gradient-to-b from-[#F8FAFC] via-[#FBFBFD] to-[#F1F5F9]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Lado Izquierdo: Copy Editorial */}
            <div className="lg:col-span-6 flex flex-col items-start text-left">
              {/* Overline Editorial Tag */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/[0.04] border border-slate-900/10 text-slate-700 text-[11px] font-mono font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Revisión fácil de carros usados · Colombia 2026</span>
              </div>

              {/* Título Principal Editorial */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold text-[#0F172A] tracking-[-0.03em] leading-[1.12] mb-6 font-sans">
                Revisa el carro antes de comprarlo.{' '}
                <span className="block mt-1 font-normal text-slate-600">
                  Evita engaños en papeles, multas y fallas mecánicas.
                </span>
              </h1>

              {/* Texto de Apoyo con Lenguaje Claro */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-8 leading-relaxed font-normal">
                ¿Viste un carro usado que te gusta? Antes de dar un anticipo o pagar un peritaje, revísalo aquí paso a paso. En 15 minutos sabrás si tiene multas pendientes, si le bajaron el kilometraje, qué arreglos le faltan y cuánto descuento pedirle al vendedor.
              </p>

              {/* CTAs de Alta Jerarquía Táctil */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mb-6">
                <Link
                  href="/evaluacion"
                  className="inline-flex items-center justify-center gap-2.5 px-7 h-12 rounded-full bg-slate-900 text-white text-sm font-semibold tracking-wide shadow-xs hover:bg-slate-800 hover:shadow-md transition-all duration-200 active:scale-[0.98] group"
                >
                  <span>Revisar un carro ahora</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[2.5] text-emerald-400" />
                </Link>

                <Link
                  href="/cuanto-cuesta-mantener-carro-usado-colombia"
                  className="inline-flex items-center justify-center gap-2 px-6 h-12 rounded-full bg-white border border-slate-300 text-slate-800 text-sm font-semibold hover:bg-slate-50 hover:border-slate-400 transition-all duration-150 shadow-2xs"
                >
                  <Calculator className="w-4 h-4 text-slate-500" />
                  <span>Calcular gastos anuales</span>
                </Link>
              </div>

              {/* Micro-puntos de Confianza */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  Acceso libre sin registro obligatorio
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  Datos vigentes de Colombia
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                  100% independiente
                </span>
              </div>
            </div>

            {/* Lado Derecho: Dossier Visual de Referencia Técnica */}
            <div className="lg:col-span-6 relative w-full flex justify-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-white">
                
                {/* Cabecera Técnica del Dossier */}
                <div className="px-5 py-3 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 text-[11px] font-mono tracking-wider">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span className="text-slate-200 uppercase font-bold">EXPEDIENTE DE PREEVALUACIÓN</span>
                  </div>
                  <span className="text-slate-400">PROTOCOLO CO-2026</span>
                </div>

                {/* Fotografía de Estudio del Vehículo */}
                <div className="relative w-full h-[280px] sm:h-[350px] md:h-[390px] bg-slate-100">
                  <Image
                    src="/pexels-mikebird-20475010.jpg"
                    alt="Inspección inteligente de vehículo sedán en estudio"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) 512px, 584px"
                    className="object-cover object-center"
                  />
                  {/* Gradiente sutil editorial */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/15 pointer-events-none"></div>
                </div>

                {/* 1. GAUGE DE PUNTUACIÓN EDITORIAL (Tarjeta flotante superior izquierda) */}
                <div className="absolute top-14 sm:top-16 left-3.5 sm:left-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 shadow-lg border border-slate-200/80 flex flex-col items-center min-w-[135px] sm:min-w-[150px] animate-fadeIn">
                  <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
                    SCORE GLOBAL
                  </span>

                  {/* Gauge Circular Preciso */}
                  <div className="relative w-20 h-20 sm:w-22 sm:h-22 flex items-center justify-center">
                    <svg
                      className="w-full h-full -rotate-90 transform"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#E2E8F0"
                        strokeWidth="7"
                        strokeDasharray="251.2"
                        strokeDashoffset="62.8"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="transparent"
                        stroke="#D97706"
                        strokeWidth="7"
                        strokeDasharray="251.2"
                        strokeDashoffset="110"
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <div className="flex items-baseline gap-0.5 leading-none">
                        <span className="text-2xl font-extrabold text-slate-900 font-mono">
                          75
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          /100
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold">
                    Revisión sugerida
                  </div>
                </div>

                {/* 2. TARJETA DE PROYECCIÓN DE COSTO ANUAL (Tarjeta flotante inferior derecha) */}
                <div className="absolute bottom-4 sm:bottom-6 right-3.5 sm:right-5 bg-white/95 backdrop-blur-md rounded-xl p-3.5 sm:p-4 shadow-lg border border-slate-200/80 min-w-[210px] sm:min-w-[250px] animate-fadeIn">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] font-mono font-bold tracking-wider text-slate-500 uppercase">
                      PROYECCIÓN ANUAL
                    </span>
                    <span className="text-[9px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                      Estimado 2026
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-medium">
                    Costo real de tenencia
                  </p>
                  <div className="flex items-baseline gap-1 my-1">
                    <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">
                      $7.820.000
                    </span>
                    <span className="text-[11px] text-slate-500">COP/año</span>
                  </div>

                  {/* Barra de desglose multicriterio */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden flex gap-0.5 mt-2">
                    <div className="h-full bg-slate-700 w-[55%]" title="Combustible: 55%"></div>
                    <div className="h-full bg-emerald-600 w-[25%]" title="Mantenimiento: 25%"></div>
                    <div className="h-full bg-amber-500 w-[20%]" title="Impuestos y SOAT: 20%"></div>
                  </div>

                  <div className="flex items-center justify-between text-[9px] text-slate-500 mt-1.5 font-medium font-mono">
                    <span>Gasolina 55%</span>
                    <span>Mant. 25%</span>
                    <span>SOAT/Imp. 20%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          2. STAT STRIP / DOSSIER SUMMARY
         ======================================================== */}
      <section className="w-full bg-white border-b border-slate-200/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            
            <div className="flex flex-col items-start pt-3 sm:pt-0 sm:px-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                80
              </span>
              <span className="text-xs font-semibold text-slate-800 mt-1 uppercase tracking-wider">
                Puntos de inspección
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Chasis, pintura, mecánica, habitáculo y seguridad activa.
              </p>
            </div>

            <div className="flex flex-col items-start pt-3 sm:pt-0 sm:px-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                03
              </span>
              <span className="text-xs font-semibold text-slate-800 mt-1 uppercase tracking-wider">
                Fuentes oficiales
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Cruce directo con RUNT, SIMIT y registros Fasecolda.
              </p>
            </div>

            <div className="flex flex-col items-start pt-3 sm:pt-0 sm:px-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                15 min
              </span>
              <span className="text-xs font-semibold text-slate-800 mt-1 uppercase tracking-wider">
                Tiempo de auditoría
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Flujo ágil optimizado para usar desde el celular ante el auto.
              </p>
            </div>

            <div className="flex flex-col items-start pt-3 sm:pt-0 sm:px-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                100%
              </span>
              <span className="text-xs font-semibold text-slate-800 mt-1 uppercase tracking-wider">
                Independiente
              </span>
              <p className="text-xs text-slate-500 mt-0.5">
                Cero comisiones de talleres o concesionarios de usados.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          3. LOS 3 PILARES DE EVALUACIÓN (Módulos de Auditoría)
         ======================================================== */}
      <section className="w-full py-16 md:py-24 bg-[#F8FAFC]" id="servicios">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Encabezado de Sección */}
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-700 text-[11px] font-mono uppercase tracking-wider mb-3 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-slate-600" />
              <span>Áreas de auditoría vehicular</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Tres dimensiones analíticas antes de negociar.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Comprar un vehículo usado implica riesgos legales, mecánicos y financieros.
              EscaneApp desglosa cada componente para que negocies con datos firmes o descartes a tiempo.
            </p>
          </div>

          {/* Grid de 3 Pilares */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            
            {/* Pilar 1: Legal y Trazabilidad */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-6">
                  <Scale className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  01 · Marco Legal
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Trazabilidad y antecedentes
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Verifica que el vehículo pueda transferirse limpiamente: embargos, prendas financieras, comparendos pendientes y siniestros históricos asegurados.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-5 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Historial de propietarios y servicio (RUNT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Multas pendientes y acuerdos activos (SIMIT)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Reclamaciones de aseguradoras (Fasecolda)</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/antecedentes-vehiculo-colombia"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-700 transition-colors group"
                >
                  <span>Revisar guía de antecedentes</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Pilar 2: Inspección Física (80 Puntos) */}
            <div className="bg-white border-2 border-slate-900/15 rounded-2xl p-7 flex flex-col justify-between shadow-xs relative hover:shadow-md transition-all duration-200">
              <div className="absolute top-4 right-4">
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-mono font-bold tracking-wider uppercase">
                  Módulo central
                </span>
              </div>

              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-2xs">
                  <Car className="w-6 h-6 stroke-[1.75] text-emerald-400" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  02 · Inspección Física
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Checklist técnico de 80 puntos
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  Auditoría metódica paso a paso para examinar la carrocería, alineación de paneles, fugas en vano motor, desgaste de llantas y seguridad pasiva.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-5 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Chasis, puntas y descuadres estructurales</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Fugas de fluidos, ruidos y humo en escape</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Sistemas eléctricos, frenos y estado del interior</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/evaluacion"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs active:scale-[0.98]"
                >
                  <span>Iniciar checklist interactivo</span>
                  <ArrowRight className="w-4 h-4 stroke-[2] text-emerald-400" />
                </Link>
              </div>
            </div>

            {/* Pilar 3: Financiero y Costo Real */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-200">
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 mb-6">
                  <Fuel className="w-6 h-6 stroke-[1.75]" />
                </div>
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  03 · Viabilidad Financiera
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Costos reales de propiedad
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                  El precio de compra es solo el inicio. Proyecta con precisión cuánto costará rodar el vehículo en Colombia durante el primer año.
                </p>

                <ul className="space-y-2.5 text-xs text-slate-700 border-t border-slate-100 pt-5 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Tarifas vigentes de Impuesto Vehicular 2026</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>SOAT oficial según cilindraje y tipo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Gasto proyectado de gasolina y mantenimiento</span>
                  </li>
                </ul>
              </div>

              <div>
                <Link
                  href="/cuanto-cuesta-mantener-carro-usado-colombia"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-emerald-700 transition-colors group"
                >
                  <span>Abrir calculadora financiera</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          4. METODOLOGÍA EDITORIAL EN 4 PASOS
         ======================================================== */}
      <section className="w-full py-16 md:py-24 bg-white border-t border-slate-200/80" id="como-funciona">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Lado Izquierdo: Fotografía de Inspección */}
            <div className="lg:col-span-5 relative w-full">
              <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100">
                <Image
                  src="/pexels-mikebird-20475072.jpg"
                  alt="Inspección detallada de vehículo con puertas y baúl abiertos"
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center"
                />

                {/* Badge técnico inferior con frosted glass editorial */}
                <div className="absolute bottom-5 left-5 right-5 bg-slate-900/95 backdrop-blur-md rounded-xl p-4 border border-white/10 shadow-xl text-white">
                  <div className="flex items-center gap-2 mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                      PROTOCOLO ESTANDARIZADO
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 font-normal leading-relaxed">
                    Evaluaciones reproducibles y objetivas, diseñadas para que cualquier comprador identifique señales de alarma.
                  </p>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Flujo Numérico */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono font-semibold uppercase tracking-wider mb-4 w-fit">
                <span>El flujo metodológico</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Cómo opera la evaluación previa.
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-8 max-w-xl">
                Un orden riguroso que te ahorra desplazamientos infructuosos y gastos innecesarios de peritaje en vehículos con fallas ocultas evidentes.
              </p>

              {/* Los 4 Pasos Numéricos */}
              <div className="space-y-4">
                
                {/* Paso 01 */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Ficha y parámetros del vehículo
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Ingresa marca, línea, modelo, kilometraje actual y valor ofertado para calibrar los umbrales de depreciación y desgaste esperado.
                    </p>
                  </div>
                </div>

                {/* Paso 02 */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Cotejo en registros del Estado
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Verificación guiada de placa y chasis en RUNT, SIMIT y base de siniestros Fasecolda para confirmar titularidad y restricciones legales.
                    </p>
                  </div>
                </div>

                {/* Paso 03 */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 text-slate-900 font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">
                      Inspección visual estructurada (80 Puntos)
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Checklist organizado por módulos críticos: estructura exterior, compartimento motor, tren motriz, habitáculo y luces.
                    </p>
                  </div>
                </div>

                {/* Paso 04 */}
                <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-4 sm:p-5 flex items-start gap-4 hover:border-slate-300 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-mono text-sm font-bold flex items-center justify-center shrink-0 shadow-2xs">
                    04
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-slate-900">
                        Dictamen preliminar y estimación económica
                      </h3>
                      <div className="flex items-center gap-1 ml-auto">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Generación del Score EscaneApp con desglose de reparaciones inmediatas sugeridas y recomendación fundamentada de compra o peritaje oficial.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          5. ACCESO DIRECTO A FUENTES OFICIALES
         ======================================================== */}
      <section className="w-full py-16 md:py-24 bg-[#F8FAFC] border-t border-slate-200/80" id="metodologia">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-200/60 text-slate-700 text-[11px] font-mono uppercase tracking-wider mb-3 font-semibold">
              <Search className="w-3.5 h-3.5 text-slate-600" />
              <span>Vigilancia documental oficial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Consulta las bases del Estado colombiano.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Nunca compres un carro sin validar personalmente estas tres plataformas. Enlaces directos a los portales oficiales de la República de Colombia:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            
            {/* Tarjeta RUNT */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-40 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
                  <Image
                    src="/logo-runt.png"
                    alt="Logo oficial del Registro Único Nacional de Tránsito"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain p-6"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Registro Único de Tránsito
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    RUNT
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Historial de propietarios, prendas bancarias vigentes, embargos judiciales y registro de servicio público o particular.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={ENLACES_PORTALES.RUNT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <span>Consultar en RUNT</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Tarjeta SIMIT */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-40 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
                  <Image
                    src="/logo-simit.png"
                    alt="Logotipo oficial SIMIT Federación Colombiana de Municipios"
                    width={200}
                    height={60}
                    className="object-contain max-h-20 w-auto"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Multas y comparendos
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    SIMIT
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comparendos por fotomultas pendientes de pago a nivel nacional que impiden de forma absoluta realizar el traspaso ante secretarías.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={ENLACES_PORTALES.SIMIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <span>Consultar en SIMIT</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

            {/* Tarjeta FASECOLDA */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between">
              <div>
                <div className="relative w-full h-40 bg-slate-50 border-b border-slate-100 flex items-center justify-center p-6">
                  <Image
                    src="/logo-fasecolda.png"
                    alt="Logotipo oficial Fasecolda"
                    width={200}
                    height={60}
                    className="object-contain max-h-20 w-auto"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Historial de aseguradoras
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    FASECOLDA
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Registro de siniestros amparados con pólizas todo riesgo por pérdida parcial o total de mayor cuantía y valor asegurado comercial.
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0">
                <a
                  href={ENLACES_PORTALES.FASECOLDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 h-10 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors"
                >
                  <span>Consultar en Fasecolda</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              </div>
            </div>

          </div>

          {/* Manifiesto de Honestidad Técnica */}
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl p-7 sm:p-9 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                COMPROMISO DE TRANSPARENCIA
              </span>
              <h3 className="text-lg font-bold mb-2 tracking-tight text-white">
                EscaneApp es tu filtro inicial, no un reemplazo de peritaje presencial.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Nuestra herramienta te da la metodología analítica para descartar opciones riesgosas por tu cuenta. Cuando un auto supera satisfactoriamente este filtro preliminar y los antecedentes son óptimos, te recomendamos contratar un peritaje con elevador y escáner OBD profesional.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================
          6. BIBLIOTECA EDITORIAL (Guías de Campo para Compradores)
         ======================================================== */}
      <section className="w-full py-16 md:py-20 bg-white border-t border-slate-200/80" id="guias">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px] font-mono uppercase tracking-wider mb-3 font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-slate-600" />
              <span>Guías de campo para compradores</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Criterio técnico para el comprador.
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Lecturas esenciales para inspeccionar un auto usado con ojo crítico y saber qué preguntas formular al vendedor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Guía 1 */}
            <Link
              href="/como-revisar-carro-usado"
              className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-400 hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-700">
                    Inspección
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" /> 5 min
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  ¿Cómo revisar un carro usado paso a paso?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Metodología ordenada para examinar el auto en persona sin olvidar puntos críticos.
                </p>
              </div>
              <span className="mt-6 text-xs font-semibold text-slate-900 inline-flex items-center gap-1 group-hover:text-emerald-700">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Guía 2 */}
            <Link
              href="/costo-peritaje-colombia"
              className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-400 hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-700">
                    Mercado
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" /> 5 min
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  ¿Cuánto cuesta un peritaje vehicular en Colombia?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Tarifas promedio, qué incluye cada paquete y cómo elegir un centro de diagnóstico confiable.
                </p>
              </div>
              <span className="mt-6 text-xs font-semibold text-slate-900 inline-flex items-center gap-1 group-hover:text-emerald-700">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Guía 3 */}
            <Link
              href="/kilometraje-carro-usado"
              className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-400 hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-700">
                    Mecánica
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" /> 6 min
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  ¿Cómo auditar el kilometraje real?
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Cómo detectar adulteraciones en el odómetro a través del desgaste de volante, pedales y facturas.
                </p>
              </div>
              <span className="mt-6 text-xs font-semibold text-slate-900 inline-flex items-center gap-1 group-hover:text-emerald-700">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            {/* Guía 4 */}
            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-[#F8FAFC] border border-slate-200 p-6 rounded-2xl flex flex-col justify-between hover:border-slate-400 hover:shadow-xs transition-all duration-200 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-mono font-semibold text-slate-700">
                    Normativa
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 font-mono">
                    <Clock className="w-3 h-3" /> 5 min
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-2 group-hover:text-emerald-700 transition-colors leading-snug">
                  Antecedentes y limitaciones al dominio
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prendas bancarias, medidas cautelares y trámites que pueden anular una compraventa.
                </p>
              </div>
              <span className="mt-6 text-xs font-semibold text-slate-900 inline-flex items-center gap-1 group-hover:text-emerald-700">
                Leer guía <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ========================================================
          7. AVISO EDITORIAL: LÍMITES Y PRINCIPIOS DE ACCIÓN
         ======================================================== */}
      <section className="w-full py-14 bg-[#F8FAFC] border-t border-slate-200/80" id="aviso-legal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 md:p-10 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <span className="px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider w-fit">
                LÍMITES DEL SERVICIO
              </span>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Herramienta de preevaluación analítica para el comprador prudente.
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs text-slate-600">
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-2">
                  <span className="font-mono text-slate-400">01.</span>
                  Filtro de descarte
                </h4>
                <p className="leading-relaxed">
                  Diseñado para descartar vehículos con antecedentes adversos o desgastes severos antes de comprometer dinero en peritajes o depósitos.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-2">
                  <span className="font-mono text-slate-400">02.</span>
                  Inspección verificable
                </h4>
                <p className="leading-relaxed">
                  Permite comprobar condición general, desgastes evidentes y costos de operación que influyen directamente en la negociación.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-2">
                  <span className="font-mono text-slate-400">03.</span>
                  Criterio para peritar
                </h4>
                <p className="leading-relaxed">
                  Si el vehículo aprueba el checklist preliminar y los registros están limpios, el paso natural es contratar un peritaje oficial.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 text-sm flex items-center gap-2">
                  <span className="font-mono text-slate-400">04.</span>
                  Cero intermediación
                </h4>
                <p className="leading-relaxed">
                  No comisionamos por ventas ni referimos talleres preferentes. Nuestra evaluación es exclusivamente en favor del comprador.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. CTA DE CIERRE (Editorial Obsidian Box)
         ======================================================== */}
      <section className="w-full py-20 md:py-28 bg-[#0F172A] text-white relative overflow-hidden">
        {/* Patrón de cuadrícula editorial sutil de fondo */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-emerald-400 text-[11px] font-mono uppercase tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Acceso inmediato · Edición 2026</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
            ¿Tienes un vehículo en la mira?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mb-10 leading-relaxed font-normal">
            Haz la evaluación preliminar en 15 minutos antes de coordinar el traspaso o pagar un peritaje completo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 w-full sm:w-auto">
            <Link
              href="/evaluacion"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 h-12 rounded-full bg-white text-slate-950 text-sm font-semibold tracking-wide shadow-sm hover:bg-slate-100 transition-all duration-200"
            >
              <span>Escanear vehículo ahora</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 h-12 rounded-full bg-white/10 border border-white/20 text-white text-sm font-semibold hover:bg-white/15 transition-all duration-150"
            >
              <Calculator className="w-4 h-4 text-slate-300" />
              <span>Calcular gastos anuales</span>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              Checklist de 80 puntos
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              RUNT · SIMIT · Fasecolda
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              Estimación de costos ocultos
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
