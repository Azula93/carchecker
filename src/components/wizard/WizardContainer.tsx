'use client';

import React, { useState, useMemo } from 'react';
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

export const WizardContainer: React.FC = () => {
  const [evaluacion, setEvaluacion] = useState<Evaluacion>(() => {
    if (typeof window !== 'undefined') {
      const saved = cargarEvaluacion();
      if (saved) return saved;
    }
    return crearEvaluacionNueva();
  });

  const [pasoActual, setPasoActual] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = cargarEvaluacion();
      if (saved?.pasoActual) return saved.pasoActual;
    }
    return 1;
  });

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
        <div className="flex items-center gap-3 text-[#64748B] text-sm">
          <div className="w-5 h-5 border-2 border-[#0F1B2B] border-t-transparent rounded-full animate-spin" />
          <span>Cargando evaluación...</span>
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
      titulo: '¿Reiniciar evaluación completa?',
      descripcion:
        'Se borrarán todos los datos del vehículo (básicos, antecedentes legales, checklist de inspección y presupuesto de arreglos). Esta acción no se puede deshacer.',
      textoAccion: 'Sí, reiniciar todo',
      onConfirmar: () => {
        const nueva = limpiarEvaluacion();
        setEvaluacion(nueva);
        setPasoActual(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  const handleLimpiarPasoActual = () => {
    let titulo = '¿Borrar datos de este paso?';
    let descripcion = 'Se restablecerán los campos completados en este paso.';

    if (pasoActual === 1) {
      titulo = '¿Borrar datos del vehículo?';
      descripcion =
        'Se restablecerán los datos básicos (placa, municipio, línea y kilometraje) ingresados en este paso.';
    } else if (pasoActual === 2) {
      titulo = '¿Restablecer antecedentes legales?';
      descripcion =
        'Se desmarcarán las respuestas sobre servicio público, regrabaciones, comparendos y siniestros de este paso.';
    } else if (pasoActual === 3) {
      titulo = '¿Borrar valoraciones del checklist?';
      descripcion =
        'Se limpiarán las calificaciones registradas en los componentes de inspección y se retirarán los costos automáticos derivados.';
    } else if (pasoActual === 4) {
      titulo = '¿Borrar presupuesto y precio?';
      descripcion =
        'Se eliminarán todas las estimaciones de arreglos agregadas y el precio de venta registrado.';
    } else if (pasoActual === 5) {
      handleReiniciar();
      return;
    }

    setDialogoConfirmacion({
      abierto: true,
      titulo,
      descripcion,
      textoAccion: 'Sí, borrar datos del paso',
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
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Barra de progreso de 5 pasos */}
      <div className="print:hidden">
        <ProgressBar
          pasoActual={pasoActual}
          totalPasos={5}
          onSelectPaso={handleSelectPaso}
        />
      </div>

      {/* Contenedor del paso activo en card limpio con borde de 1px */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-8 shadow-xs print:bg-transparent print:border-none print:p-0 print:shadow-none">
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
          />
        </div>
      </div>

      {/* Modal accesible de confirmación Radix UI + Shadcn UI */}
      <AlertDialog
        open={dialogoConfirmacion.abierto}
        onOpenChange={(abierto) =>
          setDialogoConfirmacion((prev) => ({ ...prev, abierto }))
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogoConfirmacion.titulo}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogoConfirmacion.descripcion}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                dialogoConfirmacion.onConfirmar();
                setDialogoConfirmacion((prev) => ({ ...prev, abierto: false }));
              }}
              className="bg-[#DC2626] hover:bg-[#B91C1C] text-white"
            >
              {dialogoConfirmacion.textoAccion || 'Confirmar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
