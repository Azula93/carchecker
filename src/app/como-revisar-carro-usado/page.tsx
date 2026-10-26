import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  ClipboardCheck,
  AlertCircle,
  FileCheck,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo revisar un carro usado en Colombia antes de comprarlo (Guía fácil)',
  description:
    'Guía sencilla paso a paso para revisar un carro usado en Colombia sin ser mecánico: documentos, kilometraje real, motor, carrocería, prueba de manejo y peritaje.',
  alternates: {
    canonical: '/como-revisar-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar un carro usado en Colombia antes de comprarlo (Guía fácil)',
    description:
      'Guía paso a paso en lenguaje claro para revisar un carro usado en Colombia: documentos, kilometraje, motor, carrocería, prueba de manejo y peritaje.',
    url: 'https://www.escaneapp.com/como-revisar-carro-usado',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/pexels-egeardaphotos-2148533277-36644267.jpg',
        width: 1200,
        height: 630,
        alt: 'Inspección y revisión de un carro usado en Colombia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cómo revisar un carro usado en Colombia antes de comprarlo',
    description:
      'Guía práctica y en lenguaje sencillo para revisar un carro usado en Colombia antes de dar dinero.',
    images: ['/pexels-egeardaphotos-2148533277-36644267.jpg'],
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
  datePublished: '2025-01-10T08:00:00+00:00',
  dateModified: '2026-10-25T12:00:00+00:00',
  author: [
    {
      '@type': 'Organization',
      name: 'Equipo Editorial EscaneApp',
      url: 'https://www.escaneapp.com',
    },
  ],
  isPartOf: {
    '@id': 'https://www.escaneapp.com/#webapp',
  },
  publisher: {
    '@type': 'Organization',
    name: 'EscaneApp',
    url: 'https://www.escaneapp.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.escaneapp.com/01_logo_horizontal_principal.png',
    },
  },
};

const breadcrumbStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
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
      name: 'Cómo revisar un carro usado',
      item: 'https://www.escaneapp.com/como-revisar-carro-usado',
    },
  ],
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
        text: 'Empieza por lo básico que cualquiera puede ver: revisa papeles oficiales en RUNT y SIMIT, compara el kilometraje con el desgaste de los pedales y timón, mira que las líneas de las puertas sean parejas y pruébalo con calma. Si algo te causa desconfianza, pide un peritaje profesional.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo saber si un carro usado está en buen estado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ninguna revisión solo con los ojos puede garantizarlo al 100%. Lo que sí puedes hacer es descartar carros con problemas evidentes, choques mal arreglados o trampas en el kilometraje, y luego llevar el carro elegido a un peritaje mecánico calificado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Un kilometraje bajo significa que el carro está como nuevo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No necesariamente. En Colombia se alteran muchos tableros para mostrar menos kilómetros. Siempre debes comparar el número del odómetro con las facturas de cambio de aceite, el estado del timón y los registros en el RUNT.',
      },
    },
    {
      '@type': 'Question',
      name: '¿El RUNT muestra todos los accidentes de un vehículo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No todos. El RUNT muestra el historial oficial de propietarios, SOAT y tecnomecánica. Para saber si tuvo siniestros con aseguradoras se consulta Fasecolda, y si fue un golpe arreglado por fuera de aseguradoras, solo se detecta revisando la lámina y el chasis en peritaje.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué hago si encuentro un detalle o posible falla?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Anótalo y tómale foto. Pregúntale al vendedor si sabe de qué se trata y calcula cuánto costaría arreglarlo en un taller. Ese valor te servirá para negociar un descuento en el precio o para decidir no comprarlo si es algo muy grave.',
      },
    },
    {
      '@type': 'Question',
      name: '¿EscaneApp reemplaza llevar el carro a un peritaje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. EscaneApp te ayuda a hacer el primer filtro tú mismo para que no gastes $250.000 o $400.000 de peritaje en carros que tienen problemas obvios. Una vez encuentres el carro que pasa tu filtro, un peritaje profesional te da el respaldo final.',
      },
    },
  ],
};

const PASOS_GUIA = [
  { id: 'paso-1', num: '1', title: 'Antes de salir de casa: prepara tu visita' },
  { id: 'paso-2', num: '2', title: 'Papeles e identidad: RUNT, SIMIT y multas' },
  { id: 'paso-3', num: '3', title: 'Kilometraje real: ¿coincide con el uso del carro?' },
  { id: 'paso-4', num: '4', title: 'Carrocería y pintura: detecta choques pasados' },
  { id: 'paso-5', num: '5', title: 'Motor y fluidos: lo que puedes ver sin ensuciarte' },
  { id: 'paso-6', num: '6', title: 'Cabina interior: botones, aire y seguridad' },
  { id: 'paso-7', num: '7', title: 'Prueba de manejo: ruidos, frenos y cambios' },
  { id: 'paso-8', num: '8', title: 'Calcula los gastos ocultos antes de negociar' },
  { id: 'paso-9', num: '9', title: '¿Cuándo vale la pena pagar un peritaje profesional?' },
  { id: 'paso-10', num: '10', title: 'Lista final y cómo tomar la mejor decisión' },
];

export default function ComoRevisarCarroUsadoPage() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-slate-800">
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-14">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
            <li>
              <Link href="/" className="hover:text-slate-900 transition-colors font-medium">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              /
            </li>
            <li>
              <span className="text-slate-900 font-bold">
                Guía: Cómo revisar un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado Principal */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-900 border border-slate-200/90 font-mono font-semibold text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUÍA PRE-COMPRA · COLOMBIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            Cómo revisar un carro usado en Colombia antes de comprarlo
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            Comprar un carro usado no tiene por qué ser una lotería. Aunque no sepas de mecánica, puedes aprender a identificar si un vehículo está bien cuidado, si tiene multas ocultas o si ha sufrido choques graves antes de arriesgar tus ahorros.
          </p>

          {/* Imagen Principal */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
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
        <section className="mb-8 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-xs text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
          <p>
            Un carro recién lavado y brillado puede verse impecable a primera vista, pero esconder fugas de aceite costosas, un kilometraje adulterado o embargos legales que te impedirán hacer el traspaso.
          </p>
          <p>
            Esta guía fue escrita en un lenguaje simple y directo para personas comunes y corrientes. Te enseñará a hacer un filtro inicial paso a paso con tu teléfono y tus propios ojos, para que solo gastes tiempo y dinero en peritaje con carros que de verdad valgan la pena.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong>Regla de oro:</strong> Una revisión visual te permite descartar malos negocios y negociar un mejor precio, pero si decides comprar el carro, hazle siempre un peritaje profesional en un centro autorizado antes de transferir dinero.
            </p>
          </div>
        </section>

        {/* Índice interactivo de pasos */}
        <nav
          aria-label="Contenido de la guía"
          className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-slate-900" />
            <h2 className="text-base font-bold text-slate-900">
              Paso a paso para revisar el carro
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {PASOS_GUIA.map((paso) => (
              <a
                key={paso.id}
                href={`#${paso.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <span className="w-5 h-5 rounded-md bg-[#0F172A] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {paso.num}
                </span>
                <span className="font-medium">{paso.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Secciones de contenido */}
        <div className="space-y-10">
          {/* Paso 1 */}
          <section id="paso-1" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Antes de salir de casa: prepara tu visita
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/pexels-mikebird-20475072.jpg"
                alt="Preparación de la inspección de un vehículo usado"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              La hora y el lugar de la cita son decisivos. Nunca vayas a ver un carro de noche, lloviendo o en un parqueadero subterráneo con poca luz, porque las sombras ocultan abolladuras, diferencias de color en la pintura y manchas de fluidos.
            </p>

            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Recomendaciones clave para coordinar la cita:
              </h3>
              <ul className="space-y-2.5">
                {[
                  'Cita de día y en un lugar público y seguro (por ejemplo, el parqueadero iluminado de un centro comercial).',
                  'Pide al vendedor que el motor esté completamente frío al llegar (un motor caliente oculta ruidos de encendido y humo inicial).',
                  'Lleva tu celular bien cargado para tomar fotos de detalles, números de serie y posibles golpes.',
                  'Ve acompañado de otra persona; cuatro ojos ven más que dos y te ayudan a mantener la cabeza fría.',
                ].map((regla, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-[#0F172A] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{regla}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Si el vendedor te pone trabas para verte a la luz del día, se niega a que abras el capó o te insiste con afán de que «hay otro comprador interesado esperando», no te apresures: es una táctica clásica de presión comercial.
            </p>
          </section>

          {/* Paso 2 */}
          <section id="paso-2" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Papeles e identidad: RUNT, SIMIT y multas
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/pexels-magda-ehlers-pexels-9891042.jpg"
                alt="Verificación de documentos e identidad vehicular"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              De nada sirve que el carro esté hermoso mecánicamente si legalmente no lo puedes poner a tu nombre. En Colombia, antes de revisar la primera tuerca, debes confirmar que el carro no tenga impedimentos de traspaso.
            </p>

            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 mb-3">
                Datos básicos para pedir y comprobar:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Tarjeta de propiedad original (física o digital oficial).',
                  'Placa del carro y número de documento del propietario.',
                  'Número de chasis / VIN (debe coincidir con la placa metálica del motor).',
                  'Vigencia del SOAT y de la Revisión Técnico-Mecánica.',
                  '¿El vendedor es el dueño registrado o es un intermediario?',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Portales de consulta oficial */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-slate-900" />
                Las tres consultas indispensables en Colombia
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Puedes hacer estas consultas desde tu celular en 5 minutos con la placa y la cédula del propietario:
              </p>

              <div className="space-y-3">
                <div className="p-4 bg-white rounded-xl border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <a
                    href="https://www.runt.gov.co/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>1. RUNT (Registro Único Nacional de Tránsito)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Te muestra si el vehículo está activo, cuántos dueños ha tenido, si tiene prendas o embargos bancarios y las fechas de su SOAT y tecnomecánica. También puedes solicitar un <strong>Histórico Vehicular RUNT</strong> si quieres ver el historial completo de revisiones.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <a
                    href="https://www.fcm.org.co/simit/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>2. SIMIT (Multas y Comparendos)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Consulta la placa del carro y la cédula del dueño. Si tiene fotomultas o comparendos pendientes de pago, el tránsito <strong>no autorizará el traspaso</strong> hasta que estén en paz y salvo o con acuerdo de pago vigente.
                  </p>
                </div>

                <div className="p-4 bg-white rounded-xl border border-slate-200/90 space-y-1.5 shadow-2xs">
                  <a
                    href="https://www.fasecolda.com/ramos/automoviles/historial-de-accidentes-de-vehiculos-asegurados/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>3. Fasecolda (Historial de siniestros)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                  </a>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Informa si el carro tuvo choques graves declarados a aseguradoras como pérdida de mayor cuantía. Ten en cuenta que si el choque fue arreglado por fuera de un seguro, no saldrá en Fasecolda (por eso siempre se debe revisar la lámina).
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950 leading-relaxed font-medium">
                <strong>Alerta:</strong> Jamás entregues dinero de seña o adelanto basándote en fotos de WhatsApp. Verifica tú mismo en las páginas oficiales gubernamentales.
              </div>
            </div>
          </section>

          {/* Paso 3 */}
          <section id="paso-3" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Kilometraje real: ¿coincide con el uso del carro?
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (8).jpg"
                alt="Comprobación de coherencia en el kilometraje y desgaste de mandos"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              En Colombia, alterar el odómetro («bajarle el kilometraje») es una mala práctica común para cobrar más por un carro viejo. Un promedio normal de uso en ciudades colombianas es de <strong>12.000 a 18.000 kilómetros por año</strong>.
            </p>

            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Pistas visuales para detectar si el kilometraje fue bajado:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Pedal de freno y embrague:</strong> Si la goma está totalmente lisa o comida hasta el metal, pero el tablero marca solo 40.000 km, no cuadra.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Timón y palanca de cambios:</strong> El cuero o plástico pelado y brillante indica un uso superior a los 100.000 km.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-700 font-bold">•</span>
                  <span><strong>Stickers de cambio de aceite:</strong> Revisa el marco de la puerta del conductor o el borde del parabrisas. A veces los vendedores olvidan retirar la etiqueta del taller donde figura el kilometraje real anterior.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-slate-800 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  ¿Quieres aprender trucos específicos para auditar el odómetro? Lee nuestra{' '}
                  <Link href="/kilometraje-carro-usado" className="font-bold text-slate-900 underline hover:text-emerald-700">
                    guía completa sobre cómo auditar el kilometraje →
                  </Link>
                </p>
              </div>
            </div>
          </section>

          {/* Paso 4 */}
          <section id="paso-4" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Carrocería y pintura: detecta choques pasados
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/pexels-silverkblack-36729880.jpg"
                alt="Inspección visual de la carrocería, paneles y pintura"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Un rayón superficial de parqueadero no es problema, pero un golpe estructural que haya torcido el chasis pone en riesgo tu vida en caso de un nuevo accidente.
            </p>

            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Tres cosas que cualquiera puede mirar en 2 minutos:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Las líneas entre puertas y capó:</strong> La ranura o luz entre las piezas debe ser del mismo ancho en todo el recorrido. Si en una esquina cabe tu dedo y en la otra está pegado, esa pieza fue cambiada o enderezada a la fuerza.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Diferencias de color bajo el sol:</strong> Mira el carro agachándote desde las esquinas. Si una puerta se ve más brillante o de un tono ligeramente distinto al resto de la carrocería, fue repintada.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Pisos del baúl y rueda de repuesto:</strong> Levanta el tapizado del baúl donde va la llanta de repuesto. El piso debe ser liso y con la pintura original de fábrica. Si ves arrugas en el metal o soldaduras toscas con masilla, el carro recibió un choque fuerte por detrás.</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Paso 5 */}
          <section id="paso-5" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Motor y fluidos: lo que puedes ver sin ensuciarte
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (4).jpg"
                alt="Revisión del compartimiento del motor y niveles de fluidos"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              No necesitas saber de cilindros o válvulas para revisar el motor. Con solo mirar con una linterna puedes detectar las señales más costosas de reparar.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wide block">
                  1. Fugas de aceite
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Alumbra las uniones del motor por arriba y por los lados. Si ves aceite húmedo, negro y escurriendo, hay empaques dañados. Desconfía si el motor está exageradamente lavado con vapor (muchas veces lo lavan minutos antes para que no veas la fuga).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wide block">
                  2. Tapa y varilla del aceite
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Con el motor apagado, saca la varilla del aceite y mira el color: debe ser ámbar o marrón oscuro. Si tiene consistencia como de café con leche o mayonesa cremosa, <strong>cuidado extremo</strong>: el agua del refrigerante se está mezclando con el aceite (daño de culata).
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>Importante para tu seguridad:</strong> Nunca abras la tapa del radiador ni del tarro de refrigerante si el motor está caliente; el líquido a presión hirviendo puede causar quemaduras graves.
            </div>
          </section>

          {/* Paso 6 */}
          <section id="paso-6" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Cabina interior: botones, aire y seguridad
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/pexels-loocmill-16770914.jpg"
                alt="Comprobación de la cabina, asientos y sistemas interiores"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Arreglar el aire acondicionado o los vidrios eléctricos de un carro puede costarte entre $400.000 y más de $2.000.000 de pesos. Tómate 5 minutos para probar cada botón mientras estás sentado en el puesto del conductor.
            </p>

            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Lista rápida de chequeo interior:
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  'Aire acondicionado: ¿enfría con fuerza en menos de 1 minuto?',
                  'Los 4 vidrios eléctricos: suben y bajan con suavidad.',
                  'Cinturones de seguridad: trancan bien si tiras con fuerza.',
                  'Olor a humedad o barro seco debajo de los tapetes (posible inundación).',
                  'Testigos del tablero: al girar la llave se encienden y al arrancar se apagan todos (Airbag, Check Engine, ABS).',
                  'Pito, plumillas del limpiaparabrisas y luces altas/bajas.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Paso 7 */}
          <section id="paso-7" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Prueba de manejo: ruidos, frenos y cambios
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/pexels-fernando-ortega-2149410884-30598526.jpg"
                alt="Prueba de manejo y dinámica de ruta de carro usado"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Apaga el radio durante la prueba de manejo para escuchar con atención cómo se comporta el carro. Conduce con calma por una calle con policías acostados o baches suaves para sentir la suspensión.
            </p>

            <div className="space-y-3">
              {[
                {
                  titulo: 'Cambios y embrague',
                  detalle: 'En carros manuales, el pedal del clutch no debe sentirse excesivamente duro ni patinar al acelerar. En automáticos, las marchas deben entrar sin tirones o golpes bruscos.',
                },
                {
                  titulo: 'Dirección recta',
                  detalle: 'En una recta plana y segura, el carro no debe jalar fuertemente hacia la izquierda o derecha.',
                },
                {
                  titulo: 'Frenos sin chirridos ni vibración',
                  detalle: 'Al frenar a velocidad moderada, el pedal no debe vibrar bruscamente ni hacer ruidos de metal rozando.',
                },
                {
                  titulo: 'Suspensión silenciosa',
                  detalle: 'Al pasar por desniveles o huecos no debe escucharse un golpeteo metálico en seco (bujes o amortiguadores reventados).',
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-1">
                  <span className="font-bold text-xs sm:text-sm text-slate-900 block">
                    {item.titulo}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.detalle}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Paso 8 */}
          <section id="paso-8" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Calcula los gastos ocultos antes de negociar
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/pexels-freestockpro-9822745.jpg"
                alt="Cálculo de gastos de mantenimiento y costo total del vehículo"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              El precio que le pagas al vendedor es solo una parte. En Colombia, comprar un carro usado siempre viene con gastos inmediatos que debes sumar a tu presupuesto.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  Gastos del primer mes
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Derechos de traspaso y retención:</strong> Aprox. $300.000 a $600.000 (suele dividirse 50/50 con el vendedor).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Cambio preventivo de aceite y filtros:</strong> $150.000 a $350.000.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Correa de repartición (si aplica):</strong> $400.000 a $900.000 si no hay registro de cuándo se cambió.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Llantas desgastadas:</strong> Entre $250.000 y $600.000 por cada llanta.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                  Gastos anuales obligatorios
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>SOAT anual:</strong> Según cilindraje y modelo (de $450.000 a más de $1.200.000).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Impuesto vehicular:</strong> Pagadero cada año según avalúo comercial.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span><strong>Revisión Técnico-Mecánica:</strong> Obligatoria cada año para carros de más de 5 años.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="text-xs font-bold text-slate-900 block">¿Quieres calcular cuánto te costará mantener este carro al año?</span>
                <span className="text-xs text-slate-500">
                  Usa nuestra calculadora interactiva con tarifas reales colombianas.
                </span>
              </div>
              <Link
                href="/cuanto-cuesta-mantener-carro-usado-colombia"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 shrink-0 transition-colors"
              >
                <span>Calculadora de mantenimiento →</span>
              </Link>
            </div>
          </section>

          {/* Paso 9 */}
          <section id="paso-9" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                ¿Cuándo vale la pena pagar un peritaje profesional?
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (3).jpg"
                alt="Peritaje profesional automotriz y revisión técnica especializada"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              Tu revisión visual sirvió para descartar los carros que tenían problemas obvios. Cuando por fin encuentras el carro que pasó todos tus filtros y que de verdad te interesa comprar, <strong>ese es el momento exacto para invertir en un peritaje profesional</strong>.
            </p>

            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900">
                Lo que solo un perito con elevador y escáner puede ver:
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Estructura y chasis por debajo:</strong> Suben el carro a un elevador para ver si las puntas de chasis fueron enderezadas en banco de tiro tras un volcamiento.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Medidor de espesor de pintura:</strong> Miden con un aparato micrométrico el grosor de la pintura en cada panel para saber exactamente qué piezas tienen masilla de choque.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Escáner OBD2 en computadora:</strong> Leen códigos de falla ocultos en sensores de motor, transmisión automática y módulos de airbag.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200/90 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
              <div>
                <span className="text-xs font-bold text-slate-900 block">¿Cuánto vale un peritaje en Colombia y qué paquetes existen?</span>
                <span className="text-xs text-slate-500">
                  Compara precios promedio entre básico, estándar y completo.
                </span>
              </div>
              <Link
                href="/costo-peritaje-colombia"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 shrink-0 transition-colors"
              >
                <span>Precios de peritaje en Colombia →</span>
              </Link>
            </div>
          </section>

          {/* Paso 10 */}
          <section id="paso-10" className="rounded-2xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs scroll-mt-24 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                10
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Lista final y cómo tomar la mejor decisión
              </h2>
            </div>

            <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden border border-slate-200/90">
              <Image
                src="/artppal-pexels-cottonbro-7541354 (9).jpg"
                alt="Organización de resultados, lista de comprobación y toma de decisiones"
                fill
                sizes="(max-width: 768px) 100vw, 800px"
                className="object-cover"
              />
            </div>

            <p className="text-sm text-slate-700 leading-relaxed">
              No compres un carro por emoción o porque el color te gustó. Usa este semáforo sencillo para saber cómo actuar con lo que encontraste:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200/90">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[#0F172A] text-white font-mono font-bold">
                  <tr>
                    <th className="py-3 px-4">Semáforo</th>
                    <th className="py-3 px-4">Situación del carro</th>
                    <th className="py-3 px-4">Qué debes hacer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-emerald-700 whitespace-nowrap">
                      🟢 Verde: Favorable
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      Papeles al día en RUNT y SIMIT, mantenimiento documentado, sin golpes estructurales ni fugas.
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      Pasa al peritaje profesional con confianza para cerrar el trato.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-amber-700 whitespace-nowrap">
                      🟡 Amarillo: Dudas
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      Llantas gastadas, pastillas de freno gastadas, rayones menores o un vidrio trabado.
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      Cotiza cuánto cuesta repararlo y pídele al vendedor descontar ese valor del precio final.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-rose-700 whitespace-nowrap">
                      🔴 Rojo: Detén el negocio
                    </td>
                    <td className="py-3.5 px-4 text-slate-700">
                      Inconsistencias en el número de chasis, embargos, humo denso azul/blanco, chasis arrugado o vendedor evasivo.
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold text-rose-900">
                      No arriesgues tu dinero. Retírate del negocio y busca otra opción.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Checklist resumido */}
            <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5 text-slate-900" />
                <h3 className="text-base font-bold text-slate-900">
                  Resumen de lo que debes tener listo antes de pagar:
                </h3>
              </div>

              <ul className="space-y-2.5">
                {[
                  'Consulta de RUNT (sin prendas bancarias activas sin levantar).',
                  'Paz y salvo del SIMIT de placa y cédula del vendedor.',
                  'Comprobación física de la placa y número de chasis contra la tarjeta.',
                  'Inspección visual de pintura, fugas y cabina.',
                  'Prueba de ruta corta en calles variadas.',
                  'Informe de peritaje técnico favorable.',
                  'Contrato de compraventa firmado especificando quién paga traspaso y retención.',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        {/* Asistente EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              ¿Vas a ver un carro hoy? Usa EscaneApp gratis
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            No tienes que memorizar esta lista ni llevar papel y lápiz. Con el asistente de evaluación de EscaneApp, abres la aplicación en tu celular frente al carro y vas marcando paso a paso cada detalle.
          </p>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Al final, el sistema te entrega un resumen automático con el nivel de riesgo del carro y una estimación de cuánto deberías negociar.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Abrir asistente de evaluación en el celular</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            <h2 className="text-2xl font-black text-slate-900">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Cómo revisar un carro usado si no sé nada de mecánica?',
                a: 'Empieza por lo básico que cualquiera puede ver: revisa papeles oficiales en RUNT y SIMIT, compara el kilometraje con el desgaste de los pedales y timón, mira que las líneas de las puertas sean parejas y pruébalo con calma. Si pasa tu filtro visual, llévalo a un peritaje profesional.',
              },
              {
                q: '¿Cómo saber si un carro usado está en buen estado mecánico?',
                a: 'Ninguna revisión con los ojos puede garantizarlo al 100%. Lo que haces con esta guía es descartar carros con problemas evidentes, choques mal arreglados o trampas de kilometraje. El carro que pase este filtro debe ir a un peritaje con elevador y escáner.',
              },
              {
                q: '¿Un kilometraje bajo significa que el carro está como nuevo?',
                a: 'No necesariamente. En Colombia se alteran muchos tableros para mostrar menos kilómetros. Siempre debes comparar el número del odómetro con las facturas de cambio de aceite, el estado del timón y los registros en el RUNT.',
              },
              {
                q: '¿El RUNT muestra todos los accidentes de un vehículo?',
                a: 'No todos. El RUNT muestra el historial oficial de propietarios, SOAT y tecnomecánica. Para saber si tuvo siniestros con aseguradoras se consulta Fasecolda, y si fue un golpe arreglado por fuera de seguros, solo se detecta revisando la lámina y el chasis en peritaje.',
              },
              {
                q: '¿Qué hago si encuentro un detalle o posible falla?',
                a: 'Anótalo y tómale foto. Pregúntale al vendedor si sabe de qué se trata y calcula cuánto costaría arreglarlo en un taller. Ese valor te servirá para negociar un descuento en el precio o para decidir no comprarlo si es algo muy grave.',
              },
              {
                q: '¿EscaneApp reemplaza llevar el carro a un peritaje?',
                a: 'No. EscaneApp te ayuda a hacer el primer filtro tú mismo para que no gastes $250.000 o $400.000 de peritaje en carros que tienen problemas obvios. Una vez encuentres el carro que pasa tu filtro, un peritaje profesional te da el respaldo final.',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-slate-200/90 bg-slate-50">
                <h3 className="font-bold text-sm sm:text-base text-slate-900 mb-2">
                  {item.q}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fuentes y referencias oficiales */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-lg font-bold text-slate-900">
            Portales oficiales de consulta en Colombia
          </h2>

          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
              <div>
                <a
                  href="https://www.runt.gov.co/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 hover:text-emerald-700 underline inline-flex items-center gap-1"
                >
                  <span>Registro Único Nacional de Tránsito (RUNT)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <span className="text-slate-600"> — Consulta ciudadana por placa y cédula del propietario.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
              <div>
                <a
                  href="https://www.fcm.org.co/simit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 hover:text-emerald-700 underline inline-flex items-center gap-1"
                >
                  <span>Federación Colombiana de Municipios (SIMIT)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <span className="text-slate-600"> — Consulta oficial de multas, comparendos y acuerdos de pago.</span>
              </div>
            </li>
            <li className="flex items-start gap-2.5 text-xs sm:text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-2 shrink-0" />
              <div>
                <a
                  href="https://www.fasecolda.com/ramos/automoviles/camara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 hover:text-emerald-700 underline inline-flex items-center gap-1"
                >
                  <span>Fasecolda — Historial de siniestros asegurados</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
                <span className="text-slate-600"> — Reportes de pérdidas y siniestros de vehículos asegurados en Colombia.</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Recursos relacionados */}
        <section className="border-t border-slate-200/90 pt-10 mb-12">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 block mb-1">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6">
            Otras guías recomendadas
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/costo-peritaje-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cuánto cuesta un peritaje
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Precios y tarifas en Colombia según el tipo de revisión y centro técnico.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cómo revisar el kilometraje
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Aprende a interpretar el kilometraje y detectar odómetros alterados.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Antecedentes en RUNT y SIMIT
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cómo consultar multas, embargos y propietarios paso a paso.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner Editorial */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>EVALUACIÓN GUIADA</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              ¿Ya tienes un carro visto?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Lleva nuestra lista interactiva en tu celular y revisa cada punto sin enredos técnicos antes de comprometer tu dinero.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Empezar evaluación gratis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <p className="text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
          <strong>Aviso de orientación:</strong> La información de esta guía tiene fines educativos y de orientación práctica. EscaneApp no reemplaza un peritaje mecánico profesional ni una inspección legal certificada.
        </p>
      </article>
    </div>
  );
}
