import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  FileText,
  CheckSquare,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Qué revisar en un carro usado antes de comprarlo | EscaneApp',
  description:
    'Conoce qué revisar en un carro usado antes de comprarlo en Colombia: carrocería, motor, transmisión, interior, neumáticos, sistema eléctrico, documentos y prueba de ruta.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/que-revisar-carro-usado',
  },
  openGraph: {
    title: 'Qué revisar en un carro usado antes de comprarlo | EscaneApp',
    description:
      'Lista práctica de los principales componentes que debes revisar antes de comprar un vehículo usado en Colombia.',
    url: 'https://carchecker.kodiquett.com/que-revisar-carro-usado',
    siteName: 'EscaneApp Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://carchecker.kodiquett.com/que-revisar-carro-usado#article',
  headline: 'Qué revisar en un carro usado antes de comprarlo',
  description:
    'Lista práctica de los principales componentes que debes revisar antes de comprar un vehículo usado en Colombia.',
  url: 'https://carchecker.kodiquett.com/que-revisar-carro-usado',
  inLanguage: 'es-CO',
  isPartOf: {
    '@id': 'https://carchecker.kodiquett.com/#webapp',
  },
  publisher: {
    '@type': 'Organization',
    name: 'EscaneApp',
    url: 'https://carchecker.kodiquett.com',
  },
};

const PUNTOS_REVISION = [
  { id: 'carroceria', num: '1', title: 'Carrocería y pintura' },
  { id: 'vidrios-luces', num: '2', title: 'Vidrios, espejos y luces' },
  { id: 'neumaticos', num: '3', title: 'Neumáticos y ruedas' },
  { id: 'motor', num: '4', title: 'Motor y fluidos' },
  { id: 'transmision', num: '5', title: 'Transmisión y comportamiento mecánico' },
  { id: 'interior', num: '6', title: 'Interior y equipamiento' },
  { id: 'electrico', num: '7', title: 'Sistema eléctrico y tablero' },
  { id: 'prueba-ruta', num: '8', title: 'Prueba de ruta' },
  { id: 'documentacion', num: '9', title: 'Documentación y antecedentes' },
];

export default function QueRevisarCarroUsadoPage() {
  return (
    <main className="w-full bg-[#F7F9FA] min-h-screen text-[#17212B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
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
                Qué revisar en un carro usado
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
            Qué revisar en un carro usado antes de comprarlo
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl">
            Antes de comprar un vehículo usado conviene revisar diferentes componentes y no concentrarse únicamente en su apariencia. Esta guía presenta los principales puntos que puedes verificar durante una revisión preliminar.
          </p>
        </header>

        {/* Introducción */}
        <section className="mb-8 bg-white border border-[#CBD5E1] p-5 sm:p-6 rounded-2xl shadow-xs text-sm sm:text-base text-[#475569] leading-relaxed space-y-3">
          <p>
            Un vehículo puede presentar un buen aspecto exterior y, al mismo tiempo, tener elementos que requieren atención. Por eso es útil realizar una revisión ordenada que incluya la carrocería, el compartimiento del motor, el interior, los neumáticos, los sistemas visibles y su documentación.
          </p>
          <p className="text-xs sm:text-sm text-[#66727D]">
            <strong className="text-[#17212B]">Nota:</strong> Esta revisión tiene carácter preliminar. Una evaluación visual no permite determinar por sí sola el estado interno de todos los sistemas del vehículo.
          </p>
        </section>

        {/* Índice interactivo */}
        <nav
          aria-label="Contenido de la guía"
          className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#123B5D]" />
            <h2 className="text-base font-bold text-[#17212B]">
              Puntos clave de revisión
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
          {/* 1 */}
          <section id="carroceria" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Carrocería y pintura
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Observa la carrocería con buena iluminación natural y desde diferentes ángulos. El objetivo es identificar diferencias visibles entre las distintas piezas y uniones estructurales.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Diferencias de color o tonalidad entre piezas.',
                'Golpes, rayones o abolladuras en paneles.',
                'Desalineación entre paneles, puertas y capó.',
                'Señales visibles de masilla o repintado en filos.',
                'Ajuste y cierre suave de puertas, capó y baúl.',
                'Corrosión visible en guardabarros y parte inferior.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2 */}
          <section id="vidrios-luces" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Vidrios, espejos y luces
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Revisa visualmente los elementos exteriores que intervienen en la visibilidad y señalización del vehículo.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Estado del parabrisas y sellos de fábrica.',
                'Grietas, piquetes o impactos visibles en vidrios.',
                'Estado y ajuste mecánico de espejos laterales.',
                'Faros delanteros (sin opacidad ni humedad interna).',
                'Luces traseras y direccionales operativas.',
                'Luces de freno, reversa y exploradoras.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 3 */}
          <section id="neumaticos" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Neumáticos y ruedas
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Los neumáticos permiten observar algunas condiciones clave relacionadas con el desgaste de suspensión y el mantenimiento preventivo del vehículo.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Profundidad de la banda de rodamiento (> 1.6 mm).',
                'Desgaste irregular (posible desalineación).',
                'Huevos, grietas o cortes en los costados.',
                'Estado general y rayones en los rines.',
                'Presencia de golpes o deformaciones en pestañas.',
                'Estado y presión de la llanta de repuesto.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4 */}
          <section id="motor" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Motor y fluidos
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              La inspección visual del compartimiento del motor puede ayudar a identificar fugas de aceite o refrigerante antes de avanzar en la negociación.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Fugas visibles de aceite en tapa de válvulas o cárter.',
                'Estado aparente de mangueras, correas y abrazaderas.',
                'Condición y color de depósitos de refrigerante y frenos.',
                'Estado y sulfatación en bornes de la batería.',
                'Ruidos anormales o traqueteos durante el encendido.',
                'Humo azul, blanco o negro visible en el escape.',
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
                <strong>Importante:</strong> una inspección visual no permite determinar por sí sola la compresión ni el estado interno del motor. Los ruidos mecánicos requieren una evaluación técnica especializada.
              </p>
            </div>
          </section>

          {/* 5 */}
          <section id="transmision" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Transmisión y comportamiento mecánico
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Durante la conducción presta atención al tacto de la caja de cambios y a cualquier respuesta anormal de embrague o dirección.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Suavidad y precisión en cambios de marcha.',
                'Punto de corte y dureza del pedal de embrague.',
                'Tirones o retardos en cajas automáticas.',
                'Comportamiento y alineación de la dirección.',
                'Respuesta, firmeza y ausencia de ruidos al frenar.',
                'Comportamiento firme y sin rebotes de la suspensión.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 6 */}
          <section id="interior" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Interior y equipamiento
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              El habitáculo debe formar parte de la revisión. Además del estado estético, verifica el funcionamiento de cada botón y accesorio.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Estado de tapicería de asientos y techo.',
                'Desgaste del volante, pomo de cambios y pedales.',
                'Retracción y anclaje de cinturones de seguridad.',
                'Elevavidrios eléctricos en las 4 puertas.',
                'Seguros eléctricos y cierre centralizado.',
                'Eficiencia del aire acondicionado y calefacción.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 7 */}
          <section id="electrico" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Sistema eléctrico y tablero
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Al colocar el switch en ignición, observa que todos los testigos enciendan y que se apaguen de manera normal tras el arranque.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Testigos de Check Engine, ABS y Airbag.',
                'Indicadores de temperatura y nivel de combustible.',
                'Luces de cortesía interior y mandos de volante.',
                'Funcionamiento del claxon o pito.',
                'Limpiaparabrisas y chisgueteros de agua.',
                'Conectores USB, toma de 12V y pantalla central.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 8 */}
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
              Si las condiciones son seguras y el propietario lo autoriza, conduce el vehículo por diferentes tipos de vía prestando atención a su respuesta.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Arranque en frío y estabilidad en ralentí.',
                'Respuesta de aceleración en subidas y sobrepasos.',
                'Centrado del volante al soltarlo levemente.',
                'Frenado en línea recta sin jaloneos laterales.',
                'Ausencia de golpeteos al pasar por reductores.',
                'Comportamiento térmico durante el recorrido.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 9 */}
          <section id="documentacion" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Documentación y antecedentes
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              La revisión no debe limitarse al estado físico del automóvil. Comprobar la información legal mediante fuentes oficiales previene estafas y bloqueos de traspaso.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Tarjeta de propiedad original (sin tachones).',
                'Vigencia y autenticidad del SOAT en RUNT.',
                'Revisión técnico-mecánica vigente en CDA.',
                'Paz y salvo de impuestos distritales y departamentales.',
                'Inexistencia de multas pendientes en SIMIT.',
                'Certificado de tradición libre de embargos o prendas.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Checklist rápido resumido */}
        <section className="my-12 bg-white rounded-2xl border border-[#CBD5E1] p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <CheckSquare className="w-5 h-5 text-[#123B5D]" />
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Checklist rápido antes de comprar
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#66727D] mb-5">
            Comprueba que hayas completado cada una de las 12 verificaciones clave:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
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
            ].map((item, idx) => (
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
    </main>
  );
}