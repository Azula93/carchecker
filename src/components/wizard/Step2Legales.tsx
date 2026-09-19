'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Car,
  CheckCircle2,
  Copy,
  Check,
  Search,
} from 'lucide-react';
import { AntecedentesLegales, CodigoSiniestro, DatosBasicos } from '../../types/evaluation';
import { ENLACES_PORTALES } from '../../lib/constants';
import { CurrencyInput } from '../ui/CurrencyInput';

interface Step2LegalesProps {
  datos: AntecedentesLegales;
  datosBasicos?: DatosBasicos;
  onChange: (datos: Partial<AntecedentesLegales>) => void;
}

export const Step2Legales: React.FC<Step2LegalesProps> = ({
  datos,
  datosBasicos,
  onChange,
}) => {
  const [placaCopiada, setPlacaCopiada] = useState(false);

  const handleCopiarPlaca = async () => {
    if (datosBasicos?.placa) {
      try {
        await navigator.clipboard.writeText(datosBasicos.placa.replace(/[^A-Za-z0-9]/g, ''));
        setPlacaCopiada(true);
        setTimeout(() => setPlacaCopiada(false), 2000);
      } catch {
        // fallback
      }
    }
  };

  const vehiculoNombre = datosBasicos?.lineaVehiculo || 'Vehículo seleccionado';
  const placaTexto = datosBasicos?.placa ? datosBasicos.placa.toUpperCase() : 'ABC 123';
  const anioTexto = datosBasicos?.anioModelo ? `Mod. ${datosBasicos.anioModelo}` : '';
  const kmTexto = datosBasicos?.kilometraje ? `${datosBasicos.kilometraje.toLocaleString('es-CO')} km` : '';

  return (
    <div className="space-y-6">
      {/* Encabezado del Paso */}
      <div className="border-b border-[#E2E8F0] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold block mb-1">
          Historial &amp; Legalidad
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B] tracking-tight">
          Revisa sus antecedentes oficiales
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
          Consulta las entidades oficiales en ventana externa y clasifica los hallazgos para recalibrar las alertas y verificar si el traspaso es jurídicamente viable.
        </p>

        {/* Verified Vehicle Context Capsule */}
        <div className="mt-4 p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#0F1B2B] text-white flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-[#0F1B2B] leading-tight">
                {vehiculoNombre}
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">
                {placaTexto} {anioTexto && `· ${anioTexto}`} {kmTexto && `· ${kmTexto}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-full text-[#16A34A] text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paso 1 Calibrado</span>
          </div>
        </div>
      </div>

      {/* Banner Instructivo de Flujo: Consulta Externa y Retorno */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F0FDF4] border-2 border-[#86EFAC] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Search className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#166534] block">
              ¿Cómo diligenciar este paso? (Flujo en 2 pasos por portal)
            </span>
            <p className="text-xs sm:text-sm text-[#14532D] leading-relaxed">
              <strong>1. Abre el portal oficial:</strong> Haz clic en el recuadro destacado de cada tarjeta para abrirlo en una nueva pestaña.<br />
              <strong>2. Regresa a esta pantalla:</strong> Realiza la consulta con la placa del vehículo, vuelve aquí y registra los resultados.
            </p>
          </div>
        </div>

        {datosBasicos?.placa && (
          <button
            type="button"
            onClick={handleCopiarPlaca}
            className="shrink-0 h-10 px-3.5 rounded-lg bg-white hover:bg-[#F0FDF4] border-2 border-[#16A34A] text-[#166534] text-xs font-bold font-mono flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
            title="Copiar placa para pegar en los portales oficiales"
          >
            {placaCopiada ? <Check className="w-4 h-4 text-[#16A34A]" /> : <Copy className="w-4 h-4" />}
            <span>{placaCopiada ? '¡Placa copiada!' : `Copiar placa: ${datosBasicos.placa}`}</span>
          </button>
        )}
      </div>

      {/* Official Guided Query Cards */}
      <div className="flex flex-col gap-5">
        {/* CARD 1: RUNT */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0F1B2B]"></div>
              <h3 className="text-base font-bold text-[#0F1B2B]">RUNT Ciudadano</h3>
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium border border-[#E2E8F0]">
              Propiedad &amp; Prendas
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Comprueba propietarios históricos, prendas bancarias registradas, embargos o limitaciones directas para transferir el dominio.
          </p>

          {/* RECUADRO DESTACADO: ENLACE AL PORTAL */}
          <div className="p-4 rounded-xl bg-[#0F1B2B] text-white border-2 border-[#1E293B] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#38BDF8] shrink-0 border border-white/15">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded border border-[#38BDF8]/30">
                    Paso 1 · Consulta Externa
                  </span>
                  <span className="text-[11px] text-white/70">• Abre en pestaña nueva</span>
                </div>
                <span className="text-sm font-bold text-white block mt-0.5">
                  Portal Oficial del RUNT Ciudadano
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.RUNT}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-lg bg-[#38BDF8] hover:bg-[#0284C7] text-[#0F1B2B] hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-md active:scale-95"
            >
              <span>Abrir RUNT Ciudadano ↗</span>
            </a>
          </div>

          {/* PASO 2: RETORNO Y REGISTRO */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F1B2B]">
              Paso 2 · Regresa aquí y marca los hallazgos en el RUNT:
            </span>

            {/* Quick Checks inside RUNT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Regrabaciones */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-[#0F1B2B] block">
                    ¿Tiene regrabación de motor o chasis?
                  </span>
                  <span className="text-[11px] text-[#64748B]">Castigo: reduce nota máxima al 50%</span>
                </div>
                <div className="inline-flex rounded-lg border border-[#CBD5E1] p-0.5 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange({ regrabaciones: false })}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                      !datos.regrabaciones ? 'bg-[#0F1B2B] text-white' : 'text-[#64748B]'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ regrabaciones: true })}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                      datos.regrabaciones ? 'bg-[#DC2626] text-white' : 'text-[#64748B]'
                    }`}
                  >
                    Sí
                  </button>
                </div>
              </div>

              {/* Escuela de conducción */}
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-[#0F1B2B] block">
                    ¿Fue escuela de enseñanza automovilística?
                  </span>
                  <span className="text-[11px] text-[#64748B]">Castigo: reduce nota global al 40%</span>
                </div>
                <div className="inline-flex rounded-lg border border-[#CBD5E1] p-0.5 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange({ escuelaConductcion: false })}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                      !datos.escuelaConductcion ? 'bg-[#0F1B2B] text-white' : 'text-[#64748B]'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ escuelaConductcion: true })}
                    className={`px-2.5 py-1 text-xs font-semibold rounded transition-all cursor-pointer ${
                      datos.escuelaConductcion ? 'bg-[#DC2626] text-white' : 'text-[#64748B]'
                    }`}
                  >
                    Sí
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: SIMIT MULTAS */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0F1B2B]"></div>
              <h3 className="text-base font-bold text-[#0F1B2B]">SIMIT Infracciones &amp; Multas</h3>
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium border border-[#E2E8F0]">
              Comparendos Nacionales
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Verifica comparendos pendientes de la placa y de la cédula del propietario actual. Cualquier deuda pendiente bloquea el traspaso legal en el RUNT.
          </p>

          {/* RECUADRO DESTACADO: ENLACE AL PORTAL */}
          <div className="p-4 rounded-xl bg-[#0F1B2B] text-white border-2 border-[#1E293B] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#FBBF24] shrink-0 border border-white/15">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FBBF24] bg-[#FBBF24]/15 px-2 py-0.5 rounded border border-[#FBBF24]/30">
                    Paso 1 · Consulta Externa
                  </span>
                  <span className="text-[11px] text-white/70">• Abre en pestaña nueva</span>
                </div>
                <span className="text-sm font-bold text-white block mt-0.5">
                  Portal Oficial SIMIT (Multas y Comparendos)
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.SIMIT}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-lg bg-[#FBBF24] hover:bg-[#D97706] text-[#0F1B2B] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-md active:scale-95"
            >
              <span>Abrir SIMIT Multas ↗</span>
            </a>
          </div>

          {/* PASO 2: RETORNO Y REGISTRO */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F1B2B]">
              Paso 2 · Regresa aquí y digita el total de comparendos:
            </span>

            <CurrencyInput
              label="Monto acumulado de comparendos pendientes (SIMIT)"
              value={datos.valorComparendos}
              onChange={(val) => onChange({ valorComparendos: val })}
              placeholder="0"
              helperText="Si el vehículo está en paz y salvo, digita $0. Una deuda mayor a $1.000.000 COP descuenta puntaje y debe ser saldada por el vendedor."
            />
          </div>
        </div>

        {/* CARD 3: FASECOLDA SINIESTROS */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0F1B2B]"></div>
              <h3 className="text-base font-bold text-[#0F1B2B]">Fasecolda Siniestralidad</h3>
            </div>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium border border-[#E2E8F0]">
              Historial Asegurador
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Detecta reclamaciones a pólizas todo riesgo por choque, daño estructural o declaraciones de pérdida total registradas por las aseguradoras en Colombia.
          </p>

          {/* RECUADRO DESTACADO: ENLACE AL PORTAL */}
          <div className="p-4 rounded-xl bg-[#0F1B2B] text-white border-2 border-[#1E293B] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-[#4ADE80] shrink-0 border border-white/15">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#4ADE80] bg-[#4ADE80]/15 px-2 py-0.5 rounded border border-[#4ADE80]/30">
                    Paso 1 · Consulta Externa
                  </span>
                  <span className="text-[11px] text-white/70">• Abre en pestaña nueva</span>
                </div>
                <span className="text-sm font-bold text-white block mt-0.5">
                  Portal Fasecolda (Historial de Accidentes)
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.FASECOLDA}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-lg bg-[#4ADE80] hover:bg-[#16A34A] text-[#0F1B2B] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-md active:scale-95"
            >
              <span>Abrir Historial Fasecolda ↗</span>
            </a>
          </div>

          {/* PASO 2: RETORNO Y REGISTRO */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F1B2B]">
              Paso 2 · Regresa aquí y selecciona la severidad del siniestro:
            </span>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="codigoSiniestro"
                className="block text-xs sm:text-sm font-semibold text-[#0F1B2B]"
              >
                Reporte de siniestro registrado
              </label>
              <select
                id="codigoSiniestro"
                value={datos.codigoSiniestro}
                onChange={(e) => onChange({ codigoSiniestro: e.target.value as CodigoSiniestro })}
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1B2B] font-medium focus:outline-none focus:border-[#0F1B2B] focus:ring-1 focus:ring-[#0F1B2B] shadow-xs transition-colors cursor-pointer"
              >
                <option value="ninguno">Ninguno / Sin siniestros reportados (100% puntaje)</option>
                <option value="1m">1m — Reclamación menor cuantía leve (Baja al 90%)</option>
                <option value="2m">2m — Reclamación mediana cuantía (Baja al 70%)</option>
                <option value="3m">3m — Reclamación mayor cuantía estructural (Baja al 40%)</option>
                <option value="MA">MA — Pérdida Total o Daño Estructural Severo (DESCARTE INMEDIATO)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ALERTA CRÍTICA: ANTECEDENTE DE SERVICIO PÚBLICO */}
        <div
          className={`p-5 rounded-xl border transition-all shadow-xs ${
            datos.placaPublica
              ? 'bg-[#FEF2F2] border-[#DC2626] ring-1 ring-[#DC2626]'
              : 'bg-white border-[#CBD5E1] hover:border-[#94A3B8]'
          }`}
        >
          <label className="flex items-start gap-3.5 cursor-pointer">
            <input
              type="checkbox"
              checked={datos.placaPublica}
              onChange={(e) => onChange({ placaPublica: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-[#CBD5E1] text-[#DC2626] focus:ring-[#DC2626] cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#DC2626] text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider font-mono">
                  ALERTA CRÍTICA
                </span>
                <span className="font-bold text-sm sm:text-base text-[#0F1B2B]">
                  ¿El vehículo tiene o tuvo placa de servicio público (taxi, transporte o especial)?
                </span>
              </div>
              <p className="text-xs text-[#991B1B] mt-1.5 leading-relaxed">
                <strong>Advertencia por desgaste severo:</strong> Los vehículos que prestaron servicio público acumulan una fatiga mecánica y estructural muy superior al uso particular promedio. Presentan alto riesgo de desgaste prematuro en motor, transmisión y componentes de suspensión.
              </p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};
