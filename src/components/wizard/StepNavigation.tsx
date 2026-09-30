'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, ShieldCheck, Download } from 'lucide-react';

interface StepNavigationProps {
  pasoActual: number;
  totalPasos?: number;
  onAnterior: () => void;
  onSiguiente: () => void;
  onLimpiarPaso?: () => void;
  siguienteDeshabilitado?: boolean;
  textoFinal?: string;
  esDescarte?: boolean;
  onDescargarReporte?: () => void;
  onReiniciar?: () => void;
}

const NOMBRES_PASOS_SIGUIENTES = [
  { titulo: 'Continuar a Legales', subtitulo: 'Paso 2 de 5 · Historial & Multas' },
  { titulo: 'Continuar a Checklist', subtitulo: 'Paso 3 de 5 · Inspección Física' },
  { titulo: 'Continuar a Costos Ocultos', subtitulo: 'Paso 4 de 5 · Estimación de Arreglos' },
  { titulo: 'Ver Resumen y Estimación', subtitulo: 'Paso 5 de 5 · Puntuación y Veredicto' },
  { titulo: 'Finalizar Revisión', subtitulo: 'Diagnóstico Completado' },
];

export const StepNavigation: React.FC<StepNavigationProps> = ({
  pasoActual,
  totalPasos = 5,
  onAnterior,
  onSiguiente,
  onLimpiarPaso,
  siguienteDeshabilitado = false,
  textoFinal = 'Ver Resumen y Estimación',
  esDescarte = false,
  onDescargarReporte,
  onReiniciar,
}) => {
  const esUltimoPaso = pasoActual === totalPasos;
  const esPrimerPaso = pasoActual === 1;

  const infoSiguiente =
    NOMBRES_PASOS_SIGUIENTES[pasoActual - 1] || {
      titulo: 'Continuar',
      subtitulo: `Paso ${pasoActual + 1} de ${totalPasos}`,
    };

  const tituloBoton = esUltimoPaso ? textoFinal : infoSiguiente.titulo;
  const subtituloBoton = esUltimoPaso ? 'Informe completo y recomendaciones' : infoSiguiente.subtitulo;

  return (
    <div className="w-full pt-8 mt-10 border-t border-[#E2E8F0] flex flex-col gap-6">
      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        {/* Left Secondary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Botón Anterior */}
          {!esPrimerPaso && (
            <button
              type="button"
              onClick={onAnterior}
              className="h-12 sm:h-14 px-4 sm:px-5 rounded-2xl bg-white border border-[#CBD5E1] text-[#123B5D] hover:bg-slate-50 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95 transition-all"
              aria-label="Volver al paso anterior"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          )}

          {/* Botón Borrar datos del paso actual (solo si no es el último paso) */}
          {!esUltimoPaso && onLimpiarPaso && (
            <button
              type="button"
              onClick={onLimpiarPaso}
              className="h-12 sm:h-14 px-4 sm:px-5 rounded-2xl bg-[#EBF3FA] border border-[#D5E6F5] text-[#123B5D] hover:bg-[#DEEEFB] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95 transition-all"
              title="Borrar datos ingresados en este paso"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Borrar Datos</span>
            </button>
          )}
        </div>

        {/* Right Primary Actions: En Paso 5 muestra Descargar Reporte y Nuevo Escaneo; en pasos 1-4 botón Continuar */}
        {esUltimoPaso ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onReiniciar && (
              <button
                type="button"
                onClick={onReiniciar}
                className="h-12 sm:h-14 px-5 rounded-2xl bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#D64545] border border-[#FECACA] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-95 transition-all"
                title="Borrar datos y comenzar un nuevo escaneo"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Nuevo Escaneo</span>
              </button>
            )}

            {onDescargarReporte && (
              <button
                type="button"
                onClick={onDescargarReporte}
                className="h-12 sm:h-14 px-6 sm:px-8 rounded-2xl bg-[#123B5D] hover:bg-[#0E2F4B] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-xs active:scale-98 transition-all"
                title="Descargar informe completo en PDF"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-[#8BCF3F]" />
                <span>Descargar Reporte (PDF)</span>
              </button>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={onSiguiente}
            disabled={siguienteDeshabilitado}
            className={`h-12 sm:h-14 min-w-[240px] rounded-2xl px-6 sm:px-8 font-extrabold text-xs sm:text-sm flex items-center justify-between gap-4 transition-all cursor-pointer shadow-xs active:scale-98 ${
              siguienteDeshabilitado
                ? 'bg-[#F1F5F9] text-[#66727D] border border-[#E2E8F0] cursor-not-allowed shadow-none'
                : esDescarte
                ? 'bg-[#FEF2F2] border border-[#D64545] text-[#D64545] hover:bg-[#FEE2E2]'
                : 'bg-[#8BCF3F] text-[#17212B] hover:bg-[#7EC134] hover:shadow'
            }`}
          >
            <div className="flex flex-col items-start text-left leading-tight">
              <span className="text-sm sm:text-base font-extrabold">{tituloBoton}</span>
              <span className="text-[10px] sm:text-[11px] font-medium opacity-85">
                {subtituloBoton}
              </span>
            </div>
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] shrink-0" />
          </button>
        )}
      </div>

      {/* Card Metadata Footer (Stitch Reference) */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#66727D] gap-2 pt-2">
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2EAD68] shrink-0" />
          <span>
            Paso {pasoActual} de {totalPasos} · Datos editables en cualquier momento y guardados automáticamente en este navegador
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[#66727D] shrink-0">
          {/* <Lock className="w-3 h-3 text-[#66727D]" /> */}
          {/* <span>Cifrado SSL de 256 bits</span> */}
        </div>
      </div>
    </div>
  );
};
