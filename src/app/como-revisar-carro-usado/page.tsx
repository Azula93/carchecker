import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo revisar un carro usado en Colombia antes de comprarlo',
  description:
    'Aprende qué revisar en un carro usado antes de comprarlo en Colombia: kilometraje, antecedentes, carrocería, motor, interior, prueba de ruta y posibles costos de reparación.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/como-revisar-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar un carro usado en Colombia antes de comprarlo',
    description:
      'Guía práctica para revisar un vehículo usado antes de comprarlo y detectar posibles señales de alerta antes de realizar un peritaje profesional.',
    url: 'https://carchecker.kodiquett.com/como-revisar-carro-usado',
    siteName: 'Car Checker Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://carchecker.kodiquett.com/como-revisar-carro-usado#article',
  headline: 'Cómo revisar un carro usado en Colombia antes de comprarlo',
  description:
    'Guía práctica para revisar un vehículo usado antes de comprarlo y detectar posibles señales de alerta antes de realizar un peritaje profesional.',
  url: 'https://carchecker.kodiquett.com/como-revisar-carro-usado',
  inLanguage: 'es-CO',
  isPartOf: {
    '@id': 'https://carchecker.kodiquett.com/#webapp',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Car Checker',
    url: 'https://carchecker.kodiquett.com',
  },
};

export default function ComoRevisarCarroUsadoPage() {
  return (
    <main className="w-full bg-white">
        <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleStructuredData),
  }}
/>
      <article className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-16">

        {/* Encabezado */}
        <header className="mb-10">
          <p className="text-sm font-mono font-semibold text-[#166534] mb-3">
            GUÍA CAR CHECKER
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F1B2B] leading-tight mb-5">
            Cómo revisar un carro usado en Colombia antes de comprarlo
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-8">
            Comprar un vehículo usado requiere revisar más que su apariencia
            exterior. Antes de tomar una decisión, conviene verificar sus
            datos, consultar antecedentes, inspeccionar diferentes componentes
            y estimar posibles costos de reparación.
          </p>
        </header>

        {/* Introducción */}
        <section className="mb-10">
          <p className="text-slate-700 leading-8 mb-5">
            Una revisión preliminar permite identificar señales que pueden
            justificar una inspección más detallada. No se trata de sustituir
            un peritaje profesional, sino de contar con una metodología
            ordenada para observar el vehículo antes de asumir un compromiso
            de compra.
          </p>

          <p className="text-slate-700 leading-8">
            En esta guía encontrarás los principales aspectos que puedes
            revisar antes de llevar un carro usado a un centro especializado.
          </p>
        </section>

        {/* Índice */}
        <nav
          aria-label="Contenido de la guía"
          className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-12"
        >
          <h2 className="text-lg font-bold text-[#0F1B2B] mb-4">
            En esta guía
          </h2>

          <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
            <li>
              <a href="#datos-basicos" className="hover:underline">
                Verifica los datos básicos del vehículo
              </a>
            </li>
            <li>
              <a href="#kilometraje" className="hover:underline">
                Revisa el kilometraje
              </a>
            </li>
            <li>
              <a href="#antecedentes" className="hover:underline">
                Consulta los antecedentes
              </a>
            </li>
            <li>
              <a href="#carroceria" className="hover:underline">
                Inspecciona la carrocería
              </a>
            </li>
            <li>
              <a href="#motor" className="hover:underline">
                Revisa el motor y componentes mecánicos
              </a>
            </li>
            <li>
              <a href="#interior" className="hover:underline">
                Revisa el interior
              </a>
            </li>
            <li>
              <a href="#prueba-ruta" className="hover:underline">
                Realiza una prueba de ruta
              </a>
            </li>
            <li>
              <a href="#costos" className="hover:underline">
                Estima posibles costos de reparación
              </a>
            </li>
            <li>
              <a href="#peritaje" className="hover:underline">
                Cuándo realizar un peritaje profesional
              </a>
            </li>
          </ol>
        </nav>

        {/* 1 */}
        <section id="datos-basicos" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            1. Verifica los datos básicos del vehículo
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Antes de revisar componentes físicos, comprueba que la información
            proporcionada por el vendedor corresponda con el vehículo que
            estás observando.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Marca y línea del vehículo.</li>
            <li>Modelo y año.</li>
            <li>Placa.</li>
            <li>Tipo de combustible.</li>
            <li>Tipo de transmisión.</li>
            <li>Kilometraje registrado en el vehículo.</li>
            <li>Estado general y características anunciadas.</li>
          </ul>

          <p className="text-slate-700 leading-8 mt-4">
            Las diferencias entre la información anunciada y las
            características observadas deben ser aclaradas antes de continuar
            con el proceso de compra.
          </p>
        </section>

        {/* 2 */}
        <section id="kilometraje" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            2. Revisa el kilometraje
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            El kilometraje ayuda a contextualizar el uso que ha tenido un
            vehículo, pero no debe analizarse de manera aislada.
          </p>

          <p className="text-slate-700 leading-8 mb-4">
            Observa si el kilometraje mostrado es coherente con el estado
            general del vehículo y con la información proporcionada por el
            vendedor.
          </p>

          <div className="rounded-xl border-l-4 border-[#166534] bg-slate-50 p-5">
            <p className="text-slate-700 leading-7">
              <strong>Importante:</strong> un kilometraje bajo no garantiza
              que un vehículo esté en mejores condiciones. El mantenimiento,
              el tipo de uso y el estado real de sus componentes también son
              relevantes.
            </p>
          </div>
        </section>

        {/* 3 */}
        <section id="antecedentes" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            3. Consulta los antecedentes del vehículo
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Antes de comprar un vehículo usado es conveniente consultar la
            información disponible en las fuentes oficiales y especializadas
            correspondientes.
          </p>

          <p className="text-slate-700 leading-8 mb-4">
            Dependiendo del caso, puedes consultar información relacionada con
            trámites, infracciones, antecedentes y otros datos relevantes para
            la compra.
          </p>

          <p className="text-slate-700 leading-8">
            Car Checker facilita el proceso de revisión, pero las consultas
            realizadas en plataformas externas deben verificarse directamente
            en las fuentes correspondientes.
          </p>
        </section>

        {/* 4 */}
        <section id="carroceria" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            4. Inspecciona la carrocería
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Revisa el vehículo con buena iluminación y observa la carrocería
            desde diferentes ángulos. Busca diferencias que puedan indicar
            reparaciones anteriores o daños visibles.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Diferencias de tonalidad entre paneles.</li>
            <li>Rayones, golpes o abolladuras.</li>
            <li>Separaciones irregulares entre piezas.</li>
            <li>Estado de puertas, capó y baúl.</li>
            <li>Estado de vidrios, espejos y luces.</li>
            <li>Señales visibles de reparación o repintado.</li>
            <li>Estado y desgaste de los neumáticos.</li>
          </ul>
        </section>

        {/* 5 */}
        <section id="motor" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            5. Revisa el motor y los componentes mecánicos
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            La revisión visual del compartimiento del motor puede revelar
            algunas señales que justifican una inspección especializada.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Fugas visibles de líquidos.</li>
            <li>Estado general de mangueras y conexiones.</li>
            <li>Ruidos o vibraciones anormales.</li>
            <li>Testigos encendidos en el tablero.</li>
            <li>Estado aparente de la batería.</li>
            <li>Comportamiento del motor durante el encendido.</li>
          </ul>

          <p className="text-slate-700 leading-8 mt-4">
            Una revisión visual no permite determinar por sí sola el estado
            interno del motor, la transmisión u otros sistemas. Para ello se
            requiere una evaluación técnica adecuada.
          </p>
        </section>

        {/* 6 */}
        <section id="interior" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            6. Revisa el interior
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            El estado del habitáculo también puede aportar información sobre
            el uso y mantenimiento del vehículo.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Desgaste de los asientos.</li>
            <li>Estado del volante y pedales.</li>
            <li>Funcionamiento de vidrios y seguros.</li>
            <li>Tablero e indicadores.</li>
            <li>Sistema de climatización.</li>
            <li>Sistema multimedia y controles.</li>
            <li>Cinturones de seguridad.</li>
          </ul>
        </section>

        {/* 7 */}
        <section id="prueba-ruta" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            7. Realiza una prueba de ruta
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Cuando las condiciones sean adecuadas y el propietario permita
            realizarla, una prueba de ruta puede ayudar a identificar
            comportamientos que no son evidentes durante una inspección
            estática.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Comportamiento del motor durante la marcha.</li>
            <li>Respuesta de la transmisión.</li>
            <li>Comportamiento de la dirección.</li>
            <li>Frenado.</li>
            <li>Ruidos o vibraciones.</li>
            <li>Comportamiento de la suspensión.</li>
            <li>Indicadores o testigos que aparezcan durante la conducción.</li>
          </ul>
        </section>

        {/* 8 */}
        <section id="costos" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            8. Estima posibles costos de reparación
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Una falla o componente desgastado no solamente representa un
            problema técnico: también puede convertirse en un costo adicional
            después de comprar el vehículo.
          </p>

          <p className="text-slate-700 leading-8 mb-4">
            Por eso es útil registrar las condiciones que requieran atención y
            estimar cuánto podrían representar dentro del presupuesto de
            compra.
          </p>

          <p className="text-slate-700 leading-8">
            Esta estimación es preliminar y no reemplaza una cotización
            realizada por un taller o profesional especializado.
          </p>
        </section>

        {/* 9 */}
        <section id="peritaje" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            9. ¿Cuándo realizar un peritaje profesional?
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Si durante la revisión aparecen inconsistencias, daños visibles,
            señales mecánicas, antecedentes que requieren aclaración o
            posibles costos importantes, puede ser conveniente realizar una
            inspección profesional antes de concretar la compra.
          </p>

          <p className="text-slate-700 leading-8">
            Un peritaje profesional permite realizar verificaciones que no
            pueden determinarse mediante una revisión visual o una herramienta
            de evaluación preliminar.
          </p>
        </section>

        {/* Conclusión */}
        <section className="border-t border-slate-200 pt-10 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            Una revisión ordenada ayuda a tomar una decisión informada
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Revisar un carro usado implica observar diferentes aspectos y no
            depender de una sola señal. Los datos del vehículo, sus
            antecedentes, el estado físico, el comportamiento durante una
            prueba de ruta y los posibles costos de reparación deben
            analizarse conjuntamente.
          </p>

          <p className="text-slate-700 leading-8">
            Car Checker permite organizar esta revisión preliminar para que
            tengas una visión más estructurada antes de decidir si vale la
            pena avanzar hacia una inspección profesional.
          </p>
        </section>

        <section className="border-t border-[#E2E8F0] pt-10 mb-12">
  <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
    Más información
  </span>

  <h2 className="text-2xl font-bold text-[#0F1B2B] mt-2 mb-6">
    También te puede interesar
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Link
      href="/que-revisar-carro-usado"
      className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors"
    >
      <h3 className="font-bold text-[#0F1B2B] mb-2">
        Qué revisar en un carro usado
      </h3>
      <p className="text-sm text-[#475569] leading-6">
        Consulta los principales componentes que debes revisar.
      </p>
    </Link>

    <Link
      href="/kilometraje-carro-usado"
      className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors"
    >
      <h3 className="font-bold text-[#0F1B2B] mb-2">
        Cómo revisar el kilometraje
      </h3>
      <p className="text-sm text-[#475569] leading-6">
        Aprende a interpretar el kilometraje de un vehículo usado.
      </p>
    </Link>

    <Link
      href="/antecedentes-vehiculo-colombia"
      className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors"
    >
      <h3 className="font-bold text-[#0F1B2B] mb-2">
        Antecedentes del vehículo
      </h3>
      <p className="text-sm text-[#475569] leading-6">
        Conoce qué información consultar antes de comprar.
      </p>
    </Link>
  </div>
</section>

        {/* CTA */}
        <section className="rounded-2xl bg-[#0F1B2B] px-6 py-8 md:px-10 md:py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            ¿Ya tienes un carro en mente?
          </h2>

          <p className="text-slate-300 leading-7 mb-6 max-w-2xl mx-auto">
            Realiza una evaluación preliminar y organiza los principales
            aspectos que debes revisar antes de comprar un vehículo usado.
          </p>

          <Link
            href="/evaluacion"
            className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-white text-[#0F1B2B] text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Iniciar evaluación
          </Link>
        </section>

        {/* Aviso */}
        <p className="text-xs text-slate-500 leading-6 mt-8">
          <strong>Aviso:</strong> La información de esta guía tiene carácter
          general y orientativo. Car Checker no sustituye un peritaje,
          diagnóstico o inspección técnica profesional del vehículo.
        </p>
      </article>
    </main>
  );
}