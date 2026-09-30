'use client';

import React, { useState, useMemo } from 'react';
import {
  Gauge,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  OctagonAlert,
  FileSearch,
  ChevronDown,
  Car,
  MapPin,
  Calendar,
  Search,
  Binary,
  BarChart3,
  ShieldCheck,
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
  // Lista de años desde el año siguiente hasta 1990
  const anios = useMemo(() => {
    const lista: number[] = [];
    for (let y = ANIO_ACTUAL + 1; y >= 1990; y--) {
      lista.push(y);
    }
    return lista;
  }, []);

  // Estado para desplegar las pautas de inspección al hacer clic
  const [mostrarPauta, setMostrarPauta] = useState(false);

  // Cálculo en vivo del kilometraje
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
      {/* Encabezado del Paso (Stitch Design Reference) */}
      <div className="border-b border-[#E2E8F0] pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          {/* Badge izquierdo */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FA] text-[#123B5D] text-xs font-bold w-fit">
            <span className="w-2 h-2 rounded-full bg-[#8BCF3F] animate-pulse"></span>
            <span>BÁSICOS</span>
          </div>

          {/* Badge derecho */}
          {/* <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-[#123B5D] text-xs font-semibold shadow-2xs w-fit">
            <ShieldCheck className="w-4 h-4 text-[#2EAD68]" />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-[11px]">Fase Preliminar</span>
              <span className="text-[10px] text-[#66727D]">100% Confidencial</span>
            </div>
          </div> */}
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
          Cuéntanos sobre el vehículo
        </h2>
        <p className="text-xs sm:text-sm text-[#66727D] mt-1.5 leading-relaxed max-w-3xl">
          Registra los datos elementales para calibrar la evaluación técnica y el ritmo de uso anual frente al estándar en Colombia (10.000 a 15.000 km/año).
        </p>
      </div>

      {/* Grid de Formulario */}
      <div className="flex flex-col gap-6">
        {/* Fila 1: Placa, Ciudad y Tarjeta Amarilla de Placa */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
          {/* Input Placa */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="placa-input"
                className="block text-xs sm:text-sm font-bold text-[#17212B]"
              >
                Placa vehicular <span className="text-xs font-normal text-[#66727D]">(Opcional)</span>
              </label>
              <span className="text-[11px] text-[#66727D]">Formato oficial</span>
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#66727D]">
                <Car className="w-4 h-4" />
              </div>
              <input
                id="placa-input"
                type="text"
                maxLength={7}
                value={datos.placa || ''}
                onChange={handlePlacaChange}
                placeholder="ABC 123"
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-[#CBD5E1] text-[#17212B] font-mono text-base tracking-wider uppercase placeholder:text-slate-400 focus:outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10 shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Input Ciudad de matrícula */}
          <div className="lg:col-span-4 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="ciudad-input"
                className="block text-xs sm:text-sm font-bold text-[#17212B]"
              >
                Municipio de matrícula <span className="text-xs font-normal text-[#66727D]">(Opcional)</span>
              </label>
              
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#66727D]">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                id="ciudad-input"
                list="ciudades-placa"
                type="text"
                value={datos.ciudadPlaca ?? 'BOGOTÁ D.C.'}
                onChange={(e) => onChange({ ciudadPlaca: e.target.value.toUpperCase() })}
                placeholder="BOGOTÁ D.C."
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#17212B] uppercase placeholder:text-slate-400 focus:outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10 shadow-2xs transition-all"
              />
              <datalist id="ciudades-placa">
                {CIUDADES_COMUNES.map((ciudad) => (
                  <option key={ciudad} value={ciudad} />
                ))}
              </datalist>
            </div>
          </div>

          {/* Visual Colombiano de Placa (Stitch Reference) */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div className="w-full sm:w-52 h-18 bg-[#FFC700] rounded-xl border-2 border-[#E0A800] p-2.5 shadow-xs flex flex-col items-center justify-between select-none relative shrink-0">
              {/* Tornillos de placa en las 4 esquinas */}
              <span className="w-1.5 h-1.5 rounded-full bg-[#17212B]/40 absolute top-2 left-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#17212B]/40 absolute top-2 right-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#17212B]/40 absolute bottom-2 left-2"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#17212B]/40 absolute bottom-2 right-2"></span>

              <span className="text-[8px] leading-none tracking-widest uppercase font-black text-[#17212B]/85">
                COLOMBIA
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black tracking-widest uppercase text-[#17212B] leading-none my-0.5">
                {formattedPlaca}
              </span>
              <span className="text-[8px] leading-none tracking-wider uppercase font-bold text-[#17212B]/80 truncate max-w-[140px] text-center">
                {ciudadPlaca}
              </span>
            </div>
          </div>
        </div>

        {/* Fila 2: Línea, marca y versión */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="lineaVehiculo"
              className="block text-xs sm:text-sm font-bold text-[#17212B]"
            >
              Línea, marca y versión <span className="text-[#D64545]">*</span>
            </label>
            
          </div>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#66727D]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="lineaVehiculo"
              value={datos.lineaVehiculo}
              onChange={(e) => onChange({ lineaVehiculo: e.target.value.toUpperCase() })}
              placeholder="MAZDA CX-30 GRAND TOURING 2.0"
              className="w-full h-12 pl-10 pr-4 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#17212B] uppercase placeholder:text-slate-400 focus:outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10 shadow-2xs transition-all font-semibold"
            />
          </div>
        </div>

        {/* Fila 3: Año Modelo y Kilometraje */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Año Modelo */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="anioModelo"
                className="block text-xs sm:text-sm font-bold text-[#17212B]"
              >
                Año modelo <span className="text-[#D64545]">*</span>
              </label>
              <span className="text-xs font-medium text-[#2EAD68]">
                {antiguedad === 0 ? 'Vehículo del año' : `${antiguedad} año(s) de antigüedad`}
              </span>
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#66727D]">
                <Calendar className="w-4 h-4" />
              </div>
              <select
                id="anioModelo"
                value={datos.anioModelo}
                onChange={(e) => onChange({ anioModelo: parseInt(e.target.value, 10) })}
                className="w-full h-12 pl-10 pr-8 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#17212B] focus:outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10 shadow-2xs transition-colors cursor-pointer font-medium appearance-none"
              >
                {anios.map((anio) => (
                  <option key={anio} value={anio}>
                    Modelo {anio} {anio === ANIO_ACTUAL ? '(Año actual)' : ''}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#66727D]">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Kilometraje Actual */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="kilometraje"
                className="block text-xs sm:text-sm font-bold text-[#17212B]"
              >
                Kilometraje actual<span className="text-[#D64545]">*</span>
              </label>
              
            </div>

            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#66727D]">
                <Binary className="w-4 h-4" />
              </div>
              <input
                type="text"
                id="kilometraje"
                value={datos.kilometraje === 0 ? '' : datos.kilometraje.toLocaleString('es-CO')}
                onChange={handleKmChange}
                placeholder="0"
                className="w-full h-12 pl-10 pr-16 rounded-xl bg-white border border-[#CBD5E1] text-base text-[#17212B] font-mono tracking-tight placeholder:text-slate-400 focus:outline-none focus:border-[#123B5D] focus:ring-2 focus:ring-[#123B5D]/10 shadow-2xs transition-all font-semibold"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                <span className="text-[#123B5D] text-xs font-mono font-bold bg-[#EBF3FA] px-2 py-1 rounded">
                  KM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* <p className="text-[11px] text-[#66727D] -mt-2">
          Digita el número visible en el cuadro de instrumentos sin decimales. Se cruzará con la media nacional esperada.
        </p> */}

        {/* Callout de Diagnóstico de Uso en Colombia (Stitch Reference) */}
        {/* {resultadoKm ? (
          <div className="p-4 sm:p-5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] shadow-2xs flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[#3578B8] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-[#123B5D]">
                Diagnóstico de Uso en Colombia
              </h4>
              <p className="text-xs text-[#17212B] leading-relaxed">
                Para un vehículo modelo <strong>{datos.anioModelo}</strong> con <strong>{datos.kilometraje.toLocaleString('es-CO')} KM</strong>, el promedio estimado es de <strong>{resultadoKm.kmPorAnio.toLocaleString('es-CO')} km / año</strong>.{' '}
                {resultadoKm.categoria === 'normal' && (
                  <span className="text-[#2EAD68] font-bold">El odómetro califica dentro del rango estándar nacional (10.000 a 15.000 km/año).</span>
                )}
                {resultadoKm.categoria === 'bajo' && (
                  <span className="text-[#2EAD68] font-bold">El odómetro califica como uso moderado y favorable.</span>
                )}
                {resultadoKm.categoria === 'muy_bajo' && (
                  <span className="text-[#E5A72B] font-bold">El odómetro califica como sospechosamente bajo. Conviene contrastar el desgaste en volante y pedales.</span>
                )}
                {resultadoKm.categoria === 'alto' && (
                  <span className="text-[#E5A72B] font-bold">El odómetro registra un uso elevado en carretera.</span>
                )}
                {resultadoKm.categoria === 'excesivo' && (
                  <span className="text-[#D64545] font-bold">El odómetro indica desgaste severo superior a la media.</span>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] shadow-2xs flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-[#3578B8] shrink-0" />
            <span className="text-xs text-[#123B5D]">
              <strong>Diagnóstico de Uso en Colombia:</strong> Ingresa el kilometraje para contrastarlo en tiempo real con el estándar colombiano.
            </span>
          </div>
        )} */}
      </div>

      {/* Detalle Desplegable del Análisis de Kilometraje */}
      {resultadoKm && (
        <div className="mt-6 p-5 rounded-2xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#123B5D]" />
              <span className="text-xs font-bold text-[#123B5D] uppercase tracking-wider font-mono">
                Escala Técnica de Uso
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#66727D] font-medium border border-[#E2E8F0]">
              {antiguedad === 0 ? 'Vehículo del año' : `${antiguedad} años de uso`}
            </span>
          </div>

          {/* Visual Track with Marker Pin */}
          <div className="relative pt-7 pb-1">
            <div
              className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 pointer-events-none z-10"
              style={{
                left: `${Math.min(96, Math.max(4, (resultadoKm.kmPorAnio / 25000) * 100))}%`,
              }}
            >
              <div className="bg-[#123B5D] text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full shadow-xs whitespace-nowrap">
                Tu carro: {resultadoKm.kmPorAnio.toLocaleString('es-CO')} km/año
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#123B5D]" />
            </div>

            {/* 5 Proportional Track Segments */}
            <div className="h-2.5 w-full bg-[#E2E8F0] rounded-full overflow-hidden flex border border-[#CBD5E1]">
              <div className="h-full bg-[#FDE68A] w-[20%]" title="Muy bajo (< 5.000 km/año)" />
              <div className="h-full bg-[#BAE6FD] w-[20%]" title="Moderado (5.000 - 10.000 km/año)" />
              <div className="h-full bg-[#8BCF3F] w-[20%]" title="Estándar promedio (10.000 - 15.000 km/año)" />
              <div className="h-full bg-[#E5A72B] w-[20%]" title="Alto (15.000 - 20.000 km/año)" />
              <div className="h-full bg-[#D64545] w-[20%]" title="Severo (> 20.000 km/año)" />
            </div>
          </div>

          {/* 5 Distinct Range Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
            <div
              className={`p-2 rounded-xl border text-center transition-all ${
                resultadoKm.categoria === 'muy_bajo'
                  ? 'bg-[#FFFBEB] border-[#FDE68A] shadow-xs ring-2 ring-[#E5A72B]'
                  : 'bg-white border-[#E2E8F0] opacity-75'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#17212B]">&lt; 5.000 km</div>
              <div className="text-[11px] font-bold text-[#E5A72B] mt-0.5">Muy bajo</div>
              <div className="text-[9px] text-[#66727D] leading-tight">Posible alteración</div>
            </div>

            <div
              className={`p-2 rounded-xl border text-center transition-all ${
                resultadoKm.categoria === 'bajo'
                  ? 'bg-[#F0F9FF] border-[#BAE6FD] shadow-xs ring-2 ring-[#3578B8]'
                  : 'bg-white border-[#E2E8F0] opacity-75'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#17212B]">5k – 10.000 km</div>
              <div className="text-[11px] font-bold text-[#3578B8] mt-0.5">Moderado</div>
              <div className="text-[9px] text-[#66727D] leading-tight">Uso ocasional</div>
            </div>

            <div
              className={`p-2 rounded-xl border text-center transition-all ${
                resultadoKm.categoria === 'normal'
                  ? 'bg-[#F0FDF4] border-[#BBF7D0] shadow-xs ring-2 ring-[#2EAD68]'
                  : 'bg-white border-[#E2E8F0] opacity-75'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#17212B]">10k – 15.000 km</div>
              <div className="text-[11px] font-bold text-[#2EAD68] mt-0.5">Estándar</div>
              <div className="text-[9px] text-[#66727D] leading-tight">Promedio país</div>
            </div>

            <div
              className={`p-2 rounded-xl border text-center transition-all ${
                resultadoKm.categoria === 'alto'
                  ? 'bg-[#FFFBEB] border-[#FDE68A] shadow-xs ring-2 ring-[#E5A72B]'
                  : 'bg-white border-[#E2E8F0] opacity-75'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#17212B]">15k – 20.000 km</div>
              <div className="text-[11px] font-bold text-[#E5A72B] mt-0.5">Alto</div>
              <div className="text-[9px] text-[#66727D] leading-tight">Carretera / Viajero</div>
            </div>

            <div
              className={`col-span-2 sm:col-span-1 p-2 rounded-xl border text-center transition-all ${
                resultadoKm.categoria === 'excesivo'
                  ? 'bg-[#FEF2F2] border-[#FECACA] shadow-xs ring-2 ring-[#D64545]'
                  : 'bg-white border-[#E2E8F0] opacity-75'
              }`}
            >
              <div className="text-[10px] font-mono font-bold text-[#17212B]">&gt; 20.000 km</div>
              <div className="text-[11px] font-bold text-[#D64545] mt-0.5">Severo</div>
              <div className="text-[9px] text-[#66727D] leading-tight">Uso intensivo</div>
            </div>
          </div>

          {/* Desplegable de Pautas de Interpretación */}
          <div className="rounded-xl border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
            <button
              type="button"
              onClick={() => setMostrarPauta((prev) => !prev)}
              className="w-full p-3 flex items-center justify-between gap-2 hover:bg-[#F1F5F9] transition-colors cursor-pointer text-left select-none"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileSearch className="w-4 h-4 text-[#123B5D] shrink-0" />
                <span className="text-xs font-bold text-[#17212B]">
                  ¿Qué significa este resultado? Interpretación del kilometraje
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-[#66727D]">
                <span className="text-[11px] font-mono hidden sm:inline">
                  {mostrarPauta ? 'Ocultar detalle' : 'Ver detalle'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mostrarPauta ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {mostrarPauta && (
              <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#66727D] leading-relaxed border-t border-[#E2E8F0] animate-fadeIn">
                {resultadoKm.categoria === 'muy_bajo' ? (
                  <div>
                    <strong className="text-[#E5A72B] block mb-1">
                      Sospecha de alteración de odómetro (&lt; 5.000 km/año):
                    </strong>
                    El odómetro registra un recorrido inusualmente bajo para los {antiguedad} años del vehículo. Revisa con lupa el desgaste físico en el volante, la palanca de cambios, las gomas de los pedales y la fecha de fabricación (DOT) de las llantas para verificar si coinciden con el kilometraje mostrado.
                  </div>
                ) : resultadoKm.categoria === 'excesivo' ? (
                  <div>
                    <strong className="text-[#D64545] block mb-1">
                      Desgaste mecánico severo (&gt; 20.000 km/año):
                    </strong>
                    El vehículo excede ampliamente el promedio particular en Colombia. Esto suele indicar trabajo continuo en plataformas digitales, servicio o viajes constantes de carretera. Es indispensable revisar compresión de motor, fugas y el tren delantero.
                  </div>
                ) : resultadoKm.categoria === 'alto' ? (
                  <div>
                    <strong className="text-[#E5A72B] block mb-1">
                      Uso elevado en carretera (15.000 a 20.000 km/año):
                    </strong>
                    El vehículo ha tenido un uso más activo que el promedio. Aunque no descarta la compra si cuenta con buen historial de mantenimiento, presta especial atención al desgaste en pastillas, discos de freno, amortiguadores y sincronización.
                  </div>
                ) : resultadoKm.categoria === 'bajo' ? (
                  <div>
                    <strong className="text-[#3578B8] block mb-1">
                      Uso moderado (5.000 a 10.000 km/año):
                    </strong>
                    El vehículo presenta un ritmo de uso favorable, típico de trayectos urbanos cortos o uso recreativo de fin de semana. Comprueba que se le hayan realizado los cambios de aceite y fluidos por tiempo (mínimo una vez al año).
                  </div>
                ) : (
                  <div>
                    <strong className="text-[#2EAD68] block mb-1">
                      Ritmo estándar esperado (10.000 a 15.000 km/año):
                    </strong>
                    El kilometraje es perfectamente coherente con la antigüedad del vehículo según el promedio automotriz en Colombia. Continúa verificando el estado de conservación general, neumáticos y tapicería.
                  </div>
                )}
              </div>
            )}
          </div>

          {resultadoKm.esDescarte && (
            <Alert
              tipo="descarte"
              titulo="Criterio de descarte por kilometraje excesivo"
              mensaje={resultadoKm.mensaje}
              modulo="Kilometraje"
            />
          )}
        </div>
      )}
    </div>
  );
};
