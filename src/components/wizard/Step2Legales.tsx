'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  Car,
  CheckCircle2,
  Copy,
  Check,
  Search,
  Scale,
  ShieldAlert,
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
    <div className="space-y-8">
      {/* Encabezado del Paso (Stitch Reference) */}
      <div className="border-b border-[#E2E8F0] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FA] text-[#123B5D] text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-[#8BCF3F] animate-pulse"></span>
            <span>HISTORIAL &amp; LEGALIDAD</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#123B5D] text-xs font-semibold shadow-2xs w-fit">
            <Scale className="w-4 h-4 text-[#3578B8]" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[11px]">Sitios Oficiales</span>
              <span className="text-[10px] text-[#66727D]">RUNT · SIMIT · FASECOLDA</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
          Revisa sus antecedentes oficiales
        </h2>
        <p className="text-xs sm:text-sm text-[#66727D] mt-1.5 leading-relaxed max-w-3xl">
          Consulta las entidades oficiales y clasifica los hallazgos para recalibrar las alertas y verificar si el traspaso es jurídicamente viable.
        </p>

        {/* Vehículo Seleccionado Capsule */}
        <div className="mt-4 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#123B5D] text-white flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#17212B] leading-tight">
                {vehiculoNombre}
              </span>
              <span className="text-[11px] font-mono text-[#66727D]">
                {placaTexto} {anioTexto && `· ${anioTexto}`} {kmTexto && `· ${kmTexto}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-[#EBF7DF] border border-[#BBF7D0] px-3 py-1 rounded-full text-[#2EAD68] text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paso 1 Calibrado</span>
          </div>
        </div>
      </div>

      {/* Banner Instructivo de Flujo */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EBF7DF]/70 border border-[#BBF7D0] shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#2EAD68] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Search className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B5D] block">
              ¿Cómo diligenciar este paso? (Flujo en 2 pasos por portal)
            </span>
            <p className="text-xs sm:text-sm text-[#17212B] leading-relaxed">
              <strong>1. Abre el portal oficial:</strong> Haz clic en el botón destacado de cada tarjeta para abrirlo en una nueva pestaña.<br />
              <strong>2. Regresa a esta pantalla:</strong> Realiza la consulta con la placa del vehículo, vuelve aquí y registra los resultados.
            </p>
          </div>
        </div>

        {datosBasicos?.placa && (
          <button
            type="button"
            onClick={handleCopiarPlaca}
            className="shrink-0 h-11 px-4 rounded-xl bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#123B5D] text-xs font-bold font-mono flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-95"
            title="Copiar placa para pegar en los portales oficiales"
          >
            {placaCopiada ? <Check className="w-4 h-4 text-[#2EAD68]" /> : <Copy className="w-4 h-4" />}
            <span>{placaCopiada ? '¡Placa copiada!' : `Copiar placa: ${datosBasicos.placa}`}</span>
          </button>
        )}
      </div>

      {/* Tarjetas de Consulta Guiada */}
      <div className="flex flex-col gap-6">
        {/* CARD 1: RUNT */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#123B5D]"></div>
              <h3 className="text-base sm:text-lg font-bold text-[#17212B]">RUNT</h3>
            </div>
            <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#EBF3FA] text-[#123B5D] font-bold border border-[#D5E6F5]">
              Propiedad &amp; Prendas
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            Comprueba propietarios históricos, prendas bancarias registradas, embargos o limitaciones directas para transferir el dominio.
          </p>

          {/* Enlace al Portal */}
          <div className="p-4 rounded-2xl bg-[#123B5D] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8BCF3F] shrink-0 border border-white/15">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8BCF3F] bg-white/10 px-2 py-0.5 rounded">
                    Paso 1 · Consulta Externa
                  </span>
                  {/* <span className="text-[11px] text-slate-300">• Abre en pestaña nueva</span> */}
                </div>
                <span className="text-sm font-bold text-white block mt-0.5">
                  Portal Oficial del RUNT
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.RUNT}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 rounded-xl bg-[#8BCF3F] hover:bg-[#7EC134] text-[#17212B] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              <span>Ir al RUNT ↗</span>
            </a>
          </div>

          {/* Paso 2: Registro */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B5D]">
              Paso 2 · Regresa aquí y marca los hallazgos en el RUNT:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Regrabaciones */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#17212B] block">
                    ¿Tiene regrabación de motor o chasis?
                  </span>
                  <span className="text-[11px] text-[#66727D]">Castigo: reduce nota máxima al 50%</span>
                </div>
                <div className="inline-flex rounded-lg border border-[#CBD5E1] p-0.5 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange({ regrabaciones: false })}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      !datos.regrabaciones ? 'bg-[#123B5D] text-white shadow-2xs' : 'text-[#66727D]'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ regrabaciones: true })}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      datos.regrabaciones ? 'bg-[#D64545] text-white shadow-2xs' : 'text-[#66727D]'
                    }`}
                  >
                    Sí
                  </button>
                </div>
              </div>

              {/* Escuela de conducción */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-[#17212B] block">
                    ¿Fue escuela de enseñanza automovilística?
                  </span>
                  <span className="text-[11px] text-[#66727D]">Castigo: reduce nota global al 40%</span>
                </div>
                <div className="inline-flex rounded-lg border border-[#CBD5E1] p-0.5 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange({ escuelaConductcion: false })}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      !datos.escuelaConductcion ? 'bg-[#123B5D] text-white shadow-2xs' : 'text-[#66727D]'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ escuelaConductcion: true })}
                    className={`px-3 py-1 text-xs font-bold rounded-md transition-all cursor-pointer ${
                      datos.escuelaConductcion ? 'bg-[#D64545] text-white shadow-2xs' : 'text-[#66727D]'
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
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#123B5D]"></div>
              <h3 className="text-base sm:text-lg font-bold text-[#17212B]">SIMIT </h3>
            </div>
            <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#EBF3FA] text-[#123B5D] font-bold border border-[#D5E6F5]">
              Infracciones &amp; Multas
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            Verifica comparendos pendientes de la placa del vehículo. Cualquier deuda pendiente bloquea el traspaso legal en el RUNT.
          </p>

          {/* Enlace al Portal */}
          <div className="p-4 rounded-2xl bg-[#123B5D] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E5A72B] shrink-0 border border-white/15">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#E5A72B] bg-white/10 px-2 py-0.5 rounded">
                    Paso 1 · Consulta Externa
                  </span>
                  {/* <span className="text-[11px] text-slate-300">• Abre en pestaña nueva</span> */}
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
              className="h-11 px-5 rounded-xl bg-[#E5A72B] hover:bg-[#D97706] text-[#17212B] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              <span>Ir al SIMIT ↗</span>
            </a>
          </div>

          {/* Paso 2: Registro */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B5D]">
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
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#123B5D]"></div>
              <h3 className="text-base sm:text-lg font-bold text-[#17212B]">FASECOLDA </h3>
            </div>
            <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#EBF3FA] text-[#123B5D] font-bold border border-[#D5E6F5]">
              Siniestralidad
            </span>
          </div>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            Detecta reclamaciones a pólizas todo riesgo por choque, daño estructural o declaraciones de pérdida total registradas por las aseguradoras en Colombia.
          </p>

          {/* Enlace al Portal */}
          <div className="p-4 rounded-2xl bg-[#123B5D] text-white shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#8BCF3F] shrink-0 border border-white/15">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8BCF3F] bg-white/10 px-2 py-0.5 rounded">
                    Paso 1 · Consulta Externa
                  </span>
                  {/* <span className="text-[11px] text-slate-300">• Abre en pestaña nueva</span> */}
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
              className="h-11 px-5 rounded-xl bg-[#8BCF3F] hover:bg-[#7EC134] text-[#17212B] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
            >
              <span>Ir a Fasecolda ↗</span>
            </a>
          </div>

          {/* Paso 2: Registro */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B5D]">
              Paso 2 · Regresa aquí y selecciona la severidad del siniestro:
            </span>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="codigoSiniestro"
                className="block text-xs sm:text-sm font-bold text-[#17212B]"
              >
                Reporte de siniestro registrado
              </label>
              <select
                id="codigoSiniestro"
                value={datos.codigoSiniestro}
                onChange={(e) => onChange({ codigoSiniestro: e.target.value as CodigoSiniestro })}
                className="w-full h-12 px-4 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#17212B] font-medium focus:outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10 shadow-2xs transition-colors cursor-pointer"
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
          className={`p-5 sm:p-6 rounded-2xl border transition-all shadow-2xs ${
            datos.placaPublica
              ? 'bg-[#FEF2F2] border-[#D64545] ring-2 ring-[#D64545]/20'
              : 'bg-white border-[#CBD5E1] hover:border-[#94A3B8]'
          }`}
        >
          <label className="flex items-start gap-3.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={datos.placaPublica}
              onChange={(e) => onChange({ placaPublica: e.target.checked })}
              className="mt-1 w-5 h-5 rounded-md border-[#CBD5E1] text-[#D64545] focus:ring-[#D64545] cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-[#D64545] text-white text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full tracking-wider font-mono">
                  ALERTA CRÍTICA
                </span>
                <span className="font-extrabold text-sm sm:text-base text-[#17212B]">
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
