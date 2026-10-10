import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Gauge,
  AlertTriangle,
  ArrowRight,
  Info,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  ClipboardCheck,
  Search,
  FileText,
  Calculator,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo revisar el kilometraje de un carro usado y detectar inconsistencias | EscaneApp',
  description:
    'Aprende a analizar el kilometraje de un carro usado en Colombia: cálculo del promedio anual, comparación con desgaste físico, documentos, escáner OBD2 y checklist de verificación.',
  alternates: {
    canonical: '/kilometraje-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar el kilometraje de un carro usado y detectar inconsistencias | EscaneApp',
    description:
      'Guía práctica para comparar el odómetro con el desgaste real y los documentos antes de comprar un vehículo de segunda mano en Colombia.',
    url: 'https://www.escaneapp.com/kilometraje-carro-usado',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/kilometraje-carro-usado#article',
  headline: 'Cómo revisar el kilometraje de un carro usado y detectar inconsistencias',
  description:
    'Guía práctica para interpretar el kilometraje de un vehículo usado, calcular promedios anuales y detectar inconsistencias antes de comprar en Colombia.',
  url: 'https://www.escaneapp.com/kilometraje-carro-usado',
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

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuántos kilómetros son demasiados para un carro usado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No existe un límite universal que determine por sí solo si un vehículo es una buena o mala compra. La lectura debe interpretarse junto con la antigüedad, el mantenimiento, el tipo de uso y el estado mecánico.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo puedo saber si bajaron el kilometraje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Busca lecturas anteriores verificables y compáralas cronológicamente con el odómetro actual. Un registro previo con una cifra superior es una inconsistencia que requiere aclaración. La apariencia del interior o un escaneo OBD2, por sí solos, no prueban la manipulación.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué pasa si el vendedor no tiene historial de mantenimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La ausencia de documentos no demuestra necesariamente que el vehículo tenga problemas, pero reduce la posibilidad de comprobar su historial. Solicita la evidencia disponible y considera una inspección profesional antes de decidir.',
      },
    },
    {
      '@type': 'Question',
      name: '¿La revisión técnico-mecánica permite conocer el kilometraje anterior?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Algunos certificados o registros pueden incluir una lectura, pero no debes asumir que todos la contienen ni que existe un historial completo y accesible para cada vehículo. Revisa los documentos disponibles y confirma que correspondan al carro que estás evaluando.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Un carro que casi no se ha usado es siempre mejor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. El poco uso no garantiza un buen estado. También deben considerarse la antigüedad, el almacenamiento, el mantenimiento y las posibles consecuencias de permanecer inmovilizado.',
      },
    },
  ],
};

export default function KilometrajeCarroUsadoPage() {
  return (
    <div className="w-full bg-[#F7F9FA] min-h-screen text-[#17212B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData),
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
                Revisión del kilometraje
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <Gauge className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA ESCANEAPP · KILOMETRAJE Y DESGASTE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            Cómo revisar el kilometraje de un carro usado y detectar inconsistencias
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl mb-4">
            El kilometraje es uno de los datos que conviene revisar antes de comprar un carro usado en Colombia. Ayuda a contextualizar el desgaste, los mantenimientos y el uso que ha tenido el vehículo, pero no demuestra por sí solo su estado mecánico ni garantiza que el odómetro conserve la lectura original.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed max-w-3xl">
            Para evaluar un carro de segunda mano, compara el kilometraje que muestra el tablero con los documentos disponibles, el estado de sus componentes y la explicación del vendedor. Una diferencia no siempre significa fraude, pero sí puede justificar comprobaciones adicionales.
          </p>
        </header>

        {/* 1. Calcula el kilometraje anual aproximado */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Calcula el kilometraje anual aproximado
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Una operación sencilla permite calcular un promedio orientativo a partir de la lectura actual y el tiempo transcurrido desde la primera matriculación:
          </p>

          {/* Fórmula destacada */}
          <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#66727D] font-bold block mb-1">
              FÓRMULA DE CÁLCULO ORIENTATIVO
            </span>
            <p className="text-base sm:text-lg font-mono font-extrabold text-[#123B5D]">
              Kilometraje anual aproximado = kilometraje actual ÷ años transcurridos desde la primera matriculación
            </p>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Este cálculo ofrece un promedio orientativo, no un registro del uso real de cada año. Solo resulta útil si se conoce el tiempo transcurrido y se asume que la lectura actual del odómetro es correcta. Los periodos sin uso, los cambios en los hábitos de conducción y una posible alteración del odómetro pueden limitar su interpretación.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-[#E2E8F0] text-xs sm:text-sm text-[#475569] leading-relaxed">
            <strong>Ejemplo:</strong> si un vehículo registra 60.000 km y han transcurrido cinco años desde su primera matriculación, el resultado aritmético es de 12.000 km por año. Esto no demuestra que haya recorrido esa distancia en cada año ni que la lectura sea auténtica.
          </div>

          <div className="space-y-4 pt-3 border-t border-[#E2E8F0]">
            <h3 className="text-base sm:text-lg font-bold text-[#17212B]">
              ¿Existe un promedio anual para todos los carros particulares en Colombia?
            </h3>

            <p className="text-sm text-[#475569] leading-relaxed">
              No conviene aplicar una única cifra como referencia universal. Los recorridos dependen del tipo de uso, la ciudad o región, los trayectos, los hábitos del propietario y las características del vehículo.
            </p>

            <p className="text-xs text-[#66727D]">
              Algunas fuentes pueden ayudar a contextualizar el análisis, pero tienen limitaciones:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 bg-[#F7F9FA] rounded-xl border border-[#E2E8F0]">
                <a
                  href="https://bdigital.upme.gov.co/bitstream/001/991/1/Informe%20final.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs sm:text-sm text-[#123B5D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Caracterización energética del transporte carretero de la UPME</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                  Contiene estimaciones históricas de recorridos según categorías y combustibles. Por su antigüedad, no debe presentarse como un promedio actual garantizado.
                </p>
              </div>

              <div className="p-3.5 bg-[#F7F9FA] rounded-xl border border-[#E2E8F0]">
                <a
                  href="https://www.metropol.gov.co/ambiental/calidad-del-aire/Documents/InformeIntegrado_FuentesMovilesFijas_UrbanoRural_2022.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs sm:text-sm text-[#123B5D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Informe técnico del Área Metropolitana del Valle de Aburrá sobre fuentes móviles y calidad del aire</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                  Presenta estimaciones asociadas a su ámbito regional y a distintas categorías. No es correcto extrapolarlas automáticamente a todos los automóviles del país.
                </p>
              </div>

              <div className="p-3.5 bg-[#F7F9FA] rounded-xl border border-[#E2E8F0]">
                <a
                  href="https://onl.dnp.gov.co/oli/ENL/ENL%202024%20-%20Informe.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-xs sm:text-sm text-[#123B5D] hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Encuesta Nacional Logística 2024 del DNP</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-[#475569] mt-1 leading-relaxed">
                  Aporta información sobre vehículos relacionados con actividades económicas y logísticas, pero ese segmento no representa necesariamente el uso de un carro particular familiar.
                </p>
              </div>
            </div>

            <p className="text-xs text-[#66727D] leading-relaxed">
              Estas fuentes no permiten establecer, por sí solas, una cifra única y vigente para determinar si el kilometraje de cualquier automóvil particular colombiano es normal o sospechoso.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 flex items-start gap-3">
              <Info className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#17212B] leading-relaxed">
                <strong>Qué debes hacer:</strong> utiliza el promedio anual solo como contexto. Para evaluar un vehículo específico, prioriza la secuencia de lecturas documentadas y su coherencia con el desgaste, el mantenimiento y el uso declarado.
              </p>
            </div>
          </div>
        </section>

        {/* 2. Compara el kilometraje con el desgaste visible */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Compara el kilometraje con el desgaste visible
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            El desgaste puede aportar indicios sobre el uso, pero no existe una correspondencia exacta entre una cantidad de kilómetros y el estado de cada pieza. Influyen la calidad de los materiales, el mantenimiento, el clima, los hábitos de conducción y las condiciones de uso.
          </p>

          <p className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
            Revisa estos elementos:
          </p>

          {/* Tabla de componentes */}
          <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#123B5D] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Componente</th>
                  <th className="py-3 px-4 font-bold">Qué observar</th>
                  <th className="py-3 px-4 font-bold">Cómo interpretarlo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">Volante</td>
                  <td className="py-3.5 px-4 text-[#475569]">Superficie pulida, pérdida del recubrimiento o desgaste irregular</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Puede ser compatible con uso frecuente, pero también depende del material y del cuidado.</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">Pedales</td>
                  <td className="py-3.5 px-4 text-[#475569]">Gomas lisas, desgaste pronunciado o diferencias entre pedales</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Contrasta su estado con el kilometraje declarado y el tipo de uso.</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">Asiento del conductor</td>
                  <td className="py-3.5 px-4 text-[#475569]">Hundimiento, costuras deterioradas o espuma deformada</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Puede reflejar uso frecuente, aunque también influye la edad y el peso de los ocupantes.</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">Botones y mandos</td>
                  <td className="py-3.5 px-4 text-[#475569]">Símbolos borrados, superficies desgastadas o piezas reemplazadas</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Interprétalos junto con el resto de la cabina.</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">Tapicería y cinturones</td>
                  <td className="py-3.5 px-4 text-[#475569]">Roturas, manchas, decoloración o desgaste</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Pueden deberse al uso, al envejecimiento, al almacenamiento o a reparaciones.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            No concluyas que el odómetro está alterado porque un volante o unos pedales se vean muy desgastados. Tampoco descartes un vehículo porque tenga el interior bien conservado. Lo importante es identificar si el conjunto de señales resulta razonablemente coherente con la información disponible.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-950 leading-relaxed">
              Por ejemplo, un carro anunciado con kilometraje bajo y desgaste marcado en varios componentes merece preguntas adicionales. El desgaste, por sí solo, no demuestra manipulación.
            </p>
          </div>
        </section>

        {/* 3. Revisa los documentos y las lecturas anteriores */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Revisa los documentos y las lecturas anteriores
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            El dato más útil para evaluar la coherencia del odómetro suele ser una secuencia de lecturas verificables a lo largo del tiempo.
          </p>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
              Busca, cuando estén disponibles:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                'Facturas y órdenes de servicio de talleres.',
                'Registros de cambios de aceite y mantenimiento periódico.',
                'Documentos de inspecciones anteriores.',
                'Certificados o registros anteriores de la revisión técnico-mecánica.',
                'Registros de mantenimiento del concesionario o del fabricante.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Los certificados o registros anteriores de la revisión técnico-mecánica pueden aportar información útil cuando incluyen la lectura del kilometraje. Compara esos datos con el odómetro actual y verifica que los documentos correspondan al mismo vehículo. La disponibilidad de registros y la información que contienen pueden variar, por lo que no debe suponerse que existe un historial completo para todos los carros.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            Ordena las lecturas por fecha y revisa si la secuencia tiene sentido. Si un documento anterior registra más kilómetros que el tablero actual, solicita una explicación y evidencia que permita aclarar la diferencia. Puede haber errores documentales o circunstancias que requieran investigación; no atribuyas automáticamente la discrepancia a un fraude sin comprobarla.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            También puedes consultar la información pertinente a través de los canales oficiales, según el trámite y los datos disponibles. El RUNT permite realizar consultas relacionadas con la información registrada del vehículo, mientras que el SIMIT se enfoca en comparendos y multas. No asumas que estas consultas proporcionan un historial completo del kilometraje.
          </p>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            La consulta del historial de siniestros de vehículos asegurados de Fasecolda tiene un alcance específico: la ausencia de un reporte no demuestra que un vehículo nunca haya sufrido un accidente. Esta consulta tampoco sustituye la revisión del kilometraje.
          </p>
        </section>

        {/* 4. Contrasta lo que dice el vendedor con la evidencia */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Contrasta lo que dice el vendedor con la evidencia
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            El vendedor puede explicar que el carro se usó principalmente los fines de semana, que permaneció guardado durante un tiempo o que recorrió trayectos cortos. Esas explicaciones son posibles, pero no se pueden confirmar solo con una conversación.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            Si no hay facturas, registros o etiquetas de mantenimiento, pregunta si existen otros documentos que permitan reconstruir el historial. La ausencia de una etiqueta o de un registro aislado no demuestra una irregularidad; la falta de evidencia simplemente limita lo que puedes verificar.
          </p>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Presta especial atención a estas situaciones:
            </h3>
            <ul className="space-y-2.5">
              {[
                'La lectura actual es inferior a una lectura anterior documentada.',
                'Los documentos parecen corresponder a otro vehículo o contienen datos inconsistentes.',
                'El desgaste de varios componentes no parece concordar con el uso declarado.',
                'El vendedor no puede explicar discrepancias importantes o impide realizar comprobaciones razonables.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[#66727D] leading-relaxed font-semibold">
            Evalúa el conjunto de evidencias. Una señal aislada no equivale a una conclusión.
          </p>
        </section>

        {/* 5. ¿Un carro con poco kilometraje está necesariamente en mejor estado? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Un carro con poco kilometraje está necesariamente en mejor estado?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            No. Un kilometraje bajo puede ser favorable, pero no garantiza que el vehículo haya recibido mantenimiento adecuado o que esté libre de fallas.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            Un carro que ha permanecido inmovilizado durante periodos prolongados puede presentar problemas relacionados con el envejecimiento, el almacenamiento o la falta de uso. Según sus condiciones y el tiempo transcurrido, conviene revisar mangueras, sellos, neumáticos, batería, fluidos y sistema de combustible.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            En cambio, un vehículo con más kilómetros puede encontrarse en buenas condiciones si recibió mantenimiento adecuado y se utilizó correctamente. Por eso, el kilometraje debe analizarse junto con la antigüedad, los registros de servicio, el estado mecánico y las condiciones generales.
          </p>
        </section>

        {/* 6. ¿Puede un escáner OBD2 confirmar el kilometraje real? */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              6
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              ¿Puede un escáner OBD2 confirmar el kilometraje real?
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            No necesariamente. Un escáner de diagnóstico puede ayudar a identificar códigos de falla y, dependiendo del vehículo, consultar determinados datos almacenados en sus módulos electrónicos. Sin embargo, no todos los vehículos exponen una lectura de kilometraje comparable ni un escaneo convencional permite demostrar por sí solo que el odómetro nunca fue alterado.
          </p>

          <p className="text-sm text-[#475569] leading-relaxed">
            La información disponible depende del modelo, los módulos electrónicos y la herramienta utilizada. Si existen indicios de manipulación, solicita una evaluación a un profesional con experiencia en diagnóstico electrónico y en la marca del vehículo.
          </p>

          <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 text-xs sm:text-sm text-[#17212B] leading-relaxed font-semibold">
            El escaneo debe complementar, no reemplazar, la revisión documental y física.
          </div>
        </section>

        {/* 7. Qué hacer si sospechas una inconsistencia */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              7
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Qué hacer si sospechas una inconsistencia
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Sigue estos pasos antes de tomar una decisión:
          </p>

          <div className="space-y-3">
            {[
              {
                num: '1',
                title: 'Registra la lectura actual.',
                desc: 'Anota el kilometraje que aparece en el tablero y, si es pertinente, toma una fotografía.',
              },
              {
                num: '2',
                title: 'Reúne los documentos disponibles.',
                desc: 'Organiza las facturas, órdenes de servicio e inspecciones por fecha.',
              },
              {
                num: '3',
                title: 'Compara las lecturas.',
                desc: 'Busca saltos, retrocesos o datos que no correspondan al mismo vehículo.',
              },
              {
                num: '4',
                title: 'Solicita una explicación documentada.',
                desc: 'Pregunta al vendedor por cualquier diferencia relevante y pide los soportes que tenga disponibles.',
              },
              {
                num: '5',
                title: 'Considera una evaluación especializada.',
                desc: 'Si la inconsistencia persiste, solicita una revisión mecánica o electrónica antes de comprometerte con la compra.',
              },
            ].map((paso, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA] flex items-start gap-3">
                <span className="w-6 h-6 rounded-md bg-[#123B5D] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {paso.num}
                </span>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <strong className="text-[#17212B]">{paso.title}</strong>{' '}
                  <span className="text-[#475569]">{paso.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Si encuentras una inconsistencia relevante que no puedes aclarar, lo más prudente es aplazar la compra hasta obtener una explicación documentada o una evaluación especializada. Si el vendedor no facilita las comprobaciones necesarias, considera desistir de la negociación.
          </p>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            La decisión depende de la importancia de la discrepancia, la evidencia disponible y el riesgo que estés dispuesto a asumir. No tienes que concluir que existe fraude para decidir que la información es insuficiente para comprar con confianza.
          </p>
        </section>

        {/* 8. Lista de verificación antes de comprar */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              8
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Lista de verificación antes de comprar
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Antes de cerrar la negociación, comprueba lo siguiente:
          </p>

          <ul className="space-y-2.5">
            {[
              'La lectura del tablero quedó registrada.',
              'Revisé los documentos de mantenimiento disponibles.',
              'Comparé las lecturas anteriores, cuando existen.',
              'Verifiqué que los documentos corresponden al mismo vehículo.',
              'Comparé el kilometraje con el desgaste general, sin basarme en una sola pieza.',
              'Consulté la información pertinente en los canales oficiales.',
              'Pedí aclaraciones sobre las inconsistencias encontradas.',
              'Consideré una inspección profesional si quedaron dudas importantes.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-xs text-[#66727D] leading-relaxed">
            Esta lista no certifica el kilometraje real ni reemplaza una inspección especializada. Su objetivo es ayudarte a organizar las comprobaciones y reconocer cuándo necesitas más evidencia.
          </div>
        </section>

        {/* ¿Cómo puede ayudarte EscaneApp? */}
        <section className="my-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            ¿Cómo puede ayudarte EscaneApp?
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            EscaneApp está orientada a guiar una evaluación preliminar de un carro usado mediante una revisión estructurada de distintos aspectos del vehículo. Puedes utilizar ese tipo de evaluación para organizar observaciones y reconocer puntos que requieren atención.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            La evaluación preliminar no certifica el kilometraje real, no demuestra por sí sola una manipulación del odómetro ni sustituye las verificaciones documentales y técnicas. Si identificas una discrepancia importante, complementa la revisión con los registros disponibles y el criterio de un profesional.
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

        {/* Preguntas frecuentes */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#123B5D]" />
            <h2 className="text-2xl font-bold text-[#17212B]">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Cuántos kilómetros son demasiados para un carro usado?',
                a: 'No existe un límite universal que determine por sí solo si un vehículo es una buena o mala compra. La lectura debe interpretarse junto con la antigüedad, el mantenimiento, el tipo de uso y el estado mecánico.',
              },
              {
                q: '¿Cómo puedo saber si bajaron el kilometraje?',
                a: 'Busca lecturas anteriores verificables y compáralas cronológicamente con el odómetro actual. Un registro previo con una cifra superior es una inconsistencia que requiere aclaración. La apariencia del interior o un escaneo OBD2, por sí solos, no prueban la manipulación.',
              },
              {
                q: '¿Qué pasa si el vendedor no tiene historial de mantenimiento?',
                a: 'La ausencia de documentos no demuestra necesariamente que el vehículo tenga problemas, pero reduce la posibilidad de comprobar su historial. Solicita la evidencia disponible y considera una inspección profesional antes de decidir.',
              },
              {
                q: '¿La revisión técnico-mecánica permite conocer el kilometraje anterior?',
                a: 'Algunos certificados o registros pueden incluir una lectura, pero no debes asumir que todos la contienen ni que existe un historial completo y accesible para cada vehículo. Revisa los documentos disponibles y confirma que correspondan al carro que estás evaluando.',
              },
              {
                q: '¿Un carro que casi no se ha usado es siempre mejor?',
                a: 'No. El poco uso no garantiza un buen estado. También deben considerarse la antigüedad, el almacenamiento, el mantenimiento y las posibles consecuencias de permanecer inmovilizado.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7F9FA]">
                <h3 className="font-bold text-sm sm:text-base text-[#17212B] mb-2">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusión */}
        <section className="mb-12 bg-white border border-[#CBD5E1] p-6 sm:p-7 rounded-2xl shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            Conclusión
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Revisar el kilometraje de un carro usado implica más que leer el número del tablero. Compara las lecturas documentadas, observa el desgaste de forma contextual, solicita aclaraciones y utiliza herramientas de diagnóstico cuando sean pertinentes.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            No necesitas demostrar que hubo manipulación para reconocer que faltan pruebas suficientes. Si una inconsistencia relevante sigue sin resolverse, aplaza la decisión o considera otra opción.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Antes de comprar, revisa el vehículo de forma integral y busca evidencia que respalde la información que te entregan.
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
              href="/costo-peritaje-colombia"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Cuánto cuesta un peritaje
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Tarifas de peritaje en Colombia, qué incluye cada paquete y preguntas clave.
              </p>
            </Link>

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
              href="/cuanto-cuesta-mantener-carro-usado-colombia"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Calculadora de costos
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Estima gastos reales anuales de combustible y mantenimiento.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#123B5D] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Evalúa el vehículo de forma estructurada
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Registra el kilometraje y continúa con los demás puntos de la revisión preliminar con el asistente inteligente de EscaneApp.
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
          <strong>Aviso de orientación:</strong> La información de esta guía es general y orientativa. El kilometraje no permite determinar por sí solo el estado mecánico de un vehículo y no sustituye una inspección profesional.
        </p>
      </article>
    </div>
  );
}