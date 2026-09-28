'use client';

import React from 'react';
import { Car, Scale, ClipboardCheck, Calculator, Target, Check } from 'lucide-react';

interface ProgressBarProps {
  pasoActual: number;
  totalPasos?: number;
  onSelectPaso: (paso: number) => void;
}

const PASOS = [
  { numero: 1, codigo: '01', titulo: 'BÁSICOS & KM', subtitulo: 'Datos y Odometría', Icon: Car },
  { numero: 2, codigo: '02', titulo: 'HISTORIAL', subtitulo: 'RUNT, SIMIT, Fasecolda', Icon: Scale },
  { numero: 3, codigo: '03', titulo: 'INSPECCIÓN', subtitulo: 'Por Componentes', Icon: ClipboardCheck },
  { numero: 4, codigo: '04', titulo: 'COSTOS', subtitulo: 'Presupuesto de Arreglos', Icon: Calculator },
  { numero: 5, codigo: '05', titulo: 'RESUMEN', subtitulo: 'Estimación y Sugerencias', Icon: Target },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  pasoActual,
  totalPasos = 5,
  onSelectPaso,
}) => {
  const porcentaje = Math.round((pasoActual / totalPasos) * 100);

  return (
    <div className="w-full pb-2">
      {/* Mobile Top Header Stepper Counter (Visible on small screens) */}
      <div className="flex sm:hidden items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#123B5D]">
            Paso {pasoActual} de {totalPasos}
          </span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="text-xs font-semibold text-[#17212B]">
            {PASOS[pasoActual - 1]?.titulo}
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#2EAD68]">
          {porcentaje}% completado
        </span>
      </div>

      {/* Main Horizontal Stepper Container (Stitch Design Reference) */}
      <div className="bg-white rounded-2xl p-2 sm:p-2.5 border border-[#E2E8F0] shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
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
              className={`flex-1 min-w-[150px] sm:min-w-0 p-2 sm:p-2.5 rounded-xl text-left flex items-center gap-2.5 transition-all select-none ${
                isCurrent
                  ? 'bg-[#EBF3FA]/70 border border-[#D5E6F5] shadow-2xs'
                  : isCompleted
                  ? 'bg-transparent hover:bg-slate-50 border border-transparent cursor-pointer'
                  : 'bg-transparent border border-transparent opacity-60 cursor-not-allowed'
              }`}
            >
              {/* Icon Container */}
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors shadow-2xs ${
                  isCurrent
                    ? 'bg-[#123B5D] text-white'
                    : isCompleted
                    ? 'bg-[#EBF7DF] text-[#2EAD68] border border-[#BBF7D0]'
                    : 'bg-[#F1F5F9] text-[#66727D]'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : (
                  <StepIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </div>

              {/* Text Side */}
              <div className="min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[11px] sm:text-xs tracking-tight font-extrabold truncate ${
                      isCurrent
                        ? 'text-[#123B5D]'
                        : isCompleted
                        ? 'text-[#17212B]'
                        : 'text-[#66727D]'
                    }`}
                  >
                    {paso.codigo} · {paso.titulo}
                  </span>
                  {isCurrent && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8BCF3F] shrink-0 animate-pulse"></span>
                  )}
                </div>
                <span className="text-[10px] sm:text-[11px] text-[#66727D] font-medium truncate leading-tight">
                  {paso.subtitulo}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
