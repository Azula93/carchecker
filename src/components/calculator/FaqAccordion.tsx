'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface FaqItem {
  pregunta: string;
  respuesta: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, className = '' }) => {
  const [abiertos, setAbiertos] = useState<Record<number, boolean>>({ 0: true });

  const toggleItem = (index: number) => {
    setAbiertos((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item, index) => {
        const estaAbierto = !!abiertos[index];
        const contentId = `faq-content-${index}`;
        const buttonId = `faq-btn-${index}`;

        return (
          <div
            key={index}
            className="rounded-2xl border border-slate-200/90 bg-white transition-all duration-150 overflow-hidden hover:border-slate-300 shadow-2xs"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={estaAbierto}
              aria-controls={contentId}
              onClick={() => toggleItem(index)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900"
            >
              <span className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                {item.pregunta}
              </span>
              <span
                className={`p-1.5 rounded-lg transition-transform duration-200 shrink-0 ${
                  estaAbierto ? 'rotate-180 bg-[#0F172A] text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {estaAbierto && (
              <div
                id={contentId}
                role="region"
                aria-labelledby={buttonId}
                className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100"
              >
                <div className="pt-3 text-slate-600 leading-relaxed">{item.respuesta}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
