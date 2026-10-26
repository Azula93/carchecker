'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  ShieldCheck,
  RefreshCw,
  AlertCircle,
  ChevronDown,
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
  /** Callback para cerrar el panel de la calculadora */
  onCerrar?: () => void;
  /** Indica si la tarifa ya ha sido calculada previamente */
  yaCalculado?: boolean;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const OPCIONES_CATEGORIAS = [
  { valor: 'VEHICULOS FAMILIARES', etiqueta: 'Carro familiar (Sedán, Hatchback o Coupe)' },
  { valor: 'CAMPEROS Y CAMIONETAS', etiqueta: 'Camioneta o Campero (SUV, 4x4 o Platón)' },
  { valor: 'MOTOS', etiqueta: 'Moto' },
  { valor: 'VEHICULOS 6 o más pasajeros', etiqueta: 'Camioneta o van de 6 o más pasajeros' },
  { valor: 'CARGA O MIXTO', etiqueta: 'Vehículo de carga (Furgón o Camión)' },
  { valor: 'AUTOS NEGOCIO', etiqueta: 'Taxi o servicio público' },
  { valor: 'CICLOMOTOR', etiqueta: 'Ciclomotor o Motocarro eléctrico' },
];

export const CalculadoraSOAT: React.FC<CalculadoraSOATProps> = ({
  categoriaInicial = 'VEHICULOS FAMILIARES',
  cilindrajeInicial = 1400,
  anioModeloInicial = 2020,
  onTarifaChange,
  onCerrar,
  yaCalculado = false,
  className = '',
}) => {
  const [categoria, setCategoria] = useState<string>(categoriaInicial);
  const [cilindraje, setCilindraje] = useState<number>(cilindrajeInicial);
  const [anioModelo, setAnioModelo] = useState<number>(anioModeloInicial);
  const [capacidadToneladas, setCapacidadToneladas] = useState<number>(4);
  const [haInteractuado, setHaInteractuado] = useState<boolean>(yaCalculado);
  const onTarifaChangeRef = React.useRef(onTarifaChange);

  useEffect(() => {
    onTarifaChangeRef.current = onTarifaChange;
  }, [onTarifaChange]);

  const [cargando, setCargando] = useState<boolean>(true);
  const [datosSoat, setDatosSoat] = useState<DatosSoat | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);

  // Modo de ajuste manual opcional
  const modoManual = false;
  const [precioManual, setPrecioManual] = useState<number | ''>(0);
  const [mostrarFuentes, setMostrarFuentes] = useState<boolean>(false);

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
          setErrorMensaje(json.message || 'No fue posible determinar la tarifa del SOAT.');
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

  useEffect(() => {
    if (onTarifaChangeRef.current && haInteractuado) {
      const precioManualNum = precioManual === '' ? 0 : precioManual;
      const precioEfectivo = modoManual
        ? precioManualNum
        : datosSoat?.precioAnual ?? 0;
      onTarifaChangeRef.current(precioEfectivo, datosSoat);
    }
  }, [datosSoat, modoManual, precioManual, haInteractuado]);

  const precioFinalAnual = modoManual
    ? (precioManual === '' ? 0 : precioManual)
    : datosSoat?.precioAnual ?? 0;
  const provisionMensual = Math.round(precioFinalAnual / 12);

  return (
    <div
      className={`w-full bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs text-slate-900 ${className}`}
    >
      {/* Encabezado Editorial */}
      <div className="flex items-start justify-between gap-3 pb-5 border-b border-slate-200/80">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>PRECIOS OFICIALES DE COLOMBIA (2026)</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            ¿Cuánto cuesta el SOAT de este carro?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            El SOAT es el seguro obligatorio que debes pagar cada año. Su precio exacto cambia según el tipo de carro, qué tan grande es el motor y el año del modelo.
          </p>
        </div>

        {onCerrar && (
          <button
            type="button"
            onClick={onCerrar}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
            title="Cerrar calculadora"
          >
            <span>✕ Cerrar</span>
          </button>
        )}
      </div>

      {/* Formulario de Entrada */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-6 pb-6">
        {/* 1. Tipo / Categoría */}
        <div>
          <label className="block text-xs font-semibold text-slate-900 mb-1.5">
            ¿Qué tipo de carro es?
          </label>
          <select
            value={categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setHaInteractuado(true);
              setCargando(true);
            }}
            className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 cursor-pointer shadow-2xs"
          >
            {OPCIONES_CATEGORIAS.map((opt) => (
              <option key={opt.valor} value={opt.valor}>
                {opt.etiqueta}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Cilindraje en c.c. */}
        {requiereCilindraje ? (
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">
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
                  setHaInteractuado(true);
                  setCargando(true);
                }}
                placeholder="Ej. 1600"
                className="w-full h-11 px-3.5 pr-12 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
              />
              <span className="absolute right-3.5 top-3 text-xs font-mono font-bold text-slate-400">
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
                    setHaInteractuado(true);
                    setCargando(true);
                  }}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    cilindraje === preset
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {preset}cc
                </button>
              ))}
            </div>
          </div>
        ) : esCarga ? (
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">
              Capacidad de carga (Toneladas)
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
                  setHaInteractuado(true);
                  setCargando(true);
                }}
                className="w-full h-11 px-3.5 pr-16 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-800 shadow-2xs"
              />
              <span className="absolute right-3.5 top-3 text-xs font-mono font-bold text-slate-400">
                Ton
              </span>
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">
              Condición especial
            </label>
            <div className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center text-xs text-slate-500 font-medium">
              Tarifa única según categoría
            </div>
          </div>
        )}

        {/* 3. Año del modelo */}
        {requiereEdad ? (
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">
              Año del modelo del carro
            </label>
            <input
              type="number"
              min="1970"
              max={2027}
              value={anioModelo === 0 ? '' : anioModelo}
              onChange={(e) => {
                const val = parseInt(e.target.value, 10) || 0;
                setAnioModelo(val);
                setHaInteractuado(true);
                setCargando(true);
              }}
              placeholder="Ej. 2020"
              className="w-full h-11 px-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-800 shadow-2xs"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">
              {anioModelo > 0 ? (
                <>
                  Tiene <strong>{Math.max(0, 2026 - anioModelo)} años</strong> ({Math.max(0, 2026 - anioModelo) < 10 ? 'Menos de 10 años paga menos' : '10 años o más paga tarifa mayor'})
                </>
              ) : (
                'Año según matrícula'
              )}
            </span>
          </div>
        ) : (
          <div>
            <label className="block text-xs font-semibold text-slate-900 mb-1.5">
              Antigüedad
            </label>
            <div className="h-11 px-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center text-xs text-slate-500 font-medium">
              El año no cambia esta tarifa
            </div>
          </div>
        )}
      </div>

      {/* ESTADO DE CARGA */}
      {cargando && (
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600 mb-5">
          <RefreshCw className="w-4 h-4 animate-spin text-slate-900" />
          <span>Buscando la tarifa oficial en la tabla de la Superintendencia Financiera...</span>
        </div>
      )}

      {/* MENSAJE DE ERROR SI OCURRE */}
      {errorMensaje && !cargando && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-xs text-amber-900 mb-5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong>Nota:</strong> {errorMensaje}
          </div>
        </div>
      )}

      {/* TARJETAS DE RESULTADOS PRINCIPALES */}
      {!cargando && datosSoat && (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tarjeta 1: Total Anual del SOAT */}
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Total a pagar por el SOAT (Vigencia 1 año)
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
                    ${precioFinalAnual.toLocaleString('es-CO')}
                  </span>
                  <span className="text-xs font-mono text-slate-500 font-bold">COP/año</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-2">
                Este es el valor único oficial fijado por el Gobierno. Ninguna aseguradora autorizada puede cobrarte más ni menos.
              </p>
            </div>

            {/* Tarjeta 2: Ahorro mensual sugerido */}
            <div className="p-5 sm:p-6 rounded-xl bg-emerald-50/60 border border-emerald-200 shadow-2xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                  Ahorro mensual recomendado
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-900 tracking-tight">
                    ${provisionMensual.toLocaleString('es-CO')}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-bold">COP/mes</span>
                </div>
              </div>
              <p className="text-xs text-emerald-800 mt-2">
                Consejo: Guarda este valor cada mes en tu cuenta bancaria. Así, cuando llegue la fecha de vencimiento, tendrás la plata lista sin apretarte el bolsillo.
              </p>
            </div>
          </div>

          {/* Desplegable Informativo: ¿A dónde va este dinero? */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setMostrarFuentes(!mostrarFuentes)}
              className="w-full p-3.5 flex items-center justify-between text-xs text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-slate-900">
                ¿Qué cubre el SOAT y a dónde va el dinero?
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${mostrarFuentes ? 'rotate-180' : ''}`} />
            </button>

            {mostrarFuentes && (
              <div className="p-4 pt-1 border-t border-slate-100 text-xs text-slate-600 space-y-2 leading-relaxed font-sans">
                <p>
                  El SOAT cubre la atención médica de emergencia, transporte en ambulancia y gastos hospitalarios de cualquier persona (conductor, pasajeros o peatones) que resulte herida en un accidente de tránsito.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Atención médica:</span>
                    <strong className="text-slate-900">${(datosSoat.precioAnual * 0.52).toLocaleString('es-CO', { maximumFractionDigits: 0 })}</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Fondo de salud pública (ADRES):</span>
                    <strong className="text-slate-900">${(datosSoat.precioAnual * 0.45).toLocaleString('es-CO', { maximumFractionDigits: 0 })}</strong>
                  </div>
                  <div className="p-2 rounded bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 block">Tasa del sistema RUNT:</span>
                    <strong className="text-slate-900">${(datosSoat.precioAnual * 0.03).toLocaleString('es-CO', { maximumFractionDigits: 0 })}</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
