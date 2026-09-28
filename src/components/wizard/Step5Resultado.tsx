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
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Evaluacion, ResultadoFinal } from '../../types/evaluation';
import { formatCOP } from '../../data/repair-costs';
import { GaugeChart } from '../ui/GaugeChart';
import { Alert } from '../ui/Alert';
import { imprimirReportePDF } from '../../lib/pdf-generator';
import type { DatosImpuestoVehicular, RespuestaImpuestoVehicularAPI } from '@/types/external-data';

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
    titulo: 'EVALUACIÓN FAVORABLE',
    subtitulo: 'Condición preliminar positiva acorde a edad y kilometraje',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#BBF7D0]',
    text: 'text-[#2EAD68]',
  };

  if (resultado.esDescarte) {
    veredictoBadge = {
      titulo: 'CRITERIO DE DESCARTE INMEDIATO',
      subtitulo: resultado.motivoDescarte || 'Condición de riesgo severo detectada',
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#FECACA]',
      text: 'text-[#D64545]',
    };
  } else if (resultado.veredicto === 'no_comprar' || resultado.porcentajeGlobal < 50) {
    veredictoBadge = {
      titulo: 'RIESGO ELEVADO — NO SUGERIDO',
      subtitulo: 'Múltiples hallazgos y desgastes que comprometen la viabilidad',
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#FECACA]',
      text: 'text-[#D64545]',
    };
  } else if (resultado.veredicto === 'riesgoso' || resultado.porcentajeGlobal < 65) {
    veredictoBadge = {
      titulo: 'PRECAUCIÓN — OBSERVACIONES CRÍTICAS',
      subtitulo: 'Puntuación ajustada; requiere peritaje técnico riguroso',
      bg: 'bg-[#FFFBEB]',
      border: 'border-[#FDE68A]',
      text: 'text-[#D97706]',
    };
  } else if (resultado.veredicto === 'aceptable' || resultado.porcentajeGlobal < 80) {
    veredictoBadge = {
      titulo: 'FAVORABLE CONDICIONADO A CDA',
      subtitulo: 'Condiciones generales aceptables con desgastes normales',
      bg: 'bg-[#EFF6FF]',
      border: 'border-[#BFDBFE]',
      text: 'text-[#123B5D]',
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

  const scriptNegociacion = `Hola, tras realizar una revisión preliminar de referencia en Car Checker del ${vehiculoNombre} (Placa ${placa} de ${ciudadPlaca}), la puntuación estimada obtenida es de ${resultado.porcentajeGlobal}/100. Se estimaron aproximadamente ${formatCOP(resultado.totalReparaciones)} en posibles arreglos o desgastes a considerar. Con base en esta estimación orientativa, te propongo ${
    evaluacion.precioVenta > 0 ? `un valor de ${formatCOP(resultado.precioSugerido)}` : 'ajustar el precio deduciendo estos posibles costos'
  } para evaluar el negocio. (Nota: Es una estimación de referencia y no sustituye un peritaje técnico formal).`;

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
        {/* Encabezado del Paso */}
        <div className="border-b border-[#E2E8F0] pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/5 border border-[#123B5D]/10 text-xs font-mono uppercase tracking-widest text-[#123B5D] font-bold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8BCF3F]"></span>
              Paso 5 de 5 · Resumen de la Estimación
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17212B] tracking-tight">
              Puntuación y Sugerencias de la Revisión
            </h2>
            <p className="text-xs sm:text-sm text-[#66727D] mt-1 max-w-2xl leading-relaxed">
              Estimación preliminar y sugerencias orientativas calculadas a partir de tus observaciones. Esta herramienta no sustituye un peritaje técnico en un CDA ni una cotización en talleres o almacenes de repuestos.
            </p>
          </div>

          {/* Botones de acción principales */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={imprimirReportePDF}
              className="h-11 px-5 rounded-xl bg-[#123B5D] hover:bg-[#0E2F4B] text-white text-xs font-bold shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-[#8BCF3F]" />
              <span>Descargar Reporte PDF</span>
            </button>

            <button
              type="button"
              onClick={handleCopiarResumen}
              className="h-11 px-5 rounded-xl bg-[#8BCF3F] hover:bg-[#7CBF32] text-[#123B5D] text-xs font-black shadow-sm flex items-center gap-2 cursor-pointer active:scale-95 transition-all"
            >
              {copiado ? <Check className="w-4 h-4 text-[#123B5D]" /> : <Copy className="w-4 h-4 text-[#123B5D]" />}
              <span>{copiado ? '¡Copiado!' : 'Copiar para WhatsApp'}</span>
            </button>

            <button
              type="button"
              onClick={onReiniciar}
              className="h-11 px-4 rounded-xl bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#D64545] border border-[#FECACA] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              title="Iniciar nueva evaluación desde cero"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Nueva</span>
            </button>
          </div>
        </div>

      {/* Vehicle Summary Card */}
      <div className="bg-[#F7F9FA] rounded-2xl p-5 border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#123B5D] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Car className="w-6 h-6 text-[#8BCF3F]" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-black text-base sm:text-lg text-[#17212B] truncate uppercase">
                {vehiculoNombre}
              </span>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded bg-[#FFD100] text-[#123B5D] border border-[#CA8A04] shadow-2xs tracking-wider">
                {placa}
              </span>
            </div>
            <p className="text-xs text-[#66727D] font-mono mt-0.5">
              Modelo {anio} · {km.toLocaleString('es-CO')} km · {ciudadPlaca}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#2EAD68] text-xs font-bold">
            <Check className="w-3.5 h-3.5" />
            Revisión Completada
          </span>
        </div>
      </div>

      {/* Hero Score Card */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-sm transition-all ${
          esDescarte
            ? 'bg-[#FEF2F2]/60 border-[#FECACA]'
            : esInferior65
            ? 'bg-[#FFFBEB]/60 border-[#FDE68A]'
            : resultado.porcentajeGlobal >= 80
            ? 'bg-[#F0FDF4]/60 border-[#BBF7D0]'
            : 'bg-[#FFFBEB]/60 border-[#FDE68A]'
        } print:bg-white print:border-gray-300 print:text-black`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8">
          {/* Gauge circular tacómetro */}
          <div className="shrink-0">
            <GaugeChart
              percentage={resultado.porcentajeGlobal}
              esDescarte={esDescarte}
              size={230}
              label="Puntuación Estimada"
            />
          </div>

          {/* Compact Summary Box next to Gauge */}
          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-bold uppercase bg-white border border-[#CBD5E1] text-[#123B5D] shadow-2xs">
                {vehiculoNombre} · MOD. {anio}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-bold bg-[#123B5D] text-white shadow-2xs">
                {placa}
              </span>
            </div>

            {/* Clean Box: using format and style of former dictamen técnico */}
            <div className="bg-white p-5 rounded-2xl border border-[#E2E8F0] text-xs text-[#66727D] leading-relaxed shadow-sm space-y-2.5">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2.5">
                <span className="font-bold text-[#17212B] text-xs uppercase tracking-wider font-mono">
                  Resumen de la Estimación
                </span>
                <span className="font-black text-sm text-[#123B5D] font-mono">
                  {esDescarte ? '0' : resultado.porcentajeGlobal}/100 pts
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#17212B]/90">
                Estructura física evaluada en un <strong className="text-[#123B5D] font-bold">{resultado.porcentajeChecklist}%</strong>, antecedentes legales con <strong className="text-[#123B5D] font-bold">{resultado.porcentajeLegales}%</strong> y ritmo de kilometraje al <strong className="text-[#123B5D] font-bold">{resultado.porcentajeKilometraje}%</strong>. Se calcula una estimación referencial de <strong className="text-[#D64545] font-mono font-bold">{formatCOP(resultado.totalReparaciones)}</strong> en posibles arreglos o desgastes a considerar.
              </p>

              {esDescarte && (
                <div className="p-3 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#D64545] text-xs font-semibold">
                  Alerta crítica: {resultado.motivoDescarte || 'Condición de riesgo severo detectada'}. Se aconseja evaluar con extrema precaución antes de avanzar.
                </div>
              )}

              {esInferior65 && !esDescarte && (
                <div className="p-3 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs font-medium">
                  Atención: La puntuación estimada es menor al 65%. Se sugiere analizar con detenimiento si vale la pena asumir los costos de un peritaje formal.
                </div>
              )}

              <p className="text-[11px] text-[#66727D] italic pt-1.5 border-t border-[#F1F5F9]">
                * Esta estimación es de carácter estrictamente orientativo y se fundamenta en las respuestas del usuario. No reemplaza un peritaje técnico en un CDA ni una cotización formal en talleres o almacenes de repuestos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillar Matrix Audit */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#17212B]">
            Resumen de la revisión por áreas
          </h3>
          <span className="text-xs font-mono text-[#66727D]">4 Áreas Evaluadas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pilar 1: Kilometraje */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#66727D] font-bold">1. Kilometraje</span>
                <span className="text-xs font-mono font-black text-[#123B5D]">
                  {resultado.porcentajeKilometraje}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full bg-[#123B5D] rounded-full transition-all duration-500"
                  style={{ width: `${resultado.porcentajeKilometraje}%` }}
                />
              </div>
              <p className="text-xs text-[#66727D] leading-relaxed">
                {km.toLocaleString('es-CO')} km ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km/año).
              </p>
            </div>
            <span className="mt-3.5 text-[11px] font-mono text-[#66727D]">Peso: 20%</span>
          </div>

          {/* Pilar 2: Legalidad */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#66727D] font-bold">2. Legalidad</span>
                <span className="text-xs font-mono font-black text-[#123B5D]">
                  {resultado.porcentajeLegales}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full bg-[#123B5D] rounded-full transition-all duration-500"
                  style={{ width: `${resultado.porcentajeLegales}%` }}
                />
              </div>
              <p className="text-xs text-[#66727D] leading-relaxed">
                {evaluacion.antecedentesLegales.placaPublica
                  ? 'Servicio público (Descarte)'
                  : evaluacion.antecedentesLegales.codigoSiniestro !== 'ninguno'
                  ? `Siniestro ${evaluacion.antecedentesLegales.codigoSiniestro}`
                  : 'Sin observaciones críticas'}
              </p>
            </div>
            <span className="mt-3.5 text-[11px] font-mono text-[#66727D]">Peso: 30%</span>
          </div>

          {/* Pilar 3: Inspección Física */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#66727D] font-bold">3. Inspección Física</span>
                <span className="text-xs font-mono font-black text-[#123B5D]">
                  {resultado.porcentajeChecklist}%
                </span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full bg-[#123B5D] rounded-full transition-all duration-500"
                  style={{ width: `${resultado.porcentajeChecklist}%` }}
                />
              </div>
              <p className="text-xs text-[#66727D] leading-relaxed">
                {evaluacion.checklistItems.length} componentes evaluados en 6 categorías.
              </p>
            </div>
            <span className="mt-3.5 text-[11px] font-mono text-[#66727D]">Peso: 50%</span>
          </div>

          {/* Pilar 4: Salud Financiera */}
          <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#66727D] font-bold">4. Presupuesto referencial</span>
                <span className="text-xs font-mono font-black text-[#D64545]">
                  -{formatCOP(resultado.totalReparaciones)}
                </span>
              </div>
              <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden mb-2.5">
                <div
                  className="h-full bg-[#D64545] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(10, (resultado.totalReparaciones / (evaluacion.precioVenta || 50000000)) * 100))}%` }}
                />
              </div>
              <p className="text-xs text-[#66727D] leading-relaxed">
                {evaluacion.costosReparacion.length} arreglo(s) identificado(s).
              </p>
            </div>
            <span className="mt-3.5 text-[11px] font-mono text-[#66727D]">Margen orientativo</span>
          </div>
        </div>
      </div>

      {/* Negotiation Calculator & Target Offer Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-sm flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-4">
          <div>
            <h4 className="text-base font-black text-[#17212B]">Estimación para la Negociación</h4>
            <span className="text-xs text-[#66727D]">Valores referenciales sugeridos para la conversación de compra</span>
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] flex items-center justify-center text-[#123B5D]">
            <TrendingDown className="w-4 h-4 text-[#8BCF3F]" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-[#F7F9FA] rounded-2xl border border-[#E2E8F0]">
            <span className="text-[11px] text-[#66727D] block font-mono font-semibold">Precio inicial publicado</span>
            <span className="text-base sm:text-lg font-black font-mono text-[#17212B] mt-1 block">
              {evaluacion.precioVenta > 0 ? formatCOP(evaluacion.precioVenta) : 'No especificado'}
            </span>
          </div>

          <div className="p-4 bg-[#FEF2F2] rounded-2xl border border-[#FECACA]">
            <span className="text-[11px] text-[#D64545] block font-mono font-semibold">Deducción estimada por arreglos</span>
            <span className="text-base sm:text-lg font-black font-mono text-[#D64545] mt-1 block">
              - {formatCOP(resultado.totalReparaciones)}
            </span>
          </div>

          <div className="p-4 bg-[#F0FDF4] rounded-2xl border border-[#BBF7D0]">
            <span className="text-[11px] text-[#2EAD68] block font-mono font-semibold">Oferta sugerida de referencia</span>
            <span className="text-base sm:text-lg font-black font-mono text-[#2EAD68] mt-1 block">
              {evaluacion.precioVenta > 0 ? formatCOP(resultado.precioSugerido) : 'Ajustar según precio'}
            </span>
          </div>
        </div>

        {/* Copy Negotiation Script Button & Preview */}
        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={handleCopiarResumen}
            className="w-full h-12 bg-[#F7F9FA] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#123B5D] rounded-xl px-4 flex items-center justify-center gap-2 text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-[0.99]"
          >
            {copiado ? <Check className="w-4 h-4 text-[#2EAD68]" /> : <Copy className="w-4 h-4 text-[#66727D]" />}
            <span>{copiado ? '¡Propuesta copiada al portapapeles!' : 'Copiar propuesta de referencia para WhatsApp'}</span>
          </button>

          <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] text-xs text-[#66727D] italic leading-relaxed">
            &ldquo;{scriptNegociacion}&rdquo;
          </div>
        </div>
      </div>

      {/* Costos de Tenencia Estimados (Informativo Complementario) */}
      {impuestoEstimado && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#123B5D]/5 flex items-center justify-center text-[#123B5D]">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-[#17212B] font-mono">
                Costo de Propiedad Estimado · Impuesto Vehicular ({impuestoEstimado.vigencia})
              </span>
            </div>
            <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#F1F5F9] text-[#66727D] font-bold">
              Informativo · MinTransporte
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-3.5 bg-[#F7F9FA] rounded-2xl border border-[#E2E8F0]">
              <span className="text-[10px] text-[#66727D] block font-mono font-semibold">Base Gravable Oficial</span>
              <span className="text-sm font-black font-mono text-[#17212B] mt-0.5 block">
                {formatCOP(impuestoEstimado.baseGravable)}
              </span>
            </div>

            <div className="p-3.5 bg-[#F7F9FA] rounded-2xl border border-[#E2E8F0]">
              <span className="text-[10px] text-[#66727D] block font-mono font-semibold">Impuesto Anual Estimado ({impuestoEstimado.tarifaTexto})</span>
              <span className="text-sm font-black font-mono text-[#17212B] mt-0.5 block">
                {formatCOP(impuestoEstimado.impuestoAnualEstimado)}
              </span>
            </div>

            <div className="p-3.5 bg-[#F0FDF4] rounded-2xl border border-[#BBF7D0]">
              <span className="text-[10px] text-[#2EAD68] block font-mono font-semibold">Provisión Mensual Sugerida</span>
              <span className="text-sm font-black font-mono text-[#2EAD68] mt-0.5 block">
                {formatCOP(impuestoEstimado.provisionMensual)}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#66727D] italic">
            * Dato estrictamente financiero referencial. No incide en el puntaje de revisión técnica ni en el veredicto del vehículo.
          </p>
        </div>
      )}

      {/* Alertas Consolidadas */}
      {resultado.alertas.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-black uppercase tracking-wider text-[#66727D] font-mono">
            Hallazgos y Señales de Alerta Registradas ({resultado.alertas.length})
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

        {/* Pie de informe & Metadatos (Web) */}
        <div className="p-5 rounded-2xl bg-white border border-[#E2E8F0] text-center text-xs text-[#66727D] space-y-1.5 shadow-2xs">
          <p className="font-bold text-[#17212B]">
            EscaneApp Colombia — Herramienta de Estimación y Revisión Preliminar
          </p>
          <p className="text-[11px] text-[#66727D] max-w-2xl mx-auto leading-relaxed">
            Siguiente paso sugerido: Si los datos registrados te resultan favorables y continúas con interés en el vehículo, te sugerimos agendar una inspección técnica formal en un centro de diagnóstico automotriz (CDA) certificado para pruebas especializadas con dinamómetro, escáner profesional y compresión de motor.
          </p>
          <p className="text-[10px] font-mono text-[#66727D] pt-1">
            ID REVISIÓN: ESC-{new Date().getFullYear()}-{placa.replace(/\s+/g, '')} · Estimación orientativa basada en datos aportados por el usuario
          </p>
        </div>
      </div>

      {/* ======================================================== */}
      {/* REPORTE EJECUTIVO PDF — ESCANEAPP (Visible solo al imprimir) */}
      {/* ======================================================== */}
      <div className="hidden print:block font-sans text-[#17212B] bg-white space-y-4 text-xs leading-normal">
        {/* Membrete Oficial EscaneApp */}
        <div className="border-b-2 border-[#123B5D] pb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#123B5D] flex items-center justify-center text-white shrink-0">
              <Car className="w-5 h-5 text-[#8BCF3F]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-[#123B5D]">ESCANEAPP</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#8BCF3F]/20 text-[#123B5D] border border-[#8BCF3F]/40">
                  REPORTE EJECUTIVO
                </span>
              </div>
              <p className="text-[11px] text-[#66727D] font-medium">
                Escanea antes de comprar · Inteligencia y verificación vehicular en Colombia
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-[#66727D]">
            <span className="font-bold text-[#17212B] block">ID: ESC-{anio}-{placa.replace(/\s+/g, '')}</span>
            <span>Fecha: {new Date(evaluacion.fecha).toLocaleDateString('es-CO')}</span>
          </div>
        </div>

        {/* Ficha Resumida del Vehículo */}
        <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-3.5 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="font-black text-base text-[#17212B] uppercase">
                {vehiculoNombre}
              </span>
              <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded bg-[#FFD100] text-[#123B5D] border border-[#CA8A04]">
                {placa}
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-[#66727D] font-mono">
              <span>Modelo: <strong className="text-[#17212B]">{anio}</strong></span>
              <span>·</span>
              <span>Kilometraje: <strong className="text-[#17212B]">{km.toLocaleString('es-CO')} km</strong> ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km/año)</span>
              <span>·</span>
              <span>Ciudad: <strong className="text-[#17212B]">{ciudadPlaca}</strong></span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#2EAD68] text-[11px] font-bold">
              <Check className="w-3 h-3" />
              Revisión Completa
            </span>
          </div>
        </div>

        {/* Dictamen Ejecutivo & Puntuación Global */}
        <div className="rounded-xl border border-[#CBD5E1] p-4 bg-white grid grid-cols-12 gap-4 items-center">
          <div className="col-span-4 border-r border-[#E2E8F0] pr-4 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block mb-1">
              PUNTUACIÓN ESTIMADA
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-4xl font-black font-mono text-[#123B5D]">
                {esDescarte ? '0' : resultado.porcentajeGlobal}
              </span>
              <span className="text-sm font-bold font-mono text-[#66727D]">/ 100 PTS</span>
            </div>
            <div className="mt-2">
              <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase font-mono border ${veredictoBadge.bg} ${veredictoBadge.border} ${veredictoBadge.text}`}>
                {veredictoBadge.titulo}
              </span>
            </div>
          </div>

          <div className="col-span-8 space-y-1.5 pl-1">
            <span className="text-[11px] font-mono font-bold uppercase text-[#123B5D]">
              Síntesis del Veredicto
            </span>
            <p className="text-[11px] text-[#17212B] leading-relaxed">
              Estructura física evaluada en un <strong className="font-bold text-[#123B5D]">{resultado.porcentajeChecklist}%</strong>, antecedentes legales con <strong className="font-bold text-[#123B5D]">{resultado.porcentajeLegales}%</strong> y ritmo de kilometraje al <strong className="font-bold text-[#123B5D]">{resultado.porcentajeKilometraje}%</strong>. Se calcula una deducción referencial de <strong className="font-bold text-[#D64545]">{formatCOP(resultado.totalReparaciones)}</strong> en posibles arreglos o desgastes identificados para considerar en la negociación.
            </p>
            {esDescarte && (
              <div className="p-2 rounded-lg bg-[#FEF2F2] border border-[#FECACA] text-[#D64545] text-[11px] font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>ALERTA CRÍTICA: {resultado.motivoDescarte || 'Condición de alto riesgo detectada. Se sugiere descartar el vehículo o requerir revisión exhaustiva en CDA.'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Matriz Ejecutiva de los 4 Pilares */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block">
            EVALUACIÓN POR ÁREAS CLAVE
          </span>
          <div className="grid grid-cols-4 gap-2.5">
            {/* Pilar 1 */}
            <div className="rounded-lg border border-[#CBD5E1] bg-[#F7F9FA] p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-[#66727D]">1. Kilometraje</span>
                <span className="font-mono font-black text-[#123B5D]">{resultado.porcentajeKilometraje}%</span>
              </div>
              <p className="text-[10px] text-[#17212B] leading-tight">
                {km.toLocaleString('es-CO')} km ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km/año)
              </p>
            </div>

            {/* Pilar 2 */}
            <div className="rounded-lg border border-[#CBD5E1] bg-[#F7F9FA] p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-[#66727D]">2. Legalidad</span>
                <span className="font-mono font-black text-[#123B5D]">{resultado.porcentajeLegales}%</span>
              </div>
              <p className="text-[10px] text-[#17212B] leading-tight">
                {evaluacion.antecedentesLegales.placaPublica
                  ? 'Servicio público (Descarte)'
                  : evaluacion.antecedentesLegales.codigoSiniestro !== 'ninguno'
                  ? `Siniestro: ${evaluacion.antecedentesLegales.codigoSiniestro}`
                  : 'Sin antecedentes críticos'}
              </p>
            </div>

            {/* Pilar 3 */}
            <div className="rounded-lg border border-[#CBD5E1] bg-[#F7F9FA] p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-[#66727D]">3. Inspección</span>
                <span className="font-mono font-black text-[#123B5D]">{resultado.porcentajeChecklist}%</span>
              </div>
              <p className="text-[10px] text-[#17212B] leading-tight">
                {evaluacion.checklistItems.length} puntos revisados en 6 sistemas
              </p>
            </div>

            {/* Pilar 4 */}
            <div className="rounded-lg border border-[#CBD5E1] bg-[#F7F9FA] p-2.5">
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-bold text-[#66727D]">4. Arreglos</span>
                <span className="font-mono font-black text-[#D64545]">-{formatCOP(resultado.totalReparaciones)}</span>
              </div>
              <p className="text-[10px] text-[#17212B] leading-tight">
                {evaluacion.costosReparacion.length} gasto(s) detectado(s)
              </p>
            </div>
          </div>
        </div>

        {/* Balance Financiero & Negociación */}
        <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-3.5 space-y-2">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block">
            BALANCE FINANCIERO Y PROPUESTA DE NEGOCIACIÓN
          </span>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-lg bg-white border border-[#CBD5E1]">
              <span className="text-[10px] text-[#66727D] font-mono block">Precio Publicado</span>
              <span className="text-sm font-black font-mono text-[#17212B]">
                {evaluacion.precioVenta > 0 ? formatCOP(evaluacion.precioVenta) : 'No especificado'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
              <span className="text-[10px] text-[#D64545] font-mono block">Deducción por Arreglos</span>
              <span className="text-sm font-black font-mono text-[#D64545]">
                - {formatCOP(resultado.totalReparaciones)}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0]">
              <span className="text-[10px] text-[#2EAD68] font-mono block">Oferta Sugerida de Referencia</span>
              <span className="text-sm font-black font-mono text-[#123B5D]">
                {evaluacion.precioVenta > 0 ? formatCOP(resultado.precioSugerido) : 'Ajustar según valor'}
              </span>
            </div>
          </div>
        </div>

        {/* Impuesto Vehicular Oficial (si aplica) */}
        {impuestoEstimado && (
          <div className="rounded-xl border border-[#CBD5E1] bg-white p-3 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#123B5D]" />
              <span className="font-bold text-[#17212B]">Impuesto Vehicular ({impuestoEstimado.vigencia})</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[10px]">
              <span>Base gravable: <strong>{formatCOP(impuestoEstimado.baseGravable)}</strong></span>
              <span>Impuesto anual: <strong className="text-[#123B5D]">{formatCOP(impuestoEstimado.impuestoAnualEstimado)}</strong></span>
              <span>Provisión mensual: <strong className="text-[#2EAD68]">{formatCOP(impuestoEstimado.provisionMensual)}</strong></span>
            </div>
          </div>
        )}

        {/* Alertas Registradas */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block">
            OBSERVACIONES Y ALERTAS ({resultado.alertas.length})
          </span>
          {resultado.alertas.length === 0 ? (
            <div className="p-2.5 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#2EAD68] text-[11px] font-medium flex items-center gap-2">
              <Check className="w-3.5 h-3.5" />
              <span>No se identificaron alertas críticas durante la revisión preliminar.</span>
            </div>
          ) : (
            <div className="space-y-1.5">
              {resultado.alertas.slice(0, 5).map((alerta, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-lg border text-[11px] flex items-start gap-2 ${
                    alerta.tipo === 'peligro'
                      ? 'bg-[#FEF2F2] border-[#FECACA] text-[#D64545]'
                      : alerta.tipo === 'advertencia'
                      ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                      : 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                  }`}
                >
                  <span className="font-mono font-bold uppercase text-[9px] px-1.5 py-0.5 rounded bg-white/70 border shrink-0">
                    {alerta.modulo}
                  </span>
                  <div className="min-w-0 flex-1">
                    <strong className="font-bold">{alerta.titulo}:</strong> {alerta.mensaje}
                  </div>
                </div>
              ))}
              {resultado.alertas.length > 5 && (
                <p className="text-[10px] text-[#66727D] italic">
                  + {resultado.alertas.length - 5} observaciones adicionales registradas en la evaluación digital completa.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Aviso Legal & Pie de Página Oficial */}
        <div className="border-t border-[#CBD5E1] pt-3 text-[10px] text-[#66727D] space-y-1">
          <p className="font-bold text-[#17212B]">
            ESCANEAPP COLOMBIA · GUÍA Y ESTIMACIÓN PRELIMINAR ORIENTATIVA
          </p>
          <p className="leading-relaxed">
            <strong>Aviso Importante:</strong> Este informe es una herramienta informativa preliminar basada estrictamente en los datos ingresados por el usuario. No constituye un dictamen pericial oficial, certificación de asegurabilidad ni reemplaza el peritaje técnico en un Centro de Diagnóstico Automotor (CDA) legalmente constituido. Se recomienda realizar una prueba técnica en dinamómetro y escaneo computarizado antes de cualquier desembolso de dinero.
          </p>
          <div className="flex items-center justify-between text-[9px] font-mono text-[#94A3B8] pt-1">
            <span>https://carchecker.kodiquett.com/evaluacion</span>
            <span>ID REVISIÓN: ESC-{anio}-{placa.replace(/\s+/g, '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
