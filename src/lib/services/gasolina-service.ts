import { DatosGasolina, RespuestaGasolinaAPI } from '@/types/external-data';

/**
 * URL oficial de la CREG donde se publican periódicamente los precios
 * de referencia de venta al público de combustibles líquidos en Colombia.
 */
const CREG_PRECIOS_URL =
  'https://creg.gov.co/publicaciones/15565/precios-de-combustibles-liquidos/';

/**
 * Tiempo de vida de la caché en memoria (24 horas en milisegundos).
 * Los precios de referencia CREG tienen vigencia mensual o bimensual.
 */
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

interface TablaCREGExtraida {
  fechaVigencia: string;
  preciosPorCiudad: Map<string, { ciudadOficial: string; precio: number }>;
  ciudadesDisponibles: string[];
  timestamp: number;
}

// Caché en memoria a nivel de proceso
let cacheCREG: TablaCREGExtraida | null = null;

/**
 * Normaliza un string removiendo acentos, caracteres especiales y espacios redundantes
 * para comparaciones robustas e insensibles a mayúsculas.
 */
export function normalizarNombreCiudad(nombre: string): string {
  return nombre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Mapeo de sinónimos y variaciones habituales a la clave canónica normalizada
 * de las 13 ciudades principales reguladas por la CREG.
 */
const CANONICAL_CITY_MAP: Record<string, string> = {
  BOGOTA: 'BOGOTA',
  'BOGOTA D.C.': 'BOGOTA',
  'SANTAFE DE BOGOTA': 'BOGOTA',
  MEDELLIN: 'MEDELLIN',
  CALI: 'CALI',
  'SANTIAGO DE CALI': 'CALI',
  BARRANQUILLA: 'BARRANQUILLA',
  CARTAGENA: 'CARTAGENA',
  'CARTAGENA DE INDIAS': 'CARTAGENA',
  MONTERIA: 'MONTERIA',
  BUCARAMANGA: 'BUCARAMANGA',
  VILLAVICENCIO: 'VILLAVICENCIO',
  PEREIRA: 'PEREIRA',
  MANIZALES: 'MANIZALES',
  IBAGUE: 'IBAGUE',
  PASTO: 'PASTO',
  'SAN JUAN DE PASTO': 'PASTO',
  CUCUTA: 'CUCUTA',
  'SAN JOSE DE CUCUTA': 'CUCUTA',
};

/**
 * Extrae texto plano de entidades HTML comunes en el portal de la CREG.
 */
function decodificarEntidadesHTML(texto: string): string {
  return texto
    .replace(/&aacute;/gi, 'á')
    .replace(/&eacute;/gi, 'é')
    .replace(/&iacute;/gi, 'í')
    .replace(/&oacute;/gi, 'ó')
    .replace(/&uacute;/gi, 'ú')
    .replace(/&ntilde;/gi, 'ñ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .trim();
}

/**
 * Parsea el HTML oficial de la CREG y extrae la tabla de precios vigentes.
 */
function parsearTablaCREG(html: string): {
  fechaVigencia: string;
  preciosPorCiudad: Map<string, { ciudadOficial: string; precio: number }>;
  ciudadesDisponibles: string[];
} {
  // 1. Ubicar la sección "1. Precios de los combustibles vigentes"
  const seccionVigenteIdx = html.indexOf('1. Precios de los combustibles vigentes');
  const contenidoRelevante =
    seccionVigenteIdx !== -1 ? html.slice(seccionVigenteIdx) : html;

  // 2. Extraer la primera tabla correspondiente a precios vigentes
  const inicioTabla = contenidoRelevante.indexOf('<table');
  const finTabla = contenidoRelevante.indexOf('</table>', inicioTabla);

  if (inicioTabla === -1 || finTabla === -1) {
    throw new Error('No se encontró la tabla de precios vigentes en el portal de CREG');
  }

  const tablaHTML = contenidoRelevante.slice(inicioTabla, finTabla + 8);

  // 3. Extraer fecha de vigencia desde caption / h3
  let fechaVigencia = 'Vigente';
  const captionMatch = tablaHTML.match(
    /<caption>[\s\S]*?<h3><strong>([\s\S]*?)<\/strong><\/h3>/i
  );
  if (captionMatch && captionMatch[1]) {
    const rawCaption = decodificarEntidadesHTML(captionMatch[1]);
    fechaVigencia = rawCaption.replace(/\s+/g, ' ').trim();
  }

  // 4. Extraer filas de la tabla
  const preciosPorCiudad = new Map<string, { ciudadOficial: string; precio: number }>();
  const ciudadesDisponibles: string[] = [];

  // Regex para encontrar cada fila <tr> con sus celdas <td>
  const filaRegex = /<tr>([\s\S]*?)<\/tr>/gi;
  let filaMatch: RegExpExecArray | null;

  while ((filaMatch = filaRegex.exec(tablaHTML)) !== null) {
    const contenidoFila = filaMatch[1];
    const celdas = Array.from(contenidoFila.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)).map(
      (m) => decodificarEntidadesHTML(m[1])
    );

    // Celdas esperadas: [No, Ciudad, Gasolina MC, ACPM]
    if (celdas.length >= 3) {
      const nombreCiudad = celdas[1];
      const precioGasolinaRaw = celdas[2];

      // Excluir fila de promedio o encabezados
      if (
        nombreCiudad.toLowerCase().includes('promedio') ||
        nombreCiudad.toLowerCase().includes('ciudad')
      ) {
        continue;
      }

      // Convertir "16.331" -> 16331 COP
      const precioNumerico = parseInt(precioGasolinaRaw.replace(/\D/g, ''), 10);

      if (!isNaN(precioNumerico) && precioNumerico > 0) {
        const canonicalKey = normalizarNombreCiudad(nombreCiudad);
        preciosPorCiudad.set(canonicalKey, {
          ciudadOficial: nombreCiudad,
          precio: precioNumerico,
        });
        ciudadesDisponibles.push(nombreCiudad);
      }
    }
  }

  if (preciosPorCiudad.size === 0) {
    throw new Error('No se pudieron procesar filas válidas de ciudades en la tabla CREG');
  }

  return { fechaVigencia, preciosPorCiudad, ciudadesDisponibles };
}

/**
 * Consulta y cachea los precios oficiales vigentes directamente desde la CREG.
 */
async function obtenerTablaCREG(): Promise<TablaCREGExtraida> {
  const ahora = Date.now();

  // Retornar de caché en memoria si está vigente
  if (cacheCREG && ahora - cacheCREG.timestamp < CACHE_TTL_MS) {
    return cacheCREG;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 segundos timeout

  try {
    const res = await fetch(CREG_PRECIOS_URL, {
      signal: controller.signal,
      headers: {
        'User-Agent':
          'CarCheckColombia/2.4 (https://carchecker.kodiquett.com; contacto@carchecker.com)',
        Accept: 'text/html,application/xhtml+xml',
      },
      // Revalidación Next.js a nivel de caché HTTP
      next: { revalidate: 86400 },
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`CREG respondió con status HTTP ${res.status}`);
    }

    const html = await res.text();
    const datosParseados = parsearTablaCREG(html);

    cacheCREG = {
      ...datosParseados,
      timestamp: ahora,
    };

    return cacheCREG;
  } catch (error) {
    clearTimeout(timeoutId);
    // Si la caché en memoria existe aunque haya vencido, la usamos ante contingencias
    if (cacheCREG) {
      return cacheCREG;
    }
    throw error;
  }
}

/**
 * Servicio principal de consulta de precio de gasolina.
 * Obtiene el precio oficial vigente de la CREG para la ciudad solicitada.
 *
 * @param ciudad Nombre o texto de la ciudad consultada (ej. "Cali", "Bogotá D.C.")
 */
export async function consultarPrecioGasolina(
  ciudad?: string
): Promise<RespuestaGasolinaAPI> {
  try {
    const tabla = await obtenerTablaCREG();
    const ciudadesDisponibles = tabla.ciudadesDisponibles;

    // Si no se especifica ciudad, devolver el listado disponible sin inventar precio
    if (!ciudad || ciudad.trim() === '') {
      return {
        success: false,
        status: 'not_available',
        ciudadesDisponibles,
        message:
          'Por favor especifica una ciudad para consultar el precio de referencia oficial.',
      };
    }

    const ciudadNormalizada = normalizarNombreCiudad(ciudad);
    const canonicalKey = CANONICAL_CITY_MAP[ciudadNormalizada] || ciudadNormalizada;

    const registro = tabla.preciosPorCiudad.get(canonicalKey);

    if (!registro) {
      return {
        success: false,
        status: 'not_available',
        ciudadesDisponibles,
        message: `La CREG no publica precio de referencia específico para "${ciudad}". La cobertura oficial actual abarca las 13 ciudades principales.`,
      };
    }

    const datosGasolina: DatosGasolina = {
      ciudad: registro.ciudadOficial,
      producto: 'Gasolina Motor Corriente',
      precioPorGalon: registro.precio,
      moneda: 'COP',
      fechaPublicacion: 'Vigente CREG',
      fechaVigencia: tabla.fechaVigencia,
      fuente: 'Comisión de Regulación de Energía y Gas (CREG)',
      urlFuente: CREG_PRECIOS_URL,
      tipoPrecio: 'referencia',
    };

    return {
      success: true,
      status: 'success',
      data: datosGasolina,
      ciudadesDisponibles,
    };
  } catch (error) {
    console.error('Error al consultar precios oficiales de gasolina en CREG:', error);
    return {
      success: false,
      status: 'source_unavailable',
      message:
        'No fue posible consultar el precio de referencia en la fuente oficial de la CREG en este momento.',
    };
  }
}
