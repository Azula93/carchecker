'use client';

import React from 'react';
import { ChecklistItemDef, ValoracionChecklist } from '../../types/evaluation';
import { formatCOP } from '../../data/repair-costs';
import { HelpCircle, AlertTriangle, DollarSign } from 'lucide-react';

interface ChecklistItemProps {
  item: ChecklistItemDef;
  valoracion?: ValoracionChecklist;
  onValoracionChange: (valoracion: ValoracionChecklist) => void;
}

export const ChecklistItem: React.FC<ChecklistItemProps> = ({
  item,
  valoracion,
  onValoracionChange,
}) => {
  const opciones: {
    valor: ValoracionChecklist;
    label: string;
    symbol: string;
    activeClasses: string;
    badgeClasses: (selected: boolean) => string;
  }[] = [
    {
      valor: 'bien',
      label: 'Bien',
      symbol: '✓',
      activeClasses: 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-1 ring-emerald-500 shadow-xs font-bold',
      badgeClasses: (sel) =>
        sel ? 'bg-emerald-600 text-white shadow-2xs' : 'bg-emerald-100 text-emerald-800',
    },
    {
      valor: 'regular',
      label: 'Regular',
      symbol: '▲',
      activeClasses: 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-400 shadow-xs font-bold',
      badgeClasses: (sel) =>
        sel ? 'bg-amber-500 text-white shadow-2xs' : 'bg-amber-100 text-amber-800',
    },
    {
      valor: 'mal',
      label: 'Mal / Falla',
      symbol: '✕',
      activeClasses: 'bg-rose-50 border-rose-600 text-rose-900 ring-1 ring-rose-500 shadow-xs font-bold',
      badgeClasses: (sel) =>
        sel ? 'bg-rose-600 text-white shadow-2xs' : 'bg-rose-100 text-rose-800',
    },
    {
      valor: 'na',
      label: 'No aplica',
      symbol: '—',
      activeClasses: 'bg-slate-100 border-slate-600 text-slate-900 ring-1 ring-slate-400 shadow-xs font-bold',
      badgeClasses: (sel) =>
        sel ? 'bg-slate-700 text-white shadow-2xs' : 'bg-slate-200 text-slate-600',
    },
  ];

  const tieneAlerta = item.tip.includes('[ATENCIÓN]');
  const tipLimpio = item.tip.replace(/\[ATENCIÓN\]/g, '').trim();

  return (
    <article
      className={`p-4 sm:p-5 rounded-xl border transition-all duration-150 shadow-2xs flex flex-col gap-3.5 bg-white ${
        valoracion === 'mal'
          ? 'border-rose-300 ring-1 ring-rose-200 bg-rose-50/20'
          : valoracion === 'regular'
          ? 'border-amber-300 ring-1 ring-amber-100 bg-amber-50/15'
          : valoracion === 'bien'
          ? 'border-emerald-200 bg-emerald-50/10'
          : 'border-slate-200/90 hover:border-slate-300'
      }`}
    >
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between gap-2 flex-wrap min-w-0">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="text-[10px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 uppercase font-semibold shrink-0">
              {item.id}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {item.nombre}
            </h3>
          </div>

          {tieneAlerta && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold font-mono uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3 text-rose-600" />
              <span>Ojo crítico</span>
            </span>
          )}
        </div>

        {/* Guía visual práctica para usuarios no técnicos */}
        <div
          className={`p-3 rounded-lg text-xs leading-relaxed border flex items-start gap-2.5 ${
            tieneAlerta
              ? 'bg-rose-50/50 border-rose-200/80 text-rose-900'
              : 'bg-slate-50 border-slate-200/80 text-slate-700'
          }`}
        >
          <HelpCircle
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              tieneAlerta ? 'text-rose-600' : 'text-emerald-600'
            }`}
          />
          <div className="flex-1">
            <span className="font-semibold text-slate-900 mr-1.5">
              {tieneAlerta ? 'Fíjate con mucha atención:' : 'Qué debes mirar:'}
            </span>
            <span>{tipLimpio}</span>
          </div>
        </div>

        {/* Costo aproximado en caso de arreglo */}
        {item.costoRefMin !== undefined && item.costoRefMax !== undefined && (
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
            <DollarSign className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>Si está dañado cuesta arreglarlo aprox:</span>
            <span className="font-bold text-amber-800">
              {formatCOP(item.costoRefMin)} – {formatCOP(item.costoRefMax)}
            </span>
          </div>
        )}
      </div>

      {/* 4 Botones de selección rápida */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5">
        {opciones.map((opcion) => {
          const isSelected = valoracion === opcion.valor;
          return (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => onValoracionChange(opcion.valor)}
              className={`h-10 sm:h-11 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer select-none border shadow-2xs active:scale-[0.98] ${
                isSelected
                  ? opcion.activeClasses
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${opcion.badgeClasses(
                  isSelected
                )}`}
              >
                {opcion.symbol}
              </span>
              <span>{opcion.label}</span>
            </button>
          );
        })}
      </div>
    </article>
  );
};

