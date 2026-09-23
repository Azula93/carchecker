'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { DatosSoat, RespuestaSoatAPI } from '@/types/external-data';

interface CalculadoraSOATProps {
  /** Categoría inicial del vehículo */
  categoriaInicial?: string;
  /** Cilindraje inicial en c.c. */
  cilindrajeInicial?: number;
  /** Año modelo inicial */
  anioModeloInicial?: number;
  /** Callback para sincronizar la tarifa anual y provisión mensual con componentes padres */
  onTarifaChange?: (precioAnual: number, datos: DatosSoat | null) => void;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const OPCIONES_CATEGORIAS = [
  { valor: 'VEHICULOS FAMILIARES', etiqueta: 'Automóvil familiar (Sedán / Hatchback)' },
  { valor: 'CAMPEROS Y CAMIONETAS', etiqueta: 'Campero o Camioneta (SUV / 4x4 / Platón)' },
  { valor: 'MOTOS', etiqueta: 'Motocicleta' },
  { valor: 'VEHICULOS 6 o más pasajeros', etiqueta: 'Vehículo de 6 o más pasajeros' },
  { valor: 'CARGA O MIXTO', etiqueta: 'Carga o Mixto (Camión / Furgón)' },
  { valor: 'AUTOS NEGOCIO', etiqueta: 'Auto de Negocio (Taxi / Servicio Público)' },
  { valor: 'CICLOMOTOR', etiqueta: 'Ciclomotor' },
];

export const CalculadoraSOAT: React.FC<CalculadoraSOATProps> = ({
  categoriaInicial = 'VEHICULOS FAMILIARES',
  cilindrajeInicial = 1400,
  anioModeloInicial = 2020,
  onTarifaChange,
  className = '',
}) => {
  const [categoria, setCategoria] = useState<string>(categoriaInicial);
  const [cilindraje, setCilindraje] = useState<number>(cilindrajeInicial);
  const [anioModelo, setAnioModelo] = useState<number>(anioModeloInicial);
  const [capacidadToneladas, setCapacidadToneladas] = useState<number>(4);

  const [cargando, setCargando] = useState<boolean>(true);
  const [datosSoat, setDatosSoat] = useState<DatosSoat | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  // Modo de ajuste manual opcional
  const [modoManual, setModoManual] = useState<boolean>(false);
  const [precioManual, setPrecioManual] = useState<number>(0);

  // Determinar si la categoría actual requiere cilindraje
  const requiereCilindraje = useMemo(() => {
    return [
      'VEHICULOS FAMILIARES',
      'CAMPEROS Y CAMIONETAS',
      'MOTOS',
      'AUTOS NEGOCIO',
      'OFICIALES ESPECIALES',
      'VEHICULOS 6 o más pasajeros',
    ].includes(categoria);
  }, [categoria]);

  // Determinar si requiere año de modelo (antigüedad)
  const requiereEdad = useMemo(() => {
    return [
      'VEHICULOS FAMILIARES',
      'CAMPEROS Y CAMIONETAS',
      'AUTOS NEGOCIO',
      'VEHICULOS 6 o más pasajeros',
    ].includes(categoria);
  }, [categoria]);

  const esCarga = categoria === 'CARGA O MIXTO';

  // Consulta asíncrona a la API interna /api/soat
  useEffect(() => {
    let cancel = false;

    const queryParams = new URLSearchParams();
    queryParams.set('categoria', categoria);
    if (requiereCilindraje && cilindraje > 0) {
      queryParams.set('cilindraje', cilindraje.toString());
    }
    if (requiereEdad && anioModelo > 0) {
      queryParams.set('anioModelo', anioModelo.toString());
    }
    if (esCarga) {
      queryParams.set('capacidadToneladas', capacidadToneladas.toString());
    }

    fetch(`/api/soat?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((json: RespuestaSoatAPI) => {
        if (cancel) return;

        if (json.success && json.data) {
          setDatosSoat(json.data);
          setErrorMensaje(null);
          if (!modoManual) {
            setPrecioManual(json.data.precioAnual);
          }
        } else {
          setDatosSoat(null);
          setErrorMensaje(json.message || 'No fue posible determinar la tarifa SOAT.');
        }
      })
      .catch((err) => {
        if (cancel) return;
        console.error('Error al conectar con la API de SOAT:', err);
        setDatosSoat(null);
        setErrorMensaje('No se pudo consultar el servicio oficial de tarifas SOAT.');
      })
      .finally(() => {
        if (!cancel) {
          setCargando(false);
        }
      });

    return () => {
      cancel = true;
    };
  }, [categoria, cilindraje, anioModelo, capacidadToneladas, requiereCilindraje, requiereEdad, esCarga, modoManual]);

  // Notificar al componente padre cuando cambie el precio aplicable
  useEffect(() => {
    if (onTarifaChange) {
      const precioEfectivo = modoManual
        ? precioManual
        : datosSoat?.precioAnual ?? 0;
      onTarifaChange(precioEfectivo, datosSoat);
    }
  }, [datosSoat, modoManual, precioManual, onTarifaChange]);

  const precioFinalAnual = modoManual
    ? precioManual
    : datosSoat?.precioAnual ?? 0;
  const provisionMensual = Math.round(precioFinalAnual / 12);

  return (
    <div
      className={`w-full bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs text-[#0F1B2B] ${className}`}
    >
      {/* Encabezado del Módulo SOAT */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-mono font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>TARIFA OFICIAL VIGENTE SFC</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2B]">
            Calculadora de Tarifa SOAT 2026
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
            Determina el valor exacto anual y su provisión mensual conforme a la tabla oficial de tarifas comerciales expedida por la Superintendencia Financiera de Colombia.
          </p>
        </div>
      </div>

      {/* Selectores de Categoría, Cilindraje y Modelo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 pb-6">
        {/* 1. Tipo / Categoría */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
            Categoría del vehículo
          </label>
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setCargando(true);
            }}
            className="w-full h-11 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B] cursor-pointer"
          >
            {OPCIONES_CATEGORIAS.map((opt) => (
              <option key={opt.valor} value={opt.valor}>
                {opt.etiqueta}
              </option>
            ))}
          </select>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Clasificación oficial según tarjeta de propiedad
          </span>
        </div>

        {/* 2. Cilindraje en c.c. (si aplica) */}
        {requiereCilindraje ? (
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
              Cilindraje del motor
            </label>
            <div className="relative">
              <input
                type="number"
                min="50"
                max="10000"
                step="10"
                value={cilindraje === 0 ? '' : cilindraje}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0;
                  setCilindraje(val);
                  setCargando(true);
                }}
                placeholder="Ej. 1400"
                className="w-full h-11 px-3.5 pr-12 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
              <span className="absolute right-3.5 top-3 text-xs font-mono font-bold text-[#64748B]">
                c.c.
              </span>
            </div>
            <div className="flex gap-1 mt-1.5">
              {[1200, 1400, 1600, 2000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setCilindraje(preset);
                    setCargando(true);
                  }}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    cilindraje === preset
                      ? 'bg-[#0F1B2B] text-white border-[#0F1B2B]'
                      : 'bg-white border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                  }`}
                >
                  {preset}cc
                </button>
              ))}
            </div>
          </div>
        ) : esCarga ? (
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
              Capacidad de carga
            </label>
            <div className="relative">
              <input
                type="number"
                min="1"
                max="60"
                step="0.5"
                value={capacidadToneladas}
                onChange={(e) => {
                  setCapacidadToneladas(parseFloat(e.target.value) || 1);
                  setCargando(true);
                }}
                className="w-full h-11 px-3.5 pr-16 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
              <span className="absolute right-3.5 top-3 text-xs font-mono font-bold text-[#64748B]">
                Ton
              </span>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
              Condición especial
            </label>
            <div className="h-11 px-3.5 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-center text-xs text-[#64748B]">
              Tarifa única según categoría
            </div>
          </div>
        )}

        {/* 3. Año del modelo */}
        {requiereEdad ? (
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
              Año del modelo
            </label>
            <input
              type="number"
              min="1970"
              max={2027}
              value={anioModelo === 0 ? '' : anioModelo}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setAnioModelo(val);
                setCargando(true);
              }}
              placeholder="Ej. 2020"
              className="w-full h-11 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
            />
            <span className="text-[11px] text-[#64748B] mt-1 block">
              {anioModelo > 0 ? (
                <>
                  Antigüedad: <strong>{Math.max(0, 2026 - anioModelo)} años</strong> ({Math.max(0, 2026 - anioModelo) < 10 ? 'Menos de 10 años' : '10 o más años'})
                </>
              ) : (
                'Año según matrícula'
              )}
            </span>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
              Antigüedad
            </label>
            <div className="h-11 px-3.5 rounded-lg bg-slate-50 border border-[#E2E8F0] flex items-center text-xs text-[#64748B]">
              No aplica según la tabla SFC
            </div>
          </div>
        )}
      </div>

      {/* Tarjeta de Estado / Tarifa Oficial Obtenida */}
      {cargando ? (
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 text-xs text-[#64748B] mb-5">
          <RefreshCw className="w-4 h-4 animate-spin text-[#0F1B2B]" />
          <span>Consultando tabla de tarifas comerciales oficial de la SFC...</span>
        </div>
      ) : datosSoat ? (
        <div className="p-5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-2xs space-y-3 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-[#166534]"></span>
                <span className="font-bold text-xs text-[#166534]">
                  {datosSoat.categoria}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#BBF7D0] text-[#166534] font-semibold">
                  {datosSoat.subcategoria}
                </span>
              </div>
              <p className="text-xs text-[#166534] leading-relaxed">
                {datosSoat.descripcion}
              </p>
            </div>

            <div className="text-right shrink-0">
              <button
                type="button"
                onClick={() => setModoManual(!modoManual)}
                className="text-xs font-mono text-[#166534] hover:underline cursor-pointer"
              >
                {modoManual ? '✓ Usar tarifa oficial' : '✎ Ajustar manualmente'}
              </button>
            </div>
          </div>

          {modoManual && (
            <div className="pt-3 border-t border-[#BBF7D0] flex items-center gap-3">
              <div className="relative w-48">
                <span className="absolute left-3 top-2.5 text-xs font-mono text-[#64748B]">$</span>
                <input
                  type="text"
                  value={precioManual === 0 ? '' : precioManual.toLocaleString('es-CO')}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
                    setPrecioManual(val);
                  }}
                  className="w-full h-9 pl-7 pr-3 rounded bg-white border border-[#BBF7D0] text-xs font-mono font-bold text-[#0F1B2B]"
                />
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-white border border-[#BBF7D0] text-[#166534]">
                Valor modificado por el usuario
              </span>
            </div>
          )}

          <div className="pt-2 border-t border-[#BBF7D0] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#475569] gap-2">
            <span className="text-[11px]">
              <strong>Vigencia:</strong> {datosSoat.fechaVigenciaInicio} al {datosSoat.fechaVigenciaFin} ({datosSoat.resolucionCircular})
            </span>
            <span className="text-[11px] text-[#166534] font-medium">
              Incluye aporte RUNT ($2.400) + 52% ADRES
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-2.5 text-xs text-[#92400E] mb-5">
          <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>Atención:</strong> {errorMensaje}
          </div>
        </div>
      )}

      {/* Tarjetas de Resultados: Valor Anual y Provisión Mensual */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Tarifa Anual */}
        <div className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
            Costo Anual Oficial SOAT 2026
          </span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#0F1B2B]">
            ${precioFinalAnual.toLocaleString('es-CO')} COP
          </span>
          <span className="text-[11px] text-[#64748B] block mt-1">
            Pago único anual obligatorio para circular en Colombia
          </span>
        </div>

        {/* Provisión Mensual */}
        <div className="p-5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#166534] block mb-1 font-semibold">
            Provisión Mensual Estimada
          </span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#166534]">
            ${provisionMensual.toLocaleString('es-CO')} COP / mes
          </span>
          <span className="text-[11px] text-[#166534] block mt-1">
            Monto equivalente por mes para el presupuesto de tenencia (Total anual ÷ 12)
          </span>
        </div>
      </div>

      {/* Ficha de Transparencia y Fuente Oficial */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#475569]">
        <div>
          <p>
            <strong>Fuente oficial:</strong> Superintendencia Financiera de Colombia (SFC) · Circular Externa 022 de 2025.
          </p>
          <p className="text-[11px] text-[#64748B] mt-0.5">
            Las tarifas comerciales del SOAT son máximas legales obligatorias fijadas por el Gobierno Nacional.
          </p>
        </div>

        <a
          href="https://www.superfinanciera.gov.co/publicaciones/10114908/soat/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#1D4ED8] hover:underline font-medium shrink-0"
        >
          <span>Tabla Oficial SFC</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default CalculadoraSOAT;
