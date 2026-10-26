import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  Gauge,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
  Search,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kilometraje en Carros Usados: Cómo Saber si lo Bajaron (Guía Fácil)',
  description:
    'Aprende a detectar si le bajaron el kilometraje a un carro usado en Colombia: cálculo promedio por año, desgaste del timón y pedales, stickers de aceite y RUNT.',
  alternates: {
    canonical: '/kilometraje-carro-usado',
  },
  openGraph: {
    title: 'Kilometraje en Carros Usados: Cómo Saber si lo Bajaron (Guía Fácil)',
    description:
      'Guía práctica y sencilla para comparar el kilometraje del tablero con el desgaste real y los papeles antes de comprar un carro usado en Colombia.',
    url: 'https://www.escaneapp.com/kilometraje-carro-usado',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
    images: [
      {
        url: '/artppal-pexels-cottonbro-7541354 (8).jpg',
        width: 1200,
        height: 630,
        alt: 'Revisión y comprobación de kilometraje en carros usados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kilometraje en Carros Usados: Cómo Saber si lo Bajaron',
    description:
      'Guía práctica en lenguaje sencillo para verificar el kilometraje real de un carro usado en Colombia.',
    images: ['/artppal-pexels-cottonbro-7541354 (8).jpg'],
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/kilometraje-carro-usado#article',
  headline: 'Cómo revisar el kilometraje de un carro usado y detectar alteraciones',
  description:
    'Guía práctica para calcular el kilometraje promedio anual, contrastar el odómetro con el desgaste físico de pedales y timón, y verificar lecturas previas en RUNT.',
  url: 'https://www.escaneapp.com/kilometraje-carro-usado',
  image: 'https://www.escaneapp.com/artppal-pexels-cottonbro-7541354 (8).jpg',
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

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuántos kilómetros son normales para un carro usado en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En Colombia, un carro particular promedio rueda entre 12.000 y 18.000 kilómetros por año. Por ejemplo, un carro de 5 años debería tener entre 60.000 y 90.000 km. Si tiene mucho menos, debes pedir pruebas de por qué estuvo guardado.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cómo saber con certeza si le bajaron el kilometraje?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La prueba reina son los registros anteriores con fecha: facturas de cambio de aceite, el histórico de tecnomecánicas en el RUNT o un escáner electrónico que lea los módulos de ABS o airbag, donde muchas veces queda grabado el kilometraje original.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Un carro con poco kilometraje siempre es una buena compra?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No necesariamente. Un carro que duró años quieto en un garaje sufre resequedad en mangueras, empaques tostados, llantas deformadas y gasolina descompuesta. A veces es mejor un carro con 100.000 km bien mantenido en carretera que uno de 40.000 km que solo anduvo en trancones sin cambios de aceite.',
      },
    },
  ],
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
      name: 'Revisión de kilometraje',
      item: 'https://www.escaneapp.com/kilometraje-carro-usado',
    },
  ],
};

export default function KilometrajeCarroUsadoPage() {
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
                Revisión del kilometraje
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/5 text-slate-900 border border-slate-200/90 font-mono font-semibold text-xs mb-3">
            <Gauge className="w-3.5 h-3.5 text-emerald-600" />
            <span>GUÍA DE AUDITORÍA · ODÓMETRO Y DESGASTE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
            Cómo revisar el kilometraje de un carro usado y detectar alteraciones
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-6">
            En Colombia es muy fácil que una persona inescrupulosa conecte un aparato al tablero y le baje 50.000 kilómetros a un carro en diez minutos. Aprende a descubrir la verdad comparando el número del tablero con el desgaste real y los papeles oficiales.
          </p>

          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm">
            <Image
              src="/artppal-pexels-cottonbro-7541354 (8).jpg"
              alt="Revisión y comprobación de kilometraje en carros usados"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </header>

        {/* 1. La regla del promedio anual */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              La cuenta rápida: ¿cuántos kilómetros debería tener?
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Una familia o conductor particular promedio en ciudades como Bogotá, Medellín, Cali o Barranquilla recorre entre <strong>12.000 y 18.000 kilómetros al año</strong> (entre ir al trabajo, compras y algún viaje ocasional).
          </p>

          {/* Fórmula destacada */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50 p-5 text-center">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold block mb-1">
              FÓRMULA SENCILLA DE REFERENCIA
            </span>
            <p className="text-base sm:text-lg font-mono font-extrabold text-slate-900">
              Kilómetros esperados = Años del carro × 15.000 km promedio
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <strong>Ejemplo:</strong> Si el carro es modelo 2018 (tiene aprox. 7 años de rodaje), lo normal es que marque entre <strong>85.000 y 110.000 km</strong>. Si el vendedor te asegura que solo tiene 30.000 km («porque era de un señor jubilado que solo iba a misa»), debes encender tus alarmas y exigir pruebas documentales contundentes.
          </div>
        </section>

        {/* 2. Dónde delata el carro su kilometraje real */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              El desgaste físico no miente: qué mirar en la cabina
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Pueden alterar el número digital del tablero, pero no pueden ocultar las horas de uso en las piezas que el conductor toca todos los días:
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200/90">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#0F172A] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Parte del carro</th>
                  <th className="py-3 px-4 font-bold">Qué debes buscar</th>
                  <th className="py-3 px-4 font-bold">Qué significa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">Pedal de freno y clutch</td>
                  <td className="py-3.5 px-4 text-slate-700">La goma o caucho está lisa, comida en una esquina o se ve el metal</td>
                  <td className="py-3.5 px-4 text-slate-600">Un pedal gastado hasta el hierro indica más de 100.000 km de uso constante en ciudad.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">Timón (volante)</td>
                  <td className="py-3.5 px-4 text-slate-700">El cuero o textura plástica está brillante, pulida o descarapelada</td>
                  <td className="py-3.5 px-4 text-slate-600">A los 30.000 km el timón aún conserva su textura mate y rugosa de fábrica. Si brilla como un espejo, tiene mucho kilometraje.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">Asiento del conductor</td>
                  <td className="py-3.5 px-4 text-slate-700">La esponja lateral izquierda está aplastada o la tela/cuero rota</td>
                  <td className="py-3.5 px-4 text-slate-600">Indica miles de subidas y bajadas del conductor, típico de carros con alto recorrido o de servicio.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">Palanca de cambios</td>
                  <td className="py-3.5 px-4 text-slate-700">Los números de las marchas están borrados y la perilla tiene juego flojo</td>
                  <td className="py-3.5 px-4 text-slate-600">Uso intensivo en tráfico urbano.</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">Discos de freno</td>
                  <td className="py-3.5 px-4 text-slate-700">Pasa la yema del dedo por el borde del disco (en frío); ¿tiene una ceja o escalón pronunciado?</td>
                  <td className="py-3.5 px-4 text-slate-600">Un escalón muy hondo en los discos significa que ha frenado por más de 60.000 a 80.000 km con ese juego.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
              <strong>Ojo con el timón recién forrado:</strong> Muchos vendedores le ponen un forro nuevo cosido al timón o gomas nuevas a los pedales por $30.000 COP justamente para disimular el desgaste. Si ves un carro con timón nuevo pero el resto de la cabina gastada, desconfía.
            </p>
          </div>
        </section>

        {/* 3. Las pruebas documentales definitivas */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Cómo desenmascarar el kilometraje con documentos
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Para comprobar el odómetro sin lugar a dudas, busca cualquiera de estos tres registros oficiales:
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-sm text-slate-900 block">
                1. Histórico Vehicular del RUNT (La prueba reina en Colombia)
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cada año que el carro va a la Revisión Técnico-Mecánica en un CDA certificado, el técnico anota obligatoriamente el kilometraje en el sistema nacional del RUNT. Si pides un Histórico Vehicular oficial (cuesta aprox. $35.000 COP en la página del RUNT), podrás ver la línea de tiempo: si en 2022 anotaron 85.000 km y hoy el vendedor te lo ofrece con 55.000 km, <strong>fue adulterado sin ninguna duda</strong>.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-sm text-slate-900 block">
                2. Stickers y facturas de cambio de aceite
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Abre la puerta del conductor y mira el marco del parante, o revisa la esquina superior del parabrisas. Los talleres y servitecas suelen pegar un sticker que dice: <em>«Último cambio: 94.000 km. Próximo cambio: 102.000 km»</em>. Muchas veces los revendedores olvidan despegarlo. También pide el libro de garantías o las facturas del aceite.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <span className="font-bold text-sm text-slate-900 block">
                3. La memoria oculta en el escáner computarizado
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Los programas piratas que bajan el kilometraje alteran el reloj que ves en la pantalla, pero en la mayoría de carros modernos no pueden borrar la memoria secundaria de la computadora del motor (ECU), el módulo de frenos ABS o el módulo de Airbags. Un buen perito con escáner profesional puede leer los kilómetros reales guardados en esos módulos.
              </p>
            </div>
          </div>
        </section>

        {/* 4. ¿Qué hacer si sospechas que el kilometraje está alterado? */}
        <section className="mb-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#0F172A] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ¿Qué debes hacer si descubres que le bajaron el kilometraje?
            </h2>
          </div>

          <p className="text-sm text-slate-700 leading-relaxed">
            Si descubres que el carro tiene 140.000 km en lugar de los 70.000 km que dice el tablero, tienes dos opciones:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-1.5">
              <strong className="text-sm font-bold text-rose-900 block">
                Opción A: Retirarte del negocio (Recomendado)
              </strong>
              <p className="text-xs text-rose-800 leading-relaxed">
                Quien te miente en el kilometraje muy probablemente te está ocultando choques graves, motores recalentados o mantenimientos vencidos. No compres problemas ajenos.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/90 bg-slate-50 space-y-1.5">
              <strong className="text-sm font-bold text-slate-900 block">
                Opción B: Negociar un descuento fuerte
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Si el carro mecánicamente funciona perfecto en el peritaje y te interesa de verdad, exígele al vendedor una rebaja drástica acorde al kilometraje real, calculando que deberás hacer cambio preventivo de correa de repartición y fluidos de inmediato.
              </p>
            </div>
          </div>
        </section>

        {/* Cómo ayuda EscaneApp */}
        <section className="my-10 bg-white border border-slate-200/90 p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            <h2 className="text-2xl font-black text-slate-900">
              Verifica el carro paso a paso con EscaneApp
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            En nuestra herramienta de evaluación guiada, ingresas el año del carro y el kilometraje que marca el tablero. El sistema calcula automáticamente si el promedio anual es coherente y te da una lista de qué piezas revisar en ese modelo específico.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-sm font-bold transition-all shadow-xs"
            >
              <span>Auditar kilometraje en la evaluación guiada</span>
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
                q: '¿Cuántos kilómetros son normales por año en Colombia?',
                a: 'El promedio normal está entre 12.000 y 18.000 km anuales para uso particular. Si un carro tiene más de 25.000 km por año, probablemente fue usado para plataformas de transporte (Uber, Didi) o viajes intermunicipales.',
              },
              {
                q: '¿Es delito alterar el kilometraje en Colombia?',
                a: 'Sí, vender un carro con el odómetro alterado deliberadamente para cobrar un precio mayor puede configurar el delito de estafa y vicio redhibitorio en la compraventa según la legislación colombiana.',
              },
              {
                q: '¿Qué mantenimiento preventivo debo hacer si dudo del kilometraje?',
                a: 'Si compras un carro con dudas de kilometraje, cambia de inmediato la correa de repartición (o kit de distribución), la bomba de agua, el aceite de motor con todos sus filtros y el líquido de frenos.',
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
              href="/como-revisar-carro-usado"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Cómo revisar un carro usado
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guía completa paso a paso para examinar carrocería, motor y papeles.
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
                Precios de peritaje en Colombia y qué pruebas pedir antes de comprar.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="bg-white border border-slate-200/90 rounded-2xl p-5 hover:border-slate-900 hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-slate-900 mb-1.5 group-hover:text-emerald-700 transition-colors">
                Antecedentes de un vehículo
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cómo consultar multas, embargos y propietarios en RUNT y SIMIT.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#0F172A] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 font-mono text-xs font-semibold">
              <Search className="w-3.5 h-3.5" />
              <span>EVALUACIÓN FÁCIL</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug">
              Revisa el carro con el asistente de EscaneApp
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Calcula si el kilometraje cuadra con la edad del carro y revisa cada detalle desde tu celular.
            </p>

            <div className="pt-2">
              <Link
                href="/evaluacion"
                className="inline-flex items-center justify-center gap-2 px-8 h-12 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-sm font-bold transition-all shadow-sm active:scale-95"
              >
                <span>Empezar evaluación gratuita</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Aviso Legal */}
        <p className="text-[11px] text-slate-500 leading-relaxed text-center sm:text-left">
          <strong>Aviso de orientación:</strong> Los cálculos y promedios presentados son referencias generales del mercado automotor colombiano. EscaneApp no sustituye un informe pericial ni un diagnóstico mecánico oficial.
        </p>
      </article>
    </div>
  );
}
