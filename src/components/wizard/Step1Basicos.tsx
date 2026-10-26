'use client';

import React, { useState, useMemo } from 'react';
import {
  Gauge,
  FileSearch,
  ChevronDown,
  Car,
  MapPin,
  Calendar,
  Search,
  Binary,
} from 'lucide-react';
import { DatosBasicos } from '../../types/evaluation';
import { calcularKilometraje } from '../../lib/calculations';
import { ANIO_ACTUAL } from '../../lib/constants';
import { Alert } from '../ui/Alert';

interface Step1BasicosProps {
  datos: DatosBasicos;
  onChange: (datos: Partial<DatosBasicos>) => void;
}

const CIUDADES_COMUNES = [
  'BOGOTÁ D.C.',
  'MEDELLÍN',
  'CALI',
  'BARRANQUILLA',
  'ENVIGADO',
  'BUCARAMANGA',
  'SABANETA',
  'PEREIRA',
  'CARTAGENA',
  'MANIZALES',
  'CÚCUTA',
  'IBAGUÉ',
  'CHÍA',
  'SANTA MARTA',
  'VILLAVICENCIO',
  'PASTO',
  'BELLO',
  'ITAGÜÍ',
  'FLORIDABLANCA',
];

export const Step1Basicos: React.FC<Step1BasicosProps> = ({ datos, onChange }) => {
  const anios = useMemo(() => {
    const lista: number[] = [];
    for (let y = ANIO_ACTUAL + 1; y >= 1990; y--) {
      lista.push(y);
    }
    return lista;
  }, []);

  const [mostrarPauta, setMostrarPauta] = useState(false);

  const resultadoKm = useMemo(() => {
    if (datos.kilometraje > 0 && datos.anioModelo > 0) {
      return calcularKilometraje(datos);
    }
    return null;
  }, [datos]);

  const handlePlacaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (val.length > 3) {
      val = val.slice(0, 3) + ' ' + val.slice(3, 6);
    }
    onChange({ placa: val });
  };

  const handleKmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const numValue = rawValue ? parseInt(rawValue, 10) : 0;
    onChange({ kilometraje: numValue });
  };

  const formattedPlaca = datos.placa ? datos.placa.trim().replace(' ', ' · ') : 'ABC · 123';
  const ciudadPlaca = datos.ciudadPlaca?.trim() || 'BOGOTÁ D.C.';
  const antiguedad = Math.max(0, ANIO_ACTUAL - datos.anioModelo);

  return (
    <div className="space-y-8">
      {/* Encabezado con lenguaje claro */}
      <div className="border-b border-slate-200/90 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PASO 01 · DATOS DEL CARRO Y KILOMETRAJE</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Toma menos de 1 minuto
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ¿Qué carro vas a revisar?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
          Escribe los datos principales del vehículo. Con estos datos calcularemos de inmediato si el carro ha sido muy trajinado o si su uso está dentro de lo normal en Colombia (10.000 a 15.000 km al año).
        </p>
      </div>

      {/* Grid del Formulario */}
      <div className="flex flex-col gap-6">
        {/* Fila 1: Placa, Ciudad y Réplica de Placa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Input Placa */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="placa-input"
                className="block text-xs sm:text-sm font-semibold text-slate-900"
              >
                Número de placa <span className="text-xs font-normal text-slate-500">(Opcional)</span>
              </label>
              <span className="text-[11px] text-slate-400">3 letras y 3 números</span>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Car className="w-4 h-4" />
              </div>
              <input
                id="placa-input"
                type="text"
                maxLength={7}
                value={datos.placa || ''}
                onChange={handlePlacaChange}
                placeholder="Ej: ABC 123"
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-300 text-slate-900 font-mono text-sm tracking-wider uppercase placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Input Municipio */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="ciudad-input"
                className="block text-xs sm:text-sm font-semibold text-slate-900"
              >
                Ciudad de la placa <span className="text-xs font-normal text-slate-500">(Opcional)</span>
              </label>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                id="ciudad-input"
                list="ciudades-placa"
                type="text"
                value={datos.ciudadPlaca ?? 'BOGOTÁ D.C.'}
                onChange={(e) => onChange({ ciudadPlaca: e.target.value.toUpperCase() })}
                placeholder="BOGOTÁ D.C."
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 uppercase placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs transition-all"
              />
              <datalist id="ciudades-placa">
                {CIUDADES_COMUNES.map((ciudad) => (
                  <option key={ciudad} value={ciudad} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Réplica de Placa Oficial Colombiana */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-full sm:w-52 h-17 bg-[#FFC700] rounded-xl border border-[#D9A000] p-2 shadow-xs flex flex-col items-center justify-between select-none relative shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900/30 absolute top-1.5 left-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900/30 absolute top-1.5 right-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900/30 absolute bottom-1.5 left-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900/30 absolute bottom-1.5 right-2"></span>

              <span className="text-[8px] leading-none tracking-widest uppercase font-black text-slate-900/80">
                COLOMBIA
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black tracking-widest uppercase text-slate-950 leading-none my-0.5">
                {formattedPlaca}
              </span>
              <span className="text-[8px] leading-none tracking-wider uppercase font-bold text-slate-900/75 truncate max-w-[140px] text-center">
                {ciudadPlaca}
              </span>
            </div>
          </div>
        </div>

        {/* Fila 2: Marca y modelo */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="lineaVehiculo"
              className="block text-xs sm:text-sm font-semibold text-slate-900"
            >
              Marca, modelo y versión <span className="text-rose-600">*</span>
            </label>
            <span className="text-[11px] text-slate-500">Ejemplo: Renault Duster 2.0, Mazda 2, Kia Picanto</span>
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="lineaVehiculo"
              value={datos.lineaVehiculo}
              onChange={(e) => onChange({ lineaVehiculo: e.target.value.toUpperCase() })}
              placeholder="Escribe aquí la marca y línea (ej. CHEVROLET TRACKER LTZ)"
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 uppercase placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs transition-all font-semibold"
            />
          </div>
        </div>

        {/* Fila 3: Año y Kilometraje */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Año Modelo */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="anioModelo"
                className="block text-xs sm:text-sm font-semibold text-slate-900"
              >
                Año del modelo <span className="text-rose-600">*</span>
              </label>
              <span className="text-xs font-mono font-medium text-emerald-700">
                {antiguedad === 0 ? 'Carro del año (Nuevo)' : `${antiguedad} año(s) de uso`}
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                id="anioModelo"
                value={datos.anioModelo}
                onChange={(e) => onChange({ anioModelo: parseInt(e.target.value, 10) })}
                className="w-full h-11 pl-10 pr-8 rounded-xl bg-white border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs transition-colors cursor-pointer font-medium appearance-none"
              >
                {anios.map((anio) => (
                  <option key={anio} value={anio}>
                    Modelo {anio} {anio === ANIO_ACTUAL ? '(Año en curso)' : ''}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Kilometraje Actual */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kilometraje"
                className="block text-xs sm:text-sm font-semibold text-slate-900"
              >
                Kilómetros que marca el tablero <span className="text-rose-600">*</span>
              </label>
              <span className="text-[11px] text-slate-500">Sin puntos ni comas</span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <Binary className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="kilometraje"
                value={datos.kilometraje === 0 ? '' : datos.kilometraje.toLocaleString('es-CO')}
                onChange={handleKmChange}
                placeholder="Ej. 65000"
                className="w-full h-11 pl-10 pr-16 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 font-mono tracking-tight placeholder:text-slate-400 focus:outline-none focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 shadow-2xs transition-all font-semibold"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-slate-700 text-xs font-mono font-bold bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  KM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnóstico de uso según los kilómetros */}
      {resultadoKm && (
        <div className="mt-6 p-5 sm:p-6 rounded-xl bg-[#F8FAFC] border border-slate-200 shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-slate-800" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                ¿Qué tan caminado está este carro?
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white text-slate-600 font-medium border border-slate-200">
              Promedio: {resultadoKm.kmPorAnio.toLocaleString('es-CO')} km por año
            </span>
          </div>

          {/* Barra Visual */}
          <div className="relative pt-7 pb-1">
            <div
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 pointer-events-none z-10"
              style={{
                left: `${Math.min(96, Math.max(4, (resultadoKm.kmPorAnio / 25000) * 100))}%`,
              }}
            >
              <div className="bg-slate-900 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                Este carro: {resultadoKm.kmPorAnio.toLocaleString('es-CO')} km/año
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-slate-900" />
            </div>

            {/* 5 Segmentos de la escala */}
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex border border-slate-300">
              <div className="h-full bg-amber-200 w-[20%]" title="Muy poco (< 5.000 km/año)" />
              <div className="h-full bg-sky-200 w-[20%]" title="Poco uso (5.000 - 10.000 km/año)" />
              <div className="h-full bg-emerald-500 w-[20%]" title="Normal en Colombia (10.000 - 15.000 km/año)" />
              <div className="h-full bg-amber-400 w-[20%]" title="Bastante usado (15.000 - 20.000 km/año)" />
              <div className="h-full bg-rose-500 w-[20%]" title="Demasiado recorrido (> 20.000 km/año)" />
            </div>
          </div>

          {/* 5 Tarjetas de Rango */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1 font-mono">
            <div
              className={`p-2 rounded-lg border text-center transition-all ${
                resultadoKm.categoria === 'muy_bajo'
                  ? 'bg-amber-50 border-amber-300 shadow-xs ring-1 ring-amber-400'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">&lt; 5.000 km/año</div>
              <div className="text-[11px] font-bold text-amber-700 mt-0.5">Sospechoso</div>
              <div className="text-[9px] text-slate-500 leading-tight">Posible odómetro bajado</div>
            </div>

            <div
              className={`p-2 rounded-lg border text-center transition-all ${
                resultadoKm.categoria === 'bajo'
                  ? 'bg-sky-50 border-sky-300 shadow-xs ring-1 ring-sky-400'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">5k – 10.000 km/año</div>
              <div className="text-[11px] font-bold text-sky-700 mt-0.5">Poco uso</div>
              <div className="text-[9px] text-slate-500 leading-tight">Carro de fines de semana</div>
            </div>

            <div
              className={`p-2 rounded-lg border text-center transition-all ${
                resultadoKm.categoria === 'normal'
                  ? 'bg-emerald-50 border-emerald-300 shadow-xs ring-1 ring-emerald-500'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">10k – 15.000 km/año</div>
              <div className="text-[11px] font-bold text-emerald-700 mt-0.5">Normal</div>
              <div className="text-[9px] text-slate-500 leading-tight">Uso promedio en Colombia</div>
            </div>

            <div
              className={`p-2 rounded-lg border text-center transition-all ${
                resultadoKm.categoria === 'alto'
                  ? 'bg-amber-50 border-amber-300 shadow-xs ring-1 ring-amber-400'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">15k – 20.000 km/año</div>
              <div className="text-[11px] font-bold text-amber-700 mt-0.5">Bastante usado</div>
              <div className="text-[9px] text-slate-500 leading-tight">Mucho viaje en carretera</div>
            </div>

            <div
              className={`col-span-2 sm:col-span-1 p-2 rounded-lg border text-center transition-all ${
                resultadoKm.categoria === 'excesivo'
                  ? 'bg-rose-50 border-rose-300 shadow-xs ring-1 ring-rose-500'
                  : 'bg-white border-slate-200 opacity-70'
              }`}
            >
              <div className="text-[10px] font-bold text-slate-800">&gt; 20.000 km/año</div>
              <div className="text-[11px] font-bold text-rose-700 mt-0.5">Muy trajinado</div>
              <div className="text-[9px] text-slate-500 leading-tight">Posible taxi o aplicación</div>
            </div>
          </div>

          {/* Desplegable de Consejos en Lenguaje Sencillo */}
          <div className="rounded-xl border border-slate-200 overflow-hidden bg-white">
            <button
              type="button"
              onClick={() => setMostrarPauta((prev) => !prev)}
              className="w-full p-3 flex items-center justify-between gap-2 hover:bg-slate-50 transition-colors cursor-pointer text-left select-none"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileSearch className="w-4 h-4 text-slate-700 shrink-0" />
                <span className="text-xs font-semibold text-slate-900">
                  Consejo: ¿Qué deberías revisar con este kilometraje?
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-slate-500">
                <span className="text-[11px] font-mono hidden sm:inline">
                  {mostrarPauta ? 'Cerrar' : 'Leer consejo'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mostrarPauta ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {mostrarPauta && (
              <div className="px-4 pb-4 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 animate-fadeIn">
                {resultadoKm.categoria === 'muy_bajo' ? (
                  <div>
                    <strong className="text-amber-800 block mb-1">
                      Sospecha de kilometraje adulterado:
                    </strong>
                    El carro muestra muy poquitos kilómetros para tener {antiguedad} años. En Colombia es común que le bajen el kilometraje antes de venderlo. Revisa si el timón, la palanca de cambios o los pedales se ven desgastados o lisos: si se ven gastados pero el tablero marca pocos kilómetros, desconfía.
                  </div>
                ) : resultadoKm.categoria === 'excesivo' ? (
                  <div>
                    <strong className="text-rose-800 block mb-1">
                      El carro ha rodado muchísimo:
                    </strong>
                    El vehículo tiene mucho más kilometraje que un carro particular promedio. Es probable que haya trabajado en plataformas (Uber, Didi) o haya viajado constantemente. Revisa con mucho cuidado que no tenga ruidos raros en el motor, fugas de aceite o la suspensión floja.
                  </div>
                ) : resultadoKm.categoria === 'alto' ? (
                  <div>
                    <strong className="text-amber-800 block mb-1">
                      Uso alto pero común en viajes:
                    </strong>
                    El carro ha caminado bastante. Si el dueño anterior le hizo los cambios de aceite y mantenimientos a tiempo, puede ser una buena compra, pero revisa el estado de los frenos, llantas y amortiguadores porque requerirán cambio pronto.
                  </div>
                ) : resultadoKm.categoria === 'bajo' ? (
                  <div>
                    <strong className="text-sky-800 block mb-1">
                      Poco kilometraje (Punto a favor):
                    </strong>
                    El carro se ha usado poco, probablemente solo para pasear o trayectos cortos en ciudad. Pregunta si le cambiaban el aceite al menos una vez al año, ya que el aceite se vence por tiempo aunque no se ruede mucho.
                  </div>
                ) : (
                  <div>
                    <strong className="text-emerald-800 block mb-1">
                      Kilometraje normal y esperado:
                    </strong>
                    El kilometraje coincide perfectamente con los años del carro. Está dentro del promedio normal en Colombia. Pasa al siguiente paso para revisar que no tenga multas ni choques graves.
                  </div>
                )}
              </div>
            )}
          </div>

          {resultadoKm.esDescarte && (
            <Alert
              tipo="descarte"
              titulo="Cuidado: Kilometraje excesivamente alto"
              mensaje={resultadoKm.mensaje}
              modulo="Kilometraje"
            />
          )}
        </div>
      )}
    </div>
  );
};
