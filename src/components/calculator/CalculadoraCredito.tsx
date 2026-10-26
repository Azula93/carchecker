'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Percent,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Building,
} from 'lucide-react';
import { DatosCredito, RespuestaCreditoAPI } from '@/types/external-data';
import { calcularCredito, ResultadoCredito } from '@/lib/calculations';

interface CalculadoraCreditoProps {
  /** Precio inicial del vehículo (opcional) */
  precioInicial?: number;
  /** Cuota inicial predeterminada (opcional) */
  cuotaInicialPredeterminada?: number;
  /** Callback para sincronizar la cuota mensual calculada con componentes padres */
  onCuotaMensualChange?: (cuotaMensual: number, resultado: ResultadoCredito) => void;
  /** Callback para cerrar el panel */
  onCerrar?: () => void;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const PLAZOS_PREDEFINIDOS = [12, 24, 36, 48, 60, 72];

export const CalculadoraCredito: React.FC<CalculadoraCreditoProps> = ({
  precioInicial,
  cuotaInicialPredeterminada,
  onCuotaMensualChange,
  onCerrar,
  className = '',
}) => {
  // Estado de parámetros financieros - inicia vacío si no viene un precio inicial válido
  const [precioVehiculo, setPrecioVehiculo] = useState<number | ''>(
    typeof precioInicial === 'number' && precioInicial > 0 ? precioInicial : ''
  );
  const [cuotaInicial, setCuotaInicial] = useState<number | ''>(
    typeof cuotaInicialPredeterminada === 'number'
      ? cuotaInicialPredeterminada
      : (typeof precioInicial === 'number' && precioInicial > 0 ? Math.round(precioInicial * 0.2) : '')
  );
  const [plazoMeses, setPlazoMeses] = useState<number>(48);

  const onCuotaMensualChangeRef = React.useRef(onCuotaMensualChange);
  useEffect(() => {
    onCuotaMensualChangeRef.current = onCuotaMensualChange;
  }, [onCuotaMensualChange]);

  // Estado de tasa: 'referencia' (SFC) o 'personalizada'
  const [tipoTasa, setTipoTasa] = useState<'referencia' | 'personalizada'>('referencia');
  const [tasaPersonalizadaEA, setTasaPersonalizadaEA] = useState<number | ''>(18.5);

  // Estado de conexión a la API oficial de la SFC
  const [cargandoTasa, setCargandoTasa] = useState<boolean>(true);
  const [datosCredito, setDatosCredito] = useState<DatosCredito | null>(null);
  const [errorTasa, setErrorTasa] = useState<string | null>(null);
  const [estadoRespuesta, setEstadoRespuesta] = useState<string>('cargando');

  // Consulta asíncrona a la API interna /api/credito
  useEffect(() => {
    let cancel = false;

    fetch('/api/credito')
      .then((res) => res.json())
      .then((json: RespuestaCreditoAPI) => {
        if (cancel) return;

        setEstadoRespuesta(json.status);

        if (json.success && json.data) {
          setDatosCredito(json.data);
          setErrorTasa(null);
        } else {
          setDatosCredito(null);
          setErrorTasa(
            json.message ||
              'No fue posible obtener la tasa de referencia vigente de la SFC.'
          );
          // Si la fuente no está disponible o la tasa está vencida, activar modo manual
          setTipoTasa('personalizada');
        }
      })
      .catch((err) => {
        if (cancel) return;
        console.error('Error al conectar con la API de crédito:', err);
        setDatosCredito(null);
        setErrorTasa(
          'No fue posible conectar con el servicio oficial. Puedes ingresar una tasa manualmente para simular tu cuota.'
        );
        setTipoTasa('personalizada');
        setEstadoRespuesta('source_unavailable');
      })
      .finally(() => {
        if (!cancel) {
          setCargandoTasa(false);
        }
      });

    return () => {
      cancel = true;
    };
  }, []);

  const precioNum = typeof precioVehiculo === 'number' ? precioVehiculo : 0;
  const cuotaNum = typeof cuotaInicial === 'number' ? cuotaInicial : 0;

  // Validación de cuota inicial y cálculo de monto a financiar
  const cuotaInicialValida = useMemo(() => {
    if (cuotaNum < 0) return 0;
    if (cuotaNum > precioNum) return precioNum;
    return cuotaNum;
  }, [cuotaNum, precioNum]);

  const montoFinanciado = useMemo(() => {
    return Math.max(0, precioNum - cuotaInicialValida);
  }, [precioNum, cuotaInicialValida]);

  // Tasa efectiva anual aplicable
  const tasaEAUtilizada = useMemo(() => {
    if (tipoTasa === 'personalizada' || !datosCredito) {
      const t = typeof tasaPersonalizadaEA === 'number' ? tasaPersonalizadaEA : 0;
      return Math.max(0, t);
    }
    return datosCredito.tasaEA;
  }, [tipoTasa, datosCredito, tasaPersonalizadaEA]);

  // Cálculo financiero puro mediante amortización francesa
  const resultado = useMemo(() => {
    return calcularCredito(
      montoFinanciado,
      tasaEAUtilizada,
      plazoMeses,
      precioNum,
      cuotaInicialValida
    );
  }, [montoFinanciado, tasaEAUtilizada, plazoMeses, precioNum, cuotaInicialValida]);

  // Sincronizar cuota mensual con componente padre si existe callback y se ingresó un valor de vehículo
  useEffect(() => {
    if (onCuotaMensualChangeRef.current && precioNum > 0) {
      onCuotaMensualChangeRef.current(resultado.cuotaMensual, resultado);
    }
  }, [resultado, precioNum]);

  // Porcentaje de cuota inicial
  const porcentajeCuotaInicial =
    precioNum > 0
      ? Math.round((cuotaInicialValida / precioNum) * 100)
      : 0;

  return (
    <div
      className={`w-full bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs text-slate-900 ${className}`}
    >
      {/* Encabezado del Simulador con Botón de Cierre Superior Accesible (Herramienta Primero) */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-xs font-mono font-semibold">
          <Percent className="w-3.5 h-3.5 text-emerald-600" />
          <span>SIMULADOR DE CRÉDITO Y CUOTA MENSUAL</span>
        </div>

        {onCerrar && (
          <button
            type="button"
            onClick={onCerrar}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer shrink-0"
            title="Cerrar simulador"
          >
            <span>✕ Cerrar</span>
          </button>
        )}
      </div>

      {/* Grid de Entradas: Precio, Cuota Inicial y Plazo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 pb-6">
        {/* 1. Precio del Vehículo */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Precio del carro
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-xs font-mono text-slate-400">$</span>
            <input
              type="text"
              value={precioVehiculo === '' ? '' : (typeof precioVehiculo === 'number' ? precioVehiculo.toLocaleString('es-CO') : '')}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '');
                if (raw === '') {
                  setPrecioVehiculo('');
                } else {
                  const val = parseInt(raw, 10);
                  setPrecioVehiculo(val);
                  if (typeof cuotaInicial === 'number' && cuotaInicial > val) {
                    setCuotaInicial(val);
                  }
                }
              }}
              placeholder="Ej. 45.000.000"
              className="w-full h-11 pl-8 pr-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Valor de venta acordado con el dueño
          </span>
        </div>

        {/* 2. Cuota Inicial */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-900">
              Cuota inicial en efectivo
            </label>
            <span className="text-[11px] font-mono font-semibold text-emerald-700">
              {porcentajeCuotaInicial}% del valor
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-xs font-mono text-slate-400">$</span>
            <input
              type="text"
              value={cuotaInicial === '' ? '' : (typeof cuotaInicial === 'number' ? cuotaInicial.toLocaleString('es-CO') : '')}
              onChange={(e) => {
                const raw = e.target.value.replace(/\D/g, '');
                if (raw === '') {
                  setCuotaInicial('');
                } else {
                  const val = parseInt(raw, 10);
                  setCuotaInicial(Math.min(val, precioNum));
                }
              }}
              placeholder="0"
              className="w-full h-11 pl-8 pr-3.5 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Plata que pagarás de una vez (puede ser $0)
          </span>
        </div>

        {/* 3. Plazo en Meses */}
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Tiempo para pagar ({plazoMeses} meses / {(plazoMeses / 12).toFixed(1)} años)
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {PLAZOS_PREDEFINIDOS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPlazoMeses(m)}
                className={`h-11 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer flex items-center justify-center ${
                  plazoMeses === m
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-50 border border-slate-300 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
          <span className="text-[11px] text-slate-500 mt-1 block">
            Elige a cuántos meses pagar el crédito
          </span>
        </div>
      </div>

      {/* SECCIÓN DE TASA: SFC vs Personalizada */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-emerald-600" />
              Tasa de interés:
            </span>

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer p-2 sm:p-0 rounded-lg border border-slate-200 sm:border-transparent bg-white sm:bg-transparent">
                <input
                  type="radio"
                  name="tipoTasa"
                  value="referencia"
                  checked={tipoTasa === 'referencia'}
                  disabled={!datosCredito}
                  onChange={() => setTipoTasa('referencia')}
                  className="accent-[#0F172A]"
                />
                <span className="text-slate-800">Tasa promedio de bancos (Superfinanciera)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer p-2 sm:p-0 rounded-lg border border-slate-200 sm:border-transparent bg-white sm:bg-transparent">
                <input
                  type="radio"
                  name="tipoTasa"
                  value="personalizada"
                  checked={tipoTasa === 'personalizada'}
                  onChange={() => setTipoTasa('personalizada')}
                  className="accent-[#0F172A]"
                />
                <span className="text-slate-800">Escribir tasa cotizada por mi banco</span>
              </label>
            </div>
          </div>

          {cargandoTasa && (
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>Consultando Superfinanciera...</span>
            </div>
          )}
        </div>

        {/* Tarjeta de Tasa de Referencia SFC */}
        {tipoTasa === 'referencia' && datosCredito && (
          <div className="p-4 rounded-xl bg-white border border-emerald-200 shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span className="font-semibold text-xs text-emerald-800">
                  Tasa promedio oficial del mercado bancario
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                  {datosCredito.tasaEA.toFixed(2)}% E.A.
                </span>
                {datosCredito.resolucion && (
                  <span className="text-[10px] text-slate-500 font-mono">
                    Res. {datosCredito.resolucion}
                  </span>
                )}
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[11px] text-slate-500">
                  Vigencia: <strong>{datosCredito.fechaInicioVigencia}</strong> al{' '}
                  <strong>{datosCredito.fechaFinVigencia}</strong>
                </span>
              </div>
            </div>

            {/* Aviso Contextual de Tasa de Usura Legal */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-600 gap-2">
              <p className="text-[11px] leading-relaxed">
                ⓘ Esta tasa es el promedio oficial de lo que cobran los bancos en Colombia según la Superfinanciera. Por ley, ningún banco puede cobrarte más de la tasa de usura ({datosCredito.tasaUsuraEA}% E.A.).
              </p>
            </div>
          </div>
        )}

        {/* Campo de Tasa Personalizada */}
        {tipoTasa === 'personalizada' && (
          <div className="p-4 rounded-xl bg-white border border-slate-300 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-slate-900 block">
                  {errorTasa ? 'Tasa ingresada manualmente' : 'Escribe la tasa ofrecida por tu banco'}
                </span>
                <p className="text-[11px] text-slate-500">
                  Escribe el porcentaje de interés anual (Efectivo Anual o E.A.) que te cotizó tu banco.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-36">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={tasaPersonalizadaEA === 0 ? '' : tasaPersonalizadaEA}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setTasaPersonalizadaEA(isNaN(val) ? 0 : val);
                    }}
                    placeholder="18.50"
                    className="w-full h-10 px-3 pr-8 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-slate-500">% EA</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-amber-50 border border-amber-200 text-amber-800 font-medium whitespace-nowrap">
                  Tasa manual
                </span>
              </div>
            </div>

            {errorTasa && (
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-800">
                <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Nota del sistema ({estadoRespuesta}):</strong> {errorTasa}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TARJETAS DE RESULTADOS PRINCIPALES O GUÍA DE INGRESO */}
      {precioNum > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {/* Monto Financiado */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Plata prestada por el banco
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 block tracking-tight break-words">
                ${resultado.montoFinanciado.toLocaleString('es-CO')}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Precio neto menos tu cuota inicial
              </span>
            </div>

            {/* Tasa Mensual Efectiva */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Interés cobrado al mes
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-slate-900 block tracking-tight break-words">
                {(resultado.tasaMensual * 100).toFixed(2)}%
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Equivalente a {resultado.tasaEA.toFixed(2)}% al año (E.A.)
              </span>
            </div>

            {/* Cuota Mensual Estimada */}
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-800 block mb-1 font-semibold">
                Cuota fija que pagarás al mes
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-mono text-emerald-700 block tracking-tight break-words">
                ${resultado.cuotaMensual.toLocaleString('es-CO')}
              </span>
              <span className="text-[11px] text-emerald-700 block mt-1">
                Durante {resultado.plazoMeses} meses (cuota fija mensual)
              </span>
            </div>

            {/* Total Intereses Pagados */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 block mb-1">
                Intereses que se lleva el banco
              </span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-700 block tracking-tight break-words">
                ${resultado.totalIntereses.toLocaleString('es-CO')}
              </span>
              <span className="text-[11px] text-slate-500 block mt-1">
                Plata adicional que pagas por el crédito
              </span>
            </div>
          </div>

          {/* Resumen de Amortización y Desembolso */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden mb-5">
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-bold text-slate-900">
                Resumen claro de lo que vas a pagar
              </span>
              <span className="text-xs font-mono text-slate-600">
                Costo total del carro con crédito: <strong>${(resultado.cuotaInicial + resultado.totalPagado).toLocaleString('es-CO')} COP</strong>
              </span>
            </div>
            <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block">Plata que te prestaron:</span>
                <strong className="text-sm font-mono text-slate-900">
                  ${resultado.montoFinanciado.toLocaleString('es-CO')} COP
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Intereses que pagas:</span>
                <strong className="text-sm font-mono text-amber-700">
                  + ${resultado.totalIntereses.toLocaleString('es-CO')} COP
                </strong>
              </div>
              <div>
                <span className="text-slate-500 block">Total que le devuelves al banco:</span>
                <strong className="text-sm font-mono text-slate-900">
                  = ${resultado.totalPagado.toLocaleString('es-CO')} COP
                </strong>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="p-6 mb-6 text-center bg-slate-50 border border-dashed border-slate-300 rounded-2xl space-y-1">
          <p className="text-xs sm:text-sm font-bold text-slate-900">
            Escribe el valor del carro para calcular cuánto pagarías de cuota cada mes
          </p>
          <p className="text-[11px] text-slate-500">
            Calcularemos al instante cuánto dinero te prestarían, los intereses y tu cuota mensual estimada.
          </p>
        </div>
      )}

      {/* FICHA OFICIAL Y ADVERTENCIA EDITORIAL */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-600">
        <div className="flex items-start gap-2.5">
          <Building className="w-4 h-4 text-slate-900 shrink-0 mt-0.5" />
          <div>
            <p>
              <strong>Fuente oficial:</strong> Superintendencia Financiera de Colombia (SFC) · Dataset oficial abierto.
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Esta simulación usa tasas de interés promedio del sistema financiero en Colombia para orientar tu presupuesto. La cuota final exacta depende de las políticas y aprobación de cada banco.
            </p>
          </div>
        </div>

        <a
          href="https://www.superfinanciera.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-700 hover:underline font-medium shrink-0"
        >
          <span>Portal SFC</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default CalculadoraCredito;
