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
  { titulo: 'Continuar a Papeles & Multas', subtitulo: 'Paso 2 de 5 · Revisa RUNT y comparendos' },
  { titulo: 'Continuar a Revisión del Carro', subtitulo: 'Paso 3 de 5 · 80 puntos paso a paso' },
  { titulo: 'Calcular Arreglos y Descuento', subtitulo: 'Paso 4 de 5 · Presupuesto para negociar' },
  { titulo: 'Ver Resultado y Puntaje', subtitulo: 'Paso 5 de 5 · Resumen y veredicto' },
  { titulo: 'Finalizar Revisión', subtitulo: 'Revisión terminada' },
];

export const StepNavigation: React.FC<StepNavigationProps> = ({
  pasoActual,
  totalPasos = 5,
  onAnterior,
  onSiguiente,
  onLimpiarPaso,
  siguienteDeshabilitado = false,
  textoFinal = 'Ver Resultado y Puntaje',
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
  const subtituloBoton = esUltimoPaso ? 'Informe completo y consejos' : infoSiguiente.subtitulo;

  return (
    <div className="w-full pt-8 mt-10 border-t border-slate-200/90 flex flex-col gap-6">
      {/* Fila Principal de Acciones */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
        
        {/* Acciones Secundarias (Izquierda) */}
        <div className="flex items-center gap-2.5">
          {/* Botón Anterior */}
          {!esPrimerPaso && (
            <button
              type="button"
              onClick={onAnterior}
              className="h-11 sm:h-12 px-4 sm:px-5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98] transition-all"
              aria-label="Volver al paso anterior"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>
          )}

          {/* Botón Borrar datos del paso actual */}
          {!esUltimoPaso && onLimpiarPaso && (
            <button
              type="button"
              onClick={onLimpiarPaso}
              className="h-11 sm:h-12 px-3.5 sm:px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs sm:text-sm font-medium flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98] transition-all"
              title="Borrar lo que llenaste en este paso"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Borrar este paso</span>
            </button>
          )}
        </div>

        {/* Acciones Primarias (Derecha) */}
        {esUltimoPaso ? (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {onReiniciar && (
              <button
                type="button"
                onClick={onReiniciar}
                className="h-11 sm:h-12 px-5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-2xs active:scale-[0.98] transition-all"
                title="Borrar todo y revisar otro carro"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Revisar otro carro</span>
              </button>
            )}

            {onDescargarReporte && (
              <button
                type="button"
                onClick={onDescargarReporte}
                className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-xs active:scale-[0.98] transition-all"
                title="Descargar o guardar el reporte en PDF"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Descargar reporte en PDF</span>
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-stretch sm:items-end gap-1.5">
            <button
              type="button"
              onClick={onSiguiente}
              disabled={siguienteDeshabilitado}
              title={
                siguienteDeshabilitado
                  ? 'Escribe la marca/modelo y kilometraje para seguir'
                  : undefined
              }
              className={`h-11 sm:h-12 min-w-[240px] rounded-xl px-6 sm:px-7 font-semibold text-xs sm:text-sm flex items-center justify-between gap-4 transition-all cursor-pointer shadow-xs active:scale-[0.98] ${
                siguienteDeshabilitado
                  ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
                  : esDescarte
                  ? 'bg-rose-50 border border-rose-300 text-rose-700 hover:bg-rose-100'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex flex-col items-start text-left leading-tight">
                <span className="text-sm font-semibold">{tituloBoton}</span>
                <span className="text-[10px] font-mono opacity-80">
                  {subtituloBoton}
                </span>
              </div>
              <ArrowRight className="w-4 h-4 stroke-[2.5] shrink-0" />
            </button>
            {siguienteDeshabilitado && (
              <p className="text-[11px] text-slate-500 text-left sm:text-right" role="status" aria-live="polite">
                Escribe la marca/modelo del carro y cuántos kilómetros tiene para continuar.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Pie de la Tarjeta */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-center sm:text-left">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>
            Paso {pasoActual} de {totalPasos} · Todo se guarda en tu teléfono o computador automáticamente
          </span>
        </div>
        <div className="text-slate-400">
          <span>EscaneApp Colombia</span>
        </div>
      </div>
    </div>
  );
};
