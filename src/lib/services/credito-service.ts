/**
 * Servicio de backend para la consulta y gestión de la Tasa de Interés Bancario Corriente (TIBC).
 *
 * Fuente oficial:
 * - Superintendencia Financiera de Colombia (SFC)
 * - Dataset Datos Abiertos: pare-7x5i (API SODA)
 * - Modalidad: CONSUMO Y ORDINARIO
 *
 * Reglas de caching y vigencia:
 * - TTL Técnico: 12 horas.
 * - Regla Suprema: La vigencia oficial calendarizada (fechaInicioVigencia <= hoy <= fechaFinVigencia)
 *   tiene prelación absoluta sobre el TTL técnico.
 * - Si la vigencia caducó, la caché se invalida forzosamente.
 * - Si la fuente externa falla y la tasa cacheada ya expiró, NUNCA se entrega una tasa vencida como vigente
 *   (retorna status: 'source_unavailable' o 'stale_data').
 * - Si la fuente falla pero la tasa cacheada todavía está dentro del período calendario oficial,
 *   se entrega como 'cached_fallback' indicando transparencia de origen.
 */

import { DatosCredito, RespuestaCreditoAPI } from '@/types/external-data';

const SODA_DATASET_URL = 'https://www.datos.gov.co/resource/pare-7x5i.json';
const CACHE_TTL_MS = 12 * 60 * 60 * 1000; // 12 horas en milisegundos
const MODALIDAD_OBJETIVO = 'CONSUMO Y ORDINARIO';

interface CacheEntryCredito {
  datos: DatosCredito;
  fetchedAtMs: number;
}

// Caché en memoria para la instancia
let cacheCredito: CacheEntryCredito | null = null;

/**
 * Función de utilidad para obtener la fecha de hoy en formato YYYY-MM-DD en zona horaria de Colombia (UTC-5)
 */
export function getFechaHoyColombia(): string {
  const ahora = new Date();
  // Formato Bogotá (UTC-5)
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Bogota',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return formatter.format(ahora);
}

/**
 * Verifica si una tasa está oficialmente vigente en el calendario
 */
export function esTasaOficialmenteVigente(
  fechaInicio: string,
  fechaFin: string,
  fechaReferencia?: string
): boolean {
  const hoy = fechaReferencia || getFechaHoyColombia();
  return hoy >= fechaInicio && hoy <= fechaFin;
}

/**
 * Consulta directa a la API SODA de Datos Abiertos Colombia
 */
async function fetchDesdeSFC(): Promise<DatosCredito | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const url = new URL(SODA_DATASET_URL);
    url.searchParams.set('modalidad', MODALIDAD_OBJETIVO);
    url.searchParams.set('$order', 'vigencia_hasta desc');
    url.searchParams.set('$limit', '5');

    const headers: Record<string, string> = {
      Accept: 'application/json',
      'User-Agent': 'CarCheck-Colombia/2.0 (VerificadorVehicular; contacto@carcheck.co)',
    };

    // Si existe token opcional en variables de entorno, se incluye
    if (process.env.DATOS_GOV_APP_TOKEN) {
      headers['X-App-Token'] = process.env.DATOS_GOV_APP_TOKEN;
    }

    const res = await fetch(url.toString(), {
      headers,
      signal: controller.signal,
      next: { revalidate: 43200 }, // 12 horas en caché Next.js
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[CreditoService] SODA respondió con código HTTP ${res.status}`);
      return null;
    }

    const registros = await res.json();

    if (!Array.isArray(registros) || registros.length === 0) {
      console.warn('[CreditoService] No se encontraron registros en el dataset pare-7x5i');
      return null;
    }

    // Buscar el registro más reciente de la modalidad deseada
    const item = registros.find(
      (r) =>
        r.modalidad &&
        r.modalidad.toString().trim().toUpperCase() === MODALIDAD_OBJETIVO
    ) || registros[0];

    if (!item || !item.interes_bancario_corriente) {
      return null;
    }

    // Formato recibido: "19.49%" -> extraer valor numérico flotante
    const tasaStr = item.interes_bancario_corriente.toString().replace('%', '').trim();
    const tasaEA = parseFloat(tasaStr);

    if (isNaN(tasaEA) || tasaEA <= 0) {
      console.warn('[CreditoService] Formato de tasa inválido:', item.interes_bancario_corriente);
      return null;
    }

    // Extraer fechas YYYY-MM-DD
    const fechaInicioVigencia = item.vigencia_desde
      ? item.vigencia_desde.toString().slice(0, 10)
      : '';
    const fechaFinVigencia = item.vigencia_hasta
      ? item.vigencia_hasta.toString().slice(0, 10)
      : '';
    const fechaPublicacion = item.fecha_resolucion
      ? item.fecha_resolucion.toString().slice(0, 10)
      : undefined;

    // Calcular tasa de usura legal de referencia: 1.5 * TIBC E.A. (Art. 305 Código Penal)
    const tasaUsuraEA = Number((tasaEA * 1.5).toFixed(2));

    const datos: DatosCredito = {
      modalidad: MODALIDAD_OBJETIVO,
      tasaEA,
      tasaUsuraEA,
      fechaInicioVigencia,
      fechaFinVigencia,
      fechaPublicacion,
      resolucion: item.resolucion ? item.resolucion.toString() : undefined,
      fuente: 'Superintendencia Financiera de Colombia',
      urlFuente: 'https://www.superfinanciera.gov.co/',
      tipo: 'referencia',
      fetchedAt: new Date().toISOString(),
      origen: 'source',
    };

    return datos;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error('[CreditoService] Error al consultar datos.gov.co:', error);
    return null;
  }
}

/**
 * Función principal para obtener la tasa de referencia vigente de crédito vehicular
 */
export async function obtenerTasaCreditoVigente(
  forzarConsulta = false
): Promise<RespuestaCreditoAPI> {
  const hoy = getFechaHoyColombia();
  const ahoraMs = Date.now();

  // 1. EVALUAR CACHÉ EXISTENTE
  if (!forzarConsulta && cacheCredito) {
    const { datos, fetchedAtMs } = cacheCredito;
    const vigenteOficialmente = esTasaOficialmenteVigente(
      datos.fechaInicioVigencia,
      datos.fechaFinVigencia,
      hoy
    );
    const cacheFresca = ahoraMs - fetchedAtMs < CACHE_TTL_MS;

    // Caso A: Tasa vigente en calendario y caché fresca (< 12h) -> Servir desde caché
    if (vigenteOficialmente && cacheFresca) {
      return {
        success: true,
        status: 'cached',
        data: { ...datos, origen: 'cache' },
        origen: 'cache',
      };
    }

    // Si la tasa en caché ya expiró oficialmente en el calendario, invalidarla de inmediato
    if (!vigenteOficialmente) {
      cacheCredito = null;
    }
  }

  // 2. CONSULTAR FUENTE OFICIAL EN VIVO
  const datosEnVivo = await fetchDesdeSFC();

  if (datosEnVivo) {
    const vigente = esTasaOficialmenteVigente(
      datosEnVivo.fechaInicioVigencia,
      datosEnVivo.fechaFinVigencia,
      hoy
    );

    // Caso F: Nueva tasa válida encontrada
    if (vigente) {
      cacheCredito = {
        datos: datosEnVivo,
        fetchedAtMs: ahoraMs,
      };

      return {
        success: true,
        status: 'success',
        data: datosEnVivo,
        origen: 'source',
      };
    } else {
      // Caso 2 / Borde: El registro más reciente en la SFC ya venció (ej. fin de mes y no han publicado el nuevo)
      // La tasa más reciente disponible está desactualizada
      return {
        success: false,
        status: 'stale_data',
        message: `La última tasa certificada (${datosEnVivo.tasaEA}% EA) rigió hasta el ${datosEnVivo.fechaFinVigencia} y la SFC aún no ha publicado la del período actual.`,
      };
    }
  }

  // 3. MANEJO DE FALLO EN LA FUENTE
  // Si la consulta externa falló pero teníamos una tasa en caché que AÚN está dentro de su período oficial
  if (
    cacheCredito &&
    esTasaOficialmenteVigente(
      cacheCredito.datos.fechaInicioVigencia,
      cacheCredito.datos.fechaFinVigencia,
      hoy
    )
  ) {
    // Caso E: Fuente caída + tasa cacheada todavía vigente -> cached_fallback
    return {
      success: true,
      status: 'cached_fallback',
      data: { ...cacheCredito.datos, origen: 'cache' },
      origen: 'cache',
      message:
        'Respuesta entregada desde la caché local vigente debido a indisponibilidad temporal de la conexión con la SFC.',
    };
  }

  // Caso D: Fuente no disponible y no hay tasa vigente en caché
  return {
    success: false,
    status: 'source_unavailable',
    message:
      'No fue posible obtener la tasa oficial vigente desde la Superintendencia Financiera de Colombia. Puedes ingresar una tasa manualmente para simular el crédito.',
  };
}

/**
 * Helper para pruebas y depuración: restablece la caché en memoria
 */
export function resetCacheCreditoParaPruebas(): void {
  cacheCredito = null;
}

/**
 * Helper para pruebas: inyecta un estado de caché controlado
 */
export function inyectarCacheCreditoParaPruebas(
  datos: DatosCredito,
  fetchedAtMs: number
): void {
  cacheCredito = {
    datos,
    fetchedAtMs,
  };
}
