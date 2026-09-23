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
            className="rounded-xl border border-[#E2E8F0] bg-white transition-colors duration-150 overflow-hidden hover:border-[#CBD5E1]"
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={estaAbierto}
              aria-controls={contentId}
              onClick={() => toggleItem(index)}
              className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0F1B2B]"
            >
              <span className="font-bold text-[#0F1B2B] text-sm sm:text-base leading-snug">
                {item.pregunta}
              </span>
              <span
                className={`p-1.5 rounded-lg bg-[#F8FAFC] text-[#475569] transition-transform duration-200 shrink-0 ${
                  estaAbierto ? 'rotate-180 bg-[#0F1B2B] text-white' : ''
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
                className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-slate-700 text-sm leading-relaxed border-t border-[#F1F5F9]"
              >
                <div className="pt-3 text-slate-600 sm:text-slate-700">{item.respuesta}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
