import { ChecklistItemDef, CategoriaChecklist } from '../types/evaluation';

export const CHECKLIST_ITEMS: ChecklistItemDef[] = [
  // Exterior (15 items)
  { id: 'ext-01', nombre: 'Pintura uniforme', categoria: 'exterior', tip: 'Observe la pintura desde un ángulo lateral bajo. Diferencias de tono o textura indican repintado' },
  { id: 'ext-02', nombre: 'Parabrisas sin fisuras', categoria: 'exterior', tip: 'Revise bordes y esquinas del parabrisas. Despicados en los bordes se expanden con el tiempo' },
  { id: 'ext-03', nombre: 'Vidrio trasero', categoria: 'exterior', tip: 'Verifique que la resistencia térmica (líneas) funcione y no tenga fisuras' },
  { id: 'ext-04', nombre: 'Bomper delantero', categoria: 'exterior', tip: 'Revise alineación con el capó y guardafangos. Busque grietas, abolladuras o diferencias de color' },
  { id: 'ext-05', nombre: 'Bomper trasero', categoria: 'exterior', tip: 'Misma inspección que el delantero. Revise los sensores de parqueo si los tiene' },
  { id: 'ext-06', nombre: 'Detección de masilla', categoria: 'exterior', tip: 'Pase un imán por los paneles. Si no se adhiere, hay masilla. También busque irregularidades al tacto' },
  { id: 'ext-07', nombre: 'Espejos laterales', categoria: 'exterior', tip: 'Verifique que ambos espejos estén completos, sin grietas y que el ajuste eléctrico funcione' },
  { id: 'ext-08', nombre: 'Manijas de puertas', categoria: 'exterior', tip: 'Abra y cierre todas las puertas. Las manijas deben ser firmes, sin juego ni crujidos' },
  { id: 'ext-09', nombre: 'Cauchos del techo (Alerta vuelco)', categoria: 'exterior', tip: '[ATENCIÓN] Si los cauchos/empaques del techo están nuevos en un carro viejo, puede indicar que el vehículo volcó y fue reparado' },
  { id: 'ext-10', nombre: 'Vida útil de llantas', categoria: 'exterior', tip: 'Prueba de la moneda de $500: inserte la moneda en la ranura del labrado. Si se hunde completamente, la llanta está bien. Si queda expuesta, necesita cambio' },
  { id: 'ext-11', nombre: 'Chichones internos en llantas', categoria: 'exterior', tip: 'Pase la mano por la parte interna de cada llanta. Abultamientos o chichones significan daño estructural irreparable' },
  { id: 'ext-12', nombre: 'Luces delanteras', categoria: 'exterior', tip: 'Encienda luces bajas, altas y direccionales. Verifique que no estén opacas o con humedad interna' },
  { id: 'ext-13', nombre: 'Luces traseras y stops', categoria: 'exterior', tip: 'Pida a alguien que pise el freno mientras usted verifica atrás. Revise reversa y direccionales' },
  { id: 'ext-14', nombre: 'Emblemas y molduras', categoria: 'exterior', tip: 'Verifique que todos los emblemas estén originales y bien adheridos. Faltantes pueden indicar reparaciones' },
  { id: 'ext-15', nombre: 'Estado general de la carrocería', categoria: 'exterior', tip: 'Revise alineación de puertas, capó y baúl. Separaciones desiguales indican golpes o reparaciones estructurales' },

  // Motor y Mecánica (14 items)
  { id: 'mot-01', nombre: 'Fugas de aceite del motor', categoria: 'motor', tip: 'Observe debajo del motor y alrededor del cárter. Manchas oscuras o goteo indican fugas' },
  { id: 'mot-02', nombre: 'Consistencia del aceite', categoria: 'motor', tip: 'Saque la bayoneta y revise el aceite. Si está lechoso o tiene espuma, hay mezcla con refrigerante (posible empaque de culata dañado)' },
  { id: 'mot-03', nombre: 'Nivel y estado del refrigerante', categoria: 'motor', tip: 'Revise el tarro de refrigerante. Debe tener líquido entre MIN y MAX. Si tiene aceite o residuos, es mala señal' },
  { id: 'mot-04', nombre: 'Mangueras y conexiones', categoria: 'motor', tip: 'Apriete las mangueras. No deben estar agrietadas, duras ni hinchadas' },
  { id: 'mot-05', nombre: 'Correas (distribución/accesorios)', categoria: 'motor', tip: 'Revise que las correas no tengan grietas, desgaste o estén flojas. Pregunte cuándo fue el último cambio de distribución' },
  { id: 'mot-06', nombre: 'Prueba de encendido', categoria: 'motor', tip: 'El motor debe encender con UN SOLO estazo. Si requiere varios intentos, hay problemas eléctricos o de combustible' },
  { id: 'mot-07', nombre: 'Ralentí estable', categoria: 'motor', tip: 'Con el motor encendido y sin acelerar, las RPM deben mantenerse estables (700-900 RPM). Vibraciones o variaciones indican problemas' },
  { id: 'mot-08', nombre: 'Humo del escape', categoria: 'motor', tip: 'Observe el color del humo: transparente=normal, azul=quema aceite, blanco espeso=empaque de culata, negro=exceso de combustible' },
  { id: 'mot-09', nombre: 'Batería', categoria: 'motor', tip: 'Revise la fecha de la batería (dura 2-3 años). Los bornes deben estar limpios sin corrosión verde/blanca' },
  { id: 'mot-10', nombre: 'Filtro de aire', categoria: 'motor', tip: 'Abra la caja del filtro. Si está muy sucio indica falta de mantenimiento general' },
  { id: 'mot-11', nombre: 'Cableado eléctrico', categoria: 'motor', tip: 'Busque cables pelados, empalmes caseros o cinta aislante. Indica reparaciones improvisadas' },
  { id: 'mot-12', nombre: 'Alternador', categoria: 'motor', tip: 'Con el motor encendido, encienda luces, radio y A/C. Si las luces bajan mucho de intensidad, el alternador puede estar fallando' },
  { id: 'mot-13', nombre: 'Compresor del A/C', categoria: 'motor', tip: 'Encienda el A/C y escuche si el compresor activa y desactiva cíclicamente. Ruidos metálicos indican daño' },
  { id: 'mot-14', nombre: 'Soportes del motor', categoria: 'motor', tip: 'Con el motor encendido, observe si vibra excesivamente. Pida a alguien que acelere mientras usted mira si el motor se mueve mucho' },

  // Interior y Equipamiento (14 items)
  { id: 'int-01', nombre: 'Estado del tablero', categoria: 'interior', tip: 'Busque fisuras, decoloración o partes despegadas. Un tablero dañado es costoso de reparar' },
  { id: 'int-02', nombre: 'Cojiniería', categoria: 'interior', tip: 'Revise todas las sillas: desgarros, manchas, resortes vencidos. Siéntese en cada asiento y verifique la espuma' },
  { id: 'int-03', nombre: 'Cinturones de seguridad', categoria: 'interior', tip: 'Hale cada cinturón completamente y verifique que retracte solo. El sistema de bloqueo debe activar al halar bruscamente' },
  { id: 'int-04', nombre: 'Radio/sistema multimedia', categoria: 'interior', tip: 'Encienda la radio, pruebe FM/AM/USB/Bluetooth. Verifique que la pantalla táctil responda en todas las zonas' },
  { id: 'int-05', nombre: 'Parlantes', categoria: 'interior', tip: 'Suba el volumen y verifique que todos los parlantes suenen sin distorsión. Pruebe los de cada puerta' },
  { id: 'int-06', nombre: 'Vidrios eléctricos (piloto)', categoria: 'interior', tip: 'Suba y baje cada vidrio. Deben moverse suavemente sin ruidos. Verifique que funcione desde el control del piloto' },
  { id: 'int-07', nombre: 'Vidrios eléctricos (pasajeros)', categoria: 'interior', tip: 'Pruebe los vidrios traseros tanto desde los controles traseros como desde el control principal del conductor' },
  { id: 'int-08', nombre: 'Retrovisores eléctricos', categoria: 'interior', tip: 'Ajuste ambos retrovisores desde el control. Deben moverse en las 4 direcciones sin trabarse' },
  { id: 'int-09', nombre: 'Aire acondicionado', categoria: 'interior', tip: 'Encienda el A/C al máximo y espere 3-5 minutos. Debe salir aire frío. Apague y encienda 3 veces para probar el compresor' },
  { id: 'int-10', nombre: 'Calefacción', categoria: 'interior', tip: 'Cambie a calefacción. El aire caliente debe salir en menos de 2 minutos' },
  { id: 'int-11', nombre: 'Luces del tablero/testigos', categoria: 'interior', tip: 'Al dar contacto (sin encender), TODOS los testigos deben encender y luego apagarse. Si alguno queda encendido, hay falla' },
  { id: 'int-12', nombre: 'Odómetro coherente', categoria: 'interior', tip: 'Compare el kilometraje con el desgaste del volante, la palanca y los pedales. Un odómetro bajo con mucho desgaste indica alteración' },
  { id: 'int-13', nombre: 'Techo interior', categoria: 'interior', tip: 'Revise que la tela del techo no esté descolgada ni manchada. Manchas de humedad indican filtraciones' },
  { id: 'int-14', nombre: 'Tapetes y piso', categoria: 'interior', tip: 'Levante los tapetes y revise el piso. Busque óxido, humedad o reparaciones. Olor a humedad es mala señal' },

  // Prueba de Ruta (15 items)
  { id: 'rut-01', nombre: 'Palanca de cambios suave', categoria: 'ruta', tip: 'Todos los cambios deben entrar suavemente sin forzar. Si la palanca \'raspa\' o se traba, hay desgaste en la caja' },
  { id: 'rut-02', nombre: 'Sincronización de cambios', categoria: 'ruta', tip: 'Meta cada cambio a diferentes RPM. No debe haber ruidos metálicos ni rechazo al entrar el cambio' },
  { id: 'rut-03', nombre: 'Aceleración progresiva', categoria: 'ruta', tip: 'Acelere gradualmente. La respuesta debe ser suave y proporcional. Tirones indican problemas de inyección o bujías' },
  { id: 'rut-04', nombre: 'Aceleración con A/C', categoria: 'ruta', tip: 'Encienda el A/C y acelere. Es normal perder un poco de potencia, pero si el carro se ahoga o tiembla mucho, hay problema' },
  { id: 'rut-05', nombre: 'Frenos sin vibración', categoria: 'ruta', tip: 'Frene desde 60 km/h. El pedal no debe vibrar ni el volante temblar. Vibración = discos alabeados' },
  { id: 'rut-06', nombre: 'Distancia de frenado', categoria: 'ruta', tip: 'El carro debe frenar en línea recta sin jalarse hacia un lado. Si se desvía, hay problema en pastillas o calibración' },
  { id: 'rut-07', nombre: 'Embrague (punto preciso)', categoria: 'ruta', tip: 'El embrague debe tener un punto de agarre claro y firme. Si patina (RPM suben sin acelerar) está gastado' },
  { id: 'rut-08', nombre: 'Freno de mano', categoria: 'ruta', tip: 'Active el freno de mano en una subida. El carro debe sostenerse SOLO sin irse hacia atrás' },
  { id: 'rut-09', nombre: 'Reversa en rampa >30°', categoria: 'ruta', tip: '[ATENCIÓN] Prueba clave: suba una rampa empinada en reversa. Si el carro falla, tiembla o se apaga, hay problemas en bujías, bobinas o compresión' },
  { id: 'rut-10', nombre: 'Dirección sin juego', categoria: 'ruta', tip: 'El volante no debe tener juego excesivo antes de que las ruedas respondan. Máximo 2-3 cm de movimiento libre' },
  { id: 'rut-11', nombre: 'Suspensión sin golpes', categoria: 'ruta', tip: 'Pase por un resalto a baja velocidad. No debe haber golpes secos ni ruidos metálicos. Solo un rebote suave' },
  { id: 'rut-12', nombre: 'Amortiguadores', categoria: 'ruta', tip: 'Presione cada esquina del carro hacia abajo y suelte. Debe rebotar UNA sola vez y estabilizarse. Más rebotes = amortiguador vencido' },
  { id: 'rut-13', nombre: 'Ruidos anormales', categoria: 'ruta', tip: 'Escuche atentamente durante toda la prueba. Clicks al girar = homocinéticas. Zumbidos = rodamientos. Chirridos = frenos' },
  { id: 'rut-14', nombre: 'Vibraciones a velocidad', categoria: 'ruta', tip: 'A más de 80 km/h no debe haber vibraciones en el volante ni en el piso. Si las hay, puede ser balanceo, alineación o ejes' },
  { id: 'rut-15', nombre: 'Alineación', categoria: 'ruta', tip: 'En una vía recta y plana, suelte el volante brevemente. El carro debe seguir derecho sin desviarse' },

  // Inspección Inferior (12 items)
  { id: 'inf-01', nombre: 'Fugas de caja de cambios', categoria: 'inferior', tip: 'Revise debajo de la caja de cambios. Aceite rojo/rosado (automática) o aceite oscuro espeso (mecánica) indica fuga' },
  { id: 'inf-02', nombre: 'Fugas del cárter', categoria: 'inferior', tip: 'El cárter (parte inferior del motor) no debe tener goteo ni acumulación de aceite' },
  { id: 'inf-03', nombre: 'Exosto sin perforaciones', categoria: 'inferior', tip: 'Revise todo el tubo de escape. No debe tener huecos, parches ni soldaduras caseras. Escuche si sopla' },
  { id: 'inf-04', nombre: 'Silenciador', categoria: 'inferior', tip: 'El silenciador no debe tener óxido excesivo ni estar parchado. Un silenciador dañado genera ruido excesivo' },
  { id: 'inf-05', nombre: 'Ejes sin juego', categoria: 'inferior', tip: 'Mueva las ruedas lateralmente. No debe haber juego. Juego = terminales, rótulas o rodamientos dañados' },
  { id: 'inf-06', nombre: 'Homocinéticas', categoria: 'inferior', tip: 'Busque los guardapolvos de goma en los ejes. Si están rotos o hay grasa salpicada alrededor, la homocinética está dañada' },
  { id: 'inf-07', nombre: 'Bujes de suspensión', categoria: 'inferior', tip: 'Revise los bujes de goma en los brazos de suspensión. No deben estar agrietados ni deformados' },
  { id: 'inf-08', nombre: 'Chasis sin remiendos', categoria: 'inferior', tip: '[ATENCIÓN] CRÍTICO: Revise toda la estructura. El chasis NO debe tener soldaduras, parches, láminas sobrepuestas ni pintura fresca en zonas específicas' },
  { id: 'inf-09', nombre: 'Sin soldaduras sospechosas', categoria: 'inferior', tip: 'Las soldaduras originales de fábrica son uniformes (puntos equidistantes). Soldaduras irregulares o con cordón indican reparación estructural' },
  { id: 'inf-10', nombre: 'Guardapolvos', categoria: 'inferior', tip: 'Todos los guardapolvos de goma (dirección, ejes, amortiguadores) deben estar íntegros sin roturas' },
  { id: 'inf-11', nombre: 'Tubería de frenos', categoria: 'inferior', tip: 'Revise las líneas de freno. No deben tener óxido, aplastamientos ni fugas. Son de metal y/o caucho' },
  { id: 'inf-12', nombre: 'Tanque de combustible', categoria: 'inferior', tip: 'Observe el tanque. No debe tener óxido excesivo, abolladuras ni reparaciones' },

  // Pruebas Complementarias e Improntas (10 items)
  { id: 'com-01', nombre: 'Filtración en sunroof/escotilla', categoria: 'complementarias', tip: 'Si tiene sunroof, viértele agua encima y revise adentro después de 5 minutos. Busque goteo o humedad en el techo' },
  { id: 'com-02', nombre: 'Improntas vs tarjeta de propiedad', categoria: 'complementarias', tip: '[ATENCIÓN] CRÍTICO: Compare los números grabados en chasis y motor con los de la tarjeta de propiedad. DEBEN coincidir exactamente' },
  { id: 'com-03', nombre: 'Llanta de repuesto', categoria: 'complementarias', tip: 'Abra el baúl y verifique que exista la llanta de repuesto, que tenga aire y buen labrado' },
  { id: 'com-04', nombre: 'Gato y herramientas', categoria: 'complementarias', tip: 'Verifique que estén el gato hidráulico/mecánico, la llave de ruedas y el triángulo de seguridad' },
  { id: 'com-05', nombre: 'Kit de carretera', categoria: 'complementarias', tip: 'Por ley debe tener: 2 triángulos, extintor vigente, botiquín, linterna, chaleco reflectivo' },
  { id: 'com-06', nombre: 'Extintor vigente', categoria: 'complementarias', tip: 'El extintor debe estar cargado (aguja en zona verde) y con fecha de vencimiento vigente' },
  { id: 'com-07', nombre: 'Botiquín', categoria: 'complementarias', tip: 'Debe existir y tener elementos básicos: gasas, vendas, alcohol, guantes' },
  { id: 'com-08', nombre: 'Duplicado de llaves', categoria: 'complementarias', tip: 'Pida las DOS llaves del vehículo. Si solo tiene una, el duplicado puede ser costoso, especialmente si es con chip' },
  { id: 'com-09', nombre: 'Manual del propietario', categoria: 'complementarias', tip: 'Pida el manual original del vehículo. Verifique que corresponda al modelo y año' },
  { id: 'com-10', nombre: 'Segunda llave con chip', categoria: 'complementarias', tip: 'Si el vehículo usa llave con chip/inmovilizador, la segunda llave programada puede costar entre $200.000 y $500.000' }
];

export const getItemsPorCategoria = (categoria: CategoriaChecklist): ChecklistItemDef[] => {
  return CHECKLIST_ITEMS.filter(item => item.categoria === categoria);
};

export const CATEGORIAS_INFO: Record<CategoriaChecklist, { icono: string; descripcion: string }> = {
  exterior: {
    icono: 'CarFront',
    descripcion: 'Inspección visual del estado de la carrocería, pintura y elementos externos.'
  },
  motor: {
    icono: 'Cog',
    descripcion: 'Revisión del motor, fluidos, componentes eléctricos y encendido.'
  },
  interior: {
    icono: 'Armchair',
    descripcion: 'Estado de la cabina, tapicería, confort y sistemas electrónicos interiores.'
  },
  ruta: {
    icono: 'Route',
    descripcion: 'Comportamiento dinámico, frenos, dirección y transmisión en movimiento.'
  },
  inferior: {
    icono: 'Wrench',
    descripcion: 'Inspección del chasis, suspensión, escapes y posibles fugas inferiores.'
  },
  complementarias: {
    icono: 'ClipboardList',
    descripcion: 'Verificación legal de documentos, improntas y accesorios obligatorios.'
  }
};
