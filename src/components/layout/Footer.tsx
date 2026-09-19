import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, ShieldAlert } from 'lucide-react';
import { ENLACES_PORTALES } from '../../lib/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F1F5F9] border-t border-[#E2E8F0] mt-auto text-[#64748B] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Identity & Description */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo-horizontal.png"
                alt="Car Checker Colombia"
                width={150}
                height={30}
                className="h-7 w-auto object-contain"
              />
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#E2E8F0] text-[#475569] font-medium">v2.4.0</span>
            </div>
            <p className="text-xs leading-relaxed text-[#475569]">
              Plataforma técnica de revisión preliminar automotriz y verificación física multicriterio para compradores en Colombia.
            </p>
          </div>

          {/* Col 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1B2B] mb-3">
              Plataforma
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-[#0F1B2B] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/evaluacion" className="hover:text-[#0F1B2B] transition-colors">
                  Iniciar revisión paso a paso
                </Link>
              </li>
              <li>
                <Link href="/#metodologia" className="hover:text-[#0F1B2B] transition-colors">
                  Metodología de Inspección
                </Link>
              </li>
              <li>
                <Link href="/#aviso-legal" className="hover:text-[#0F1B2B] transition-colors">
                  Alcance y limitaciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portales Oficiales de Consulta */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1B2B] mb-3">
              Bases de Datos Oficiales
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href={ENLACES_PORTALES.RUNT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>RUNT — Historial y Propietarios</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href={ENLACES_PORTALES.SIMIT}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>SIMIT — Comparendos y Multas</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
              <li>
                <a
                  href={ENLACES_PORTALES.FASECOLDA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0F1B2B] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Fasecolda — Historial de Siniestros</span>
                  <ExternalLink className="w-3 h-3 text-[#94A3B8]" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Aviso Legal Relevante */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider text-[#0F1B2B] mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Aviso Legal de Alcance</span>
            </h4>
            <p className="text-[11px] leading-relaxed text-[#475569]">
              Car Checker es una herramienta de revisión preliminar diseñada para orientar y detectar señales de alerta antes de desembolsar el costo de una inspección especializada. No sustituye un peritaje técnico y mecánico formal en un centro de diagnóstico automotriz (CDA) certificado.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#64748B] gap-3">
          <p>© {new Date().getFullYear()} Car Checker Colombia. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
            <span className="font-mono text-[11px]">Sistemas de verificación operativos</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
