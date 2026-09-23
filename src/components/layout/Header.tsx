'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReiniciar?: () => void;
  mostrarReiniciar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onReiniciar, mostrarReiniciar = false }) => {
  const pathname = usePathname();
  const isEvaluacion = pathname?.startsWith('/evaluacion');

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo with Official Brand Image */}
        <Link href="/" className="flex items-center gap-2.5 group focus:outline-none" aria-label="Ir al inicio de Car Checker">
          <div className="relative h-10 w-auto flex items-center">
            <Image
              src="/logo-horizontal.png"
              alt="Car Checker Colombia"
              width={180}
              height={36}
              priority
              className="h-9 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </div>
          <span className="hidden sm:inline-block text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
            Colombia
          </span>
        </Link>

        {/* Navigation links for Desktop */}
        {!isEvaluacion ? (
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link
              href="/"
              className="text-[#0F1B2B] font-semibold hover:text-[#0F1B2B] transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/#metodologia"
              className="hover:text-[#0F1B2B] transition-colors py-1 cursor-pointer"
            >
              Metodología de Inspección
            </Link>
            <Link
              href="/#antecedentes"
              className="text-[#64748B] hover:text-[#0F1B2B] transition-colors"
            >
              Antecedentes
            </Link>
            <Link
              href="/#aviso-legal"
              className="text-[#64748B] hover:text-[#0F1B2B] transition-colors"
            >
              Aviso legal
            </Link>
          </nav>
        ) : (
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span className="font-medium text-[#0F1B2B]">Revisión preliminar en curso</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {mostrarReiniciar && onReiniciar && (
            <button
              onClick={onReiniciar}
              className="text-xs font-semibold text-[#DC2626] hover:text-[#B91C1C] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
              title="Borrar datos y reiniciar evaluación"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Reiniciar</span>
            </button>
          )}

          {!isEvaluacion && (
            <Link
              href="/evaluacion"
              className="inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 h-10 rounded-lg bg-[#0F1B2B] text-white hover:bg-[#1A2B42] text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-98 shrink-0 whitespace-nowrap"
            >
              <span>Evaluar un vehículo</span>
              <span aria-hidden="true" className="font-mono">→</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
