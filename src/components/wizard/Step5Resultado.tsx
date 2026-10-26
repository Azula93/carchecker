'use client';

import React, { useState, useEffect } from 'react';
import {
  Car,
  Download,
  Copy,
  Check,
  RotateCcw,
  TrendingDown,
  Building2,
  AlertTriangle,
} from 'lucide-react';
import { Evaluacion, ResultadoFinal } from '../../types/evaluation';
import { formatCOP } from '../../data/repair-costs';
import { GaugeChart } from '../ui/GaugeChart';
import { Alert } from '../ui/Alert';
import { imprimirReportePDF, generarResumenTexto } from '../../lib/pdf-generator';
import type { DatosImpuestoVehicular, RespuestaImpuestoVehicularAPI } from '@/types/external-data';

function WhatsAppIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface Step5ResultadoProps {
  evaluacion: Evaluacion;
  resultado: ResultadoFinal;
  onReiniciar: () => void;
}

export const Step5Resultado: React.FC<Step5ResultadoProps> = ({
  evaluacion,
  resultado,
  onReiniciar,
}) => {
  const [copiado, setCopiado] = useState(false);
  const [impuestoEstimado, setImpuestoEstimado] = useState<DatosImpuestoVehicular | null>(null);

  const vehiculoNombre = evaluacion.datosBasicos.lineaVehiculo?.toUpperCase() || 'VEHÍCULO EVALUADO';
  const placa = evaluacion.datosBasicos.placa ? evaluacion.datosBasicos.placa.toUpperCase() : 'ABC 123';
  const ciudadPlaca = evaluacion.datosBasicos.ciudadPlaca?.toUpperCase() || 'BOGOTÁ D.C.';
  const anio = evaluacion.datosBasicos.anioModelo || new Date().getFullYear();
  const km = evaluacion.datosBasicos.kilometraje || 0;
  const esDescarte = resultado.esDescarte;
  const esInferior65 = resultado.porcentajeGlobal < 65;

  let veredictoBadge = {
    titulo: 'BUENA OPCIÓN — VALE LA PENA',
    subtitulo: 'El carro se encuentra en buena condición frente a su año y kilometraje',
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-900',
  };

  if (resultado.esDescarte) {
    veredictoBadge = {
      titulo: '¡NO LO COMPRES! — RIESGO MUY ALTO',
      subtitulo: resultado.motivoDescarte || 'Tiene un problema grave legal o de choque severo',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
    };
  } else if (resultado.veredicto === 'no_comprar' || resultado.porcentajeGlobal < 50) {
    veredictoBadge = {
      titulo: 'NO RECOMENDADO — DEMASIADAS FALLAS',
      subtitulo: 'Tiene muchos detalles dañados o desgastes que te van a costar mucho dinero',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      text: 'text-rose-900',
    };
  } else if (resultado.veredicto === 'riesgoso' || resultado.porcentajeGlobal < 65) {
    veredictoBadge = {
      titulo: 'CUIDADO — TIENE DETALLES IMPORTANTES',
      subtitulo: 'Puntaje regular; solo cómpralo si el vendedor te hace una muy buena rebaja',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      text: 'text-amber-900',
    };
  } else if (resultado.veredicto === 'aceptable' || resultado.porcentajeGlobal < 80) {
    veredictoBadge = {
      titulo: 'ACEPTABLE — NEGOCIA EL PRECIO',
      subtitulo: 'En general está bien, pero tiene desgastes normales de uso',
      bg: 'bg-slate-100',
      border: 'border-slate-300',
      text: 'text-slate-900',
    };
  }

  useEffect(() => {
    let cancel = false;
    const linea = evaluacion.datosBasicos.lineaVehiculo;
    const anioModelo = evaluacion.datosBasicos.anioModelo;
    if (!linea || !anioModelo) return;

    const params = new URLSearchParams({
      linea,
      anioModelo: anioModelo.toString(),
      vigencia: '2026',
    });

    fetch(`/api/impuesto-vehicular?${params.toString()}`)
      .then((res) => res.json())
      .then((json: RespuestaImpuestoVehicularAPI) => {
        if (cancel) return;
        if (json.success && json.data) {
          setImpuestoEstimado(json.data);
        } else {
          setImpuestoEstimado(null);
        }
      })
      .catch(() => {
        if (!cancel) setImpuestoEstimado(null);
      });

    return () => {
      cancel = true;
    };
  }, [evaluacion.datosBasicos.lineaVehiculo, evaluacion.datosBasicos.anioModelo]);

  const scriptNegociacion = `Hola, revisé en detalle el ${vehiculoNombre} (Placa ${placa} de ${ciudadPlaca}). Encontré algunos desgastes y detalles pendientes que requerirían una inversión aproximada de ${formatCOP(resultado.totalReparaciones)}. Teniendo en cuenta esos arreglos, te propongo ${
    evaluacion.precioVenta > 0 ? `un valor de ${formatCOP(resultado.precioSugerido)}` : 'descontar esos gastos del precio'
  } para cerrar el negocio. Si te parece bien, coordinamos el peritaje oficial.`;

  const resumenTexto = generarResumenTexto(evaluacion, resultado);
  const whatsappUrlReporte = `https://api.whatsapp.com/send?text=${encodeURIComponent(resumenTexto)}`;
  const whatsappUrlNegociacion = `https://api.whatsapp.com/send?text=${encodeURIComponent(scriptNegociacion)}`;

  const handleCopiarResumen = async () => {
    try {
      await navigator.clipboard.writeText(scriptNegociacion);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6 print:p-0">
      {/* ==================================================== */}
      {/* VISTA WEB INTERACTIVA (Oculta al imprimir / PDF)     */}
      {/* ==================================================== */}
      <div className="print:hidden space-y-6">
        
        {/* Encabezado Editorial del Paso */}
        <div className="border-b border-slate-200/90 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>PASO 05 · RESULTADO FINAL Y CONSEJOS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Puntaje global y qué deberías hacer
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Aquí tienes el resumen claro de lo que encontraste en la revisión, cuánto dinero deberías gastarle y qué propuesta hacerle al vendedor.
            </p>
          </div>

          {/* Botones de acción principales */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={whatsappUrlReporte}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
              title="Compartir resumen por WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Compartir por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={imprimirReportePDF}
              className="h-10 px-4 sm:px-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs flex items-center gap-2 cursor-pointer active:scale-[0.98] transition-all"
              title="Descargar o imprimir este reporte en PDF"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Guardar en PDF</span>
            </button>

            <button
              type="button"
              onClick={onReiniciar}
              className="h-10 px-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer active:scale-[0.98] shadow-2xs"
              title="Revisar otro carro desde cero"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Revisar otro</span>
            </button>
          </div>
        </div>

        {/* Ficha Resumen del Carro */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0 shadow-2xs">
              <Car className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="font-bold text-base sm:text-lg text-slate-900 truncate uppercase">
                  {vehiculoNombre}
                </span>
                <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded bg-[#FFD100] text-slate-950 border border-[#CA8A04] shadow-2xs tracking-wider">
                  {placa}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Modelo {anio} · {km.toLocaleString('es-CO')} km · {ciudadPlaca}
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Revisión Completa
            </span>
          </div>
        </div>

        {/* Tarjeta Hero de Puntuación Global */}
        <div
          className={`p-6 sm:p-8 rounded-2xl border shadow-xs transition-all ${
            esDescarte
              ? 'bg-rose-50/70 border-rose-200'
              : esInferior65
              ? 'bg-amber-50/70 border-amber-200'
              : resultado.porcentajeGlobal >= 80
              ? 'bg-emerald-50/70 border-emerald-200'
              : 'bg-amber-50/70 border-amber-200'
          }`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="shrink-0">
              <GaugeChart
                percentage={resultado.porcentajeGlobal}
                esDescarte={esDescarte}
                size={230}
                label="Puntaje del Carro"
              />
            </div>

            <div className="flex-1 w-full space-y-3">
              <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-semibold uppercase bg-white border border-slate-300 text-slate-800 shadow-2xs">
                  {vehiculoNombre} · MOD. {anio}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-900 text-white shadow-2xs">
                  {placa}
                </span>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200/90 text-xs text-slate-600 leading-relaxed shadow-xs space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <span className="font-bold text-slate-900 text-xs uppercase tracking-wider font-mono">
                    Resumen del Veredicto
                  </span>
                  <span className="font-mono font-bold text-sm text-slate-900">
                    {esDescarte ? '0' : resultado.porcentajeGlobal}/100 puntos
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800">
                  El estado físico del carro obtuvo <strong className="text-slate-950 font-bold">{resultado.porcentajeChecklist}%</strong>, el historial de papeles y multas un <strong className="text-slate-950 font-bold">{resultado.porcentajeLegales}%</strong> y su kilometraje un <strong className="text-slate-950 font-bold">{resultado.porcentajeKilometraje}%</strong>. Calculamos que tendrías que gastar aproximadamente <strong className="text-rose-700 font-mono font-bold">{formatCOP(resultado.totalReparaciones)}</strong> en arreglos.
                </p>

                {esDescarte && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
                    ¡Atención!: {resultado.motivoDescarte || 'Encontramos un problema muy grave'}. Te sugerimos no comprar este carro o descartarlo de inmediato.
                  </div>
                )}

                {esInferior65 && !esDescarte && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                    Atención: La calificación del carro es baja (menos de 65 puntos). Si el dueño no te hace un descuento muy generoso, es mejor que busques otra opción.
                  </div>
                )}

                <p className="text-[11px] text-slate-400 italic pt-1.5 border-t border-slate-100 font-mono">
                  * Este resultado es una guía basada en lo que revisaste. Si decides comprarlo, te recomendamos llevarlo a un peritaje con escáner profesional.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Las 4 Partes Clave de la Revisión */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              ¿Cómo le fue al carro en cada área?
            </h3>
            <span className="text-xs font-mono text-slate-400">4 aspectos clave</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1: Kilometraje */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-semibold">1. Kilometraje y uso</span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {resultado.porcentajeKilometraje}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    style={{ width: `${resultado.porcentajeKilometraje}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-mono text-[11px]">
                  {km.toLocaleString('es-CO')} km ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km por año).
                </p>
              </div>
              <span className="mt-3.5 text-[10px] font-mono text-slate-400">Vale el 20% de la nota</span>
            </div>

            {/* 2: Papeles y multas */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-semibold">2. Papeles y multas</span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {resultado.porcentajeLegales}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    style={{ width: `${resultado.porcentajeLegales}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-[11px]">
                  {evaluacion.antecedentesLegales.placaPublica
                    ? 'Fue taxi o servicio público'
                    : evaluacion.antecedentesLegales.codigoSiniestro !== 'ninguno'
                    ? `Choque: ${evaluacion.antecedentesLegales.codigoSiniestro}`
                    : 'Sin problemas legales'}
                </p>
              </div>
              <span className="mt-3.5 text-[10px] font-mono text-slate-400">Vale el 30% de la nota</span>
            </div>

            {/* 3: Revisión física */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-semibold">3. Estado físico</span>
                  <span className="text-xs font-mono font-bold text-slate-900">
                    {resultado.porcentajeChecklist}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="h-full bg-slate-900 rounded-full transition-all duration-500"
                    style={{ width: `${resultado.porcentajeChecklist}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-[11px]">
                  {evaluacion.checklistItems.length} puntos revisados en total.
                </p>
              </div>
              <span className="mt-3.5 text-[10px] font-mono text-slate-400">Vale el 50% de la nota</span>
            </div>

            {/* 4: Arreglos */}
            <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between hover:border-slate-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-slate-500 font-semibold">4. Gasto en arreglos</span>
                  <span className="text-xs font-mono font-bold text-rose-700">
                    -{formatCOP(resultado.totalReparaciones)}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-2.5">
                  <div
                    className="h-full bg-rose-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.max(10, (resultado.totalReparaciones / (evaluacion.precioVenta || 50000000)) * 100))}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 leading-relaxed text-[11px]">
                  {evaluacion.costosReparacion.length} arreglo(s) que tendrías que pagar.
                </p>
              </div>
              <span className="mt-3.5 text-[10px] font-mono text-slate-400">Para pedir descuento</span>
            </div>
          </div>
        </div>

        {/* Sección de Negociación y Propuesta Económica */}
        <div className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-2xs flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900">¿Cómo negociar el precio con el vendedor?</h4>
              <span className="text-xs text-slate-500">Valores para acordar una rebaja justa</span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
              <TrendingDown className="w-4 h-4 text-emerald-600" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[11px] text-slate-500 block font-mono">El vendedor te pide:</span>
              <span className="text-base sm:text-lg font-bold font-mono text-slate-900 mt-1 block">
                {evaluacion.precioVenta > 0 ? formatCOP(evaluacion.precioVenta) : 'No especificado'}
              </span>
            </div>

            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
              <span className="text-[11px] text-rose-700 block font-mono">Gasto en arreglos que detectaste:</span>
              <span className="text-base sm:text-lg font-bold font-mono text-rose-700 mt-1 block">
                - {formatCOP(resultado.totalReparaciones)}
              </span>
            </div>

            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="text-[11px] text-emerald-800 block font-mono">Cuánto deberías ofrecerle máximo:</span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-800 mt-1 block">
                {evaluacion.precioVenta > 0 ? formatCOP(resultado.precioSugerido) : 'Escribe el precio primero'}
              </span>
            </div>
          </div>

          {/* Mensaje para WhatsApp con botón de envío directo y copia */}
          <div className="flex flex-col gap-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={whatsappUrlNegociacion}
                target="_blank"
                rel="noopener noreferrer"
                className="h-11 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-xl px-4 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-[0.99]"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>Enviar propuesta al vendedor por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopiarResumen}
                className="h-11 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl px-4 flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer shadow-2xs active:scale-[0.99]"
              >
                {copiado ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
                <span>{copiado ? '¡Texto copiado al portapapeles!' : 'Copiar texto para WhatsApp'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 italic leading-relaxed font-mono text-[11px] select-all">
              &ldquo;{scriptNegociacion}&rdquo;
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-500 font-mono px-1">
              <span>💡 Tip: Puedes personalizar el mensaje antes de enviarlo por WhatsApp.</span>
              <a
                href={whatsappUrlReporte}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-bold"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600" />
                <span>Compartir reporte completo</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Costos de Tenencia Estimados (Impuesto Vehicular 2026) */}
        {impuestoEstimado && (
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono">
                  ¿Cuánto pagará de impuesto este carro en {impuestoEstimado.vigencia}?
                </span>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                Tarifas MinTransporte
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-mono">Avalúo del carro (MinTransporte)</span>
                <span className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                  {formatCOP(impuestoEstimado.baseGravable)}
                </span>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block font-mono">Impuesto anual estimado ({impuestoEstimado.tarifaTexto})</span>
                <span className="text-sm font-bold font-mono text-slate-900 mt-0.5 block">
                  {formatCOP(impuestoEstimado.impuestoAnualEstimado)}
                </span>
              </div>

              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-[10px] text-emerald-800 block font-mono">Ahorro mensual sugerido</span>
                <span className="text-sm font-bold font-mono text-emerald-800 mt-0.5 block">
                  {formatCOP(impuestoEstimado.provisionMensual)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-mono">
              * Este valor es solo para que calcules tus gastos fijos al año. No afecta la calificación del carro.
            </p>
          </div>
        )}

        {/* Alertas Consolidadas */}
        {resultado.alertas.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
              Detalles y cosas que debes tener en cuenta ({resultado.alertas.length})
            </h4>
            <div className="space-y-2.5">
              {resultado.alertas.map((alerta, idx) => (
                <Alert
                  key={idx}
                  tipo={alerta.tipo}
                  titulo={alerta.titulo}
                  mensaje={alerta.mensaje}
                  modulo={alerta.modulo}
                />
              ))}
            </div>
          </div>
        )}

        {/* Banner Editorial de Acciones Finales */}
        <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-xs flex flex-col md:flex-row items-center justify-between gap-5 border border-slate-800">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-slate-800 text-emerald-400 text-[10px] font-mono uppercase tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Llévalo contigo</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              ¿Listo para negociar o consultar con tu mecánico?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
              Descarga la hoja técnica en PDF o comparte el informe directamente por WhatsApp para respaldar tu oferta con datos reales.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap justify-center md:justify-end shrink-0 w-full md:w-auto">
            <a
              href={whatsappUrlReporte}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] w-full sm:w-auto"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Compartir por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={imprimirReportePDF}
              className="h-11 px-5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all active:scale-[0.98] w-full sm:w-auto cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Guardar en PDF</span>
            </button>
          </div>
        </div>

        {/* Pie de Informe & Próximo paso */}
        <div className="p-5 rounded-xl bg-white border border-slate-200 text-center text-xs text-slate-500 space-y-1.5 shadow-2xs font-mono text-[11px]">
          <p className="font-semibold text-slate-800">
            EscaneApp Colombia · ¿Cuál es el siguiente paso recomendado?
          </p>
          <p className="text-[11px] text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Si el carro te gusta y los papeles están al día, el paso final antes de firmar o transferir dinero es llevarlo a un peritaje profesional con escáner computarizado y revisión en elevador para revisar a fondo motor, caja y compresión.
          </p>
          <p className="text-[10px] text-slate-400 pt-1">
            ID REVISIÓN: ESC-{new Date().getFullYear()}-{placa.replace(/\s+/g, '')} · Datos guardados en tu dispositivo
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* REPORTE EJECUTIVO PDF — ESCANEAPP (Visible solo al imprimir) */}
      {/* ======================================================== */}
      <div className="hidden print:block font-sans text-slate-900 bg-white space-y-4 text-xs leading-normal">
        {/* Membrete Oficial EscaneApp */}
        <div className="border-b-2 border-slate-900 pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0">
              <Car className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-slate-900">ESCANEAPP</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-300">
                  Informe de Revisión
                </span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">
                Revisión y verificación de carros usados en Colombia
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-slate-500">
            <span className="font-bold text-slate-900 block">ID: ESC-{anio}-{placa.replace(/\s+/g, '')}</span>
            <span>Fecha: {new Date(evaluacion.fecha).toLocaleDateString('es-CO')}</span>
          </div>
        </div>

        {/* Ficha Resumida del Carro */}
        <div className="rounded-xl border border-slate-300 bg-slate-50 p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-base text-slate-900 uppercase">
                {vehiculoNombre}
              </span>
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-[#FFD100] text-slate-950 border border-amber-600">
                {placa}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-600 font-mono">
              <span>Modelo: <strong className="text-slate-900">{anio}</strong></span>
              <span>·</span>
              <span>Kilometraje: <strong className="text-slate-900">{km.toLocaleString('es-CO')} km</strong> ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km/año)</span>
              <span>·</span>
              <span>Ciudad: <strong className="text-slate-900">{ciudadPlaca}</strong></span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold font-mono">
              <Check className="w-3 h-3" />
              Revisión Completa
            </span>
          </div>
        </div>

        {/* Veredicto & Puntuación Global */}
        <div className="rounded-xl border border-slate-300 p-4 bg-white grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4 border-r border-slate-200 pr-4 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              PUNTAJE OBTENIDO
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-extrabold font-mono text-slate-900">
                {esDescarte ? '0' : resultado.porcentajeGlobal}
              </span>
              <span className="text-sm font-bold font-mono text-slate-500">/ 100 PTS</span>
            </div>
            <div className="mt-2">
              <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-bold uppercase font-mono border ${veredictoBadge.bg} ${veredictoBadge.border} ${veredictoBadge.text}`}>
                {veredictoBadge.titulo}
              </span>
            </div>
          </div>

          <div className="col-span-8 space-y-1.5 pl-1">
            <span className="text-[11px] font-mono font-bold uppercase text-slate-900">
              Resumen del Veredicto
            </span>
            <p className="text-[11px] text-slate-800 leading-relaxed">
              El estado físico obtuvo un <strong className="font-bold text-slate-950">{resultado.porcentajeChecklist}%</strong>, papeles y multas un <strong className="font-bold text-slate-950">{resultado.porcentajeLegales}%</strong> y el ritmo de kilometraje un <strong className="font-bold text-slate-950">{resultado.porcentajeKilometraje}%</strong>. Se calculó una deducción aproximada de <strong className="font-bold text-rose-700">{formatCOP(resultado.totalReparaciones)}</strong> en arreglos para tener en cuenta en el precio.
            </p>
            {esDescarte && (
              <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>ALERTA MÁXIMA: {resultado.motivoDescarte || 'Problema severo detectado. Se aconseja descartar este vehículo.'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Las 4 Partes Clave */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
            RESUMEN POR ÁREAS
          </span>
          <div className="grid grid-cols-4 gap-2.5">
            <div className="rounded-lg border border-slate-300 bg-slate-50 p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-slate-600">1. Kilometraje</span>
                <span className="font-mono font-bold text-slate-900">{resultado.porcentajeKilometraje}%</span>
              </div>
              <p className="text-[10px] text-slate-800 leading-tight font-mono">
                {km.toLocaleString('es-CO')} km ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km/año)
              </p>
            </div>

            <div className="rounded-lg border border-slate-300 bg-slate-50 p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-slate-600">2. Papeles</span>
                <span className="font-mono font-bold text-slate-900">{resultado.porcentajeLegales}%</span>
              </div>
              <p className="text-[10px] text-slate-800 leading-tight">
                {evaluacion.antecedentesLegales.placaPublica
                  ? 'Fue taxi o servicio público'
                  : evaluacion.antecedentesLegales.codigoSiniestro !== 'ninguno'
                  ? `Choque: ${evaluacion.antecedentesLegales.codigoSiniestro}`
                  : 'Sin antecedentes negativos'}
              </p>
            </div>

            <div className="rounded-lg border border-slate-300 bg-slate-50 p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-slate-600">3. Revisión física</span>
                <span className="font-mono font-bold text-slate-900">{resultado.porcentajeChecklist}%</span>
              </div>
              <p className="text-[10px] text-slate-800 leading-tight">
                {evaluacion.checklistItems.length} puntos evaluados
              </p>
            </div>

            <div className="rounded-lg border border-slate-300 bg-slate-50 p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-slate-600">4. Arreglos</span>
                <span className="font-mono font-bold text-rose-700">-{formatCOP(resultado.totalReparaciones)}</span>
              </div>
              <p className="text-[10px] text-slate-800 leading-tight">
                {evaluacion.costosReparacion.length} arreglo(s) pendiente(s)
              </p>
            </div>
          </div>
        </div>

        {/* Balance Financiero & Negociación */}
        <div className="rounded-xl border border-slate-300 bg-slate-50 p-3.5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
            PROPUESTA SUGERIDA PARA NEGOCIAR
          </span>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-white border border-slate-300">
              <span className="text-[10px] text-slate-500 font-mono block">Precio que te piden:</span>
              <span className="text-sm font-bold font-mono text-slate-900">
                {evaluacion.precioVenta > 0 ? formatCOP(evaluacion.precioVenta) : 'No especificado'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
              <span className="text-[10px] text-rose-700 font-mono block">Descuento por arreglos:</span>
              <span className="text-sm font-bold font-mono text-rose-700">
                - {formatCOP(resultado.totalReparaciones)}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-800 font-mono block">Cuánto ofrecerle máximo:</span>
              <span className="text-sm font-bold font-mono text-emerald-800">
                {evaluacion.precioVenta > 0 ? formatCOP(resultado.precioSugerido) : 'Ajustar según precio'}
              </span>
            </div>
          </div>
        </div>

        {/* Impuesto Vehicular Oficial (si aplica) */}
        {impuestoEstimado && (
          <div className="rounded-xl border border-slate-300 bg-white p-3 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-slate-900">Impuesto estimado ({impuestoEstimado.vigencia})</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span>Avalúo: <strong>{formatCOP(impuestoEstimado.baseGravable)}</strong></span>
              <span>Impuesto anual: <strong className="text-slate-900">{formatCOP(impuestoEstimado.impuestoAnualEstimado)}</strong></span>
              <span>Ahorro mensual: <strong className="text-emerald-700">{formatCOP(impuestoEstimado.provisionMensual)}</strong></span>
            </div>
          </div>
        )}

        {/* Alertas Registradas */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
            OBSERVACIONES Y ALERTAS ({resultado.alertas.length})
          </span>
          {resultado.alertas.length === 0 ? (
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>No se encontraron alertas críticas en esta revisión preliminar.</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              {resultado.alertas.slice(0, 5).map((alerta, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-[11px] flex items-start gap-2 ${
                    alerta.tipo === 'peligro'
                      ? 'bg-rose-50 border-rose-200 text-rose-800'
                      : alerta.tipo === 'advertencia'
                      ? 'bg-amber-50 border-amber-200 text-amber-800'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}
                >
                  <span className="font-mono font-bold uppercase text-[9px] px-1.5 py-0.5 rounded bg-white border shrink-0">
                    {alerta.modulo}
                  </span>
                  <div className="min-w-0 flex-1">
                    <strong className="font-bold">{alerta.titulo}:</strong> {alerta.mensaje}
                  </div>
                </div>
              ))}
              {resultado.alertas.length > 5 && (
                <p className="text-[10px] text-slate-500 italic">
                  + {resultado.alertas.length - 5} observaciones adicionales registradas en la evaluación digital.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Aviso Legal & Pie de Página */}
        <div className="border-t border-slate-300 pt-3 text-[10px] text-slate-500 space-y-1">
          <p className="font-bold text-slate-900">
            ESCANEAPP COLOMBIA · GUÍA DE REVISIÓN PRELIMINAR ANTES DE COMPRAR
          </p>
          <p className="leading-relaxed">
            <strong>Aviso Importante:</strong> Este informe es una guía informativa basada en las observaciones del usuario. No reemplaza un peritaje técnico en un Centro de Diagnóstico Automotor (CDA) formal. Te recomendamos hacer peritaje presencial con escáner antes de pagar el carro.
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 pt-1">
            <span>www.escaneapp.com</span>
            <span>ID REVISIÓN: ESC-{anio}-{placa.replace(/\s+/g, '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
