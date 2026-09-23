/**
 * Constantes y parámetros del sistema de evaluación de vehículos CarCheck.
 */

/**
 * Año actual del sistema utilizado para el cálculo de antigüedad.
 */
export const ANIO_ACTUAL: number = new Date().getFullYear();

/**
 * Umbrales de kilometraje anual estándar (km/año) en el mercado colombiano.
 */
export const KM_MUY_BAJO = 5000;
export const KM_NORMAL_MIN = 10000;
export const KM_NORMAL_MAX = 15000;
export const KM_ALTO_MAX = 20000;

/**
 * Penalizaciones y topes porcentuales para kilometraje fuera de rango.
 */
export const PENALIZACION_KM_MUY_BAJO = 85; // Puntuación máxima si es sospechosamente bajo (posible alteración de odómetro)
export const PENALIZACION_KM_ALTO = 90; // Puntuación máxima si supera el promedio esperado

/**
 * Penalizaciones porcentuales aplicadas por antecedentes legales graves.
 */
export const PENALIZACION_REGRABACIONES = 50;
export const PENALIZACION_ESCUELA = 40;

/**
 * Escala progresiva de impacto de multas y comparendos (SIMIT) en pesos colombianos (COP).
 */
export const ESCALA_COMPARENDOS: { hasta: number; porcentaje: number }[] = [
  { hasta: 0, porcentaje: 100 },
  { hasta: 1_000_000, porcentaje: 85 },
  { hasta: 2_000_000, porcentaje: 80 },
  { hasta: 3_000_000, porcentaje: 70 },
  { hasta: 4_000_000, porcentaje: 65 },
  { hasta: Infinity, porcentaje: 60 },
];

/**
 * Puntuación y criterio de descarte según el código de siniestro de Fasecolda.
 */
export const ESCALA_SINIESTROS: Record<string, { porcentaje: number; descarte: boolean }> = {
  'ninguno': { porcentaje: 100, descarte: false },
  '1m': { porcentaje: 90, descarte: false },
  '2m': { porcentaje: 70, descarte: false },
  '3m': { porcentaje: 40, descarte: false },
  'MA': { porcentaje: 0, descarte: true },
};

/**
 * Ponderación porcentual para el cálculo de la calificación global (Suma = 100%).
 */
export const PESO_KILOMETRAJE = 20;
export const PESO_LEGALES = 30;
export const PESO_CHECKLIST = 50;

/**
 * Umbral mínimo de aprobación: puntuaciones menores a este valor reciben veredicto 'no_comprar'.
 */
export const UMBRAL_NO_COMPRAR = 65;

/**
 * Puntajes numéricos equivalentes para cada valoración individual del checklist.
 */
export const PUNTAJE_BIEN = 100;
export const PUNTAJE_REGULAR = 50;
export const PUNTAJE_MAL = 0;

/**
 * Clave de persistencia en localStorage para guardar el progreso de la evaluación.
 */
export const STORAGE_KEY = 'carcheck_evaluacion';

/**
 * Clave de persistencia en localStorage para la calculadora de costo de mantenimiento.
 */
export const STORAGE_KEY_COSTOS = 'carcheck_costo_mantenimiento';

/**
 * Portales y fuentes oficiales de consulta vehicular en Colombia.
 */
export const ENLACES_PORTALES = {
  RUNT: 'https://www.runt.com.co/consultaCiudadana/#/consultaVehiculo',
  SIMIT: 'https://www.fcm.org.co/simit/#/home-public',
  FASECOLDA: 'https://www.fasecolda.com/ramos/automoviles/historial-de-accidentes-de-vehiculos-asegurados/',
};
