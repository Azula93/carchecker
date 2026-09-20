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
    <div className="space-y-6">
      {/* Encabezado y Acción rápida */}
      <div className="border-b border-[#E2E8F0] pb-4 flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#64748B] font-semibold block mb-1">
              Paso 3 de 5 · Inspección Física
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0F1B2B] tracking-tight">
              Checklist de inspección física
            </h2>
            <p className="text-xs sm:text-sm text-[#475569] mt-0.5">
              Inspecciona visualmente cada componente y selecciona su estado técnico.
            </p>
          </div>

          {onMarcarTodosBien && (
            <button
              type="button"
              onClick={onMarcarTodosBien}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#CBD5E1] text-[#0F1B2B] hover:bg-[#F1F5F9] text-xs font-semibold shadow-xs active:scale-95 transition-all self-start sm:self-center shrink-0 cursor-pointer"
              title="Marcar todos los componentes como Bueno de una sola vez"
            >
              <CheckCheck className="w-4 h-4 text-[#166534]" />
              <span>Marcar todo como Bueno</span>
            </button>
          )}
        </div>

        {/* Tarjeta de Puntuación Física General */}
        <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F1B2B] text-white flex flex-col items-center justify-center shrink-0 shadow-xs">
                <span className="font-mono text-base font-bold text-white">
                  {statsChecklist.porcentaje}%
                </span>
                <span className="text-[9px] uppercase tracking-tighter opacity-75 font-mono">
                  Índice
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-semibold text-[#0F1B2B]">
                  Puntuación Física Actual
                </span>
                <span className="text-xs text-[#64748B]">
                  {statsChecklist.evaluados} de {totalItems} componentes evaluados
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs font-mono font-bold text-[#0F1B2B]">
                {Math.round((totalEvaluados / totalItems) * 100)}%
              </span>
              <span className="text-[10px] text-[#64748B]">Progreso</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0F1B2B] h-full rounded-full transition-all duration-300"
              style={{ width: `${(totalEvaluados / totalItems) * 100}%` }}
            />
          </div>

          {/* Subheader info pill */}
          <div className="flex items-center justify-between border-t border-[#F1F5F9] pt-2 text-xs">
            <div className="flex items-center gap-1.5 text-[#0F1B2B] font-medium truncate">
              <Car className="w-3.5 h-3.5 text-[#64748B]" />
              <span className="truncate">{datosBasicos?.lineaVehiculo || 'Vehículo'}</span>
            </div>
            {totalHallazgos > 0 ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] font-semibold text-[11px]">
                <AlertCircle className="w-3 h-3" />
                <span>{totalHallazgos} hallazgo(s) observados</span>
              </span>
            ) : (
              <span className="text-[11px] text-[#166534] font-semibold">
                Sin fallas registradas
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Categorías de Evaluación (Grid responsivo sin recorte en escritorio) */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">
            Categorías de Inspección
          </span>
          <span className="text-[11px] text-[#64748B] font-mono">
            {CATEGORIAS_ORDEN.length} Áreas
          </span>
        </div>

        {/* Responsive Grid para visualizar TODAS las categorías en escritorio y móvil sin desbordes */}
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
                className={`min-h-12 px-3 py-2 rounded-xl flex items-center justify-between gap-1.5 transition-all cursor-pointer text-xs font-semibold border ${
                  isActiva
                    ? 'bg-[#0F1B2B] text-white border-[#0F1B2B] shadow-xs'
                    : 'bg-white text-[#475569] border-[#CBD5E1] hover:bg-[#F8FAFC]'
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
                        : 'bg-[#F1F5F9] text-[#64748B]'
                    }`}
                  >
                    {conteo.evaluados}/{conteo.total}
                  </span>
                  {conteo.mal > 0 && (
                    <span className="w-2 h-2 rounded-full bg-[#DC2626] shrink-0" title="Contiene hallazgos críticos" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Barra descriptiva de la sección activa con filtro dropdown */}
        <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Eye className="w-4 h-4 text-[#64748B] shrink-0" />
            <p className="text-[#475569] truncate">
              {CATEGORIAS_INFO[categoriaActiva]?.descripcion}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[#64748B] font-medium">Filtrar:</span>
            <select
              value={filtroEstado}
              onChange={(e) => setFiltroEstado(e.target.value)}
              className="bg-white border border-[#CBD5E1] text-[#0F1B2B] text-xs font-semibold rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0F1B2B] cursor-pointer shadow-2xs"
            >
              <option value="todos">Todos</option>
              <option value="pendientes">Pendientes</option>
              <option value="hallazgos">Con hallazgos (Regular/Malo)</option>
              <option value="bien">Buenos</option>
            </select>
          </div>
        </div>
      </div>

      {/* Lista de ítems de la categoría */}
      <div className="space-y-3">
        {itemsFiltrados.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-[#E2E8F0] text-[#64748B] text-xs">
            No hay componentes con el filtro seleccionado en esta categoría.
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
