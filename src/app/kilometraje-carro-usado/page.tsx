import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo revisar el kilometraje de un carro usado',
  description:
    'Aprende cómo analizar el kilometraje de un carro usado, qué señales revisar y por qué el kilometraje debe compararse con el estado general del vehículo.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/kilometraje-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar el kilometraje de un carro usado',
    description:
      'Guía para interpretar el kilometraje de un vehículo usado y compararlo con su estado general antes de comprarlo.',
    url: 'https://carchecker.kodiquett.com/kilometraje-carro-usado',
    siteName: 'Car Checker Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://carchecker.kodiquett.com/kilometraje-carro-usado#article',
  headline: 'Cómo revisar el kilometraje de un carro usado',
  description:
    'Guía para interpretar el kilometraje de un vehículo usado y compararlo con su estado general antes de comprarlo.',
  url: 'https://carchecker.kodiquett.com/kilometraje-carro-usado',
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

export default function KilometrajeCarroUsadoPage() {
  return (
    <main className="w-full bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />

      <article className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-16">

        {/* Header */}
        <header className="mb-10">
          <p className="text-sm font-mono font-semibold text-[#166534] mb-3">
            GUÍA CAR CHECKER · KILOMETRAJE
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F1B2B] leading-tight mb-5">
            Cómo revisar el kilometraje de un carro usado
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-8">
            El kilometraje es uno de los datos que más se consulta al comprar
            un vehículo usado, pero interpretarlo correctamente requiere mirar
            más que el número que aparece en el tablero.
          </p>
        </header>

        {/* Indicador visual */}
        <section className="mb-12">
          <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-6 md:p-8">
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                  Dato a evaluar
                </span>

                <h2 className="text-2xl font-bold text-[#0F1B2B] mt-1">
                  Kilometraje
                </h2>
              </div>

              <div className="text-right">
                <span className="block text-3xl md:text-4xl font-bold font-mono text-[#0F1B2B]">
                  km
                </span>
                <span className="text-xs text-[#64748B]">
                  recorrido registrado
                </span>
              </div>
            </div>

            <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
              <div className="h-full w-2/3 bg-[#0F1B2B]" />
            </div>

            <p className="text-xs text-slate-500 mt-4">
              El número por sí solo no determina el estado real del vehículo.
            </p>
          </div>
        </section>

        {/* Qué significa */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            ¿Qué significa realmente el kilometraje?
          </h2>

          <p className="text-slate-700 leading-8 mb-5">
            El kilometraje representa la distancia acumulada que registra el
            vehículo. Puede servir como referencia para entender el nivel de
            uso, pero debe analizarse junto con el mantenimiento, la edad del
            vehículo, sus condiciones de funcionamiento y el desgaste visible.
          </p>

          <p className="text-slate-700 leading-8">
            Por esta razón, comparar dos vehículos únicamente por sus
            kilómetros puede llevar a conclusiones incorrectas.
          </p>
        </section>

        {/* Tabla */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-5">
            El kilometraje debe analizarse en contexto
          </h2>

          <div className="overflow-hidden rounded-xl border border-[#E2E8F0]">
            <div className="grid grid-cols-3 bg-[#0F1B2B] text-white text-xs font-mono uppercase tracking-wider">
              <div className="p-4">Dato</div>
              <div className="p-4">Qué observar</div>
              <div className="p-4">Qué comparar</div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#E2E8F0] text-sm">
              <div className="p-4 font-semibold text-[#0F1B2B]">
                Kilometraje
              </div>
              <div className="p-4 text-slate-600">
                Número registrado en el vehículo.
              </div>
              <div className="p-4 text-slate-600">
                Edad y uso declarado.
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#E2E8F0] text-sm bg-[#F8FAFC]">
              <div className="p-4 font-semibold text-[#0F1B2B]">
                Desgaste
              </div>
              <div className="p-4 text-slate-600">
                Volante, pedales, asientos y controles.
              </div>
              <div className="p-4 text-slate-600">
                Kilometraje indicado.
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#E2E8F0] text-sm">
              <div className="p-4 font-semibold text-[#0F1B2B]">
                Mantenimiento
              </div>
              <div className="p-4 text-slate-600">
                Registros y trabajos realizados.
              </div>
              <div className="p-4 text-slate-600">
                Historial del vehículo.
              </div>
            </div>
          </div>
        </section>

        {/* Señales */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-5">
            Señales que merecen una revisión adicional
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="border border-[#E2E8F0] rounded-xl p-5">
              <span className="text-xs font-mono text-[#64748B]">
                SEÑAL 01
              </span>

              <h3 className="font-bold text-[#0F1B2B] mt-2 mb-2">
                Desgaste que no parece coherente
              </h3>

              <p className="text-sm text-[#475569] leading-7">
                Un desgaste considerable en elementos de contacto puede
                justificar preguntas adicionales sobre el uso y mantenimiento
                del vehículo.
              </p>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl p-5">
              <span className="text-xs font-mono text-[#64748B]">
                SEÑAL 02
              </span>

              <h3 className="font-bold text-[#0F1B2B] mt-2 mb-2">
                Información difícil de comprobar
              </h3>

              <p className="text-sm text-[#475569] leading-7">
                Si el vendedor no puede explicar claramente el historial de
                mantenimiento, conviene solicitar información adicional.
              </p>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl p-5">
              <span className="text-xs font-mono text-[#64748B]">
                SEÑAL 03
              </span>

              <h3 className="font-bold text-[#0F1B2B] mt-2 mb-2">
                Diferencias entre documentos y vehículo
              </h3>

              <p className="text-sm text-[#475569] leading-7">
                Cualquier inconsistencia debe aclararse antes de continuar con
                la negociación.
              </p>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl p-5">
              <span className="text-xs font-mono text-[#64748B]">
                SEÑAL 04
              </span>

              <h3 className="font-bold text-[#0F1B2B] mt-2 mb-2">
                Kilometraje como único argumento
              </h3>

              <p className="text-sm text-[#475569] leading-7">
                Un kilometraje bajo no demuestra por sí mismo que el vehículo
                se encuentre en mejores condiciones.
              </p>
            </div>

          </div>
        </section>

        {/* Error común */}
        <section className="mb-12">
          <div className="rounded-xl border-l-4 border-[#B45309] bg-[#FFFBEB] p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E]">
              Error común
            </span>

            <h2 className="text-xl font-bold text-[#0F1B2B] mt-2 mb-3">
              Elegir el vehículo únicamente por sus kilómetros
            </h2>

            <p className="text-sm text-[#475569] leading-7">
              El kilometraje es un indicador, no un diagnóstico. Debe
              interpretarse junto con la edad del vehículo, su mantenimiento,
              el desgaste visible, su comportamiento y la información
              disponible sobre sus antecedentes.
            </p>
          </div>
        </section>

        {/* Conclusión */}
        <section className="border-t border-slate-200 pt-10 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            ¿Qué hacer si el kilometraje genera dudas?
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Registra la observación y compárala con los demás elementos de la
            revisión. Si existen inconsistencias relevantes, es conveniente
            solicitar información adicional y considerar una inspección
            profesional antes de realizar la compra.
          </p>

          <p className="text-slate-700 leading-8">
            Car Checker permite registrar el kilometraje y relacionarlo con
            otros aspectos de la evaluación preliminar.
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
      href="/como-revisar-carro-usado"
      className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors"
    >
      <h3 className="font-bold text-[#0F1B2B] mb-2">
        Cómo revisar un carro usado
      </h3>
      <p className="text-sm text-[#475569] leading-6">
        Aprende a revisar un carro usado antes de comprarlo.
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
            Evalúa el vehículo de forma estructurada
          </h2>

          <p className="text-slate-300 leading-7 mb-6 max-w-2xl mx-auto">
            Registra el kilometraje y continúa con los demás puntos de la
            revisión preliminar.
          </p>

          <Link
            href="/evaluacion"
            className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-white text-[#0F1B2B] text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Iniciar evaluación
          </Link>
        </section>

        <p className="text-xs text-slate-500 leading-6 mt-8">
          <strong>Aviso:</strong> La información de esta guía es general y
          orientativa. El kilometraje no permite determinar por sí solo el
          estado mecánico de un vehículo y no sustituye una inspección
          profesional.
        </p>
      </article>
    </main>
  );
}