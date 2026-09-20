import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldAlert, FileText } from 'lucide-react';
import { ENLACES_PORTALES } from '../../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F1F5F9] border-t border-[#E2E8F0] mt-auto text-[#64748B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Grid: 4 Defined Columns with generous spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 mb-12">
          {/* Col 1: Identity & Description (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo-horizontal.png"
                alt="Car Checker Colombia"
                width={160}
                height={32}
                className="h-7 w-auto object-contain"
              />
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[#0F1B2B] font-semibold">
                v2.4.0
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#475569] max-w-sm pt-1">
              Herramienta digital especializada para evaluar vehículos usados en Colombia, detectar señales de alerta mecánica o legal y calcular una oferta justa antes de invertir en un peritaje.
            </p>
          </div>

          {/* Col 2: Plataforma (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#0F1B2B] mb-5">
              Plataforma
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link href="/" className="text-[#475569] hover:text-[#0F1B2B] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/evaluacion" className="text-[#475569] hover:text-[#0F1B2B] transition-colors font-medium">
                  Iniciar revisión técnica
                </Link>
              </li>
              <li>
                <Link href="/#metodologia" className="text-[#475569] hover:text-[#0F1B2B] transition-colors">
                  Metodología de inspección
                </Link>
              </li>
              <li>
                <Link href="/#aviso-legal" className="text-[#475569] hover:text-[#0F1B2B] transition-colors">
                  Alcance y limitaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portales Oficiales (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#0F1B2B] mb-5">
              Bases Oficiales
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <a
                  href={ENLACES_PORTALES.RUNT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#475569] hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>RUNT — Historial y Propietarios</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#0F1B2B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={ENLACES_PORTALES.SIMIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#475569] hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>SIMIT — Comparendos y Multas</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#0F1B2B] transition-colors" />
                </a>
              </li>
              <li>
                <a
                  href={ENLACES_PORTALES.FASECOLDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#475569] hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1.5 group"
                >
                  <span>Fasecolda — Historial de Siniestros</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#475569] group-hover:text-[#0F1B2B] transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Términos y Condiciones / Legal (Span 2 - Columna aparte) */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#0F1B2B] mb-5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#0F1B2B]" />
              <span>Términos y Legal</span>
            </h4>
            <ul className="space-y-3 text-xs">
              <li>
                <Link
                  href="/terminos-condiciones"
                  className="text-[#475569] hover:text-[#0F1B2B] transition-colors font-medium inline-flex items-center gap-1"
                >
                  <span>Términos y condiciones</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/politica-privacidad"
                  className="text-[#475569] hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1"
                >
                  <span>Política de privacidad</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Card de Aviso Legal de Alcance */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-2xs flex flex-col sm:flex-row items-start gap-3.5">
          <div className="p-2 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h5 className="font-semibold text-xs uppercase tracking-wider text-[#0F1B2B]">
              Aviso Legal de Alcance y Orientación
            </h5>
            <p className="text-[11px] leading-relaxed text-[#475569]">
              Car Checker es una herramienta digital de estimación y revisión preliminar diseñada para orientar y detectar señales de alerta antes de desembolsar el costo de una inspección técnica formal. Sus resultados son de carácter orientativo y no reemplazan un peritaje técnico, certificación comercial ni diagnóstico de desarme mecánico realizado en un centro de diagnóstico automotriz (CDA) certificado.
            </p>
          </div>
        </div>

        {/* Sub-Footer / Copyright & Estado del Sistema */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B] gap-3">
          <p>© {new Date().getFullYear()} Car Checker Colombia. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#166534] animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#166534] font-medium">Sistemas de verificación operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
