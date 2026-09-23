import fs from 'fs';
import path from 'path';
import ExcelJS from 'exceljs';

const rawDir = path.resolve(process.cwd(), 'data', 'impuesto-vehicular', '2026', 'raw');
const files = fs.readdirSync(rawDir).filter((f) => f.endsWith('.xlsx'));

async function inspectAll() {
  console.log(`Archivos encontrados en raw: ${files.length}\n`);

  for (const filename of files) {
    const filepath = path.join(rawDir, filename);
    const stats = fs.statSync(filepath);
    console.log('================================================================');
    console.log(`ARCHIVO: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
    console.log('================================================================');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filepath);

    console.log(`Hojas (${workbook.worksheets.length}):`, workbook.worksheets.map((w) => w.name));

    const sheet = workbook.worksheets[0];
    if (!sheet) {
      console.log('Sin hojas legibles');
      continue;
    }

    console.log(`Filas totales en '${sheet.name}': ${sheet.rowCount}`);
    console.log(`Columnas totales: ${sheet.columnCount}`);

    console.log('\nPrimeras 6 filas:');
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber <= 6) {
        const rowVals = Array.isArray(row.values) ? (row.values as unknown[]) : [];
        const values = rowVals.slice(1, 15).map((v) => {
          if (v && typeof v === 'object') {
            const obj = v as Record<string, unknown>;
            return obj.text || obj.result || JSON.stringify(v);
          }
          return v;
        });
        console.log(`  Fila ${rowNumber}:`, values);
      }
    });

    // Buscar encabezado
    let filaHeader = -1;
    let headers: string[] = [];
    sheet.eachRow((row, rowNumber) => {
      if (filaHeader !== -1) return;
      const rowVals = Array.isArray(row.values) ? (row.values as unknown[]) : [];
      const vals = rowVals.map((v) => String(v || '').toUpperCase());
      if (vals.some((v) => v.includes('MARCA')) && vals.some((v) => v.includes('LINEA') || v.includes('REFERENCIA'))) {
        filaHeader = rowNumber;
        headers = rowVals.slice(1).map((v) => String(v || '').trim());
      }
    });

    console.log(`\nFila de encabezados detectada: ${filaHeader}`);
    console.log(`Columnas detectadas (${headers.length}):`, headers);

    // Muestra de datos fila 7 y 8
    console.log('\nMuestra de registros:');
    [filaHeader + 1, filaHeader + 2, filaHeader + 3].forEach((rNum) => {
      const row = sheet.getRow(rNum);
      if (row && row.values) {
        const rowVals = Array.isArray(row.values) ? (row.values as unknown[]).slice(1, 10) : [];
        console.log(`  Registro ${rNum}:`, rowVals);
      }
    });
    console.log('\n');
  }
}

inspectAll().catch(console.error);
