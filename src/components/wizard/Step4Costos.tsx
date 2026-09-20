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
    <div className="space-y-6">
      {/* Encabezado */}
      <div className="border-b border-[#E2E8F0] pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold block mb-1">
          Paso 4 de 5 · Costos Ocultos
        </span>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B] tracking-tight">
          Matriz de costos de reparación y negociación
        </h2>
        <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
          Estimación orientativa de arreglos basada en tus observaciones. Estos valores son referenciales y no sustituyen una cotización formal en talleres ni un peritaje profesional.
        </p>

        {/* Vehicle Identity Pill */}
        {datosBasicos?.lineaVehiculo && (
          <div className="mt-3 inline-flex items-center gap-2 py-1 px-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-xs text-[#0F1B2B]">
            <Car className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="font-semibold">{datosBasicos.lineaVehiculo}</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#64748B] font-mono">{datosBasicos.placa || 'ABC 123'}</span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="text-[#64748B] font-mono">{datosBasicos.kilometraje.toLocaleString('es-CO')} km</span>
          </div>
        )}
      </div>

      {/* Main Hero Card: Inversión Estimada en Reparaciones */}
      <div className="p-5 sm:p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B]">
              Inversión Estimada en Reparaciones
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl sm:text-4xl font-bold font-mono text-[#0F1B2B] tracking-tight">
                {formatCOP(totalCostos)}
              </span>
              <span className="text-xs font-mono text-[#64748B] font-semibold">COP</span>
            </div>
            <span className="text-xs text-[#64748B] mt-0.5 font-mono">
              Equivalente estimado: ~ ${usdEstimado.toLocaleString('en-US')} USD
            </span>
          </div>

          <span
            className={`self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold font-mono border ${
              totalCostos === 0
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                : totalCostos < 2000000
                ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]'
                : totalCostos < 6000000
                ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#D97706]'
                : 'bg-[#FEF2F2] border-[#FECACA] text-[#DC2626]'
            }`}
          >
            {totalCostos === 0 ? 'Sin gastos inmediatos' : totalCostos < 2000000 ? 'Inversión Baja' : totalCostos < 6000000 ? 'Inversión Moderada' : 'Inversión Alta'}
          </span>
        </div>

        {/* Negotiation Leverage Callout Banner */}
        <div className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 rounded-lg">
          <div className="w-8 h-8 rounded-lg bg-[#0F1B2B] text-white flex items-center justify-center shrink-0">
            <TrendingDown className="w-4 h-4" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-[#0F1B2B]">
              Margen de Descuento Técnico Sugerido
            </span>
            <p className="text-xs text-[#475569]">
              {precioVenta > 0 ? (
                <>
                  Apalancamiento de negociación recomendado:{' '}
                  <strong className="text-[#0F1B2B]">
                    -{porcentajeDescuento}% sobre precio publicado ({formatCOP(totalCostos)})
                  </strong>
                </>
              ) : (
                'Ingresa el precio pedido por el vendedor abajo para calcular el porcentaje de deducción recomendada.'
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Bloque Financiero: Precio Pedido y Oferta Sugerida */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Precio Pedido */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs">
          <CurrencyInput
            label="1. Precio de venta solicitado por el vendedor"
            value={precioVenta}
            onChange={onPrecioVentaChange}
            placeholder="0"
            helperText="Valor de venta publicado en el anuncio o vitrina."
          />
        </div>

        {/* Oferta Máxima Recomendada */}
        <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#64748B] block mb-1">
              2. Oferta Máxima Recomendada
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-mono text-[#166534] tracking-tight">
              {precioVenta > 0 ? formatCOP(precioSugerido) : 'Ajustar según precio'}
            </span>
          </div>
          <p className="text-[11px] text-[#64748B] mt-2">
            Precio de referencia sugerido descontando la estimación de posibles reparaciones.
          </p>
        </div>
      </div>

      {/* Listado de Arreglos e Inversiones Identificadas */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-[#0F1B2B]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2B]">
              Detalle de Reparaciones y Mantenimientos ({costos.length})
            </h3>
          </div>
          {costos.length > 0 && (
            <span className="text-xs font-mono font-semibold text-[#0F1B2B]">
              Subtotal: {formatCOP(totalCostos)}
            </span>
          )}
        </div>

        {costos.length === 0 ? (
          <div className="text-center py-8 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] p-6 space-y-2">
            <PackageOpen className="w-8 h-8 text-[#475569] mx-auto" />
            <h4 className="text-sm font-semibold text-[#0F1B2B]">
              No se han registrado reparaciones pendientes
            </h4>
            <p className="text-xs text-[#64748B] max-w-md mx-auto">
              Los ítems que marques como &quot;Malo&quot; en el Checklist del paso anterior aparecerán aquí automáticamente, o puedes añadir costos de mantenimiento manualmente a continuación.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-[#E2E8F0]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] text-[11px] font-mono uppercase tracking-wider">
                  <th className="py-3 px-4 font-semibold">Descripción del Arreglo</th>
                  <th className="py-3 px-4 font-semibold">Origen</th>
                  <th className="py-3 px-4 font-semibold w-48">Costo Estimado (COP)</th>
                  <th className="py-3 px-4 font-semibold text-right w-16">Acción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {costos.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3 px-4 font-medium text-[#0F1B2B]">
                      {item.descripcion}
                    </td>
                    <td className="py-3 px-4">
                      {item.fromChecklist ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]">
                          Checklist
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#EFF6FF] text-[#2563EB] border border-[#BFDBFE]">
                          Manual
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="relative max-w-[160px]">
                        <span className="absolute left-2.5 top-2 text-xs text-[#475569] font-mono">$</span>
                        <input
                          type="text"
                          value={item.costoEstimado === 0 ? '' : item.costoEstimado.toLocaleString('es-CO')}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            handleCostoChange(item.id, val ? parseInt(val, 10) : 0);
                          }}
                          className="w-full h-8 pl-6 pr-2 rounded bg-white border border-[#CBD5E1] text-xs font-mono text-[#0F1B2B] focus:outline-none focus:border-[#0F1B2B]"
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleEliminarItem(item.id)}
                        className="p-1 text-[#475569] hover:text-[#DC2626] transition-colors cursor-pointer"
                        title="Eliminar arreglo"
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
          className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-end gap-3"
        >
          <div className="flex-1 w-full">
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
              Agregar arreglo adicional o mantenimiento preventivo
            </label>
            <input
              type="text"
              value={nuevaDescripcion}
              onChange={(e) => setNuevaDescripcion(e.target.value)}
              placeholder="Ej. Cambio de pastillas delanteras, duplicado de llave..."
              className="w-full h-10 rounded-lg bg-white border border-[#CBD5E1] px-3 text-xs text-[#0F1B2B] placeholder:text-[#475569] focus:outline-none focus:border-[#0F1B2B]"
            />
          </div>

          <div className="w-full sm:w-44">
            <label className="block text-xs font-semibold text-[#0F1B2B] mb-1">
              Valor estimado (COP)
            </label>
            <div className="relative">
              <span className="absolute left-2.5 top-2.5 text-xs text-[#475569] font-mono">$</span>
              <input
                type="text"
                value={nuevoCosto === 0 ? '' : nuevoCosto.toLocaleString('es-CO')}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setNuevoCosto(val ? parseInt(val, 10) : 0);
                }}
                placeholder="0"
                className="w-full h-10 pl-6 pr-2 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#0F1B2B] font-mono placeholder:text-[#475569] focus:outline-none focus:border-[#0F1B2B]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto h-10 px-4 rounded-lg bg-[#0F1B2B] hover:bg-[#1A2B42] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Añadir</span>
          </button>
        </form>
      </div>

      {/* Banner orientativo de negociación */}
      <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-start gap-3">
        <Info className="w-5 h-5 text-[#0F1B2B] shrink-0 mt-0.5" />
        <p className="text-xs text-[#475569] leading-relaxed">
          <strong className="text-[#0F1B2B]">Referencia para dialogar con el vendedor: </strong>
          Utiliza este listado estimado como base orientativa para conversar sobre el precio final. Recuerda que los costos reales de repuestos y mano de obra deben validarse directamente en un taller mecánico o almacén de confianza.
        </p>
      </div>
    </div>
  );
};
