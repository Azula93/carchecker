'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface StepNavigationProps {
  pasoActual: number;
  totalPasos?: number;
  onAnterior: () => void;
  onSiguiente: () => void;
  onLimpiarPaso?: () => void;
  siguienteDeshabilitado?: boolean;
  textoFinal?: string;
  esDescarte?: boolean;
}

const NOMBRES_PASOS_SIGUIENTES = [
  'Continuar a Legales',
  'Continuar a Checklist',
  'Continuar a Costos Ocultos',
  'Ver Resumen y Estimación',
  'Finalizar Revisión',
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
}) => {
  const esUltimoPaso = pasoActual === totalPasos;
  const esPrimerPaso = pasoActual === 1;
  const textoBoton = esUltimoPaso ? textoFinal : NOMBRES_PASOS_SIGUIENTES[pasoActual - 1] || 'Continuar';

  return (
    <div className="w-full pt-6 mt-8 border-t border-[#E2E8F0] flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {/* Botón Anterior */}
        {!esPrimerPaso && (
          <button
            type="button"
            onClick={onAnterior}
            className="h-12 px-4 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] hover:bg-[#F1F5F9] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 transition-all"
            aria-label="Volver al paso anterior"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
        )}

        {/* Botón Borrar datos del paso actual */}
        {onLimpiarPaso && (
          <button
            type="button"
            onClick={onLimpiarPaso}
            className="h-12 px-3 sm:px-3.5 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#DC2626] hover:border-[#FECACA] hover:bg-[#FEF2F2] text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all shrink-0"
            title="Borrar todos los datos ingresados en este paso"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Borrar Datos</span>
          </button>
        )}

        {/* Botón Continuar / Siguiente */}
        <button
          type="button"
          onClick={onSiguiente}
          disabled={siguienteDeshabilitado}
          className={`h-12 flex-1 rounded-lg px-5 font-semibold text-xs sm:text-sm flex items-center justify-between transition-all cursor-pointer shadow-xs active:scale-98 ${
            siguienteDeshabilitado
              ? 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] cursor-not-allowed shadow-none'
              : esDescarte
              ? 'bg-[#FEF2F2] border border-[#DC2626] text-[#DC2626] hover:bg-[#FEE2E2]'
              : 'bg-[#0F1B2B] text-white hover:bg-[#1A2B42]'
          }`}
        >
          <div className="flex flex-col items-start text-left leading-tight">
            <span>{textoBoton}</span>
            <span className="text-[10px] opacity-75 font-normal">
              {esUltimoPaso ? 'Informe completo' : `Paso ${pasoActual + 1} de ${totalPasos}`}
            </span>
          </div>
          <ArrowRight className="w-4 h-4 shrink-0" />
        </button>
      </div>

      <p className="text-center text-[11px] font-mono text-[#64748B]">
        Paso {pasoActual} de {totalPasos} · Datos editables en cualquier momento y guardados automáticamente
      </p>
    </div>
  );
};
