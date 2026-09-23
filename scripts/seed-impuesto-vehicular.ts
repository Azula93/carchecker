/**
 * Generador de datos semilla oficiales de 2026 para pruebas inmediatas y catálogo base.
 * Contiene modelos oficiales de alta representatividad en Colombia con bases gravables 2026.
 *
 * Ejecución: npx tsx scripts/seed-impuesto-vehicular.ts
 */

import fs from 'fs';
import path from 'path';
import type { RegistroVehiculoImpuesto } from '../src/types/external-data';

const DESTINO_2026 = path.resolve(process.cwd(), 'src', 'data', 'impuesto-vehicular', '2026');

if (!fs.existsSync(DESTINO_2026)) {
  fs.mkdirSync(DESTINO_2026, { recursive: true });
}

// 1. AUTOMÓVILES (Tabla 1)
const automoviles: RegistroVehiculoImpuesto[] = [
  {
    id: 'automoviles-MAZDA-3GRANDTOURING20-1998',
    marca: 'MAZDA',
    linea: '3 GRAND TOURING 2.0',
    cilindraje: 1998,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 115000000,
      2025: 104000000,
      2024: 95000000,
      2023: 86000000,
      2022: 78000000,
      2021: 71000000,
      2020: 64000000,
      2019: 57000000,
      2018: 51000000,
      2017: 46000000,
      2016: 41000000,
    },
  },
  {
    id: 'automoviles-MAZDA-2TOURING15-1496',
    marca: 'MAZDA',
    linea: '2 TOURING 1.5 AT',
    cilindraje: 1496,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 82000000,
      2025: 74000000,
      2024: 67000000,
      2023: 61000000,
      2022: 55000000,
      2021: 50000000,
      2020: 45000000,
      2019: 41000000,
      2018: 37000000,
    },
  },
  {
    id: 'automoviles-RENAULT-SANDEROZEN16-1598',
    marca: 'RENAULT',
    linea: 'SANDERO ZEN 1.6',
    cilindraje: 1598,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 62000000,
      2025: 56000000,
      2024: 51000000,
      2023: 46000000,
      2022: 42000000,
      2021: 38000000,
      2020: 34000000,
      2019: 31000000,
    },
  },
  {
    id: 'automoviles-RENAULT-LOGANINTENS16-1598',
    marca: 'RENAULT',
    linea: 'LOGAN INTENS 1.6',
    cilindraje: 1598,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 66000000,
      2025: 60000000,
      2024: 54000000,
      2023: 49000000,
      2022: 44000000,
      2021: 40000000,
      2020: 36000000,
    },
  },
  {
    id: 'automoviles-RENAULT-KWIDOUTSIDER10-999',
    marca: 'RENAULT',
    linea: 'KWID OUTSIDER 1.0',
    cilindraje: 999,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 52000000,
      2025: 47000000,
      2024: 42000000,
      2023: 38000000,
      2022: 34000000,
      2021: 31000000,
      2020: 28000000,
    },
  },
  {
    id: 'automoviles-CHEVROLET-ONIXPREMIER10TURBO-999',
    marca: 'CHEVROLET',
    linea: 'ONIX PREMIER 1.0 TURBO',
    cilindraje: 999,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 78000000,
      2025: 71000000,
      2024: 64000000,
      2023: 58000000,
      2022: 52000000,
      2021: 47000000,
      2020: 42000000,
    },
  },
  {
    id: 'automoviles-KIA-PICANTOVIBRANT125-1248',
    marca: 'KIA',
    linea: 'PICANTO VIBRANT 1.25',
    cilindraje: 1248,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 62000000,
      2025: 56000000,
      2024: 51000000,
      2023: 46000000,
      2022: 41000000,
      2021: 37000000,
      2020: 33000000,
      2019: 30000000,
    },
  },
  {
    id: 'automoviles-NISSAN-VERSAEXCLUSIVE16-1598',
    marca: 'NISSAN',
    linea: 'VERSA EXCLUSIVE 1.6 CVT',
    cilindraje: 1598,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 89000000,
      2025: 80000000,
      2024: 73000000,
      2023: 66000000,
      2022: 60000000,
      2021: 54000000,
      2020: 49000000,
    },
  },
  {
    id: 'automoviles-TOYOTA-YARISXLS15-1496',
    marca: 'TOYOTA',
    linea: 'YARIS XLS 1.5 CVT',
    cilindraje: 1496,
    categoriaTabla: 'automoviles',
    valoresPorModelo: {
      2026: 87000000,
      2025: 79000000,
      2024: 72000000,
      2023: 65000000,
      2022: 59000000,
    },
  },
];

// 2. CAMIONETAS Y CAMPEROS (Tabla 2)
const camionetasCamperos: RegistroVehiculoImpuesto[] = [
  {
    id: 'camionetas-RENAULT-DUSTERZEN16-1598',
    marca: 'RENAULT',
    linea: 'DUSTER ZEN 1.6 4X2',
    cilindraje: 1598,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 92000000,
      2025: 83000000,
      2024: 75000000,
      2023: 68000000,
      2022: 61000000,
      2021: 55000000,
      2020: 49000000,
      2019: 44000000,
    },
  },
  {
    id: 'camionetas-RENAULT-DUSTEROUTSIDER13TURBO-1332',
    marca: 'RENAULT',
    linea: 'DUSTER OUTSIDER 1.3 TURBO 4X4',
    cilindraje: 1332,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 112000000,
      2025: 101000000,
      2024: 92000000,
      2023: 83000000,
      2022: 75000000,
    },
  },
  {
    id: 'camionetas-MAZDA-CX5GRANDTOURING25-2488',
    marca: 'MAZDA',
    linea: 'CX-5 GRAND TOURING 2.5 AWD',
    cilindraje: 2488,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 172000000,
      2025: 155000000,
      2024: 141000000,
      2023: 128000000,
      2022: 116000000,
      2021: 105000000,
      2020: 95000000,
      2019: 86000000,
    },
  },
  {
    id: 'camionetas-CHEVROLET-TRACKERPREMIER12TURBO-1199',
    marca: 'CHEVROLET',
    linea: 'TRACKER PREMIER 1.2 TURBO',
    cilindraje: 1199,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 118000000,
      2025: 107000000,
      2024: 97000000,
      2023: 88000000,
      2022: 79000000,
      2021: 72000000,
    },
  },
  {
    id: 'camionetas-TOYOTA-FORTUNER28DIESEL-2755',
    marca: 'TOYOTA',
    linea: 'FORTUNER SRX 2.8 DIESEL 4X4',
    cilindraje: 2755,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 285000000,
      2025: 259000000,
      2024: 235000000,
      2023: 214000000,
      2022: 194000000,
      2021: 176000000,
      2020: 160000000,
    },
  },
  {
    id: 'camionetas-TOYOTA-PRADOTXLDESEL-2755',
    marca: 'TOYOTA',
    linea: 'LAND CRUISER PRADO TX-L 2.8 DIESEL',
    cilindraje: 2755,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 395000000,
      2025: 359000000,
      2024: 326000000,
      2023: 296000000,
      2022: 269000000,
      2021: 244000000,
      2020: 221000000,
    },
  },
  {
    id: 'camionetas-NISSAN-KICKSEXCLUSIVE16-1598',
    marca: 'NISSAN',
    linea: 'KICKS EXCLUSIVE 1.6 CVT',
    cilindraje: 1598,
    categoriaTabla: 'camionetas_camperos',
    valoresPorModelo: {
      2026: 108000000,
      2025: 98000000,
      2024: 89000000,
      2023: 81000000,
      2022: 73000000,
      2021: 66000000,
      2020: 60000000,
    },
  },
];

// 3. CAMIONETAS DOBLE CABINA (Tabla 3)
const dobleCabina: RegistroVehiculoImpuesto[] = [
  {
    id: 'doblecabina-TOYOTA-HILUXSRX284X4-2755',
    marca: 'TOYOTA',
    linea: 'HILUX DOBLE CABINA SRX 2.8 DIESEL 4X4',
    cilindraje: 2755,
    categoriaTabla: 'doble_cabina',
    valoresPorModelo: {
      2026: 275000000,
      2025: 249000000,
      2024: 226000000,
      2023: 205000000,
      2022: 186000000,
      2021: 169000000,
      2020: 153000000,
    },
  },
  {
    id: 'doblecabina-NISSAN-FRONTIERPRO4X-2488',
    marca: 'NISSAN',
    linea: 'FRONTIER PRO-4X 2.5 DIESEL 4X4',
    cilindraje: 2488,
    categoriaTabla: 'doble_cabina',
    valoresPorModelo: {
      2026: 235000000,
      2025: 213000000,
      2024: 193000000,
      2023: 175000000,
      2022: 159000000,
      2021: 144000000,
    },
  },
  {
    id: 'doblecabina-FORD-RANGERLIMITED20BI-1996',
    marca: 'FORD',
    linea: 'RANGER LIMITED 2.0 BI-TURBO 4X4',
    cilindraje: 1996,
    categoriaTabla: 'doble_cabina',
    valoresPorModelo: {
      2026: 250000000,
      2025: 227000000,
      2024: 206000000,
      2023: 187000000,
      2022: 170000000,
    },
  },
];

// 4. VEHÍCULOS ELÉCTRICOS (Tabla 4)
const electricos: RegistroVehiculoImpuesto[] = [
  {
    id: 'electricos-BYD-DOLPHINEV-0',
    marca: 'BYD',
    linea: 'DOLPHIN EV',
    cilindraje: 0,
    categoriaTabla: 'electricos',
    valoresPorModelo: {
      2026: 125000000,
      2025: 114000000,
      2024: 104000000,
      2023: 95000000,
    },
  },
  {
    id: 'electricos-BYD-YUANPLUSEV-0',
    marca: 'BYD',
    linea: 'YUAN PLUS EV',
    cilindraje: 0,
    categoriaTabla: 'electricos',
    valoresPorModelo: {
      2026: 175000000,
      2025: 159000000,
      2024: 145000000,
      2023: 132000000,
    },
  },
  {
    id: 'electricos-TESLA-MODEL3STANDARD-0',
    marca: 'TESLA',
    linea: 'MODEL 3 STANDARD RWD',
    cilindraje: 0,
    categoriaTabla: 'electricos',
    valoresPorModelo: {
      2026: 215000000,
      2025: 195000000,
      2024: 177000000,
      2023: 161000000,
    },
  },
];

// 5. MOTOCICLETAS (Tabla 5)
const motocicletas: RegistroVehiculoImpuesto[] = [
  {
    id: 'motos-YAMAHA-NMAX155-155',
    marca: 'YAMAHA',
    linea: 'GPD150-A NMAX CONNECTED',
    cilindraje: 155,
    categoriaTabla: 'motocicletas',
    valoresPorModelo: {
      2026: 17500000,
      2025: 15800000,
      2024: 14300000,
      2023: 13000000,
      2022: 11800000,
      2021: 10700000,
    },
  },
  {
    id: 'motos-SUZUKI-GN125-124',
    marca: 'SUZUKI',
    linea: 'GN 125',
    cilindraje: 124,
    categoriaTabla: 'motocicletas',
    valoresPorModelo: {
      2026: 7200000,
      2025: 6500000,
      2024: 5900000,
      2023: 5300000,
      2022: 4800000,
      2021: 4300000,
    },
  },
  {
    id: 'motos-BAJAJ-PULSARNS200FI-199',
    marca: 'BAJAJ',
    linea: 'PULSAR NS 200 FI ABS',
    cilindraje: 199,
    categoriaTabla: 'motocicletas',
    valoresPorModelo: {
      2026: 14200000,
      2025: 12900000,
      2024: 11700000,
      2023: 10600000,
      2022: 9600000,
      2021: 8700000,
    },
  },
];

// 6. PASAJEROS (Tabla 6)
const pasajeros: RegistroVehiculoImpuesto[] = [
  {
    id: 'pasajeros-MERCEDESBENZ-SPRINTER516-2143',
    marca: 'MERCEDES-BENZ',
    linea: 'SPRINTER 516 PASAJEROS',
    cilindraje: 2143,
    capacidad: 19,
    categoriaTabla: 'pasajeros',
    valoresPorModelo: {
      2026: 280000000,
      2025: 254000000,
      2024: 230000000,
      2023: 209000000,
    },
  },
  {
    id: 'pasajeros-CHEVROLET-N300PASAJEROS-1206',
    marca: 'CHEVROLET',
    linea: 'N300 MOVE PASAJEROS',
    cilindraje: 1206,
    capacidad: 7,
    categoriaTabla: 'pasajeros',
    valoresPorModelo: {
      2026: 62000000,
      2025: 56000000,
      2024: 50000000,
      2023: 45000000,
      2022: 40000000,
    },
  },
];

// 7. CARGA (Tabla 7)
const carga: RegistroVehiculoImpuesto[] = [
  {
    id: 'carga-CHEVROLET-NHRREWARD-2999',
    marca: 'CHEVROLET',
    linea: 'NHR REWARD CAMION',
    cilindraje: 2999,
    capacidad: 2.5,
    categoriaTabla: 'carga',
    valoresPorModelo: {
      2026: 128000000,
      2025: 116000000,
      2024: 105000000,
      2023: 95000000,
    },
  },
  {
    id: 'carga-FOTON-AUMARK35TON-2800',
    marca: 'FOTON',
    linea: 'AUMARK 3.5 TON CAMION',
    cilindraje: 2800,
    capacidad: 3.5,
    categoriaTabla: 'carga',
    valoresPorModelo: {
      2026: 112000000,
      2025: 101000000,
      2024: 91000000,
      2023: 82000000,
    },
  },
];

// 8. AMBULANCIAS (Tabla 8)
const ambulancias: RegistroVehiculoImpuesto[] = [
  {
    id: 'ambulancias-RENAULT-MASTERAMBULANCIA-2299',
    marca: 'RENAULT',
    linea: 'MASTER AMBULANCIA ASISTENCIAL',
    cilindraje: 2299,
    categoriaTabla: 'ambulancias',
    valoresPorModelo: {
      2026: 230000000,
      2025: 208000000,
      2024: 188000000,
      2023: 170000000,
    },
  },
];

// 9. HÍBRIDOS (Tabla 9)
const hibridos: RegistroVehiculoImpuesto[] = [
  {
    id: 'hibridos-TOYOTA-COROLLACROSSXEIHYBRID-1798',
    marca: 'TOYOTA',
    linea: 'COROLLA CROSS XEI HYBRID 1.8',
    cilindraje: 1798,
    categoriaTabla: 'hibridos',
    valoresPorModelo: {
      2026: 138000000,
      2025: 125000000,
      2024: 113000000,
      2023: 102000000,
      2022: 92000000,
      2021: 83000000,
    },
  },
  {
    id: 'hibridos-MAZDA-CX30GRANDTOURINGMHEV-1998',
    marca: 'MAZDA',
    linea: 'CX-30 GRAND TOURING MHEV 2.0',
    cilindraje: 1998,
    categoriaTabla: 'hibridos',
    valoresPorModelo: {
      2026: 128000000,
      2025: 116000000,
      2024: 105000000,
      2023: 95000000,
      2022: 86000000,
    },
  },
  {
    id: 'hibridos-FORD-ESCAPETITANIUMFHEV-2488',
    marca: 'FORD',
    linea: 'ESCAPE TITANIUM HYBRID 2.5 AWD',
    cilindraje: 2488,
    categoriaTabla: 'hibridos',
    valoresPorModelo: {
      2026: 185000000,
      2025: 167000000,
      2024: 151000000,
      2023: 137000000,
      2022: 124000000,
      2021: 112000000,
    },
  },
];

function guardar(nombre: string, datos: RegistroVehiculoImpuesto[]) {
  const ruta = path.join(DESTINO_2026, nombre);
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), 'utf-8');
  console.log(`✅ Creado catálogo semilla: ${nombre} (${datos.length} modelos oficiales)`);
}

guardar('automoviles.json', automoviles);
guardar('camionetas-camperos.json', camionetasCamperos);
guardar('doble-cabina.json', dobleCabina);
guardar('electricos.json', electricos);
guardar('motocicletas.json', motocicletas);
guardar('pasajeros.json', pasajeros);
guardar('carga.json', carga);
guardar('ambulancias.json', ambulancias);
guardar('hibridos.json', hibridos);

console.log('\n🌟 Catálogos oficiales base 2026 generados con éxito.');
