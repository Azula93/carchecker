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

  const formattedPlaca = datos.placa ? datos.placa.trim().replace(' ', '·') : 'ABC·123';
  const ciudadPlaca = datos.ciudadPlaca?.trim() || 'BOGOTÁ D.C.';
  const antiguedad = Math.max(0, ANIO_ACTUAL - datos.anioModelo);

  return (
    <div className="space-y-6">
      {/* Encabezado del Paso */}
      <div className="border-b border-[#E2E8F0] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold block mb-1">
          Básicos &amp; Kilometraje
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B] tracking-tight">
          Cuéntanos sobre el vehículo
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
          Registra los datos elementales para calibrar la evaluación técnica y el ritmo de uso anual frente al estándar en Colombia (10.000 a 15.000 km/año).
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Placa vehicular y Ciudad con visual de placa colombiana */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="placa-input"
            className="block text-xs sm:text-sm font-semibold text-[#0F1B2B]"
          >
            Placa vehicular y Municipio <span className="text-xs font-normal text-[#64748B]">(Opcional)</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
            {/* Input Placa */}
            <div className="sm:col-span-4">
              <input
                id="placa-input"
                type="text"
                maxLength={7}
                value={datos.placa || ''}
                onChange={handlePlacaChange}
                placeholder="ABC 123"
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] font-mono text-base tracking-wider uppercase placeholder:text-[#475569] focus:outline-none focus:border-[#0F1B2B] focus:ring-1 focus:ring-[#0F1B2B] shadow-xs transition-all"
              />
            </div>

            {/* Input / Select Ciudad de matrícula */}
            <div className="sm:col-span-5">
              <input
                id="ciudad-input"
                list="ciudades-placa"
                type="text"
                value={datos.ciudadPlaca ?? 'BOGOTÁ D.C.'}
                onChange={(e) => onChange({ ciudadPlaca: e.target.value.toUpperCase() })}
                placeholder="BOGOTÁ D.C."
                className="w-full h-12 px-4 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1B2B] uppercase placeholder:text-[#475569] focus:outline-none focus:border-[#0F1B2B] focus:ring-1 focus:ring-[#0F1B2B] shadow-xs transition-all"
              />
              <datalist id="ciudades-placa">
                {CIUDADES_COMUNES.map((ciudad) => (
                  <option key={ciudad} value={ciudad} />
                ))}
              </datalist>
            </div>

            {/* Colombian Plate Visual Token */}
            <div className="sm:col-span-3 flex justify-start sm:justify-end">
              <div className="h-12 px-3 bg-[#F8D12D] text-[#0F1B2B] rounded-lg border border-[#E5BE1E] flex flex-col items-center justify-center shadow-xs select-none shrink-0 w-32">
                <span className="text-[9px] leading-tight tracking-widest uppercase font-bold text-[#0F1B2B]/75">
                  Colombia
                </span>
                <span className="font-mono text-sm font-bold tracking-widest uppercase text-[#0F1B2B]">
                  {formattedPlaca}
                </span>
                <span className="text-[8px] leading-tight tracking-tighter uppercase font-semibold text-[#0F1B2B]/70 truncate max-w-[110px] text-center">
                  {ciudadPlaca}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea / Marca / Versión (con conversión forzada a mayúscula) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="lineaVehiculo"
              className="block text-xs sm:text-sm font-semibold text-[#0F1B2B]"
            >
              Línea, marca y versión <span className="text-[#DC2626]">*</span>
            </label>
            <span className="text-[11px] text-[#64748B]">Tal como en tarjeta de propiedad</span>
          </div>
          <input
            type="text"
            id="lineaVehiculo"
            value={datos.lineaVehiculo}
            onChange={(e) => onChange({ lineaVehiculo: e.target.value.toUpperCase() })}
            placeholder="EJ. MAZDA CX-30 GRAND TOURING 2.0, RENAULT DUSTER..."
            className="w-full h-12 px-4 rounded-lg bg-white border border-[#CBD5E1] text-sm sm:text-base text-[#0F1B2B] uppercase placeholder:text-[#475569] focus:outline-none focus:border-[#0F1B2B] focus:ring-1 focus:ring-[#0F1B2B] shadow-xs transition-all"
          />
        </div>

        {/* Año / Modelo con Selector Desplegable Único */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="anioModelo"
              className="block text-xs sm:text-sm font-semibold text-[#0F1B2B]"
            >
              Año modelo <span className="text-[#DC2626]">*</span>
            </label>
            <span className="text-xs font-mono text-[#64748B]">
              {antiguedad === 0 ? 'Vehículo del año' : `${antiguedad} año(s) de antigüedad`}
            </span>
          </div>

          <select
            id="anioModelo"
            value={datos.anioModelo}
            onChange={(e) => onChange({ anioModelo: parseInt(e.target.value, 10) })}
            className="w-full h-12 px-3.5 rounded-lg bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B] focus:ring-1 focus:ring-[#0F1B2B] shadow-xs transition-colors cursor-pointer"
          >
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                Modelo {anio} {anio === ANIO_ACTUAL ? '(Año actual)' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Kilometraje Actual */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="kilometraje"
            className="block text-xs sm:text-sm font-semibold text-[#0F1B2B]"
          >
            Kilometraje actual registrado en odómetro <span className="text-[#DC2626]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="kilometraje"
              value={datos.kilometraje === 0 ? '' : datos.kilometraje.toLocaleString('es-CO')}
              onChange={handleKmChange}
              placeholder="0"
              className="w-full h-12 px-4 pr-16 rounded-lg bg-white border border-[#CBD5E1] text-base text-[#0F1B2B] font-mono tracking-tight placeholder:text-[#475569] focus:outline-none focus:border-[#0F1B2B] focus:ring-1 focus:ring-[#0F1B2B] shadow-xs transition-all"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <span className="text-[#64748B] text-xs font-mono font-bold">KM</span>
            </div>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Digita el número visible en el cuadro de instrumentos sin decimales.
          </p>
        </div>
      </div>

      {/* Real-time Kilometraje Analysis Card (from redesign) */}
      {resultadoKm && (
        <div className="mt-4 p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-[#0F1B2B]" />
              <span className="text-xs font-semibold text-[#0F1B2B] uppercase tracking-wider font-mono">
                Análisis de Kilometraje
              </span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F1F5F9] text-[#475569] font-medium border border-[#E2E8F0]">
              {antiguedad === 0 ? 'Vehículo del año' : `${antiguedad} años de uso`}
            </span>
          </div>

          <div className="flex items-end justify-between pt-1">
            <div className="flex flex-col">
              <span className="text-[11px] text-[#64748B] uppercase font-mono">Promedio estimado</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-[#0F1B2B] tracking-tight">
                {resultadoKm.kmPorAnio.toLocaleString('es-CO')} km / año
              </span>
            </div>

            {/* Status Pill */}
            {resultadoKm.categoria === 'normal' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold shadow-2xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Ritmo esperado</span>
              </div>
            )}
            {resultadoKm.categoria === 'bajo' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold shadow-2xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Uso moderado</span>
              </div>
            )}
            {resultadoKm.categoria === 'muy_bajo' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-xs font-semibold shadow-2xs">
                <AlertTriangle className="w-4 h-4" />
                <span>Sospechosamente bajo</span>
              </div>
            )}
            {resultadoKm.categoria === 'alto' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] text-xs font-semibold shadow-2xs">
                <AlertCircle className="w-4 h-4" />
                <span>Uso elevado</span>
              </div>
            )}
            {resultadoKm.categoria === 'excesivo' && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] text-xs font-semibold shadow-2xs">
                <OctagonAlert className="w-4 h-4" />
                <span>Desgaste severo</span>
              </div>
            )}
          </div>

          {/* Visual Scale Section with Position Indicator and Clear Range Cards */}
          <div className="flex flex-col gap-3 pt-2 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-xs font-semibold text-[#0F1B2B]">
                Escala de ritmo anual de uso en Colombia
              </span>
              <span className="text-[11px] font-mono text-[#64748B]">
                Ubicación de tu vehículo: <strong className="text-[#0F1B2B]">{resultadoKm.kmPorAnio.toLocaleString('es-CO')} km/año</strong>
              </span>
            </div>

            {/* Visual Track with Marker Pin */}
            <div className="relative pt-7 pb-1">
              {/* Pointer Marker */}
              <div
                className="absolute top-0 -translate-x-1/2 flex flex-col items-center transition-all duration-300 pointer-events-none z-10"
                style={{
                  left: `${Math.min(96, Math.max(4, (resultadoKm.kmPorAnio / 25000) * 100))}%`,
                }}
              >
                <div className="bg-[#0F1B2B] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap">
                  Tu carro: {resultadoKm.kmPorAnio.toLocaleString('es-CO')} km/año
                </div>
                <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] border-t-[#0F1B2B]" />
              </div>

              {/* 5 Proportional Track Segments (0 to 25.000+ km) */}
              <div className="h-3 w-full bg-[#E2E8F0] rounded-full overflow-hidden flex border border-[#CBD5E1] shadow-inner">
                <div
                  className="h-full bg-[#FDE68A] border-r border-white/60 w-[20%]"
                  title="Muy bajo (< 5.000 km/año)"
                />
                <div
                  className="h-full bg-[#BAE6FD] border-r border-white/60 w-[20%]"
                  title="Moderado (5.000 - 10.000 km/año)"
                />
                <div
                  className="h-full bg-[#86EFAC] border-r border-white/60 w-[20%]"
                  title="Estándar promedio (10.000 - 15.000 km/año)"
                />
                <div
                  className="h-full bg-[#FCD34D] border-r border-white/60 w-[20%]"
                  title="Alto (15.000 - 20.000 km/año)"
                />
                <div
                  className="h-full bg-[#FCA5A5] w-[20%]"
                  title="Severo (> 20.000 km/año)"
                />
              </div>
            </div>

            {/* 5 Distinct Range Cards with Live Highlight */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-0.5">
              {/* Rango 1: Muy Bajo */}
              <div
                className={`p-2 rounded-lg border text-center transition-all ${
                  resultadoKm.categoria === 'muy_bajo'
                    ? 'bg-[#FFFBEB] border-[#FDE68A] shadow-xs ring-2 ring-[#D97706]'
                    : 'bg-white border-[#E2E8F0] opacity-75'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-[#0F1B2B]">&lt; 5.000 km</div>
                <div className="text-[11px] font-semibold text-[#D97706] mt-0.5">Muy bajo</div>
                <div className="text-[9px] text-[#64748B] leading-tight">Posible alteración</div>
              </div>

              {/* Rango 2: Moderado */}
              <div
                className={`p-2 rounded-lg border text-center transition-all ${
                  resultadoKm.categoria === 'bajo'
                    ? 'bg-[#F0F9FF] border-[#BAE6FD] shadow-xs ring-2 ring-[#0284C7]'
                    : 'bg-white border-[#E2E8F0] opacity-75'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-[#0F1B2B]">5k – 10.000 km</div>
                <div className="text-[11px] font-semibold text-[#0284C7] mt-0.5">Moderado</div>
                <div className="text-[9px] text-[#64748B] leading-tight">Uso ocasional</div>
              </div>

              {/* Rango 3: Normal / Estándar */}
              <div
                className={`p-2 rounded-lg border text-center transition-all ${
                  resultadoKm.categoria === 'normal'
                    ? 'bg-[#F0FDF4] border-[#BBF7D0] shadow-xs ring-2 ring-[#16A34A]'
                    : 'bg-white border-[#E2E8F0] opacity-75'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-[#0F1B2B]">10k – 15.000 km</div>
                <div className="text-[11px] font-semibold text-[#166534] mt-0.5">Estándar</div>
                <div className="text-[9px] text-[#64748B] leading-tight">Promedio país</div>
              </div>

              {/* Rango 4: Alto */}
              <div
                className={`p-2 rounded-lg border text-center transition-all ${
                  resultadoKm.categoria === 'alto'
                    ? 'bg-[#FFFBEB] border-[#FDE68A] shadow-xs ring-2 ring-[#D97706]'
                    : 'bg-white border-[#E2E8F0] opacity-75'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-[#0F1B2B]">15k – 20.000 km</div>
                <div className="text-[11px] font-semibold text-[#D97706] mt-0.5">Alto</div>
                <div className="text-[9px] text-[#64748B] leading-tight">Carretera / Viajero</div>
              </div>

              {/* Rango 5: Severo */}
              <div
                className={`col-span-2 sm:col-span-1 p-2 rounded-lg border text-center transition-all ${
                  resultadoKm.categoria === 'excesivo'
                    ? 'bg-[#FEF2F2] border-[#FECACA] shadow-xs ring-2 ring-[#DC2626]'
                    : 'bg-white border-[#E2E8F0] opacity-75'
                }`}
              >
                <div className="text-[10px] font-mono font-bold text-[#0F1B2B]">&gt; 20.000 km</div>
                <div className="text-[11px] font-semibold text-[#DC2626] mt-0.5">Severo</div>
                <div className="text-[9px] text-[#64748B] leading-tight">Uso intensivo</div>
              </div>
            </div>
          </div>

          {/* Collapsible Diagnostic Interpretation Note with accurate title */}
          <div className="rounded-lg border border-[#E2E8F0] overflow-hidden bg-[#F8FAFC]">
            <button
              type="button"
              onClick={() => setMostrarPauta((prev) => !prev)}
              className="w-full p-3 flex items-center justify-between gap-2 hover:bg-[#F1F5F9] transition-colors cursor-pointer text-left select-none"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileSearch className="w-4 h-4 text-[#0F1B2B] shrink-0" />
                <span className="text-xs font-semibold text-[#0F1B2B]">
                  ¿Qué significa este resultado? Interpretación del kilometraje
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 text-[#64748B]">
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
              <div className="px-3.5 pb-3.5 pt-1 text-xs text-[#475569] leading-relaxed border-t border-[#E2E8F0] animate-fadeIn">
                {resultadoKm.categoria === 'muy_bajo' ? (
                  <div>
                    <strong className="text-[#D97706] block mb-1">
                      Sospecha de alteración de odómetro (&lt; 5.000 km/año):
                    </strong>
                    El odómetro registra un recorrido inusualmente bajo para los {antiguedad} años del vehículo. Revisa con lupa el desgaste físico en el volante, la palanca de cambios, las gomas de los pedales y la fecha de fabricación (DOT) de las llantas para verificar si coinciden con el kilometraje mostrado.
                  </div>
                ) : resultadoKm.categoria === 'excesivo' ? (
                  <div>
                    <strong className="text-[#DC2626] block mb-1">
                      Desgaste mecánico severo (&gt; 20.000 km/año):
                    </strong>
                    El vehículo excede ampliamente el promedio particular en Colombia. Esto suele indicar trabajo continuo en plataformas digitales, servicio o viajes constantes de carretera. Es indispensable revisar compresión de motor, fugas y el tren delantero.
                  </div>
                ) : resultadoKm.categoria === 'alto' ? (
                  <div>
                    <strong className="text-[#D97706] block mb-1">
                      Uso elevado en carretera (15.000 a 20.000 km/año):
                    </strong>
                    El vehículo ha tenido un uso más activo que el promedio. Aunque no descarta la compra si cuenta con buen historial de mantenimiento, presta especial atención al desgaste en pastillas, discos de freno, amortiguadores y sincronización.
                  </div>
                ) : resultadoKm.categoria === 'bajo' ? (
                  <div>
                    <strong className="text-[#0284C7] block mb-1">
                      Uso moderado (5.000 a 10.000 km/año):
                    </strong>
                    El vehículo presenta un ritmo de uso favorable, típico de trayectos urbanos cortos o uso recreativo de fin de semana. Comprueba que se le hayan realizado los cambios de aceite y fluidos por tiempo (mínimo una vez al año).
                  </div>
                ) : (
                  <div>
                    <strong className="text-[#166534] block mb-1">
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
