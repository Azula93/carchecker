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
  AlertCircle,
  Eye,
  ClipboardCheck,
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
  { id: 'exterior', titulo: 'Exterior', Icon: Car },
  { id: 'motor', titulo: 'Motor & Mecánica', Icon: Cog },
  { id: 'interior', titulo: 'Interior & Cabina', Icon: Armchair },
  { id: 'ruta', titulo: 'Prueba de Ruta', Icon: Route },
  { id: 'inferior', titulo: 'Inspección Inferior', Icon: Wrench },
  { id: 'complementarias', titulo: 'Complementarias', Icon: FileText },
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
      {/* Encabezado del Paso (Stitch Reference) */}
      <div className="border-b border-[#E2E8F0] pb-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FA] text-[#123B5D] text-xs font-bold w-fit mb-2">
              <span className="w-2 h-2 rounded-full bg-[#8BCF3F] animate-pulse"></span>
              <span>INSPECCIÓN FÍSICA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#17212B] tracking-tight">
              Checklist de inspección física
            </h2>
            <p className="text-xs sm:text-sm text-[#66727D] mt-1">
              Inspecciona visualmente cada componente y selecciona su estado técnico.
            </p>
          </div>

          {onMarcarTodosBien && (
            <button
              type="button"
              onClick={onMarcarTodosBien}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-[#CBD5E1] text-[#123B5D] hover:bg-slate-50 text-xs font-bold shadow-2xs active:scale-95 transition-all self-start sm:self-center shrink-0 cursor-pointer"
              title="Marcar todos los componentes como Bueno de una sola vez"
            >
              <CheckCheck className="w-4 h-4 text-[#2EAD68]" />
              <span>Marcar todo como Bueno</span>
            </button>
          )}
        </div>

        {/* Tarjeta de Puntuación Física General */}
        <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs flex flex-col gap-3.5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#123B5D] text-white flex flex-col items-center justify-center shrink-0 shadow-2xs">
                <span className="font-mono text-base font-bold text-white">
                  {statsChecklist.porcentaje}%
                </span>
                <span className="text-[9px] uppercase tracking-tighter opacity-75 font-mono">
                  Índice
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-[#17212B]">
                  Puntuación Física Actual
                </span>
                <span className="text-xs text-[#66727D]">
                  {statsChecklist.evaluados} de {totalItems} componentes evaluados
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs font-mono font-bold text-[#123B5D]">
                {Math.round((totalEvaluados / totalItems) * 100)}%
              </span>
              <span className="text-[10px] text-[#66727D]">Progreso</span>
            </div>
          </div>

          {/* Barra de progreso */}
          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#123B5D] h-full rounded-full transition-all duration-300"
              style={{ width: `${(totalEvaluados / totalItems) * 100}%` }}
            />
          </div>

          {/* Subheader info pill */}
          <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#17212B] font-medium truncate">
              <Car className="w-3.5 h-3.5 text-[#66727D]" />
              <span className="truncate">{datosBasicos?.lineaVehiculo || 'Vehículo'}</span>
            </div>
            {totalHallazgos > 0 ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#D64545] font-bold text-[11px]">
                <AlertCircle className="w-3 h-3" />
                <span>{totalHallazgos} hallazgo(s) observados</span>
              </span>
            ) : (
              <span className="text-[11px] text-[#2EAD68] font-bold">
                Sin fallas registradas
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Categorías de Evaluación */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#123B5D]">
            Categorías de Inspección
          </span>
          <span className="text-[11px] text-[#66727D] font-mono">
            {CATEGORIAS_ORDEN.length} Áreas
          </span>
        </div>

        {/* Responsive Grid para visualizar TODAS las categorías */}
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
                className={`min-h-12 px-3 py-2 rounded-xl flex items-center justify-between gap-1.5 transition-all cursor-pointer text-xs font-bold border ${
                  isActiva
                    ? 'bg-[#123B5D] text-white border-[#123B5D] shadow-xs'
                    : 'bg-white text-[#66727D] border-[#CBD5E1] hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <CatIcon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{cat.titulo}</span>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isActiva
                        ? 'bg-white/20 text-white'
                        : 'bg-[#F1F5F9] text-[#66727D]'
                    }`}
                  >
                    {conteo.evaluados}/{conteo.total}
                  </span>
                  {conteo.mal > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#D64545] shrink-0" title="Contiene hallazgos críticos" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Barra descriptiva de la sección activa con filtro dropdown */}
        <div className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-[#123B5D] shrink-0" />
            <span className="font-semibold text-[#17212B]">
              {CATEGORIAS_INFO[categoriaActiva]?.descripcion || 'Evalúa cada ítem con honestidad'}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[11px] text-[#66727D]">Filtrar:</span>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-white border border-[#CBD5E1] text-[11px] font-semibold text-[#17212B] cursor-pointer focus:outline-none"
            >
              <option value="todos">Todos ({itemsCategoriaActiva.length})</option>
              <option value="pendientes">Sin calificar</option>
              <option value="hallazgos">Solo hallazgos (Regular / Malo)</option>
              <option value="bien">Solo Bueno</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de Ítems de la Categoría */}
      <div className="flex flex-col gap-3.5">
        {itemsFiltrados.length === 0 ? (
          <div className="p-8 text-center bg-[#F8FAFC] rounded-2xl border border-dashed border-[#CBD5E1] text-xs text-[#66727D]">
            No hay componentes que coincidan con el filtro seleccionado en esta categoría.
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
