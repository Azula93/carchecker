'use client';

import React, { useState } from 'react';
import {
  Car,
  TrendingDown,
  Wrench,
  Trash2,
  Plus,
  PackageOpen,
  Info,
} from 'lucide-react';
import { CostoReparacion, DatosBasicos } from '../../types/evaluation';
import { formatCOP } from '../../data/repair-costs';
import { CurrencyInput } from '../ui/CurrencyInput';

interface Step4CostosProps {
  costos: CostoReparacion[];
  precioVenta: number;
  datosBasicos?: DatosBasicos;
  onCostosChange: (costos: CostoReparacion[]) => void;
  onPrecioVentaChange: (precio: number) => void;
}

export const Step4Costos: React.FC<Step4CostosProps> = ({
  costos,
  precioVenta,
  datosBasicos,
  onCostosChange,
  onPrecioVentaChange,
}) => {
  const [nuevaDescripcion, setNuevaDescripcion] = useState('');
  const [nuevoCosto, setNuevoCosto] = useState<number>(0);

  const totalCostos = costos.reduce((sum, c) => sum + (c.costoEstimado || 0), 0);
  const precioSugerido = Math.max(0, precioVenta - totalCostos);
  const porcentajeDescuento = precioVenta > 0 ? Math.min(100, Math.round((totalCostos / precioVenta) * 100)) : 0;
  const usdEstimado = Math.round(totalCostos / 4000);

  const handleAgregarManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaDescripcion.trim() || nuevoCosto <= 0) return;

    const nuevoItem: CostoReparacion = {
      id: 'custom-' + Date.now(),
      descripcion: nuevaDescripcion.trim(),
      costoEstimado: nuevoCosto,
      fromChecklist: false,
    };

    onCostosChange([...costos, nuevoItem]);
    setNuevaDescripcion('');
    setNuevoCosto(0);
  };

  const handleEliminarItem = (id: string) => {
    onCostosChange(costos.filter((c) => c.id !== id));
  };

  const handleCostoChange = (id: string, nuevoMonto: number) => {
    onCostosChange(
      costos.map((c) => (c.id === id ? { ...c, costoEstimado: nuevoMonto } : c))
    );
  };

  return (
    <div className="space-y-8">
      {/* Encabezado en lenguaje sencillo */}
      <div className="border-b border-slate-200/90 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>PASO 04 · ARREGLOS PENDIENTES Y DESCUENTO SUGERIDO</span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Úsalo para negociar el precio
          </span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          ¿Cuánto tendrías que invertirle en arreglos?
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed max-w-3xl">
          Sumamos automáticamente el costo estimado de los detalles que marcaste con fallas en el paso anterior. Úsalo como argumento para pedirle una rebaja justa al vendedor antes de cerrar el trato.
        </p>

        {datosBasicos?.lineaVehiculo && (
          <div className="mt-4 inline-flex items-center gap-2 py-1.5 px-3.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono">
            <Car className="w-3.5 h-3.5 text-slate-500" />
            <span className="font-semibold">{datosBasicos.lineaVehiculo}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{datosBasicos.placa || 'ABC 123'}</span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-500">{datosBasicos.kilometraje.toLocaleString('es-CO')} km</span>
          </div>
        )}
      </div>

      {/* Hero Card: Gasto estimado en arreglos */}
      <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
              Total estimado que tendrías que gastarle en taller
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tracking-tight">
                {formatCOP(totalCostos)}
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold">COP</span>
            </div>
            <span className="text-xs text-slate-500 mt-0.5 font-mono">
              Aproximadamente: ~ ${usdEstimado.toLocaleString('en-US')} USD
            </span>
          </div>

          <span
            className={`self-start sm:self-center px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold border ${
              totalCostos === 0
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : totalCostos < 2000000
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : totalCostos < 6000000
                ? 'bg-amber-50 border-amber-200 text-amber-800'
                : 'bg-rose-50 border-rose-200 text-rose-800'
            }`}
          >
            {totalCostos === 0 ? 'Sin arreglos inmediatos' : totalCostos < 2000000 ? 'Gasto bajo' : totalCostos < 6000000 ? 'Gasto moderado' : 'Gasto muy alto'}
          </span>
        </div>

        {/* Consejo para negociar el descuento */}
        <div className="flex items-center gap-3.5 bg-white border border-slate-200 p-4 rounded-xl shadow-2xs">
          <div className="w-9 h-9 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0">
            <TrendingDown className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-slate-900">
              ¿Cuánto descuento deberías pedirle al vendedor?
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              {precioVenta > 0 ? (
                <>
                  Pídele una rebaja aproximada del{' '}
                  <strong className="text-slate-900 font-mono">
                    {porcentajeDescuento}% sobre lo que pide ({formatCOP(totalCostos)})
                  </strong>{' '}
                  para compensar los arreglos que tú tendrás que pagar.
                </>
              ) : (
                'Escribe abajo el precio que te pide el vendedor para calcular el descuento exacto que puedes pedir.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Bloque: Precio pedido y Oferta sugerida */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs">
          <CurrencyInput
            label="1. ¿Cuánto dinero te está pidiendo el vendedor?"
            value={precioVenta}
            onChange={onPrecioVentaChange}
            placeholder="0"
            helperText="Escribe el valor que viste en el aviso o que te dijo el dueño."
          />
        </div>

        <div className="p-5 sm:p-6 rounded-xl bg-white border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
              2. Cuánto deberías ofrecerle máximo:
            </span>
            <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-700 tracking-tight">
              {precioVenta > 0 ? formatCOP(precioSugerido) : 'Escribe el precio primero'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Este sería el precio justo para ti, restando lo que vas a gastarle en arreglos.
          </p>
        </div>
      </div>

      {/* Tabla de Arreglos Detectados */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-700" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
              Lista de arreglos que detectaste ({costos.length})
            </h3>
          </div>
          {costos.length > 0 && (
            <span className="text-xs font-mono font-bold text-slate-900">
              Total: {formatCOP(totalCostos)}
            </span>
          )}
        </div>

        {costos.length === 0 ? (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-6 space-y-2">
            <PackageOpen className="w-9 h-9 text-slate-400 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-800">
              No tienes arreglos pendientes anotados
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Si marcaste puntos con &quot;Falla&quot; en el paso anterior, aparecerán aquí con su valor aproximado. También puedes agregar otros arreglos abajo si te acuerdas de alguno.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 text-[11px] font-mono uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">¿Qué hay que arreglar?</th>
                  <th className="py-3 px-4 font-semibold">Origen</th>
                  <th className="py-3 px-4 font-semibold w-48">Costo aproximado (COP)</th>
                  <th className="py-3 px-4 font-semibold text-right w-16">Quitar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {costos.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900">
                      {item.descripcion}
                    </td>
                    <td className="py-3 px-4">
                      {item.fromChecklist ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                          De la revisión
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-900 text-white">
                          Agregado por ti
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative max-w-[160px]">
                        <span className="absolute left-2.5 top-2.5 text-xs text-slate-400 font-mono">$</span>
                        <input
                          type="text"
                          value={item.costoEstimado === 0 ? '' : item.costoEstimado.toLocaleString('es-CO')}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            handleCostoChange(item.id, val ? parseInt(val, 10) : 0);
                          }}
                          className="w-full h-8 pl-6 pr-2 rounded-md bg-white border border-slate-300 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-slate-800"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEliminarItem(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Quitar este arreglo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Formulario para agregar arreglo manual */}
        <form
          onSubmit={handleAgregarManual}
          className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-end gap-3.5"
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              ¿Quieres añadir otro arreglo que hayas notado?
            </label>
            <input
              type="text"
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
              placeholder="Ej. Cambio de pastillas de frenos, sacar copia de la llave..."
              className="w-full h-10 rounded-lg bg-white border border-slate-300 px-3.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-800"
            />
          </div>

          <div className="w-full sm:w-44">
            <label className="block text-xs font-semibold text-slate-800 mb-1">
              Costo estimado (COP)
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 text-xs text-slate-400 font-mono">$</span>
              <input
                type="text"
                value={nuevoCosto === 0 ? '' : nuevoCosto.toLocaleString('es-CO')}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setNuevoCosto(val ? parseInt(val, 10) : 0);
                }}
                placeholder="0"
                className="w-full h-10 pl-6 pr-2 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 font-mono placeholder:text-slate-400 focus:outline-none focus:border-slate-800 font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto h-10 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0 active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir</span>
          </button>
        </form>
      </div>

      {/* Banner Orientativo */}
      <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-start gap-3">
        <Info className="w-5 h-5 text-slate-700 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Consejo para hablar con el vendedor: </strong>
          No pelees por el precio sin argumentos. Muestra con calma esta lista de detalles que viste en el carro para explicarle por qué le ofreces ese valor.
        </p>
      </div>
    </div>
  );
};
