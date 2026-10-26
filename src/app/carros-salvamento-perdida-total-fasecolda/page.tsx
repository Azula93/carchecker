import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  HelpCircle,
  ExternalLink,
  ShieldAlert,
  Search,
  Wrench,
  AlertTriangle,
  Car,
} from 'lucide-react';
import { ENLACES_PORTALES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Carros de Salvamento y Pérdida Total en Colombia: Guía Fasecolda y Riesgos',
  description:
    'Aprende a saber si un carro usado en Colombia tuvo pérdida total o fue de aseguradora: consulta en Fasecolda, señales físicas de choque y castigo de precio.',
  alternates: {
    canonical: '/carros-salvamento-perdida-total-fasecolda',
  },
  openGraph: {
    title: 'Carros de Salvamento y Pérdida Total en Colombia: Guía Fasecolda y Riesgos',
    description:
      'Descubre cómo saber si un carro usado en Colombia tuvo pérdida total o fue de aseguradora. Consulta Fasecolda, señales físicas y castigo de precio.',
    url: 'https://www.escaneapp.com/carros-salvamento-perdida-total-fasecolda',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/artppal-pexels-cottonbro-7541354 (6).jpg',
        width: 1200,
        height: 630,
        alt: 'Inspección de carros de salvamento y pérdida total en Colombia con Fasecolda',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carros de Salvamento y Pérdida Total en Colombia: Guía Fácil',
    description:
      'Aprende a detectar siniestros graves en carros usados colombianos antes de comprar.',
    images: ['/artppal-pexels-cottonbro-7541354 (6).jpg'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://www.escaneapp.com/carros-salvamento-perdida-total-fasecolda#article',
  headline:
    'Carros Salvamento y Pérdida Total en Colombia: Cómo Identificarlos con Fasecolda',
  description:
    'Guía completa sobre vehículos de salvamento y pérdida total en Colombia: cómo consultar el historial de siniestros en Fasecolda, riesgos de seguridad estructural, problemas de asegurabilidad y cuánto debe castigarse su precio.',
  url: 'https://www.escaneapp.com/carros-salvamento-perdida-total-fasecolda',
  image:
    'https://www.escaneapp.com/artppal-pexels-cottonbro-7541354 (6).jpg',
  inLanguage: 'es-CO',
  datePublished: '2026-10-25T08:00:00+00:00',
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
      name: 'Carros salvamento y pérdida total Fasecolda',
      item: 'https://www.escaneapp.com/carros-salvamento-perdida-total-fasecolda',
    },
  ],
};

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Qué es un carro de salvamento en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un carro de salvamento es un vehículo que sufrió un accidente grave (choque fuerte, volcamiento, inundación o robo) y cuya reparación era tan costosa que la aseguradora prefirió pagarle el carro completo al dueño anterior. Luego, los restos del carro son subastados, un taller los repara y los pone nuevamente a la venta.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo saber si un carro tuvo pérdida total con Fasecolda?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Entras a la página oficial de consulta de siniestros de Fasecolda y digitas la placa. Si el carro tuvo un choque fuerte cubierto por seguro, el reporte te dirá la fecha del accidente y si fue calificado como pérdida de mayor cuantía (pérdida total).',
      },
    },
    {
      '@type': 'Question',
      name: '¿Si el carro no sale en Fasecolda significa que nunca fue chocado?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No necesariamente. Fasecolda solo guarda los choques donde el dueño tenía seguro todo riesgo y reclamó la plata. Si el carro se estrelló contra un muro y no tenía seguro, el dueño lo arregló en un taller por su cuenta y no saldrá en Fasecolda. Por eso siempre hay que revisar la carrocería en un peritaje.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Se puede asegurar un carro que tuvo pérdida total?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Casi ninguna aseguradora en Colombia acepta vender una póliza todo riesgo para un carro con pérdida total previa. Las pocas que lo aceptan solo te aseguran la mitad del valor del carro o cobran tarifas altísimas.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto menos debe costar un carro de salvamento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un carro que tuvo pérdida total debe costar entre un 25% y un 40% menos que un carro normal del mismo año y modelo. Si te lo quieren vender a precio normal de mercado, te están cobrando millones de más por un vehículo con antecedentes graves.',
      },
    },
  ],
};

export default function CarrosSalvamentoFasecoldaPage() {
  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen text-slate-800">
      {/* Marcado Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
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
                Carros salvamento y pérdida total
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado Principal */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-800 font-mono font-semibold text-xs mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
            <span>ALERTA DE SEGURIDAD · VEHÍCULOS DE ASEGURADORA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            Carros de Salvamento y Pérdida Total: Cómo Detectarlos con Fasecolda
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            En Colombia, muchos carros que sufrieron choques gravísimos, volcamientos o inundaciones son declarados en «pérdida total» por las aseguradoras. Luego son subastados como chatarra, reconstruidos en talleres informales y vendidos a personas inocentes como si estuvieran «como nuevos». Aprende a identificarlos y proteger tu dinero.
          </p>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm mb-8">
            <Image
              src="/artppal-pexels-cottonbro-7541354 (2).jpg"
              alt="Inspección detallada de carrocería y verificación de siniestros en carro usado"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>

          {/* Resumen rápido */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Lo que debes saber en 1 minuto:
            </h2>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[150px] sm:min-w-[170px]">• ¿Qué es un salvamento?</span>
                <span>Un carro cuyo arreglo costaba más del <strong>70% del valor total</strong> del vehículo. La aseguradora prefirió pagarle el carro al dueño y vender los restos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[150px] sm:min-w-[170px]">• Consulta Fasecolda:</span>
                <span>Es una consulta gratuita en internet que te dice si el carro tuvo reportes de <strong>pérdida de mayor cuantía</strong> en aseguradoras.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[150px] sm:min-w-[170px]">• Problema de seguro:</span>
                <span>Casi ninguna aseguradora te aceptará vender un <strong>seguro todo riesgo</strong> para un carro con pérdida total en su historial.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-slate-900 min-w-[150px] sm:min-w-[170px]">• Precio justo:</span>
                <span>Un carro de salvamento debe costar entre un <strong>25% y 40% menos</strong> que uno normal. Si te lo venden a precio de mercado, te están engañando.</span>
              </li>
            </ul>
          </div>
        </header>

        {/* 1. Qué es exactamente un carro de salvamento */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Qué es un carro de salvamento y cómo llega a la venta?
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Cuando un carro asegurado se estrella fuertemente, un perito de la aseguradora calcula cuánto cuesta arreglarlo con piezas originales. Si la reparación vale más del <strong>70% o 75% del valor comercial del carro</strong>, la aseguradora decide que «no vale la pena arreglarlo» y declara la <strong>Pérdida Total</strong>.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed">
            Aquí empieza el camino del salvamento:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 block">
                1. Pago al dueño
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                La aseguradora le entrega el dinero completo al dueño original y se queda con los restos chocados del carro.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 block">
                2. Subasta de restos
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                La aseguradora subasta el carro chatarrizado a talleres independientes o intermediarios a un precio muy bajo.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-900 block">
                3. Maquillaje y reventa
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                El taller lo endereza, lo enmasilla, le echa pintura brillante y lo publica en internet diciendo: «¡Único dueño, nunca chocado!».
              </p>
            </div>
          </div>
        </section>

        {/* 2. Tipos de siniestro según Fasecolda */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Los 4 tipos de siniestros que registra Fasecolda
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            No todos los choques son iguales. Al consultar la placa en Fasecolda, puedes encontrar cuatro tipos de registros:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200/90">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0F172A] text-white text-xs font-mono uppercase tracking-wider">
                <tr>
                  <th className="p-3.5 sm:p-4">Tipo de reporte en Fasecolda</th>
                  <th className="p-3.5 sm:p-4">Qué le pasó al carro en la vida real</th>
                  <th className="p-3.5 sm:p-4">Nivel de peligro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Pérdida Total por Daños (Mayor Cuantía)
                    <span className="block text-[11px] font-normal text-slate-500">Choque de frente, volcamiento o impacto severo</span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-600">El chasis se torció y los airbags estallaron. En un nuevo choque, la estructura no protegerá a tu familia.</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200">
                      🔴 Peligro Crítico
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Pérdida Total por Inundación
                    <span className="block text-[11px] font-normal text-slate-500">El agua y lodo taparon el motor y la cabina</span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-600">Las computadoras y cables quedan con óxido invisible. Empiezan a fallar sensores y módulos eléctricos sin fin.</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-rose-50 text-rose-800 font-bold text-xs border border-rose-200">
                      🔴 Peligro Crítico
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Pérdida Parcial
                    <span className="block text-[11px] font-normal text-slate-500">Golpes urbanos o rayones que pagó el seguro</span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-600">Le cambiaron una puerta, una farola o el parachoques. El chasis no se vio afectado.</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 font-bold text-xs border border-amber-200">
                      🟡 Aceptable (Revisar en peritaje)
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 sm:p-4 font-semibold text-slate-900">
                    Pérdida Total por Hurto Recuperado
                    <span className="block text-[11px] font-normal text-slate-500">El carro fue robado, pagaron el seguro y luego la policía lo recuperó</span>
                  </td>
                  <td className="p-3.5 sm:p-4 text-slate-600">La estructura metálica suele estar intacta. Solo hay que verificar que no tenga números de motor o chasis regrabados.</td>
                  <td className="p-3.5 sm:p-4">
                    <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                      🟢 Menor Riesgo Físico
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. Cómo consultar Fasecolda y su gran limitación */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Cómo consultar Fasecolda y lo que NO puede mostrarte
            </h2>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-600" />
              Pasos para consultar la placa en Fasecolda (Gratis):
            </h3>
            <ol className="text-xs sm:text-sm text-slate-700 space-y-2 list-decimal list-inside leading-relaxed">
              <li>Ingresa a la página oficial de <strong>Historial de accidentes de Fasecolda</strong>.</li>
              <li>Escribe la placa del carro que estás evaluando.</li>
              <li>Mira las fechas y los montos indemnizados: fíjate si aparece la palabra <strong>«Mayor Cuantía»</strong> o <strong>«Pérdida Total»</strong>.</li>
            </ol>
            <div className="pt-2">
              <a
                href={ENLACES_PORTALES.FASECOLDA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 underline transition-colors"
              >
                <span>Abrir portal oficial de Fasecolda →</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Advertencia clave */}
          <div className="p-5 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>La advertencia de oro: lo que Fasecolda no sabe</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-950 leading-relaxed">
              Fasecolda <strong>solo registra choques donde el carro tenía seguro todo riesgo y el dueño cobró el dinero</strong>. Si el carro se estrelló durísimo pero:
            </p>
            <ul className="text-xs sm:text-sm text-rose-950 space-y-1 list-disc list-inside">
              <li>El dueño no tenía seguro todo riesgo en ese momento.</li>
              <li>O prefirió arreglarlo por su cuenta en un taller para que no le subiera el seguro.</li>
            </ul>
            <p className="text-xs sm:text-sm text-rose-950 font-bold pt-1">
              Ese choque no saldrá en Fasecolda. Por eso, que Fasecolda salga en blanco no garantiza al 100% que el carro nunca haya sido chocado: siempre debes revisarlo con los ojos.
            </p>
          </div>
        </section>

        {/* 4. Señales físicas que delatan un siniestro en el carro */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              6 señales fáciles para detectar un choque grave a simple vista
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Aunque un taller le eche pintura nueva, casi siempre dejan estas huellas evidentes:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <Wrench className="w-4 h-4 text-emerald-600" />
                1. Líneas de puertas desalineadas
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pasa tu dedo por la ranura entre el capó y las puertas. Si en un lado cabe tu dedo y en el otro casi no entra, el chasis quedó torcido por un golpe.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <Wrench className="w-4 h-4 text-emerald-600" />
                2. Masilla fea en el piso del baúl
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Levanta la alfombra donde va la llanta de repuesto. La lata de fábrica es lisa. Si ves soldaduras gruesas o masilla áspera aplicada con los dedos, chocaron el carro por detrás.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <Wrench className="w-4 h-4 text-emerald-600" />
                3. Tornillos del capó pelados
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Los tornillos que sujetan el capó vienen pintados desde la fábrica. Si la pintura del tornillo está pelada o tiene marcas de llave inglesa, esa pieza fue desmontada tras un accidente.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <Wrench className="w-4 h-4 text-emerald-600" />
                4. Airbags de mentira
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Poner airbags nuevos cuesta de $5 a $15 millones de pesos. Muchos talleres tramposos ponen solo la tapa plástica del timón vacía y desconectan el bombillo del tablero para que no te enteres.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <Wrench className="w-4 h-4 text-emerald-600" />
                5. Llantas comidas por un solo lado
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si las llantas delanteras están gastadas de forma dispareja aunque el dueño diga que están alineadas, los brazos de la suspensión o el chasis quedaron descuadrados.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-2 font-mono">
                <Wrench className="w-4 h-4 text-emerald-600" />
                6. Olor a humedad o barro seco
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si al entrar huele a humedad persistente, o ves barro seco debajo de los rieles de los asientos, el carro estuvo metido en una inundación.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Problemas de comprar un carro de salvamento */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              5
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Por qué es mala idea comprar un carro de salvamento a precio normal?
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                1. Ninguna aseguradora te lo va a asegurar
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cuando intentes comprar un seguro todo riesgo, la aseguradora consultará Fasecolda. Al ver que tuvo pérdida total, rechazarán tu carro. Si te chocas o te lo roban, perderás todo tu dinero sin respaldo de un seguro.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-900" />
                2. Pierdes millones de pesos al instante
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si un carro normal vale $40.000.000 COP, su versión de salvamento debe valer máximo $26.000.000 COP. Si pagas el precio completo, perdiste $14.000.000 COP desde el primer día.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-900" />
                3. Venderlo en el futuro será casi imposible
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Hoy en día casi cualquier comprador hace peritaje o consulta Fasecolda. El día que quieras vender el carro, nadie te lo querrá comprar o te ofrecerán una fracción miserable de su precio.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo ayuda EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Descarte inteligente con EscaneApp
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            No pierdas plata llevando cualquier carro a un peritaje de $350.000 COP. Con el asistente de evaluación de EscaneApp, abres la app frente al carro y revisas en 5 minutos las líneas de la carrocería, los pernos del capó y el piso del baúl. Si detectas pistas de choque grave, lo descartas de una vez sin gastar dinero.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Hacer chequeo de choque en mi celular</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-slate-900" />
            <h2 className="text-2xl font-black text-slate-900">
              Preguntas frecuentes sobre salvamentos
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: '¿Es ilegal comprar o vender un carro de salvamento en Colombia?',
                a: 'No es delito vender un salvamento siempre y cuando el vendedor le aclare honestamente al comprador lo que pasó. Lo que sí es un delito penal de estafa es vender un carro siniestrado asegurando que nunca fue chocado.',
              },
              {
                q: '¿Vale la pena comprar un salvamento si me lo dejan muy barato?',
                a: 'Solo si el golpe fue leve (o por robo recuperado donde no hubo choque), si un perito profesional certifica que el chasis y los airbags están en perfecto estado, y si te hacen un descuento de mínimo el 30% a 40% del precio de mercado.',
              },
              {
                q: '¿El historial de choques de Fasecolda se borra con los años?',
                a: 'No. El historial de indemnizaciones de Fasecolda queda guardado para siempre en sus servidores asociado a la placa y al número de chasis.',
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
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Antecedentes en RUNT y SIMIT
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cómo consultar multas, prendas y embargos judiciales paso a paso.
              </p>
            </Link>

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
              href="/traspaso-carro-usado-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Traspaso de carro usado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Costos reales, quién paga qué y cómo evitar estafas en el tránsito.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner Editorial */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>SEGURIDAD ANTES DE COMPRAR</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              ¿Vas a ver un carro usado hoy?
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Lleva nuestra lista en tu celular y descarta en minutos carros con choques estructurales o problemas de aseguradora.
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
          <strong>Aviso de orientación:</strong> La información contenida en esta guía tiene propósito orientativo. Las consultas de siniestros deben realizarse a través de las entidades oficiales competentes (Fasecolda). EscaneApp no reemplaza un peritaje técnico vehicular.
        </p>
      </article>
    </div>
  );
}
