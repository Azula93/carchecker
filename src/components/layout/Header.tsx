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
}) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isEvaluacion = pathname?.startsWith('/evaluacion');
  const isInicio = pathname === '/';
  const isCostos = pathname?.startsWith('/cuanto-cuesta-mantener');
  const isContacto = pathname === '/contacto';

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo EscaneApp */}
        <Link
          href="/"
          className="flex items-center gap-2 group rounded-xl p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 shrink-0 transition-shadow"
          aria-label="Ir al inicio de EscaneApp"
        >
          <EscaneAppLogo size="md" showTagline={true} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-[13px] font-medium text-slate-600">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isInicio
                ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/evaluacion"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isEvaluacion
                ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Evaluar vehículo
          </Link>
          <Link
            href="/cuanto-cuesta-mantener-carro-usado-colombia"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isCostos
                ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100/80'
            }`}
          >
            Costos
          </Link>
          <Link
            href="/#guias"
            className="px-3 py-1.5 rounded-full hover:text-slate-900 hover:bg-slate-100/80 transition-all duration-150"
          >
            Guías
          </Link>
          <Link
            href="/contacto"
            className={`px-3 py-1.5 rounded-full transition-all duration-150 ${
              isContacto
                ? 'bg-[#0F172A] text-white font-semibold shadow-xs'
                : 'hover:text-slate-900 hover:bg-slate-100/80'
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
              className="hidden md:inline-flex text-[13px] font-medium text-slate-600 hover:text-slate-900 transition-colors py-1.5"
            >
              ¿Cómo funciona?
            </Link>
          )}

          {isEvaluacion && onReiniciar && (
            <button
              onClick={onReiniciar}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200/90 text-xs font-mono font-bold transition-all shadow-2xs active:scale-95"
              title="Borrar datos y comenzar un nuevo escaneo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nuevo Escaneo</span>
            </button>
          )}

          {!isEvaluacion && (
            <Link
              href="/evaluacion"
              className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 h-10 rounded-full bg-[#0F172A] text-white hover:bg-slate-800 text-xs sm:text-sm font-bold shadow-xs hover:shadow transition-all duration-200 active:scale-95"
            >
              <span>Escanear vehículo</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-800 hover:bg-slate-100 transition-colors focus:outline-none"
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
        <div className="lg:hidden border-t border-slate-200/90 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-lg animate-fadeIn">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              isInicio
                ? 'bg-slate-100 text-slate-950 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/evaluacion"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              isEvaluacion
                ? 'bg-slate-100 text-slate-950 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Evaluar vehículo
          </Link>
          <Link
            href="/cuanto-cuesta-mantener-carro-usado-colombia"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              isCostos
                ? 'bg-slate-100 text-slate-950 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Costos
          </Link>
          <Link
            href="/#guias"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 font-medium"
          >
            Guías
          </Link>
          <Link
            href="/#como-funciona"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm text-slate-700 hover:bg-slate-50 font-medium"
          >
            ¿Cómo funciona?
          </Link>
          <Link
            href="/contacto"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
              isContacto
                ? 'bg-slate-100 text-slate-950 font-bold'
                : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            Contacto
          </Link>
          {!isEvaluacion && (
            <div className="pt-2">
              <Link
                href="/evaluacion"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0F172A] text-white font-bold text-sm shadow-xs active:scale-95 transition-all"
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
