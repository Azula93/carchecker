/**
 * Tipos e interfaces para datos externos integrados en CarCheck.
 * Diseñado para desacoplar el frontend de los esquemas específicos de fuentes oficiales.
 */

/* ==========================================================================
   MÓDULO DE GASOLINA (ETAPA 1)
   ========================================================================== */

export interface DatosGasolina {
  /** Ciudad o área metropolitana de referencia oficial */
  ciudad: string;
  /** Nombre del producto oficial (ej. Gasolina Motor Corriente) */
  producto: string;
  /** Precio de referencia en pesos colombianos por galón (COP) */
  precioPorGalon: number;
  /** Moneda del precio (COP) */
  moneda: string;
  /** Fecha en que la entidad oficial publicó la circular o resolución */
  fechaPublicacion: string;
  /** Fecha a partir de la cual rige el precio de referencia */
  fechaVigencia: string;
  /** Nombre de la entidad oficial fuente */
  fuente: string;
  /** URL directa o portal de la fuente oficial */
  urlFuente?: string;
  /** Tipo de precio regulado */
  tipoPrecio: 'referencia';
}

export type EstadoRespuestaGasolina =
  | 'success'
  | 'not_available'
  | 'source_unavailable'
  | 'stale_data';

export interface RespuestaGasolinaAPI {
  success: boolean;
  status: EstadoRespuestaGasolina;
  data?: DatosGasolina;
  /** Listado de ciudades que cuentan con cobertura oficial vigente */
  ciudadesDisponibles?: string[];
  /** Mensaje explicativo en caso de que no haya cobertura o exista un error */
  message?: string;
}

/* ==========================================================================
   MÓDULO DE CRÉDITO Y FINANCIACIÓN (ETAPA 2)
   ========================================================================== */

export interface DatosCredito {
  /** Modalidad certificada por la SFC (ej. CONSUMO Y ORDINARIO) */
  modalidad: string;
  /** Tasa de Interés Bancario Corriente Efectivo Anual (porcentaje, ej. 19.49) */
  tasaEA: number;
  /** Tasa de Usura máxima legal de referencia (1.5 * TIBC EA, ej. 29.24) */
  tasaUsuraEA: number;
  /** Fecha inicial de vigencia certificada (YYYY-MM-DD) */
  fechaInicioVigencia: string;
  /** Fecha final de vigencia certificada (YYYY-MM-DD) */
  fechaFinVigencia: string;
  /** Fecha de expedición de la resolución de la SFC */
  fechaPublicacion?: string;
  /** Número de resolución expedida por la Superintendencia Financiera */
  resolucion?: string;
  /** Entidad oficial emisora (Superintendencia Financiera de Colombia) */
  fuente: string;
  /** Portal o dataset oficial */
  urlFuente?: string;
  /** Tipo de indicador */
  tipo: 'referencia';
  /** Timestamp ISO de cuando se consultó o cacheó el dato */
  fetchedAt: string;
  /** Origen de los datos devueltos (fuente en vivo o caché) */
  origen?: 'source' | 'cache';
}

export type EstadoRespuestaCredito =
  | 'success'
  | 'cached'
  | 'cached_fallback'
  | 'source_unavailable'
  | 'stale_data'
  | 'not_available';

export interface RespuestaCreditoAPI {
  success: boolean;
  status: EstadoRespuestaCredito;
  data?: DatosCredito;
  message?: string;
  origen?: 'source' | 'cache';
}

/* ==========================================================================
   MÓDULO DE SOAT (ETAPA 3)
   ========================================================================== */

export interface DatosSoat {
  /** Identificador único de la tarifa (ej. familiares-menos-1500-menos-10) */
  id: string;
  /** Categoría oficial según tabla SFC (ej. VEHICULOS FAMILIARES, CAMPEROS Y CAMIONETAS) */
  categoria: string;
  /** Subcategoría o rango oficial (ej. Menos de 1.500 c.c. - Menos de 10 años) */
  subcategoria: string;
  /** Descripción legible del vehículo cubierto */
  descripcion: string;
  /** Precio anual comercial oficial del SOAT en COP (incluye RUNT y ADRES) */
  precioAnual: number;
  /** Provisión mensual estimada para costos de tenencia (precioAnual / 12) */
  provisionMensual: number;
  /** Año calendario de la tarifa oficial (ej. 2026) */
  anio: number;
  /** Entidad oficial emisora (Superintendencia Financiera de Colombia) */
  fuente: string;
  /** URL oficial de publicación */
  urlFuente?: string;
  /** Número de resolución o circular externa de la tarifa */
  resolucionCircular?: string;
  /** Fecha en que la SFC expidió la tarifa */
  fechaPublicacion?: string;
  /** Inicio del período de vigencia oficial */
  fechaVigenciaInicio: string;
  /** Fin del período de vigencia oficial */
  fechaVigenciaFin: string;
  /** Variables del vehículo utilizadas para determinar la tarifa */
  criteriosAplicados?: {
    cilindraje?: number;
    anioModelo?: number;
    edadCalculada?: number;
    pasajeros?: number;
    capacidadToneladas?: number;
  };
  /** Tipo de tarifa */
  tipo: 'tarifa_oficial';
}

export type EstadoRespuestaSoat =
  | 'success'
  | 'invalid_vehicle_data'
  | 'category_not_found'
  | 'tariff_not_found'
  | 'current_tariff_unavailable'
  | 'stale_data';

export interface RespuestaSoatAPI {
  success: boolean;
  status: EstadoRespuestaSoat;
  data?: DatosSoat;
  message?: string;
}

/* ==========================================================================
   MÓDULO DE IMPUESTO VEHICULAR (ETAPA 4)
   ========================================================================== */

export type CategoriaTablaImpuesto =
  | 'automoviles'
  | 'camionetas_camperos'
  | 'doble_cabina'
  | 'electricos'
  | 'motocicletas'
  | 'pasajeros'
  | 'carga'
  | 'ambulancias'
  | 'hibridos';

export interface BaseGravableModelo {
  /** Año modelo numérico */
  modelo: number;
  /** Valor base gravable oficial en COP (convertido desde miles de pesos) */
  valorCOP: number;
}

export interface RegistroVehiculoImpuesto {
  /** Identificador único normalizado del registro */
  id: string;
  /** Marca del automotor (ej. MAZDA, RENAULT, CHEVROLET) */
  marca: string;
  /** Línea o referencia comercial (ej. 3 TOURING, DUSTER ZEN 1.6) */
  linea: string;
  /** Cilindraje en c.c. (si aplica) */
  cilindraje?: number;
  /** Capacidad de carga en toneladas o pasajeros (si aplica) */
  capacidad?: number;
  /** Tabla oficial a la que pertenece */
  categoriaTabla: CategoriaTablaImpuesto;
  /** Valores de base gravable por año modelo */
  valoresPorModelo: Record<number, number>;
}

export interface FuenteOficialImpuesto {
  nombre: string;
  vigencia: number;
  resolucion?: string;
  decretoTarifas?: string;
  entidadTarifas?: string;
  urlBaseGravable?: string;
  urlTarifas?: string;
}

export interface DatosImpuestoVehicular {
  /** Vigencia fiscal del impuesto (ej. 2026) */
  vigencia: number;
  /** Categoría oficial aplicada según tabla */
  categoria: CategoriaTablaImpuesto;
  /** Marca identificada */
  marca: string;
  /** Línea comercial identificada */
  linea: string;
  /** Año modelo consultado */
  anioModelo: number;
  /** Cilindraje considerado */
  cilindraje?: number;
  /** Base gravable oficial en COP fijada por MinTransporte */
  baseGravable: number;
  /** Tarifa porcentual aplicada (ej. 0.015, 0.025, 0.035, 0.01) */
  tarifa: number;
  /** Porcentaje legible formateado (ej. "2,5 %") */
  tarifaTexto: string;
  /** Impuesto anual estimado en COP (baseGravable * tarifa) */
  impuestoAnualEstimado: number;
  /** Provisión mensual sugerida para costos de tenencia en COP (impuestoAnual / 12) */
  provisionMensual: number;
  /** Metadatos de las fuentes oficiales (MinTransporte y MinHacienda) */
  fuente: FuenteOficialImpuesto;
  /** Advertencia legal informativa */
  advertenciaLegal: string;
  /** Nota explicativa para casos especiales o tratamientos diferenciales */
  notaEspecial?: string;
}

export type EstadoRespuestaImpuesto =
  | 'success'
  | 'not_found'
  | 'multiple_matches'
  | 'insufficient_data'
  | 'special_case'
  | 'not_available'
  | 'source_error';

export interface RespuestaImpuestoVehicularAPI {
  success: boolean;
  status: EstadoRespuestaImpuesto;
  data?: DatosImpuestoVehicular;
  /** Lista de opciones de vehículos cuando hay múltiples coincidencias */
  coincidencias?: Array<{
    id: string;
    marca: string;
    linea: string;
    cilindraje?: number;
    categoria: CategoriaTablaImpuesto;
  }>;
  message?: string;
  advertenciaLegal?: string;
}

/* ==========================================================================
   CONTENEDOR DE DATOS EXTERNOS DE LA EVALUACIÓN
   ========================================================================== */

export interface DatosExternos {
  gasolina?: DatosGasolina;
  credito?: DatosCredito;
  soat?: DatosSoat;
  impuestoVehicular?: DatosImpuestoVehicular;
}
