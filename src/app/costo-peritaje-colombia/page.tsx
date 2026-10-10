import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Wrench,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  ExternalLink,
  HelpCircle,
  FileText,
  DollarSign,
  Car,
  Activity,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '¿Cuánto cuesta un peritaje vehicular en Colombia y qué incluye? | EscaneApp',
  description:
    'Guía de precios de peritaje vehicular en Colombia (octubre 2026): tarifas desde $169.000 COP, diferencias entre básico y completo, componentes revisados y preguntas clave antes de contratar.',
  alternates: {
    canonical: '/costo-peritaje-colombia',
  },
  openGraph: {
    title: '¿Cuánto cuesta un peritaje vehicular en Colombia y qué incluye? | EscaneApp',
    description:
      'Conoce los precios reales del peritaje vehicular en Colombia, qué pruebas incluye cada paquete y cómo elegir el servicio adecuado antes de comprar.',
    url: 'https://www.escaneapp.com/costo-peritaje-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/costo-peritaje-colombia#article',
  headline: '¿Cuánto cuesta un peritaje vehicular en Colombia y qué incluye?',
  description:
    'Guía de precios y alcance del peritaje vehicular en Colombia: comparativa de paquetes básicos y completos, qué pruebas incluye y recomendaciones pre-compra.',
  url: 'https://www.escaneapp.com/costo-peritaje-colombia',
  inLanguage: 'es-CO',
  isPartOf: {
    '@id': 'https://www.escaneapp.com/#webapp',
  },
  publisher: {
    '@type': 'Organization',
    name: 'EscaneApp',
    url: 'https://www.escaneapp.com',
  },
};

export default function CostoPeritajeColombiaPage() {
  return (
    <div className="w-full bg-[#F7F9FA] min-h-screen text-[#17212B]">
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
                Costo de peritaje vehicular
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <Wrench className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA DE COSTOS · PERITAJE VEHICULAR EN COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            ¿Cuánto cuesta un peritaje vehicular en Colombia y qué incluye?
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl mb-4">
            Si estás pensando en comprar un carro usado en Colombia, el peritaje vehicular puede ayudarte a identificar daños, reparaciones anteriores y posibles problemas mecánicos antes de cerrar el negocio. Sin embargo, el precio y el alcance de la revisión dependen del proveedor y del paquete contratado.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            Como referencia, los precios publicados por diferentes proveedores consultados en octubre de 2026 van desde aproximadamente <strong>$169.000 hasta $360.000 COP para varios paquetes de revisión de vehículos livianos</strong>, aunque hay servicios especializados que pueden costar más. La diferencia depende de si el servicio incluye únicamente una inspección visual o agrega escáner electrónico, prueba de compresión, prueba de ruta, consulta de antecedentes y otras comprobaciones.
          </p>

          <p className="text-xs sm:text-sm text-[#66727D] mt-2">
            En esta guía encontrarás cuánto puede costar un peritaje, qué suele incluir y qué debes preguntar antes de contratarlo.
          </p>
        </header>

        {/* 1. ¿Cuánto cuesta un peritaje vehicular en Colombia? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Cuánto cuesta un peritaje vehicular en Colombia?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            No existe una tarifa única para todos los peritajes comerciales. Cada proveedor define sus precios según el tipo de vehículo, el alcance de la inspección, los equipos utilizados y los servicios adicionales.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            Como referencia, los precios publicados por algunos proveedores consultados en octubre de 2026 van desde <strong>$169.000 hasta $360.000 COP para determinados paquetes de peritaje de vehículos livianos</strong>. También existen servicios especializados que superan ese rango. El costo depende del proveedor, el tipo de vehículo y las pruebas incluidas; por eso, estos valores no representan una tarifa nacional ni sustituyen una cotización actualizada.
          </p>

          {/* Tabla de precios referenciales */}
          <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#123B5D] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Proveedor y ubicación</th>
                  <th className="py-3 px-4 font-bold">Servicio publicado</th>
                  <th className="py-3 px-4 font-bold text-right">Precio publicado (COP)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17212B]">CDA Chía Tres Esquinas, Chía</td>
                  <td className="py-3 px-4 text-[#475569]">Combo esencial</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#123B5D]">$169.000</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17212B]">Peritaje de Vehículos, varias ciudades</td>
                  <td className="py-3 px-4 text-[#475569]">Peritaje básico</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#123B5D]">$170.000</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17212B]">Elperito.com, Cali</td>
                  <td className="py-3 px-4 text-[#475569]">Peritaje básico</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#123B5D]">$194.000</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17212B]">Elperito.com, Cali</td>
                  <td className="py-3 px-4 text-[#475569]">Peritaje completo</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#123B5D]">$327.000</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17212B]">CDA Chía Tres Esquinas, Chía</td>
                  <td className="py-3 px-4 text-[#475569]">Combo Expert</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#123B5D]">$360.000</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-semibold text-[#17212B]">Elperito.com, Cali</td>
                  <td className="py-3 px-4 text-[#475569]">Peritaje de alta gama</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-[#123B5D]">$523.000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#66727D] leading-relaxed">
            Fuentes:{' '}
            <a
              href="https://cdachia.com/peritajes.php"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#123B5D] hover:underline font-semibold"
            >
              CDA Chía Tres Esquinas
            </a>
            ,{' '}
            <a
              href="https://peritajedevehiculos.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#123B5D] hover:underline font-semibold"
            >
              Peritaje de Vehículos
            </a>{' '}
            y{' '}
            <a
              href="https://elperito.com/peritaje-cali/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#123B5D] hover:underline font-semibold"
            >
              Elperito.com en Cali
            </a>
            .
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 leading-relaxed font-medium">
            <strong>Importante:</strong> estos valores corresponden a paquetes distintos y no constituyen una comparación de servicios idénticos. Antes de contratar, confirma el precio vigente, los impuestos aplicables, la disponibilidad en tu ciudad y los conceptos incluidos.
          </div>

          {/* ¿Por qué cambia tanto el precio? */}
          <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-[#17212B]">
              ¿Por qué cambia tanto el precio?
            </h3>
            <p className="text-xs sm:text-sm text-[#475569]">
              El costo de un peritaje puede variar por varios factores:
            </p>

            <ul className="space-y-2 text-xs sm:text-sm text-[#475569]">
              {[
                {
                  label: 'Alcance de la revisión',
                  desc: 'una inspección visual no equivale a una evaluación que incluye escáner, compresión del motor y prueba de ruta.',
                },
                {
                  label: 'Tipo de vehículo',
                  desc: 'una camioneta, un vehículo de alta gama o un modelo con sistemas especializados puede requerir más tiempo o equipos.',
                },
                {
                  label: 'Ubicación',
                  desc: 'la disponibilidad de proveedores y los costos operativos varían entre ciudades.',
                },
                {
                  label: 'Servicio a domicilio',
                  desc: 'puede tener condiciones y cargos adicionales según la ubicación.',
                },
                {
                  label: 'Pruebas complementarias',
                  desc: 'la consulta de antecedentes, las improntas, el diagnóstico electrónico y otras comprobaciones pueden cobrarse por separado.',
                },
                {
                  label: 'Informe y soportes',
                  desc: 'verifica si el precio incluye un informe escrito, fotografías y explicación de los hallazgos.',
                },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#17212B]">{item.label}:</strong> {item.desc}
                  </span>
                </li>
              ))}
            </ul>

            <div className="p-3.5 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-xs text-[#17212B] leading-relaxed font-semibold">
              No elijas únicamente por el precio más bajo. Compara qué revisan, qué pruebas realizan y qué evidencia recibes al finalizar.
            </div>
          </div>
        </section>

        {/* 2. ¿Qué incluye un peritaje vehicular? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Qué incluye un peritaje vehicular?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            El contenido depende del paquete contratado. Un peritaje orientado a la compra de un vehículo usado puede abarcar varios de los siguientes componentes:
          </p>

          <div className="space-y-5">
            {/* Componente 1 */}
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-2.5">
              <h3 className="text-base font-bold text-[#17212B]">
                Revisión de carrocería, pintura y estructura
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                El inspector examina el exterior del vehículo para identificar señales de golpes, reparaciones, diferencias en el acabado y posibles daños estructurales.
              </p>
              <p className="text-xs text-[#66727D] font-bold">La revisión puede incluir:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#475569]">
                {[
                  'Estado general de la carrocería.',
                  'Diferencias de color o acabado entre paneles.',
                  'Medición del espesor de pintura (si tienen el equipo).',
                  'Inspección de puntos estructurales accesibles.',
                  'Revisión de uniones, soldaduras y deformaciones visibles.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#123B5D] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#66727D] pt-1 leading-relaxed">
                Esta inspección puede ayudar a detectar indicios de reparaciones anteriores, pero no garantiza encontrar todos los daños ocultos. El resultado también depende de la accesibilidad de las piezas y del alcance contratado.
              </p>
            </div>

            {/* Componente 2 */}
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-2.5">
              <h3 className="text-base font-bold text-[#17212B]">
                Inspección mecánica
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                La revisión mecánica busca señales visibles o perceptibles de deterioro y funcionamiento anormal.
              </p>
              <p className="text-xs text-[#66727D] font-bold">Según el servicio, puede incluir:</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-[#475569]">
                {[
                  'Inspección del motor y búsqueda de fugas.',
                  'Revisión visual de componentes accesibles.',
                  'Evaluación de suspensión y dirección.',
                  'Inspección de frenos y llantas.',
                  'Revisión de elementos del sistema eléctrico.',
                  'Identificación de ruidos o comportamientos anormales.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#123B5D] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-[#66727D] pt-1 leading-relaxed">
                No todos los peritajes incluyen desmontajes, mediciones internas o pruebas profundas. Si necesitas una evaluación específica de una falla, pregunta si está incluida o si requiere un diagnóstico independiente.
              </p>
            </div>

            {/* Componente 3 */}
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-2.5">
              <h3 className="text-base font-bold text-[#17212B]">
                Escáner electrónico
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Algunos paquetes incorporan un escáner que se conecta a los sistemas electrónicos del vehículo para consultar los datos que estos ponen a disposición de la herramienta.
              </p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Según el modelo y el equipo utilizado, puede ayudar a identificar códigos de falla y problemas electrónicos que no son evidentes durante una inspección visual.
              </p>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Sin embargo, un escaneo no garantiza detectar todas las fallas. La interpretación de los códigos requiere criterio técnico, y la ausencia de códigos no demuestra que el vehículo esté libre de problemas.
              </p>
            </div>

            {/* Componente 4 */}
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-2.5">
              <h3 className="text-base font-bold text-[#17212B]">
                Prueba de compresión del motor
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                La prueba de compresión mide la presión generada en los cilindros durante el proceso de compresión, mediante el procedimiento y el equipo adecuados.
              </p>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Puede aportar información sobre el estado mecánico del motor, pero no está incluida en todos los paquetes. Pregunta si se realiza, cómo se documentan los resultados y si el fabricante establece valores de referencia para ese motor.
              </p>
            </div>

            {/* Componente 5 */}
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-2.5">
              <h3 className="text-base font-bold text-[#17212B]">
                Prueba de ruta
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Cuando está incluida y las condiciones permiten realizarla, la prueba de ruta ayuda a observar el comportamiento del vehículo en movimiento. Permite evaluar respuesta de motor y transmisión, comportamiento de dirección, ruidos, vibraciones y respuesta de frenado.
              </p>
              <p className="text-xs text-[#66727D] leading-relaxed">
                La prueba debe realizarse en condiciones seguras y con la autorización correspondiente. No sustituye otras comprobaciones ni permite evaluar todos los componentes en cualquier circunstancia.
              </p>
            </div>

            {/* Componente 6 */}
            <div className="p-5 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-2.5">
              <h3 className="text-base font-bold text-[#17212B]">
                Revisión de antecedentes e identificación
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Algunos proveedores ofrecen consultas documentales o verificaciones complementarias, que pueden incluir información registrada sobre el vehículo, determinados antecedentes, improntas o comprobaciones de identificación.
              </p>
              <p className="text-xs text-[#66727D] leading-relaxed">
                No supongas que estas consultas están incluidas en cualquier peritaje. Confirma qué bases de datos se consultan, qué información entrega cada servicio y si el costo está incorporado en el paquete. Además, una consulta de antecedentes no equivale a una certificación de que el vehículo nunca haya sufrido un accidente o no tenga ninguna situación jurídica pendiente.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Diferencias entre un peritaje básico y uno completo */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Diferencias entre un peritaje básico y uno completo
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Los nombres de los paquetes no están estandarizados entre proveedores. Por eso, conviene comparar las pruebas incluidas y no solo el nombre comercial.
          </p>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            Los términos «básico» y «completo» son nombres comerciales y no garantizan un conjunto uniforme de pruebas. Un paquete básico de un proveedor puede tener un alcance distinto al de otro. Compara las actividades incluidas, los equipos utilizados, las verificaciones documentales y el informe entregado antes de contratar.
          </p>

          {/* Tabla comparativa */}
          <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#123B5D] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Elemento</th>
                  <th className="py-3 px-4 font-bold">Paquete básico, según proveedor</th>
                  <th className="py-3 px-4 font-bold">Paquete completo, según proveedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Carrocería y pintura</td>
                  <td className="py-3 px-4 text-[#475569]">Puede incluirse</td>
                  <td className="py-3 px-4 text-[#2EAD68] font-semibold">Puede incluirse</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Inspección visual de motor y fugas</td>
                  <td className="py-3 px-4 text-[#475569]">Puede incluirse</td>
                  <td className="py-3 px-4 text-[#2EAD68] font-semibold">Puede incluirse</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Suspensión, frenos y llantas</td>
                  <td className="py-3 px-4 text-[#66727D]">Depende del paquete</td>
                  <td className="py-3 px-4 text-[#2EAD68] font-semibold">Puede incluirse</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Escáner electrónico</td>
                  <td className="py-3 px-4 text-amber-700">Puede cobrarse aparte</td>
                  <td className="py-3 px-4 text-[#2EAD68] font-semibold">Puede estar incluido</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Prueba de compresión</td>
                  <td className="py-3 px-4 text-[#66727D]">No siempre incluida</td>
                  <td className="py-3 px-4 text-[#123B5D] font-semibold">Puede estar incluida</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Prueba de ruta</td>
                  <td className="py-3 px-4 text-[#66727D]">No siempre incluida</td>
                  <td className="py-3 px-4 text-[#123B5D] font-semibold">Puede estar incluida</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Consulta de antecedentes</td>
                  <td className="py-3 px-4 text-amber-700">Puede cobrarse aparte</td>
                  <td className="py-3 px-4 text-[#123B5D] font-semibold">Puede estar incluida</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3 px-4 font-bold text-[#17212B]">Informe de resultados</td>
                  <td className="py-3 px-4 text-[#475569]">Confirma si está incluido</td>
                  <td className="py-3 px-4 text-[#123B5D] font-semibold">Confirma el detalle y los soportes</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Por ejemplo, Elperito.com publica en Cali un paquete básico de $194.000 y uno completo de $327.000, con diferencias en las pruebas incluidas. CDA Chía Tres Esquinas publica paquetes de $169.000, $259.000 y $360.000, también con alcances diferentes.
          </p>

          <p className="text-xs text-[#66727D]">
            Consulta las descripciones vigentes de cada proveedor antes de asumir que un paquete incluye una prueba específica.
          </p>
        </section>

        {/* 4. ¿Qué peritaje conviene elegir antes de comprar un carro usado? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Qué peritaje conviene elegir antes de comprar un carro usado?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            La elección depende del vehículo, su historial y las dudas que tengas. No todos los casos necesitan el paquete más costoso, pero una inspección demasiado limitada puede dejar preguntas importantes sin resolver.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-1.5">
              <strong className="text-xs sm:text-sm text-[#17212B] block">
                Si el vehículo parece bien conservado:
              </strong>
              <p className="text-xs text-[#475569] leading-relaxed">
                Compara los paquetes básicos y verifica que incluyan una inspección estructural y mecánica suficientemente detallada.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-1.5">
              <strong className="text-xs sm:text-sm text-[#17212B] block">
                Si el carro tiene varios años o historial incompleto:
              </strong>
              <p className="text-xs text-[#475569] leading-relaxed">
                Considera un paquete que incluya revisión estructural más profunda, escáner y pruebas mecánicas adicionales cuando sean pertinentes.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-1.5">
              <strong className="text-xs sm:text-sm text-[#17212B] block">
                Si sospechas una falla de motor o caja:
              </strong>
              <p className="text-xs text-[#475569] leading-relaxed">
                Pregunta si el peritaje cubre la prueba específica que necesitas. En algunos casos será necesario contratar un diagnóstico especializado.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] space-y-1.5">
              <strong className="text-xs sm:text-sm text-[#17212B] block">
                Si hay dudas sobre accidentes o papeles:
              </strong>
              <p className="text-xs text-[#475569] leading-relaxed">
                Confirma si el proveedor realiza verificaciones documentales, qué fuentes consulta y qué limitaciones tiene el resultado.
              </p>
            </div>
          </div>

          <p className="text-xs text-[#66727D] leading-relaxed">
            Un peritaje completo tampoco garantiza que se detecten todas las fallas presentes o futuras. Su valor está en aportar evidencia adicional para tomar una decisión informada.
          </p>
        </section>

        {/* 5. ¿Quién debe pagar el peritaje: el comprador o el vendedor? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Quién debe pagar el peritaje: el comprador o el vendedor?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            No hay que asumir que el costo siempre corresponde a una misma parte. En la práctica, comprador y vendedor pueden acordar quién lo paga o cómo se distribuye el costo.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            Si eres el comprador, pagar una inspección independiente puede permitirte obtener una evaluación orientada a tus intereses. Antes de contratarla, acuerda con el vendedor el acceso al vehículo, el lugar, la fecha y las pruebas que se realizarán.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            También conviene confirmar que el informe corresponde al vehículo que vas a comprar y que las condiciones de la inspección quedaron documentadas.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-[#CBD5E1] text-xs sm:text-sm text-[#475569] leading-relaxed">
            Si el vendedor no permite realizar comprobaciones razonables, considera ese hecho dentro de la evaluación del riesgo, sin asumir automáticamente que demuestra una irregularidad.
          </div>
        </section>

        {/* 6. Qué preguntar antes de contratar un peritaje */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              6
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Qué preguntar antes de contratar un peritaje
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Antes de pagar, solicita respuestas claras a estas preguntas:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              '¿Qué componentes se inspeccionan?',
              '¿Incluye medición de pintura y revisión estructural?',
              '¿Se utiliza escáner electrónico?',
              '¿Incluye prueba de compresión o prueba de ruta?',
              '¿Se consultan antecedentes? ¿Cuáles y en qué fuentes?',
              '¿Recibiré un informe escrito con fotografías y hallazgos?',
              '¿El precio publicado incluye impuestos y desplazamiento?',
              '¿Cuánto tiempo toma la inspección?',
              '¿Qué pruebas adicionales podrían recomendarse y cuánto cuestan?',
              '¿Puedo recibir una explicación de los resultados antes de decidir?',
            ].map((pregunta, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                <HelpCircle className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" />
                <span>{pregunta}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-xs text-[#17212B] leading-relaxed font-semibold">
            Pide que las respuestas queden claras antes de agendar. Así podrás comparar ofertas por su alcance real y no solo por el valor anunciado.
          </div>
        </section>

        {/* 7. ¿El peritaje garantiza que el carro está en buen estado? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              7
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿El peritaje garantiza que el carro está en buen estado?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            No. Un peritaje es una evaluación realizada bajo unas condiciones y un alcance determinados. Puede identificar señales de desgaste, daños o fallas, pero no garantiza que el vehículo esté libre de defectos ocultos ni que no presente problemas después de la compra.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            El resultado debe interpretarse junto con el mantenimiento documentado, los antecedentes disponibles, una prueba de conducción cuando corresponda y las condiciones de uso del vehículo.
          </p>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            Si el informe identifica una anomalía, solicita una explicación técnica y, cuando sea necesario, una cotización de reparación antes de negociar el precio.
          </div>
        </section>

        {/* 8. ¿Cómo puede ayudarte EscaneApp? */}
        <section className="my-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              8
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Cómo puede ayudarte EscaneApp?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            EscaneApp te ayuda a organizar una evaluación preliminar del vehículo mediante una revisión guiada de distintos puntos de inspección. Puedes utilizarla para registrar observaciones e identificar aspectos que conviene revisar con mayor detalle antes de comprar.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            La herramienta no reemplaza un peritaje profesional, un diagnóstico mecánico especializado ni las consultas documentales correspondientes. Si detectas indicios de daño estructural, fallas mecánicas o inconsistencias relevantes, solicita una evaluación profesional adecuada al problema.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B5D] hover:bg-[#0d2a42] text-white text-sm font-bold transition-colors shadow-xs"
            >
              <span>Iniciar evaluación preliminar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Conclusión */}
        <section className="mb-12 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            Conclusión
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            El costo de un peritaje vehicular depende de las pruebas que necesitas y del alcance del servicio contratado. Antes de elegir, confirma qué componentes se inspeccionan, si incluye escáner y pruebas mecánicas, qué verificaciones documentales realiza y qué informe recibirás.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Un precio más alto no garantiza por sí solo una evaluación mejor. Compara el alcance de los servicios y solicita las comprobaciones que correspondan al vehículo que estás pensando comprar. Así podrás valorar los hallazgos antes de decidir si continúas con la negociación.
          </p>
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
                Decálogo metodológico antes de solicitar un peritaje.
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
                Aprende a interpretar el odómetro y detectar alteraciones.
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
                RUNT, SIMIT y Fasecolda explicados paso a paso.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#123B5D] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Evalúa tu próximo vehículo con EscaneApp
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Organiza la revisión preliminar y detecta señales de alerta antes de contratar el peritaje profesional.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-7 h-12 rounded-xl bg-[#8BCF3F] hover:bg-[#7ab837] text-[#123B5D] text-sm font-extrabold transition-all shadow-sm active:scale-98"
              >
                <span>Iniciar evaluación preliminar</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <p className="text-[11px] text-[#66727D] leading-relaxed text-center sm:text-left">
          <strong>Aviso de orientación:</strong> Los precios y descripciones de servicios citados corresponden a tarifas públicas de referencia vigentes a octubre de 2026. EscaneApp no presta servicios de peritaje comercial ni certifica el estado legal o mecánico de ningún vehículo.
        </p>
      </article>
    </div>
  );
}

