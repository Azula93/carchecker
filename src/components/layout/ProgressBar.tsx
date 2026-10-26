'use client';

import React from 'react';
import { Car, Scale, ClipboardCheck, Calculator, Target, Check } from 'lucide-react';

interface ProgressBarProps {
  pasoActual: number;
  totalPasos?: number;
  onSelectPaso: (paso: number) => void;
}

const PASOS = [
  { numero: 1, codigo: '01', titulo: 'Datos & KM', subtitulo: 'Kilometraje y modelo', Icon: Car },
  { numero: 2, codigo: '02', titulo: 'Papeles & Multas', subtitulo: 'RUNT, multas y choques', Icon: Scale },
  { numero: 3, codigo: '03', titulo: 'Revisión', subtitulo: '80 puntos paso a paso', Icon: ClipboardCheck },
  { numero: 4, codigo: '04', titulo: 'Arreglos & Rebaja', subtitulo: 'Gastos y descuento sugerido', Icon: Calculator },
  { numero: 5, codigo: '05', titulo: 'Resultado Final', subtitulo: 'Puntaje y consejos', Icon: Target },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  pasoActual,
  totalPasos = 5,
  onSelectPaso,
}) => {
  const porcentaje = Math.round((pasoActual / totalPasos) * 100);

  return (
    <div className="w-full pb-2">
      {/* Mobile Top Header Stepper Counter */}
      <div className="flex sm:hidden items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-900">
            Paso {pasoActual} de {totalPasos}
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-xs font-semibold text-slate-700">
            {PASOS[pasoActual - 1]?.titulo}
          </span>
        </div>
        <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          {porcentaje}% completado
        </span>
      </div>

      {/* Main Horizontal Stepper Container */}
      <nav aria-label="Progreso de la revisión" className="bg-white rounded-2xl p-2 sm:p-2.5 border border-slate-200/90 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
        {PASOS.map((paso) => {
          const isCompleted = paso.numero < pasoActual;
          const isCurrent = paso.numero === pasoActual;
          const isFuture = paso.numero > pasoActual;
          const StepIcon = paso.Icon;

          return (
            <button
              key={paso.numero}
              type="button"
              onClick={() => onSelectPaso(paso.numero)}
              disabled={isFuture}
              aria-current={isCurrent ? 'step' : undefined}
              className={`flex-1 min-w-[145px] sm:min-w-0 p-2 sm:p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-all select-none ${
                isCurrent
                  ? 'bg-slate-900 text-white shadow-sm'
                  : isCompleted
                  ? 'bg-transparent hover:bg-slate-50 border border-transparent cursor-pointer text-slate-800'
                  : 'bg-transparent border border-transparent opacity-45 cursor-not-allowed text-slate-500'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isCurrent
                    ? 'bg-white/15 text-white'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[2.5]" />
                ) : (
                  <StepIcon className="w-4 h-4" />
                )}
              </div>

              {/* Text Side */}
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[11px] sm:text-xs font-semibold tracking-tight truncate ${
                      isCurrent
                        ? 'text-white font-bold'
                        : isCompleted
                        ? 'text-slate-900'
                        : 'text-slate-500'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75 mr-1">{paso.codigo}</span>
                    {paso.titulo}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse"></span>
                  )}
                </div>
                <span
                  className={`text-[10px] truncate leading-tight mt-0.5 ${
                    isCurrent ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {paso.subtitulo}
                </span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
