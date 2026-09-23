/**
 * Suite de pruebas automatizadas para el cálculo del Impuesto Vehicular 2026.
 *
 * Ejecución: npx tsx scripts/test-impuesto-vehicular.ts
 */

import {
  calculateVehicleTax,
  consultarImpuestoVehicular,
  normalizarCategoriaImpuesto,
} from '../src/lib/services/impuesto-vehicular-service';
import tarifas2026 from '../src/data/impuesto-vehicular/tarifas/2026.json';

let pasadas = 0;
let fallidas = 0;

function assert(condicion: boolean, descripcion: string) {
  if (condicion) {
    console.log(`✅ PASS: ${descripcion}`);
    pasadas++;
  } else {
    console.error(`❌ FAIL: ${descripcion}`);
    fallidas++;
  }
}

function runTests() {
  console.log('================================================================');
  console.log('EJECUTANDO SUITE DE PRUEBAS: IMPUESTO VEHICULAR 2026 (COLOMBIA)');
  console.log('================================================================\n');

  // 1. Vehículo con base <= 57.349.000 (ej. $45.000.000)
  const t1 = calculateVehicleTax(45000000, tarifas2026, 'automoviles');
  assert(t1.tarifa === 0.015, 'Base $45.000.000 aplica tarifa 1,5%');
  assert(t1.impuestoAnual === 675000, 'Base $45.000.000 genera impuesto anual de $675.000');
  assert(t1.provisionMensual === 56250, 'Provisión mensual para $675.000 es $56.250');

  // 2. Vehículo con base entre 57.349.001 y 129.032.000 (ej. $80.000.000)
  const t2 = calculateVehicleTax(80000000, tarifas2026, 'automoviles');
  assert(t2.tarifa === 0.025, 'Base $80.000.000 aplica tarifa 2,5%');
  assert(t2.impuestoAnual === 2000000, 'Base $80.000.000 genera impuesto anual de $2.000.000');
  assert(t2.provisionMensual === 166667, 'Provisión mensual para $2.000.000 es $166.667');

  // 3. Vehículo con base > 129.032.000 (ej. $150.000.000)
  const t3 = calculateVehicleTax(150000000, tarifas2026, 'automoviles');
  assert(t3.tarifa === 0.035, 'Base $150.000.000 aplica tarifa 3,5%');
  assert(t3.impuestoAnual === 5250000, 'Base $150.000.000 genera impuesto anual de $5.250.000');
  assert(t3.provisionMensual === 437500, 'Provisión mensual para $5.250.000 es $437.500');

  // 4. Límite exacto: $57.349.000 (debe ser 1,5%)
  const t4 = calculateVehicleTax(57349000, tarifas2026, 'automoviles');
  assert(t4.tarifa === 0.015, 'Límite exacto $57.349.000 tributa al 1,5%');
  assert(t4.impuestoAnual === 860235, 'Impuesto anual para límite $57.349.000 es $860.235');

  // 5. Límite exacto: $57.349.001 (debe pasar a 2,5%)
  const t5 = calculateVehicleTax(57349001, tarifas2026, 'automoviles');
  assert(t5.tarifa === 0.025, 'Límite superior + 1 ($57.349.001) tributa al 2,5%');

  // 6. Límite exacto: $129.032.000 (debe ser 2,5%)
  const t6 = calculateVehicleTax(129032000, tarifas2026, 'automoviles');
  assert(t6.tarifa === 0.025, 'Límite exacto $129.032.000 tributa al 2,5%');
  assert(t6.impuestoAnual === 3225800, 'Impuesto anual para límite $129.032.000 es $3.225.800');

  // 7. Límite exacto: $129.032.001 (debe pasar a 3,5%)
  const t7 = calculateVehicleTax(129032001, tarifas2026, 'automoviles');
  assert(t7.tarifa === 0.035, 'Límite superior + 1 ($129.032.001) tributa al 3,5%');

  // 8. Vehículo eléctrico (Ley 1964 de 2019: tarifa 1,0%)
  const t8 = calculateVehicleTax(120000000, tarifas2026, 'electricos');
  assert(t8.tarifa === 0.01, 'Vehículo eléctrico aplica tarifa fija del 1,0%');
  assert(t8.impuestoAnual === 1200000, 'Impuesto eléctrico $120.000.000 es $1.200.000');

  // 9. Motocicleta <= 125 cc (Exenta: tarifa 0,0%)
  const t9 = calculateVehicleTax(7000000, tarifas2026, 'motocicletas', 124);
  assert(t9.tarifa === 0.0, 'Moto <= 125cc aplica tarifa 0,0% (Exenta)');
  assert(t9.impuestoAnual === 0, 'Impuesto moto <= 125cc es $0');

  // 10. Motocicleta > 125 cc (Tarifa 1,5%)
  const t10 = calculateVehicleTax(17500000, tarifas2026, 'motocicletas', 155);
  assert(t10.tarifa === 0.015, 'Moto > 125cc aplica tarifa 1,5%');
  assert(t10.impuestoAnual === 262500, 'Impuesto moto 155cc es $262.500');

  // 11. Vehículo híbrido (debe retornar special_case)
  const t11 = calculateVehicleTax(138000000, tarifas2026, 'hibridos');
  assert(t11.status === 'special_case', 'Híbrido retorna status special_case');

  // 12. Consulta de vehículo real importado: Mazda 3 (ID oficial MinTransporte: automoviles-27776-MAZDA-3)
  const c1 = consultarImpuestoVehicular({
    categoria: 'automoviles',
    idVehiculo: 'automoviles-27776-MAZDA-3',
    anioModelo: 2022,
    vigencia: 2026,
  });
  assert(c1.success === true, 'Consulta Mazda 3 2022 con ID real es exitosa');
  assert(c1.data?.baseGravable === 56620000, 'Base gravable oficial Mazda 3 2022 es $56.620.000 COP');
  assert(c1.data?.tarifa === 0.015, 'Tarifa para $56.620.000 es 1,5%');
  assert(c1.data?.impuestoAnualEstimado === 849300, 'Impuesto anual Mazda 3 2022 es $849.300');
  assert(c1.data?.provisionMensual === 70775, 'Provisión mensual Mazda 3 2022 es $70.775');
  assert(c1.data?.fuente.resolucion === '20253040048935', 'Resolución fuente oficial es 20253040048935');

  // 13. Manejo de modelos antiguos agrupados ("2001 y Anteriores"): modelo 1998
  const cAntiguo = consultarImpuestoVehicular({
    categoria: 'automoviles',
    idVehiculo: 'automoviles-27776-MAZDA-3',
    anioModelo: 1998,
    vigencia: 2026,
  });
  assert(cAntiguo.success === true, 'Modelo 1998 resuelve usando columna 2001 y Anteriores');
  assert(cAntiguo.data?.baseGravable === 6890000, 'Base gravable modelo 1998 toma columna 2001 ($6.890.000 COP)');
  assert(cAntiguo.data?.impuestoAnualEstimado === 103350, 'Impuesto anual modelo 1998 es $103.350 COP');

  // 14. Manejo de modelo 2026 (referencia modelo 2025 según resolución)
  const c2026 = consultarImpuestoVehicular({
    categoria: 'automoviles',
    idVehiculo: 'automoviles-27776-MAZDA-3',
    anioModelo: 2026,
    vigencia: 2026,
  });
  assert(c2026.success === true, 'Modelo 2026 resuelve con base de referencia 2025');
  assert(c2026.data?.baseGravable === 70790000, 'Base gravable modelo 2026 toma referencia 2025 ($70.790.000 COP)');
  assert(c2026.data?.tarifa === 0.025, 'Tarifa para $70.790.000 es 2,5%');
  assert(c2026.data?.impuestoAnualEstimado === 1769750, 'Impuesto anual modelo 2026 es $1.769.750 COP');

  // 15. Consulta en categorías NO disponibles: pasajeros, carga, ambulancias
  const cPasajeros = consultarImpuestoVehicular({
    categoria: 'pasajeros',
    linea: 'BUSETA URBANA',
    anioModelo: 2022,
    vigencia: 2026,
  });
  assert(cPasajeros.status === 'not_available', 'Categoría pasajeros no importada retorna status not_available');
  assert(
    cPasajeros.message?.includes('no disponible para descarga manual') === true,
    'Mensaje de no disponible contiene el motivo oficial'
  );

  const cCarga = consultarImpuestoVehicular({
    categoria: 'carga',
    linea: 'CAMION',
    anioModelo: 2022,
    vigencia: 2026,
  });
  assert(cCarga.status === 'not_available', 'Categoría carga no importada retorna status not_available');

  const cAmbulancias = consultarImpuestoVehicular({
    categoria: 'ambulancias',
    linea: 'AMBULANCIA',
    anioModelo: 2022,
    vigencia: 2026,
  });
  assert(cAmbulancias.status === 'not_available', 'Categoría ambulancias no importada retorna status not_available');

  // 16. Consulta de vehículo real híbrido (special_case tributario)
  const cHibrido = consultarImpuestoVehicular({
    categoria: 'hibridos',
    marca: 'AUDI',
    linea: 'A3 Sportback e-tron',
    anioModelo: 2022,
    vigencia: 2026,
  });
  assert(cHibrido.success === true, 'Consulta de híbrido real es exitosa');
  assert(cHibrido.status === 'special_case', 'Híbrido retorna status special_case indicando competencia departamental');

  // 17. Consulta de vehículo real eléctrico (tarifa fija 1.0%)
  const cElectrico = consultarImpuestoVehicular({
    categoria: 'electricos',
    marca: 'AUDI',
    linea: 'A6 E-TRON',
    anioModelo: 2022,
    vigencia: 2026,
  });
  assert(cElectrico.success === true, 'Consulta de eléctrico real es exitosa');
  assert(cElectrico.data?.tarifa === 0.01, 'Eléctrico aplica tarifa 1,0% por Ley 1964 de 2019');
  assert(cElectrico.data?.baseGravable === 235040000, 'Base gravable eléctrico Audi A6 es $235.040.000 COP');
  assert(cElectrico.data?.impuestoAnualEstimado === 2350400, 'Impuesto anual eléctrico es $2.350.400 COP');

  // 18. Vehículo no encontrado (not_found)
  const cNotFound = consultarImpuestoVehicular({
    categoria: 'automoviles',
    linea: 'MODELO_TOTALMENTE_INEXISTENTE_XYZ_999',
    anioModelo: 2022,
  });
  assert(cNotFound.status === 'not_found', 'Vehículo inexistente retorna status not_found');

  // 19. Datos insuficientes (insufficient_data) por falta de año modelo
  const cInsuf = consultarImpuestoVehicular({
    categoria: 'automoviles',
    linea: 'MAZDA 3',
  });
  assert(cInsuf.status === 'insufficient_data', 'Sin año modelo retorna insufficient_data');

  // 20. Vigencia no disponible (not_available)
  const cVigencia = consultarImpuestoVehicular({
    categoria: 'automoviles',
    linea: 'MAZDA 3',
    anioModelo: 2022,
    vigencia: 2028,
  });
  assert(cVigencia.status === 'not_available', 'Vigencia 2028 sin cargar retorna not_available');

  // 21. Normalización de categorías
  assert(normalizarCategoriaImpuesto('SUV') === 'camionetas_camperos', 'Infiere SUV como camionetas_camperos');
  assert(normalizarCategoriaImpuesto('SEDAN') === 'automoviles', 'Infiere SEDAN como automoviles');
  assert(normalizarCategoriaImpuesto('MOTO') === 'motocicletas', 'Infiere MOTO como motocicletas');
  assert(normalizarCategoriaImpuesto('ELECTRICO') === 'electricos', 'Infiere ELECTRICO como electricos');
  assert(normalizarCategoriaImpuesto('HIBRIDO') === 'hibridos', 'Infiere HIBRIDO como hibridos');

  console.log('\n================================================================');
  console.log(`RESULTADO DE LA SUITE: ${pasadas} PASADAS, ${fallidas} FALLIDAS`);
  console.log('================================================================');

  if (fallidas > 0) {
    process.exit(1);
  }
}

runTests();
