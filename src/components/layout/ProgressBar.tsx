'use client';

import React from 'react';
import { Car, Scale, ClipboardCheck, Calculator, Target, Check } from 'lucide-react';

interface ProgressBarProps {
  pasoActual: number;
  totalPasos?: number;
  onSelectPaso: (paso: number) => void;
}

const PASOS = [
  { numero: 1, titulo: 'Básicos & Km', subtitulo: 'Datos y Odometría', Icon: Car },
  { numero: 2, titulo: 'Historial & Legalidad', subtitulo: 'RUNT, SIMIT, Fasecolda', Icon: Scale },
  { numero: 3, titulo: 'Inspección Física', subtitulo: 'Inspección por Componentes', Icon: ClipboardCheck },
  { numero: 4, titulo: 'Costos Ocultos', subtitulo: 'Presupuesto de Arreglos', Icon: Calculator },
  { numero: 5, titulo: 'Resumen Final', subtitulo: 'Estimación y Sugerencias', Icon: Target },
];

export const ProgressBar: React.FC<ProgressBarProps> = ({
  pasoActual,
  totalPasos = 5,
  onSelectPaso,
}) => {
  const pasoActivo = PASOS[pasoActual - 1] || PASOS[0];
  const porcentaje = Math.round((pasoActual / totalPasos) * 100);

  return (
    <div className="w-full pt-2 pb-4">
      {/* Top Header Stepper Counter */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
            Paso {pasoActual} de {totalPasos}
          </span>
          <span className="text-[#CBD5E1]">·</span>
          <span className="text-xs font-semibold text-[#0F1B2B]">
            {pasoActivo.titulo}
          </span>
        </div>
        <span className="text-xs font-mono font-medium text-[#475569]">
          {porcentaje}% completado
        </span>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-[#0F1B2B] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${porcentaje}%` }}
        />
      </div>

      {/* Desktop Step Buttons Bar */}
      <div className="hidden sm:grid grid-cols-5 gap-2">
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
              className={`p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all text-xs ${
                isCurrent
                  ? 'bg-white border-[#0F1B2B] text-[#0F1B2B] shadow-xs ring-1 ring-[#0F1B2B]'
                  : isCompleted
                  ? 'bg-white border-[#E2E8F0] text-[#0F1B2B] hover:border-[#CBD5E1] cursor-pointer'
                  : 'bg-[#F8FAFC] border-transparent text-[#475569] cursor-not-allowed opacity-60'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-semibold ${
                  isCurrent
                    ? 'bg-[#0F1B2B] text-white'
                    : isCompleted
                    ? 'bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0]'
                    : 'bg-[#F1F5F9] text-[#475569]'
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : <StepIcon className="w-3.5 h-3.5" />}
              </div>
              <div className="min-w-0 flex flex-col">
                <span className="font-semibold truncate">{paso.titulo}</span>
                <span className="text-[10px] text-[#64748B] truncate">{paso.subtitulo}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
