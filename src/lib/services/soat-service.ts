/**
 * Servicio de backend para la consulta y cálculo de tarifas oficiales del SOAT.
 *
 * Fuente oficial:
 * - Superintendencia Financiera de Colombia (SFC)
 * - Publicación: Tabla Tarifas Comerciales año 2026 (Circular Externa 022 de 2025)
 * - Base de datos versionada: src/data/soat/{anio}.json
 *
 * Principios:
 * - Desacopla los datos estáticos normalizados de los componentes React.
 * - Validación estricta de vigencia oficial anual de calendario.
 * - Nunca inventa precios ni utiliza tarifas de años anteriores si no existe la tarifa vigente.
 */

import { DatosSoat, RespuestaSoatAPI } from '@/types/external-data';
import { calcularEdadVehiculo, calcularProvisionMensualSoat } from '@/lib/calculations';
import { getFechaHoyColombia } from './credito-service';

// Importación de tablas anuales oficiales
import soat2026 from '@/data/soat/2026.json';

interface CriteriosTarifa {
  cilindrajeMin?: number;
  cilindrajeMax?: number;
  edadMin?: number;
  edadMax?: number;
  capacidadTonMin?: number;
  capacidadTonMax?: number;
  pasajerosMin?: number;
  pasajerosMax?: number;
}

interface TarifaItemJson {
  id: string;
  categoria: string;
  subcategoria: string;
  descripcion: string;
  criterios: CriteriosTarifa;
  precioAnual: number;
}

interface SoatTablaJson {
  metadata: {
    anio: number;
    fuente: string;
    urlFuente: string;
    resolucionCircular: string;
    fechaPublicacion: string;
    fechaVigenciaInicio: string;
    fechaVigenciaFin: string;
    notaLegal: string;
  };
  tarifas: TarifaItemJson[];
}

// Catálogo de tablas oficiales por vigencia
const CATALOGO_TABLAS_SOAT: Record<number, SoatTablaJson> = {
  2026: soat2026 as unknown as SoatTablaJson,
};

export interface ParametrosConsultaSoat {
  /** Categoría o tipo de vehículo (ej: 'VEHICULOS FAMILIARES', 'CAMPEROS Y CAMIONETAS', 'MOTOS') */
  categoria: string;
  /** Cilindraje del motor en centímetros cúbicos (ej: 1400, 1600, 2000) */
  cilindraje?: number;
  /** Año del modelo según tarjeta de propiedad (ej: 2020) */
  anioModelo?: number;
  /** Año de la tarifa a consultar (por defecto el año calendario actual) */
  anioTarifa?: number;
  /** Capacidad de pasajeros (para motocarros, intermunicipal, etc.) */
  pasajeros?: number;
  /** Capacidad de carga en toneladas (para vehículos de carga o mixto) */
  capacidadToneladas?: number;
  /** Fecha de referencia para pruebas de vigencia (YYYY-MM-DD) */
  fechaReferencia?: string;
}

/**
 * Normaliza el nombre o alias de una categoría hacia la denominación oficial de la SFC
 */
export function normalizarCategoriaSoat(categoriaRaw: string): string | null {
  if (!categoriaRaw || typeof categoriaRaw !== 'string') return null;

  const normalizada = categoriaRaw
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  // Mapeo de sinónimos y códigos comunes en CarCheck hacia la categoría oficial SFC
  if (
    normalizada.includes('FAMILIAR') ||
    normalizada.includes('AUTOMOVIL') ||
    normalizada.includes('SEDAN') ||
    normalizada.includes('HATCHBACK') ||
    normalizada === 'PARTICULAR' ||
    normalizada === 'VEHICULOS FAMILIARES'
  ) {
    return 'VEHICULOS FAMILIARES';
  }

  if (
    normalizada.includes('CAMPERO') ||
    normalizada.includes('CAMIONETA') ||
    normalizada.includes('SUV') ||
    normalizada.includes('PICKUP') ||
    normalizada === 'CAMPEROS Y CAMIONETAS'
  ) {
    return 'CAMPEROS Y CAMIONETAS';
  }

  if (
    normalizada.includes('MOTO') &&
    !normalizada.includes('CARRO') &&
    !normalizada.includes('CICLO')
  ) {
    return 'MOTOS';
  }

  if (normalizada.includes('CICLOMOTOR')) {
    return 'CICLOMOTOR';
  }

  if (
    normalizada.includes('TRICIMOTO') ||
    normalizada.includes('CUADRICICLO') ||
    normalizada.includes('MOTO CARRO')
  ) {
    return 'MOTO CARRO, TRICIMOTO Y CUADRICICLO';
  }

  if (normalizada.includes('MOTOCARRO')) {
    return 'MOTOCARRO';
  }

  if (
    normalizada.includes('CARGA') ||
    normalizada.includes('MIXTO') ||
    normalizada.includes('CAMION')
  ) {
    return 'CARGA O MIXTO';
  }

  if (normalizada.includes('OFICIAL') || normalizada.includes('ESPECIAL')) {
    return 'OFICIALES ESPECIALES';
  }

  if (
    normalizada.includes('6 O MAS') ||
    normalizada.includes('SEIS') ||
    normalizada.includes('PASAJEROS')
  ) {
    return 'VEHICULOS 6 o más pasajeros';
  }

  if (
    normalizada.includes('NEGOCIO') ||
    normalizada.includes('TAXI') ||
    normalizada.includes('SERVICIO PUBLICO URBANO')
  ) {
    return 'AUTOS NEGOCIO';
  }

  if (normalizada.includes('BUS') || normalizada.includes('BUSETA')) {
    return 'BUSES Y BUSETAS URBANOS';
  }

  if (normalizada.includes('INTERMUNICIPAL')) {
    return 'SERVICIO PUBLICO INTERMUNICIPAL';
  }

  return null;
}

/**
 * Consulta la tarifa oficial del SOAT según las características del vehículo
 */
export function obtenerTarifaSoat(
  params: ParametrosConsultaSoat
): RespuestaSoatAPI {
  const hoy = params.fechaReferencia || getFechaHoyColombia();
  const anioActual = parseInt(hoy.slice(0, 4), 10);
  const anioObjetivo = params.anioTarifa || anioActual;

  // 1. Validar si existe la tabla oficial para el año solicitado
  const tabla = CATALOGO_TABLAS_SOAT[anioObjetivo];
  if (!tabla) {
    return {
      success: false,
      status: 'current_tariff_unavailable',
      message: `No existe una tabla oficial de tarifas SOAT cargada para el año ${anioObjetivo}. La SFC aún no ha publicado las tarifas de este período.`,
    };
  }

  // 2. Validar vigencia de la tabla en calendario
  const { metadata, tarifas } = tabla;
  if (hoy > metadata.fechaVigenciaFin) {
    return {
      success: false,
      status: 'stale_data',
      message: `La tabla oficial de tarifas SOAT para el año ${metadata.anio} finalizó su vigencia el ${metadata.fechaVigenciaFin}.`,
    };
  }

  // 3. Normalizar categoría
  const categoriaOficial = normalizarCategoriaSoat(params.categoria);
  if (!categoriaOficial) {
    return {
      success: false,
      status: 'category_not_found',
      message: `La categoría de vehículo '${params.categoria}' no es reconocida o no está soportada en la tabla oficial de la SFC.`,
    };
  }

  // 4. Validar requerimientos de variables según la categoría
  const categoriasConCilindraje = [
    'VEHICULOS FAMILIARES',
    'CAMPEROS Y CAMIONETAS',
    'MOTOS',
    'AUTOS NEGOCIO',
    'OFICIALES ESPECIALES',
    'VEHICULOS 6 o más pasajeros',
  ];

  const categoriasConEdad = [
    'VEHICULOS FAMILIARES',
    'CAMPEROS Y CAMIONETAS',
    'AUTOS NEGOCIO',
    'VEHICULOS 6 o más pasajeros',
  ];

  if (categoriasConCilindraje.includes(categoriaOficial)) {
    if (
      params.cilindraje === undefined ||
      params.cilindraje === null ||
      isNaN(params.cilindraje) ||
      params.cilindraje <= 0
    ) {
      return {
        success: false,
        status: 'invalid_vehicle_data',
        message:
          'El cilindraje en centímetros cúbicos (c.c.) es requerido para determinar la tarifa oficial de esta categoría.',
      };
    }
  }

  if (categoriasConEdad.includes(categoriaOficial)) {
    if (
      params.anioModelo === undefined ||
      params.anioModelo === null ||
      isNaN(params.anioModelo) ||
      params.anioModelo <= 0
    ) {
      return {
        success: false,
        status: 'invalid_vehicle_data',
        message:
          'El año del modelo del vehículo es requerido para determinar el rango de antigüedad en la tabla oficial.',
      };
    }
  }

  // 5. Cálculo de variables derivadas
  const edadCalculada =
    params.anioModelo && params.anioModelo > 0
      ? calcularEdadVehiculo(params.anioModelo, anioObjetivo)
      : undefined;

  const cil = params.cilindraje ? Math.round(params.cilindraje) : undefined;
  const capTon = params.capacidadToneladas;
  const pas = params.pasajeros;

  // 6. Filtrar tarifas por categoría
  const tarifasDeCategoria = tarifas.filter(
    (t) => t.categoria === categoriaOficial
  );

  if (tarifasDeCategoria.length === 0) {
    return {
      success: false,
      status: 'category_not_found',
      message: `No se encontraron tarifas para la categoría oficial '${categoriaOficial}'.`,
    };
  }

  // 7. Buscar la tarifa específica que cumpla todos los criterios
  const tarifaEncontrada = tarifasDeCategoria.find((t) => {
    const c = t.criterios;

    // Validación de cilindraje
    if (cil !== undefined) {
      if (c.cilindrajeMin !== undefined && cil < c.cilindrajeMin) return false;
      if (c.cilindrajeMax !== undefined && cil > c.cilindrajeMax) return false;
    }

    // Validación de edad
    if (edadCalculada !== undefined) {
      if (c.edadMin !== undefined && edadCalculada < c.edadMin) return false;
      if (c.edadMax !== undefined && edadCalculada > c.edadMax) return false;
    }

    // Validación de capacidad de carga
    if (capTon !== undefined) {
      if (c.capacidadTonMin !== undefined && capTon < c.capacidadTonMin) return false;
      if (c.capacidadTonMax !== undefined && capTon > c.capacidadTonMax) return false;
    }

    // Validación de pasajeros
    if (pas !== undefined) {
      if (c.pasajerosMin !== undefined && pas < c.pasajerosMin) return false;
      if (c.pasajerosMax !== undefined && pas > c.pasajerosMax) return false;
    }

    return true;
  });

  if (!tarifaEncontrada) {
    return {
      success: false,
      status: 'tariff_not_found',
      message: `No se encontró una tarifa exacta que coincida con las características del vehículo (Cilindraje: ${cil ?? 'N/A'}, Modelo: ${params.anioModelo ?? 'N/A'}, Edad: ${edadCalculada ?? 'N/A'}).`,
    };
  }

  // 8. Construir respuesta normalizada
  const provisionMensual = calcularProvisionMensualSoat(tarifaEncontrada.precioAnual);

  const data: DatosSoat = {
    id: tarifaEncontrada.id,
    categoria: tarifaEncontrada.categoria,
    subcategoria: tarifaEncontrada.subcategoria,
    descripcion: tarifaEncontrada.descripcion,
    precioAnual: tarifaEncontrada.precioAnual,
    provisionMensual,
    anio: metadata.anio,
    fuente: metadata.fuente,
    urlFuente: metadata.urlFuente,
    resolucionCircular: metadata.resolucionCircular,
    fechaPublicacion: metadata.fechaPublicacion,
    fechaVigenciaInicio: metadata.fechaVigenciaInicio,
    fechaVigenciaFin: metadata.fechaVigenciaFin,
    criteriosAplicados: {
      cilindraje: cil,
      anioModelo: params.anioModelo,
      edadCalculada,
      pasajeros: pas,
      capacidadToneladas: capTon,
    },
    tipo: 'tarifa_oficial',
  };

  return {
    success: true,
    status: 'success',
    data,
  };
}

/**
 * Obtiene todas las categorías oficiales disponibles en la tabla activa
 */
export function listarCategoriasSoatDisponibles(anio = 2026): string[] {
  const tabla = CATALOGO_TABLAS_SOAT[anio];
  if (!tabla) return [];
  const cats = new Set(tabla.tarifas.map((t) => t.categoria));
  return Array.from(cats);
}
