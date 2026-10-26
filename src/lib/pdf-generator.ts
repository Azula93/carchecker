import { Evaluacion, ResultadoFinal } from '../types/evaluation';
import { formatCOP } from '../data/repair-costs';

/**
 * Función que abre la ventana de impresión optimizada para PDF de EscaneApp.
 */
export function imprimirReportePDF(): void {
  if (typeof window !== 'undefined') {
    window.print();
  }
}

/**
 * Genera el texto estructurado para compartir por WhatsApp o portapapeles.
 * Redactado en lenguaje claro y cercano para compradores en Colombia.
 */
export function generarResumenTexto(evaluacion: Evaluacion, resultado: ResultadoFinal): string {
  const vehiculo = `${evaluacion.datosBasicos.lineaVehiculo || 'Vehículo'} (${evaluacion.datosBasicos.anioModelo || ''})`.trim();
  const placa = evaluacion.datosBasicos.placa ? `[Placa ${evaluacion.datosBasicos.placa.toUpperCase()}]` : '';
  const km = `${(evaluacion.datosBasicos.kilometraje || 0).toLocaleString('es-CO')} km`;

  let estadoTexto = 'BUENA OPCIÓN';
  if (resultado.esDescarte) {
    estadoTexto = '¡NO COMPRAR! (RIESGO ALTO)';
  } else if (resultado.veredicto === 'no_comprar') {
    estadoTexto = 'NO RECOMENDADO (<50%)';
  } else if (resultado.veredicto === 'riesgoso') {
    estadoTexto = 'CUIDADO / TIENE DETALLES (50-64%)';
  } else if (resultado.veredicto === 'aceptable') {
    estadoTexto = 'ACEPTABLE CON ARREGLOS (65-79%)';
  }

  const lineas: string[] = [
    `🚗 *Resumen de Revisión — EscaneApp Colombia*`,
    `*Carro:* ${vehiculo} ${placa}`,
    `*Kilometraje registrado:* ${km}`,
    `*Puntaje del Carro:* ${resultado.porcentajeGlobal}/100 (${estadoTexto})`,
    '',
    `📋 *Calificación por partes:*`,
    `• Kilometraje frente a sus años: ${resultado.porcentajeKilometraje}%`,
    `• Papeles y multas (RUNT / SIMIT): ${resultado.porcentajeLegales}%`,
    `• Estado físico (motor, pintura, llantas): ${resultado.porcentajeChecklist}%`,
    '',
    `💰 *Cuentas y propuesta para negociar:*`,
    `• Gasto estimado en arreglos: ~${formatCOP(resultado.totalReparaciones)}`,
  ];

  if (evaluacion.precioVenta > 0) {
    lineas.push(`• Precio que pide el vendedor: ${formatCOP(evaluacion.precioVenta)}`);
    lineas.push(`• Oferta máxima sugerida para hacerle: ${formatCOP(resultado.precioSugerido)}`);
  }

  lineas.push('');
  if (resultado.alertas.length > 0) {
    lineas.push(`⚠️ *Puntos de atención detectados:* ${resultado.alertas.length}`);
  } else {
    lineas.push(`✅ Sin alertas críticas detectadas.`);
  }

  lineas.push('');
  lineas.push(`Revisado con EscaneApp Colombia · https://escaneapp.com`);
  lineas.push(`_Nota: Esta revisión es una guía inicial práctica para saber si el carro vale la pena y negociar el precio. Antes de pagar o firmar traspaso, haz siempre el peritaje técnico oficial._`);

  return lineas.join('\n');
}

