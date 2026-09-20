import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Qué revisar en un carro usado antes de comprarlo',
  description:
    'Conoce qué revisar en un carro usado antes de comprarlo: carrocería, motor, transmisión, interior, neumáticos, sistema eléctrico, documentos y prueba de ruta.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/que-revisar-carro-usado',
  },
  openGraph: {
    title: 'Qué revisar en un carro usado antes de comprarlo',
    description:
      'Lista práctica de los principales componentes que debes revisar antes de comprar un vehículo usado en Colombia.',
    url: 'https://carchecker.kodiquett.com/que-revisar-carro-usado',
    siteName: 'Car Checker Colombia',
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
    name: 'Car Checker',
    url: 'https://carchecker.kodiquett.com',
  },
};

export default function QueRevisarCarroUsadoPage() {
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
            Qué revisar en un carro usado antes de comprarlo
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-8">
            Antes de comprar un vehículo usado conviene revisar diferentes
            componentes y no concentrarse únicamente en su apariencia. Esta
            guía presenta los principales puntos que puedes verificar durante
            una revisión preliminar.
          </p>
        </header>

        {/* Introducción */}
        <section className="mb-10">
          <p className="text-slate-700 leading-8 mb-5">
            Un vehículo puede presentar un buen aspecto exterior y, al mismo
            tiempo, tener elementos que requieren atención. Por eso es útil
            realizar una revisión ordenada que incluya la carrocería, el
            compartimiento del motor, el interior, los neumáticos, los
            sistemas visibles y su documentación.
          </p>

          <p className="text-slate-700 leading-8">
            Esta revisión tiene carácter preliminar. Una evaluación visual no
            permite determinar por sí sola el estado interno de todos los
            sistemas del vehículo.
          </p>
        </section>

        {/* Índice */}
        <nav
          aria-label="Contenido de la guía"
          className="rounded-xl border border-slate-200 bg-slate-50 p-6 mb-12"
        >
          <h2 className="text-lg font-bold text-[#0F1B2B] mb-4">
            Qué revisar
          </h2>

          <ol className="space-y-2 text-sm text-slate-700 list-decimal list-inside">
            <li>
              <a href="#carroceria" className="hover:underline">
                Carrocería y pintura
              </a>
            </li>
            <li>
              <a href="#vidrios-luces" className="hover:underline">
                Vidrios, espejos y luces
              </a>
            </li>
            <li>
              <a href="#neumaticos" className="hover:underline">
                Neumáticos y ruedas
              </a>
            </li>
            <li>
              <a href="#motor" className="hover:underline">
                Motor y fluidos
              </a>
            </li>
            <li>
              <a href="#transmision" className="hover:underline">
                Transmisión y comportamiento mecánico
              </a>
            </li>
            <li>
              <a href="#interior" className="hover:underline">
                Interior y equipamiento
              </a>
            </li>
            <li>
              <a href="#electrico" className="hover:underline">
                Sistema eléctrico y tablero
              </a>
            </li>
            <li>
              <a href="#prueba-ruta" className="hover:underline">
                Prueba de ruta
              </a>
            </li>
            <li>
              <a href="#documentacion" className="hover:underline">
                Documentación y antecedentes
              </a>
            </li>
          </ol>
        </nav>

        {/* 1 */}
        <section id="carroceria" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            1. Carrocería y pintura
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Observa la carrocería con buena iluminación y desde diferentes
            ángulos. El objetivo es identificar diferencias visibles entre las
            distintas piezas.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Diferencias de color o tonalidad.</li>
            <li>Golpes, rayones o abolladuras.</li>
            <li>Desalineación entre paneles.</li>
            <li>Señales visibles de reparación o repintado.</li>
            <li>Estado de puertas, capó y baúl.</li>
            <li>Corrosión visible.</li>
          </ul>
        </section>

        {/* 2 */}
        <section id="vidrios-luces" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            2. Vidrios, espejos y luces
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Revisa visualmente los elementos exteriores que intervienen en la
            visibilidad y señalización del vehículo.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Estado del parabrisas y demás vidrios.</li>
            <li>Grietas o impactos visibles.</li>
            <li>Estado de los espejos.</li>
            <li>Faros delanteros.</li>
            <li>Luces traseras y direccionales.</li>
            <li>Luces de freno y reversa.</li>
          </ul>
        </section>

        {/* 3 */}
        <section id="neumaticos" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            3. Neumáticos y ruedas
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Los neumáticos permiten observar algunas condiciones relacionadas
            con el desgaste y el mantenimiento del vehículo.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Desgaste de la banda de rodamiento.</li>
            <li>Desgaste irregular.</li>
            <li>Daños visibles en los neumáticos.</li>
            <li>Estado de los rines.</li>
            <li>Presencia de golpes o deformaciones visibles.</li>
            <li>Estado de la llanta de repuesto, si aplica.</li>
          </ul>
        </section>

        {/* 4 */}
        <section id="motor" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            4. Motor y fluidos
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            La inspección visual del compartimiento del motor puede ayudar a
            identificar algunas señales que requieren una revisión más
            profunda.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Fugas visibles.</li>
            <li>Estado aparente de mangueras y conexiones.</li>
            <li>Condición visible de depósitos y niveles.</li>
            <li>Estado de la batería.</li>
            <li>Ruidos anormales durante el encendido.</li>
            <li>Humo o emisiones visibles fuera de lo esperado.</li>
          </ul>

          <div className="rounded-xl border-l-4 border-[#166534] bg-slate-50 p-5 mt-5">
            <p className="text-slate-700 leading-7">
              <strong>Importante:</strong> una inspección visual no permite
              determinar por sí sola el estado interno del motor. Los
              problemas mecánicos requieren una evaluación técnica adecuada.
            </p>
          </div>
        </section>

        {/* 5 */}
        <section id="transmision" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            5. Transmisión y comportamiento mecánico
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Durante la conducción presta atención al comportamiento general
            del vehículo y a cualquier señal que se aparte de su funcionamiento
            esperado.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Cambios de marcha.</li>
            <li>Ruidos o vibraciones.</li>
            <li>Respuesta durante la aceleración.</li>
            <li>Comportamiento de la dirección.</li>
            <li>Respuesta del sistema de frenos.</li>
            <li>Comportamiento de la suspensión.</li>
          </ul>
        </section>

        {/* 6 */}
        <section id="interior" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            6. Interior y equipamiento
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            El habitáculo también debe formar parte de la revisión. Además
            del estado estético, verifica el funcionamiento de los elementos
            que puedas probar.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Estado de los asientos.</li>
            <li>Desgaste del volante y pedales.</li>
            <li>Cinturones de seguridad.</li>
            <li>Vidrios eléctricos.</li>
            <li>Seguros y cerraduras.</li>
            <li>Sistema de climatización.</li>
            <li>Sistema multimedia.</li>
            <li>Controles del vehículo.</li>
          </ul>
        </section>

        {/* 7 */}
        <section id="electrico" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            7. Sistema eléctrico y tablero
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Al encender el vehículo, observa el comportamiento del tablero y
            verifica los sistemas eléctricos que puedan probarse.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Testigos del tablero.</li>
            <li>Indicadores de funcionamiento.</li>
            <li>Luces interiores.</li>
            <li>Claxon.</li>
            <li>Controles eléctricos.</li>
            <li>Equipamiento disponible en el vehículo.</li>
          </ul>
        </section>

        {/* 8 */}
        <section id="prueba-ruta" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            8. Prueba de ruta
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Si las condiciones son adecuadas y el propietario permite realizar
            la prueba, conduce el vehículo prestando atención a su
            comportamiento.
          </p>

          <ul className="space-y-3 text-slate-700 leading-7 list-disc pl-6">
            <li>Arranque y respuesta del motor.</li>
            <li>Cambios de transmisión.</li>
            <li>Dirección.</li>
            <li>Frenado.</li>
            <li>Suspensión.</li>
            <li>Ruidos y vibraciones.</li>
            <li>Comportamiento de los testigos.</li>
          </ul>
        </section>

        {/* 9 */}
        <section id="documentacion" className="mb-12 scroll-mt-24">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            9. Documentación y antecedentes
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            La revisión no debe limitarse al estado físico del automóvil.
            También es importante comprobar la información disponible sobre
            el vehículo mediante las fuentes oficiales y especializadas
            correspondientes.
          </p>

          <p className="text-slate-700 leading-8">
            Antes de avanzar con la compra, verifica que la información
            suministrada por el vendedor sea coherente con los datos
            disponibles y consulta las plataformas oficiales que correspondan.
          </p>
        </section>

        {/* Resumen */}
        <section className="border-t border-slate-200 pt-10 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            Checklist rápido antes de comprar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Datos básicos del vehículo',
              'Kilometraje',
              'Carrocería y pintura',
              'Vidrios y luces',
              'Neumáticos y ruedas',
              'Motor y fluidos',
              'Transmisión',
              'Interior y equipamiento',
              'Sistema eléctrico',
              'Prueba de ruta',
              'Documentación',
              'Antecedentes',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg border border-slate-200 p-4"
              >
                <span className="w-5 h-5 rounded border border-slate-300 shrink-0" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
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
      href="/como-revisar-carro-usado"
      className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors"
    >
      <h3 className="font-bold text-[#0F1B2B] mb-2">
        Cómo revisar en un carro usado
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
            Organiza tu revisión con Car Checker
          </h2>

          <p className="text-slate-300 leading-7 mb-6 max-w-2xl mx-auto">
            Utiliza nuestra herramienta para registrar los principales
            aspectos de la revisión preliminar de un vehículo usado.
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
          <strong>Aviso:</strong> Esta información tiene carácter general y
          orientativo. Car Checker no sustituye un peritaje, diagnóstico o
          inspección técnica profesional del vehículo.
        </p>
      </article>
    </main>
  );
}