import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ClipboardCheck,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo revisar un carro usado en Colombia antes de comprarlo | EscaneApp',
  description:
    'Guía paso a paso para realizar una preevaluación de un carro usado en Colombia: documentos, kilometraje, carrocería, motor, interior, prueba de ruta y cuándo solicitar un peritaje profesional.',
  alternates: {
    canonical: '/como-revisar-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar un carro usado en Colombia antes de comprarlo | EscaneApp',
    description:
      'Guía paso a paso para realizar una preevaluación de un carro usado en Colombia: documentos, kilometraje, carrocería, motor, interior, prueba de ruta y peritaje profesional.',
    url: 'https://www.escaneapp.com/como-revisar-carro-usado',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/como-revisar-carro-usado#article',
  headline: 'Cómo revisar un carro usado en Colombia antes de comprarlo',
  description:
    'Guía paso a paso para realizar una preevaluación de un carro usado en Colombia: documentos, kilometraje, carrocería, motor, interior, prueba de ruta y cuándo solicitar un peritaje profesional.',
  url: 'https://www.escaneapp.com/como-revisar-carro-usado',
  image: 'https://www.escaneapp.com/pexels-egeardaphotos-2148533277-36644267.jpg',
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
      name: '¿Cómo revisar un carro usado si no sé de mecánica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Empieza por verificar los documentos, comparar el kilometraje con los registros, observar la carrocería, comprobar los sistemas accesibles y registrar los defectos visibles. No intentes diagnosticar componentes que requieren conocimientos o equipos especializados.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo saber si un carro usado está en buen estado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No existe una comprobación visual que permita garantizarlo. Puedes identificar señales de alerta y contrastar la información disponible, pero la evaluación mecánica, electrónica o estructural puede requerir un profesional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Un kilometraje bajo significa que el carro está mejor conservado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No necesariamente. Debe analizarse junto con el historial de mantenimiento, el uso declarado, el desgaste y los registros disponibles.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El RUNT permite conocer todos los accidentes de un vehículo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No debes asumirlo. La información depende de los registros y servicios disponibles. Si necesitas evaluar posibles daños estructurales, revisa los soportes que existan y considera un peritaje.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué hago si encuentro una posible falla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Registra el síntoma, solicita información sobre el mantenimiento y busca un diagnóstico o una cotización cuando corresponda. Evita atribuir una causa definitiva sin una comprobación técnica.',
      },
    },
    {
      '@type': 'Question',
      name: '¿EscaneApp reemplaza un peritaje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. EscaneApp ayuda a organizar una preevaluación. Un peritaje profesional permite realizar comprobaciones adicionales cuyo alcance depende del servicio contratado.',
      },
    },
  ],
};

const PASOS_GUIA = [
  { id: 'preparacion', num: '0', title: 'Antes de revisar: prepara la inspección' },
  { id: 'paso-1', num: '1', title: 'Verifica la identidad y los documentos' },
  { id: 'paso-2', num: '2', title: 'Comprueba si el kilometraje es coherente' },
  { id: 'paso-3', num: '3', title: 'Examina la carrocería y reparaciones previas' },
  { id: 'paso-4', num: '4', title: 'Revisa el motor y componentes accesibles' },
  { id: 'paso-5', num: '5', title: 'Comprueba el interior y sistemas de seguridad' },
  { id: 'paso-6', num: '6', title: 'Realiza una prueba de ruta segura' },
  { id: 'paso-7', num: '7', title: 'Calcula los gastos antes de negociar' },
  { id: 'paso-8', num: '8', title: 'Decide si necesitas un peritaje profesional' },
  { id: 'paso-9', num: '9', title: 'Organiza los resultados y toma una decisión' },
];

export default function ComoRevisarCarroUsadoPage() {
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
                Cómo revisar un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA METODOLÓGICA PRE-COMPRA · COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            Cómo revisar un carro usado en Colombia antes de comprarlo
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl mb-6">
            Comprar un carro usado requiere algo más que comprobar que encienda y tenga una apariencia cuidada. Un vehículo puede verse bien por fuera y presentar problemas mecánicos, reparaciones anteriores o inconsistencias documentales que cambien por completo la conveniencia de la compra.
          </p>

          {/* Imagen Principal (artppal) */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-[#CBD5E1] shadow-xs">
            <Image
              src="/pexels-egeardaphotos-2148533277-36644267.jpg"
              alt="Inspección y revisión de un carro usado en Colombia antes de comprarlo"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </header>

        {/* Introducción */}
        <section className="mb-8 bg-white border border-[#CBD5E1] p-5 sm:p-6 rounded-2xl shadow-xs text-sm sm:text-base text-[#475569] leading-relaxed space-y-4">
          <p>
            Antes de comprometer tu dinero, conviene seguir un procedimiento ordenado para revisar el vehículo, contrastar la información del vendedor y detectar los aspectos que necesitan una verificación adicional.
          </p>
          <p>
            Esta guía explica cómo realizar una preevaluación de un carro usado en Colombia, incluso si no tienes conocimientos avanzados de mecánica. El objetivo es ayudarte a identificar señales de alerta, documentar los hallazgos y decidir cuándo necesitas una inspección profesional.
          </p>
          <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#E2E8F0] flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#123B5D] shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              Ten presente que una revisión visual no permite confirmar todas las condiciones mecánicas, electrónicas o estructurales del vehículo. Su utilidad consiste en reducir la incertidumbre antes de tomar una decisión.
            </p>
          </div>
        </section>

        {/* Índice interactivo */}
        <nav
          aria-label="Contenido de la guía"
          className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#123B5D]" />
            <h2 className="text-base font-bold text-[#17212B]">
              Contenido de la guía paso a paso
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {PASOS_GUIA.map((paso) => (
              <a
                key={paso.id}
                href={`#${paso.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl text-[#475569] hover:text-[#123B5D] hover:bg-[#F7F9FA] transition-colors"
              >
                <span className="w-5 h-5 rounded-md bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {paso.num}
                </span>
                <span className="font-medium">{paso.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Secciones de contenido */}
        <div className="space-y-10">
          {/* Preparación */}
          <section id="preparacion" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D]/10 text-[#123B5D] text-xs font-bold font-mono flex items-center justify-center shrink-0">
                0
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Antes de revisar el carro: prepara la inspección
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/pexels-mikebird-20475072.jpg"
                alt="Preparación de la inspección de un vehículo usado"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Coordina con el vendedor una visita en un lugar iluminado, donde puedas observar el vehículo con tranquilidad. Si es posible, solicita que el motor esté frío al llegar, para observar el arranque inicial.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Lleva tu teléfono para registrar fotografías, una lista de comprobación y los datos de la publicación.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#123B5D]">
                Durante la inspección, aplica tres reglas fundamentales:
              </h3>
              <ul className="space-y-2.5">
                {[
                  'No interpretes una señal de alerta como un diagnóstico confirmado.',
                  'No asumas que la ausencia de defectos visibles significa que el vehículo está en buen estado.',
                  'No continúes con una prueba o manipulación si existe un riesgo para tu seguridad.',
                ].map((regla, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <span className="w-5 h-5 rounded-full bg-[#123B5D] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{regla}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
              Si el vendedor no permite revisar razonablemente el carro o evita responder preguntas importantes, considera posponer la compra hasta aclarar las dudas.
            </p>
          </section>

          {/* Paso 1 */}
          <section id="paso-1" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Verifica la identidad y los documentos del vehículo
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/pexels-magda-ehlers-pexels-9891042.jpg"
                alt="Verificación de documentos e identidad vehicular"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Empieza por confirmar que el carro que vas a inspeccionar corresponde al anunciado y a la información documental disponible.
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
                Registra los siguientes datos:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Marca, línea, versión y año modelo.',
                  'Placa.',
                  'Tipo de combustible y transmisión.',
                  'Kilometraje indicado en el tablero.',
                  'Número de identificación del vehículo (VIN) o número de chasis, según corresponda.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Compara los datos de la publicación, los documentos y las identificaciones visibles del vehículo. Si encuentras diferencias, solicita una explicación respaldada por documentos.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 space-y-4">
              <h3 className="text-base font-bold text-[#17212B] flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-[#123B5D]" />
                Consulta los antecedentes disponibles
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                En Colombia puedes utilizar fuentes oficiales para comprobar distintos aspectos de la situación del vehículo:
              </p>

              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                  <a
                    href="https://www.runt.gov.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs sm:text-sm text-[#123B5D] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>RUNT — Registro Único Nacional de Tránsito</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-[#66727D] mt-1">
                    Consulta los servicios disponibles para verificar información vehicular y los registros correspondientes.
                  </p>
                </div>

                <div className="p-3 bg-white rounded-lg border border-[#E2E8F0]">
                  <a
                    href="https://www.fcm.org.co/simit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-xs sm:text-sm text-[#123B5D] hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>SIMIT — Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <p className="text-xs text-[#66727D] mt-1">
                    Consulta la información relacionada con multas y comparendos.
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Según el caso, también debes verificar la vigencia del SOAT y de la revisión técnico-mecánica, cuando corresponda, así como las condiciones documentales y las posibles limitaciones que puedan afectar el traspaso.
              </p>

              <p className="text-xs text-[#66727D] leading-relaxed">
                Una consulta no equivale a una certificación completa de los antecedentes del vehículo. No supongas que una búsqueda general revela todos los accidentes, reparaciones, daños estructurales u obligaciones existentes.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                Si hay inconsistencias en los números de identificación o sospechas de alteración, suspende la evaluación hasta obtener una verificación competente.
              </p>
            </div>
          </section>

          {/* Paso 2 */}
          <section id="paso-2" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Comprueba si el kilometraje es coherente
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (8).jpg"
                alt="Comprobación de coherencia en el kilometraje y desgaste de mandos"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              El kilometraje permite conocer parte del uso que ha tenido un carro, pero no determina por sí solo su estado mecánico.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Anota la lectura actual y compárala con las facturas de mantenimiento, órdenes de servicio y otros registros fechados que puedas consultar.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Después, observa el desgaste del volante, los pedales, el asiento del conductor y los controles de uso frecuente. Evalúa si ese desgaste parece coherente con el kilometraje declarado y el historial disponible.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Presta especial atención a estas señales:
              </h3>
              <ul className="space-y-2">
                {[
                  'Una lectura actual inferior a otra documentada anteriormente.',
                  'Registros que presentan diferencias sin explicación.',
                  'Un historial de mantenimiento con vacíos importantes.',
                  'Un desgaste que merece aclaración frente al uso declarado.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-amber-950">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
              Estas observaciones no demuestran por sí solas que el odómetro haya sido alterado. Algunos componentes pueden haberse reemplazado y el desgaste depende de las condiciones de uso y mantenimiento.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-[#123B5D] shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                  Si encuentras inconsistencias, solicita soportes adicionales antes de negociar. Puedes complementar esta revisión con la{' '}
                  <Link href="/kilometraje-carro-usado" className="font-bold text-[#123B5D] hover:underline">
                    guía sobre cómo revisar el kilometraje de un carro usado →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Paso 3 */}
          <section id="paso-3" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Examina la carrocería y las señales de reparaciones anteriores
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/pexels-silverkblack-36729880.jpg"
                alt="Inspección visual de la carrocería, paneles y pintura"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Realiza la inspección exterior con el vehículo limpio y seco, preferiblemente bajo una iluminación que permita distinguir los acabados.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Observa el carro desde distintos ángulos y compara los espacios entre puertas, capó, baúl y guardabarros. Busca diferencias visibles en la alineación de los paneles, el tono de la pintura y el montaje de farolas o molduras.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              También revisa las zonas accesibles del compartimiento del motor, el baúl y los bordes interiores de las puertas. Busca deformaciones, corrosión importante, selladores irregulares o señales de reparación que el vendedor no haya explicado.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 space-y-3">
              <h3 className="text-sm font-bold text-[#17212B]">
                ¿Cómo interpretar lo que encuentres?
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Una diferencia de pintura puede deberse a una reparación estética, al envejecimiento del acabado o al reemplazo de una pieza. No demuestra automáticamente que haya ocurrido un accidente grave.
              </p>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                En cambio, las deformaciones importantes o las señales que podrían afectar la estructura merecen una evaluación especializada.
              </p>
              <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-900 leading-relaxed font-medium">
                No desmontes componentes ni te introduzcas debajo de un vehículo sostenido únicamente por un gato. Si sospechas daños estructurales, solicita un peritaje antes de continuar con la compra.
              </div>
            </div>
          </section>

          {/* Paso 4 */}
          <section id="paso-4" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Revisa el motor y los componentes accesibles
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (4).jpg"
                alt="Revisión del compartimiento del motor y niveles de fluidos"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Con el motor apagado y siguiendo las indicaciones del fabricante, observa si hay fugas visibles, conexiones deterioradas o daños aparentes.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Si sabes hacerlo correctamente, puedes comprobar el nivel de aceite mediante la varilla correspondiente y revisar los depósitos accesibles.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 leading-relaxed font-medium">
              No abras el sistema de refrigeración cuando esté caliente o presurizado y evita tocar correas, ventiladores u otras piezas móviles.
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="text-base font-bold text-[#17212B]">
                Durante el arranque
              </h3>
              <p className="text-sm text-[#475569] leading-relaxed">
                Si las condiciones son seguras, observa cómo enciende el motor, escucha si aparecen ruidos inusuales y comprueba si quedan testigos de advertencia encendidos.
              </p>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
                  Registra cualquier señal que requiera explicación:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Dificultad persistente para arrancar.',
                    'Ruidos metálicos o vibraciones inusuales.',
                    'Fugas visibles.',
                    'Humo persistente o de aspecto anormal.',
                    'Funcionamiento irregular.',
                    'Testigos de advertencia que permanecen encendidos.',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
                Estas señales pueden tener diferentes causas. Por ejemplo, una apariencia inusual del aceite no confirma por sí sola una avería específica, y el color del humo debe interpretarse según las condiciones de funcionamiento y el tipo de motor.
              </p>

              <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
                Pregunta por los registros de mantenimiento y los servicios previstos por el fabricante. Si no hay documentación, considera esa incertidumbre al calcular los gastos posteriores a la compra.
              </p>

              <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 text-xs text-[#475569] leading-relaxed font-semibold">
                No concluyas que el motor está en buen estado solo porque enciende rápidamente o funciona sin ruidos evidentes durante unos minutos.
              </div>
            </div>
          </section>

          {/* Paso 5 */}
          <section id="paso-5" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Comprueba el interior y los sistemas de seguridad
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/pexels-loocmill-16770914.jpg"
                alt="Comprobación de la cabina, asientos y sistemas interiores"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              El interior permite evaluar el desgaste general y comprobar si los elementos incluidos en la venta funcionan correctamente.
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
                Revisa:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Cinturones de seguridad y sus mecanismos.',
                  'Asientos y ajustes.',
                  'Elevavidrios, espejos y seguros.',
                  'Aire acondicionado y ventilación.',
                  'Luces interiores y controles.',
                  'Indicadores y testigos del tablero.',
                  'Sistema de audio y conectividad, cuando corresponda.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Observa también si hay manchas, olores persistentes a humedad o corrosión en zonas interiores. Estos indicios justifican investigar posibles filtraciones de agua, pero no demuestran por sí solos que el carro haya sufrido una inundación.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Registra los elementos que no funcionen y diferencia los defectos de comodidad de los que podrían comprometer la seguridad.
            </p>

            <div className="rounded-xl border border-red-200 bg-red-50 p-4 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
              <p className="text-xs text-red-950 leading-relaxed font-medium">
                Si encuentras un problema en los cinturones, advertencias persistentes de sistemas de seguridad u otras anomalías importantes, solicita una evaluación antes de utilizar el vehículo o cerrar el negocio.
              </p>
            </div>
          </section>

          {/* Paso 6 */}
          <section id="paso-6" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Realiza una prueba de ruta únicamente si es segura
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/pexels-fernando-ortega-2149410884-30598526.jpg"
                alt="Prueba de manejo y dinámica de ruta de carro usado"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Una prueba de conducción puede ayudar a detectar comportamientos que no se manifiestan con el carro estacionado. Debe realizarse únicamente si el vehículo está en condiciones seguras para circular, existe autorización para conducirlo y se cumplen los requisitos aplicables.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 leading-relaxed font-medium">
              Si sospechas una falla en los frenos, la dirección, los neumáticos u otro sistema esencial, no realices la prueba.
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
                En una ruta segura, presta atención a los siguientes aspectos:
              </h3>
              <ul className="space-y-2.5">
                {[
                  {
                    titulo: 'Motor y transmisión',
                    detalle: 'tirones, dificultades de aceleración, ruidos o cambios de marcha irregulares.',
                  },
                  {
                    titulo: 'Dirección',
                    detalle: 'vibraciones, ruidos o respuestas inesperadas.',
                  },
                  {
                    titulo: 'Frenos',
                    detalle: 'ruidos, vibraciones o una respuesta que parezca inconsistente.',
                  },
                  {
                    titulo: 'Suspensión',
                    detalle: 'golpes repetitivos o ruidos inusuales.',
                  },
                  {
                    titulo: 'Temperatura y tablero',
                    detalle: 'advertencias o cambios que requieran detener la marcha.',
                  },
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#17212B]">{item.titulo}:</strong> {item.detalle}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 text-xs text-[#475569] leading-relaxed space-y-2">
              <p>
                <strong>Precaución:</strong> No hagas maniobras bruscas para provocar síntomas ni sueltes el volante para comprobar si el vehículo se desvía.
              </p>
              <p>
                Si detectas algo extraño, anota cuándo ocurre: al arrancar, acelerar, frenar, girar o pasar por una irregularidad del camino. Esa información puede ayudar al profesional que realice el diagnóstico.
              </p>
              <p className="text-[#66727D]">
                Una prueba satisfactoria tampoco descarta fallas internas o electrónicas.
              </p>
            </div>
          </section>

          {/* Paso 7 */}
          <section id="paso-7" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Calcula los gastos antes de negociar
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/pexels-freestockpro-9822745.jpg"
                alt="Cálculo de gastos de mantenimiento y costo total del vehículo"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              El precio de compra no representa el costo total de tener un carro. Antes de decidir, calcula los gastos iniciales y los que podrías asumir durante el periodo de propiedad.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 space-y-3">
                <h3 className="text-sm font-bold text-[#17212B]">
                  Gastos iniciales
                </h3>
                <p className="text-xs text-[#66727D]">Incluye los posibles costos de:</p>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  {[
                    'Mantenimiento preventivo pendiente.',
                    'Neumáticos que necesiten reemplazo.',
                    'Reparaciones identificadas durante la inspección.',
                    'Elementos eléctricos que no funcionen.',
                    'Peritaje y verificaciones adicionales.',
                    'Otros gastos necesarios según el estado del vehículo y los requisitos aplicables.',
                  ].map((gasto, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#123B5D] font-bold">•</span>
                      <span>{gasto}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-[#66727D] pt-2">
                  Solicita cotizaciones cuando una reparación pueda cambiar tu decisión. Si todavía no se conoce la causa de una anomalía, no trates un valor aproximado como un presupuesto definitivo.
                </p>
              </div>

              <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 space-y-3">
                <h3 className="text-sm font-bold text-[#17212B]">
                  Gastos periódicos
                </h3>
                <p className="text-xs text-[#66727D]">Para comparar vehículos, calcula los gastos de un mismo periodo (ej. un año):</p>
                <ul className="space-y-1.5 text-xs text-[#475569]">
                  {[
                    'Combustible.',
                    'SOAT.',
                    'Impuesto vehicular aplicable.',
                    'Revisión técnico-mecánica cuando corresponda.',
                    'Mantenimiento y consumibles.',
                    'Parqueadero, peajes y otros gastos asociados al uso.',
                  ].map((gasto, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#123B5D] font-bold">•</span>
                      <span>{gasto}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[11px] text-[#66727D] pt-2">
                  Utiliza supuestos claros, como los kilómetros que esperas recorrer y los precios de referencia que hayas podido verificar.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#CBD5E1] bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#17212B] block">¿Quieres estimar el presupuesto de mantenimiento en Colombia?</span>
                <span className="text-xs text-[#66727D]">
                  Puedes complementar este cálculo con nuestra guía especializada.
                </span>
              </div>
              <Link
                href="/cuanto-cuesta-mantener-carro-usado-colombia"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B5D] text-white text-xs font-bold hover:bg-[#0d2a42] shrink-0 transition-colors"
              >
                <span>Guía de costo de mantenimiento →</span>
              </Link>
            </div>

            <p className="text-xs text-[#66727D]">
              El resultado será una estimación, no una garantía de los gastos futuros.
            </p>
          </section>

          {/* Paso 8 */}
          <section id="paso-8" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Decide si necesitas un peritaje profesional
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (3).jpg"
                alt="Peritaje profesional automotriz y revisión técnica especializada"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              La preevaluación permite organizar información e identificar señales que requieren atención. No confirma por sí sola el estado interno del motor, la integridad estructural ni el funcionamiento de todos los sistemas electrónicos.
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
                Considera contratar un peritaje cuando encuentres:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Inconsistencias documentales o de identificación.',
                  'Señales importantes de reparaciones estructurales.',
                  'Ruidos o comportamientos mecánicos que no puedas explicar.',
                  'Fugas importantes o posibles problemas de seguridad.',
                  'Advertencias persistentes en el tablero.',
                  'Diferencias relevantes en los registros del kilometraje.',
                  'Dudas cuyo alcance o costo no puedas determinar.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Antes de contratar el servicio, pregunta qué componentes se revisarán, qué pruebas se realizarán y cuáles son las limitaciones del informe.
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 leading-relaxed font-medium">
              Si el vendedor no permite una inspección razonable, presiona para cerrar el negocio o no aporta información suficiente sobre un hallazgo relevante, considera detener la negociación hasta aclarar el riesgo.
            </div>

            <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
              Un resultado favorable en una revisión preliminar o en un peritaje no garantiza que el vehículo esté libre de defectos. La decisión debe considerar tanto los hallazgos conocidos como las incertidumbres pendientes.
            </p>
          </section>

          {/* Paso 9 */}
          <section id="paso-9" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Organiza los resultados y toma una decisión
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-[#CBD5E1]">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (9).jpg"
                alt="Organización de resultados, lista de comprobación y toma de decisiones"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Al terminar la revisión, no te limites a recordar si el carro te pareció bueno o malo. Registra cada observación, conserva las fotografías y anota qué información falta por verificar.
            </p>

            <div>
              <h3 className="text-base font-bold text-[#17212B] mb-3">
                Puedes organizar los resultados en tres grupos:
              </h3>

              <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#123B5D] text-white font-bold">
                    <tr>
                      <th className="py-3 px-4">Clasificación</th>
                      <th className="py-3 px-4">Qué significa</th>
                      <th className="py-3 px-4">Qué hacer</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] bg-white">
                    <tr className="hover:bg-[#F7F9FA]">
                      <td className="py-3.5 px-4 font-bold text-[#2EAD68] whitespace-nowrap">
                        Sin anomalías observadas
                      </td>
                      <td className="py-3.5 px-4 text-[#475569]">
                        No encontraste señales relevantes en los aspectos revisados.
                      </td>
                      <td className="py-3.5 px-4 text-[#475569]">
                        Continúa con las verificaciones documentales y las evaluaciones que correspondan.
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F7F9FA]">
                      <td className="py-3.5 px-4 font-bold text-amber-600 whitespace-nowrap">
                        Requiere aclaración
                      </td>
                      <td className="py-3.5 px-4 text-[#475569]">
                        Encontraste una diferencia, un defecto o información incompleta.
                      </td>
                      <td className="py-3.5 px-4 text-[#475569]">
                        Solicita soportes, cotizaciones o una comprobación adicional.
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F7F9FA]">
                      <td className="py-3.5 px-4 font-bold text-red-600 whitespace-nowrap">
                        Riesgo importante pendiente
                      </td>
                      <td className="py-3.5 px-4 text-[#475569]">
                        Existe una posible afectación documental, estructural o de seguridad.
                      </td>
                      <td className="py-3.5 px-4 text-[#475569]">
                        Suspende la decisión de compra hasta obtener una evaluación competente.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#66727D] mt-2">
                Esta clasificación es una herramienta práctica de organización, no una escala de diagnóstico ni una certificación del vehículo.
              </p>
            </div>

            {/* Checklist */}
            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-[#123B5D]" />
                <h3 className="text-base font-bold text-[#17212B]">
                  Lista de comprobación antes de comprar
                </h3>
              </div>

              <ul className="space-y-2.5">
                {[
                  'Confirmé los datos del vehículo y sus identificaciones.',
                  'Comparé el kilometraje con los registros disponibles.',
                  'Consulté los antecedentes documentales pertinentes.',
                  'Revisé la carrocería y registré posibles reparaciones.',
                  'Observé el motor y los componentes accesibles.',
                  'Comprobé los sistemas interiores y de seguridad.',
                  'Realicé una prueba de ruta solo si era segura y estaba autorizada.',
                  'Estimé los gastos iniciales y periódicos.',
                  'Identifiqué las dudas que requieren un peritaje.',
                  'Verifiqué las condiciones necesarias antes de cerrar el negocio.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                    <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Cómo puede ayudarte EscaneApp */}
        <section className="my-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#123B5D]" />
            <h2 className="text-2xl font-bold text-[#17212B]">
              Cómo puede ayudarte EscaneApp
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            EscaneApp permite organizar una preevaluación de un vehículo usado mediante una inspección física guiada, el registro de observaciones y la estimación de posibles costos de reparación y propiedad.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Puedes utilizar la herramienta para estructurar la información que has reunido y reconocer qué aspectos necesitan una comprobación adicional.
          </p>

          <p className="text-xs sm:text-sm text-[#66727D] leading-relaxed">
            Su resultado debe interpretarse como apoyo para tomar decisiones. No sustituye las consultas oficiales, no certifica el estado del vehículo y no reemplaza un diagnóstico mecánico especializado.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B5D] hover:bg-[#0d2a42] text-white text-sm font-bold transition-colors shadow-xs"
            >
              <span>Iniciar una evaluación preliminar en EscaneApp</span>
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
                q: '¿Cómo revisar un carro usado si no sé de mecánica?',
                a: 'Empieza por verificar los documentos, comparar el kilometraje con los registros, observar la carrocería, comprobar los sistemas accesibles y registrar los defectos visibles. No intentes diagnosticar componentes que requieren conocimientos o equipos especializados.',
              },
              {
                q: '¿Cómo saber si un carro usado está en buen estado?',
                a: 'No existe una comprobación visual que permita garantizarlo. Puedes identificar señales de alerta y contrastar la información disponible, pero la evaluación mecánica, electrónica o estructural puede requerir un profesional.',
              },
              {
                q: '¿Un kilometraje bajo significa que el carro está mejor conservado?',
                a: 'No necesariamente. Debe analizarse junto con el historial de mantenimiento, el uso declarado, el desgaste y los registros disponibles.',
              },
              {
                q: '¿El RUNT permite conocer todos los accidentes de un vehículo?',
                a: 'No debes asumirlo. La información depende de los registros y servicios disponibles. Si necesitas evaluar posibles daños estructurales, revisa los soportes que existan y considera un peritaje.',
              },
              {
                q: '¿Qué hago si encuentro una posible falla?',
                a: 'Registra el síntoma, solicita información sobre el mantenimiento y busca un diagnóstico o una cotización cuando corresponda. Evita atribuir una causa definitiva sin una comprobación técnica.',
              },
              {
                q: '¿EscaneApp reemplaza un peritaje?',
                a: 'No. EscaneApp ayuda a organizar una preevaluación. Un peritaje profesional permite realizar comprobaciones adicionales cuyo alcance depende del servicio contratado.',
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
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-2xl font-bold text-[#17212B]">
            Conclusión
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Revisar un carro usado antes de comprarlo consiste en reunir información, contrastar lo que afirma el vendedor y evaluar los riesgos que pueden afectar la seguridad y el presupuesto.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Una inspección ordenada ayuda a detectar señales de alerta, pero no elimina toda la incertidumbre. La mejor decisión es aquella en la que conoces los defectos identificados, has aclarado las inconsistencias importantes y sabes qué aspectos todavía necesitan una evaluación especializada.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Antes de entregar dinero o firmar la compraventa, verifica los documentos, calcula los gastos previsibles y solicita ayuda profesional cuando los hallazgos superen lo que puedes comprobar por tu cuenta.
          </p>
        </section>

        {/* Fuentes y referencias */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-[#17212B]">
            Fuentes y referencias
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#123B5D] mt-2 shrink-0" />
              <div>
                <a
                  href="https://www.runt.gov.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#123B5D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Registro Único Nacional de Tránsito (RUNT)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[#66727D]">. Portal oficial para consultar los servicios e información vehicular disponibles.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#123B5D] mt-2 shrink-0" />
              <div>
                <a
                  href="https://www.fcm.org.co/simit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#123B5D] hover:underline inline-flex items-center gap-1"
                >
                  <span>Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito (SIMIT)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <span className="text-[#66727D]">. Portal oficial de consulta de multas y comparendos.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Recursos relacionados */}
        <section className="border-t border-[#CBD5E1] pt-10 mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#66727D] block mb-1">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B] mb-6">
            También te puede interesar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/que-revisar-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Qué revisar en un carro usado
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Checklist visual de carrocería, luces, frenos y neumáticos.
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
                Aprende a interpretar el kilometraje y detectar alteraciones.
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
              ¿Ya tienes un carro en mente?
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Realiza una evaluación preliminar y organiza los principales aspectos que debes revisar antes de comprar con el asistente de EscaneApp.
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
          <strong>Aviso de orientación:</strong> La información de esta guía tiene carácter general y orientativo. EscaneApp no sustituye un peritaje, diagnóstico técnico especializado o inspección profesional del vehículo.
        </p>
      </article>
    </div>
  );
}