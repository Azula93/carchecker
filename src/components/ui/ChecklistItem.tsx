'use client';

import React, { useState } from 'react';
import { Lightbulb, Search } from 'lucide-react';
import { ChecklistItemDef, ValoracionChecklist } from '../../types/evaluation';
import { formatCOP } from '../../data/repair-costs';

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
  const [showTip, setShowTip] = useState(false);

  const opciones: {
    valor: ValoracionChecklist;
    label: string;
    symbol: string;
    activeClasses: string;
    badgeClasses: (selected: boolean) => string;
  }[] = [
    {
      valor: 'bien',
      label: 'Bueno',
      symbol: '✓',
      activeClasses: 'bg-[#F0FDF4] border-[#16A34A] text-[#15803D] ring-2 ring-[#16A34A]/25 shadow-xs',
      badgeClasses: (sel) =>
        sel ? 'bg-[#16A34A] text-white shadow-2xs' : 'bg-[#DCFCE7] text-[#166534]',
    },
    {
      valor: 'regular',
      label: 'Regular',
      symbol: '▲',
      activeClasses: 'bg-[#FFFBEB] border-[#D97706] text-[#B45309] ring-2 ring-[#D97706]/25 shadow-xs',
      badgeClasses: (sel) =>
        sel ? 'bg-[#D97706] text-white shadow-2xs' : 'bg-[#FEF3C7] text-[#D97706]',
    },
    {
      valor: 'mal',
      label: 'Malo',
      symbol: '✕',
      activeClasses: 'bg-[#FEF2F2] border-[#DC2626] text-[#B91C1C] ring-2 ring-[#DC2626]/25 shadow-xs',
      badgeClasses: (sel) =>
        sel ? 'bg-[#DC2626] text-white shadow-2xs' : 'bg-[#FEE2E2] text-[#DC2626]',
    },
    {
      valor: 'na',
      label: 'N/A',
      symbol: '—',
      activeClasses: 'bg-[#F1F5F9] border-[#475569] text-[#1E293B] ring-2 ring-[#475569]/25 shadow-xs',
      badgeClasses: (sel) =>
        sel ? 'bg-[#475569] text-white shadow-2xs' : 'bg-[#E2E8F0] text-[#64748B]',
    },
  ];

  return (
    <article
      className={`p-4 rounded-xl border transition-all duration-200 shadow-xs flex flex-col gap-3 ${
        valoracion === 'mal'
          ? 'bg-white border-[#FECACA]'
          : valoracion === 'regular'
          ? 'bg-white border-[#FDE68A]'
          : valoracion === 'bien'
          ? 'bg-white border-[#E2E8F0]'
          : 'bg-white border-[#E2E8F0]'
      }`}
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="text-[11px] font-mono text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded border border-[#E2E8F0] uppercase font-semibold shrink-0">
              {item.id}
            </span>
            <h3 className="text-sm font-semibold text-[#0F1B2B] tracking-tight">
              {item.nombre}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setShowTip(!showTip)}
            className="text-xs inline-flex items-center gap-1.5 text-[#0F1B2B] bg-[#F1F5F9] hover:bg-[#E2E8F0] border border-[#CBD5E1] px-2.5 py-1 rounded-lg transition-colors font-semibold shrink-0 cursor-pointer"
            title="Ver guía de verificación para este componente"
          >
            <Lightbulb className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
            <span className="text-[11px]">¿Cómo revisar?</span>
          </button>
        </div>

        {/* Tip / Inspection prompt hint */}
        <p className="text-xs text-[#475569] leading-relaxed">
          {item.tip.replace(/\[ATENCIÓN\]/g, 'Nota importante:')}
        </p>

        {/* Rango de costo de referencia si aplica */}
        {item.costoRefMin !== undefined && item.costoRefMax !== undefined && (
          <div className="mt-0.5 text-[11px] text-[#64748B] flex items-center gap-1.5 font-mono">
            <span>Ref. reparación estimada:</span>
            <span className="font-semibold text-[#D97706]">
              {formatCOP(item.costoRefMin)} – {formatCOP(item.costoRefMax)}
            </span>
          </div>
        )}
      </div>

      {/* 4-State Well-Delimited Segmented Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
        {opciones.map((opcion) => {
          const isSelected = valoracion === opcion.valor;
          return (
            <button
              key={opcion.valor}
              type="button"
              onClick={() => onValoracionChange(opcion.valor)}
              className={`h-11 sm:h-12 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer select-none border-2 shadow-2xs active:scale-95 ${
                isSelected
                  ? opcion.activeClasses
                  : 'bg-white border-[#CBD5E1] text-[#475569] hover:border-[#94A3B8] hover:bg-[#F8FAFC]'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-colors ${opcion.badgeClasses(
                  isSelected
                )}`}
              >
                {opcion.symbol}
              </span>
              <span className="font-bold">{opcion.label}</span>
            </button>
          );
        })}
      </div>

      {/* Expandable Inspection Guide Drawer */}
      {showTip && (
        <div className="mt-1 p-3 bg-[#F8FAFC] border border-[#CBD5E1] rounded-lg text-xs text-[#334155] flex items-start gap-2.5 animate-fadeIn">
          <Search className="w-4 h-4 text-[#0F1B2B] shrink-0 mt-0.5" />
          <div className="flex-1 leading-relaxed">
            <span className="font-semibold text-[#0F1B2B]">Pauta técnica de verificación: </span>
            <span>{item.tip}</span>
          </div>
        </div>
      )}
    </article>
  );
};
