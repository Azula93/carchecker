import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { EscaneAppLogo } from '../ui/EscaneAppLogo';
import { ENLACES_PORTALES } from '../../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#0F172A] text-slate-300 text-xs border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Identity & Mission */}
          <div className="lg:col-span-3 space-y-4">
            <Link
              href="/"
              className="inline-block rounded-xl p-1 -m-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] transition-shadow"
              aria-label="Ir al inicio de EscaneApp"
            >
              <EscaneAppLogo theme="dark" size="md" showTagline={true} />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm pt-1">
              Herramienta digital de preevaluación para compradores de vehículos usados en Colombia. No constituye peritaje técnico oficial ni asesoría jurídica profesional. Consulta siempre fuentes oficiales y peritos certificados.
            </p>
          </div>

          {/* Col 1: PLATAFORMA */}
          <div className="lg:col-span-2">
            <h4 className="font-mono font-semibold text-[11px] uppercase tracking-wider text-slate-200 mb-4">
              PLATAFORMA
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/evaluacion"
                  className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
                >
                  Iniciar escaneo
                </Link>
              </li>
              <li>
                <Link
                  href="/cuanto-cuesta-mantener-carro-usado-colombia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Calculadora de costos
                </Link>
              </li>
              <li>
                <Link
                  href="/liquidador-impuesto-vehicular-colombia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Liquidador de impuesto vehicular
                </Link>
              </li>
              <li>
                <Link
                  href="/#metodologia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Metodología
                </Link>
              </li>
              <li>
                <Link
                  href="/#aviso-legal"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Alcance y limitaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: GUÍAS Y RECURSOS */}
          <div className="lg:col-span-3">
            <h4 className="font-mono font-semibold text-[11px] uppercase tracking-wider text-slate-200 mb-4">
              GUÍAS Y RECURSOS
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/como-revisar-carro-usado"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Cómo revisar un carro usado
                </Link>
              </li>
              <li>
                <Link
                  href="/costo-peritaje-colombia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Precios de peritaje vehicular
                </Link>
              </li>
              <li>
                <Link
                  href="/antecedentes-vehiculo-colombia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Antecedentes RUNT y SIMIT
                </Link>
              </li>
              <li>
                <Link
                  href="/kilometraje-carro-usado"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Comprobar kilometraje real
                </Link>
              </li>
              <li>
                <Link
                  href="/traspaso-carro-usado-colombia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Traspaso de vehículo y costos
                </Link>
              </li>
              <li>
                <Link
                  href="/carros-salvamento-perdida-total-fasecolda"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Carros salvamento y Fasecolda
                </Link>
              </li>
              <li>
                <Link
                  href="/cuanto-cuesta-mantener-carro-usado-colombia"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Gastos reales de mantenimiento
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: BASES OFICIALES */}
          <div className="lg:col-span-2">
            <h4 className="font-mono font-semibold text-[11px] uppercase tracking-wider text-slate-200 mb-4">
              FUENTES
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a
                  href={ENLACES_PORTALES.RUNT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>RUNT</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={ENLACES_PORTALES.SIMIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>SIMIT</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={ENLACES_PORTALES.FASECOLDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                >
                  <span>Fasecolda</span>
                  <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: TÉRMINOS Y LEGAL */}
          <div className="lg:col-span-2">
            <h4 className="font-mono font-semibold text-[11px] uppercase tracking-wider text-slate-200 mb-4">
              LEGAL Y CONTACTO
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/contacto"
                  className="text-slate-400 hover:text-emerald-400 transition-colors font-medium"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidad"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Privacidad
                </Link>
              </li>
              <li>
                <Link
                  href="/terminos-condiciones"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Términos
                </Link>
              </li>
              <li>
                <Link
                  href="/acerca-de"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  Acerca de EscaneApp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} EscaneApp Colombia. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Hecho para compradores inteligentes en Colombia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
