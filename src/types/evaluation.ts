/**
 * Tipos e interfaces del sistema de evaluación de vehículos CarCheck.
 */

/**
 * Datos básicos de identificación y estado general del vehículo.
 */
export interface DatosBasicos {
  /** Placa del vehículo (ej. ABC 123) */
  placa?: string;
  /** Ciudad o municipio de matrícula de la placa (ej. BOGOTÁ D.C., MEDELLÍN) */
  ciudadPlaca?: string;
  /** Línea, marca o modelo comercial del vehículo (ej. Mazda 3 Grand Touring) */
  lineaVehiculo: string;
  /** Año del modelo según tarjeta de propiedad */
  anioModelo: number;
  /** Kilometraje actual registrado en el odómetro */
  kilometraje: number;
}

/**
 * Categorías de kilometraje anual estimadas para el análisis de uso.
 */
export type CategoriaKilometraje = 'muy_bajo' | 'bajo' | 'normal' | 'alto' | 'excesivo';

/**
 * Resultado del análisis de kilometraje en función de la antigüedad del vehículo.
 */
export interface ResultadoKilometraje {
  /** Promedio de kilómetros recorridos por año */
  kmPorAnio: number;
  /** Clasificación del kilometraje según los umbrales estándar */
  categoria: CategoriaKilometraje;
  /** Mensaje explicativo o recomendación respecto al kilometraje */
  mensaje: string;
  /** Puntuación porcentual obtenida (0 - 100) */
  porcentaje: number;
  /** Indica si el kilometraje constituye motivo inmediato de descarte */
  esDescarte: boolean;
}

/**
 * Opciones de severidad de siniestro registrado en Fasecolda.
 * - 'ninguno': Sin siniestros
 * - '1m': Menor cuantía
 * - '2m': Mediana cuantía
 * - '3m': Mayor cuantía
 * - 'MA': Pérdida total o daño estructural mayor
 */
export type CodigoSiniestro = 'ninguno' | '1m' | '2m' | '3m' | 'MA';

/**
 * Información sobre antecedentes legales y de tránsito del vehículo.
 */
export interface AntecedentesLegales {
  /** Indica si la placa corresponde a servicio público o fue público anteriormente */
  placaPublica: boolean;
  /** Indica si presenta regrabación de número de motor, chasis o serie */
  regrabaciones: boolean;
  /** Indica si fue vehículo de enseñanza automovilística / escuela de conducción */
  escuelaConductcion: boolean;
  /** Valor acumulado de multas y comparendos pendientes en SIMIT (en COP) */
  valorComparendos: number;
  /** Código de siniestro registrado en historial asegurador (Fasecolda) */
  codigoSiniestro: CodigoSiniestro;
}

/**
 * Resultado del análisis de antecedentes legales y de tránsito.
 */
export interface ResultadoLegales {
  /** Puntuación porcentual obtenida en el módulo legal (0 - 100) */
  porcentaje: number;
  /** Lista de alertas informativas, preventivas o críticas generadas */
  alertas: Alerta[];
  /** Indica si los antecedentes legales constituyen motivo directo de descarte */
  esDescarte: boolean;
  /** Explicación del motivo de descarte en caso de aplicar */
  motivoDescarte?: string;
}

/**
 * Nivel de severidad o criticidad de una alerta.
 */
export type TipoAlerta = 'info' | 'exito' | 'advertencia' | 'peligro' | 'descarte';

/**
 * Alerta o notificación generada durante la evaluación.
 */
export interface Alerta {
  /** Nivel de severidad de la alerta */
  tipo: TipoAlerta;
  /** Título conciso de la alerta */
  titulo: string;
  /** Detalle o explicación con sugerencias */
  mensaje: string;
  /** Módulo de origen (ej. 'datosBasicos', 'legales', 'checklist', etc.) */
  modulo: string;
}

/**
 * Categorías temáticas de los puntos de inspección del checklist.
 */
export type CategoriaChecklist =
  | 'exterior'
  | 'motor'
  | 'interior'
  | 'ruta'
  | 'inferior'
  | 'complementarias';

/**
 * Etiquetas en español amigables para la UI de cada categoría del checklist.
 */
export const CATEGORIAS_LABELS: Record<CategoriaChecklist, string> = {
  exterior: 'Exterior',
  motor: 'Motor y Mecánica',
  interior: 'Interior y Equipamiento',
  ruta: 'Prueba de Ruta',
  inferior: 'Inspección Inferior',
  complementarias: 'Pruebas Complementarias',
};

/**
 * Definición estática de un ítem de inspección en el checklist.
 */
export interface ChecklistItemDef {
  /** Identificador único del ítem (ej. 'ext_pintura') */
  id: string;
  /** Nombre visible del punto de inspección */
  nombre: string;
  /** Categoría a la que pertenece el ítem */
  categoria: CategoriaChecklist;
  /** Guía o consejo práctico para el usuario al momento de revisar */
  tip: string;
  /** Costo de reparación mínimo de referencia estimado (en COP) */
  costoRefMin?: number;
  /** Costo de reparación máximo de referencia estimado (en COP) */
  costoRefMax?: number;
}

/**
 * Calificación asignada a un punto de inspección por el usuario.
 * - 'bien': En óptimas condiciones
 * - 'regular': Desgaste aceptable o detalles menores
 * - 'mal': Daño considerable o requiere reparación inmediata
 * - 'na': No aplica para el vehículo evaluado
 */
export type ValoracionChecklist = 'bien' | 'regular' | 'mal' | 'na';

/**
 * Calificación registrada para un ítem del checklist por el usuario.
 */
export interface ChecklistItemEval {
  /** Identificador del ítem calificado */
  id: string;
  /** Valoración asignada */
  valoracion: ValoracionChecklist;
}

/**
 * Estimación de costo para una reparación o mantenimiento requerido.
 */
export interface CostoReparacion {
  /** Identificador único de la reparación */
  id: string;
  /** Descripción del arreglo o repuesto requerido */
  descripcion: string;
  /** Valor estimado de la reparación en pesos colombianos (COP) */
  costoEstimado: number;
  /** Indica si se generó automáticamente a partir de un ítem marcado 'mal' o 'regular' en el checklist */
  fromChecklist: boolean;
}

/**
 * Estado completo de una sesión de evaluación de un vehículo.
 */
export interface Evaluacion {
  /** Identificador único de la evaluación (ej. UUID) */
  id: string;
  /** Fecha y hora de creación de la evaluación en formato ISO */
  fecha: string;
  /** Datos básicos y de odómetro */
  datosBasicos: DatosBasicos;
  /** Historial legal y antecedentes de tránsito */
  antecedentesLegales: AntecedentesLegales;
  /** Listado de ítems evaluados en el checklist */
  checklistItems: ChecklistItemEval[];
  /** Presupuesto de costos de reparación identificados */
  costosReparacion: CostoReparacion[];
  /** Precio de venta publicado o solicitado por el vendedor (en COP) */
  precioVenta: number;
  /** Paso actual en el flujo guiado de la aplicación */
  pasoActual: number;
}

/**
 * Veredicto definitivo emitido por el algoritmo de CarCheck.
 */
export type VeredictoFinal = 'excelente' | 'aceptable' | 'riesgoso' | 'no_comprar';

/**
 * Resultado integral final de la evaluación del vehículo.
 */
export interface ResultadoFinal {
  /** Puntuación global ponderada (0 - 100) */
  porcentajeGlobal: number;
  /** Puntuación porcentual obtenida en kilometraje (0 - 100) */
  porcentajeKilometraje: number;
  /** Puntuación porcentual obtenida en módulo legal (0 - 100) */
  porcentajeLegales: number;
  /** Puntuación porcentual obtenida en checklist físico y mecánico (0 - 100) */
  porcentajeChecklist: number;
  /** Veredicto final del algoritmo */
  veredicto: VeredictoFinal;
  /** Mensaje explicativo y recomendación de negociación asociada al veredicto */
  mensajeVeredicto: string;
  /** Indica si el vehículo fue descartado categóricamente por una falla crítica */
  esDescarte: boolean;
  /** Motivo principal de descarte en caso de aplicar */
  motivoDescarte?: string;
  /** Listado unificado de todas las alertas generadas en los módulos */
  alertas: Alerta[];
  /** Monto total estimado necesario para reparaciones inmediatas (en COP) */
  totalReparaciones: number;
  /** Precio sugerido de compra/oferta tras descontar reparaciones y riesgos (en COP) */
  precioSugerido: number;
}
