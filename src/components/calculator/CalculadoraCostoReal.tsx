'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Fuel,
  Calculator,
  ShieldAlert,
  Info,
  RefreshCw,
  Building2,
  Car,
  CreditCard,
  ShieldCheck,
} from 'lucide-react';
import { DatosGasolina, RespuestaGasolinaAPI } from '@/types/external-data';
import { calcularGastoGasolina } from '@/lib/calculations';
import { CalculadoraCredito } from './CalculadoraCredito';
import { CalculadoraSOAT } from './CalculadoraSOAT';
import { CalculadoraImpuestoVehicular } from './CalculadoraImpuestoVehicular';

// 13 ciudades oficiales reguladas por la CREG
const CIUDADES_CREG = [
  'Bogotá D.C.',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Cúcuta',
  'Bucaramanga',
  'Pereira',
  'Manizales',
  'Ibagué',
  'Villavicencio',
  'Pasto',
  'Montería',
];

export const CalculadoraCostoReal: React.FC = () => {
  // Estado de ubicación y precio de gasolina
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>('Bogotá D.C.');
  const [otraCiudad, setOtraCiudad] = useState<string>('');
  const [esCiudadManual, setEsCiudadManual] = useState<boolean>(false);

  const [cargandoGasolina, setCargandoGasolina] = useState<boolean>(true);
  const [datosGasolina, setDatosGasolina] = useState<DatosGasolina | null>(null);
  const [precioManual, setPrecioManual] = useState<number>(0);
  const [errorGasolina, setErrorGasolina] = useState<string | null>(null);
  const [modoAjusteManual, setModoAjusteManual] = useState<boolean>(false);

  // Parámetros de uso de combustible
  const [kmMes, setKmMes] = useState<number>(1000);
  const [kmPorGalon, setKmPorGalon] = useState<number>(40);

  // Otros rubros de gasto (anuales que se dividen entre 12, o mensuales)
  const [soatAnual, setSoatAnual] = useState<number>(447300);
  const [mostrarCalculadoraSoat, setMostrarCalculadoraSoat] = useState<boolean>(false);
  const [tecnoAnual, setTecnoAnual] = useState<number>(320000);
  const [impuestoAnual, setImpuestoAnual] = useState<number>(800000);
  const [mostrarCalculadoraImpuesto, setMostrarCalculadoraImpuesto] = useState<boolean>(false);
  const [mantenimientoMensual, setMantenimientoMensual] = useState<number>(150000);
  const [fondoReparacionesMensual, setFondoReparacionesMensual] = useState<number>(120000);
  const [parqueaderoMensual, setParqueaderoMensual] = useState<number>(180000);
  const [peajesMensual, setPeajesMensual] = useState<number>(40000);
  const [lavadoMensual, setLavadoMensual] = useState<number>(35000);
  const [cuotaCreditoMensual, setCuotaCreditoMensual] = useState<number>(0);
  const [incluirCredito, setIncluirCredito] = useState<boolean>(false);

  // Consulta del precio de gasolina de forma asíncrona dentro de useEffect
  useEffect(() => {
    let cancel = false;

    if (esCiudadManual && otraCiudad.trim().length <= 2) {
      return;
    }

    const ciudad = esCiudadManual ? otraCiudad.trim() : ciudadSeleccionada;

    fetch(`/api/gasolina?ciudad=${encodeURIComponent(ciudad)}`)
      .then((res) => res.json())
      .then((json: RespuestaGasolinaAPI) => {
        if (cancel) return;
        if (json.success && json.data) {
          setDatosGasolina(json.data);
          setPrecioManual(json.data.precioPorGalon);
          setModoAjusteManual(false);
          setErrorGasolina(null);
        } else {
          setDatosGasolina(null);
          setErrorGasolina(
            json.message ||
              'La CREG no reporta precio de referencia específico para esta ubicación.'
          );
        }
      })
      .catch((err) => {
        if (cancel) return;
        console.error('Error al conectar con la API de gasolina:', err);
        setDatosGasolina(null);
        setErrorGasolina(
          'No fue posible conectar con el servicio oficial de precios. Puedes ingresar el valor del galón manualmente.'
        );
      })
      .finally(() => {
        if (!cancel) {
          setCargandoGasolina(false);
        }
      });

    return () => {
      cancel = true;
    };
  }, [ciudadSeleccionada, esCiudadManual, otraCiudad]);

  // Precio efectivo por galón utilizado para el cálculo
  const precioGalonEfectivo = useMemo(() => {
    if (modoAjusteManual || esCiudadManual || !datosGasolina) {
      return precioManual > 0 ? precioManual : 0;
    }
    return datosGasolina.precioPorGalon;
  }, [modoAjusteManual, esCiudadManual, datosGasolina, precioManual]);

  // Cálculo de gasolina
  const resultadoGasolina = useMemo(() => {
    return calcularGastoGasolina(kmMes, kmPorGalon, precioGalonEfectivo);
  }, [kmMes, kmPorGalon, precioGalonEfectivo]);

  // Provisiones mensuales de gastos periódicos anuales
  const soatMensual = Math.round(soatAnual / 12);
  const tecnoMensual = Math.round(tecnoAnual / 12);
  const impuestoMensual = Math.round(impuestoAnual / 12);
  const cuotaCreditoEfectiva = incluirCredito ? cuotaCreditoMensual : 0;

  // Total mensual y total anual
  const costoTotalMensual = useMemo(() => {
    return (
      resultadoGasolina.gastoMensual +
      soatMensual +
      tecnoMensual +
      impuestoMensual +
      mantenimientoMensual +
      fondoReparacionesMensual +
      parqueaderoMensual +
      peajesMensual +
      lavadoMensual +
      cuotaCreditoEfectiva
    );
  }, [
    resultadoGasolina.gastoMensual,
    soatMensual,
    tecnoMensual,
    impuestoMensual,
    mantenimientoMensual,
    fondoReparacionesMensual,
    parqueaderoMensual,
    peajesMensual,
    lavadoMensual,
    cuotaCreditoEfectiva,
  ]);

  const costoTotalAnual = costoTotalMensual * 12;

  // Formateador de moneda en pesos colombianos
  const formatoCOP = (valor: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0,
    }).format(valor);
  };

  // Ítems de la tabla de desglose
  const desgloseItems = [
    {
      concepto: 'Gasolina Corriente',
      detalle: `${resultadoGasolina.galonesMes} gal/mes @ ${formatoCOP(precioGalonEfectivo)}`,
      mensual: resultadoGasolina.gastoMensual,
      anual: resultadoGasolina.gastoAnual,
    },
    {
      concepto: 'SOAT',
      detalle: `Provisión mensual (${formatoCOP(soatAnual)}/año)`,
      mensual: soatMensual,
      anual: soatAnual,
    },
    {
      concepto: 'Revisión Tecnomecánica',
      detalle: `Provisión mensual (${formatoCOP(tecnoAnual)}/año)`,
      mensual: tecnoMensual,
      anual: tecnoAnual,
    },
    {
      concepto: 'Impuesto Vehicular',
      detalle: `Provisión mensual (${formatoCOP(impuestoAnual)}/año)`,
      mensual: impuestoMensual,
      anual: impuestoAnual,
    },
    {
      concepto: 'Mantenimiento Preventivo',
      detalle: 'Aceite, filtros, fluidos e inspecciones',
      mensual: mantenimientoMensual,
      anual: mantenimientoMensual * 12,
    },
    {
      concepto: 'Fondo para Reparaciones',
      detalle: 'Desgaste imprevisto (frenos, suspensión, etc.)',
      mensual: fondoReparacionesMensual,
      anual: fondoReparacionesMensual * 12,
    },
    {
      concepto: 'Parqueadero',
      detalle: 'Residencial, laboral o comercial',
      mensual: parqueaderoMensual,
      anual: parqueaderoMensual * 12,
    },
    {
      concepto: 'Peajes',
      detalle: 'Desplazamientos y viajes intermunicipales',
      mensual: peajesMensual,
      anual: peajesMensual * 12,
    },
    {
      concepto: 'Lavado y Cuidado',
      detalle: 'Aseo periódico y estética',
      mensual: lavadoMensual,
      anual: lavadoMensual * 12,
    },
    ...(cuotaCreditoEfectiva > 0
      ? [
          {
            concepto: 'Cuota de Financiación (Crédito)',
            detalle: 'Amortización mensual calculada con Tasa SFC o personalizada',
            mensual: cuotaCreditoEfectiva,
            anual: cuotaCreditoEfectiva * 12,
          },
        ]
      : []),
  ];

  return (
    <div className="w-full bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-8 md:p-10 shadow-sm space-y-8 my-10 not-prose text-[#0F1B2B]">
      {/* Encabezado del componente */}
      <div className="border-b border-[#E2E8F0] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-mono font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>HERRAMIENTA INTERACTIVA OFICIAL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B]">
            Calculadora de Costo Real del Vehículo Usado
          </h2>
          <p className="text-xs sm:text-sm text-[#475569] mt-1">
            Estima el gasto mensual y anual real de tener y rodar tu vehículo en Colombia con precios de referencia vigentes.
          </p>
        </div>
      </div>

      {/* SECCIÓN 1: UBICACIÓN Y PRECIO DE GASOLINA */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2B] flex items-center gap-2">
          <Fuel className="w-4 h-4 text-[#0F1B2B]" />
          <span>1. Precio de la Gasolina (Referencia Oficial CREG)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Selector de Ciudad */}
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
              Ciudad donde rueda el vehículo
            </label>
            <select
              value={esCiudadManual ? 'OTRA' : ciudadSeleccionada}
              onChange={(e) => {
                if (e.target.value === 'OTRA') {
                  setEsCiudadManual(true);
                  setDatosGasolina(null);
                  setCargandoGasolina(false);
                } else {
                  setEsCiudadManual(false);
                  setCiudadSeleccionada(e.target.value);
                  setCargandoGasolina(true);
                }
              }}
              className="w-full h-11 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B] transition-colors cursor-pointer"
            >
              {CIUDADES_CREG.map((c) => (
                <option key={c} value={c}>
                  {c} (Cobertura oficial CREG)
                </option>
              ))}
              <option value="OTRA">Otra ciudad / Municipio no listado</option>
            </select>
          </div>

          {/* Si eligió otra ciudad */}
          {esCiudadManual && (
            <div>
              <label className="block text-xs font-semibold text-[#0F1B2B] mb-1.5">
                Nombre de tu municipio o ciudad
              </label>
              <input
                type="text"
                value={otraCiudad}
                onChange={(e) => {
                  const val = e.target.value;
                  setOtraCiudad(val);
                  if (val.trim().length > 2) {
                    setCargandoGasolina(true);
                  }
                }}
                placeholder="Ej. Tunja, Girardot, Sogamoso..."
                className="w-full h-11 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
            </div>
          )}
        </div>

        {/* TARJETA DE ESTADO DEL PRECIO */}
        {cargandoGasolina ? (
          <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-3 text-xs text-[#64748B]">
            <RefreshCw className="w-4 h-4 animate-spin text-[#0F1B2B]" />
            <span>Consultando precio de referencia oficial vigente en el portal de la CREG...</span>
          </div>
        ) : datosGasolina && !modoAjusteManual ? (
          <div className="p-4 sm:p-5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] shadow-2xs space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#166534]"></span>
                <span className="font-semibold text-xs text-[#166534]">
                  Precio de referencia oficial: {datosGasolina.ciudad}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#BBF7D0] text-[#166534] font-bold">
                  {datosGasolina.producto}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setModoAjusteManual(true)}
                className="text-xs font-mono text-[#166534] hover:underline cursor-pointer text-left sm:text-right"
              >
                Ajustar precio manualmente
              </button>
            </div>

            <div className="pt-1 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-mono font-bold text-[#166534]">
                {formatoCOP(datosGasolina.precioPorGalon)}
              </span>
              <span className="text-xs text-[#166534] font-medium font-mono">/ galón</span>
            </div>

            <div className="text-[11px] text-[#475569] space-y-1 pt-1 border-t border-[#BBF7D0]/60">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5">
                <span>
                  <strong>Fuente:</strong> {datosGasolina.fuente}
                </span>
                <span>·</span>
                <span>
                  <strong>Vigencia:</strong> {datosGasolina.fechaVigencia}
                </span>
              </div>
              <p className="text-[#64748B] italic">
                ⓘ El precio de referencia publicado por el Gobierno no necesariamente coincide con el valor que encontrarás en cada estación. MinEnergía y CREG explican que el precio de referencia sirve como base y puede variar según costos de transporte, distribución y sobretasas locales.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 sm:p-5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-3">
            <div className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#92400E] block">
                  {errorGasolina || 'Ingreso manual de precio de gasolina'}
                </span>
                <p className="text-[11px] text-[#B45309] leading-relaxed">
                  {esCiudadManual
                    ? 'La CREG publica periódicamente precios oficiales de referencia para las 13 ciudades principales. Para otros municipios puedes digitar el precio de venta observado en tu estación cercana.'
                    : 'Ingresa el precio por galón que pagas habitualmente en tu estación de servicio de confianza.'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-1">
              <div className="relative w-full sm:w-60">
                <span className="absolute left-3 top-2.5 text-xs font-mono text-[#64748B]">$</span>
                <input
                  type="text"
                  value={precioManual === 0 ? '' : precioManual.toLocaleString('es-CO')}
                  onChange={(e) => {
                    const val = parseInt(e.target.value.replace(/\D/g, ''), 10);
                    setPrecioManual(isNaN(val) ? 0 : val);
                  }}
                  placeholder="Ej. 16.350"
                  className="w-full h-10 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                />
              </div>
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-white border border-[#FDE68A] text-[#92400E] font-medium">
                Valor manual ingresado por el usuario
              </span>
              {datosGasolina && modoAjusteManual && (
                <button
                  type="button"
                  onClick={() => setModoAjusteManual(false)}
                  className="text-xs text-[#0F1B2B] hover:underline cursor-pointer"
                >
                  Restaurar valor oficial CREG
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* SECCIÓN 2: PARÁMETROS DE USO Y CONSUMO */}
      <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2B] flex items-center gap-2">
          <Car className="w-4 h-4 text-[#0F1B2B]" />
          <span>2. Kilómetros y Rendimiento</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
              Kilómetros recorridos al mes
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={20000}
                value={kmMes === 0 ? '' : kmMes}
                onChange={(e) => setKmMes(Math.max(0, parseInt(e.target.value, 10) || 0))}
                className="w-full h-11 px-3.5 pr-14 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
              <span className="absolute right-3.5 top-3 text-xs font-mono text-[#64748B]">
                KM / MES
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">
              El promedio particular en Colombia está entre 800 y 1.200 km al mes (~10.000 a 15.000 km/año).
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
              Rendimiento estimado del vehículo
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={120}
                value={kmPorGalon === 0 ? '' : kmPorGalon}
                onChange={(e) => setKmPorGalon(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-full h-11 px-3.5 pr-16 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
              <span className="absolute right-3.5 top-3 text-xs font-mono text-[#64748B]">
                KM / GAL
              </span>
            </div>
            <p className="text-[11px] text-[#64748B] mt-1">
              Vehículos compactos: 40–50 km/gal. Sedanes medianos: 32–40 km/gal. Camionetas SUV: 25–35 km/gal.
            </p>
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: OTROS GASTOS DE OPERACIÓN Y LEGALIDAD */}
      <div className="space-y-4 pt-2 border-t border-[#E2E8F0]">
        <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2B] flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#0F1B2B]" />
          <span>3. Obligaciones y Otros Gastos de Uso</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
          {/* SOAT Anual con botón de cálculo oficial */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#0F1B2B]">
                SOAT (Costo Anual)
              </label>
              <button
                type="button"
                onClick={() => setMostrarCalculadoraSoat(!mostrarCalculadoraSoat)}
                className="text-[10px] font-mono text-[#166534] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <ShieldCheck className="w-3 h-3" />
                <span>{mostrarCalculadoraSoat ? 'Ocultar tabla' : 'Tabla SFC 2026'}</span>
              </button>
            </div>
            <input
              type="text"
              value={soatAnual === 0 ? '' : soatAnual.toLocaleString('es-CO')}
              onChange={(e) =>
                setSoatAnual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
            <span className="text-[10px] text-[#64748B]">
              Provisión mensual: {formatoCOP(soatMensual)}
            </span>
          </div>

          {/* Tecnomecánica Anual */}
          <div>
            <label className="block font-semibold text-[#0F1B2B] mb-1">
              Tecnomecánica (Costo Anual)
            </label>
            <input
              type="text"
              value={tecnoAnual === 0 ? '' : tecnoAnual.toLocaleString('es-CO')}
              onChange={(e) =>
                setTecnoAnual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
            <span className="text-[10px] text-[#64748B]">
              Provisión mensual: {formatoCOP(tecnoMensual)}
            </span>
          </div>

          {/* Impuesto Vehicular Anual */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#0F1B2B]">
                Impuesto Vehicular (Anual)
              </label>
              <button
                type="button"
                onClick={() => setMostrarCalculadoraImpuesto(!mostrarCalculadoraImpuesto)}
                className="text-[10px] font-mono text-[#0F1B2B] hover:underline cursor-pointer flex items-center gap-1 font-semibold"
              >
                <Building2 className="w-3 h-3" />
                <span>{mostrarCalculadoraImpuesto ? 'Ocultar tabla' : 'Tabla MinTransporte 2026'}</span>
              </button>
            </div>
            <input
              type="text"
              value={impuestoAnual === 0 ? '' : impuestoAnual.toLocaleString('es-CO')}
              onChange={(e) =>
                setImpuestoAnual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
            <span className="text-[10px] text-[#64748B]">
              Provisión mensual: {formatoCOP(impuestoMensual)}
            </span>
          </div>

          {/* Mantenimiento Preventivo Mensual */}
          <div>
            <label className="block font-semibold text-[#0F1B2B] mb-1">
              Mantenimiento Preventivo (Mes)
            </label>
            <input
              type="text"
              value={mantenimientoMensual === 0 ? '' : mantenimientoMensual.toLocaleString('es-CO')}
              onChange={(e) =>
                setMantenimientoMensual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
            <span className="text-[10px] text-[#64748B]">Cambios de aceite, filtros y fluidos</span>
          </div>

          {/* Fondo para Reparaciones */}
          <div>
            <label className="block font-semibold text-[#0F1B2B] mb-1">
              Fondo Reparaciones (Mes)
            </label>
            <input
              type="text"
              value={fondoReparacionesMensual === 0 ? '' : fondoReparacionesMensual.toLocaleString('es-CO')}
              onChange={(e) =>
                setFondoReparacionesMensual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
            <span className="text-[10px] text-[#64748B]">Ahorro preventivo para imprevistos</span>
          </div>

          {/* Parqueadero */}
          <div>
            <label className="block font-semibold text-[#0F1B2B] mb-1">
              Parqueadero (Mensual)
            </label>
            <input
              type="text"
              value={parqueaderoMensual === 0 ? '' : parqueaderoMensual.toLocaleString('es-CO')}
              onChange={(e) =>
                setParqueaderoMensual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
            <span className="text-[10px] text-[#64748B]">Garaje fijo o estacionamientos</span>
          </div>

          {/* Peajes */}
          <div>
            <label className="block font-semibold text-[#0F1B2B] mb-1">
              Peajes (Mensual)
            </label>
            <input
              type="text"
              value={peajesMensual === 0 ? '' : peajesMensual.toLocaleString('es-CO')}
              onChange={(e) =>
                setPeajesMensual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
          </div>

          {/* Lavado y Cuidado */}
          <div>
            <label className="block font-semibold text-[#0F1B2B] mb-1">
              Lavado y Cuidado (Mensual)
            </label>
            <input
              type="text"
              value={lavadoMensual === 0 ? '' : lavadoMensual.toLocaleString('es-CO')}
              onChange={(e) =>
                setLavadoMensual(parseInt(e.target.value.replace(/\D/g, ''), 10) || 0)
              }
              className="w-full h-10 px-3 rounded-lg bg-white border border-[#CBD5E1] font-mono text-[#0F1B2B]"
            />
          </div>

        </div>

        {/* MÓDULO EXPANDIBLE: CALCULADORA SOAT OFICIAL SFC (ETAPA 3) */}
        {mostrarCalculadoraSoat && (
          <div className="pt-2">
            <CalculadoraSOAT
              onTarifaChange={(precio) => setSoatAnual(precio)}
            />
          </div>
        )}

        {/* MÓDULO EXPANDIBLE: CALCULADORA IMPUESTO VEHICULAR OFICIAL (ETAPA 4) */}
        {mostrarCalculadoraImpuesto && (
          <div className="pt-2">
            <CalculadoraImpuestoVehicular
              onImpuestoChange={(valor) => setImpuestoAnual(valor)}
            />
          </div>
        )}

        {/* MÓDULO INTEGRADO: FINANCIACIÓN Y CRÉDITO VEHICULAR (ETAPA 2) */}
        <div className="pt-4 border-t border-[#E2E8F0]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B]">
                <CreditCard className="w-5 h-5 text-[#0F1B2B]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#0F1B2B] block">
                  ¿Vas a adquirir el vehículo financiado con crédito?
                </span>
                <span className="text-[11px] text-[#475569]">
                  {incluirCredito
                    ? 'Simulador activo. La cuota mensual estimada se incluye en el costo total de rodamiento.'
                    : 'Actualmente se calcula sin cuota de crédito (100% de contado o vehículo ya saldado).'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIncluirCredito(!incluirCredito)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-mono transition-colors cursor-pointer shrink-0 ${
                incluirCredito
                  ? 'bg-[#166534] text-white hover:bg-[#14532D]'
                  : 'bg-white border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-50'
              }`}
            >
              {incluirCredito ? '✓ Financiación Incluida' : '+ Simular Crédito con Tasa SFC'}
            </button>
          </div>

          {incluirCredito && (
            <div className="mt-4">
              <CalculadoraCredito
                onCuotaMensualChange={(cuota) => setCuotaCreditoMensual(cuota)}
              />
            </div>
          )}
        </div>
      </div>

      {/* SECCIÓN 4: RESULTADOS DESTACADOS (MENSUAL Y ANUAL) */}
      <div className="pt-4 border-t border-[#E2E8F0] space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card Mensual */}
          <div className="p-6 rounded-xl bg-[#0F1B2B] text-white shadow-md flex flex-col justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
              Costo Estimado Mensual
            </span>
            <div className="my-3">
              <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-white">
                {formatoCOP(costoTotalMensual)}
              </span>
              <span className="text-xs text-[#94A3B8] font-mono block mt-1">
                Gasto de rodamiento + provisiones mensuales
              </span>
            </div>
            <p className="text-xs text-[#CBD5E1] leading-relaxed">
              Equivale aproximadamente al presupuesto mensual que debes destinar para mantener operativo tu vehículo sin sorpresas.
            </p>
          </div>

          {/* Card Anual */}
          <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#475569] font-semibold">
              Costo Estimado Anual (12 Meses)
            </span>
            <div className="my-3">
              <span className="text-3xl sm:text-4xl font-mono font-bold tracking-tight text-[#0F1B2B]">
                {formatoCOP(costoTotalAnual)}
              </span>
              <span className="text-xs text-[#64748B] font-mono block mt-1">
                Costo total de propiedad anual
              </span>
            </div>
            <p className="text-xs text-[#475569] leading-relaxed">
              Total proyectado para el primer año de uso, combinando pagos recurrentes mensuales con seguros e impuestos anuales.
            </p>
          </div>
        </div>

        {/* TABLA DE DESGLOSE */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2B] font-mono">
              Desglose detallado de presupuesto
            </h4>
            <span className="text-xs text-[#64748B] font-mono">
              100% Personalizable
            </span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] font-mono text-[11px] text-[#64748B] uppercase">
                  <th className="py-3 px-4 font-semibold">Concepto de Gasto</th>
                  <th className="py-3 px-4 font-semibold hidden sm:table-cell">Detalle / Base</th>
                  <th className="py-3 px-4 font-semibold text-right">Mensual</th>
                  <th className="py-3 px-4 font-semibold text-right">Anual</th>
                  <th className="py-3 px-4 font-semibold text-right w-20">% Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {desgloseItems.map((item, idx) => {
                  const porcentaje =
                    costoTotalMensual > 0
                      ? Math.round((item.mensual / costoTotalMensual) * 100)
                      : 0;
                  return (
                    <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#0F1B2B]">
                        {item.concepto}
                      </td>
                      <td className="py-3 px-4 text-[#64748B] hidden sm:table-cell text-[11px]">
                        {item.detalle}
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-[#0F1B2B]">
                        {formatoCOP(item.mensual)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-[#475569]">
                        {formatoCOP(item.anual)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-[#64748B] text-[11px]">
                        {porcentaje}%
                      </td>
                    </tr>
                  );
                })}
                {/* Fila de Totales */}
                <tr className="bg-[#F1F5F9] font-bold border-t-2 border-[#CBD5E1]">
                  <td className="py-3.5 px-4 text-[#0F1B2B] text-sm">TOTAL ESTIMADO</td>
                  <td className="py-3.5 px-4 text-[#475569] hidden sm:table-cell text-xs font-mono">
                    Suma consolidada
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-sm text-[#0F1B2B]">
                    {formatoCOP(costoTotalMensual)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-sm text-[#0F1B2B]">
                    {formatoCOP(costoTotalAnual)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-[#0F1B2B]">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* NOTA DE ALCANCE Y ADVERTENCIA EDITORIAL */}
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-start gap-3 text-xs text-[#475569] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
          <p>
            <strong>Aviso de orientación:</strong> El resultado es una estimación referencial basada en los datos aportados y no una garantía del costo futuro. Los gastos por mantenimiento correctivo, reparaciones mecánicas y consumo de combustible varían según los hábitos de conducción, el tráfico urbano, la topografía y el estado real de conservación del vehículo.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraCostoReal;
