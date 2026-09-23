'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Building2,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronDown,
} from 'lucide-react';
import type {
  CategoriaTablaImpuesto,
  DatosImpuestoVehicular,
  RespuestaImpuestoVehicularAPI,
} from '@/types/external-data';
import { ANIO_ACTUAL } from '@/lib/constants';

interface CalculadoraImpuestoVehicularProps {
  categoriaInicial?: CategoriaTablaImpuesto;
  marcaInicial?: string;
  lineaInicial?: string;
  anioModeloInicial?: number;
  cilindrajeInicial?: number;
  onImpuestoChange?: (impuestoAnual: number, datos: DatosImpuestoVehicular | null) => void;
  onCerrar?: () => void;
  yaCalculado?: boolean;
  className?: string;
}

const CATEGORIAS_OPCIONES: Array<{ valor: CategoriaTablaImpuesto; etiqueta: string }> = [
  { valor: 'automoviles', etiqueta: 'Automóvil (Sedán / Hatchback / Familiar)' },
  { valor: 'camionetas_camperos', etiqueta: 'Camioneta o Campero (SUV / 4x4)' },
  { valor: 'doble_cabina', etiqueta: 'Camioneta Doble Cabina (Pick-up)' },
  { valor: 'electricos', etiqueta: 'Vehículo Eléctrico (100% BEV)' },
  { valor: 'hibridos', etiqueta: 'Vehículo Híbrido (HEV / PHEV / MHEV)' },
  { valor: 'motocicletas', etiqueta: 'Motocicleta / Motocarro' },
  { valor: 'carga', etiqueta: 'Vehículo de Carga' },
  { valor: 'pasajeros', etiqueta: 'Transporte de Pasajeros' },
];

export const CalculadoraImpuestoVehicular: React.FC<CalculadoraImpuestoVehicularProps> = ({
  categoriaInicial = 'automoviles',
  marcaInicial = 'MAZDA',
  lineaInicial = '',
  anioModeloInicial = 2022,
  cilindrajeInicial,
  onImpuestoChange,
  onCerrar,
  yaCalculado = false,
  className = '',
}) => {
  const [categoria, setCategoria] = useState<CategoriaTablaImpuesto>(categoriaInicial);
  const [marca, setMarca] = useState<string>(marcaInicial);
  const [linea, setLinea] = useState<string>(lineaInicial);
  const [idVehiculo, setIdVehiculo] = useState<string>('');
  const [anioModelo, setAnioModelo] = useState<number>(anioModeloInicial);
  const [cilindraje, setCilindraje] = useState<number | undefined>(cilindrajeInicial);
  const [haInteractuado, setHaInteractuado] = useState<boolean>(yaCalculado);

  const [marcasDisponibles, setMarcasDisponibles] = useState<string[]>([]);
  const [lineasDisponibles, setLineasDisponibles] = useState<Array<{ id: string; linea: string; cilindraje?: number }>>([]);

  const [cargando, setCargando] = useState<boolean>(false);
  const [datosImpuesto, setDatosImpuesto] = useState<DatosImpuestoVehicular | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [coincidencias, setCoincidencias] = useState<RespuestaImpuestoVehicularAPI['coincidencias']>([]);

  // Modo manual fallback
  const [modoManual, setModoManual] = useState<boolean>(false);
  const [impuestoManual, setImpuestoManual] = useState<number | ''>(0);
  const [mostrarFuentes, setMostrarFuentes] = useState<boolean>(false);

  const onImpuestoChangeRef = useRef(onImpuestoChange);
  useEffect(() => {
    onImpuestoChangeRef.current = onImpuestoChange;
  }, [onImpuestoChange]);

  // Lista de años disponibles para el selector
  const anios = useMemo(() => {
    const lista: number[] = [];
    for (let y = ANIO_ACTUAL + 1; y >= 2010; y--) {
      lista.push(y);
    }
    return lista;
  }, []);

  // 1. Cargar marcas cuando cambia la categoría
  useEffect(() => {
    fetch(`/api/impuesto-vehicular?action=marcas&categoria=${categoria}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.marcas)) {
          setMarcasDisponibles(data.marcas);
          setMarca((prev) => (data.marcas.includes(prev) ? prev : (data.marcas[0] || '')));
        }
      })
      .catch(() => {});
  }, [categoria]);

  // 2. Cargar líneas cuando cambia la marca
  useEffect(() => {
    if (!marca) return;
    fetch(`/api/impuesto-vehicular?action=lineas&categoria=${categoria}&marca=${encodeURIComponent(marca)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.lineas)) {
          setLineasDisponibles(data.lineas);
          if (data.lineas.length > 0) {
            setIdVehiculo((prevId) => {
              const match = data.lineas.find((l: { id: string; linea: string; cilindraje?: number }) => l.id === prevId);
              if (match) {
                setLinea(match.linea);
                setCilindraje(match.cilindraje);
                return match.id;
              }
              setLinea(data.lineas[0].linea);
              setCilindraje(data.lineas[0].cilindraje);
              return data.lineas[0].id;
            });
          } else {
            setIdVehiculo('');
            setLinea('');
          }
        }
      })
      .catch(() => {});
  }, [categoria, marca]);

  // 3. Consultar base gravable e impuesto estimado
  useEffect(() => {
    let cancel = false;
    if (!anioModelo || (!idVehiculo && !linea)) return;

    Promise.resolve().then(() => {
      if (!cancel) setCargando(true);
    });

    const query = new URLSearchParams();
    query.set('categoria', categoria);
    query.set('anioModelo', anioModelo.toString());
    if (idVehiculo) query.set('idVehiculo', idVehiculo);
    if (marca) query.set('marca', marca);
    if (linea) query.set('linea', linea);
    if (cilindraje) query.set('cilindraje', cilindraje.toString());

    fetch(`/api/impuesto-vehicular?${query.toString()}`)
      .then((res) => res.json())
      .then((json: RespuestaImpuestoVehicularAPI) => {
        if (cancel) return;

        if (json.success && json.data) {
          setDatosImpuesto(json.data);
          setErrorMensaje(null);
          setCoincidencias([]);
          if (onImpuestoChangeRef.current && !modoManual && haInteractuado) {
            onImpuestoChangeRef.current(json.data.impuestoAnualEstimado, json.data);
          }
        } else {
          setDatosImpuesto(null);
          setErrorMensaje(json.message || 'No fue posible determinar la base gravable oficial para este vehículo.');
          setCoincidencias(json.coincidencias || []);
          if (onImpuestoChangeRef.current && !modoManual && haInteractuado) {
            onImpuestoChangeRef.current(0, null);
          }
        }
      })
      .catch((err) => {
        if (cancel) return;
        console.error('Error al consultar impuesto vehicular:', err);
        setDatosImpuesto(null);
        setErrorMensaje('Error de conexión con el servicio de base gravable oficial.');
      })
      .finally(() => {
        if (!cancel) setCargando(false);
      });

    return () => {
      cancel = true;
    };
  }, [categoria, idVehiculo, marca, linea, anioModelo, cilindraje, modoManual, haInteractuado]);

  const formatoCOP = (val: number) => `$${Math.round(val).toLocaleString('es-CO')}`;

  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-4 ${className}`}>
      {/* Encabezado con Botón de Cierre Superior Accesible */}
      <div className="flex items-start justify-between border-b border-[#F1F5F9] pb-3 gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0F1B2B]" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F1B2B]">
              Impuesto vehicular 2026
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Cálculo estimado a partir del avalúo fiscal oficial y las tarifas departamentales vigentes.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setModoManual(!modoManual);
              setHaInteractuado(true);
            }}
            className="text-[11px] font-mono text-[#0F1B2B] hover:underline cursor-pointer"
          >
            {modoManual ? 'Volver a tabla oficial' : 'Ajustar manualmente'}
          </button>
          {onCerrar && (
            <button
              type="button"
              onClick={onCerrar}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-[#475569] hover:bg-slate-200 hover:text-[#0F1B2B] transition-colors cursor-pointer"
              title="Cerrar calculadora"
            >
              <span>✕ Cerrar</span>
            </button>
          )}
        </div>
      </div>

      {!modoManual ? (
        <>
          {/* Selectores en Cascada - Herramienta Primero */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* 1. Categoría */}
            <div>
              <label className="block font-semibold text-[#0F1B2B] mb-1">Categoría Oficial</label>
              <select
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value as CategoriaTablaImpuesto);
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] font-medium focus:outline-none focus:border-[#0F1B2B] cursor-pointer"
              >
                {CATEGORIAS_OPCIONES.map((opt) => (
                  <option key={opt.valor} value={opt.valor}>
                    {opt.etiqueta}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Marca */}
            <div>
              <label className="block font-semibold text-[#0F1B2B] mb-1">Marca</label>
              <select
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] font-medium focus:outline-none focus:border-[#0F1B2B] cursor-pointer uppercase"
              >
                {marcasDisponibles.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Línea / Referencia */}
            <div>
              <label className="block font-semibold text-[#0F1B2B] mb-1">Línea Oficial</label>
              <select
                value={idVehiculo}
                onChange={(e) => {
                  const sel = lineasDisponibles.find((l) => l.id === e.target.value);
                  if (sel) {
                    setIdVehiculo(sel.id);
                    setLinea(sel.linea);
                    setCilindraje(sel.cilindraje);
                  }
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] font-medium focus:outline-none focus:border-[#0F1B2B] cursor-pointer uppercase truncate"
              >
                {lineasDisponibles.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.linea} {l.cilindraje ? `(${l.cilindraje} c.c.)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Año Modelo */}
            <div>
              <label className="block font-semibold text-[#0F1B2B] mb-1">Año Modelo</label>
              <select
                value={anioModelo}
                onChange={(e) => {
                  setAnioModelo(parseInt(e.target.value, 10));
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] font-medium focus:outline-none focus:border-[#0F1B2B] cursor-pointer"
              >
                {anios.map((y) => (
                  <option key={y} value={y}>
                    Modelo {y}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Estado de carga */}
          {cargando && (
            <div className="p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] flex items-center justify-center gap-2 text-xs text-[#64748B]">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#0F1B2B]" />
              <span>Consultando base gravable oficial MinTransporte...</span>
            </div>
          )}

          {/* Resultado de éxito */}
          {datosImpuesto && !cargando && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  <span className="text-xs sm:text-sm font-bold text-[#166534]">
                    Impuesto vehicular 2026 calculado
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] font-semibold">
                  Tarifa: {datosImpuesto.tarifaTexto}
                </span>
              </div>

              {/* Métricas Principales (Grid responsivo sin truncamiento de números) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 pt-1">
                {/* 1. Base gravable oficial */}
                <div className="p-3.5 bg-white rounded-lg border border-[#BBF7D0] space-y-1 min-w-0">
                  <span className="text-xs text-[#475569] block font-medium">
                    Base gravable oficial
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-[#0F1B2B] block tracking-tight">
                    {formatoCOP(datosImpuesto.baseGravable)}
                  </span>
                  <span className="text-[11px] text-[#64748B] block leading-tight">
                    Avalúo fiscal MinTransporte
                  </span>
                </div>

                {/* 2. Tarifa */}
                <div className="p-3.5 bg-white rounded-lg border border-[#BBF7D0] space-y-1 min-w-0">
                  <span className="text-xs text-[#475569] block font-medium">
                    Tarifa aplicada
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-[#166534] block tracking-tight">
                    {datosImpuesto.tarifaTexto}
                  </span>
                  <span className="text-[11px] text-[#64748B] block leading-tight">
                    Rango tributario oficial
                  </span>
                </div>

                {/* 3. Impuesto anual */}
                <div className="p-3.5 bg-white rounded-lg border border-[#BBF7D0] space-y-1 min-w-0">
                  <span className="text-xs text-[#475569] block font-medium">
                    Impuesto anual estimado
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-[#0F1B2B] block tracking-tight">
                    {formatoCOP(datosImpuesto.impuestoAnualEstimado)}
                  </span>
                  <span className="text-[11px] text-[#64748B] block leading-tight">
                    Monto anual para liquidar
                  </span>
                </div>

                {/* 4. Si quieres presupuestarlo mes a mes */}
                <div className="p-3.5 bg-white rounded-lg border border-[#BBF7D0] space-y-1 min-w-0">
                  <span className="text-xs text-[#166534] block font-semibold">
                    Para presupuestar cada mes
                  </span>
                  <div className="flex flex-wrap items-baseline gap-1">
                    <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-[#166534] tracking-tight">
                      {formatoCOP(datosImpuesto.provisionMensual)}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#166534]">
                      / mes
                    </span>
                  </div>
                  <span className="text-[11px] text-[#166534] block leading-tight">
                    Provisión mensual (dividir en 12)
                  </span>
                </div>
              </div>

              {/* Explicación de base gravable fuera de las tarjetas */}
              <div className="p-2.5 rounded-lg bg-white/90 border border-[#BBF7D0] text-[11px] text-[#475569] leading-relaxed">
                ℹ️ <strong>Nota sobre el valor oficial:</strong> La base gravable es el avalúo oficial fijado por el Ministerio de Transporte para calcular el impuesto vehicular. No corresponde necesariamente al valor comercial o precio de venta del carro en el mercado.
              </div>

              {!haInteractuado && (
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setHaInteractuado(true);
                      if (onImpuestoChangeRef.current && datosImpuesto) {
                        onImpuestoChangeRef.current(datosImpuesto.impuestoAnualEstimado, datosImpuesto);
                      }
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-[#0F1B2B] text-white hover:bg-[#1A2B42] transition-colors cursor-pointer"
                  >
                    <span>Aplicar impuesto a mi presupuesto →</span>
                  </button>
                </div>
              )}

              {datosImpuesto.notaEspecial && (
                <div className="p-2.5 rounded-lg bg-white/80 border border-[#BBF7D0] text-xs text-[#166534]">
                  ℹ️ {datosImpuesto.notaEspecial}
                </div>
              )}

              {/* Fuentes con patrón colapsable '¿De dónde salen estos datos?' */}
              <div className="pt-2 border-t border-[#DCFCE7] space-y-2">
                <button
                  type="button"
                  onClick={() => setMostrarFuentes(!mostrarFuentes)}
                  className="text-xs font-mono text-[#166534] hover:underline cursor-pointer flex items-center gap-1.5 font-medium py-1"
                >
                  <span>¿De dónde salen estos datos?</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${mostrarFuentes ? 'rotate-180' : ''}`} />
                </button>

                {mostrarFuentes && (
                  <div className="p-3.5 rounded-lg bg-white border border-[#BBF7D0] text-xs text-[#475569] space-y-2.5">
                    <div>
                      <span className="font-semibold text-[#0F1B2B] block">Base del vehículo:</span>
                      <p className="text-[11px] text-[#64748B]">
                        Ministerio de Transporte de Colombia · Resolución 20253040048935
                      </p>
                    </div>
                    <div>
                      <span className="font-semibold text-[#0F1B2B] block">Tarifas:</span>
                      <p className="text-[11px] text-[#64748B]">
                        Ministerio de Hacienda y Crédito Público · Decreto 1457 de 2025
                      </p>
                    </div>
                    {datosImpuesto.fuente.urlBaseGravable && (
                      <div className="pt-1 border-t border-slate-100">
                        <a
                          href={datosImpuesto.fuente.urlBaseGravable}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[#1D4ED8] hover:underline font-medium"
                        >
                          <span>Ver publicación oficial en MinTransporte</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mensaje de error o caso especial */}
          {errorMensaje && !cargando && (
            <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-2">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#92400E] block">
                    {errorMensaje}
                  </span>
                  <p className="text-[11px] text-[#B45309] leading-relaxed">
                    Puedes ajustar el valor manualmente si conoces la liquidación emitida por tu departamento.
                  </p>
                </div>
              </div>

              {/* Si hay múltiples opciones técnicas */}
              {coincidencias && coincidencias.length > 0 && (
                <div className="pt-2 space-y-1">
                  <span className="text-[11px] font-semibold text-[#92400E]">Variantes disponibles en la tabla oficial:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {coincidencias.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setIdVehiculo(c.id);
                          setLinea(c.linea);
                          setCilindraje(c.cilindraje);
                        }}
                        className="text-left p-2 rounded bg-white border border-[#FDE68A] hover:bg-[#FEF3C7] text-[11px] text-[#0F1B2B] transition-colors cursor-pointer"
                      >
                        <span className="font-bold">{c.marca} {c.linea}</span>
                        {c.cilindraje && <span className="text-[#64748B] block">{c.cilindraje} c.c.</span>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        /* Modo de Ajuste Manual */
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] space-y-3">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-[#64748B] shrink-0 mt-0.5" />
            <div className="text-xs text-[#475569]">
              <span className="font-semibold block text-[#0F1B2B]">Ingreso manual de impuesto anual</span>
              Digita el valor estimado o el monto liquidado que te aparece en la Secretaría de Hacienda de tu departamento.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative w-full sm:w-60">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-[#64748B]">$</span>
              <input
                type="text"
                value={impuestoManual === '' ? '' : impuestoManual.toLocaleString('es-CO')}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\D/g, '');
                  if (raw === '') {
                    setImpuestoManual('');
                    if (onImpuestoChange) {
                      onImpuestoChange(0, null);
                    }
                  } else {
                    const val = parseInt(raw, 10);
                    setImpuestoManual(val);
                    if (onImpuestoChange) {
                      onImpuestoChange(val, null);
                    }
                  }
                }}
                placeholder="Ej. 800.000"
                className="w-full h-11 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono font-bold text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
            </div>
            <span className="text-xs text-[#64748B]">
              Si quieres presupuestarlo mes a mes:{' '}
              <strong className="text-[#0F1B2B] font-mono">
                {formatoCOP(Math.round((typeof impuestoManual === 'number' ? impuestoManual : 0) / 12))}
              </strong>{' '}
              / mes
            </span>
          </div>
        </div>
      )}

      {/* Advertencia Legal Informativa Obligatoria */}
      <p className="text-[11px] text-[#64748B] italic leading-relaxed pt-1 border-t border-[#F1F5F9]">
        ⓘ Este valor es una estimación calculada a partir de la base gravable oficial y las tarifas nacionales vigentes. La liquidación definitiva corresponde a la autoridad tributaria competente de cada departamento o distrito y depende de las condiciones particulares del vehículo.
      </p>
    </div>
  );
};
