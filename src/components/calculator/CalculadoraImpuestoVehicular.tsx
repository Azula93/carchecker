'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Building2,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
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
  { valor: 'automoviles', etiqueta: 'Automóvil (Sedán, Hatchback o Familiar)' },
  { valor: 'camionetas_camperos', etiqueta: 'Camioneta o Campero (SUV, 4x4)' },
  { valor: 'doble_cabina', etiqueta: 'Camioneta Platón Doble Cabina (Pick-up)' },
  { valor: 'electricos', etiqueta: 'Carro 100% Eléctrico' },
  { valor: 'hibridos', etiqueta: 'Carro Híbrido' },
  { valor: 'motocicletas', etiqueta: 'Moto o Motocarro' },
  { valor: 'carga', etiqueta: 'Camión o Carga' },
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

  const onImpuestoChangeRef = useRef(onImpuestoChange);
  useEffect(() => {
    onImpuestoChangeRef.current = onImpuestoChange;
  }, [onImpuestoChange]);

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
          setErrorMensaje(json.message || 'No encontramos el avalúo oficial para este modelo específico.');
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
        setErrorMensaje('Error de conexión con la tabla oficial de impuestos.');
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
    <div className={`p-4 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-4 ${className}`}>
      {/* Encabezado Editorial */}
      <div className="flex items-start justify-between border-b border-slate-100 pb-3 gap-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-800" />
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900 font-mono">
              Impuesto vehicular 2026
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Calcula cuánto pagará de impuesto este año según el avalúo oficial fijado por el Ministerio de Transporte.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => {
              setModoManual(!modoManual);
              setHaInteractuado(true);
            }}
            className="text-[11px] font-mono text-slate-600 hover:text-slate-900 hover:underline cursor-pointer"
          >
            {modoManual ? 'Usar tabla oficial' : 'Escribir valor a mano'}
          </button>
          {onCerrar && (
            <button
              type="button"
              onClick={onCerrar}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
              title="Cerrar calculadora"
            >
              <span>✕ Cerrar</span>
            </button>
          )}
        </div>
      </div>

      {!modoManual ? (
        <>
          {/* Selectores en Cascada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* 1. Categoría */}
            <div>
              <label className="block font-semibold text-slate-900 mb-1">Tipo de carro</label>
              <select
                value={categoria}
                onChange={(e) => {
                  setCategoria(e.target.value as CategoriaTablaImpuesto);
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-medium focus:outline-none focus:border-slate-800 cursor-pointer shadow-2xs"
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
              <label className="block font-semibold text-slate-900 mb-1">Marca</label>
              <select
                value={marca}
                onChange={(e) => {
                  setMarca(e.target.value);
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-medium focus:outline-none focus:border-slate-800 cursor-pointer uppercase shadow-2xs"
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
              <label className="block font-semibold text-slate-900 mb-1">Línea o versión</label>
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
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-medium focus:outline-none focus:border-slate-800 cursor-pointer uppercase truncate shadow-2xs"
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
              <label className="block font-semibold text-slate-900 mb-1">Año del modelo</label>
              <select
                value={anioModelo}
                onChange={(e) => {
                  setAnioModelo(parseInt(e.target.value, 10));
                  setHaInteractuado(true);
                }}
                className="w-full h-10 px-2.5 rounded-lg bg-white border border-slate-300 text-slate-800 font-medium focus:outline-none focus:border-slate-800 cursor-pointer shadow-2xs"
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
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center gap-2 text-xs text-slate-600">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-900" />
              <span>Buscando el avalúo oficial en la tabla del Ministerio de Transporte...</span>
            </div>
          )}

          {/* Resultado de éxito */}
          {datosImpuesto && !cargando && (
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    Impuesto vehicular para este año calculado con éxito
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  Tarifa: {datosImpuesto.tarifaTexto}
                </span>
              </div>

              {/* Métricas Principales */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 pt-1">
                {/* 1. Base gravable oficial */}
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1 min-w-0">
                  <span className="text-xs text-slate-500 block font-medium">
                    Avalúo oficial MinTransporte
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-slate-900 block tracking-tight">
                    {formatoCOP(datosImpuesto.baseGravable)}
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Valor fiscal de referencia
                  </span>
                </div>

                {/* 2. Tarifa */}
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1 min-w-0">
                  <span className="text-xs text-slate-500 block font-medium">
                    Porcentaje a pagar
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-emerald-700 block tracking-tight">
                    {datosImpuesto.tarifaTexto}
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Fijado por ley en Colombia
                  </span>
                </div>

                {/* 3. Impuesto anual */}
                <div className="p-3.5 bg-white rounded-lg border border-slate-200 space-y-1 min-w-0">
                  <span className="text-xs text-slate-500 block font-medium">
                    Total a pagar en el año
                  </span>
                  <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-slate-900 block tracking-tight">
                    {formatoCOP(datosImpuesto.impuestoAnualEstimado)}
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-tight">
                    Se paga a la gobernación
                  </span>
                </div>

                {/* 4. Ahorro mensual */}
                <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-200 space-y-1 min-w-0">
                  <span className="text-xs text-emerald-800 block font-semibold">
                    Ahorro mensual sugerido
                  </span>
                  <div className="flex flex-wrap items-baseline gap-1">
                    <span className="text-base sm:text-lg xl:text-xl font-bold font-mono text-emerald-900 tracking-tight">
                      {formatoCOP(datosImpuesto.provisionMensual)}
                    </span>
                    <span className="text-xs font-mono font-medium text-emerald-700">
                      / mes
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 block leading-tight">
                    Guarda esto cada mes
                  </span>
                </div>
              </div>

              {/* Explicación en lenguaje sencillo */}
              <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-600 leading-relaxed">
                ℹ️ <strong>Nota sobre el avalúo:</strong> El avalúo del Ministerio de Transporte es el valor fiscal que el Gobierno le pone al carro para cobrar el impuesto. Suele ser un poco más bajo que el precio comercial al que se vende en la calle.
              </div>
            </div>
          )}

          {/* Error con sugerencias de coincidencia */}
          {errorMensaje && !cargando && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-start gap-2.5 text-xs text-amber-900">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="block mb-0.5">No encontramos el avalúo exacto:</strong>
                  <span>{errorMensaje} Puedes cambiar la versión o escribir el valor directamente en el botón de arriba.</span>
                </div>
              </div>

              {coincidencias && coincidencias.length > 0 && (
                <div className="pt-2 border-t border-amber-200/80">
                  <span className="text-[11px] font-semibold text-amber-900 block mb-1.5">
                    ¿Quizás es alguna de estas versiones parecidas?
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {coincidencias.slice(0, 4).map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          setIdVehiculo(c.id);
                          setLinea(c.linea);
                          setCilindraje(c.cilindraje);
                          setHaInteractuado(true);
                        }}
                        className="text-[11px] px-2 py-1 bg-white hover:bg-amber-100 border border-amber-300 rounded text-amber-900 transition-colors cursor-pointer"
                      >
                        {c.linea} {c.cilindraje ? `(${c.cilindraje}cc)` : ''}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        /* Modo Manual */
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
          <span className="font-semibold text-slate-900 block">
            Escribe el valor aproximado que paga de impuesto al año
          </span>
          <div className="relative max-w-xs">
            <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">$</span>
            <input
              type="text"
              value={impuestoManual === '' ? '' : impuestoManual.toLocaleString('es-CO')}
              onChange={(e) => {
                const val = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
                setImpuestoManual(val);
                if (onImpuestoChangeRef.current) {
                  onImpuestoChangeRef.current(val, null);
                }
              }}
              placeholder="Ej. 650000"
              className="w-full h-10 pl-7 pr-3 rounded-lg bg-white border border-slate-300 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-slate-800"
            />
          </div>
          <p className="text-[11px] text-slate-500">
            En Colombia los carros particulares pagan entre el 1.5% y el 2.5% de su avalúo comercial.
          </p>
        </div>
      )}
    </div>
  );
};
