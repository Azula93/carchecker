export interface CostoReferencia {
  checklistId: string;
  descripcion: string;
  costoMin: number;
  costoMax: number;
}

export const COSTOS_REFERENCIA: CostoReferencia[] = [
  // Exterior
  { checklistId: 'ext-01', descripcion: 'Repintado y corrección de pintura', costoMin: 500000, costoMax: 2000000 },
  { checklistId: 'ext-02', descripcion: 'Cambio de parabrisas', costoMin: 400000, costoMax: 800000 },
  { checklistId: 'ext-03', descripcion: 'Cambio de vidrio trasero', costoMin: 300000, costoMax: 600000 },
  { checklistId: 'ext-04', descripcion: 'Reparación/cambio bomper delantero', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'ext-05', descripcion: 'Reparación/cambio bomper trasero', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'ext-06', descripcion: 'Corrección de latonería profunda', costoMin: 300000, costoMax: 1500000 },
  { checklistId: 'ext-07', descripcion: 'Reemplazo/reparación espejos laterales', costoMin: 150000, costoMax: 400000 },
  { checklistId: 'ext-08', descripcion: 'Reparación manijas de puertas', costoMin: 80000, costoMax: 200000 },
  { checklistId: 'ext-10', descripcion: 'Reemplazo de llantas (por unidad)', costoMin: 250000, costoMax: 500000 },
  { checklistId: 'ext-11', descripcion: 'Reemplazo de llantas por daño estructural', costoMin: 250000, costoMax: 500000 },
  { checklistId: 'ext-12', descripcion: 'Mantenimiento/cambio luces delanteras', costoMin: 100000, costoMax: 500000 },
  { checklistId: 'ext-13', descripcion: 'Mantenimiento/cambio luces traseras', costoMin: 80000, costoMax: 300000 },
  { checklistId: 'ext-14', descripcion: 'Reposición de emblemas y molduras', costoMin: 50000, costoMax: 200000 },
  { checklistId: 'ext-15', descripcion: 'Alineación de carrocería y reparaciones', costoMin: 500000, costoMax: 3000000 },

  // Motor y Mecánica
  { checklistId: 'mot-01', descripcion: 'Corrección de fugas de aceite', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'mot-02', descripcion: 'Cambio de empaque de culata / reparación', costoMin: 800000, costoMax: 2500000 },
  { checklistId: 'mot-03', descripcion: 'Mantenimiento sistema de refrigeración', costoMin: 150000, costoMax: 500000 },
  { checklistId: 'mot-04', descripcion: 'Cambio de mangueras y conectores', costoMin: 100000, costoMax: 400000 },
  { checklistId: 'mot-05', descripcion: 'Cambio kit de distribución/correas', costoMin: 400000, costoMax: 1200000 },
  { checklistId: 'mot-06', descripcion: 'Reparación sistema de encendido', costoMin: 200000, costoMax: 1000000 },
  { checklistId: 'mot-07', descripcion: 'Mantenimiento cuerpo de aceleración/sensores', costoMin: 150000, costoMax: 600000 },
  { checklistId: 'mot-08', descripcion: 'Reparación de motor por humo', costoMin: 300000, costoMax: 3000000 },
  { checklistId: 'mot-09', descripcion: 'Reemplazo de batería', costoMin: 250000, costoMax: 500000 },
  { checklistId: 'mot-10', descripcion: 'Cambio de filtro de aire', costoMin: 30000, costoMax: 80000 },
  { checklistId: 'mot-11', descripcion: 'Reparación de cableado eléctrico', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'mot-12', descripcion: 'Reparación o cambio de alternador', costoMin: 300000, costoMax: 700000 },
  { checklistId: 'mot-13', descripcion: 'Reparación/cambio compresor de A/C', costoMin: 600000, costoMax: 1500000 },
  { checklistId: 'mot-14', descripcion: 'Cambio de soportes de motor', costoMin: 200000, costoMax: 600000 },

  // Interior y Equipamiento
  { checklistId: 'int-01', descripcion: 'Restauración o cambio de tablero', costoMin: 300000, costoMax: 1000000 },
  { checklistId: 'int-02', descripcion: 'Reparación de cojiniería', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'int-03', descripcion: 'Reparación/cambio cinturones de seguridad', costoMin: 150000, costoMax: 400000 },
  { checklistId: 'int-04', descripcion: 'Reparación/cambio de sistema multimedia', costoMin: 200000, costoMax: 1500000 },
  { checklistId: 'int-05', descripcion: 'Reemplazo de parlantes', costoMin: 100000, costoMax: 400000 },
  { checklistId: 'int-06', descripcion: 'Reparación elevavidrios eléctricos (piloto)', costoMin: 150000, costoMax: 350000 },
  { checklistId: 'int-07', descripcion: 'Reparación elevavidrios (pasajeros)', costoMin: 150000, costoMax: 350000 },
  { checklistId: 'int-08', descripcion: 'Reparación sistema eléctrico retrovisores', costoMin: 150000, costoMax: 400000 },
  { checklistId: 'int-09', descripcion: 'Reparación de sistema de aire acondicionado', costoMin: 300000, costoMax: 1500000 },
  { checklistId: 'int-10', descripcion: 'Reparación sistema de calefacción', costoMin: 200000, costoMax: 600000 },
  { checklistId: 'int-11', descripcion: 'Corrección de fallas marcadas en tablero', costoMin: 100000, costoMax: 500000 },
  { checklistId: 'int-13', descripcion: 'Tapizado de techo interior', costoMin: 200000, costoMax: 500000 },
  { checklistId: 'int-14', descripcion: 'Tratamiento de piso y tapetes', costoMin: 50000, costoMax: 300000 },

  // Prueba de Ruta
  { checklistId: 'rut-01', descripcion: 'Mantenimiento o reparación caja de cambios', costoMin: 500000, costoMax: 2000000 },
  { checklistId: 'rut-02', descripcion: 'Reparación de sincronizadores', costoMin: 400000, costoMax: 1500000 },
  { checklistId: 'rut-03', descripcion: 'Afinación / sistema de inyección', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'rut-04', descripcion: 'Revisión potencia del motor con carga', costoMin: 300000, costoMax: 1000000 },
  { checklistId: 'rut-05', descripcion: 'Rectificación/cambio de discos de freno', costoMin: 200000, costoMax: 600000 },
  { checklistId: 'rut-06', descripcion: 'Mantenimiento de frenos', costoMin: 150000, costoMax: 500000 },
  { checklistId: 'rut-07', descripcion: 'Cambio de kit de embrague', costoMin: 400000, costoMax: 1200000 },
  { checklistId: 'rut-08', descripcion: 'Ajuste de freno de mano / guayas', costoMin: 100000, costoMax: 400000 },
  { checklistId: 'rut-09', descripcion: 'Corrección de pérdida de fuerza en subida', costoMin: 200000, costoMax: 1000000 },
  { checklistId: 'rut-10', descripcion: 'Reparación caja o terminales de dirección', costoMin: 300000, costoMax: 800000 },
  { checklistId: 'rut-11', descripcion: 'Mantenimiento de suspensión', costoMin: 300000, costoMax: 1000000 },
  { checklistId: 'rut-12', descripcion: 'Cambio de amortiguadores (por par)', costoMin: 250000, costoMax: 600000 },
  { checklistId: 'rut-13', descripcion: 'Diagnóstico y corrección ruidos de rodamientos', costoMin: 150000, costoMax: 800000 },
  { checklistId: 'rut-14', descripcion: 'Alineación, balanceo o rectificación ejes', costoMin: 50000, costoMax: 500000 },
  { checklistId: 'rut-15', descripcion: 'Alineación de dirección', costoMin: 50000, costoMax: 120000 },

  // Inspección Inferior
  { checklistId: 'inf-01', descripcion: 'Corrección de fugas en caja de cambios', costoMin: 300000, costoMax: 1500000 },
  { checklistId: 'inf-02', descripcion: 'Corrección de fugas en el cárter', costoMin: 200000, costoMax: 600000 },
  { checklistId: 'inf-03', descripcion: 'Reparación o cambio de exosto', costoMin: 200000, costoMax: 800000 },
  { checklistId: 'inf-04', descripcion: 'Cambio de silenciador', costoMin: 150000, costoMax: 500000 },
  { checklistId: 'inf-05', descripcion: 'Reparación de ejes y terminales', costoMin: 200000, costoMax: 600000 },
  { checklistId: 'inf-06', descripcion: 'Cambio de juntas homocinéticas', costoMin: 250000, costoMax: 600000 },
  { checklistId: 'inf-07', descripcion: 'Cambio de bujes de suspensión', costoMin: 100000, costoMax: 400000 },
  { checklistId: 'inf-10', descripcion: 'Reemplazo de guardapolvos de goma', costoMin: 80000, costoMax: 250000 },
  { checklistId: 'inf-11', descripcion: 'Reparación de tuberías de frenos', costoMin: 150000, costoMax: 400000 },
  { checklistId: 'inf-12', descripcion: 'Mantenimiento a tanque de combustible', costoMin: 300000, costoMax: 800000 },

  // Pruebas Complementarias
  { checklistId: 'com-01', descripcion: 'Reparación de filtración en sunroof', costoMin: 300000, costoMax: 1000000 },
  { checklistId: 'com-03', descripcion: 'Reposición de llanta de repuesto', costoMin: 150000, costoMax: 400000 },
  { checklistId: 'com-04', descripcion: 'Reposición de gato y herramienta', costoMin: 80000, costoMax: 200000 },
  { checklistId: 'com-05', descripcion: 'Adquisición de kit de carretera', costoMin: 80000, costoMax: 200000 },
  { checklistId: 'com-06', descripcion: 'Recarga o cambio de extintor', costoMin: 30000, costoMax: 80000 },
  { checklistId: 'com-07', descripcion: 'Adquisición de botiquín', costoMin: 20000, costoMax: 50000 },
  { checklistId: 'com-08', descripcion: 'Duplicado de llaves estándar', costoMin: 50000, costoMax: 500000 },
  { checklistId: 'com-10', descripcion: 'Programación de segunda llave con chip', costoMin: 200000, costoMax: 500000 }
];

export const getCostoByChecklistId = (id: string): CostoReferencia | undefined => {
  return COSTOS_REFERENCIA.find(c => c.checklistId === id);
};

export const formatCOP = (valor: number): string => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(valor);
};
