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
      {/* Encabezado en lenguaje sencillo */}
      <div className="border-b border-slate-200/90 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PASO 02 · HISTORIAL DE PAPELES, MULTAS Y CHOQUES</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs font-mono w-fit">
            <Scale className="w-3.5 h-3.5 text-slate-600" />
            <span>Páginas oficiales del Gobierno</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Revisa que el carro no tenga problemas legales ni multas
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
          Antes de dar dinero o firmar la promesa de compraventa, verifica en las páginas oficiales de Colombia que el carro se pueda poner a tu nombre sin líos de embargos, deudas bancarias o multas.
        </p>

        {/* Ficha Resumen del Carro */}
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold text-slate-900 leading-tight">
                {vehiculoNombre}
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                {placaTexto} {anioTexto && `· ${anioTexto}`} {kmTexto && `· ${kmTexto}`}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-emerald-800 text-xs font-medium font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Carro listo</span>
          </div>
        </div>
      </div>

      {/* Cómo hacer la consulta fácilmente */}
      <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Search className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 block">
              ¿Cómo revisar en 2 pasos sencillos?
            </span>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>1. Abre la página oficial:</strong> Toca el botón de cada tarjeta para abrir la página del Gobierno.<br />
              <strong>2. Escribe lo que viste:</strong> Vuelve aquí y marca si el carro tiene multas, deudas o choques.
            </p>
          </div>
        </div>

        {datosBasicos?.placa && (
          <button
            type="button"
            onClick={handleCopiarPlaca}
            className="shrink-0 h-10 px-4 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-semibold font-mono flex items-center gap-2 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
            title="Copiar placa para pegarla en las páginas oficiales"
          >
            {placaCopiada ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{placaCopiada ? '¡Placa copiada!' : `Copiar placa: ${datosBasicos.placa}`}</span>
          </button>
        )}
      </div>

      {/* Grid de Portales Oficiales */}
      <div className="flex flex-col gap-6">
        
        {/* CARD 1: RUNT */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h3 className="text-base font-bold text-slate-900">1. Dueños, deudas con bancos y juzgados (RUNT)</h3>
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Página RUNT
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Te muestra cuántos dueños ha tenido el carro, si todavía se le debe dinero al banco (prenda bancaria) o si tiene embargos por demandas judiciales. Si tiene deudas, no podrás hacer el traspaso hasta que se paguen.
          </p>

          {/* Enlace al Portal */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Paso 1 · Consulta gratis
                </span>
                <span className="text-sm font-bold text-white block">
                  Consulta por Placa en el RUNT
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.RUNT}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 rounded-lg bg-white text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all hover:bg-slate-100 cursor-pointer shrink-0 active:scale-[0.98]"
            >
              <span>Abrir RUNT en otra pestaña ↗</span>
            </a>
          </div>

          {/* Paso 2: Registro */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              Paso 2 · Vuelve aquí y marca lo que viste en el RUNT:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Regrabaciones */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    ¿Dice que tiene motor o chasis regrabado?
                  </span>
                  <span className="text-[11px] text-slate-500">Baja mucho el valor comercial del carro</span>
                </div>
                <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange({ regrabaciones: false })}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      !datos.regrabaciones ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ regrabaciones: true })}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      datos.regrabaciones ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    Sí
                  </button>
                </div>
              </div>

              {/* Escuela de conducción */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-semibold text-slate-900 block">
                    ¿Fue usado para enseñar a manejar (escuela)?
                  </span>
                  <span className="text-[11px] text-slate-500">Embrague y caja suelen estar muy desgastados</span>
                </div>
                <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-white shrink-0">
                  <button
                    type="button"
                    onClick={() => onChange({ escuelaConductcion: false })}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      !datos.escuelaConductcion ? 'bg-slate-900 text-white shadow-2xs' : 'text-slate-600'
                    }`}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ escuelaConductcion: true })}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      datos.escuelaConductcion ? 'bg-rose-600 text-white shadow-2xs' : 'text-slate-600'
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
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h3 className="text-base font-bold text-slate-900">2. Multas y fotomultas pendientes (SIMIT)</h3>
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Página SIMIT
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Revisa si la placa tiene fotomultas o comparendos sin pagar en cualquier ciudad de Colombia. Si el carro tiene multas, ninguna secretaría de tránsito permitirá hacer el traspaso hasta que el vendedor las pague.
          </p>

          {/* Enlace al Portal */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0 border border-white/10">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Paso 1 · Consulta gratis
                </span>
                <span className="text-sm font-bold text-white block">
                  Consulta de Multas Nacionales en el SIMIT
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.SIMIT}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 rounded-lg bg-white text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all hover:bg-slate-100 cursor-pointer shrink-0 active:scale-[0.98]"
            >
              <span>Abrir SIMIT en otra pestaña ↗</span>
            </a>
          </div>

          {/* Paso 2: Registro */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              Paso 2 · Si viste multas, escribe el total en dinero:
            </span>

            <CurrencyInput
              label="Total de dinero que debe en multas (SIMIT)"
              value={datos.valorComparendos}
              onChange={(val) => onChange({ valorComparendos: val })}
              placeholder="0"
              helperText="Si el carro está a paz y salvo, déjalo en $0. Si debe multas, el vendedor debe pagarlas antes de que tú le entregues dinero."
            />
          </div>
        </div>

        {/* CARD 3: FASECOLDA SINIESTROS */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-900"></span>
              <h3 className="text-base font-bold text-slate-900">3. Choques y accidentes en aseguradoras (Fasecolda)</h3>
            </div>
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold border border-slate-200">
              Aseguradoras
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Te dice si el carro tuvo choques o accidentes fuertes donde las aseguradoras tuvieron que pagar arreglos grandes o si lo declararon como pérdida total.
          </p>

          {/* Enlace al Portal */}
          <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                <ExternalLink className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                  Paso 1 · Consulta gratis
                </span>
                <span className="text-sm font-bold text-white block">
                  Historial de Accidentes en Fasecolda
                </span>
              </div>
            </div>

            <a
              href={ENLACES_PORTALES.FASECOLDA}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-4 rounded-lg bg-white text-slate-900 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all hover:bg-slate-100 cursor-pointer shrink-0 active:scale-[0.98]"
            >
              <span>Abrir Fasecolda en otra pestaña ↗</span>
            </a>
          </div>

          {/* Paso 2: Registro */}
          <div className="pt-2 flex flex-col gap-2.5">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
              Paso 2 · ¿Qué tipo de accidente reporta la página?
            </span>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="codigoSiniestro"
                className="block text-xs sm:text-sm font-semibold text-slate-900"
              >
                Selecciona el resultado de Fasecolda
              </label>
              <select
                id="codigoSiniestro"
                value={datos.codigoSiniestro}
                onChange={(e) => onChange({ codigoSiniestro: e.target.value as CodigoSiniestro })}
                className="w-full h-11 px-4 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs transition-colors cursor-pointer"
              >
                <option value="ninguno">Limpio: No tiene choques reportados (Excelente)</option>
                <option value="1m">Golpe leve: Rayón o golpe pequeño (1m)</option>
                <option value="2m">Golpe mediano: Reclamación intermedia (2m)</option>
                <option value="3m">Choque fuerte: Daño grande en carrocería (3m)</option>
                <option value="MA">PÉRDIDA TOTAL: El carro quedó destruido o inundado (¡NO COMPRAR!)</option>
              </select>
            </div>
          </div>
        </div>

        {/* ALERTA CRÍTICA: TAXI O SERVICIO PÚBLICO */}
        <div
          className={`p-5 sm:p-6 rounded-xl border transition-all shadow-2xs ${
            datos.placaPublica
              ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-400'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <label className="flex items-start gap-3.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={datos.placaPublica}
              onChange={(e) => onChange({ placaPublica: e.target.checked })}
              className="mt-1 w-4 h-4 rounded border-slate-300 text-rose-600 focus:ring-rose-500 cursor-pointer"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-rose-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded tracking-wider font-mono">
                  ALERTA MÁXIMA
                </span>
                <span className="font-bold text-sm sm:text-base text-slate-900">
                  ¿El carro fue taxi, vehículo de servicio público o de placa blanca en el pasado?
                </span>
              </div>
              <p className="text-xs text-rose-800 mt-1.5 leading-relaxed">
                <strong>¿Por qué es peligroso?</strong> Los carros de servicio público trabajan sin parar día y noche. Aunque los pinten y arreglen para venderlos como particulares, su motor, caja y chasis suelen estar al límite de su vida útil. Se aconseja no comprarlo.
              </p>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
};
