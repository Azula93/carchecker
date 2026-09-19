import { Evaluacion, ResultadoFinal } from '../types/evaluation';
import { formatCOP } from '../data/repair-costs';

/**
 * Función que abre la ventana de impresión optimizada para PDF de Car Checker.
 */
export function imprimirReportePDF(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}

/**
 * Genera el texto estructurado para compartir por WhatsApp o portapapeles.
 */
export function generarResumenTexto(evaluacion: Evaluacion, resultado: ResultadoFinal): string {
  const vehiculo = `${evaluacion.datosBasicos.lineaVehiculo || 'Vehículo'} (${evaluacion.datosBasicos.anioModelo})`;
  const placa = evaluacion.datosBasicos.placa ? `[Placa ${evaluacion.datosBasicos.placa.toUpperCase()}]` : '';
  const km = `${evaluacion.datosBasicos.kilometraje.toLocaleString('es-CO')} km`;

  let estadoTexto = 'ESTIMACIÓN FAVORABLE';
  if (resultado.esDescarte) {
    estadoTexto = 'CRITERIO DE DESCARTE';
  } else if (resultado.veredicto === 'no_comprar') {
    estadoTexto = 'RIESGO ELEVADO (<50%)';
  } else if (resultado.veredicto === 'riesgoso') {
    estadoTexto = 'PRECAUCIÓN (50-64%)';
  } else if (resultado.veredicto === 'aceptable') {
    estadoTexto = 'FAVORABLE CON CONDICIONES (65-79%)';
  }

  const texto = `*Reporte Car Checker — Estimación Preliminar*
*Vehículo:* ${vehiculo} ${placa}
*Recorrido:* ${km}
*Puntuación Estimada:* ${resultado.porcentajeGlobal}/100 — ${estadoTexto}

*Resumen por Áreas:*
• Kilometraje: ${resultado.porcentajeKilometraje}%
• Antecedentes Legales: ${resultado.porcentajeLegales}%
• Inspección Física: ${resultado.porcentajeChecklist}%

*Balance Financiero de Referencia:*
• Estimado en arreglos sugeridos: ${formatCOP(resultado.totalReparaciones)}
${evaluacion.precioVenta > 0 ? `• Precio publicado: ${formatCOP(evaluacion.precioVenta)}\n• Oferta sugerida de referencia: ${formatCOP(resultado.precioSugerido)}` : ''}

${resultado.alertas.length > 0 ? `*Señales de alerta registradas:* ${resultado.alertas.length}` : '• Sin alertas críticas'}

Generado con Car Checker Colombia (Revisión y estimación preliminar).
_Aviso: Esta estimación es únicamente orientativa y se basa en los datos ingresados. No sustituye un peritaje técnico en un CDA ni una cotización formal en talleres o almacenes._`;

  return texto;
}
