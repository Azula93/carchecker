/**
 * Script de importación de tablas oficiales de base gravable de MinTransporte (Resolución 20253040048935).
 * Procesa los archivos XLSX oficiales situados en data/impuesto-vehicular/{vigencia}/raw/
 * y genera los archivos JSON normalizados en src/data/impuesto-vehicular/{vigencia}/.
 *
 * Ejecución: npx tsx scripts/import-impuesto-vehicular.ts [vigencia]
 */

import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';
import type { CategoriaTablaImpuesto, RegistroVehiculoImpuesto } from '../src/types/external-data';

interface ConfiguracionTabla {
  codigo: CategoriaTablaImpuesto;
  nombre: string;
  nombreArchivo: string;
  nombresAlternativos: string[];
  hojaSugerida?: string;
  columnaMarca?: string[];
  columnaLinea?: string[];
  columnaCilindraje?: string[];
  columnaCapacidad?: string[];
}

const TABLAS_OFICIALES: ConfiguracionTabla[] = [
  {
    codigo: 'automoviles',
    nombre: 'Tabla 1.- Automóviles',
    nombreArchivo: 'tabla_1_automoviles.xlsx',
    nombresAlternativos: ['Tabla 1.- Automóviles.xlsx', 'Tabla 1.- Automoviles.xlsx', 'tabla_1.xlsx', 'automoviles.xlsx'],
  },
  {
    codigo: 'camionetas_camperos',
    nombre: 'Tabla 2.- Camionetas y Camperos',
    nombreArchivo: 'tabla_2_camionetas_camperos.xlsx',
    nombresAlternativos: ['Tabla 2.- Camionetas y Camperos.xlsx', 'tabla_2.xlsx', 'camionetas_camperos.xlsx'],
  },
  {
    codigo: 'doble_cabina',
    nombre: 'Tabla 3.- Camionetas Doble Cabina',
    nombreArchivo: 'tabla_3_doble_cabina.xlsx',
    nombresAlternativos: ['Tabla 3.- Camionetas Doble Cabina.xlsx', 'tabla_3.xlsx', 'doble_cabina.xlsx'],
  },
  {
    codigo: 'electricos',
    nombre: 'Tabla 4.- Eléctricos',
    nombreArchivo: 'tabla_4_electricos.xlsx',
    nombresAlternativos: ['Tabla 4.- Eléctricos.xlsx', 'Tabla 4.- Electricos.xlsx', 'tabla_4.xlsx', 'electricos.xlsx'],
  },
  {
    codigo: 'motocicletas',
    nombre: 'Tabla 5.- Motocicletas, Motocarros, Cuatrimotos y relacionados',
    nombreArchivo: 'tabla_5_motos.xlsx',
    nombresAlternativos: [
      'Tabla 5.- Motocicletas, Motocarros, Cuatrimotos, Mototriciclos, Motocicletas Eléctricas y Motocarros Eléctricos.xlsx',
      'tabla_5.xlsx',
      'motocicletas.xlsx',
      'motos.xlsx',
    ],
  },
  {
    codigo: 'pasajeros',
    nombre: 'Tabla 6.- Pasajeros',
    nombreArchivo: 'tabla_6_pasajeros.xlsx',
    nombresAlternativos: ['Tabla 6.- Pasajeros.xlsx', 'tabla_6.xlsx', 'pasajeros.xlsx'],
  },
  {
    codigo: 'carga',
    nombre: 'Tabla 7.- Carga',
    nombreArchivo: 'tabla_7_carga.xlsx',
    nombresAlternativos: ['Tabla 7.- Carga.xlsx', 'tabla_7.xlsx', 'carga.xlsx'],
  },
  {
    codigo: 'ambulancias',
    nombre: 'Tabla 8.- Ambulancias',
    nombreArchivo: 'tabla_8_ambulancias.xlsx',
    nombresAlternativos: ['Tabla 8.- Ambulancias.xlsx', 'tabla_8.xlsx', 'ambulancias.xlsx'],
  },
  {
    codigo: 'hibridos',
    nombre: 'Tabla 9.- Híbridos',
    nombreArchivo: 'tabla_9_hibridos.xlsx',
    nombresAlternativos: ['Tabla 9.- Híbridos.xlsx', 'Tabla 9.- Hibridos.xlsx', 'tabla_9.xlsx', 'hibridos.xlsx'],
  },
];

interface ResumenImportacion {
  vigencia: number;
  tabla: string;
  codigo: CategoriaTablaImpuesto;
  archivo: string;
  registrosLeidos: number;
  registrosValidos: number;
  registrosRechazados: number;
  registrosDuplicados: number;
  resultado: 'OK' | 'ERROR' | 'OMITIDO_SIN_ARCHIVO';
  motivoError?: string;
}

function limpiarTexto(val: unknown): string {
  if (val === null || val === undefined) return '';
  if (typeof val === 'string') return val.trim();
  if (typeof val === 'number') return String(val).trim();
  if (typeof val === 'object') {
    // Si ExcelJS entrega { text: '...', result: '...' }
    const obj = val as Record<string, unknown>;
    if (obj.text) return String(obj.text).trim();
    if (obj.result) return String(obj.result).trim();
  }
  return String(val).trim();
}

function parsearNumero(val: unknown): number | null {
  if (val === null || val === undefined) return null;
  if (typeof val === 'number') return isNaN(val) ? null : val;
  const str = limpiarTexto(val).replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(str);
  return isNaN(num) ? null : num;
}

function normalizarClave(texto: string): string {
  return texto
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Z0-9]/g, '');
}

/**
 * Procesa un archivo XLSX de una tabla de MinTransporte
 */
async function procesarArchivoXLSX(
  rutaArchivo: string,
  config: ConfiguracionTabla
): Promise<{ registros: RegistroVehiculoImpuesto[]; resumen: Omit<ResumenImportacion, 'vigencia' | 'tabla' | 'codigo' | 'archivo'> }> {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(rutaArchivo);

  const worksheet = workbook.worksheets[0];
  if (!worksheet) {
    throw new Error(`El libro ${path.basename(rutaArchivo)} no contiene hojas legibles.`);
  }

  // 1. Detectar fila de encabezados (buscando columnas MARCA, LINEA, etc.)
  let filaEncabezados = -1;
  const mapaColumnas: Record<string, number> = {};
  const columnasAnios: Array<{ columna: number; anio: number }> = [];

  worksheet.eachRow((row, rowNumber) => {
    if (filaEncabezados !== -1) return;

    let tieneMarca = false;
    let tieneLinea = false;

    row.eachCell((cell) => {
      const texto = normalizarClave(limpiarTexto(cell.value));
      if (texto.includes('MARCA')) tieneMarca = true;
      if (texto.includes('LINEA') || texto.includes('REFERENCIA')) tieneLinea = true;
    });

    if (tieneMarca && tieneLinea) {
      filaEncabezados = rowNumber;
      row.eachCell((cell, colNumber) => {
        const raw = limpiarTexto(cell.value);
        const norm = normalizarClave(raw);

        if (norm.includes('MARCA') && !mapaColumnas['marca']) mapaColumnas['marca'] = colNumber;
        else if ((norm.includes('LINEA') || norm.includes('REFERENCIA')) && !mapaColumnas['linea']) mapaColumnas['linea'] = colNumber;
        else if ((norm.includes('CILINDRAJE') || norm.includes('CILINDRADA') || norm === 'CC' || norm === 'CM3') && !mapaColumnas['cilindraje']) mapaColumnas['cilindraje'] = colNumber;
        else if ((norm.includes('CAPACIDAD') || norm.includes('TON') || norm.includes('PASAJ')) && !mapaColumnas['capacidad']) mapaColumnas['capacidad'] = colNumber;
      });

      // Detectar años en la fila de encabezados (o en la fila siguiente, que es estándar en MinTransporte)
      const filasAInspeccionar = [rowNumber, rowNumber + 1];
      for (const fNum of filasAInspeccionar) {
        if (fNum > worksheet.rowCount) continue;
        const fRow = worksheet.getRow(fNum);
        fRow.eachCell((cell, colNumber) => {
          const cellRaw = limpiarTexto(cell.value);
          // Detectar años individuales o '2001 y Anteriores' -> 2001
          const matchAnio = cellRaw.match(/\b(19\d\d|20\d\d)\b/);
          if (matchAnio) {
            const anioNum = parseInt(matchAnio[1], 10);
            if (anioNum >= 1970 && anioNum <= 2030) {
              if (!columnasAnios.some((ca) => ca.columna === colNumber)) {
                columnasAnios.push({ columna: colNumber, anio: anioNum });
              }
            }
          }
        });
      }
    }
  });

  if (filaEncabezados === -1 || !mapaColumnas['marca'] || !mapaColumnas['linea']) {
    throw new Error(
      `No se pudo identificar la estructura de columnas requeridas (MARCA, LÍNEA) en la hoja '${worksheet.name}' del archivo ${path.basename(rutaArchivo)}.`
    );
  }

  if (columnasAnios.length === 0) {
    throw new Error(
      `No se detectaron columnas correspondientes a años de modelos fiscales en ${path.basename(rutaArchivo)}.`
    );
  }

  // Ordenar columnas de años
  columnasAnios.sort((a, b) => a.anio - b.anio);

  // 2. Determinar fila de inicio de datos (después de la fila de encabezados y de años)
  const filaInicioDatos = filaEncabezados + 2; // Fila 6 en formato estándar MinTransporte

  // 3. Iterar filas de datos
  const registrosMap = new Map<string, RegistroVehiculoImpuesto>();
  let registrosLeidos = 0;
  let registrosValidos = 0;
  let registrosRechazados = 0;
  let registrosDuplicados = 0;

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber < filaInicioDatos) return;
    registrosLeidos++;

    const marcaRaw = limpiarTexto(row.getCell(mapaColumnas['marca']).value).toUpperCase();
    const lineaRaw = limpiarTexto(row.getCell(mapaColumnas['linea']).value).toUpperCase();

    if (!marcaRaw || !lineaRaw || marcaRaw.length < 2) {
      registrosRechazados++;
      return;
    }

    let cilindraje: number | undefined;
    if (mapaColumnas['cilindraje']) {
      const cellCil = row.getCell(mapaColumnas['cilindraje']).value;
      const parsedCil = parsearNumero(cellCil);
      if (parsedCil && parsedCil > 0) cilindraje = Math.round(parsedCil);
    }

    let capacidad: number | undefined;
    if (mapaColumnas['capacidad']) {
      const parsedCap = parsearNumero(row.getCell(mapaColumnas['capacidad']).value);
      if (parsedCap && parsedCap > 0) capacidad = parsedCap;
    }

    const valoresPorModelo: Record<number, number> = {};
    let tieneAlMenosUnValor = false;

    for (const colAnio of columnasAnios) {
      const cellVal = row.getCell(colAnio.columna).value;
      const parsed = parsearNumero(cellVal);
      if (parsed !== null && parsed > 0) {
        // En MinTransporte los avalúos oficiales están en miles de pesos ($24.280 -> $24.280.000 COP)
        const valorRealCOP = Math.round(parsed * 1000);
        valoresPorModelo[colAnio.anio] = valorRealCOP;
        tieneAlMenosUnValor = true;
      }
    }

    if (!tieneAlMenosUnValor) {
      registrosRechazados++;
      return;
    }

    // Columna 3 suele contener el ID oficial del SIBGA / MinTransporte
    const idOficialSibga = limpiarTexto(row.getCell(3).value);
    const idGenerado = idOficialSibga
      ? `${config.codigo}-${idOficialSibga}-${normalizarClave(marcaRaw)}-${normalizarClave(lineaRaw)}`
      : `${config.codigo}-${rowNumber}-${normalizarClave(marcaRaw)}-${normalizarClave(lineaRaw)}`;

    if (registrosMap.has(idGenerado)) {
      registrosDuplicados++;
      const existente = registrosMap.get(idGenerado)!;
      Object.assign(existente.valoresPorModelo, valoresPorModelo);
    } else {
      registrosValidos++;
      registrosMap.set(idGenerado, {
        id: idGenerado,
        marca: marcaRaw,
        linea: lineaRaw,
        cilindraje,
        capacidad,
        categoriaTabla: config.codigo,
        valoresPorModelo,
      });
    }
  });

  return {
    registros: Array.from(registrosMap.values()),
    resumen: {
      registrosLeidos,
      registrosValidos,
      registrosRechazados,
      registrosDuplicados,
      resultado: 'OK',
    },
  };
}

async function main() {
  const vigenciaArg = process.argv[2] ? parseInt(process.argv[2], 10) : 2026;
  const vigencia = isNaN(vigenciaArg) ? 2026 : vigenciaArg;

  const rutaRaw = path.resolve(process.cwd(), 'data', 'impuesto-vehicular', String(vigencia), 'raw');
  const rutaDestino = path.resolve(process.cwd(), 'src', 'data', 'impuesto-vehicular', String(vigencia));

  console.log('================================================================');
  console.log(`IMPORTADOR OFICIAL DE IMPUESTO VEHICULAR - COLOMBIA`);
  console.log(`Vigencia Fiscal: ${vigencia}`);
  console.log(`Carpeta de entrada (raw): ${rutaRaw}`);
  console.log(`Carpeta de salida (JSON): ${rutaDestino}`);
  console.log('================================================================\n');

  if (!fs.existsSync(rutaRaw)) {
    console.error(`❌ La carpeta de entrada '${rutaRaw}' no existe.`);
    process.exit(1);
  }

  if (!fs.existsSync(rutaDestino)) {
    fs.mkdirSync(rutaDestino, { recursive: true });
  }

  const archivosEnRaw = fs.readdirSync(rutaRaw);
  const resumenes: ResumenImportacion[] = [];

  for (const config of TABLAS_OFICIALES) {
    // Buscar archivo correspondiente
    const posiblesNombres = [config.nombreArchivo, ...config.nombresAlternativos];
    const archivoEncontrado = archivosEnRaw.find((f) =>
      posiblesNombres.some((pn) => pn.toLowerCase() === f.toLowerCase())
    );

    if (!archivoEncontrado) {
      console.log(`⚠️  [${config.nombre}] Omitida: No se encontró archivo XLSX en raw.`);
      // Si la tabla no está disponible, asegurarse de que no haya datos inventados o antiguos en el JSON destino
      const nombreSalida = `${config.codigo.replace('_', '-')}.json`;
      const rutaSalida = path.join(rutaDestino, nombreSalida);
      fs.writeFileSync(rutaSalida, JSON.stringify([], null, 2), 'utf-8');

      resumenes.push({
        vigencia,
        tabla: config.nombre,
        codigo: config.codigo,
        archivo: config.nombreArchivo,
        registrosLeidos: 0,
        registrosValidos: 0,
        registrosRechazados: 0,
        registrosDuplicados: 0,
        resultado: 'OMITIDO_SIN_ARCHIVO',
      });
      continue;
    }

    const rutaCompleta = path.join(rutaRaw, archivoEncontrado);
    console.log(`⏳ Procesando [${config.nombre}] desde '${archivoEncontrado}'...`);

    try {
      const { registros, resumen } = await procesarArchivoXLSX(rutaCompleta, config);

      // Guardar archivo JSON normalizado
      const nombreSalida = `${config.codigo.replace('_', '-')}.json`;
      const rutaSalida = path.join(rutaDestino, nombreSalida);
      fs.writeFileSync(rutaSalida, JSON.stringify(registros, null, 2), 'utf-8');

      console.log(`   ✅ Guardado exitoso: ${nombreSalida} (${registros.length} registros)`);

      resumenes.push({
        vigencia,
        tabla: config.nombre,
        codigo: config.codigo,
        archivo: archivoEncontrado,
        ...resumen,
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error(`   ❌ Error al procesar ${config.nombre}: ${errorMsg}`);
      resumenes.push({
        vigencia,
        tabla: config.nombre,
        codigo: config.codigo,
        archivo: archivoEncontrado,
        registrosLeidos: 0,
        registrosValidos: 0,
        registrosRechazados: 0,
        registrosDuplicados: 0,
        resultado: 'ERROR',
        motivoError: errorMsg,
      });
    }
  }

  // Generar o actualizar metadata.json con conteos reales y estado de disponibilidad
  const rutaMetadata = path.join(rutaDestino, 'metadata.json');
  let metadataExistente: Record<string, unknown> = {};
  if (fs.existsSync(rutaMetadata)) {
    try {
      metadataExistente = JSON.parse(fs.readFileSync(rutaMetadata, 'utf-8'));
    } catch {
      // Ignorar error al parsear si estuviera corrupto
    }
  }

  const estadoCategorias: Record<string, unknown> = {};
  for (const r of resumenes) {
    if (r.resultado === 'OK') {
      estadoCategorias[r.codigo] = {
        status: 'available',
        registros: r.registrosValidos,
        archivo: r.archivo,
      };
    } else {
      estadoCategorias[r.codigo] = {
        status: 'not_available',
        razon: 'Archivo XLSX oficial 2026 no disponible para descarga manual actualmente.',
      };
    }
  }

  metadataExistente.fechaImportacion = new Date().toISOString();
  metadataExistente.estadoCategorias = estadoCategorias;
  metadataExistente.resumenImportacion = resumenes;
  fs.writeFileSync(rutaMetadata, JSON.stringify(metadataExistente, null, 2), 'utf-8');

  console.log('\n================================================================');
  console.log('RESUMEN DEL PROCESO DE IMPORTACIÓN:');
  console.log('================================================================');
  console.table(
    resumenes.map((r) => ({
      Tabla: r.tabla.slice(0, 30),
      Resultado: r.resultado,
      Leídos: r.registrosLeidos,
      Válidos: r.registrosValidos,
      Rechazados: r.registrosRechazados,
      Duplicados: r.registrosDuplicados,
    }))
  );
}

main().catch((e) => {
  console.error('Error no controlado en la importación:', e);
  process.exit(1);
});
