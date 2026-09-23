import {
  DatosBasicos,
  ResultadoKilometraje,
  AntecedentesLegales,
  ResultadoLegales,
  Alerta,
  ChecklistItemEval,
  ResultadoFinal,
  CostoReparacion,
} from '../types/evaluation';
import {
  ANIO_ACTUAL,
  KM_MUY_BAJO,
  KM_NORMAL_MIN,
  KM_NORMAL_MAX,
  KM_ALTO_MAX,
  PENALIZACION_KM_MUY_BAJO,
  PENALIZACION_KM_ALTO,
  PENALIZACION_REGRABACIONES,
  PENALIZACION_ESCUELA,
  ESCALA_COMPARENDOS,
  ESCALA_SINIESTROS,
  PESO_KILOMETRAJE,
  PESO_LEGALES,
  PESO_CHECKLIST,
  UMBRAL_NO_COMPRAR,
  PUNTAJE_BIEN,
  PUNTAJE_REGULAR,
  PUNTAJE_MAL,
} from './constants';

/**
 * Calcula el análisis de kilometraje basado en la antigüedad del vehículo.
 */
export function calcularKilometraje(datos: DatosBasicos): ResultadoKilometraje {
  const anios = ANIO_ACTUAL - datos.anioModelo;

  // Evitar división por cero para carros del año actual
  if (anios <= 0) {
    return {
      kmPorAnio: datos.kilometraje,
      categoria: datos.kilometraje > KM_ALTO_MAX ? 'excesivo' : 'normal',
      mensaje: datos.kilometraje > KM_ALTO_MAX
        ? 'Criterio de descarte: kilometraje excesivo para un carro del año'
        : 'Vehículo del año actual, kilometraje aceptable',
      porcentaje: datos.kilometraje > KM_ALTO_MAX ? 0 : 100,
      esDescarte: datos.kilometraje > KM_ALTO_MAX,
    };
  }

  const kmPorAnio = Math.round(datos.kilometraje / anios);

  if (kmPorAnio > KM_ALTO_MAX) {
    return {
      kmPorAnio,
      categoria: 'excesivo',
      mensaje: 'Criterio de descarte: el kilometraje es excesivo (más de 20.000 km/año). Esto indica desgaste severo.',
      porcentaje: 0,
      esDescarte: true,
    };
  }

  if (kmPorAnio > KM_NORMAL_MAX) {
    return {
      kmPorAnio,
      categoria: 'alto',
      mensaje: 'Precaución: uso alto en carretera o viajero frecuente (15.000 a 20.000 km/año). Revise con detalle el desgaste mecánico.',
      porcentaje: PENALIZACION_KM_ALTO,
      esDescarte: false,
    };
  }

  if (kmPorAnio >= KM_NORMAL_MIN) {
    return {
      kmPorAnio,
      categoria: 'normal',
      mensaje: 'Normal: el recorrido es coherente con la antigüedad del vehículo (10.000 a 15.000 km/año).',
      porcentaje: 100,
      esDescarte: false,
    };
  }

  if (kmPorAnio >= KM_MUY_BAJO) {
    return {
      kmPorAnio,
      categoria: 'bajo',
      mensaje: 'Bajo pero aceptable: el vehículo ha sido de uso moderado (5.000 a 10.000 km/año).',
      porcentaje: 100,
      esDescarte: false,
    };
  }

  // Menor a 5,000 km/año - sospechosamente bajo
  return {
    kmPorAnio,
    categoria: 'muy_bajo',
    mensaje: 'Advertencia: el kilometraje es muy bajo para ser real. Podría haber sido alterado. Verifique con cuidado.',
    porcentaje: PENALIZACION_KM_MUY_BAJO,
    esDescarte: false,
  };
}

/**
 * Calcula el porcentaje del módulo de antecedentes legales.
 */
export function calcularLegales(datos: AntecedentesLegales): ResultadoLegales {
  const alertas: Alerta[] = [];
  let porcentaje = 100;
  let esDescarte = false;
  let motivoDescarte: string | undefined;

  // Placa pública = descarte inmediato
  if (datos.placaPublica) {
    esDescarte = true;
    motivoDescarte = 'El vehículo tiene o tuvo placa de servicio público.';
    alertas.push({
      tipo: 'descarte',
      titulo: 'SERVICIO PÚBLICO',
      mensaje: 'Un vehículo de servicio público tiene un desgaste extremo. Se considera un criterio de descarte preliminar.',
      modulo: 'legales',
    });
    return { porcentaje: 0, alertas, esDescarte, motivoDescarte };
  }

  // Siniestro MA = descarte inmediato
  if (datos.codigoSiniestro === 'MA') {
    esDescarte = true;
    motivoDescarte = 'El vehículo tiene un siniestro de Mayor Cuantía / Pérdida Total.';
    alertas.push({
      tipo: 'descarte',
      titulo: 'SINIESTRO DE PÉRDIDA TOTAL',
      mensaje: 'El historial registra un siniestro categoría MA (pérdida total). Se considera un criterio de descarte preliminar.',
      modulo: 'legales',
    });
    return { porcentaje: 0, alertas, esDescarte, motivoDescarte };
  }

  // Regrabaciones
  if (datos.regrabaciones) {
    porcentaje = Math.min(porcentaje, PENALIZACION_REGRABACIONES);
    alertas.push({
      tipo: 'peligro',
      titulo: 'Regrabación detectada',
      mensaje: 'El motor o chasis presenta regrabación de números de serie. Esto puede indicar procedencia ilegal o alteración de identidad.',
      modulo: 'legales',
    });
  }

  // Escuela de conducción
  if (datos.escuelaConductcion) {
    porcentaje = Math.min(porcentaje, PENALIZACION_ESCUELA);
    alertas.push({
      tipo: 'peligro',
      titulo: 'Vehículo de escuela de conducción',
      mensaje: 'Fue usado en escuela de enseñanza automovilística. El embrague, caja y motor tienen desgaste acelerado por uso intensivo de aprendices.',
      modulo: 'legales',
    });
  }

  // Comparendos - escala proporcional
  if (datos.valorComparendos > 0) {
    let porcentajeComparendos = 100;
    for (const escalon of ESCALA_COMPARENDOS) {
      if (datos.valorComparendos <= escalon.hasta) {
        porcentajeComparendos = escalon.porcentaje;
        break;
      }
    }
    porcentaje = Math.min(porcentaje, porcentajeComparendos);

    const nivelAlerta = datos.valorComparendos >= 3_000_000 ? 'peligro' : 'advertencia';
    alertas.push({
      tipo: nivelAlerta,
      titulo: datos.valorComparendos >= 3_000_000 ? 'Comparendos excesivos' : 'Comparendos pendientes',
      mensaje: `Hay $${datos.valorComparendos.toLocaleString('es-CO')} en comparendos acumulados. Estos deben pagarse antes del traspaso y afectan el costo real del vehículo.`,
      modulo: 'legales',
    });
  }

  // Siniestros (no MA, ya se filtró arriba)
  if (datos.codigoSiniestro !== 'ninguno') {
    const siniestro = ESCALA_SINIESTROS[datos.codigoSiniestro];
    if (siniestro) {
      porcentaje = Math.min(porcentaje, siniestro.porcentaje);

      const etiquetas: Record<string, string> = {
        '1m': 'Menor cuantía (1m)',
        '2m': 'Mediana cuantía (2m)',
        '3m': 'Mayor cuantía (3m)',
      };

      alertas.push({
        tipo: datos.codigoSiniestro === '3m' ? 'peligro' : 'advertencia',
        titulo: `Siniestro: ${etiquetas[datos.codigoSiniestro] || datos.codigoSiniestro}`,
        mensaje: datos.codigoSiniestro === '3m'
          ? 'Siniestro de alta cuantía registrado. Posible daño estructural significativo. Solicite peritaje profesional.'
          : 'Siniestro registrado en historial. Solicite detalles de la reparación a una aseguradora.',
        modulo: 'legales',
      });
    }
  }

  return { porcentaje, alertas, esDescarte, motivoDescarte };
}

/**
 * Calcula el porcentaje del checklist de inspección física.
 */
export function calcularChecklist(items: ChecklistItemEval[]): {
  porcentaje: number;
  totalPuntos: number;
  puntosObtenidos: number;
  evaluados: number;
} {
  // Filtrar ítems N/A
  const itemsEvaluados = items.filter(item => item.valoracion !== 'na');

  if (itemsEvaluados.length === 0) {
    return { porcentaje: 100, totalPuntos: 0, puntosObtenidos: 0, evaluados: 0 };
  }

  const totalPuntos = itemsEvaluados.length * PUNTAJE_BIEN;

  const puntosObtenidos = itemsEvaluados.reduce((sum, item) => {
    switch (item.valoracion) {
      case 'bien': return sum + PUNTAJE_BIEN;
      case 'regular': return sum + PUNTAJE_REGULAR;
      case 'mal': return sum + PUNTAJE_MAL;
      default: return sum;
    }
  }, 0);

  const porcentaje = Math.round((puntosObtenidos / totalPuntos) * 100);

  return { porcentaje, totalPuntos, puntosObtenidos, evaluados: itemsEvaluados.length };
}

/**
 * Calcula el porcentaje del checklist por categoría.
 */
export function calcularChecklistPorCategoria(
  items: ChecklistItemEval[],
  categoria: string
): { porcentaje: number; evaluados: number; total: number } {
  const itemsCategoria = items.filter(item => item.id.startsWith(categoria));
  const itemsEvaluados = itemsCategoria.filter(item => item.valoracion !== 'na');

  if (itemsEvaluados.length === 0) {
    return { porcentaje: 100, evaluados: 0, total: itemsCategoria.length };
  }

  const totalPuntos = itemsEvaluados.length * PUNTAJE_BIEN;
  const puntosObtenidos = itemsEvaluados.reduce((sum, item) => {
    switch (item.valoracion) {
      case 'bien': return sum + PUNTAJE_BIEN;
      case 'regular': return sum + PUNTAJE_REGULAR;
      case 'mal': return sum + PUNTAJE_MAL;
      default: return sum;
    }
  }, 0);

  return {
    porcentaje: Math.round((puntosObtenidos / totalPuntos) * 100),
    evaluados: itemsEvaluados.length,
    total: itemsCategoria.length,
  };
}

/**
 * Calcula el resultado final ponderado de la evaluación.
 */
export function calcularResultadoFinal(
  datos: DatosBasicos,
  legales: AntecedentesLegales,
  checklistItems: ChecklistItemEval[],
  costosReparacion: CostoReparacion[],
  precioVenta: number
): ResultadoFinal {
  const resultadoKm = calcularKilometraje(datos);
  const resultadoLegales = calcularLegales(legales);
  const resultadoChecklist = calcularChecklist(checklistItems);

  // Recolectar todas las alertas
  const alertas: Alerta[] = [...resultadoLegales.alertas];

  // Agregar alerta de kilometraje
  if (resultadoKm.categoria !== 'normal' && resultadoKm.categoria !== 'bajo') {
    alertas.push({
      tipo: resultadoKm.esDescarte ? 'descarte' : 'advertencia',
      titulo: resultadoKm.esDescarte ? 'Kilometraje excesivo' : 'Kilometraje inusual',
      mensaje: resultadoKm.mensaje,
      modulo: 'datosBasicos',
    });
  }

  // Verificar descarte inmediato
  if (resultadoKm.esDescarte || resultadoLegales.esDescarte) {
    const motivoDescarte = resultadoKm.esDescarte
      ? resultadoKm.mensaje
      : resultadoLegales.motivoDescarte || 'Descarte por antecedentes legales';

    return {
      porcentajeGlobal: 0,
      porcentajeKilometraje: resultadoKm.porcentaje,
      porcentajeLegales: resultadoLegales.porcentaje,
      porcentajeChecklist: resultadoChecklist.porcentaje,
      veredicto: 'no_comprar',
      mensajeVeredicto: 'Criterio de descarte detectado. ' + motivoDescarte + ' (Evaluación preliminar según criterios de Car Checker)',
      esDescarte: true,
      motivoDescarte,
      alertas,
      totalReparaciones: costosReparacion.reduce((sum, c) => sum + c.costoEstimado, 0),
      precioSugerido: 0,
    };
  }

  // Cálculo ponderado
  const porcentajeGlobal = Math.round(
    (PESO_KILOMETRAJE * resultadoKm.porcentaje +
      PESO_LEGALES * resultadoLegales.porcentaje +
      PESO_CHECKLIST * resultadoChecklist.porcentaje) / 100
  );

  // Determinar veredicto
  let veredicto: ResultadoFinal['veredicto'];
  let mensajeVeredicto: string;

  if (porcentajeGlobal >= 80) {
    veredicto = 'excelente';
    mensajeVeredicto = 'Vale la pena continuar con la evaluación. Los criterios registrados no presentan suficientes señales de alerta para descartar el vehículo en esta etapa. Si continúa siendo de tu interés, considera realizar un peritaje profesional antes de comprarlo.';
  } else if (porcentajeGlobal >= UMBRAL_NO_COMPRAR) {
    veredicto = 'aceptable';
    mensajeVeredicto = 'Continúa con precaución. Se identificaron algunos aspectos que requieren atención. Revisa los detalles antes de decidir si vale la pena avanzar hacia un peritaje profesional.';
  } else if (porcentajeGlobal >= 50) {
    veredicto = 'riesgoso';
    mensajeVeredicto = 'Revisa antes de continuar. Se identificaron varias señales de alerta durante esta revisión preliminar. Analiza los hallazgos y los posibles costos antes de continuar.';
  } else {
    veredicto = 'no_comprar';
    mensajeVeredicto = 'Revisa antes de continuar. Se identificaron múltiples señales de alerta y posibles altos costos de reparación. Analiza detalladamente si vale la pena invertir en un peritaje profesional.';
  }

  // Calcular precio sugerido
  const totalReparaciones = costosReparacion.reduce((sum, c) => sum + c.costoEstimado, 0);
  const precioSugerido = Math.max(0, precioVenta - totalReparaciones);

  return {
    porcentajeGlobal,
    porcentajeKilometraje: resultadoKm.porcentaje,
    porcentajeLegales: resultadoLegales.porcentaje,
    porcentajeChecklist: resultadoChecklist.porcentaje,
    veredicto,
    mensajeVeredicto,
    esDescarte: false,
    alertas,
    totalReparaciones,
    precioSugerido,
  };
}

/**
 * Resultado del cálculo del gasto de combustible.
 */
export interface ResultadoGastoGasolina {
  /** Gasto mensual estimado en pesos colombianos (COP) */
  gastoMensual: number;
  /** Gasto anual estimado (gastoMensual * 12) */
  gastoAnual: number;
  /** Galones mensuales consumidos */
  galonesMes: number;
  /** Indica si las entradas fueron válidas para el cálculo */
  valido: boolean;
}

/**
 * Calcula el gasto mensual y anual de gasolina según los kilómetros recorridos al mes,
 * el rendimiento del vehículo (km/galón) y el precio de referencia por galón.
 *
 * Fórmula:
 * Gasto Mensual = (kilometrosMes / kilometrosPorGalon) * precioGalon
 * Gasto Anual = Gasto Mensual * 12
 *
 * Validación:
 * Requiere que kilometrosMes > 0, kmPorGalon > 0 y precioGalon > 0.
 * Si algún valor es inválido, retorna 0 de forma segura sin generar NaN o Infinity.
 */
export function calcularGastoGasolina(
  kilometrosMes: number,
  kmPorGalon: number,
  precioGalon: number
): ResultadoGastoGasolina {
  if (
    typeof kilometrosMes !== 'number' ||
    typeof kmPorGalon !== 'number' ||
    typeof precioGalon !== 'number' ||
    isNaN(kilometrosMes) ||
    isNaN(kmPorGalon) ||
    isNaN(precioGalon) ||
    kilometrosMes <= 0 ||
    kmPorGalon <= 0 ||
    precioGalon <= 0
  ) {
    return {
      gastoMensual: 0,
      gastoAnual: 0,
      galonesMes: 0,
      valido: false,
    };
  }

  const galonesMes = kilometrosMes / kmPorGalon;
  const gastoMensual = Math.round(galonesMes * precioGalon);
  const gastoAnual = Math.round(gastoMensual * 12);

  return {
    gastoMensual,
    gastoAnual,
    galonesMes: Number(galonesMes.toFixed(1)),
    valido: true,
  };
}

/* ==========================================================================
   ETAPA 2 — CÁLCULOS DE FINANCIACIÓN Y CRÉDITO VEHICULAR
   ========================================================================== */

export interface ResultadoCredito {
  /** Precio total de venta del vehículo */
  precioVehiculo: number;
  /** Cuota inicial aportada por el comprador */
  cuotaInicial: number;
  /** Monto real financiado a través de crédito (Precio - Cuota Inicial) */
  montoFinanciado: number;
  /** Tasa de interés Efectiva Anual (porcentaje, ej. 19.49) */
  tasaEA: number;
  /** Tasa de interés Mensual Efectiva (decimal exacto, ej. 0.014947...) */
  tasaMensual: number;
  /** Plazo pactado en meses (ej. 12, 24, 36, 48, 60, 72) */
  plazoMeses: number;
  /** Cuota fija mensual calculada mediante amortización francesa */
  cuotaMensual: number;
  /** Total pagado durante todo el plazo (Cuota mensual * Plazo) */
  totalPagado: number;
  /** Total de intereses pagados a la entidad financiera (Total pagado - Monto financiado) */
  totalIntereses: number;
  /** Indicador de si los parámetros fueron válidos y el cálculo exitoso */
  valido: boolean;
}

/**
 * Calcula la amortización de un crédito vehicular bajo el sistema de amortización francés.
 *
 * Fórmulas financieras oficiales:
 * 1. Conversión de Efectivo Anual a Mensual Efectiva:
 *    i_mensual = (1 + EA)^(1/12) - 1
 *    (Sin redondeos prematuros para preservar precisión matemática).
 *
 * 2. Cuota fija mensual (Sistema Francés):
 *    Cuota = P * [ i * (1 + i)^n ] / [ (1 + i)^n - 1 ]
 *    Donde:
 *      P = Monto financiado
 *      i = Tasa mensual efectiva
 *      n = Plazo en meses
 *
 * 3. Casos particulares y seguridad:
 *    - Si monto financiado <= 0: cuota = 0, intereses = 0, total = 0.
 *    - Si tasa mensual == 0: cuota = P / n, intereses = 0, total = P (sin división por cero).
 *    - Validación estricta contra NaN, Infinity y plazos inválidos.
 */
export function calcularCredito(
  montoFinanciado: number,
  tasaEA: number,
  plazoMeses: number,
  precioVehiculo?: number,
  cuotaInicial?: number
): ResultadoCredito {
  // Validación de tipos y seguridad contra NaN
  if (
    typeof montoFinanciado !== 'number' ||
    typeof tasaEA !== 'number' ||
    typeof plazoMeses !== 'number' ||
    isNaN(montoFinanciado) ||
    isNaN(tasaEA) ||
    isNaN(plazoMeses) ||
    plazoMeses <= 0
  ) {
    return {
      precioVehiculo: precioVehiculo ?? 0,
      cuotaInicial: cuotaInicial ?? 0,
      montoFinanciado: 0,
      tasaEA: 0,
      tasaMensual: 0,
      plazoMeses: Math.max(1, plazoMeses || 12),
      cuotaMensual: 0,
      totalPagado: 0,
      totalIntereses: 0,
      valido: false,
    };
  }

  const pVehiculo = typeof precioVehiculo === 'number' && !isNaN(precioVehiculo) ? Math.max(0, precioVehiculo) : montoFinanciado;
  const cInicial = typeof cuotaInicial === 'number' && !isNaN(cuotaInicial) ? Math.max(0, cuotaInicial) : 0;
  const pFinanciado = Math.max(0, montoFinanciado);
  const nPlazo = Math.round(plazoMeses);
  const tEA = Math.max(0, tasaEA);

  // Caso 1: Sin financiación (monto financiado es 0 o la cuota inicial cubre el 100%)
  if (pFinanciado === 0) {
    return {
      precioVehiculo: pVehiculo,
      cuotaInicial: cInicial > 0 ? cInicial : pVehiculo,
      montoFinanciado: 0,
      tasaEA: tEA,
      tasaMensual: 0,
      plazoMeses: nPlazo,
      cuotaMensual: 0,
      totalPagado: 0,
      totalIntereses: 0,
      valido: true,
    };
  }

  // Conversión exacta EA -> Mensual Efectiva sin redondeo intermedio
  // tasaEA se recibe en porcentaje (ej: 19.49)
  const tasaEADecimal = tEA / 100;
  const tasaMensual = Math.pow(1 + tasaEADecimal, 1 / 12) - 1;

  // Caso 2: Tasa cero (0% de interés)
  if (tasaMensual === 0 || tEA === 0) {
    const cuotaMensual = Math.round(pFinanciado / nPlazo);
    const totalPagado = cuotaMensual * nPlazo;
    return {
      precioVehiculo: pVehiculo,
      cuotaInicial: cInicial,
      montoFinanciado: pFinanciado,
      tasaEA: 0,
      tasaMensual: 0,
      plazoMeses: nPlazo,
      cuotaMensual,
      totalPagado,
      totalIntereses: 0,
      valido: true,
    };
  }

  // Caso 3: Amortización francesa convencional
  const factor = Math.pow(1 + tasaMensual, nPlazo);
  const cuotaExacta = pFinanciado * ((tasaMensual * factor) / (factor - 1));
  const cuotaMensual = Math.round(cuotaExacta);
  const totalPagado = cuotaMensual * nPlazo;
  const totalIntereses = Math.max(0, totalPagado - pFinanciado);

  return {
    precioVehiculo: pVehiculo,
    cuotaInicial: cInicial,
    montoFinanciado: pFinanciado,
    tasaEA: tEA,
    tasaMensual,
    plazoMeses: nPlazo,
    cuotaMensual,
    totalPagado,
    totalIntereses,
    valido: true,
  };
}

/* ==========================================================================
   ETAPA 3 — CÁLCULOS Y REGLAS DE SOAT OFICIAL SFC
   ========================================================================== */

/**
 * Calcula la antigüedad del vehículo en años frente al año de la tarifa oficial.
 * Regla oficial SFC:
 * edad = anioTarifa - anioModelo
 * Si anioModelo >= anioTarifa (vehículo del año o año siguiente), edad = 0.
 */
export function calcularEdadVehiculo(
  anioModelo: number,
  anioReferencia = 2026
): number {
  if (typeof anioModelo !== 'number' || isNaN(anioModelo) || anioModelo <= 0) {
    return 0;
  }
  const ref =
    typeof anioReferencia === 'number' && !isNaN(anioReferencia) && anioReferencia > 0
      ? anioReferencia
      : 2026;
  return Math.max(0, ref - Math.round(anioModelo));
}

/**
 * Calcula la provisión mensual equivalente a partir del costo anual oficial del SOAT.
 * Provisión mensual = Math.round(precioAnual / 12)
 */
export function calcularProvisionMensualSoat(precioAnual: number): number {
  if (typeof precioAnual !== 'number' || isNaN(precioAnual) || precioAnual <= 0) {
    return 0;
  }
  return Math.round(precioAnual / 12);
}
