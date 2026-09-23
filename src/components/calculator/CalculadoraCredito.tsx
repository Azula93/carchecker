'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  CreditCard,
  Percent,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Building,
} from 'lucide-react';
import { DatosCredito, RespuestaCreditoAPI } from '@/types/external-data';
import { calcularCredito, ResultadoCredito } from '@/lib/calculations';

interface CalculadoraCreditoProps {
  /** Precio inicial del vehículo (opcional, default 45.000.000 COP) */
  precioInicial?: number;
  /** Cuota inicial predeterminada (opcional, default 20% del precio) */
  cuotaInicialPredeterminada?: number;
  /** Callback para sincronizar la cuota mensual calculada con componentes padres */
  onCuotaMensualChange?: (cuotaMensual: number, resultado: ResultadoCredito) => void;
  /** Clase CSS adicional para el contenedor */
  className?: string;
}

const PLAZOS_PREDEFINIDOS = [12, 24, 36, 48, 60, 72];

export const CalculadoraCredito: React.FC<CalculadoraCreditoProps> = ({
  precioInicial = 45000000,
  cuotaInicialPredeterminada,
  onCuotaMensualChange,
  className = '',
}) => {
  // Estado de parámetros financieros
  const [precioVehiculo, setPrecioVehiculo] = useState<number>(precioInicial);
  const [cuotaInicial, setCuotaInicial] = useState<number>(
    cuotaInicialPredeterminada ?? Math.round(precioInicial * 0.2)
  );
  const [plazoMeses, setPlazoMeses] = useState<number>(48);

  // Estado de tasa: 'referencia' (SFC) o 'personalizada'
  const [tipoTasa, setTipoTasa] = useState<'referencia' | 'personalizada'>('referencia');
  const [tasaPersonalizadaEA, setTasaPersonalizadaEA] = useState<number>(18.5);

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

  // Validación de cuota inicial y cálculo de monto a financiar
  const cuotaInicialValida = useMemo(() => {
    if (cuotaInicial < 0) return 0;
    if (cuotaInicial > precioVehiculo) return precioVehiculo;
    return cuotaInicial;
  }, [cuotaInicial, precioVehiculo]);

  const montoFinanciado = useMemo(() => {
    return Math.max(0, precioVehiculo - cuotaInicialValida);
  }, [precioVehiculo, cuotaInicialValida]);

  // Tasa efectiva anual aplicable
  const tasaEAUtilizada = useMemo(() => {
    if (tipoTasa === 'personalizada' || !datosCredito) {
      return Math.max(0, tasaPersonalizadaEA);
    }
    return datosCredito.tasaEA;
  }, [tipoTasa, datosCredito, tasaPersonalizadaEA]);

  // Cálculo financiero puro mediante amortización francesa
  const resultado = useMemo(() => {
    return calcularCredito(
      montoFinanciado,
      tasaEAUtilizada,
      plazoMeses,
      precioVehiculo,
      cuotaInicialValida
    );
  }, [montoFinanciado, tasaEAUtilizada, plazoMeses, precioVehiculo, cuotaInicialValida]);

  // Sincronizar cuota mensual con componente padre si existe callback
  useEffect(() => {
    if (onCuotaMensualChange) {
      onCuotaMensualChange(resultado.cuotaMensual, resultado);
    }
  }, [resultado, onCuotaMensualChange]);

  // Porcentaje de cuota inicial
  const porcentajeCuotaInicial =
    precioVehiculo > 0
      ? Math.round((cuotaInicialValida / precioVehiculo) * 100)
      : 0;

  return (
    <div
      className={`w-full bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-7 md:p-8 shadow-xs text-[#0F1B2B] ${className}`}
    >
      {/* Encabezado del Simulador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E8F0]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1D4ED8] text-xs font-mono font-semibold mb-2">
            <CreditCard className="w-3.5 h-3.5" />
            <span>SIMULADOR DE FINANCIACIÓN VEHICULAR</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2B]">
            Calculadora de Crédito con Tasa de Referencia SFC
          </h3>
          <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
            Simula el valor de tu cuota mensual mediante el sistema de amortización francés, utilizando la tasa oficial certificada por la Superintendencia Financiera o una tasa bancaria personalizada.
          </p>
        </div>
      </div>

      {/* Grid de Entradas: Precio, Cuota Inicial y Plazo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 pb-6">
        {/* 1. Precio del Vehículo */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
            Precio del vehículo
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-xs font-mono text-[#64748B]">$</span>
            <input
              type="text"
              value={precioVehiculo === 0 ? '' : precioVehiculo.toLocaleString('es-CO')}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
                setPrecioVehiculo(val);
                // Si la cuota inicial supera el nuevo precio, ajustarla automáticamente
                if (cuotaInicial > val) {
                  setCuotaInicial(val);
                }
              }}
              placeholder="Ej. 45.000.000"
              className="w-full h-11 pl-8 pr-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B] transition-colors"
            />
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Valor negociado o publicado del vehículo
          </span>
        </div>

        {/* 2. Cuota Inicial */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#0F1B2B]">
              Cuota inicial
            </label>
            <span className="text-[11px] font-mono font-medium text-[#166534]">
              {porcentajeCuotaInicial}% del valor
            </span>
          </div>
          <div className="relative">
            <span className="absolute left-3.5 top-3 text-xs font-mono text-[#64748B]">$</span>
            <input
              type="text"
              value={cuotaInicial === 0 ? '' : cuotaInicial.toLocaleString('es-CO')}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
                setCuotaInicial(Math.min(val, precioVehiculo));
              }}
              placeholder="Ej. 15.000.000"
              className="w-full h-11 pl-8 pr-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B] transition-colors"
            />
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Monto pagado en efectivo de contado
          </span>
        </div>

        {/* 3. Plazo en Meses */}
        <div>
          <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
            Plazo de financiación ({plazoMeses} meses / {(plazoMeses / 12).toFixed(1)} años)
          </label>
          <div className="grid grid-cols-6 gap-1.5">
            {PLAZOS_PREDEFINIDOS.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setPlazoMeses(m)}
                className={`h-11 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer ${
                  plazoMeses === m
                    ? 'bg-[#0F1B2B] text-white'
                    : 'bg-[#F8FAFC] border border-[#CBD5E1] text-[#475569] hover:bg-slate-100'
                }`}
              >
                {m}m
              </button>
            ))}
          </div>
          <span className="text-[11px] text-[#64748B] mt-1 block">
            Selecciona el número de cuotas mensuales
          </span>
        </div>
      </div>

      {/* SECCIÓN DE TASA: SFC vs Personalizada */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2B] flex items-center gap-1.5">
              <Percent className="w-4 h-4 text-[#0F1B2B]" />
              Modalidad de Tasa:
            </span>

            <div className="flex items-center gap-4 text-xs font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipoTasa"
                  value="referencia"
                  checked={tipoTasa === 'referencia'}
                  disabled={!datosCredito}
                  onChange={() => setTipoTasa('referencia')}
                  className="accent-[#0F1B2B]"
                />
                <span>Tasa de referencia SFC</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="tipoTasa"
                  value="personalizada"
                  checked={tipoTasa === 'personalizada'}
                  onChange={() => setTipoTasa('personalizada')}
                  className="accent-[#0F1B2B]"
                />
                <span>Tasa personalizada (Banco)</span>
              </label>
            </div>
          </div>

          {cargandoTasa && (
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Consultando SFC...</span>
            </div>
          )}
        </div>

        {/* Tarjeta de Tasa de Referencia SFC */}
        {tipoTasa === 'referencia' && datosCredito && (
          <div className="p-4 rounded-xl bg-white border border-[#BBF7D0] shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="w-2.5 h-2.5 rounded-full bg-[#166534]"></span>
                <span className="font-semibold text-xs text-[#166534]">
                  TIBC Certificada — {datosCredito.modalidad}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] font-bold">
                  {datosCredito.tasaEA.toFixed(2)}% E.A.
                </span>
                {datosCredito.resolucion && (
                  <span className="text-[10px] text-[#475569] font-mono">
                    Res. {datosCredito.resolucion}
                  </span>
                )}
              </div>

              <div className="text-right">
                <span className="text-[11px] text-[#475569]">
                  Vigencia: <strong>{datosCredito.fechaInicioVigencia}</strong> al{' '}
                  <strong>{datosCredito.fechaFinVigencia}</strong>
                </span>
              </div>
            </div>

            {/* Aviso Contextual de Tasa de Usura Legal */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#475569] gap-2">
              <p className="text-[11px] leading-relaxed">
                ⓘ La tasa certificada por la SFC es un <strong>promedio ponderado del mercado</strong>. La tasa máxima legal de referencia (usura) para este período es del{' '}
                <strong className="text-[#0F1B2B] font-mono">{datosCredito.tasaUsuraEA}% E.A.</strong> (ninguna entidad financiera puede cobrar por encima de este límite).
              </p>
            </div>
          </div>
        )}

        {/* Campo de Tasa Personalizada */}
        {tipoTasa === 'personalizada' && (
          <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-semibold text-[#0F1B2B] block">
                  {errorTasa ? 'Tasa ingresada manualmente' : 'Ingresa la tasa ofrecida por tu banco'}
                </span>
                <p className="text-[11px] text-[#475569]">
                  Digita la Tasa Efectiva Anual (E.A.) que te coticen para tu crédito vehicular.
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
                    className="w-full h-10 px-3 pr-8 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                  />
                  <span className="absolute right-3 top-2.5 text-xs font-bold text-[#64748B]">% EA</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] font-medium whitespace-nowrap">
                  Tasa ingresada manualmente
                </span>
              </div>
            </div>

            {errorTasa && (
              <div className="p-2.5 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-center gap-2 text-xs text-[#92400E]">
                <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97706]" />
                <span>
                  <strong>Nota del sistema ({estadoRespuesta}):</strong> {errorTasa}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* TARJETAS DE RESULTADOS PRINCIPALES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Monto Financiado */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
            Monto Financiado
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-[#0F1B2B]">
            ${resultado.montoFinanciado.toLocaleString('es-CO')}
          </span>
          <span className="text-[11px] text-[#64748B] block mt-1">
            Precio neto menos cuota inicial
          </span>
        </div>

        {/* Tasa Mensual Efectiva */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
            Tasa Mensual Efectiva
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-[#0F1B2B]">
            {(resultado.tasaMensual * 100).toFixed(2)}%
          </span>
          <span className="text-[11px] text-[#64748B] block mt-1">
            Equivalente a {resultado.tasaEA.toFixed(2)}% E.A.
          </span>
        </div>

        {/* Cuota Mensual Estimada */}
        <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#166534] block mb-1 font-semibold">
            Cuota Fija Mensual
          </span>
          <span className="text-2xl sm:text-3xl font-bold font-mono text-[#166534]">
            ${resultado.cuotaMensual.toLocaleString('es-CO')}
          </span>
          <span className="text-[11px] text-[#166534] block mt-1">
            Por {resultado.plazoMeses} meses (Amortización francesa)
          </span>
        </div>

        {/* Total Intereses Pagados */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B] block mb-1">
            Total Intereses del Crédito
          </span>
          <span className="text-xl sm:text-2xl font-bold font-mono text-[#B45309]">
            ${resultado.totalIntereses.toLocaleString('es-CO')}
          </span>
          <span className="text-[11px] text-[#64748B] block mt-1">
            Costo del financiamiento bancario
          </span>
        </div>
      </div>

      {/* Resumen de Amortización y Desembolso */}
      <div className="border border-[#E2E8F0] rounded-xl overflow-hidden mb-5">
        <div className="p-4 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center justify-between">
          <span className="text-xs font-bold text-[#0F1B2B]">
            Desglose Financiero Total de la Operación
          </span>
          <span className="text-xs font-mono text-[#475569]">
            Total desembolsado: <strong>${(resultado.cuotaInicial + resultado.totalPagado).toLocaleString('es-CO')} COP</strong>
          </span>
        </div>
        <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-[#64748B] block">Capital prestado (P):</span>
            <strong className="text-sm font-mono text-[#0F1B2B]">
              ${resultado.montoFinanciado.toLocaleString('es-CO')} COP
            </strong>
          </div>
          <div>
            <span className="text-[#64748B] block">Intereses totales a pagar:</span>
            <strong className="text-sm font-mono text-[#B45309]">
              + ${resultado.totalIntereses.toLocaleString('es-CO')} COP
            </strong>
          </div>
          <div>
            <span className="text-[#64748B] block">Total pagado por el crédito:</span>
            <strong className="text-sm font-mono text-[#0F1B2B]">
              = ${resultado.totalPagado.toLocaleString('es-CO')} COP
            </strong>
          </div>
        </div>
      </div>

      {/* FICHA OFICIAL Y ADVERTENCIA EDITORIAL */}
      <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#475569]">
        <div className="flex items-start gap-2.5">
          <Building className="w-4 h-4 text-[#0F1B2B] shrink-0 mt-0.5" />
          <div>
            <p>
              <strong>Fuente oficial:</strong> Superintendencia Financiera de Colombia (SFC) · Dataset Datos Abiertos{' '}
              <span className="font-mono text-[#0F1B2B]">pare-7x5i</span>.
            </p>
            <p className="text-[11px] text-[#64748B] mt-0.5">
              Indicador: Interés Bancario Corriente (TIBC) — Modalidad Consumo y Ordinario. La TIBC es una tasa agregada del sistema financiero colombiano y no constituye una oferta comercial individual ni compromiso vinculante de ninguna entidad de crédito.
            </p>
          </div>
        </div>

        <a
          href="https://www.superfinanciera.gov.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#1D4ED8] hover:underline font-medium shrink-0"
        >
          <span>Portal SFC</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default CalculadoraCredito;
