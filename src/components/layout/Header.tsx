'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { RotateCcw, Menu, X, ArrowRight } from 'lucide-react';
import { EscaneAppLogo } from '../ui/EscaneAppLogo';

interface HeaderProps {
  onReiniciar?: () => void;
  mostrarReiniciar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onReiniciar,
  mostrarReiniciar = false,
}) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEvaluacion = pathname?.startsWith('/evaluacion');
  const isInicio = pathname === '/';
  const isCostos = pathname?.startsWith('/cuanto-cuesta-mantener');
  const isContacto = pathname === '/contacto';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo EscaneApp */}
        <Link
          href="/"
          className="flex items-center gap-2 group focus:outline-none shrink-0"
          aria-label="Ir al inicio de EscaneApp"
        >
          <EscaneAppLogo size="md" showTagline={true} />
        </Link>

        {/* Desktop Navigation Links (Consistent across all pages including /evaluacion) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[13px] font-medium text-[#66727D]">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isInicio
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold shadow-2xs'
                : 'hover:text-[#123B5D] hover:bg-slate-100/70'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/evaluacion"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isEvaluacion
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold shadow-2xs'
                : 'hover:text-[#123B5D] hover:bg-slate-100/70'
            }`}
          >
            Evaluar vehículo
          </Link>
          <Link
            href="/cuanto-cuesta-mantener-carro-usado-colombia"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isCostos
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold shadow-2xs'
                : 'hover:text-[#123B5D] hover:bg-slate-100/70'
            }`}
          >
            Costos
          </Link>
          <Link
            href="/#guias"
            className="px-3 py-1.5 rounded-full hover:text-[#123B5D] hover:bg-slate-100/70 transition-all duration-150"
          >
            Guías
          </Link>
          <Link
            href="/contacto"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isContacto
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold shadow-2xs'
                : 'hover:text-[#123B5D] hover:bg-slate-100/70'
            }`}
          >
            Contacto
          </Link>
        </nav>

        {/* Right CTA & Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {!isEvaluacion && (
            <Link
              href="/#como-funciona"
              className="hidden md:inline-flex text-[13px] font-medium text-[#123B5D] hover:text-[#0E2F4B] transition-colors py-1.5"
            >
              ¿Cómo funciona?
            </Link>
          )}

          {isEvaluacion && onReiniciar && (
            <button
              onClick={onReiniciar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8BCF3F] text-[#17212B] hover:bg-[#7EC134] text-xs font-bold transition-all shadow-xs active:scale-95"
              title="Borrar datos y comenzar un nuevo escaneo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nuevo Escaneo</span>
            </button>
          )}

          {!isEvaluacion && (
            <Link
              href="/evaluacion"
              className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 h-10 rounded-full bg-[#8BCF3F] text-[#17212B] hover:bg-[#7EC134] text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all duration-200 active:scale-98"
            >
              <span>Escanear vehículo</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#123B5D] hover:bg-slate-100 transition-colors focus:outline-none"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm ${
              isInicio
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold'
                : 'text-[#17212B] hover:bg-slate-50 font-medium'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/evaluacion"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm ${
              isEvaluacion
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold'
                : 'text-[#17212B] hover:bg-slate-50 font-medium'
            }`}
          >
            Evaluar vehículo
          </Link>
          <Link
            href="/cuanto-cuesta-mantener-carro-usado-colombia"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm ${
              isCostos
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold'
                : 'text-[#17212B] hover:bg-slate-50 font-medium'
            }`}
          >
            Costos
          </Link>
          <Link
            href="/#guias"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm text-[#17212B] hover:bg-slate-50 font-medium"
          >
            Guías
          </Link>
          <Link
            href="/#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-lg text-sm text-[#17212B] hover:bg-slate-50 font-medium"
          >
            ¿Cómo funciona?
          </Link>
          <Link
            href="/contacto"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-lg text-sm ${
              isContacto
                ? 'bg-[#EBF3FA] text-[#123B5D] font-bold'
                : 'text-[#17212B] hover:bg-slate-50 font-medium'
            }`}
          >
            Contacto
          </Link>
          {!isEvaluacion && (
            <div className="pt-2">
              <Link
                href="/evaluacion"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#8BCF3F] text-[#17212B] font-bold text-sm shadow-xs"
              >
                <span>Escanear vehículo</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
