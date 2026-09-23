'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Fuel,
  RefreshCw,
  Building2,
  CreditCard,
  ShieldCheck,
  Wrench,
  ChevronDown,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  Check,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';
import { DatosGasolina, RespuestaGasolinaAPI } from '@/types/external-data';
import { calcularGastoGasolina } from '@/lib/calculations';
import {
  cargarCostosMantenimiento,
  guardarCostosMantenimiento,
  limpiarCostosMantenimiento,
  EstadoCostosMantenimiento,
} from '@/lib/storage';
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
  // Flag para evitar desincronización de hidratación entre SSR y Cliente
  const [isHydrated, setIsHydrated] = useState<boolean>(false);

  // ==========================================
  // ESTADOS DE COMPLETITUD (Inician en false en SSR)
  // ==========================================
  const [soatCalculado, setSoatCalculado] = useState<boolean>(false);
  const [impuestoCalculado, setImpuestoCalculado] = useState<boolean>(false);
  const [tecnoCalculado, setTecnoCalculado] = useState<boolean>(false);
  const [gasolinaCalculado, setGasolinaCalculado] = useState<boolean>(false);
  const [peajesCalculado, setPeajesCalculado] = useState<boolean>(false);
  const [parqueaderoCalculado, setParqueaderoCalculado] = useState<boolean>(false);
  const [lavadoCalculado, setLavadoCalculado] = useState<boolean>(false);
  const [mantenimientoCalculado, setMantenimientoCalculado] = useState<boolean>(false);
  const [fondoCalculado, setFondoCalculado] = useState<boolean>(false);
  const [creditoCalculado, setCreditoCalculado] = useState<boolean>(false);

  // ==========================================
  // ESTADOS DE DATOS (Inician todos en 0 salvo lo persistido)
  // ==========================================

  // 1. Obligatorios
  const [soatAnual, setSoatAnual] = useState<number | ''>(0);
  const [mostrarCalculadoraSoat, setMostrarCalculadoraSoat] = useState<boolean>(false);

  const [impuestoAnual, setImpuestoAnual] = useState<number | ''>(0);
  const [mostrarCalculadoraImpuesto, setMostrarCalculadoraImpuesto] = useState<boolean>(false);
  const [datosImpuesto, setDatosImpuesto] = useState<{
    baseGravable?: number;
    tarifaTexto?: string;
    impuestoAnualEstimado?: number;
    provisionMensual?: number;
  } | null>(null);

  const [tecnoAnual, setTecnoAnual] = useState<number | ''>(0);

  // 2. Uso
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState<string>('Bogotá D.C.');
  const [otraCiudad, setOtraCiudad] = useState<string>('');
  const [esCiudadManual, setEsCiudadManual] = useState<boolean>(false);
  const [cargandoGasolina, setCargandoGasolina] = useState<boolean>(false);
  const [datosGasolina, setDatosGasolina] = useState<DatosGasolina | null>(null);
  const [precioManual, setPrecioManual] = useState<number | ''>(0);
  const [errorGasolina, setErrorGasolina] = useState<string | null>(null);
  const [kmMes, setKmMes] = useState<number | ''>(1000);
  const [kmPorGalon, setKmPorGalon] = useState<number | ''>(40);

  const [parqueaderoMensual, setParqueaderoMensual] = useState<number | ''>(0);
  const [peajesMensual, setPeajesMensual] = useState<number | ''>(0);
  const [lavadoMensual, setLavadoMensual] = useState<number | ''>(0);

  // 3. Mantenimiento
  const [mantenimientoMensual, setMantenimientoMensual] = useState<number | ''>(0);
  const [fondoReparacionesMensual, setFondoReparacionesMensual] = useState<number | ''>(0);

  // 4. Financiación
  const [cuotaCreditoMensual, setCuotaCreditoMensual] = useState<number>(0);
  const [incluirCredito, setIncluirCredito] = useState<boolean>(false);
  const [mostrarCalculadoraCredito, setMostrarCalculadoraCredito] = useState<boolean>(false);
  const [datosCredito, setDatosCredito] = useState<{
    tasaEA?: number;
    modalidad?: string;
    totalIntereses?: number;
    totalPagar?: number;
    plazoMeses?: number;
  } | null>(null);

  // ==========================================
  // PANELES DESPLEGABLES & FUENTES
  // ==========================================
  const [panelAbierto, setPanelAbierto] = useState<{ [key: string]: boolean }>({});
  const [fuenteAbierta, setFuenteAbierta] = useState<{ [key: string]: boolean }>({});

  const togglePanel = (id: string) => {
    setPanelAbierto((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFuente = (id: string) => {
    setFuenteAbierta((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // ==========================================
  // CARGA DE ESTADO PERSISTIDO TRAS MONTAJE (EVITA HYDRATION MISMATCH)
  // ==========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      const estadoGuardado = cargarCostosMantenimiento();
      if (estadoGuardado) {
        if (estadoGuardado.soat) {
          setSoatCalculado(Boolean(estadoGuardado.soat.calculado));
          if (typeof estadoGuardado.soat.anual === 'number') setSoatAnual(estadoGuardado.soat.anual);
        }
        if (estadoGuardado.impuesto) {
          setImpuestoCalculado(Boolean(estadoGuardado.impuesto.calculado));
          if (typeof estadoGuardado.impuesto.anual === 'number') setImpuestoAnual(estadoGuardado.impuesto.anual);
          if (estadoGuardado.impuesto.baseGravable) {
            setDatosImpuesto({
              baseGravable: estadoGuardado.impuesto.baseGravable,
              tarifaTexto: estadoGuardado.impuesto.tarifaTexto || '1,5%',
              impuestoAnualEstimado: estadoGuardado.impuesto.anual,
              provisionMensual: Math.round(estadoGuardado.impuesto.anual / 12),
            });
          }
        }
        if (estadoGuardado.tecno) {
          setTecnoCalculado(Boolean(estadoGuardado.tecno.calculado));
          if (typeof estadoGuardado.tecno.anual === 'number') setTecnoAnual(estadoGuardado.tecno.anual);
        }
        if (estadoGuardado.gasolina) {
          setGasolinaCalculado(Boolean(estadoGuardado.gasolina.calculado));
          if (estadoGuardado.gasolina.ciudad) setCiudadSeleccionada(estadoGuardado.gasolina.ciudad);
          if (typeof estadoGuardado.gasolina.kmMes === 'number') setKmMes(estadoGuardado.gasolina.kmMes);
          if (typeof estadoGuardado.gasolina.kmPorGalon === 'number') setKmPorGalon(estadoGuardado.gasolina.kmPorGalon);
          if (typeof estadoGuardado.gasolina.precioGalon === 'number') setPrecioManual(estadoGuardado.gasolina.precioGalon);
        }
        if (estadoGuardado.peajes) {
          setPeajesCalculado(Boolean(estadoGuardado.peajes.calculado));
          if (typeof estadoGuardado.peajes.mensual === 'number') setPeajesMensual(estadoGuardado.peajes.mensual);
        }
        if (estadoGuardado.parqueadero) {
          setParqueaderoCalculado(Boolean(estadoGuardado.parqueadero.calculado));
          if (typeof estadoGuardado.parqueadero.mensual === 'number') setParqueaderoMensual(estadoGuardado.parqueadero.mensual);
        }
        if (estadoGuardado.lavado) {
          setLavadoCalculado(Boolean(estadoGuardado.lavado.calculado));
          if (typeof estadoGuardado.lavado.mensual === 'number') setLavadoMensual(estadoGuardado.lavado.mensual);
        }
        if (estadoGuardado.mantenimiento) {
          setMantenimientoCalculado(Boolean(estadoGuardado.mantenimiento.calculado));
          if (typeof estadoGuardado.mantenimiento.mensual === 'number') setMantenimientoMensual(estadoGuardado.mantenimiento.mensual);
        }
        if (estadoGuardado.fondoReparaciones) {
          setFondoCalculado(Boolean(estadoGuardado.fondoReparaciones.calculado));
          if (typeof estadoGuardado.fondoReparaciones.mensual === 'number') setFondoReparacionesMensual(estadoGuardado.fondoReparaciones.mensual);
        }
        if (estadoGuardado.credito) {
          setCreditoCalculado(Boolean(estadoGuardado.credito.calculado));
          if (typeof estadoGuardado.credito.mensual === 'number') setCuotaCreditoMensual(estadoGuardado.credito.mensual);
          setIncluirCredito(Boolean(estadoGuardado.credito.activo));
        }
      }
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // ==========================================
  // PERSISTENCIA AUTOMÁTICA EN LOCALSTORAGE
  // ==========================================
  useEffect(() => {
    if (!isHydrated) return;

    const payload: EstadoCostosMantenimiento = {
      soat: {
        calculado: soatCalculado,
        anual: typeof soatAnual === 'number' ? soatAnual : 0,
      },
      impuesto: {
        calculado: impuestoCalculado,
        anual: typeof impuestoAnual === 'number' ? impuestoAnual : 0,
        baseGravable: datosImpuesto?.baseGravable,
        tarifaTexto: datosImpuesto?.tarifaTexto,
      },
      tecno: {
        calculado: tecnoCalculado,
        anual: typeof tecnoAnual === 'number' ? tecnoAnual : 0,
      },
      gasolina: {
        calculado: gasolinaCalculado,
        mensual: typeof kmMes === 'number' ? kmMes : 0,
        ciudad: ciudadSeleccionada,
        kmMes: typeof kmMes === 'number' ? kmMes : 0,
        kmPorGalon: typeof kmPorGalon === 'number' ? kmPorGalon : 40,
        precioGalon: typeof precioManual === 'number' ? precioManual : 0,
      },
      peajes: {
        calculado: peajesCalculado,
        mensual: typeof peajesMensual === 'number' ? peajesMensual : 0,
      },
      parqueadero: {
        calculado: parqueaderoCalculado,
        mensual: typeof parqueaderoMensual === 'number' ? parqueaderoMensual : 0,
      },
      lavado: {
        calculado: lavadoCalculado,
        mensual: typeof lavadoMensual === 'number' ? lavadoMensual : 0,
      },
      mantenimiento: {
        calculado: mantenimientoCalculado,
        mensual: typeof mantenimientoMensual === 'number' ? mantenimientoMensual : 0,
      },
      fondoReparaciones: {
        calculado: fondoCalculado,
        mensual: typeof fondoReparacionesMensual === 'number' ? fondoReparacionesMensual : 0,
      },
      credito: {
        calculado: creditoCalculado,
        mensual: cuotaCreditoMensual,
        activo: incluirCredito,
      },
    };

    guardarCostosMantenimiento(payload);
  }, [
    isHydrated,
    soatCalculado,
    soatAnual,
    impuestoCalculado,
    impuestoAnual,
    datosImpuesto,
    tecnoCalculado,
    tecnoAnual,
    gasolinaCalculado,
    ciudadSeleccionada,
    kmMes,
    kmPorGalon,
    precioManual,
    peajesCalculado,
    peajesMensual,
    parqueaderoCalculado,
    parqueaderoMensual,
    lavadoCalculado,
    lavadoMensual,
    mantenimientoCalculado,
    mantenimientoMensual,
    fondoCalculado,
    fondoReparacionesMensual,
    creditoCalculado,
    cuotaCreditoMensual,
    incluirCredito,
  ]);

  // ==========================================
  // CONSULTA DE GASOLINA OFICIAL CREG
  // ==========================================
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

  // ==========================================
  // CÁLCULOS DERIVADOS (Solo suman ítems calculados)
  // ==========================================
  const soatNum = soatCalculado && typeof soatAnual === 'number' ? soatAnual : 0;
  const tecnoNum = tecnoCalculado && typeof tecnoAnual === 'number' ? tecnoAnual : 0;
  const impuestoNum = impuestoCalculado && typeof impuestoAnual === 'number' ? impuestoAnual : 0;
  const kmMesNum = typeof kmMes === 'number' ? kmMes : 0;
  const kmPorGalonNum = typeof kmPorGalon === 'number' && kmPorGalon > 0 ? kmPorGalon : 40;
  const precioManualNum = typeof precioManual === 'number' ? precioManual : 0;
  const mantenimientoNum = mantenimientoCalculado && typeof mantenimientoMensual === 'number' ? mantenimientoMensual : 0;
  const fondoReparacionesNum = fondoCalculado && typeof fondoReparacionesMensual === 'number' ? fondoReparacionesMensual : 0;
  const parqueaderoNum = parqueaderoCalculado && typeof parqueaderoMensual === 'number' ? parqueaderoMensual : 0;
  const peajesNum = peajesCalculado && typeof peajesMensual === 'number' ? peajesMensual : 0;
  const lavadoNum = lavadoCalculado && typeof lavadoMensual === 'number' ? lavadoMensual : 0;

  const precioGalonEfectivo = useMemo(() => {
    if (esCiudadManual || !datosGasolina) {
      return precioManualNum > 0 ? precioManualNum : 16200;
    }
    return datosGasolina.precioPorGalon;
  }, [esCiudadManual, datosGasolina, precioManualNum]);

  const resultadoGasolina = useMemo(() => {
    return calcularGastoGasolina(kmMesNum, kmPorGalonNum, precioGalonEfectivo);
  }, [kmMesNum, kmPorGalonNum, precioGalonEfectivo]);

  const gastoGasolinaEfectivo = gasolinaCalculado ? resultadoGasolina.gastoMensual : 0;
  const gastoGasolinaAnualEfectivo = gasolinaCalculado ? resultadoGasolina.gastoAnual : 0;

  const soatMensual = Math.round(soatNum / 12);
  const tecnoMensual = Math.round(tecnoNum / 12);
  const impuestoMensual = Math.round(impuestoNum / 12);
  const cuotaCreditoEfectiva = creditoCalculado && incluirCredito ? cuotaCreditoMensual : 0;

  // Total global consolidado (Suma estricta de lo que el usuario ha calculado)
  const costoTotalMensual = useMemo(() => {
    return (
      gastoGasolinaEfectivo +
      soatMensual +
      tecnoMensual +
      impuestoMensual +
      mantenimientoNum +
      fondoReparacionesNum +
      parqueaderoNum +
      peajesNum +
      lavadoNum +
      cuotaCreditoEfectiva
    );
  }, [
    gastoGasolinaEfectivo,
    soatMensual,
    tecnoMensual,
    impuestoMensual,
    mantenimientoNum,
    fondoReparacionesNum,
    parqueaderoNum,
    peajesNum,
    lavadoNum,
    cuotaCreditoEfectiva,
  ]);

  const costoTotalAnual = costoTotalMensual * 12;

  const formatoCOP = (valor: number): string => {
    return `$${Math.round(valor).toLocaleString('es-CO')}`;
  };

  // Cálculo de pasos completados (1 a 4)
  const paso1Completado = soatCalculado || impuestoCalculado || tecnoCalculado;
  const paso2Completado = gasolinaCalculado || peajesCalculado || parqueaderoCalculado || lavadoCalculado;
  const paso3Completado = mantenimientoCalculado || fondoCalculado;
  const paso4Completado = creditoCalculado;

  const pasosCompletados = [paso1Completado, paso2Completado, paso3Completado, paso4Completado].filter(Boolean).length;

  // Función para reiniciar todos los cálculos
  const reiniciarTodo = () => {
    limpiarCostosMantenimiento();
    setSoatCalculado(false);
    setSoatAnual(0);
    setImpuestoCalculado(false);
    setImpuestoAnual(0);
    setDatosImpuesto(null);
    setTecnoCalculado(false);
    setTecnoAnual(0);
    setGasolinaCalculado(false);
    setPeajesCalculado(false);
    setPeajesMensual(0);
    setParqueaderoCalculado(false);
    setParqueaderoMensual(0);
    setLavadoCalculado(false);
    setLavadoMensual(0);
    setMantenimientoCalculado(false);
    setMantenimientoMensual(0);
    setFondoCalculado(false);
    setFondoReparacionesMensual(0);
    setCreditoCalculado(false);
    setCuotaCreditoMensual(0);
    setIncluirCredito(false);
    setMostrarCalculadoraSoat(false);
    setMostrarCalculadoraImpuesto(false);
    setMostrarCalculadoraCredito(false);
    setPanelAbierto({});
  };

  // Items para la tabla final
  const desgloseItems = [
    {
      categoria: 'Obligatorio',
      concepto: 'SOAT 2026',
      detalle: soatCalculado ? `Pago anual obligatorio (${formatoCOP(soatNum)}/año)` : 'Seguro obligatorio para circular',
      mensual: soatMensual,
      anual: soatNum,
      calculado: soatCalculado,
      tipoDato: 'Tarifa oficial 2026',
    },
    {
      categoria: 'Obligatorio',
      concepto: 'Impuesto Vehicular',
      detalle: impuestoCalculado ? `Liquidación departamental anual (${formatoCOP(impuestoNum)}/año)` : 'Impuesto sobre vehículos automotores',
      mensual: impuestoMensual,
      anual: impuestoNum,
      calculado: impuestoCalculado,
      tipoDato: 'Oficial MinTransporte/Hacienda',
    },
    {
      categoria: 'Obligatorio',
      concepto: 'Revisión Tecnomecánica',
      detalle: tecnoCalculado ? `Inspección obligatoria anual CDA (${formatoCOP(tecnoNum)}/año)` : 'Certificación técnica anual',
      mensual: tecnoMensual,
      anual: tecnoNum,
      calculado: tecnoCalculado,
      tipoDato: 'Referencia oficial CDA',
    },
    {
      categoria: 'Uso',
      concepto: 'Gasolina',
      detalle: gasolinaCalculado ? `${resultadoGasolina.galonesMes} gal/mes @ ${formatoCOP(precioGalonEfectivo)} (${ciudadSeleccionada})` : 'Combustible estimado',
      mensual: gastoGasolinaEfectivo,
      anual: gastoGasolinaAnualEfectivo,
      calculado: gasolinaCalculado,
      tipoDato: 'Estimación oficial CREG',
    },
    {
      categoria: 'Uso',
      concepto: 'Parqueadero',
      detalle: parqueaderoCalculado ? 'Residencial, oficina o comercial' : 'Estacionamiento mensual',
      mensual: parqueaderoNum,
      anual: parqueaderoNum * 12,
      calculado: parqueaderoCalculado,
      tipoDato: 'Valor personalizado',
    },
    {
      categoria: 'Uso',
      concepto: 'Peajes',
      detalle: peajesCalculado ? 'Viajes intermunicipales y salidas' : 'Rutas y peajes',
      mensual: peajesNum,
      anual: peajesNum * 12,
      calculado: peajesCalculado,
      tipoDato: 'Valor personalizado',
    },
    {
      categoria: 'Uso',
      concepto: 'Lavado y Cuidado',
      detalle: lavadoCalculado ? 'Aseo y embellecimiento periódico' : 'Limpieza y estética vehicular',
      mensual: lavadoNum,
      anual: lavadoNum * 12,
      calculado: lavadoCalculado,
      tipoDato: 'Valor personalizado',
    },
    {
      categoria: 'Mantenimiento',
      concepto: 'Mantenimiento Preventivo',
      detalle: mantenimientoCalculado ? 'Cambio de aceite, filtros y fluidos' : 'Rutinas de conservación',
      mensual: mantenimientoNum,
      anual: mantenimientoNum * 12,
      calculado: mantenimientoCalculado,
      tipoDato: 'Presupuesto personalizado',
    },
    {
      categoria: 'Mantenimiento',
      concepto: 'Fondo de Reparaciones',
      detalle: fondoCalculado ? 'Reserva para llantas, batería o imprevistos' : 'Fondo amortiguador mecánico',
      mensual: fondoReparacionesNum,
      anual: fondoReparacionesNum * 12,
      calculado: fondoCalculado,
      tipoDato: 'Presupuesto personalizado',
    },
    ...(incluirCredito && creditoCalculado
      ? [
          {
            categoria: 'Financiación',
            concepto: 'Cuota de Crédito',
            detalle: `Financiación vehicular mensual (${datosCredito?.modalidad || 'Referencia SFC'})`,
            mensual: cuotaCreditoMensual,
            anual: cuotaCreditoMensual * 12,
            calculado: true,
            tipoDato: 'Simulación SFC',
          },
        ]
      : []),
  ];

  return (
    <div className="w-full space-y-10 sm:space-y-12 not-prose text-[#0F1B2B]">

      {/* ==================================================== */}
      {/* BARRA DE PROGRESO DEL FLUJO GUIADO                  */}
      {/* ==================================================== */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white font-mono text-xs font-bold shrink-0">
            {pasosCompletados}/4
          </div>
          <div>
            <span className="text-xs font-bold text-[#0F1B2B] block">
              {pasosCompletados === 0
                ? 'Flujo inicial: 0 de 4 pasos completados'
                : pasosCompletados === 4
                ? '¡Flujo completo! Todos los pasos calculados'
                : `Progreso: ${pasosCompletados} de 4 pasos completados`}
            </span>
            <p className="text-[11px] text-[#64748B]">
              {pasosCompletados === 0
                ? 'Calcula cada paso para obtener la estimación personalizada de tu vehículo.'
                : 'Puedes ajustar o recalcular cualquier valor en cualquier momento.'}
            </p>
          </div>
        </div>

        {pasosCompletados > 0 && (
          <button
            type="button"
            onClick={reiniciarTodo}
            className="text-xs text-[#DC2626] hover:underline font-mono cursor-pointer flex items-center gap-1 self-start sm:self-auto shrink-0"
            title="Borrar valores y volver a comenzar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar a $0</span>
          </button>
        )}
      </div>

      {/* ==================================================== */}
      {/* PASO 1: COSTOS OBLIGATORIOS                          */}
      {/* ==================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white text-xs font-bold font-mono">
              1
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2B]">
              Costos obligatorios
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            Calcula los gastos que normalmente debes asumir para tener el vehículo habilitado.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">

          {/* 1.1 TARJETA SOAT */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 transition-all hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <ShieldCheck className="w-4 h-4 text-[#166534]" />
                  <h4 className="text-base sm:text-lg font-bold text-[#0F1B2B]">SOAT 2026</h4>
                  {!soatCalculado ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Sin calcular
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] font-semibold">
                      Tarifa oficial 2026
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#475569]">
                  Seguro Obligatorio de Accidentes de Tránsito. Pago único anual obligatorio para circular en Colombia.
                </p>
              </div>

              {/* Resultado */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] font-mono text-[#64748B] block">
                  {soatCalculado ? 'Costo anual calculado' : 'Valor inicial'}
                </span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${soatCalculado ? 'text-[#0F1B2B]' : 'text-slate-400'}`}>
                  {soatCalculado ? formatoCOP(soatNum) : '$0'}
                </span>
                {soatCalculado && <span className="text-xs font-mono text-[#64748B] block">/ año</span>}
                {soatCalculado && (
                  <span className="text-[11px] text-[#166534] font-medium block mt-0.5">
                    Para presupuestar cada mes: {formatoCOP(soatMensual)} / mes
                  </span>
                )}
              </div>
            </div>

            {/* Acciones principales */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {!soatCalculado ? (
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraSoat(!mostrarCalculadoraSoat)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold bg-[#0F1B2B] text-white hover:bg-[#1A2B42] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <span>Calcular SOAT</span>
                  <span className="font-mono">→</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setMostrarCalculadoraSoat(!mostrarCalculadoraSoat)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#475569]" />
                    <span>{mostrarCalculadoraSoat ? 'Cerrar calculadora' : 'Modificar cálculo'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarCalculadoraSoat(false);
                      setSoatCalculado(false);
                      setSoatAnual(0);
                    }}
                    className="text-xs text-[#DC2626] hover:underline cursor-pointer py-1 px-2"
                  >
                    Reiniciar a $0
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFuente('soat')}
                className="text-xs font-mono text-[#166534] hover:underline cursor-pointer flex items-center gap-1 py-1"
              >
                <span>¿De dónde salen estos datos?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['soat'] ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Calculadora Oficial Expandida SOAT */}
            {mostrarCalculadoraSoat && (
              <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                <CalculadoraSOAT
                  yaCalculado={soatCalculado}
                  onCerrar={() => setMostrarCalculadoraSoat(false)}
                  onTarifaChange={(precio) => {
                    setSoatAnual(precio);
                    setSoatCalculado(true);
                  }}
                />
              </div>
            )}

            {/* Bloque Metodología y Fuente */}
            {fuenteAbierta['soat'] && (
              <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 font-medium text-[#0F1B2B]">
                  <span>Superintendencia Financiera de Colombia (SFC)</span>
                  <a
                    href="https://www.superfinanciera.gov.co/publicaciones/10114908/soat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#1D4ED8] hover:underline"
                  >
                    <span>Consultar tarifa oficial SFC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  <strong>Normativa:</strong> Circular Externa 022 de 2025. Las tarifas son máximas legales obligatorias fijadas anualmente por el Gobierno Nacional según clase de vehículo, cilindraje y antigüedad, incluyendo el aporte al RUNT y la contribución del 52% a la ADRES.
                </p>
                <p className="text-[11px] text-[#166534]">
                  * El valor mensual mostrado es una referencia obtenida al dividir el costo anual entre 12 para fines presupuestales. El SOAT es un cobro único anual.
                </p>
              </div>
            )}
          </div>

          {/* 1.2 TARJETA IMPUESTO VEHICULAR */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 transition-all hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <Building2 className="w-4 h-4 text-[#0F1B2B]" />
                  <h4 className="text-base sm:text-lg font-bold text-[#0F1B2B]">Impuesto vehicular 2026</h4>
                  {!impuestoCalculado ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Sin calcular
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] font-semibold">
                      Impuesto anual estimado
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#475569]">
                  Obligación tributaria anual sobre la propiedad del vehículo ante la Secretaría de Hacienda.
                </p>
              </div>

              {/* Resultado */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] font-mono text-[#64748B] block">
                  {impuestoCalculado ? 'Impuesto anual estimado' : 'Valor inicial'}
                </span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${impuestoCalculado ? 'text-[#0F1B2B]' : 'text-slate-400'}`}>
                  {impuestoCalculado ? formatoCOP(impuestoNum) : '$0'}
                </span>
                {impuestoCalculado && <span className="text-xs font-mono text-[#64748B] block">/ año</span>}
                {impuestoCalculado && (
                  <span className="text-[11px] text-[#166534] font-medium block mt-0.5">
                    Si quieres presupuestarlo mes a mes: {formatoCOP(impuestoMensual)} / mes
                  </span>
                )}
              </div>
            </div>

            {/* Si ya fue calculado, mostrar métricas oficiales simplificadas */}
            {impuestoCalculado && datosImpuesto?.baseGravable && (
              <div className="mt-4 p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-[#64748B] block">Valor oficial usado para calcular el impuesto:</span>
                  <span className="font-mono font-bold text-[#0F1B2B] text-sm">
                    {formatoCOP(datosImpuesto.baseGravable)}
                  </span>
                  <span className="text-[10px] text-[#64748B] block">
                    (Base gravable oficial, no es el precio comercial)
                  </span>
                </div>
                <div>
                  <span className="text-[#64748B] block">Tarifa aplicada:</span>
                  <span className="font-mono font-bold text-[#166534] text-sm">
                    {datosImpuesto.tarifaTexto || '1,5%'}
                  </span>
                  <span className="text-[10px] text-[#64748B] block">
                    (Definida por el rango fiscal oficial)
                  </span>
                </div>
              </div>
            )}

            {/* Acciones principales */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {!impuestoCalculado ? (
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraImpuesto(!mostrarCalculadoraImpuesto)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold bg-[#0F1B2B] text-white hover:bg-[#1A2B42] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <span>Calcular impuesto</span>
                  <span className="font-mono">→</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setMostrarCalculadoraImpuesto(!mostrarCalculadoraImpuesto)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#475569]" />
                    <span>{mostrarCalculadoraImpuesto ? 'Cerrar calculadora' : 'Modificar cálculo'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMostrarCalculadoraImpuesto(false);
                      setImpuestoCalculado(false);
                      setImpuestoAnual(0);
                      setDatosImpuesto(null);
                    }}
                    className="text-xs text-[#DC2626] hover:underline cursor-pointer py-1 px-2"
                  >
                    Reiniciar a $0
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFuente('impuesto')}
                className="text-xs font-mono text-[#166534] hover:underline cursor-pointer flex items-center gap-1 py-1"
              >
                <span>¿De dónde salen estos datos?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['impuesto'] ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Calculadora Expandida Impuesto */}
            {mostrarCalculadoraImpuesto && (
              <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
                <CalculadoraImpuestoVehicular
                  yaCalculado={impuestoCalculado}
                  onCerrar={() => setMostrarCalculadoraImpuesto(false)}
                  onImpuestoChange={(precio, datos) => {
                    setImpuestoAnual(precio);
                    if (datos) {
                      setDatosImpuesto({
                        baseGravable: datos.baseGravable,
                        tarifaTexto: datos.tarifaTexto,
                        impuestoAnualEstimado: datos.impuestoAnualEstimado,
                        provisionMensual: datos.provisionMensual,
                      });
                    }
                    setImpuestoCalculado(true);
                  }}
                />
              </div>
            )}

            {/* Bloque Metodología y Fuentes */}
            {fuenteAbierta['impuesto'] && (
              <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 font-medium text-[#0F1B2B]">
                  <span>Ministerio de Transporte & Ministerio de Hacienda</span>
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  <strong>Base del vehículo:</strong> Ministerio de Transporte · Resolución 20253040048935.<br />
                  <strong>Tarifas:</strong> Ministerio de Hacienda y Crédito Público · Decreto 1457 de 2025.
                </p>
                <p className="text-[11px] text-[#166534]">
                  * Este valor mensual es una referencia para presupuestarlo entre 12 meses; el impuesto se liquida como obligación anual.
                </p>
              </div>
            )}
          </div>

          {/* 1.3 TARJETA TECNOMECÁNICA */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 transition-all hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <Wrench className="w-4 h-4 text-[#0F1B2B]" />
                  <h4 className="text-base sm:text-lg font-bold text-[#0F1B2B]">Revisión Tecnomecánica</h4>
                  {!tecnoCalculado ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Sin calcular
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] font-semibold">
                      Referencia oficial CDA
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#475569]">
                  Inspección técnica anual obligatoria en Centros de Diagnóstico Automotor (CDA) autorizados.
                </p>
              </div>

              {/* Resultado */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] font-mono text-[#64748B] block">
                  {tecnoCalculado ? 'Costo anual' : 'Valor inicial'}
                </span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${tecnoCalculado ? 'text-[#0F1B2B]' : 'text-slate-400'}`}>
                  {tecnoCalculado ? formatoCOP(tecnoNum) : '$0'}
                </span>
                {tecnoCalculado && <span className="text-xs font-mono text-[#64748B] block">/ año</span>}
                {tecnoCalculado && (
                  <span className="text-[11px] text-[#166534] font-medium block mt-0.5">
                    Para presupuestar cada mes: {formatoCOP(tecnoMensual)} / mes
                  </span>
                )}
              </div>
            </div>

            {/* Acciones principales */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {!tecnoCalculado ? (
                <button
                  type="button"
                  onClick={() => togglePanel('tecnoManual')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold bg-[#0F1B2B] text-white hover:bg-[#1A2B42] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <span>Calcular tecnomecánica</span>
                  <span className="font-mono">→</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => togglePanel('tecnoManual')}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#475569]" />
                    <span>{panelAbierto['tecnoManual'] ? 'Cerrar ajuste' : 'Modificar cálculo'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPanelAbierto((prev) => ({ ...prev, tecnoManual: false }));
                      setTecnoCalculado(false);
                      setTecnoAnual(0);
                    }}
                    className="text-xs text-[#DC2626] hover:underline cursor-pointer py-1 px-2"
                  >
                    Reiniciar a $0
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFuente('tecno')}
                className="text-xs font-mono text-[#166534] hover:underline cursor-pointer flex items-center gap-1 py-1"
              >
                <span>¿De dónde salen estos datos?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['tecno'] ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Ajuste manual de Tecnomecánica */}
            {panelAbierto['tecnoManual'] && (
              <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#0F1B2B]">
                    Define el costo de la revisión tecnomecánica para tu vehículo:
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePanel('tecnoManual')}
                    className="text-xs text-[#64748B] hover:text-[#0F1B2B] px-2 py-1 rounded bg-slate-200/60 hover:bg-slate-200 cursor-pointer font-medium shrink-0"
                  >
                    ✕ Cerrar
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTecnoAnual(320000);
                      setTecnoCalculado(true);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tecnoCalculado && tecnoAnual === 320000
                        ? 'bg-[#F0FDF4] border-2 border-[#166534] text-[#166534] shadow-xs'
                        : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                    }`}
                  >
                    {tecnoCalculado && tecnoAnual === 320000 && '✓ '}Usar tarifa promedio ($320.000 COP)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTecnoAnual(0);
                      setTecnoCalculado(true);
                    }}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tecnoCalculado && tecnoAnual === 0
                        ? 'bg-[#F0FDF4] border-2 border-[#166534] text-[#166534] shadow-xs'
                        : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                    }`}
                  >
                    {tecnoCalculado && tecnoAnual === 0 && '✓ '}No aplica este año ($0 COP)
                  </button>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                  <label className="text-xs text-[#475569]">O escribe el valor exacto cotizado:</label>
                  <div className="relative w-full sm:w-48">
                    <span className="absolute left-3 top-2.5 text-xs font-mono text-[#64748B]">$</span>
                    <input
                      type="text"
                      value={tecnoAnual === '' ? '' : (typeof tecnoAnual === 'number' ? tecnoAnual.toLocaleString('es-CO') : '')}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, '');
                        setTecnoAnual(raw === '' ? '' : parseInt(raw, 10));
                        setTecnoCalculado(true);
                      }}
                      placeholder="320.000"
                      className="w-full h-10 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Metodología y Fuentes */}
            {fuenteAbierta['tecno'] && (
              <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-1.5">
                <div className="font-medium text-[#0F1B2B]">
                  Ministerio de Transporte & Centros de Diagnóstico Automotor (CDA)
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Las tarifas de la revisión tecnomecánica se rigen por rangos oficiales en UVT fijados por el Ministerio de Transporte. Aplica anualmente a partir del quinto o sexto año de matrícula inicial en vehículos particulares.
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* PASO 2: COSTOS DE USO                                */}
      {/* ==================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white text-xs font-bold font-mono">
              2
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2B]">
              Costos de uso
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            Estima cuánto gastarás según el uso que haces del vehículo.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">

          {/* 2.1 TARJETA GASOLINA */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 transition-all hover:border-slate-300">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <Fuel className="w-4 h-4 text-[#0F1B2B]" />
                  <h4 className="text-base sm:text-lg font-bold text-[#0F1B2B]">Gasolina</h4>
                  {!gasolinaCalculado ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Sin calcular
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] font-semibold">
                      Estimación oficial CREG
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#475569]">
                  Calcula el consumo mensual de combustible según tu recorrido y el rendimiento de tu motor.
                </p>
              </div>

              {/* Resultado */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-[11px] font-mono text-[#64748B] block">
                  {gasolinaCalculado ? 'Gasto mensual estimado' : 'Valor inicial'}
                </span>
                <span className={`text-2xl sm:text-3xl font-bold font-mono ${gasolinaCalculado ? 'text-[#0F1B2B]' : 'text-slate-400'}`}>
                  {gasolinaCalculado ? formatoCOP(gastoGasolinaEfectivo) : '$0'}
                </span>
                {gasolinaCalculado && <span className="text-xs font-mono text-[#64748B] block">/ mes</span>}
                {gasolinaCalculado && (
                  <span className="text-[11px] text-[#475569] font-mono block mt-0.5">
                    Equivalente anual: {formatoCOP(gastoGasolinaAnualEfectivo)} / año
                  </span>
                )}
              </div>
            </div>

            {/* Acciones principales */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {!gasolinaCalculado ? (
                <button
                  type="button"
                  onClick={() => togglePanel('gasolinaConfig')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold bg-[#0F1B2B] text-white hover:bg-[#1A2B42] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <span>Calcular gasolina →</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => togglePanel('gasolinaConfig')}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#475569]" />
                    <span>{panelAbierto['gasolinaConfig'] ? 'Cerrar ajuste' : 'Modificar cálculo'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPanelAbierto((prev) => ({ ...prev, gasolinaConfig: false }));
                      setGasolinaCalculado(false);
                    }}
                    className="text-xs text-[#DC2626] hover:underline cursor-pointer py-1 px-2"
                  >
                    Reiniciar a $0
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFuente('gasolina')}
                className="text-xs font-mono text-[#166534] hover:underline cursor-pointer flex items-center gap-1 py-1"
              >
                <span>¿De dónde salen estos datos?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['gasolina'] ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Panel de configuración de Gasolina */}
            {panelAbierto['gasolinaConfig'] && (
              <div className="mt-4 p-4 sm:p-5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2B]">
                    Configura tus hábitos de manejo y ubicación:
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePanel('gasolinaConfig')}
                    className="text-xs text-[#64748B] hover:text-[#0F1B2B] px-2 py-1 rounded bg-slate-200/60 hover:bg-slate-200 cursor-pointer font-medium shrink-0"
                  >
                    ✕ Cerrar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Ciudad CREG */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
                      Ciudad (Tarifa CREG)
                    </label>
                    <select
                      value={ciudadSeleccionada}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === 'OTRA') {
                          setEsCiudadManual(true);
                        } else {
                          setEsCiudadManual(false);
                          setCiudadSeleccionada(v);
                        }
                      }}
                      className="w-full h-11 px-3 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#0F1B2B] cursor-pointer"
                    >
                      {CIUDADES_CREG.map((c) => (
                        <option key={c} value={c}>
                          {c} (CREG oficial)
                        </option>
                      ))}
                      <option value="OTRA">Otra ciudad no listada</option>
                    </select>
                  </div>

                  {/* Kilómetros por mes */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
                      Kilómetros al mes
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={kmMes === '' ? '' : kmMes}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setKmMes(raw === '' ? '' : parseInt(raw, 10));
                        }}
                        placeholder="1.000"
                        className="w-full h-11 px-3 pr-16 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0F1B2B]"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-mono text-[#64748B]">
                        KM/MES
                      </span>
                    </div>
                  </div>

                  {/* Rendimiento */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
                      Rendimiento del carro
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={kmPorGalon === '' ? '' : kmPorGalon}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setKmPorGalon(raw === '' ? '' : parseInt(raw, 10));
                        }}
                        placeholder="40"
                        className="w-full h-11 px-3 pr-16 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0F1B2B]"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-mono text-[#64748B]">
                        KM/GAL
                      </span>
                    </div>
                  </div>
                </div>

                {/* Si seleccionó ciudad manual */}
                {esCiudadManual && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
                        Nombre de tu municipio
                      </label>
                      <input
                        type="text"
                        value={otraCiudad}
                        onChange={(e) => setOtraCiudad(e.target.value)}
                        placeholder="Ej. Tunja, Girardot, Sogamoso..."
                        className="w-full h-11 px-3 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#0F1B2B]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
                        Precio por galón en tu estación
                      </label>
                      <input
                        type="text"
                        value={precioManual === '' ? '' : (typeof precioManual === 'number' ? precioManual.toLocaleString('es-CO') : '')}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setPrecioManual(raw === '' ? '' : parseInt(raw, 10));
                        }}
                        placeholder="16.200"
                        className="w-full h-11 px-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0F1B2B]"
                      />
                    </div>
                  </div>
                )}

                {errorGasolina && (
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-800">
                    {errorGasolina}
                  </div>
                )}

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs text-[#475569]">
                    {cargandoGasolina ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-[#166534]" />
                    )}
                    <span>
                      Precio aplicado:{' '}
                      <strong className="text-[#0F1B2B] font-mono">
                        {formatoCOP(precioGalonEfectivo)} / galón
                      </strong>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setGasolinaCalculado(true);
                      setPanelAbierto((p) => ({ ...p, gasolinaConfig: false }));
                    }}
                    className="px-4 py-2 rounded-lg bg-[#0F1B2B] text-white text-xs font-semibold hover:bg-[#1A2B42] cursor-pointer"
                  >
                    Confirmar y aplicar cálculo de gasolina
                  </button>
                </div>
              </div>
            )}

            {/* Metodología Gasolina */}
            {fuenteAbierta['gasolina'] && (
              <div className="mt-3 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#475569] space-y-1.5">
                <div className="font-medium text-[#0F1B2B]">
                  Comisión de Regulación de Energía y Gas (CREG)
                </div>
                <p className="text-[11px] text-[#64748B] leading-relaxed">
                  Precios de referencia oficiales actualizados mensualmente para las 13 ciudades principales del país.
                </p>
              </div>
            )}
          </div>

          {/* 2.2 GRID DE COSTOS OPERATIVOS: Parqueadero, Peajes, Lavado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Parqueadero */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#0F1B2B]">Parqueadero</h4>
                {!parqueaderoCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] font-semibold">
                    Personalizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#64748B]">
                ¿Cuánto gastas al mes en estacionamiento?
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-[#64748B]">$</span>
                  <input
                    type="text"
                    value={parqueaderoMensual === '' ? '' : (typeof parqueaderoMensual === 'number' ? parqueaderoMensual.toLocaleString('es-CO') : '')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setParqueaderoMensual(raw === '' ? '' : parseInt(raw, 10));
                      setParqueaderoCalculado(true);
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#64748B]">Mensual: {formatoCOP(parqueaderoNum)}</span>
                  {parqueaderoCalculado && (
                    <button
                      type="button"
                      onClick={() => {
                        setParqueaderoCalculado(false);
                        setParqueaderoMensual(0);
                      }}
                      className="text-red-600 hover:underline text-[10px] cursor-pointer"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Peajes */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#0F1B2B]">Peajes</h4>
                {!peajesCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] font-semibold">
                    Personalizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#64748B]">
                Gasto estimado en salidas intermunicipales
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-[#64748B]">$</span>
                  <input
                    type="text"
                    value={peajesMensual === '' ? '' : (typeof peajesMensual === 'number' ? peajesMensual.toLocaleString('es-CO') : '')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setPeajesMensual(raw === '' ? '' : parseInt(raw, 10));
                      setPeajesCalculado(true);
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#64748B]">Mensual: {formatoCOP(peajesNum)}</span>
                  {peajesCalculado && (
                    <button
                      type="button"
                      onClick={() => {
                        setPeajesCalculado(false);
                        setPeajesMensual(0);
                      }}
                      className="text-red-600 hover:underline text-[10px] cursor-pointer"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Lavado y cuidado */}
            <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-[#0F1B2B]">Lavado y cuidado</h4>
                {!lavadoCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] font-semibold">
                    Personalizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#64748B]">
                Limpieza y estética mensual
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-[#64748B]">$</span>
                  <input
                    type="text"
                    value={lavadoMensual === '' ? '' : (typeof lavadoMensual === 'number' ? lavadoMensual.toLocaleString('es-CO') : '')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setLavadoMensual(raw === '' ? '' : parseInt(raw, 10));
                      setLavadoCalculado(true);
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-[#64748B]">Mensual: {formatoCOP(lavadoNum)}</span>
                  {lavadoCalculado && (
                    <button
                      type="button"
                      onClick={() => {
                        setLavadoCalculado(false);
                        setLavadoMensual(0);
                      }}
                      className="text-red-600 hover:underline text-[10px] cursor-pointer"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* PASO 3: MANTENIMIENTO Y REPARACIONES                */}
      {/* ==================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white text-xs font-bold font-mono">
              3
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2B]">
              Mantenimiento y reparaciones
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            Reserva dinero para conservar el vehículo y afrontar gastos inesperados.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* 3.1 Mantenimiento preventivo */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 space-y-3 transition-all hover:border-slate-300">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-[#0F1B2B]">Mantenimiento Preventivo</h4>
              {!mantenimientoCalculado ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  Sin calcular
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] font-semibold">
                  Presupuesto personalizado
                </span>
              )}
            </div>
            <p className="text-xs text-[#475569]">
              Cambio de aceite periódico, filtros de aire/combustible, alineación y balanceo.
            </p>

            <div className="space-y-2 pt-1">
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-mono text-[#64748B]">$</span>
                <input
                  type="text"
                  value={mantenimientoMensual === '' ? '' : (typeof mantenimientoMensual === 'number' ? mantenimientoMensual.toLocaleString('es-CO') : '')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setMantenimientoMensual(raw === '' ? '' : parseInt(raw, 10));
                    setMantenimientoCalculado(true);
                  }}
                  placeholder="0"
                  className="w-full h-11 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMantenimientoMensual(150000);
                    setMantenimientoCalculado(true);
                  }}
                  className="text-[11px] text-[#166534] hover:underline font-medium cursor-pointer"
                >
                  Sugerido: $150.000 / mes
                </button>
                {mantenimientoCalculado && (
                  <button
                    type="button"
                    onClick={() => {
                      setMantenimientoCalculado(false);
                      setMantenimientoMensual(0);
                    }}
                    className="text-[11px] text-red-600 hover:underline cursor-pointer"
                  >
                    Reiniciar a $0
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3.2 Fondo para reparaciones imprevistas */}
          <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 space-y-3 transition-all hover:border-slate-300">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-[#0F1B2B]">Fondo para Reparaciones</h4>
              {!fondoCalculado ? (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  Sin calcular
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] font-semibold">
                  Presupuesto personalizado
                </span>
              )}
            </div>
            <p className="text-xs text-[#475569]">
              Reserva para imprevistos mecánicos: cambio de batería, llantas, pastillas de freno o embrague.
            </p>

            <div className="space-y-2 pt-1">
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-mono text-[#64748B]">$</span>
                <input
                  type="text"
                  value={fondoReparacionesMensual === '' ? '' : (typeof fondoReparacionesMensual === 'number' ? fondoReparacionesMensual.toLocaleString('es-CO') : '')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setFondoReparacionesMensual(raw === '' ? '' : parseInt(raw, 10));
                    setFondoCalculado(true);
                  }}
                  placeholder="0"
                  className="w-full h-11 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFondoReparacionesMensual(120000);
                    setFondoCalculado(true);
                  }}
                  className="text-[11px] text-[#166534] hover:underline font-medium cursor-pointer"
                >
                  Sugerido: $120.000 / mes
                </button>
                {fondoCalculado && (
                  <button
                    type="button"
                    onClick={() => {
                      setFondoCalculado(false);
                      setFondoReparacionesMensual(0);
                    }}
                    className="text-[11px] text-red-600 hover:underline cursor-pointer"
                  >
                    Reiniciar a $0
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* PASO 4: FINANCIACIÓN                                 */}
      {/* ==================================================== */}
      <section className="space-y-4">
        <div className="border-b border-[#E2E8F0] pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#0F1B2B] text-white text-xs font-bold font-mono">
              4
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2B]">
              Financiación
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569]">
            Si vas a financiar la compra, calcula cuánto pagarías por el crédito.
          </p>
        </div>

        <div className="rounded-xl border border-[#E2E8F0] bg-white p-4 sm:p-6 transition-all hover:border-slate-300">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center gap-2 flex-wrap">
                <CreditCard className="w-4 h-4 text-[#0F1B2B]" />
                <h4 className="text-base sm:text-lg font-bold text-[#0F1B2B]">Crédito Vehicular</h4>
                {!creditoCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] border border-[#BBF7D0] font-semibold">
                    Simulación SFC
                  </span>
                )}
              </div>
              <p className="text-xs text-[#475569]">
                Simulación financiera con tasas certificadas por la Superintendencia Financiera de Colombia.
              </p>
            </div>

            {/* Resultado */}
            <div className="text-left sm:text-right shrink-0">
              <span className="text-[11px] font-mono text-[#64748B] block">
                {creditoCalculado ? 'Cuota mensual estimada' : 'Valor inicial'}
              </span>
              <span className={`text-2xl sm:text-3xl font-bold font-mono ${creditoCalculado && incluirCredito ? 'text-[#0F1B2B]' : 'text-slate-400'}`}>
                {creditoCalculado && incluirCredito ? formatoCOP(cuotaCreditoMensual) : '$0'}
              </span>
              {creditoCalculado && incluirCredito && (
                <span className="text-xs font-mono text-[#64748B] block">/ mes</span>
              )}
            </div>
          </div>

          {/* Si ya fue calculado, selector explícito de modalidad (A crédito vs Contado) */}
          {creditoCalculado && (
            <div className="mt-4 p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] space-y-3">
              <span className="text-xs font-bold text-[#0F1B2B] block">
                Modalidad de adquisición del vehículo:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIncluirCredito(true)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    incluirCredito && cuotaCreditoMensual > 0
                      ? 'bg-[#F0FDF4] border-2 border-[#166534] text-[#166534] shadow-xs'
                      : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                  }`}
                >
                  {incluirCredito && cuotaCreditoMensual > 0 && '✓ '}
                  {cuotaCreditoMensual > 0
                    ? `Compra a crédito (${formatoCOP(cuotaCreditoMensual)}/mes)`
                    : 'Compra financiada a crédito'}
                </button>

                <button
                  type="button"
                  onClick={() => setIncluirCredito(false)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                    !incluirCredito || cuotaCreditoMensual === 0
                      ? 'bg-[#F0FDF4] border-2 border-[#166534] text-[#166534] shadow-xs'
                      : 'bg-white border border-[#CBD5E1] text-[#475569] hover:bg-slate-50'
                  }`}
                >
                  {(!incluirCredito || cuotaCreditoMensual === 0) && '✓ '}
                  Compra de contado ($0/mes - Sin deuda)
                </button>
              </div>

              {datosCredito && incluirCredito && cuotaCreditoMensual > 0 ? (
                <p className="text-[11px] text-[#64748B]">
                  Tasa aplicada: <strong>{datosCredito.tasaEA?.toFixed(2)}% E.A.</strong> · Modalidad: {datosCredito.modalidad} · Plazo: <strong>{datosCredito.plazoMeses} meses</strong>
                </p>
              ) : (
                <p className="text-[11px] text-[#64748B]">
                  Al seleccionar compra de contado, no se adiciona ninguna cuota financiera a tu presupuesto mensual de mantenimiento.
                </p>
              )}
            </div>
          )}

          {/* Acciones */}
          <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {!creditoCalculado ? (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraCredito(!mostrarCalculadoraCredito)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-lg text-xs sm:text-sm font-semibold bg-[#0F1B2B] text-white hover:bg-[#1A2B42] active:scale-98 transition-all shadow-xs cursor-pointer"
                >
                  <span>Simular crédito</span>
                  <span className="font-mono">→</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreditoCalculado(true);
                    setCuotaCreditoMensual(0);
                    setIncluirCredito(false);
                    setDatosCredito(null);
                    setMostrarCalculadoraCredito(false);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>Compra de contado ($0)</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraCredito(!mostrarCalculadoraCredito)}
                  className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 min-h-[40px] rounded-lg text-xs font-semibold bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F1B2B] hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#475569]" />
                  <span>{mostrarCalculadoraCredito ? 'Cerrar simulador' : 'Modificar simulación'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMostrarCalculadoraCredito(false);
                    setCreditoCalculado(false);
                    setCuotaCreditoMensual(0);
                    setIncluirCredito(false);
                    setDatosCredito(null);
                  }}
                  className="text-xs text-[#DC2626] hover:underline cursor-pointer py-1 px-2"
                >
                  Reiniciar a $0
                </button>
              </div>
            )}
          </div>

          {/* Simulador Expandido */}
          {mostrarCalculadoraCredito && (
            <div className="mt-4 pt-4 border-t border-[#E2E8F0]">
              <CalculadoraCredito
                onCerrar={() => setMostrarCalculadoraCredito(false)}
                onCuotaMensualChange={(cuota, resultado) => {
                  setCuotaCreditoMensual(cuota);
                  if (resultado) {
                    setDatosCredito({
                      tasaEA: resultado.tasaEA,
                      modalidad: 'Crédito Vehicular',
                      totalIntereses: resultado.totalIntereses,
                      totalPagar: resultado.totalPagado,
                      plazoMeses: resultado.plazoMeses,
                    });
                  }
                  setCreditoCalculado(true);
                  setIncluirCredito(true);
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* ==================================================== */}
      {/* RESUMEN GLOBAL FINAL: MENSUAL PRIMERO               */}
      {/* ==================================================== */}
      <section className="rounded-2xl border border-[#1E293B] bg-[#0F1B2B] text-white p-5 sm:p-8 md:p-10 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1E293B] pb-5">
          <div>
            <span className="text-xs font-mono font-semibold text-[#4ADE80] uppercase tracking-wider block mb-1">
              RESULTADO GLOBAL CONSOLIDADO
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
              ¿Cuánto cuesta mantener este carro?
            </h3>
          </div>

          {/* Indicador de pasos completados */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1E293B] border border-[#334155] text-[#4ADE80] text-xs font-mono font-semibold self-start sm:self-auto">
            <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
            <span>{pasosCompletados} de 4 pasos completados</span>
          </div>
        </div>

        {/* Gran bloque de resultado: MENSUAL PRIMERO Y MÁS GRANDE (HERO) */}
        <div className="py-6 sm:py-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 bg-[#162235] rounded-2xl p-5 sm:p-8 border border-[#1E293B]">
          <div className="space-y-1">
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#94A3B8] block">
              Presupuesto mensual estimado
            </span>
            <div className="flex items-baseline justify-center sm:justify-start gap-2">
              <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono tracking-tight text-[#4ADE80]">
                {formatoCOP(costoTotalMensual)}
              </span>
              <span className="text-lg sm:text-xl font-mono font-bold text-[#4ADE80]">
                / mes
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] pt-1">
              Referencia mensual para presupuestar el costo de tener y operar este vehículo.
            </p>
          </div>

          <div className="sm:text-right pt-4 sm:pt-0 border-t sm:border-t-0 border-[#1E293B] space-y-1">
            <span className="text-xs font-mono text-[#94A3B8] block">
              Costo total anual consolidado
            </span>
            <span className="text-xl sm:text-2xl font-bold font-mono text-white">
              {formatoCOP(costoTotalAnual)}
            </span>
            <span className="text-xs font-mono text-[#94A3B8] block">/ año</span>
          </div>
        </div>

        {/* Desglose detallado */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Desglose detallado de costos
            </h4>
            <span className="text-xs text-[#94A3B8]">
              Valores calculados en tiempo real según tus selecciones
            </span>
          </div>

          {/* Vista Desktop (Tabla con tema oscuro limpio) */}
          <div className="hidden sm:block overflow-x-auto rounded-xl border border-[#1E293B]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#162235] border-b border-[#1E293B] font-mono text-[11px] text-[#94A3B8] uppercase">
                  <th className="py-3 px-4 font-semibold">Concepto</th>
                  <th className="py-3 px-4 font-semibold">Categoría</th>
                  <th className="py-3 px-4 font-semibold">Origen del Dato</th>
                  <th className="py-3 px-4 font-semibold text-right">Mensual</th>
                  <th className="py-3 px-4 font-semibold text-right">Anual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E293B] bg-[#0F1B2B]">
                {desgloseItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#162235]/60 transition-colors">
                    <td className="py-3 px-4">
                      <span className="font-semibold text-white block">{item.concepto}</span>
                      <span className="text-[11px] text-[#94A3B8]">{item.detalle}</span>
                    </td>
                    <td className="py-3 px-4 text-[#94A3B8]">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1E293B] text-[#CBD5E1]">
                        {item.categoria}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {item.calculado ? (
                        <span className="text-[11px] text-[#4ADE80] font-medium">
                          {item.tipoDato}
                        </span>
                      ) : (
                        <span className="text-[11px] text-[#64748B] font-mono">
                          Sin calcular
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-white">
                      {item.calculado ? formatoCOP(item.mensual) : '$0'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#CBD5E1]">
                      {item.calculado ? formatoCOP(item.anual) : '$0'}
                    </td>
                  </tr>
                ))}
                {/* Fila de Totales */}
                <tr className="bg-[#162235] font-bold border-t-2 border-[#334155]">
                  <td className="py-3.5 px-4 text-white text-sm" colSpan={3}>
                    TOTAL ESTIMADO
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-sm text-[#4ADE80]">
                    {formatoCOP(costoTotalMensual)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-sm text-white">
                    {formatoCOP(costoTotalAnual)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Vista Móvil (Tarjetas apiladas con tema oscuro) */}
          <div className="sm:hidden space-y-2.5">
            {desgloseItems.map((item, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-[#1E293B] bg-[#162235] p-3.5 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-xs">{item.concepto}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#CBD5E1]">
                    {item.categoria}
                  </span>
                </div>
                <p className="text-[11px] text-[#94A3B8]">{item.detalle}</p>
                <div className="flex items-center justify-between pt-1 border-t border-[#1E293B] text-xs">
                  <div>
                    <span className="text-[10px] text-[#94A3B8] block">Mensual</span>
                    <span className="font-mono font-bold text-white">
                      {item.calculado ? formatoCOP(item.mensual) : '$0'}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#94A3B8] block">Anual</span>
                    <span className="font-mono text-[#CBD5E1]">
                      {item.calculado ? formatoCOP(item.anual) : '$0'}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Total Móvil */}
            <div className="rounded-xl bg-[#162235] border border-[#334155] text-white p-4 space-y-2 mt-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] block">
                TOTAL CONSOLIDADO
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#94A3B8] block">Presupuesto mensual</span>
                  <span className="text-lg font-mono font-bold text-[#4ADE80]">
                    {formatoCOP(costoTotalMensual)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#94A3B8] block">Total anual</span>
                  <span className="text-lg font-mono font-bold text-white">
                    {formatoCOP(costoTotalAnual)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso de orientación */}
        <div className="p-4 rounded-xl bg-[#162235] border border-[#1E293B] flex items-start gap-3 text-xs text-[#94A3B8] leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-[#94A3B8] shrink-0 mt-0.5" />
          <p>
            <strong className="text-white">Aviso de orientación:</strong> Los cálculos presentados corresponden a estimaciones y referencias promedio según precios oficiales vigentes en Colombia. No constituyen una cotización formal ni sustituyen una inspección técnica o peritaje profesional.
          </p>
        </div>
      </section>
    </div>
  );
};
