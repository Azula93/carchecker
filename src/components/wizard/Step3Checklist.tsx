'use client';

import React, { useState, useMemo } from 'react';
import {
  CheckCheck,
  Car,
  Cog,
  Armchair,
  Route,
  Wrench,
  FileText,
  ClipboardCheck,
  AlertTriangle,
} from 'lucide-react';
import {
  ChecklistItemEval,
  CategoriaChecklist,
  ValoracionChecklist,
  AntecedentesLegales,
  DatosBasicos,
} from '../../types/evaluation';
import { CHECKLIST_ITEMS, CATEGORIAS_INFO } from '../../data/checklist-items';
import { calcularChecklist } from '../../lib/calculations';
import { ChecklistItem } from '../ui/ChecklistItem';

interface Step3ChecklistProps {
  items: ChecklistItemEval[];
  datosBasicos?: DatosBasicos;
  antecedentesLegales?: AntecedentesLegales;
  onItemChange: (item: ChecklistItemEval) => void;
  onMarcarTodosBien?: () => void;
}

const CATEGORIAS_ORDEN: { id: CategoriaChecklist; titulo: string; Icon: React.FC<{ className?: string }> }[] = [
  { id: 'exterior', titulo: 'Pintura y latas', Icon: Car },
  { id: 'motor', titulo: 'Motor y fugas', Icon: Cog },
  { id: 'interior', titulo: 'Interior y cabina', Icon: Armchair },
  { id: 'ruta', titulo: 'Manejo y frenos', Icon: Route },
  { id: 'inferior', titulo: 'Por debajo', Icon: Wrench },
  { id: 'complementarias', titulo: 'Llantas y otros', Icon: FileText },
];

export const Step3Checklist: React.FC<Step3ChecklistProps> = ({
  items,
  datosBasicos,
  onItemChange,
  onMarcarTodosBien,
}) => {
  const [categoriaActiva, setCategoriaActiva] = useState<CategoriaChecklist>('exterior');
  const [filtroEstado, setFiltroEstado] = useState<string>('todos');

  // Mapeo de valoraciones por ID
  const valoracionesMap = useMemo(() => {
    const map = new Map<string, ValoracionChecklist>();
    for (const item of items) {
      map.set(item.id, item.valoracion);
    }
    return map;
  }, [items]);

  // Ítems de la categoría activa
  const itemsCategoriaActiva = useMemo(() => {
    return CHECKLIST_ITEMS.filter((item) => item.categoria === categoriaActiva);
  }, [categoriaActiva]);

  // Ítems filtrados
  const itemsFiltrados = useMemo(() => {
    return itemsCategoriaActiva.filter((item) => {
      const val = valoracionesMap.get(item.id);
      if (filtroEstado === 'pendientes') return val === undefined;
      if (filtroEstado === 'hallazgos') return val === 'regular' || val === 'mal';
      if (filtroEstado === 'bien') return val === 'bien';
      return true;
    });
  }, [itemsCategoriaActiva, valoracionesMap, filtroEstado]);

  // Estadísticas del checklist
  const statsChecklist = useMemo(() => {
    return calcularChecklist(items);
  }, [items]);

  // Conteo de ítems por categoría
  const conteoPorCategoria = useMemo(() => {
    const conteo: Record<CategoriaChecklist, { total: number; evaluados: number; mal: number; regular: number }> = {
      exterior: { total: 0, evaluados: 0, mal: 0, regular: 0 },
      motor: { total: 0, evaluados: 0, mal: 0, regular: 0 },
      interior: { total: 0, evaluados: 0, mal: 0, regular: 0 },
      ruta: { total: 0, evaluados: 0, mal: 0, regular: 0 },
      inferior: { total: 0, evaluados: 0, mal: 0, regular: 0 },
      complementarias: { total: 0, evaluados: 0, mal: 0, regular: 0 },
    };

    for (const item of CHECKLIST_ITEMS) {
      conteo[item.categoria].total += 1;
      const val = valoracionesMap.get(item.id);
      if (val !== undefined) {
        conteo[item.categoria].evaluados += 1;
        if (val === 'mal') conteo[item.categoria].mal += 1;
        if (val === 'regular') conteo[item.categoria].regular += 1;
      }
    }
    return conteo;
  }, [valoracionesMap]);

  const totalEvaluados = items.length;
  const totalItems = CHECKLIST_ITEMS.length;
  const totalHallazgos = items.filter((i) => i.valoracion === 'mal' || i.valoracion === 'regular').length;

  return (
    <div className="space-y-8">
      {/* Encabezado en lenguaje sencillo */}
      <div className="border-b border-slate-200/90 pb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>PASO 03 · REVISIÓN FÍSICA PASO A PASO (80 PUNTOS)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Revisemos el estado real del carro
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Párate frente al vehículo y revisa cada parte. No tienes que ser mecánico: en cada punto te decimos exactamente qué mirar y qué tocar.
            </p>
          </div>

          {onMarcarTodosBien && (
            <button
              type="button"
              onClick={onMarcarTodosBien}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs active:scale-[0.98] transition-all self-start sm:self-center shrink-0 cursor-pointer"
              title="Marcar todos los puntos en buen estado rápidamente"
            >
              <CheckCheck className="w-4 h-4 text-emerald-600" />
              <span>Marcar todo en Buen Estado</span>
            </button>
          )}
        </div>

        {/* Panel de Control de la Revisión */}
        <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="font-mono text-base font-bold text-white">
                  {statsChecklist.porcentaje}%
                </span>
                <span className="text-[9px] uppercase tracking-wider opacity-75 font-mono">
                  Calidad
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-slate-900">
                  Calificación del estado físico
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Has revisado {statsChecklist.evaluados} de {totalItems} puntos
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end font-mono">
              <span className="text-xs font-bold text-slate-900">
                {Math.round((totalEvaluados / totalItems) * 100)}%
              </span>
              <span className="text-[10px] text-slate-400">Revisado</span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-slate-900 h-full rounded-full transition-all duration-300"
              style={{ width: `${(totalEvaluados / totalItems) * 100}%` }}
            />
          </div>

          {/* Subheader info pill */}
          <div className="flex items-center justify-between border-t border-slate-200/80 pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-800 font-medium truncate">
              <Car className="w-3.5 h-3.5 text-slate-500" />
              <span className="truncate">{datosBasicos?.lineaVehiculo || 'Vehículo en revisión'}</span>
            </div>
            {totalHallazgos > 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 font-mono text-[11px] font-semibold">
                <AlertTriangle className="w-3 h-3 text-amber-600" />
                <span>{totalHallazgos} detalle(s) para revisar</span>
              </span>
            ) : (
              <span className="text-[11px] text-emerald-700 font-mono font-medium">
                Sin fallas marcadas por ahora
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Selector de Partes del Carro */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800">
            Partes del carro a revisar ({CATEGORIAS_ORDEN.length})
          </span>
          <span className="text-[11px] text-slate-500 font-mono">
            {totalEvaluados}/{totalItems} completados
          </span>
        </div>

        {/* Grid de Pestañas de Categoría */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2">
          {CATEGORIAS_ORDEN.map((cat) => {
            const conteo = conteoPorCategoria[cat.id];
            const isActiva = categoriaActiva === cat.id;
            const CatIcon = cat.Icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoriaActiva(cat.id)}
                className={`min-h-11 px-3 py-2 rounded-xl flex items-center justify-between gap-1.5 transition-all cursor-pointer text-xs font-medium border ${
                  isActiva
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <CatIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{cat.titulo}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                      isActiva
                        ? 'bg-white/15 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {conteo.evaluados}/{conteo.total}
                  </span>
                  {conteo.mal > 0 && (
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Tiene detalles malos" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Barra de Filtro y Contexto de la Categoría */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-slate-700 shrink-0" />
            <span className="text-slate-700 font-medium">
              {CATEGORIAS_INFO[categoriaActiva]?.descripcion || 'Revisa cada punto con calma'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-slate-500 font-mono">Mostrar:</span>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-[11px] font-medium text-slate-800 cursor-pointer focus:outline-none focus:border-slate-800"
            >
              <option value="todos">Todos los puntos ({itemsCategoriaActiva.length})</option>
              <option value="pendientes">Pendientes por calificar</option>
              <option value="hallazgos">Solo los que tienen detalles (Regular / Mal)</option>
              <option value="bien">Solo los que están Bien</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Puntos a Revisar */}
      <div className="flex flex-col gap-3.5">
        {itemsFiltrados.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-500">
            No hay puntos que coincidan con el filtro en esta sección.
          </div>
        ) : (
          itemsFiltrados.map((item) => (
            <ChecklistItem
              key={item.id}
              item={item}
              valoracion={valoracionesMap.get(item.id)}
              onValoracionChange={(val) => onItemChange({ id: item.id, valoracion: val })}
            />
          ))
        )}
      </div>
    </div>
  );
};
