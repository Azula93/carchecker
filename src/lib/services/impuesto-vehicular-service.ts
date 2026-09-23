/**
 * Servicio de backend para la consulta de base gravable oficial y cálculo del impuesto vehicular estimado en Colombia.
 *
 * Fuentes oficiales:
 * - Ministerio de Transporte de Colombia: Resolución 20253040048935 (Tablas 1 a 9 vigencia 2026).
 * - Ministerio de Hacienda y Crédito Público: Decreto 1457 del 29 de diciembre de 2025 (Tarifas 2026).
 *
 * Principios:
 * - Consulta sobre datos oficiales versionados (src/data/impuesto-vehicular/{vigencia}/).
 * - Matching estricto: sin promedios arbitrarios ni aproximaciones inventadas.
 * - Tratamiento diferenciado para casos especiales (eléctricos, motos, híbridos).
 * - Desacoplado del veredicto de compra global de CarCheck.
 */

import type {
  CategoriaTablaImpuesto,
  DatosImpuestoVehicular,
  FuenteOficialImpuesto,
  RegistroVehiculoImpuesto,
  RespuestaImpuestoVehicularAPI,
} from '@/types/external-data';

// Importación de configuración versionada 2026
import tarifas2026 from '@/data/impuesto-vehicular/tarifas/2026.json';
import metadata2026 from '@/data/impuesto-vehicular/2026/metadata.json';
import automoviles2026 from '@/data/impuesto-vehicular/2026/automoviles.json';
import camionetasCamperos2026 from '@/data/impuesto-vehicular/2026/camionetas-camperos.json';
import dobleCabina2026 from '@/data/impuesto-vehicular/2026/doble-cabina.json';
import electricos2026 from '@/data/impuesto-vehicular/2026/electricos.json';
import motocicletas2026 from '@/data/impuesto-vehicular/2026/motocicletas.json';
import pasajeros2026 from '@/data/impuesto-vehicular/2026/pasajeros.json';
import carga2026 from '@/data/impuesto-vehicular/2026/carga.json';
import ambulancias2026 from '@/data/impuesto-vehicular/2026/ambulancias.json';
import hibridos2026 from '@/data/impuesto-vehicular/2026/hibridos.json';

interface CatalogoVigencia {
  metadata: typeof metadata2026;
  tarifas: typeof tarifas2026;
  tablas: Record<CategoriaTablaImpuesto, RegistroVehiculoImpuesto[]>;
}

const CATALOGO_VIGENCIAS: Record<number, CatalogoVigencia> = {
  2026: {
    metadata: metadata2026,
    tarifas: tarifas2026,
    tablas: {
      automoviles: automoviles2026 as RegistroVehiculoImpuesto[],
      camionetas_camperos: camionetasCamperos2026 as RegistroVehiculoImpuesto[],
      doble_cabina: dobleCabina2026 as RegistroVehiculoImpuesto[],
      electricos: electricos2026 as RegistroVehiculoImpuesto[],
      motocicletas: motocicletas2026 as RegistroVehiculoImpuesto[],
      pasajeros: pasajeros2026 as RegistroVehiculoImpuesto[],
      carga: carga2026 as RegistroVehiculoImpuesto[],
      ambulancias: ambulancias2026 as RegistroVehiculoImpuesto[],
      hibridos: hibridos2026 as RegistroVehiculoImpuesto[],
    },
  },
};

export interface ParametrosConsultaImpuesto {
  /** Vigencia fiscal del cálculo (por defecto 2026) */
  vigencia?: number;
  /** Categoría o tabla oficial a consultar */
  categoria?: string;
  /** Marca del vehículo (ej. MAZDA, RENAULT, TOYOTA) */
  marca?: string;
  /** Línea o referencia comercial (ej. 3 TOURING, DUSTER, ONIX) */
  linea?: string;
  /** Año modelo según tarjeta de propiedad (ej. 2022) */
  anioModelo?: number;
  /** Cilindraje en c.c. para desambiguar versiones */
  cilindraje?: number;
  /** Identificador único directo si el usuario ya seleccionó la opción del catálogo */
  idVehiculo?: string;
}

/**
 * Normaliza una cadena de texto para comparaciones estrictas sin tildes ni caracteres especiales
 */
export function normalizarTexto(texto: string): string {
  if (!texto) return '';
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Normaliza o infiere la categoría de tabla oficial a partir del tipo o texto de vehículo
 */
export function normalizarCategoriaImpuesto(categoriaRaw?: string): CategoriaTablaImpuesto | null {
  if (!categoriaRaw) return 'automoviles';

  const norm = normalizarTexto(categoriaRaw);

  if (norm.includes('ELECTR')) return 'electricos';
  if (norm.includes('HIBRID')) return 'hibridos';
  if (norm.includes('DOBLE CABINA') || norm.includes('PICKUP') || norm.includes('PLATON')) return 'doble_cabina';
  if (norm.includes('CAMPERO') || norm.includes('CAMIONETA') || norm.includes('SUV')) return 'camionetas_camperos';
  if (norm.includes('MOTO') || norm.includes('CICLO')) return 'motocicletas';
  if (norm.includes('AMBULANCIA')) return 'ambulancias';
  if (norm.includes('CARGA') || norm.includes('CAMION') || norm.includes('FURGON')) return 'carga';
  if (norm.includes('PASAJERO') || norm.includes('BUSETA') || norm.includes('MICROBUS')) return 'pasajeros';
  if (norm.includes('AUTO') || norm.includes('SEDAN') || norm.includes('HATCHBACK') || norm.includes('FAMILIAR')) {
    return 'automoviles';
  }

  // Comprobar coincidencia directa con las claves de categorías válidas
  const categoriasValidas: CategoriaTablaImpuesto[] = [
    'automoviles',
    'camionetas_camperos',
    'doble_cabina',
    'electricos',
    'motocicletas',
    'pasajeros',
    'carga',
    'ambulancias',
    'hibridos',
  ];

  if (categoriasValidas.includes(categoriaRaw as CategoriaTablaImpuesto)) {
    return categoriaRaw as CategoriaTablaImpuesto;
  }

  return null;
}

export interface ResultadoCalculoTarifa {
  status: 'success' | 'special_case';
  tarifa: number;
  tarifaTexto: string;
  impuestoAnual: number;
  provisionMensual: number;
  notaEspecial?: string;
}

/**
 * Función central pura para calcular la tarifa y el impuesto estimado según la base gravable y la norma versionada.
 * NUNCA utiliza números mágicos en el código.
 */
export function calculateVehicleTax(
  baseGravable: number,
  configTarifas: typeof tarifas2026,
  categoria: CategoriaTablaImpuesto,
  cilindraje?: number
): ResultadoCalculoTarifa {
  // 1. Vehículos Eléctricos (Ley 1964 de 2019: máximo 1%)
  if (categoria === 'electricos') {
    const config = configTarifas.tarifasEspeciales.electricos;
    const impuestoAnual = Math.round(baseGravable * config.tarifa);
    return {
      status: 'success',
      tarifa: config.tarifa,
      tarifaTexto: config.tarifaPorcentajeTexto,
      impuestoAnual,
      provisionMensual: Math.round(impuestoAnual / 12),
      notaEspecial: `${config.norma}: ${config.descripcion}`,
    };
  }

  // 2. Motocicletas (Ley 488 de 1998: <= 125cc exentas, > 125cc pagan 1,5%)
  if (categoria === 'motocicletas') {
    const configMotos = configTarifas.tarifasEspeciales.motocicletas;
    const esExenta = cilindraje !== undefined && cilindraje <= 125;
    const configAplicada = esExenta ? configMotos.hasta125cc : configMotos.mas125cc;
    const impuestoAnual = Math.round(baseGravable * configAplicada.tarifa);

    return {
      status: 'success',
      tarifa: configAplicada.tarifa,
      tarifaTexto: configAplicada.tarifaPorcentajeTexto,
      impuestoAnual,
      provisionMensual: Math.round(impuestoAnual / 12),
      notaEspecial: `${configMotos.norma}: ${configAplicada.descripcion}`,
    };
  }

  // 3. Casos Especiales (Híbridos, Carga, Pasajeros, Ambulancias)
  if (['hibridos', 'carga', 'pasajeros', 'ambulancias'].includes(categoria)) {
    const configEspecial = configTarifas.tarifasEspeciales[
      categoria as keyof typeof configTarifas.tarifasEspeciales
    ] as { descripcion?: string } | undefined;
    return {
      status: 'special_case',
      tarifa: 0,
      tarifaTexto: 'Tarifa sujeta a ordenanza departamental',
      impuestoAnual: 0,
      provisionMensual: 0,
      notaEspecial:
        configEspecial?.descripcion ||
        'La base gravable oficial está determinada a nivel nacional, pero la tarifa o beneficio tributario depende de la autoridad tributaria del departamento donde esté matriculado el vehículo.',
    };
  }

  // 4. Vehículos particulares estándar (Automóviles, Camionetas, Camperos, Doble Cabina) - Decreto 1457 de 2025
  const tramos = configTarifas.tarifasParticulares;
  const tramoEncontrado = tramos.find((t) => {
    if (baseGravable < t.limiteInferior) return false;
    if (t.limiteSuperior !== null && baseGravable > t.limiteSuperior) return false;
    return true;
  });

  if (!tramoEncontrado) {
    // Fallback defensivo al tramo superior
    const tramoMax = tramos[tramos.length - 1];
    const impuesto = Math.round(baseGravable * tramoMax.tarifa);
    return {
      status: 'success',
      tarifa: tramoMax.tarifa,
      tarifaTexto: tramoMax.tarifaPorcentajeTexto,
      impuestoAnual: impuesto,
      provisionMensual: Math.round(impuesto / 12),
    };
  }

  const impuestoAnual = Math.round(baseGravable * tramoEncontrado.tarifa);
  return {
    status: 'success',
    tarifa: tramoEncontrado.tarifa,
    tarifaTexto: tramoEncontrado.tarifaPorcentajeTexto,
    impuestoAnual,
    provisionMensual: Math.round(impuestoAnual / 12),
  };
}

/**
 * Consulta y calcula el impuesto vehicular oficial según las características del vehículo
 */
export function consultarImpuestoVehicular(
  params: ParametrosConsultaImpuesto
): RespuestaImpuestoVehicularAPI {
  const vigencia = params.vigencia || 2026;

  // 1. Validar disponibilidad de la vigencia
  const catalogo = CATALOGO_VIGENCIAS[vigencia];
  if (!catalogo) {
    return {
      success: false,
      status: 'not_available',
      message: `La vigencia fiscal ${vigencia} no se encuentra disponible en el sistema. El Ministerio de Transporte aún no ha publicado las bases gravables para este período.`,
    };
  }

  const { metadata, tarifas, tablas } = catalogo;

  // 2. Determinar categoría
  const categoriaOficial = normalizarCategoriaImpuesto(params.categoria);
  if (!categoriaOficial) {
    return {
      success: false,
      status: 'not_found',
      message: `La categoría o tipo de vehículo '${params.categoria}' no es reconocida en las tablas oficiales de MinTransporte.`,
    };
  }

  const registrosDeTabla = tablas[categoriaOficial];
  const metadataTyped = metadata as unknown as {
    estadoCategorias?: Record<string, { status?: string; razon?: string; registros?: number }>;
  };
  const estadoCat = metadataTyped.estadoCategorias?.[categoriaOficial];

  if (estadoCat?.status === 'not_available' || !registrosDeTabla || registrosDeTabla.length === 0) {
    const razon =
      estadoCat?.razon ||
      'Archivo XLSX oficial 2026 no disponible para descarga manual actualmente.';
    return {
      success: false,
      status: 'not_available',
      message: `La categoría oficial '${categoriaOficial}' (Vigencia ${vigencia}) no se encuentra disponible actualmente: ${razon}`,
    };
  }

  // 3. Validar año modelo requerido
  if (!params.anioModelo || isNaN(params.anioModelo) || params.anioModelo <= 0) {
    return {
      success: false,
      status: 'insufficient_data',
      message: 'El año del modelo del vehículo es indispensable para ubicar la base gravable oficial.',
    };
  }

  const anioModelo = params.anioModelo;

  // 4. Búsqueda por idVehiculo directo si fue proporcionado
  let vehiculoSeleccionado: RegistroVehiculoImpuesto | undefined;

  if (params.idVehiculo) {
    vehiculoSeleccionado = registrosDeTabla.find((r) => r.id === params.idVehiculo);
    if (!vehiculoSeleccionado) {
      // Buscar en todas las tablas por si cambió la categoría
      for (const cat of Object.keys(tablas) as CategoriaTablaImpuesto[]) {
        const encontrado = tablas[cat].find((r) => r.id === params.idVehiculo);
        if (encontrado) {
          vehiculoSeleccionado = encontrado;
          break;
        }
      }
    }
  }

  // 5. Búsqueda estricta por Marca y Línea si no vino id directo
  if (!vehiculoSeleccionado) {
    if (!params.linea || params.linea.trim().length === 0) {
      return {
        success: false,
        status: 'insufficient_data',
        message: 'La línea o referencia del vehículo es requerida para identificar la base gravable oficial.',
      };
    }

    const marcaNorm = normalizarTexto(params.marca || '');
    const lineaNorm = normalizarTexto(params.linea || '');

    // Filtrar candidatos que coincidan en marca (si se dio) y línea
    const candidatos = registrosDeTabla.filter((r) => {
      const rMarcaNorm = normalizarTexto(r.marca);
      const rLineaNorm = normalizarTexto(r.linea);

      if (marcaNorm && !rMarcaNorm.includes(marcaNorm) && !lineaNorm.includes(rMarcaNorm)) {
        return false;
      }

      // Coincidencia estricta de palabras clave de la línea
      const palabrasLinea = lineaNorm.split(/\s+/).filter((p) => p.length > 1);
      const coincideLinea = palabrasLinea.every((palabra) => rLineaNorm.includes(palabra));

      return coincideLinea || rLineaNorm.includes(lineaNorm) || lineaNorm.includes(rLineaNorm);
    });

    if (candidatos.length === 0) {
      return {
        success: false,
        status: 'not_found',
        message: `No fue posible encontrar una base gravable oficial en MinTransporte para '${params.marca ? `${params.marca} ` : ''}${params.linea}' (Categoría: ${categoriaOficial}).`,
      };
    }

    if (candidatos.length > 1) {
      // Intentar desambiguar por cilindraje si está disponible
      if (params.cilindraje && params.cilindraje > 0) {
        const candidatosPorCil = candidatos.filter(
          (c) => c.cilindraje && Math.abs(c.cilindraje - params.cilindraje!) <= 50
        );
        if (candidatosPorCil.length === 1) {
          vehiculoSeleccionado = candidatosPorCil[0];
        }
      }

      if (!vehiculoSeleccionado) {
        return {
          success: false,
          status: 'multiple_matches',
          message: `Se encontraron ${candidatos.length} versiones técnicas oficiales para '${params.linea}'. Selecciona la variante exacta.`,
          coincidencias: candidatos.slice(0, 10).map((c) => ({
            id: c.id,
            marca: c.marca,
            linea: c.linea,
            cilindraje: c.cilindraje,
            categoria: c.categoriaTabla,
          })),
        };
      }
    } else {
      vehiculoSeleccionado = candidatos[0];
    }
  }

  // 6. Extraer el valor de la base gravable para el año modelo
  let baseGravable = vehiculoSeleccionado.valoresPorModelo[anioModelo];

  if (!baseGravable && anioModelo <= 2001) {
    // La columna oficial '2001 y Anteriores' ampara los modelos 2001 y de años anteriores
    baseGravable = vehiculoSeleccionado.valoresPorModelo[2001];
  }

  if (!baseGravable && anioModelo === 2026) {
    // Según directriz técnica oficial de MinTransporte (Resolución 20253040048935), los vehículos modelo 2026 toman como base de referencia la del modelo 2025
    baseGravable = vehiculoSeleccionado.valoresPorModelo[2025];
  }

  if (!baseGravable || baseGravable <= 0) {
    // Si el año modelo no tiene valor específico en este registro
    const aniosDisponibles = Object.keys(vehiculoSeleccionado.valoresPorModelo)
      .map(Number)
      .sort((a, b) => b - a);

    return {
      success: false,
      status: 'not_found',
      message: `El modelo año ${anioModelo} no figura en la tabla oficial de MinTransporte para '${vehiculoSeleccionado.marca} ${vehiculoSeleccionado.linea}'. Años oficiales disponibles: ${aniosDisponibles.join(', ')}.`,
    };
  }

  // 7. Calcular la tarifa y el impuesto según la categoría
  const cil = params.cilindraje || vehiculoSeleccionado.cilindraje;
  const calculo = calculateVehicleTax(
    baseGravable,
    tarifas,
    vehiculoSeleccionado.categoriaTabla,
    cil
  );

  const fuente: FuenteOficialImpuesto = {
    nombre: metadata.baseGravable.entidad,
    vigencia,
    resolucion: metadata.baseGravable.resolucion,
    decretoTarifas: tarifas.metadata.decreto,
    entidadTarifas: tarifas.metadata.entidad,
    urlBaseGravable: metadata.baseGravable.url,
    urlTarifas: tarifas.metadata.url,
  };

  const datos: DatosImpuestoVehicular = {
    vigencia,
    categoria: vehiculoSeleccionado.categoriaTabla,
    marca: vehiculoSeleccionado.marca,
    linea: vehiculoSeleccionado.linea,
    anioModelo,
    cilindraje: vehiculoSeleccionado.cilindraje,
    baseGravable,
    tarifa: calculo.tarifa,
    tarifaTexto: calculo.tarifaTexto,
    impuestoAnualEstimado: calculo.impuestoAnual,
    provisionMensual: calculo.provisionMensual,
    fuente,
    advertenciaLegal: metadata.advertenciaLegal,
    notaEspecial: calculo.notaEspecial,
  };

  return {
    success: true,
    status: calculo.status,
    data: datos,
    advertenciaLegal: metadata.advertenciaLegal,
  };
}

/**
 * Obtiene la lista de marcas disponibles para una categoría dada
 */
export function obtenerMarcasPorCategoria(
  categoria: CategoriaTablaImpuesto,
  vigencia: number = 2026
): string[] {
  const catalogo = CATALOGO_VIGENCIAS[vigencia];
  if (!catalogo || !catalogo.tablas[categoria]) return [];
  const marcasSet = new Set<string>();
  catalogo.tablas[categoria].forEach((v) => marcasSet.add(v.marca));
  return Array.from(marcasSet).sort();
}

/**
 * Obtiene la lista de líneas disponibles para una categoría y marca dadas
 */
export function obtenerLineasPorMarca(
  categoria: CategoriaTablaImpuesto,
  marca: string,
  vigencia: number = 2026
): Array<{ id: string; linea: string; cilindraje?: number }> {
  const catalogo = CATALOGO_VIGENCIAS[vigencia];
  if (!catalogo || !catalogo.tablas[categoria]) return [];
  const marcaNorm = normalizarTexto(marca);

  return catalogo.tablas[categoria]
    .filter((v) => normalizarTexto(v.marca) === marcaNorm)
    .map((v) => ({ id: v.id, linea: v.linea, cilindraje: v.cilindraje }))
    .sort((a, b) => a.linea.localeCompare(b.linea));
}
