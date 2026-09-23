'use client';

import { Evaluacion, DatosBasicos, AntecedentesLegales, ChecklistItemEval, CostoReparacion, DatosGasolina, DatosCredito, DatosSoat } from '../types/evaluation';
import { STORAGE_KEY, STORAGE_KEY_COSTOS } from './constants';

/**
 * Genera un ID único simple.
 */
function generarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Crea una evaluación nueva con valores por defecto.
 */
export function crearEvaluacionNueva(): Evaluacion {
  return {
    id: generarId(),
    fecha: new Date().toISOString(),
    datosBasicos: {
      lineaVehiculo: '',
      anioModelo: new Date().getFullYear(),
      kilometraje: 0,
      ciudadPlaca: 'BOGOTÁ D.C.',
    },
    antecedentesLegales: {
      placaPublica: false,
      regrabaciones: false,
      escuelaConductcion: false,
      valorComparendos: 0,
      codigoSiniestro: 'ninguno',
    },
    checklistItems: [],
    costosReparacion: [],
    precioVenta: 0,
    pasoActual: 1,
  };
}

/**
 * Guarda la evaluación en localStorage.
 */
export function guardarEvaluacion(evaluacion: Evaluacion): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluacion));
    }
  } catch (error) {
    console.error('Error al guardar la evaluación:', error);
  }
}

/**
 * Carga la evaluación desde localStorage.
 */
export function cargarEvaluacion(): Evaluacion | null {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return JSON.parse(data) as Evaluacion;
      }
    }
  } catch (error) {
    console.error('Error al cargar la evaluación:', error);
  }
  return null;
}

/**
 * Limpia la evaluación del localStorage y crea una nueva.
 */
export function limpiarEvaluacion(): Evaluacion {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error al limpiar la evaluación:', error);
  }
  return crearEvaluacionNueva();
}

/**
 * Actualiza los datos básicos de la evaluación.
 */
export function actualizarDatosBasicos(
  evaluacion: Evaluacion,
  datos: Partial<DatosBasicos>
): Evaluacion {
  const updated = {
    ...evaluacion,
    datosBasicos: { ...evaluacion.datosBasicos, ...datos },
  };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza los antecedentes legales.
 */
export function actualizarLegales(
  evaluacion: Evaluacion,
  datos: Partial<AntecedentesLegales>
): Evaluacion {
  const updated = {
    ...evaluacion,
    antecedentesLegales: { ...evaluacion.antecedentesLegales, ...datos },
  };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza un ítem del checklist.
 */
export function actualizarChecklistItem(
  evaluacion: Evaluacion,
  item: ChecklistItemEval
): Evaluacion {
  const existingIndex = evaluacion.checklistItems.findIndex(i => i.id === item.id);
  const checklistItems = [...evaluacion.checklistItems];

  if (existingIndex >= 0) {
    checklistItems[existingIndex] = item;
  } else {
    checklistItems.push(item);
  }

  const updated = { ...evaluacion, checklistItems };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza los costos de reparación.
 */
export function actualizarCostos(
  evaluacion: Evaluacion,
  costos: CostoReparacion[]
): Evaluacion {
  const updated = { ...evaluacion, costosReparacion: costos };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza el precio de venta.
 */
export function actualizarPrecioVenta(
  evaluacion: Evaluacion,
  precio: number
): Evaluacion {
  const updated = { ...evaluacion, precioVenta: precio };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza el paso actual del wizard.
 */
export function actualizarPaso(
  evaluacion: Evaluacion,
  paso: number
): Evaluacion {
  const updated = { ...evaluacion, pasoActual: paso };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza los datos de referencia de gasolina obtenidos de fuentes externas.
 * Es segura y retrocompatible ante evaluaciones que no contengan datosExternos previamente.
 */
export function actualizarDatosGasolina(
  evaluacion: Evaluacion,
  gasolina: DatosGasolina
): Evaluacion {
  const updated: Evaluacion = {
    ...evaluacion,
    datosExternos: {
      ...evaluacion.datosExternos,
      gasolina,
    },
  };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza los datos de referencia de crédito vehicular (SFC) obtenidos de fuentes externas.
 * Es segura y retrocompatible ante evaluaciones que no contengan datosExternos previamente.
 */
export function actualizarDatosCredito(
  evaluacion: Evaluacion,
  credito: DatosCredito
): Evaluacion {
  const updated: Evaluacion = {
    ...evaluacion,
    datosExternos: {
      ...evaluacion.datosExternos,
      credito,
    },
  };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Actualiza los datos de referencia del SOAT (SFC) obtenidos de fuentes oficiales.
 * Es segura y retrocompatible ante evaluaciones que no contengan datosExternos previamente.
 */
export function actualizarDatosSoat(
  evaluacion: Evaluacion,
  soat: DatosSoat
): Evaluacion {
  const updated: Evaluacion = {
    ...evaluacion,
    datosExternos: {
      ...evaluacion.datosExternos,
      soat,
    },
  };
  guardarEvaluacion(updated);
  return updated;
}

/**
 * Estructura de persistencia para el flujo guiado de costos de mantenimiento.
 */
export interface EstadoCostosMantenimiento {
  soat: {
    calculado: boolean;
    anual: number;
    categoria?: string;
    cilindraje?: number;
    anioModelo?: number;
    subcategoria?: string;
  };
  impuesto: {
    calculado: boolean;
    anual: number;
    baseGravable?: number;
    tarifaTexto?: string;
    categoria?: string;
    marca?: string;
    linea?: string;
    anioModelo?: number;
  };
  tecno: {
    calculado: boolean;
    anual: number;
  };
  gasolina: {
    calculado: boolean;
    mensual: number;
    ciudad: string;
    kmMes: number;
    kmPorGalon: number;
    precioGalon: number;
  };
  peajes: {
    calculado: boolean;
    mensual: number;
  };
  parqueadero: {
    calculado: boolean;
    mensual: number;
  };
  lavado: {
    calculado: boolean;
    mensual: number;
  };
  mantenimiento: {
    calculado: boolean;
    mensual: number;
  };
  fondoReparaciones: {
    calculado: boolean;
    mensual: number;
  };
  credito: {
    calculado: boolean;
    mensual: number;
    activo: boolean;
    precioVehiculo?: number;
    cuotaInicial?: number;
    plazoMeses?: number;
    tasaEA?: number;
  };
}

/**
 * Guarda el estado de la calculadora de costos de mantenimiento en localStorage.
 */
export function guardarCostosMantenimiento(datos: EstadoCostosMantenimiento): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_COSTOS, JSON.stringify(datos));
    }
  } catch (error) {
    console.error('Error al guardar costos de mantenimiento en localStorage:', error);
  }
}

/**
 * Carga el estado guardado de la calculadora de costos de mantenimiento desde localStorage.
 */
export function cargarCostosMantenimiento(): EstadoCostosMantenimiento | null {
  try {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY_COSTOS);
      if (data) {
        return JSON.parse(data) as EstadoCostosMantenimiento;
      }
    }
  } catch (error) {
    console.error('Error al cargar costos de mantenimiento desde localStorage:', error);
  }
  return null;
}

/**
 * Limpia el estado guardado de la calculadora de costos de mantenimiento en localStorage.
 */
export function limpiarCostosMantenimiento(): void {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY_COSTOS);
    }
  } catch (error) {
    console.error('Error al limpiar costos de mantenimiento en localStorage:', error);
  }
}

