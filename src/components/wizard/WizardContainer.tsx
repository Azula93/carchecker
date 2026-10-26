'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Evaluacion,
  DatosBasicos,
  AntecedentesLegales,
  ChecklistItemEval,
  CostoReparacion,
  ValoracionChecklist,
} from '../../types/evaluation';
import {
  crearEvaluacionNueva,
  guardarEvaluacion,
  cargarEvaluacion,
  limpiarEvaluacion,
} from '../../lib/storage';
import { calcularResultadoFinal } from '../../lib/calculations';
import { imprimirReportePDF } from '../../lib/pdf-generator';
import { getCostoByChecklistId } from '../../data/repair-costs';
import { CHECKLIST_ITEMS } from '../../data/checklist-items';
import { ProgressBar } from '../layout/ProgressBar';
import { StepNavigation } from './StepNavigation';
import { Step1Basicos } from './Step1Basicos';
import { Step2Legales } from './Step2Legales';
import { Step3Checklist } from './Step3Checklist';
import { Step4Costos } from './Step4Costos';
import { Step5Resultado } from './Step5Resultado';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '../ui/alert-dialog';
import { ShieldAlert } from 'lucide-react';

export const WizardContainer: React.FC = () => {
  const [evaluacion, setEvaluacion] = useState<Evaluacion>(() => crearEvaluacionNueva());
  const [pasoActual, setPasoActual] = useState<number>(1);

  // Cargar evaluación y paso guardados de manera segura tras el montaje en el cliente
  useEffect(() => {
    const timer = setTimeout(() => {
      const saved = cargarEvaluacion();
      if (saved) {
        setEvaluacion(saved);
        if (saved.pasoActual) {
          setPasoActual(saved.pasoActual);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Estado para el modal accesible de confirmación Radix UI
  const [dialogoConfirmacion, setDialogoConfirmacion] = useState<{
    abierto: boolean;
    titulo: string;
    descripcion: string;
    textoAccion?: string;
    onConfirmar: () => void;
  }>({
    abierto: false,
    titulo: '',
    descripcion: '',
    textoAccion: 'Sí, confirmar',
    onConfirmar: () => {},
  });

  // Guardar en localStorage al cambiar
  const actualizarEstado = (nuevaEval: Evaluacion) => {
    setEvaluacion(nuevaEval);
    guardarEvaluacion(nuevaEval);
  };

  // Calcular resultado final en tiempo real
  const resultadoFinal = useMemo(() => {
    if (!evaluacion) return null;
    return calcularResultadoFinal(
      evaluacion.datosBasicos,
      evaluacion.antecedentesLegales,
      evaluacion.checklistItems,
      evaluacion.costosReparacion,
      evaluacion.precioVenta
    );
  }, [evaluacion]);

  if (!evaluacion || !resultadoFinal) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-500 text-sm">
          <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          <span>Cargando expediente de auditoría...</span>
        </div>
      </div>
    );
  }

  // Handlers para paso 1
  const handleDatosBasicosChange = (datos: Partial<DatosBasicos>) => {
    actualizarEstado({
      ...evaluacion,
      datosBasicos: { ...evaluacion.datosBasicos, ...datos },
    });
  };

  // Handlers para paso 2
  const handleLegalesChange = (datos: Partial<AntecedentesLegales>) => {
    actualizarEstado({
      ...evaluacion,
      antecedentesLegales: { ...evaluacion.antecedentesLegales, ...datos },
    });
  };

  // Handlers para paso 3 (Checklist con sincronización a Costos)
  const handleChecklistItemChange = (item: ChecklistItemEval) => {
    const existingIndex = evaluacion.checklistItems.findIndex((i) => i.id === item.id);
    const newItems = [...evaluacion.checklistItems];

    if (existingIndex >= 0) {
      newItems[existingIndex] = item;
    } else {
      newItems.push(item);
    }

    // Si se marca 'mal', agregar a matriz de costos si no existe
    let newCostos = [...evaluacion.costosReparacion];
    const costoRef = getCostoByChecklistId(item.id);

    if (item.valoracion === 'mal' && costoRef) {
      const yaExisteEnCostos = newCostos.some((c) => c.id === `cost-${item.id}`);
      if (!yaExisteEnCostos) {
        newCostos.push({
          id: `cost-${item.id}`,
          descripcion: costoRef.descripcion,
          costoEstimado: Math.round((costoRef.costoMin + costoRef.costoMax) / 2),
          fromChecklist: true,
        });
      }
    } else if (item.valoracion !== 'mal') {
      // Si cambia de mal a bien/regular/na, retirar de costos auto-generados
      newCostos = newCostos.filter((c) => c.id !== `cost-${item.id}`);
    }

    actualizarEstado({
      ...evaluacion,
      checklistItems: newItems,
      costosReparacion: newCostos,
    });
  };

  const handleMarcarTodosBien = () => {
    const allBien: ChecklistItemEval[] = CHECKLIST_ITEMS.map((item) => ({
      id: item.id,
      valoracion: 'bien' as ValoracionChecklist,
    }));

    // Quitar los costos que venían de checklist
    const costosManuales = evaluacion.costosReparacion.filter((c) => !c.fromChecklist);

    actualizarEstado({
      ...evaluacion,
      checklistItems: allBien,
      costosReparacion: costosManuales,
    });
  };

  // Handlers para paso 4
  const handleCostosChange = (costos: CostoReparacion[]) => {
    actualizarEstado({
      ...evaluacion,
      costosReparacion: costos,
    });
  };

  const handlePrecioVentaChange = (precio: number) => {
    actualizarEstado({
      ...evaluacion,
      precioVenta: precio,
    });
  };

  // Navegación entre pasos
  const handleSiguiente = () => {
    if (pasoActual < 5) {
      const nuevoPaso = pasoActual + 1;
      setPasoActual(nuevoPaso);
      actualizarEstado({ ...evaluacion, pasoActual: nuevoPaso });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnterior = () => {
    if (pasoActual > 1) {
      const nuevoPaso = pasoActual - 1;
      setPasoActual(nuevoPaso);
      actualizarEstado({ ...evaluacion, pasoActual: nuevoPaso });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectPaso = (paso: number) => {
    setPasoActual(paso);
    actualizarEstado({ ...evaluacion, pasoActual: paso });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReiniciar = () => {
    setDialogoConfirmacion({
      abierto: true,
      titulo: '¿Reiniciar auditoría completa?',
      descripcion:
        'Se restablecerán todos los registros ingresados: datos del vehículo, antecedentes en bases oficiales, checklist de 80 puntos y la estimación de costos.',
      textoAccion: 'Sí, reiniciar auditoría',
      onConfirmar: () => {
        const nueva = limpiarEvaluacion();
        setEvaluacion(nueva);
        setPasoActual(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  const handleLimpiarPasoActual = () => {
    let titulo = '¿Restablecer datos de esta fase?';
    let descripcion = 'Se borrarán los valores registrados en este paso.';

    if (pasoActual === 1) {
      titulo = '¿Borrar datos de la ficha técnica?';
      descripcion =
        'Se restablecerán placa, municipio, línea y odometría ingresados en esta fase.';
    } else if (pasoActual === 2) {
      titulo = '¿Restablecer antecedentes legales?';
      descripcion =
        'Se limpiarán los registros marcados sobre servicio público, regrabaciones, comparendos y siniestros.';
    } else if (pasoActual === 3) {
      titulo = '¿Borrar valoraciones del checklist?';
      descripcion =
        'Se eliminarán las calificaciones registradas en los componentes de inspección y los costos derivados.';
    } else if (pasoActual === 4) {
      titulo = '¿Borrar presupuesto y precio?';
      descripcion =
        'Se eliminarán todas las estimaciones de reparaciones y el precio de venta registrado.';
    } else if (pasoActual === 5) {
      handleReiniciar();
      return;
    }

    setDialogoConfirmacion({
      abierto: true,
      titulo,
      descripcion,
      textoAccion: 'Sí, restablecer fase',
      onConfirmar: () => {
        if (pasoActual === 1) {
          actualizarEstado({
            ...evaluacion,
            datosBasicos: {
              lineaVehiculo: '',
              anioModelo: new Date().getFullYear(),
              kilometraje: 0,
              placa: '',
              ciudadPlaca: 'BOGOTÁ D.C.',
            },
          });
        } else if (pasoActual === 2) {
          actualizarEstado({
            ...evaluacion,
            antecedentesLegales: {
              placaPublica: false,
              regrabaciones: false,
              escuelaConductcion: false,
              valorComparendos: 0,
              codigoSiniestro: 'ninguno',
            },
          });
        } else if (pasoActual === 3) {
          const costosManuales = evaluacion.costosReparacion.filter((c) => !c.fromChecklist);
          actualizarEstado({
            ...evaluacion,
            checklistItems: [],
            costosReparacion: costosManuales,
          });
        } else if (pasoActual === 4) {
          actualizarEstado({
            ...evaluacion,
            costosReparacion: [],
            precioVenta: 0,
          });
        }
      },
    });
  };

  // Validación básica del paso 1
  const paso1Invalido =
    !evaluacion.datosBasicos.lineaVehiculo.trim() ||
    evaluacion.datosBasicos.kilometraje <= 0;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      <h1 className="sr-only">Auditoría y peritaje preliminar de vehículo — EscaneApp</h1>

      {/* 1. Stepper Horizontal Editorial */}
      <div className="print:hidden">
        <ProgressBar
          pasoActual={pasoActual}
          totalPasos={5}
          onSelectPaso={handleSelectPaso}
        />
      </div>

      {/* 2. Gran Card Central Editorial */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-10 shadow-sm print:bg-transparent print:border-none print:p-0 print:shadow-none">
        {pasoActual === 1 && (
          <Step1Basicos
            datos={evaluacion.datosBasicos}
            onChange={handleDatosBasicosChange}
          />
        )}

        {pasoActual === 2 && (
          <Step2Legales
            datos={evaluacion.antecedentesLegales}
            datosBasicos={evaluacion.datosBasicos}
            onChange={handleLegalesChange}
          />
        )}

        {pasoActual === 3 && (
          <Step3Checklist
            items={evaluacion.checklistItems}
            datosBasicos={evaluacion.datosBasicos}
            antecedentesLegales={evaluacion.antecedentesLegales}
            onItemChange={handleChecklistItemChange}
            onMarcarTodosBien={handleMarcarTodosBien}
          />
        )}

        {pasoActual === 4 && (
          <Step4Costos
            costos={evaluacion.costosReparacion}
            precioVenta={evaluacion.precioVenta}
            datosBasicos={evaluacion.datosBasicos}
            onCostosChange={handleCostosChange}
            onPrecioVentaChange={handlePrecioVentaChange}
          />
        )}

        {pasoActual === 5 && (
          <Step5Resultado
            evaluacion={evaluacion}
            resultado={resultadoFinal}
            onReiniciar={handleReiniciar}
          />
        )}

        {/* Navegación inferior */}
        <div className="print:hidden">
          <StepNavigation
            pasoActual={pasoActual}
            totalPasos={5}
            onAnterior={handleAnterior}
            onSiguiente={handleSiguiente}
            onLimpiarPaso={handleLimpiarPasoActual}
            siguienteDeshabilitado={pasoActual === 1 && paso1Invalido}
            esDescarte={resultadoFinal.esDescarte}
            onDescargarReporte={imprimirReportePDF}
            onReiniciar={handleReiniciar}
          />
        </div>
      </div>

      {/* 3. Subfooter Institucional */}
      <div className="pt-4 pb-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 border-t border-slate-200/80 print:hidden font-mono">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <ShieldAlert className="w-4 h-4 text-slate-700 shrink-0" />
          <span>
            EscaneApp es una herramienta analítica preliminar y no sustituye un peritaje técnico presencial certificado.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-slate-400">
          <Link href="/terminos-condiciones" className="hover:text-slate-800 transition-colors">
            Términos
          </Link>
          <span>·</span>
          <Link href="/politica-privacidad" className="hover:text-slate-800 transition-colors">
            Privacidad
          </Link>
          <span>·</span>
          <span>© {new Date().getFullYear()} EscaneApp</span>
        </div>
      </div>

      {/* Modal accesible Radix UI */}
      <AlertDialog
        open={dialogoConfirmacion.abierto}
        onOpenChange={(abierto) =>
          setDialogoConfirmacion((prev) => ({ ...prev, abierto }))
        }
      >
        <AlertDialogContent className="rounded-2xl border border-slate-200 p-6 max-w-md bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold text-slate-900">
              {dialogoConfirmacion.titulo}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
              {dialogoConfirmacion.descripcion}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 flex items-center justify-end gap-2.5">
            <AlertDialogCancel className="rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs px-4 h-10">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dialogoConfirmacion.onConfirmar();
                setDialogoConfirmacion((prev) => ({ ...prev, abierto: false }));
              }}
              className="rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 h-10 shadow-xs"
            >
              {dialogoConfirmacion.textoAccion || 'Confirmar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
