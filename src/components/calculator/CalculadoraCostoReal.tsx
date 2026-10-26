'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
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
  FileText,
  Share2,
  Calculator,
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

  const totalObligatoriosAnual = soatNum + tecnoNum + impuestoNum;
  const totalCombustibleAnual = gastoGasolinaAnualEfectivo;
  const totalMantenimientoAnual = mantenimientoNum * 12;
  const totalImprevistosOtrosAnual =
    (fondoReparacionesNum + parqueaderoNum + peajesNum + lavadoNum + cuotaCreditoEfectiva) * 12;

  const pctObligatorios = costoTotalAnual > 0 ? Math.round((totalObligatoriosAnual / costoTotalAnual) * 100) : 0;
  const pctCombustible = costoTotalAnual > 0 ? Math.round((totalCombustibleAnual / costoTotalAnual) * 100) : 0;
  const pctMantenimiento = costoTotalAnual > 0 ? Math.round((totalMantenimientoAnual / costoTotalAnual) * 100) : 0;

  const [copiado, setCopiado] = useState<boolean>(false);

  const handleCompartir = async () => {
    try {
      const url = typeof window !== 'undefined' ? window.location.href : '';
      const texto = `Estimado de Costo de Tenencia en EscaneApp: ${formatoCOP(costoTotalAnual)} / año (${formatoCOP(costoTotalMensual)} / mes). ${url}`;
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleImprimir = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
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

  const renderResumenCard = (isMobile: boolean = false) => (
    <div
      className={`rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-slate-800 space-y-5 bg-[#0F172A] ${
        isMobile ? 'block lg:hidden mb-8 print:hidden' : 'hidden lg:block print:hidden'
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold">
          GASTO ESTIMADO DE TU CARRO
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Tarifas 2026
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-xs text-slate-400 font-medium block">Presupuesto mensual aproximado:</span>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl sm:text-5xl font-black font-mono tracking-tight text-white">
            {costoTotalMensual > 0 ? formatoCOP(costoTotalMensual) : '$0'}
          </span>
          <span className="text-base sm:text-lg font-mono font-bold text-slate-400">
            / mes
          </span>
        </div>
        <span className="text-xs text-slate-400 font-mono block pt-1">
          Gasto total estimado al año: <strong className="text-white">{costoTotalAnual > 0 ? formatoCOP(costoTotalAnual) : '$0'}</strong> / año
        </span>
      </div>

      <div className="border-t border-slate-800 pt-4 space-y-2.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
          ¿EN QUÉ SE VA LA PLATA?
        </span>
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">1. Papeles obligatorios (SOAT, impuesto, tecno)</span>
            <span className="font-mono font-bold text-white">
              {formatoCOP(totalObligatoriosAnual)} ({pctObligatorios}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${pctObligatorios}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300">2. Gasolina del mes</span>
            <span className="font-mono font-bold text-white">
              {formatoCOP(totalCombustibleAnual)} ({pctCombustible}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${pctCombustible}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300">3. Mantenimiento preventivo (aceite y filtros)</span>
            <span className="font-mono font-bold text-white">
              {formatoCOP(totalMantenimientoAnual)} ({pctMantenimiento}%)
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${pctMantenimiento}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-slate-300">4. Imprevistos, parqueadero y crédito</span>
            <span className="font-mono font-bold text-white">
              {formatoCOP(totalImprevistosOtrosAnual)}
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-4 space-y-2.5">
        <button
          type="button"
          onClick={handleImprimir}
          className="w-full h-12 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          <FileText className="w-4 h-4 text-slate-900" />
          <span>Descargar o imprimir reporte PDF</span>
        </button>

        <button
          type="button"
          onClick={handleCompartir}
          className="w-full h-11 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          {copiado ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-slate-400" />}
          <span>{copiado ? '¡Cálculo copiado!' : 'Compartir este cálculo'}</span>
        </button>

        <p className="text-[10px] text-slate-400 leading-relaxed pt-1 text-center sm:text-left">
          Cálculos con precios y leyes oficiales en Colombia. Te ayuda a saber si el carro se ajusta a tu presupuesto antes de comprarlo.
        </p>
      </div>
    </div>
  );


  //   </div>
  // );

  return (
    <div className="w-full space-y-8 not-prose text-[#17212B]">
      {/* Resumen Móvil (Visible temprano solo en móviles) */}
      {renderResumenCard(true)}

      {/* ==================================================== */}
      {/* BARRA DE PROGRESO DEL FLUJO GUIADO                  */}
      {/* ==================================================== */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4 print:hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#0F172A] text-white font-mono text-xs font-bold shrink-0">
                  {pasosCompletados}/4
                </div>
                <div>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 block">
                    {pasosCompletados === 0
                      ? 'Calcula los 4 pasos para ver el costo total de tu carro'
                      : pasosCompletados === 4
                      ? '¡Listo! Ya tienes el presupuesto completo de tu carro'
                      : `Llevas ${pasosCompletados} de 4 pasos calculados`}
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-500">
                    {pasosCompletados === 0
                      ? 'Completa cada sección para descubrir cuánto te costará tener el carro cada mes.'
                      : 'Puedes cambiar cualquier número cuando quieras para ver cómo cambia tu cuota mensual.'}
                  </p>
                </div>
              </div>

              {pasosCompletados > 0 && (
                <button
                  type="button"
                  onClick={reiniciarTodo}
                  className="text-xs text-rose-600 hover:underline font-mono cursor-pointer flex items-center gap-1 self-start sm:self-auto shrink-0 font-semibold"
                  title="Borrar valores y volver a comenzar"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Empezar de cero</span>
                </button>
              )}
            </div>

            {/* Stepper de 4 Pasos con barras indicadoras */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`font-semibold ${paso1Completado ? 'text-slate-900' : 'text-slate-400'}`}>
                    1. Papeles obligatorios
                  </span>
                  {paso1Completado && <Check className="w-3 h-3 text-emerald-600" />}
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      paso1Completado ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`font-semibold ${paso2Completado ? 'text-slate-900' : 'text-slate-400'}`}>
                    2. Gasolina y uso
                  </span>
                  {paso2Completado && <Check className="w-3 h-3 text-emerald-600" />}
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      paso2Completado ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`font-semibold ${paso3Completado ? 'text-slate-900' : 'text-slate-400'}`}>
                    3. Mantenimiento
                  </span>
                  {paso3Completado && <Check className="w-3 h-3 text-emerald-600" />}
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      paso3Completado ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`font-semibold ${paso4Completado ? 'text-slate-900' : 'text-slate-400'}`}>
                    4. Resumen total
                  </span>
                  {paso4Completado && <Check className="w-3 h-3 text-emerald-600" />}
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      paso4Completado ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

      {/* Grid Principal: 2 Columnas en Desktop (Aprox 65-70% y 30-35%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Columna Principal Izquierda (65-70%) */}
        <div className="lg:col-span-8 space-y-8 print:col-span-12 print:w-full">
          {/* Pasos interactivos 1 a 4 (ocultos en impresión) */}
          <div className="space-y-8 print:hidden">
          {/* ==================================================== */}
          {/* PASO 1: COSTOS OBLIGATORIOS                          */}
          {/* ==================================================== */}
          <section className="space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <div className="flex items-center gap-2.5 mb-1">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white text-xs font-bold font-mono">
                  1
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  1. Papeles obligatorios para rodar
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Los 3 pagos obligatorios que exige la ley en Colombia para que el carro pueda circular sin que te lo inmovilicen.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">

              {/* 1.1 TARJETA SOAT */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-md">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">SOAT 2026</h4>
                      {!soatCalculado ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                          Sin calcular
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          Tarifa oficial 2026
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Seguro obligatorio para accidentes. Se paga una sola vez al año. Cubre la atención médica de todas las personas involucradas si ocurriera un choque.
                    </p>
                  </div>

                  {/* Resultado */}
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                      {soatCalculado ? 'Costo anual del SOAT' : 'Valor inicial'}
                    </span>
                    <span className={`text-2xl sm:text-3xl font-black font-mono ${soatCalculado ? 'text-slate-900' : 'text-slate-400'}`}>
                      {soatCalculado ? formatoCOP(soatNum) : '$0'}
                    </span>
                    {soatCalculado && <span className="text-xs font-mono text-slate-500 block">/ año</span>}
                    {soatCalculado && (
                      <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                        Para ahorrar mes a mes: {formatoCOP(soatMensual)} / mes
                      </span>
                    )}
                  </div>
                </div>

                {/* Acciones principales */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  {!soatCalculado ? (
                    <button
                      type="button"
                      onClick={() => setMostrarCalculadoraSoat(!mostrarCalculadoraSoat)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Calcular SOAT</span>
                      <span className="font-mono">→</span>
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => setMostrarCalculadoraSoat(!mostrarCalculadoraSoat)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                        <span>{mostrarCalculadoraSoat ? 'Cerrar calculadora' : 'Modificar cálculo'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setMostrarCalculadoraSoat(false);
                          setSoatCalculado(false);
                          setSoatAnual(0);
                        }}
                        className="text-xs text-rose-600 hover:underline cursor-pointer py-1 px-2 font-semibold"
                      >
                        Reiniciar a $0
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleFuente('soat')}
                    className="text-xs font-mono text-slate-700 hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1 py-1 font-semibold"
                  >
                    <span>¿De dónde salen estos datos?</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['soat'] ? 'rotate-180' : ''}`} />
                  </button>
                </div>

            {/* Calculadora Oficial Expandida SOAT */}
            {mostrarCalculadoraSoat && (
              <div className="mt-4 pt-4 border-t border-slate-200">
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
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 font-medium text-slate-900">
                  <span>Superintendencia Financiera de Colombia (SFC)</span>
                  <a
                    href="https://www.superfinanciera.gov.co/publicaciones/10114908/soat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-700 hover:underline"
                  >
                    <span>Consultar tarifas oficiales SFC</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Las tarifas del SOAT las fija por ley el Gobierno Nacional cada año según el tipo de carro, cilindraje y modelo. Incluye la atención médica de urgencias en clínicas y hospitales.
                </p>
                <p className="text-[11px] text-emerald-800">
                  * El valor mensual mostrado es para que puedas ahorrar mes a mes; el SOAT se paga completo una sola vez al año.
                </p>
              </div>
            )}
          </div>

          {/* 1.2 TARJETA IMPUESTO VEHICULAR */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Impuesto vehicular 2026</h4>
                  {!impuestoCalculado ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Sin calcular
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                      Impuesto anual estimado
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Impuesto obligatorio sobre el carro. Se paga una sola vez al año a la gobernación o alcaldía donde esté matriculada la placa.
                </p>
              </div>

              {/* Resultado */}
              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                  {impuestoCalculado ? 'Impuesto anual estimado' : 'Valor inicial'}
                </span>
                <span className={`text-2xl sm:text-3xl font-black font-mono ${impuestoCalculado ? 'text-slate-900' : 'text-slate-400'}`}>
                  {impuestoCalculado ? formatoCOP(impuestoNum) : '$0'}
                </span>
                {impuestoCalculado && <span className="text-xs font-mono text-slate-500 block">/ año</span>}
                {impuestoCalculado && (
                  <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                    Para ahorrar mes a mes: {formatoCOP(impuestoMensual)} / mes
                  </span>
                )}
              </div>
            </div>

            {/* Si ya fue calculado, mostrar métricas oficiales simplificadas */}
            {impuestoCalculado && datosImpuesto?.baseGravable && (
              <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Avalúo oficial del gobierno:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">
                    {formatoCOP(datosImpuesto.baseGravable)}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    (Valor que fija el MinTransporte, no es el precio comercial)
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Porcentaje de impuesto:</span>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    {datosImpuesto.tarifaTexto || '1,5%'}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    (Tarifa oficial según el valor del vehículo)
                  </span>
                </div>
              </div>
            )}

            {/* Acciones principales */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {!impuestoCalculado ? (
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraImpuesto(!mostrarCalculadoraImpuesto)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <span>Calcular impuesto</span>
                  <span className="font-mono">→</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setMostrarCalculadoraImpuesto(!mostrarCalculadoraImpuesto)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
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
                    className="text-xs text-rose-600 hover:underline cursor-pointer py-1 px-2 font-semibold"
                  >
                    Reiniciar a $0
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFuente('impuesto')}
                className="text-xs font-mono text-slate-700 hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1 py-1 font-semibold"
              >
                <span>¿De dónde salen estos datos?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['impuesto'] ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Calculadora Expandida Impuesto */}
            {mostrarCalculadoraImpuesto && (
              <div className="mt-4 pt-4 border-t border-slate-200">
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
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 font-bold text-slate-900">
                  <span>Ministerio de Transporte & Ministerio de Hacienda</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  <strong>Avalúo oficial:</strong> Ministerio de Transporte · Resolución vigente.<br />
                  <strong>Porcentajes:</strong> Ministerio de Hacienda y Crédito Público · Decreto reglamentario.
                </p>
                <p className="text-[11px] text-emerald-800">
                  * Este valor mensual es una guía para ayudarte a guardar dinero cada mes; el impuesto se cancela en un solo pago al año.
                </p>
              </div>
            )}
          </div>

              {/* 1.3 TARJETA TECNOMECÁNICA */}
              <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1.5 max-w-md">
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <h4 className="text-base sm:text-lg font-black text-slate-900">Revisión Técnico-Mecánica (CDA)</h4>
                      {!tecnoCalculado ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                          Sin calcular
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                          Referencia CDA 2026
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Revisión técnica anual obligatoria en un Centro de Diagnóstico Automotor (CDA) para carros particulares con más de 5 años. Verifican frenos, llantas, luces y gases contaminantes.
                    </p>
                  </div>

                  {/* Resultado */}
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                      {tecnoCalculado ? 'Costo anual' : 'Valor inicial'}
                    </span>
                    <span className={`text-2xl sm:text-3xl font-black font-mono ${tecnoCalculado ? 'text-slate-900' : 'text-slate-400'}`}>
                      {tecnoCalculado ? formatoCOP(tecnoNum) : '$0'}
                    </span>
                    {tecnoCalculado && <span className="text-xs font-mono text-slate-500 block">/ año</span>}
                    {tecnoCalculado && (
                      <span className="text-[11px] text-emerald-700 font-bold block mt-0.5">
                        Para ahorrar mes a mes: {formatoCOP(tecnoMensual)} / mes
                      </span>
                    )}
                  </div>
                </div>

                {/* Acciones principales */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  {!tecnoCalculado ? (
                    <button
                      type="button"
                      onClick={() => togglePanel('tecnoManual')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs cursor-pointer"
                    >
                      <span>Calcular tecnomecánica</span>
                      <span className="font-mono">→</span>
                    </button>
                  ) : (
                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                      <button
                        type="button"
                        onClick={() => togglePanel('tecnoManual')}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                      >
                        <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                        <span>{panelAbierto['tecnoManual'] ? 'Cerrar ajuste' : 'Modificar cálculo'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setPanelAbierto((prev) => ({ ...prev, tecnoManual: false }));
                          setTecnoCalculado(false);
                          setTecnoAnual(0);
                        }}
                        className="text-xs text-rose-600 hover:underline cursor-pointer py-1 px-2 font-semibold"
                      >
                        Reiniciar a $0
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleFuente('tecno')}
                    className="text-xs font-mono text-slate-700 hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1 py-1 font-semibold"
                  >
                    <span>¿De dónde salen estos datos?</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['tecno'] ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Ajuste manual de Tecnomecánica */}
                {panelAbierto['tecnoManual'] && (
                  <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        Elige si tu carro debe pagar tecnomecánica este año:
                      </span>
                      <button
                        type="button"
                        onClick={() => togglePanel('tecnoManual')}
                        className="text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-slate-200/60 hover:bg-slate-200 cursor-pointer font-bold shrink-0"
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
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          tecnoCalculado && tecnoAnual === 320000
                            ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-800 shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tecnoCalculado && tecnoAnual === 320000 && '✓ '}Tarifa promedio CDA ($320.000 COP)
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTecnoAnual(0);
                          setTecnoCalculado(true);
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                          tecnoCalculado && tecnoAnual === 0
                            ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-800 shadow-xs'
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {tecnoCalculado && tecnoAnual === 0 && '✓ '}Aún no le toca este año ($0 COP)
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-2">
                      <label className="text-xs text-slate-600">O escribe el valor exacto cotizado:</label>
                      <div className="relative w-full sm:w-48">
                        <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">$</span>
                        <input
                          type="text"
                          value={tecnoAnual === '' ? '' : (typeof tecnoAnual === 'number' ? tecnoAnual.toLocaleString('es-CO') : '')}
                          onChange={(e) => {
                            const raw = e.target.value.replace(/\D/g, '');
                            setTecnoAnual(raw === '' ? '' : parseInt(raw, 10));
                            setTecnoCalculado(true);
                          }}
                          placeholder="320.000"
                          className="w-full h-11 pl-7 pr-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Metodología y Fuentes */}
                {fuenteAbierta['tecno'] && (
                  <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                    <div className="font-bold text-slate-900">
                      Ministerio de Transporte & Centros de Diagnóstico Automotor (CDA)
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Las tarifas de la revisión tecnomecánica las regula el Ministerio de Transporte. Aplica cada año a partir del quinto año desde la matrícula inicial del carro.
                    </p>
                  </div>
                )}
              </div>
            </div>
      </section>

      {/* ==================================================== */}
      {/* PASO 2: COSTOS DE USO / COMBUSTIBLE                  */}
      {/* ==================================================== */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white text-xs font-bold font-mono">
              2
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              2. Gasolina y gastos del día a día
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Calcula cuánto gastarás al mes según los kilómetros que andes, parqueadero y peajes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">

          {/* 2.1 TARJETA GASOLINA */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-1.5 max-w-md">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
                    <Fuel className="w-4 h-4 text-blue-700" />
                  </div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">Gasto en gasolina</h4>
                  {!gasolinaCalculado ? (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 font-semibold">
                      Sin calcular
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-700" />
                      Precio oficial CREG
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Calcula el valor de la tanqueada mensual según los kilómetros que recorres y qué tan económico es el motor.
                </p>
              </div>

              {/* Resultado */}
              <div className="text-left sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                  {gasolinaCalculado ? 'Gasto de gasolina al mes' : 'Valor inicial'}
                </span>
                <span className={`text-2xl sm:text-3xl font-black font-mono ${gasolinaCalculado ? 'text-slate-900' : 'text-slate-400'}`}>
                  {gasolinaCalculado ? formatoCOP(gastoGasolinaEfectivo) : '$0'}
                </span>
                {gasolinaCalculado && <span className="text-xs font-mono text-slate-500 block">/ mes</span>}
                {gasolinaCalculado && (
                  <span className="text-[11px] text-slate-500 font-mono block mt-0.5">
                    Gasto al año: {formatoCOP(gastoGasolinaAnualEfectivo)} / año
                  </span>
                )}
              </div>
            </div>

            {/* Acciones principales */}
            <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              {!gasolinaCalculado ? (
                <button
                  type="button"
                  onClick={() => togglePanel('gasolinaConfig')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs cursor-pointer"
                >
                  <span>Calcular gasolina →</span>
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => togglePanel('gasolinaConfig')}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
                    <span>{panelAbierto['gasolinaConfig'] ? 'Cerrar ajuste' : 'Modificar cálculo'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPanelAbierto((prev) => ({ ...prev, gasolinaConfig: false }));
                      setGasolinaCalculado(false);
                    }}
                    className="text-xs text-rose-600 hover:underline cursor-pointer py-1 px-2 font-semibold"
                  >
                    Reiniciar a $0
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => toggleFuente('gasolina')}
                className="text-xs font-mono text-slate-700 hover:text-slate-900 hover:underline cursor-pointer flex items-center gap-1 py-1 font-semibold"
              >
                <span>¿De dónde salen estos datos?</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${fuenteAbierta['gasolina'] ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Panel de configuración de Gasolina */}
            {panelAbierto['gasolinaConfig'] && (
              <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900">
                    Escribe tus recorridos y tu ciudad:
                  </span>
                  <button
                    type="button"
                    onClick={() => togglePanel('gasolinaConfig')}
                    className="text-xs text-slate-500 hover:text-slate-900 px-2.5 py-1 rounded-lg bg-slate-200/70 hover:bg-slate-200 cursor-pointer font-bold shrink-0"
                  >
                    ✕ Cerrar
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {/* Ciudad CREG */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      Ciudad donde andas
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
                      className="w-full h-11 px-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 font-medium cursor-pointer focus:outline-none focus:border-slate-900"
                    >
                      {CIUDADES_CREG.map((c) => (
                        <option key={c} value={c}>
                          {c} (Tarifa oficial CREG)
                        </option>
                      ))}
                      <option value="OTRA">Otra ciudad o municipio</option>
                    </select>
                  </div>

                  {/* Kilómetros por mes */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      Kilómetros que andas al mes
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
                        className="w-full h-11 px-3 pr-16 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-mono text-slate-400 font-bold">
                        KM / MES
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">Ej. 1.000 km = casa al trabajo</span>
                  </div>

                  {/* Rendimiento */}
                  <div>
                    <label className="block text-xs font-bold text-slate-900 mb-1.5">
                      ¿Cuántos km rinde por galón?
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
                        className="w-full h-11 px-3 pr-16 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                      />
                      <span className="absolute right-3 top-3 text-[10px] font-mono text-slate-400 font-bold">
                        KM / GAL
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">Ej. 40 km/gal = carro estándar</span>
                  </div>
                </div>

                {/* Si seleccionó ciudad manual */}
                {esCiudadManual && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">
                        Nombre de tu ciudad o municipio
                      </label>
                      <input
                        type="text"
                        value={otraCiudad}
                        onChange={(e) => setOtraCiudad(e.target.value)}
                        placeholder="Ej. Tunja, Girardot, Sogamoso..."
                        className="w-full h-11 px-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-900 mb-1.5">
                        Precio por galón en tu bomba de gasolina
                      </label>
                      <input
                        type="text"
                        value={precioManual === '' ? '' : (typeof precioManual === 'number' ? precioManual.toLocaleString('es-CO') : '')}
                        onChange={(e) => {
                          const raw = e.target.value.replace(/\D/g, '');
                          setPrecioManual(raw === '' ? '' : parseInt(raw, 10));
                        }}
                        placeholder="16.200"
                        className="w-full h-11 px-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                      />
                    </div>
                  </div>
                )}

                {errorGasolina && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800">
                    {errorGasolina}
                  </div>
                )}

                {/* Banner de confirmación con precio CREG aplicado */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-2 text-xs text-slate-800">
                    {cargandoGasolina ? (
                      <RefreshCw className="w-4 h-4 animate-spin text-emerald-700" />
                    ) : (
                      <Fuel className="w-4 h-4 text-emerald-700" />
                    )}
                    <span>
                      Precio aplicado:{' '}
                      <strong className="text-slate-900 font-mono font-bold">
                        {formatoCOP(precioGalonEfectivo)} / galón
                      </strong>
                      <span className="text-slate-500 ml-1">
                        ({esCiudadManual ? (otraCiudad || 'Personalizado') : `${ciudadSeleccionada} CREG`})
                      </span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setGasolinaCalculado(true);
                      setPanelAbierto((p) => ({ ...p, gasolinaConfig: false }));
                    }}
                    className="px-5 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold shadow-xs cursor-pointer transition-colors"
                  >
                    Confirmar gasto de gasolina ✓
                  </button>
                </div>
              </div>
            )}

            {/* Metodología Gasolina */}
            {fuenteAbierta['gasolina'] && (
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="font-bold text-slate-900">
                  Comisión de Regulación de Energía y Gas (CREG)
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Precios de referencia oficiales actualizados cada mes por el Gobierno Nacional para las ciudades principales de Colombia.
                </p>
              </div>
            )}
          </div>

          {/* 2.2 GRID DE COSTOS OPERATIVOS: Parqueadero, Peajes, Lavado */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* Parqueadero */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">Parqueadero</h4>
                {!parqueaderoCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                    Personalizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                ¿Pagas parqueadero en la casa o el trabajo al mes?
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-slate-400 font-bold">$</span>
                  <input
                    type="text"
                    value={parqueaderoMensual === '' ? '' : (typeof parqueaderoMensual === 'number' ? parqueaderoMensual.toLocaleString('es-CO') : '')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setParqueaderoMensual(raw === '' ? '' : parseInt(raw, 10));
                      setParqueaderoCalculado(true);
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500 font-mono font-medium">Mensual: {formatoCOP(parqueaderoNum)}</span>
                  {parqueaderoCalculado && (
                    <button
                      type="button"
                      onClick={() => {
                        setParqueaderoCalculado(false);
                        setParqueaderoMensual(0);
                      }}
                      className="text-rose-600 hover:underline text-[10px] cursor-pointer font-medium"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Peajes */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">Peajes</h4>
                {!peajesCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                    Personalizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                ¿Viajas por carretera o pagas peajes en el mes?
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-slate-400 font-bold">$</span>
                  <input
                    type="text"
                    value={peajesMensual === '' ? '' : (typeof peajesMensual === 'number' ? peajesMensual.toLocaleString('es-CO') : '')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setPeajesMensual(raw === '' ? '' : parseInt(raw, 10));
                      setPeajesCalculado(true);
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500 font-mono font-medium">Mensual: {formatoCOP(peajesNum)}</span>
                  {peajesCalculado && (
                    <button
                      type="button"
                      onClick={() => {
                        setPeajesCalculado(false);
                        setPeajesMensual(0);
                      }}
                      className="text-rose-600 hover:underline text-[10px] cursor-pointer font-medium"
                    >
                      Quitar
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Lavado y cuidado */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 space-y-3 hover:border-slate-300 transition-colors shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-slate-900">Lavada del carro</h4>
                {!lavadoCalculado ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                    Personalizado
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500">
                ¿Cuánto gastas al mes en lavadas y aseo?
              </p>

              <div className="space-y-2">
                <div className="relative">
                  <span className="absolute left-3 top-3 text-xs font-mono text-slate-400 font-bold">$</span>
                  <input
                    type="text"
                    value={lavadoMensual === '' ? '' : (typeof lavadoMensual === 'number' ? lavadoMensual.toLocaleString('es-CO') : '')}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, '');
                      setLavadoMensual(raw === '' ? '' : parseInt(raw, 10));
                      setLavadoCalculado(true);
                    }}
                    placeholder="0"
                    className="w-full h-11 pl-7 pr-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-slate-500 font-mono font-medium">Mensual: {formatoCOP(lavadoNum)}</span>
                  {lavadoCalculado && (
                    <button
                      type="button"
                      onClick={() => {
                        setLavadoCalculado(false);
                        setLavadoMensual(0);
                      }}
                      className="text-rose-600 hover:underline text-[10px] cursor-pointer font-medium"
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
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white text-xs font-bold font-mono">
              3
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              3. Mantenimiento y fondo para emergencias
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Ahorra una cuota mensual para cambios de aceite y para cuando toque cambiar llantas, batería o frenos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* 3.1 Mantenimiento preventivo */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-3 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-slate-900">Mantenimiento preventivo</h4>
              {!mantenimientoCalculado ? (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                  Sin calcular
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                  Ahorro mensual
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cambio de aceite y filtros de motor, alineación y balanceo. Hacerlo a tiempo evita daños gravísimos en el motor.
            </p>

            <div className="space-y-2 pt-1">
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-mono text-slate-400 font-bold">$</span>
                <input
                  type="text"
                  value={mantenimientoMensual === '' ? '' : (typeof mantenimientoMensual === 'number' ? mantenimientoMensual.toLocaleString('es-CO') : '')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setMantenimientoMensual(raw === '' ? '' : parseInt(raw, 10));
                    setMantenimientoCalculado(true);
                  }}
                  placeholder="0"
                  className="w-full h-11 pl-7 pr-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setMantenimientoMensual(150000);
                    setMantenimientoCalculado(true);
                  }}
                  className="text-[11px] text-emerald-700 hover:underline font-bold cursor-pointer"
                >
                  Ahorro recomendado: $150.000 / mes
                </button>
                {mantenimientoCalculado && (
                  <button
                    type="button"
                    onClick={() => {
                      setMantenimientoCalculado(false);
                      setMantenimientoMensual(0);
                    }}
                    className="text-[11px] text-rose-600 hover:underline cursor-pointer font-medium"
                  >
                    Reiniciar a $0
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 3.2 Fondo para reparaciones imprevistas */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 space-y-3 transition-all hover:border-slate-300 shadow-xs">
            <div className="flex items-center justify-between gap-2">
              <h4 className="text-base font-bold text-slate-900">Ahorro para imprevistos mecánicos</h4>
              {!fondoCalculado ? (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-semibold">
                  Sin calcular
                </span>
              ) : (
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                  Fondo de reserva
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Plata guardada para cuando toque cambiar llantas, batería nueva, pastillas de frenos o arreglos sorpresa.
            </p>

            <div className="space-y-2 pt-1">
              <div className="relative">
                <span className="absolute left-3 top-3 text-xs font-mono text-slate-400 font-bold">$</span>
                <input
                  type="text"
                  value={fondoReparacionesMensual === '' ? '' : (typeof fondoReparacionesMensual === 'number' ? fondoReparacionesMensual.toLocaleString('es-CO') : '')}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, '');
                    setFondoReparacionesMensual(raw === '' ? '' : parseInt(raw, 10));
                    setFondoCalculado(true);
                  }}
                  placeholder="0"
                  className="w-full h-11 pl-7 pr-3 rounded-xl bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setFondoReparacionesMensual(120000);
                    setFondoCalculado(true);
                  }}
                  className="text-[11px] text-emerald-700 hover:underline font-bold cursor-pointer"
                >
                  Ahorro recomendado: $120.000 / mes
                </button>
                {fondoCalculado && (
                  <button
                    type="button"
                    onClick={() => {
                      setFondoCalculado(false);
                      setFondoReparacionesMensual(0);
                    }}
                    className="text-[11px] text-rose-600 hover:underline cursor-pointer font-medium"
                  >
                    Reiniciar a $0
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Subtotal Mantenimiento & Imprevistos */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-900" />
            <span className="text-xs font-bold text-slate-900">
              Total mantenimiento y emergencias:
            </span>
            <span className="text-sm font-mono font-bold text-slate-900">
              {formatoCOP(mantenimientoNum + fondoReparacionesNum)} / mes
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            Ahorro al año: {formatoCOP((mantenimientoNum + fondoReparacionesNum) * 12)} / año
          </span>
        </div>
      </section>

      {/* ==================================================== */}
      {/* PASO 4: FINANCIACIÓN                                 */}
      {/* ==================================================== */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#0F172A] text-white text-xs font-bold font-mono">
              4
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              4. ¿Lo vas a pagar de contado o con crédito?
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500">
            Si vas a pedir un préstamo al banco, calcula la cuota mensual. Si lo compras de contado en efectivo, déjalo en $0.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 transition-all hover:border-slate-300 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5 max-w-md">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <CreditCard className="w-4 h-4 text-emerald-700" />
                </div>
                <h4 className="text-base sm:text-lg font-black text-slate-900">Crédito para el carro</h4>
                {!creditoCalculado ? (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200 font-semibold">
                    Sin calcular
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1">
                    <Check className="w-3 h-3 text-emerald-700" />
                    Simulación con bancos
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Calcula la cuota mensual fija usando las tasas promedio certificadas por la Superfinanciera.
              </p>
            </div>

            {/* Resultado */}
            <div className="text-left sm:text-right shrink-0 bg-slate-50 sm:bg-transparent p-3 sm:p-0 rounded-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                {creditoCalculado ? 'Cuota mensual del crédito' : 'Valor inicial'}
              </span>
              <span className={`text-2xl sm:text-3xl font-black font-mono ${creditoCalculado && incluirCredito ? 'text-slate-900' : 'text-slate-400'}`}>
                {creditoCalculado && incluirCredito ? formatoCOP(cuotaCreditoMensual) : '$0'}
              </span>
              {creditoCalculado && incluirCredito && (
                <span className="text-xs font-mono text-slate-500 block">/ mes</span>
              )}
            </div>
          </div>

          {/* Si ya fue calculado, selector explícito de modalidad (A crédito vs Contado) */}
          {creditoCalculado && (
            <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-900 block">
                ¿Cómo vas a pagar el carro?
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setIncluirCredito(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    incluirCredito && cuotaCreditoMensual > 0
                      ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-800 shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {incluirCredito && cuotaCreditoMensual > 0 && '✓ '}
                  {cuotaCreditoMensual > 0
                    ? `Compra con crédito (${formatoCOP(cuotaCreditoMensual)}/mes)`
                    : 'Compra con crédito bancario'}
                </button>

                <button
                  type="button"
                  onClick={() => setIncluirCredito(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    !incluirCredito || cuotaCreditoMensual === 0
                      ? 'bg-emerald-50 border-2 border-emerald-600 text-emerald-800 shadow-xs'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {(!incluirCredito || cuotaCreditoMensual === 0) && '✓ '}
                  Compra de contado en efectivo ($0 al mes - Sin deuda)
                </button>
              </div>

              {datosCredito && incluirCredito && cuotaCreditoMensual > 0 ? (
                <p className="text-[11px] text-slate-500">
                  Tasa aplicada: <strong>{datosCredito.tasaEA?.toFixed(2)}% E.A.</strong> · Plazo: <strong>{datosCredito.plazoMeses} meses</strong>
                </p>
              ) : (
                <p className="text-[11px] text-slate-500">
                  Al elegir compra de contado, no se suma ninguna deuda a tu presupuesto mensual.
                </p>
              )}
            </div>
          )}

          {/* Acciones */}
          <div className="mt-5 pt-3.5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            {!creditoCalculado ? (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraCredito(!mostrarCalculadoraCredito)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] rounded-xl text-xs sm:text-sm font-bold bg-[#0F172A] text-white hover:bg-slate-800 active:scale-95 transition-all shadow-xs cursor-pointer"
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
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-slate-50 border border-slate-300 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <span>Compra de contado ($0)</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setMostrarCalculadoraCredito(!mostrarCalculadoraCredito)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 min-h-[40px] rounded-xl text-xs font-bold bg-slate-50 border border-slate-300 text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
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
                  className="text-xs text-rose-600 hover:underline cursor-pointer py-1 px-2 font-medium"
                >
                  Reiniciar a $0
                </button>
              </div>
            )}
          </div>

          {/* Simulador Expandido */}
          {mostrarCalculadoraCredito && (
            <div className="mt-4 pt-4 border-t border-slate-200">
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
      {/* CALLOUT DE EVALUACIÓN PRE-COMPRA                      */}
      {/* ==================================================== */}
      <div className="rounded-3xl bg-[#0F172A] p-6 sm:p-7 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-5 border border-slate-800">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base sm:text-lg font-black text-white">
              Revisa el carro antes de dar plata o firmar papeles
            </h4>
          </div>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Un carro con fallas ocultas o multas viejas puede costarte millones de pesos en el taller. Hazle una revisión paso a paso con nuestra herramienta gratuita para compradores.
          </p>
        </div>
        <Link
          href="/evaluacion"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shrink-0 transition-all shadow-sm active:scale-95"
        >
          <span>Revisar carro ahora</span>
          <span>→</span>
        </Link>
      </div>
      </div>

      {/* ======================================================== */}
      {/* MEMBRETE EJECUTIVO PARA PDF / IMPRESIÓN                  */}
      {/* ======================================================== */}
      <div className="hidden print:block border-b-2 border-slate-900 pb-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shrink-0">
              <Calculator className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-slate-900">ESCANEAPP</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  REPORTE DE COSTO 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Presupuesto real para mantener tu carro · Precios oficiales en Colombia
              </p>
            </div>
          </div>
          <div className="text-right text-[11px] font-mono text-slate-500">
            <span className="font-bold text-slate-900 block">Ciudad: {ciudadSeleccionada}</span>
            <span>Uso: {kmMes} km/mes · Fecha: {new Date().toLocaleDateString('es-CO')}</span>
          </div>
        </div>

        {/* Tarjetas de Resumen Ejecutivo en Impresión */}
        <div className="grid grid-cols-4 gap-3 mt-4">
          <div className="bg-slate-900 text-white p-3 rounded-xl">
            <span className="text-[10px] font-mono text-slate-400 block">PRESUPUESTO MENSUAL</span>
            <span className="text-lg font-black font-mono text-emerald-400">
              {costoTotalMensual > 0 ? formatoCOP(costoTotalMensual) : '$0'}
            </span>
            <span className="text-[10px] font-mono text-slate-400 block">/ mes</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 block">COSTO TOTAL AL AÑO</span>
            <span className="text-base font-black font-mono text-slate-900">
              {costoTotalAnual > 0 ? formatoCOP(costoTotalAnual) : '$0'}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">/ año</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 block">PAPELES (SOAT/IMP/TEC)</span>
            <span className="text-sm font-black font-mono text-slate-900">
              {formatoCOP(totalObligatoriosAnual)}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">({pctObligatorios}% del total)</span>
          </div>
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="text-[10px] font-mono text-slate-500 block">GASOLINA ANUAL</span>
            <span className="text-sm font-black font-mono text-slate-900">
              {formatoCOP(totalCombustibleAnual)}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block">({pctCombustible}% del total)</span>
          </div>
        </div>
      </div>

      {/* ==================================================== */}
      {/* DESGLOSE DETALLADO DE COSTOS (TABLA COMPLETA)        */}
      {/* ==================================================== */}
      <section className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <h4 className="text-base sm:text-lg font-black text-slate-900">
              Resumen completo de tus gastos
            </h4>
            <p className="text-xs text-slate-500">
              Valores calculados automáticamente según lo que elegiste en cada paso
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-mono text-slate-500 block">Total mensual estimado</span>
            <span className="text-xl font-extrabold font-mono text-slate-900">
              {formatoCOP(costoTotalMensual)} <span className="text-xs text-slate-500">/ mes</span>
            </span>
          </div>
        </div>

        {/* Vista Desktop (Tabla limpia) */}
        <div className="hidden sm:block print:block overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 font-mono text-[11px] text-slate-500 uppercase">
                <th className="py-3 px-4 font-bold text-slate-900">Gasto</th>
                <th className="py-3 px-4 font-bold text-slate-900">Tipo</th>
                <th className="py-3 px-4 font-bold text-slate-900">Origen del Dato</th>
                <th className="py-3 px-4 font-bold text-slate-900 text-right">Al Mes</th>
                <th className="py-3 px-4 font-bold text-slate-900 text-right">Al Año</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {desgloseItems.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{item.concepto}</span>
                    <span className="text-[11px] text-slate-500">{item.detalle}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {item.calculado ? (
                      <span className="text-[11px] text-emerald-700 font-bold">
                        {item.tipoDato}
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">
                        Sin calcular
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {item.calculado ? formatoCOP(item.mensual) : '$0'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono text-slate-500">
                    {item.calculado ? formatoCOP(item.anual) : '$0'}
                  </td>
                </tr>
              ))}
              {/* Fila de Totales */}
              <tr className="bg-slate-50 font-bold border-t-2 border-slate-900">
                <td className="py-3.5 px-4 text-slate-900 text-sm" colSpan={3}>
                  TOTAL ESTIMADO DEL CARRO
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm text-slate-900 font-extrabold">
                  {formatoCOP(costoTotalMensual)}
                </td>
                <td className="py-3.5 px-4 text-right font-mono text-sm text-slate-900 font-bold">
                  {formatoCOP(costoTotalAnual)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Vista Móvil (Tarjetas apiladas) */}
        <div className="sm:hidden print:hidden space-y-2.5">
          {desgloseItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 text-xs">{item.concepto}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {item.categoria}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">{item.detalle}</p>
              <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block">Al mes</span>
                  <span className="font-mono font-bold text-slate-900">
                    {item.calculado ? formatoCOP(item.mensual) : '$0'}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Al año</span>
                  <span className="font-mono text-slate-500">
                    {item.calculado ? formatoCOP(item.anual) : '$0'}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Total Móvil */}
          <div className="rounded-2xl bg-[#0F172A] text-white p-4 space-y-2 mt-3">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
              TOTAL ESTIMADO
            </span>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block">Presupuesto mensual</span>
                <span className="text-lg font-mono font-extrabold text-white">
                  {formatoCOP(costoTotalMensual)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Total al año</span>
                <span className="text-lg font-mono font-bold text-slate-200">
                  {formatoCOP(costoTotalAnual)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso de orientación */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs text-slate-500 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-900">Aviso importante:</strong> Los cálculos mostrados son estimaciones promedio con base en precios oficiales en Colombia. Te sirven de guía para planear tu presupuesto antes de comprar, pero no reemplazan una revisión técnica con un perito automotriz.
          </p>
        </div>
      </section>

      {/* CIERRE DE COLUMNA IZQUIERDA (lg:col-span-8) */}
      </div>

      {/* ==================================================== */}
      {/* COLUMNA DERECHA: SIDEBAR RESUMEN STICKY (DESKTOP)     */}
      {/* ==================================================== */}
      <div className="hidden lg:block lg:col-span-4 sticky top-24 space-y-6 print:hidden">
        {renderResumenCard(false)}
        {/* {renderTipCard()} */}
      </div>

    {/* CIERRE DEL GRID DE 2 COLUMNAS (lg:grid-cols-12) */}
    </div>

    {/* CIERRE DEL CONTENEDOR PRINCIPAL */}
    </div>
  );
};
