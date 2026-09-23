'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Building2,
  RefreshCw,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Info,
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
  className = '',
}) => {
  const [categoria, setCategoria] = useState<CategoriaTablaImpuesto>(categoriaInicial);
  const [marca, setMarca] = useState<string>(marcaInicial);
  const [linea, setLinea] = useState<string>(lineaInicial);
  const [idVehiculo, setIdVehiculo] = useState<string>('');
  const [anioModelo, setAnioModelo] = useState<number>(anioModeloInicial);
  const [cilindraje, setCilindraje] = useState<number | undefined>(cilindrajeInicial);

  const [marcasDisponibles, setMarcasDisponibles] = useState<string[]>([]);
  const [lineasDisponibles, setLineasDisponibles] = useState<Array<{ id: string; linea: string; cilindraje?: number }>>([]);

  const [cargando, setCargando] = useState<boolean>(false);
  const [datosImpuesto, setDatosImpuesto] = useState<DatosImpuestoVehicular | null>(null);
  const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
  const [coincidencias, setCoincidencias] = useState<RespuestaImpuestoVehicularAPI['coincidencias']>([]);

  // Modo manual fallback
  const [modoManual, setModoManual] = useState<boolean>(false);
  const [impuestoManual, setImpuestoManual] = useState<number>(0);

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
          if (onImpuestoChangeRef.current && !modoManual) {
            onImpuestoChangeRef.current(json.data.impuestoAnualEstimado, json.data);
          }
        } else {
          setDatosImpuesto(null);
          setErrorMensaje(json.message || 'No fue posible determinar la base gravable oficial para este vehículo.');
          setCoincidencias(json.coincidencias || []);
          if (onImpuestoChangeRef.current && !modoManual) {
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
  }, [categoria, idVehiculo, marca, linea, anioModelo, cilindraje, modoManual]);

  const formatoCOP = (val: number) => `$ ${val.toLocaleString('es-CO')}`;

  return (
    <div className={`p-4 sm:p-5 rounded-xl bg-white border border-[#CBD5E1] shadow-sm space-y-4 ${className}`}>
      {/* Encabezado */}
      <div className="flex items-start justify-between border-b border-[#F1F5F9] pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#0F1B2B]" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F1B2B]">
              Impuesto Vehicular Oficial (MinTransporte 2026)
            </span>
          </div>
          <p className="text-[11px] text-[#64748B]">
            Base gravable oficial (Resolución 20253040048935) y tarifas nacionales (Decreto 1457 de 2025).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModoManual(!modoManual)}
          className="text-[11px] font-mono text-[#0F1B2B] hover:underline cursor-pointer"
        >
          {modoManual ? 'Volver a tabla oficial' : 'Ajustar manualmente'}
        </button>
      </div>

      {!modoManual ? (
        <>
          {/* Selectores en Cascada */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* 1. Categoría */}
            <div>
              <label className="block font-semibold text-[#0F1B2B] mb-1">Categoría Oficial</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value as CategoriaTablaImpuesto)}
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
                onChange={(e) => setMarca(e.target.value)}
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
                onChange={(e) => setAnioModelo(parseInt(e.target.value, 10))}
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
            <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#166534]" />
                  <span className="text-xs font-bold text-[#166534] uppercase font-mono">
                    Base gravable oficial identificada ({datosImpuesto.vigencia})
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] font-semibold">
                  Tarifa: {datosImpuesto.tarifaTexto}
                </span>
              </div>

              {/* Métricas Principales */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-2.5 bg-white rounded-lg border border-[#BBF7D0]">
                  <span className="text-[10px] text-[#64748B] block font-mono">Base Gravable Oficial</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-[#0F1B2B]">
                    {formatoCOP(datosImpuesto.baseGravable)}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-[#BBF7D0]">
                  <span className="text-[10px] text-[#64748B] block font-mono">Tarifa Aplicada</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-[#166534]">
                    {datosImpuesto.tarifaTexto}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-[#BBF7D0]">
                  <span className="text-[10px] text-[#64748B] block font-mono">Impuesto Anual Estimado</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-[#0F1B2B]">
                    {formatoCOP(datosImpuesto.impuestoAnualEstimado)}
                  </span>
                </div>

                <div className="p-2.5 bg-white rounded-lg border border-[#BBF7D0]">
                  <span className="text-[10px] text-[#64748B] block font-mono">Provisión Mensual</span>
                  <span className="text-sm sm:text-base font-bold font-mono text-[#166534]">
                    {formatoCOP(datosImpuesto.provisionMensual)}
                  </span>
                </div>
              </div>

              {datosImpuesto.notaEspecial && (
                <div className="p-2 rounded bg-white/75 border border-[#BBF7D0] text-[11px] text-[#166534]">
                  ℹ️ {datosImpuesto.notaEspecial}
                </div>
              )}

              {/* Trazabilidad de Fuentes Oficiales */}
              <div className="pt-2 border-t border-[#DCFCE7] flex flex-wrap items-center justify-between text-[11px] text-[#166534] gap-2">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5">
                  <span>
                    <strong>Base Gravable:</strong> {datosImpuesto.fuente.nombre} (Res. {datosImpuesto.fuente.resolucion})
                  </span>
                  <span>·</span>
                  <span>
                    <strong>Tarifas:</strong> {datosImpuesto.fuente.entidadTarifas} ({datosImpuesto.fuente.decretoTarifas})
                  </span>
                </div>

                {datosImpuesto.fuente.urlBaseGravable && (
                  <a
                    href={datosImpuesto.fuente.urlBaseGravable}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold hover:underline"
                  >
                    <span>Ver publicación MinTransporte</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
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

          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-60">
              <span className="absolute left-3 top-2.5 text-xs font-mono text-[#64748B]">$</span>
              <input
                type="text"
                value={impuestoManual === 0 ? '' : impuestoManual.toLocaleString('es-CO')}
                onChange={(e) => {
                  const val = parseInt(e.target.value.replace(/\D/g, ''), 10) || 0;
                  setImpuestoManual(val);
                  if (onImpuestoChange) {
                    onImpuestoChange(val, null);
                  }
                }}
                placeholder="Ej. 1.800.000"
                className="w-full h-10 pl-7 pr-3 rounded-lg bg-white border border-[#CBD5E1] text-xs font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
              />
            </div>
            <span className="text-xs font-mono text-[#64748B]">
              Provisión mensual: {formatoCOP(Math.round(impuestoManual / 12))}
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
