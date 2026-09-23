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
    <div className="space-y-6 print:p-0 print:space-y-4">
      {/* Encabezado del Paso (Oculto en impresión) */}
      <div className="border-b border-[#E2E8F0] pb-4 print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold block mb-1">
            Paso 5 de 5 · Resumen de la Estimación
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B] tracking-tight">
            Puntuación y Sugerencias de la Revisión
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5 max-w-2xl leading-relaxed">
            Estimación preliminar y sugerencias orientativas calculadas a partir de tus observaciones. Esta herramienta no sustituye un peritaje técnico en un CDA ni una cotización en talleres o almacenes de repuestos.
          </p>
        </div>

        {/* Botones de acción principales */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={imprimirReportePDF}
            className="h-10 px-4 rounded-lg bg-[#0F1B2B] hover:bg-[#1A2B42] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Reporte PDF</span>
          </button>

          <button
            type="button"
            onClick={handleCopiarResumen}
            className="h-10 px-4 rounded-lg bg-white hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F1B2B] text-xs font-semibold shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
          >
            {copiado ? <Check className="w-4 h-4 text-[#166534]" /> : <Copy className="w-4 h-4 text-[#64748B]" />}
            <span>{copiado ? '¡Copiado!' : 'Copiar para WhatsApp'}</span>
          </button>

          <button
            type="button"
            onClick={onReiniciar}
            className="h-10 px-3 rounded-lg bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            title="Iniciar nueva evaluación desde cero"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Nueva</span>
          </button>
        </div>
      </div>

      {/* Encabezado membretado para impresión / PDF */}
      <div className="hidden print:block border-b-2 border-black pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-black">
              CAR CHECKER COLOMBIA — REPORTE DE REVISIÓN PRELIMINAR
            </h1>
            <p className="text-xs text-gray-600">
              Estimación orientativa y sugerencias preliminares basadas en las observaciones registradas (No sustituye peritaje en CDA)
            </p>
          </div>
          <div className="text-right text-xs text-gray-500 font-mono">
            <span>Fecha: {new Date(evaluacion.fecha).toLocaleDateString('es-CO')}</span>
          </div>
        </div>
      </div>

      {/* Vehicle Summary Card */}
      <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B] shrink-0">
            <Car className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base sm:text-lg text-[#0F1B2B] truncate uppercase">
                {vehiculoNombre}
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#0F1B2B] text-white">
                {placa}
              </span>
            </div>
            <p className="text-xs text-[#64748B] font-mono mt-0.5">
              Modelo {anio} · {km.toLocaleString('es-CO')} km · {ciudadPlaca}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold">
            Revisión Completada
          </span>
        </div>
      </div>

      {/* Hero Score Card */}
      <div
        className={`p-6 sm:p-7 rounded-xl border shadow-sm transition-all ${
          esDescarte
            ? 'bg-[#FEF2F2]/60 border-[#DC2626]'
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
              size={220}
              label="Puntuación Estimada"
            />
          </div>

          {/* Compact Summary Box next to Gauge */}
          <div className="flex-1 w-full space-y-2.5">
            <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold uppercase bg-white border border-[#CBD5E1] text-[#0F1B2B]">
                {vehiculoNombre} · MOD. {anio}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#0F1B2B] text-white">
                {placa}
              </span>
            </div>

            {/* Clean Box: using format and style of former dictamen técnico */}
            <div className="bg-white p-4 rounded-lg border border-[#E2E8F0] text-xs text-[#475569] leading-relaxed shadow-2xs space-y-2">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
                <span className="font-bold text-[#0F1B2B] text-xs uppercase tracking-wider font-mono">
                  Resumen de la Estimación
                </span>
                <span className="font-semibold text-xs text-[#0F1B2B] font-mono">
                  {esDescarte ? '0' : resultado.porcentajeGlobal}/100 pts
                </span>
              </div>

              <p>
                Estructura física evaluada en un <strong className="text-[#0F1B2B]">{resultado.porcentajeChecklist}%</strong>, antecedentes legales con <strong className="text-[#0F1B2B]">{resultado.porcentajeLegales}%</strong> y ritmo de kilometraje al <strong className="text-[#0F1B2B]">{resultado.porcentajeKilometraje}%</strong>. Se calcula una estimación referencial de <strong className="text-[#0F1B2B] font-mono">{formatCOP(resultado.totalReparaciones)}</strong> en posibles arreglos o desgastes a considerar.
              </p>

              {esDescarte && (
                <div className="p-2.5 rounded bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-xs font-semibold">
                  Alerta crítica: {resultado.motivoDescarte || 'Condición de riesgo severo detectada'}. Se aconseja evaluar con extrema precaución antes de avanzar.
                </div>
              )}

              {esInferior65 && !esDescarte && (
                <div className="p-2.5 rounded bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] text-xs font-medium">
                  Atención: La puntuación estimada es menor al 65%. Se sugiere analizar con detenimiento si vale la pena asumir los costos de un peritaje formal.
                </div>
              )}

              <p className="text-[11px] text-[#64748B] italic pt-1 border-t border-[#F1F5F9]">
                * Esta estimación es de carácter estrictamente orientativo y se fundamenta en las respuestas del usuario. No reemplaza un peritaje técnico en un CDA ni una cotización formal en talleres o almacenes de repuestos.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillar Matrix Audit */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2B]">
            Resumen de la revisión por áreas
          </h3>
          <span className="text-xs font-mono text-[#64748B]">4 Áreas Evaluadas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pilar 1: Kilometraje */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#64748B] font-semibold">1. Kilometraje</span>
                <span className="text-xs font-mono font-bold text-[#0F1B2B]">
                  {resultado.porcentajeKilometraje}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#0F1B2B] rounded-full"
                  style={{ width: `${resultado.porcentajeKilometraje}%` }}
                />
              </div>
              <p className="text-xs text-[#475569]">
                {km.toLocaleString('es-CO')} km ({Math.round(km / Math.max(1, new Date().getFullYear() - anio)).toLocaleString('es-CO')} km/año).
              </p>
            </div>
            <span className="mt-3 text-[11px] font-mono text-[#64748B]">Peso: 20%</span>
          </div>

          {/* Pilar 2: Legalidad */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#64748B] font-semibold">2. Legalidad</span>
                <span className="text-xs font-mono font-bold text-[#0F1B2B]">
                  {resultado.porcentajeLegales}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#0F1B2B] rounded-full"
                  style={{ width: `${resultado.porcentajeLegales}%` }}
                />
              </div>
              <p className="text-xs text-[#475569]">
                {evaluacion.antecedentesLegales.placaPublica
                  ? 'Servicio público (Descarte)'
                  : evaluacion.antecedentesLegales.codigoSiniestro !== 'ninguno'
                  ? `Siniestro ${evaluacion.antecedentesLegales.codigoSiniestro}`
                  : 'Sin observaciones críticas'}
              </p>
            </div>
            <span className="mt-3 text-[11px] font-mono text-[#64748B]">Peso: 30%</span>
          </div>

          {/* Pilar 3: Inspección Física */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#64748B] font-semibold">3. Inspección Física</span>
                <span className="text-xs font-mono font-bold text-[#0F1B2B]">
                  {resultado.porcentajeChecklist}%
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#0F1B2B] rounded-full"
                  style={{ width: `${resultado.porcentajeChecklist}%` }}
                />
              </div>
              <p className="text-xs text-[#475569]">
                {evaluacion.checklistItems.length} componentes evaluados en 6 categorías.
              </p>
            </div>
            <span className="mt-3 text-[11px] font-mono text-[#64748B]">Peso: 50%</span>
          </div>

          {/* Pilar 4: Salud Financiera */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[#64748B] font-semibold">4. Presupuesto referencial</span>
                <span className="text-xs font-mono font-bold text-[#DC2626]">
                  -{formatCOP(resultado.totalReparaciones)}
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#DC2626] rounded-full"
                  style={{ width: `${Math.min(100, Math.max(10, (resultado.totalReparaciones / (evaluacion.precioVenta || 50000000)) * 100))}%` }}
                />
              </div>
              <p className="text-xs text-[#475569]">
                {evaluacion.costosReparacion.length} arreglo(s) identificado(s).
              </p>
            </div>
            <span className="mt-3 text-[11px] font-mono text-[#64748B]">Margen orientativo</span>
          </div>
        </div>
      </div>

      {/* Negotiation Calculator & Target Offer Section */}
      <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
          <div>
            <h4 className="text-base font-bold text-[#0F1B2B]">Estimación para la Negociación</h4>
            <span className="text-xs text-[#64748B]">Valores referenciales sugeridos para la conversación de compra</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#0F1B2B]">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-3.5 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
            <span className="text-[11px] text-[#64748B] block font-mono">Precio inicial publicado</span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#0F1B2B]">
              {evaluacion.precioVenta > 0 ? formatCOP(evaluacion.precioVenta) : 'No especificado'}
            </span>
          </div>

          <div className="p-3.5 bg-[#FEF2F2] rounded-lg border border-[#FECACA]">
            <span className="text-[11px] text-[#991B1B] block font-mono">Deducción estimada por arreglos</span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#DC2626]">
              - {formatCOP(resultado.totalReparaciones)}
            </span>
          </div>

          <div className="p-3.5 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0]">
            <span className="text-[11px] text-[#166534] block font-mono">Oferta sugerida de referencia</span>
            <span className="text-base sm:text-lg font-bold font-mono text-[#166534]">
              {evaluacion.precioVenta > 0 ? formatCOP(resultado.precioSugerido) : 'Ajustar según precio'}
            </span>
          </div>
        </div>

        {/* Copy Negotiation Script Button & Preview */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={handleCopiarResumen}
            className="w-full h-11 bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#CBD5E1] text-[#0F1B2B] rounded-lg px-4 flex items-center justify-center gap-2 text-xs font-semibold transition-all cursor-pointer"
          >
            {copiado ? <Check className="w-4 h-4 text-[#166534]" /> : <Copy className="w-4 h-4 text-[#64748B]" />}
            <span>{copiado ? '¡Propuesta copiada al portapapeles!' : 'Copiar propuesta de referencia para WhatsApp'}</span>
          </button>

          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] italic leading-relaxed">
            &ldquo;{scriptNegociacion}&rdquo;
          </div>
        </div>
      </div>

      {/* Costos de Tenencia Estimados (Informativo Complementario) */}
      {impuestoEstimado && (
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-2">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#0F1B2B]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2B] font-mono">
                Costo de Propiedad Estimado · Impuesto Vehicular ({impuestoEstimado.vigencia})
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] font-medium">
              Informativo · MinTransporte
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block font-mono">Base Gravable Oficial</span>
              <span className="text-sm font-bold font-mono text-[#0F1B2B]">
                {formatCOP(impuestoEstimado.baseGravable)}
              </span>
            </div>

            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <span className="text-[10px] text-[#64748B] block font-mono">Impuesto Anual Estimado ({impuestoEstimado.tarifaTexto})</span>
              <span className="text-sm font-bold font-mono text-[#0F1B2B]">
                {formatCOP(impuestoEstimado.impuestoAnualEstimado)}
              </span>
            </div>

            <div className="p-3 bg-[#F0FDF4] rounded-lg border border-[#BBF7D0]">
              <span className="text-[10px] text-[#166534] block font-mono">Provisión Mensual Sugerida</span>
              <span className="text-sm font-bold font-mono text-[#166534]">
                {formatCOP(impuestoEstimado.provisionMensual)}
              </span>
            </div>
          </div>

          <p className="text-[10px] text-[#64748B] italic">
            * Dato estrictamente financiero referencial. No incide en el puntaje de revisión técnica ni en el veredicto del vehículo.
          </p>
        </div>
      )}

      {/* Alertas Consolidadas */}
      {resultado.alertas.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] font-mono">
            Hallazgos y Señales de Alerta Registradas ({resultado.alertas.length})
          </h4>
          <div className="space-y-2">
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

      {/* Pie de informe & Metadatos */}
      <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] text-center text-xs text-[#64748B] space-y-1.5 shadow-2xs print:bg-transparent print:border-none">
        <p className="font-semibold text-[#0F1B2B]">
          Car Checker Colombia — Herramienta de Estimación y Revisión Preliminar
        </p>
        <p className="text-[11px] text-[#475569] max-w-2xl mx-auto leading-relaxed">
          Siguiente paso sugerido: Si los datos registrados te resultan favorables y continúas con interés en el vehículo, te sugerimos agendar una inspección técnica formal en un centro de diagnóstico automotriz (CDA) certificado para pruebas especializadas con dinamómetro, escáner profesional y compresión de motor.
        </p>
        <p className="text-[10px] font-mono text-[#475569] pt-1">
          ID REVISIÓN: CC-{new Date().getFullYear()}-{placa.replace(' ', '')} · Estimación orientativa basada en datos aportados por el usuario
        </p>
      </div>
    </div>
  );
};
