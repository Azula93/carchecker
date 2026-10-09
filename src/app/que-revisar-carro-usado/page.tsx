import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  FileText,
  CheckSquare,
  HelpCircle,
} from 'lucide-react';

const LAST_UPDATED = '2026-10-04';

export const metadata: Metadata = {
  title: 'Qué revisar antes de comprar un carro usado',
  description:
    'Checklist para revisar un carro usado antes de comprarlo en Colombia: documentos, antecedentes, carrocería, motor, interior y prueba de ruta.',
  alternates: {
    canonical: '/que-revisar-carro-usado',
  },
  openGraph: {
    title: 'Qué revisar antes de comprar un carro usado | EscaneApp',
    description:
      'Checklist para revisar un carro usado antes de comprarlo en Colombia: documentos, antecedentes, carrocería, motor, interior y prueba de ruta.',
    url: 'https://www.escaneapp.com/que-revisar-carro-usado',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Qué revisar antes de comprar un carro usado | EscaneApp',
    description:
      'Checklist para revisar un carro usado antes de comprarlo en Colombia: documentos, antecedentes, carrocería, motor, interior y prueba de ruta.',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': 'https://www.escaneapp.com/que-revisar-carro-usado#article',
      headline: 'Qué revisar antes de comprar un carro usado: guía y checklist',
      description:
        'Checklist para revisar un carro usado antes de comprarlo en Colombia: documentos, antecedentes, carrocería, motor, interior y prueba de ruta.',
      url: 'https://www.escaneapp.com/que-revisar-carro-usado',
      dateModified: LAST_UPDATED,
      inLanguage: 'es-CO',
      isPartOf: {
        '@id': 'https://www.escaneapp.com/#webapp',
      },
      publisher: {
        '@type': 'Organization',
        name: 'EscaneApp',
        url: 'https://www.escaneapp.com',
      },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://www.escaneapp.com/que-revisar-carro-usado#breadcrumb',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://www.escaneapp.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Qué revisar antes de comprar un carro usado',
          item: 'https://www.escaneapp.com/que-revisar-carro-usado',
        },
      ],
    },
  ],
};

const PUNTOS_REVISION = [
  { id: 'documentos-legal', num: '1', title: 'Documentos y estado legal' },
  { id: 'datos-vehiculo', num: '2', title: 'Datos del vehículo y del vendedor' },
  { id: 'carroceria-pintura', num: '3', title: 'Carrocería y pintura' },
  { id: 'vidrios-luces-neumaticos', num: '4', title: 'Vidrios, luces y neumáticos' },
  { id: 'motor-fluidos', num: '5', title: 'Motor y fluidos' },
  { id: 'interior-equipamiento', num: '6', title: 'Interior y equipamiento' },
  { id: 'tablero-electrico', num: '7', title: 'Tablero y sistema eléctrico' },
  { id: 'prueba-ruta', num: '8', title: 'Prueba de ruta' },
  { id: 'peritaje-profesional', num: '9', title: 'Cuándo hacer un peritaje profesional' },
];

const CHECKLIST_ITEMS = [
  'Documentos y propietario verificados',
  'Improntas coinciden con la tarjeta de propiedad',
  'Datos básicos y número de serie (VIN)',
  'Kilometraje real vs desgaste en cabina',
  'Carrocería, pintura y alineación de paneles',
  'Vidrios, faros y señalización exterior',
  'Neumáticos, rines y llanta de repuesto',
  'Motor, fugas de fluidos y refrigerante',
  'Transmisión, embrague y dirección',
  'Interior, habitáculo y climatización',
  'Sistema eléctrico y testigos de tablero',
  'Prueba de ruta en frío y caliente',
  'SOAT, Tecnomecánica e Impuestos pagos',
  'Historial de siniestros y antecedentes RUNT',
];

export default function QueRevisarCarroUsadoPage() {
  return (
    <div className="w-full bg-[#F7F9FA] min-h-screen text-[#17212B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#66727D]">
            <li>
              <Link href="/" className="hover:text-[#123B5D] transition-colors font-medium">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="text-[#17212B] font-bold">
                Qué revisar antes de comprar un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA ESCANEAPP · INSPECCIÓN TÉCNICA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            Qué revisar antes de comprar un carro usado: guía y checklist
          </h1>

          <div className="space-y-3 text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl">
            <p>
              Un carro usado puede verse perfecto por fuera y tener problemas que solo aparecen cuando ya lo pagaste. Esta guía te da un orden de revisión pensado para que no pierdas tiempo: primero lo que puedes verificar sin ir a ver el vehículo, y después lo que debes revisar en persona.
            </p>
            <p>
              Es una revisión preliminar. Sirve para detectar señales de alerta y decidir si vale la pena avanzar a una inspección profesional, no para reemplazarla.
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#66727D] pt-1">
              Última actualización: 4 de octubre de 2026
            </p>
          </div>
        </header>

        {/* Índice interactivo - Orden recomendado */}
        <nav
          aria-label="Orden recomendado"
          className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#123B5D]" />
            <h2 className="text-base font-bold text-[#17212B]">
              Orden recomendado
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {PUNTOS_REVISION.map((punto) => (
              <a
                key={punto.id}
                href={`#${punto.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl text-[#475569] hover:text-[#123B5D] hover:bg-[#F7F9FA] transition-colors"
              >
                <span className="w-5 h-5 rounded-md bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {punto.num}
                </span>
                <span className="font-medium">{punto.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Secciones de revisión */}
        <div className="space-y-6">
          {/* SECCIÓN 1 */}
          <section id="documentos-legal" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Documentos y estado legal (hazlo antes de ir a verlo)
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Tarjeta de propiedad: original, sin tachones, a nombre del vendedor.',
                'SOAT vigente (verifícalo en RUNT).',
                'Revisión técnico-mecánica vigente.',
                'Impuestos al día.',
                'Sin multas pendientes (SIMIT).',
                'Certificado de tradición sin embargos ni prendas.',
                'Historial de siniestros (Fasecolda).',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> La tarjeta no está a nombre de quien vende, hay prenda o embargo vigente, o el vendedor evita dar la placa antes de que lo veas. Con deudas o limitaciones, el traspaso puede quedar bloqueado.
              </p>
            </div>
          </section>

          {/* SECCIÓN 2 */}
          <section id="datos-vehiculo" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Datos del vehículo y del vendedor
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Las improntas (número de motor, chasis y serie) coinciden con la tarjeta de propiedad.',
                'Marca, línea, modelo y año coinciden con el anuncio.',
                'La cédula del vendedor coincide con el propietario registrado.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> Números borrados, regrabados o que no coinciden con los documentos.
              </p>
            </div>
          </section>

          {/* SECCIÓN 3 */}
          <section id="carroceria-pintura" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Carrocería y pintura
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Revisa con luz natural y desde varios ángulos.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Diferencias de color o brillo entre paneles.',
                'Espacios irregulares entre puertas, capó y baúl.',
                'Masilla o repintado visibles en los bordes; corrosión en guardabarros y parte baja.',
                'Puertas, capó y baúl que cierran suave y alineados.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> Paneles de tonos distintos o separaciones desiguales pueden indicar un choque reparado. Pregunta al vendedor y verifica el historial de siniestros.
              </p>
            </div>
          </section>

          {/* SECCIÓN 4 */}
          <section id="vidrios-luces-neumaticos" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Vidrios, luces y neumáticos
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Parabrisas sin grietas ni impactos; sellos sin señales de reemplazo.',
                'Faros sin opacidad ni humedad interna; direccionales, luces de freno y reversa funcionando.',
                'Neumáticos con profundidad suficiente (el mínimo habitual es 1,6 mm; confirma el criterio vigente de la revisión técnico-mecánica), sin cortes ni abultamientos en los costados, y llanta de repuesto en buen estado.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> Desgaste desigual entre los bordes de una llanta puede indicar problemas de alineación o suspensión.
              </p>
            </div>
          </section>

          {/* SECCIÓN 5 */}
          <section id="motor-fluidos" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Motor y fluidos
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Fugas de aceite o refrigerante; mangueras, correas y abrazaderas en buen estado.',
                'Color y nivel del refrigerante y del líquido de frenos.',
                'Bornes de la batería sin sulfato.',
                'Encendido sin ruidos anormales; humo en el escape.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> El humo azul suele asociarse a consumo de aceite, el blanco a refrigerante y el negro a exceso de combustible. Una revisión visual no permite medir el estado interno del motor: ante cualquier ruido, pide una evaluación técnica.
              </p>
            </div>
          </section>

          {/* SECCIÓN 6 */}
          <section id="interior-equipamiento" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Interior y equipamiento
              </h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Desgaste de tapicería, volante, pomo de cambios y pedales frente al kilometraje que marca.',
                'Cinturones de seguridad que retraen y anclan bien.',
                'Elevavidrios, seguros eléctricos y aire acondicionado funcionando.',
                'Olor a humedad o alfombras mojadas.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> Un interior muy gastado con kilometraje bajo, o humedad bajo las alfombras.
              </p>
            </div>
          </section>

          {/* SECCIÓN 7 */}
          <section id="tablero-electrico" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Tablero y sistema eléctrico
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Al poner el switch en contacto, los testigos deben encender y apagarse tras el arranque.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Check Engine, ABS y airbag apagados con el motor en marcha.',
                'Indicadores de temperatura y combustible, pito, limpiaparabrisas.',
                'Pantalla central, USB y toma de 12 V.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> Testigos que nunca encienden (pueden haber sido desconectados) o que quedan encendidos.
              </p>
            </div>
          </section>

          {/* SECCIÓN 8 */}
          <section id="prueba-ruta" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Prueba de ruta
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Si es seguro y el propietario lo autoriza, prueba en distintos tipos de vía.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Arranque en frío y ralentí estable.',
                'Cambios suaves; embrague con punto de corte normal; sin tirones en cajas automáticas.',
                'Volante centrado, frenado recto, sin golpeteos en reductores.',
                'Temperatura estable durante todo el recorrido.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Señal de alerta:</strong> El vendedor no permite la prueba de ruta. Considera si quieres seguir con esa compra.
              </p>
            </div>
          </section>

          {/* SECCIÓN 9 */}
          <section id="peritaje-profesional" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Cuándo hacer un peritaje profesional
              </h2>
            </div>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Hazlo si encontraste señales de alerta, si el carro representa una inversión importante para ti, o si te quedan dudas sobre el estado mecánico o legal. Un peritaje verifica lo que no se ve en una revisión visual y evita una compra equivocada.
            </p>
          </section>
        </div>

        {/* Preguntas frecuentes */}
        <section className="my-12 bg-white rounded-2xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-4">
            <HelpCircle className="w-5 h-5 text-[#123B5D]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-5">
            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#17212B]">
                ¿Qué debo revisar primero?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Los documentos y antecedentes. Se hacen desde casa con la placa, y evitan que viajes a ver un carro con deudas o problemas legales.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#17212B]">
                ¿Un kilometraje bajo garantiza que está bien?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                No. El mantenimiento y el uso importan tanto como el número.{' '}
                <Link
                  href="/kilometraje-carro-usado"
                  className="font-bold text-[#123B5D] hover:underline underline-offset-4"
                >
                  Consulta nuestra guía para revisar el kilometraje
                </Link>
                .
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#17212B]">
                ¿Dónde consulto los antecedentes?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                En las fuentes oficiales: RUNT, SIMIT y Fasecolda. EscaneApp te guía y te ayuda a registrar los hallazgos. Consulta nuestra guía sobre{' '}
                <Link
                  href="/antecedentes-vehiculo-colombia"
                  className="font-bold text-[#123B5D] hover:underline underline-offset-4"
                >
                  antecedentes de un vehículo
                </Link>
                .
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#17212B]">
                ¿Basta con mi revisión o necesito un peritaje?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                La revisión preliminar detecta señales de alerta; el peritaje confirma el estado real. Si algo no te cierra, hazlo.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-[#17212B]">
                ¿Qué hago si el vendedor no deja revisar bien el carro?
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Es una señal de alerta. Un vendedor con un carro en buen estado normalmente no tiene problema en que lo revises.
              </p>
            </div>
          </div>
        </section>

        {/* Checklist rápido resumido */}
        <section className="my-12 bg-white rounded-2xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-5 h-5 text-[#123B5D]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Checklist rápido antes de comprar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#66727D] mb-5">
            Comprueba que hayas completado cada una de las 14 verificaciones clave:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CHECKLIST_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-3.5 hover:border-[#123B5D]/40 transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-white border border-[#CBD5E1] flex items-center justify-center shrink-0">
                  <span className="w-2 h-2 rounded-xs bg-[#2EAD68]" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#17212B]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Enlaces relacionados */}
        <section className="border-t border-[#CBD5E1] pt-10 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#66727D] block mb-1">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] mb-6">
            También te puede interesar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/como-revisar-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Cómo revisar un carro usado
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Metodología paso a paso antes de acudir a un peritaje.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Cómo revisar el kilometraje
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Aprende a interpretar el kilometraje real acumulado.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Antecedentes de un vehículo
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                RUNT, SIMIT, multas y certificados de tradición.
              </p>
            </Link>

            <Link
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Calculadora de costos de tenencia
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Calcula gasolina, SOAT, impuestos y mantenimiento.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#123B5D] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Organiza tu revisión con EscaneApp
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Utiliza nuestra herramienta interactiva para evaluar el vehículo, detectar alertas de riesgo y estimar costos en minutos.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-xl bg-[#8BCF3F] hover:bg-[#7ab837] text-[#123B5D] text-sm font-extrabold transition-all shadow-sm active:scale-98"
              >
                <span>Iniciar evaluación</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <p className="text-[11px] text-[#66727D] leading-relaxed text-center sm:text-left">
          <strong>Aviso de orientación:</strong> Esta información tiene carácter general y orientativo. EscaneApp no sustituye un peritaje, diagnóstico mecánico especializado o inspección técnica profesional del vehículo.
        </p>
      </article>
    </div>
  );
}