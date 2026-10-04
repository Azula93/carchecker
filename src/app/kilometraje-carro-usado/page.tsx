import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Gauge,
  AlertTriangle,
  ArrowRight,
  Info,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo revisar el kilometraje de un carro usado',
  description:
    'Aprende cómo analizar el kilometraje de un carro usado en Colombia, qué señales revisar y por qué el kilometraje debe compararse con el desgaste físico del vehículo.',
  alternates: {
    canonical: '/kilometraje-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar el kilometraje de un carro usado | EscaneApp',
    description:
      'Guía para interpretar el kilometraje de un vehículo usado y compararlo con su estado general antes de comprarlo en Colombia.',
    url: 'https://www.escaneapp.com/kilometraje-carro-usado',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://www.escaneapp.com/kilometraje-carro-usado#article',
  headline: 'Cómo revisar el kilometraje de un carro usado',
  description:
    'Guía para interpretar el kilometraje de un vehículo usado y compararlo con su estado general antes de comprarlo.',
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

export default function KilometrajeCarroUsadoPage() {
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
            Cómo revisar el kilometraje de un carro usado
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl">
            El kilometraje es uno de los datos que más se consulta al comprar un vehículo usado, pero interpretarlo correctamente requiere mirar mucho más que el simple número que aparece en el odómetro.
          </p>
        </header>

        {/* Indicador visual destacado */}
        <section className="mb-10">
          <div className="rounded-2xl border border-[#CBD5E1] bg-white p-6 md:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#66727D] font-bold block mb-1">
                  MÉTRICA DE REFERENCIA
                </span>
                <h2 className="text-2xl font-extrabold text-[#17212B]">
                  Promedio anual en Colombia
                </h2>
                <p className="text-xs text-[#66727D] mt-1">
                  Un vehículo particular promedio recorre entre 12.000 y 15.000 km por año.
                </p>
              </div>

              <div className="text-left sm:text-right bg-[#F7F9FA] sm:bg-transparent p-3 sm:p-0 rounded-xl">
                <span className="text-3xl md:text-4xl font-extrabold font-mono text-[#123B5D]">
                  ~13.500 <span className="text-lg font-bold">km</span>
                </span>
                <span className="text-xs text-[#66727D] block font-mono">
                  por año de uso
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-[#66727D]">
                <span>Bajo (&lt; 8.000 km/año)</span>
                <span className="font-bold text-[#123B5D]">Promedio estándar (12.000 - 15.000)</span>
                <span>Intensivo (&gt; 20.000 km/año)</span>
              </div>
              <div className="h-3 rounded-full bg-[#E2E8F0] overflow-hidden p-0.5">
                <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-[#8BCF3F] to-[#123B5D]" />
              </div>
            </div>

            <p className="text-xs text-[#66727D] mt-4 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-[#123B5D] shrink-0" />
              <span>El número por sí solo no determina el estado mecánico del motor ni la calidad del mantenimiento recibido.</span>
            </p>
          </div>
        </section>

        {/* Qué significa */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            ¿Qué significa realmente el kilometraje?
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            El kilometraje representa la distancia acumulada que registra el vehículo. Puede servir como referencia para entender el nivel de uso, pero debe analizarse junto con el mantenimiento, la edad del vehículo, sus condiciones de funcionamiento y el desgaste visible.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Por esta razón, comparar dos vehículos únicamente por sus kilómetros puede llevar a conclusiones erróneas: un carro con 90.000 km que transitó en carretera y tuvo mantenimientos rigurosos puede estar en mejor estado que uno con 40.000 km operado solo en trancones urbanos y con cambios de aceite postergados.
          </p>
        </section>

        {/* Tabla contextual */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-7 rounded-2xl shadow-xs space-y-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              El kilometraje debe analizarse en contexto
            </h2>
            <p className="text-xs text-[#66727D] mt-1">
              Compara el odómetro contra el desgaste físico comprobable en cabina:
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#123B5D] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Elemento</th>
                  <th className="py-3 px-4 font-bold">Qué observar</th>
                  <th className="py-3 px-4 font-bold">Qué comparar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">Kilometraje</td>
                  <td className="py-3.5 px-4 text-[#475569]">Número registrado en el odómetro digital o análogo.</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Edad del carro (años) y uso declarado por el dueño.</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">Desgaste interior</td>
                  <td className="py-3.5 px-4 text-[#475569]">Volante, gomas de pedales, laterales de asientos y pomo.</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Si tiene &lt; 50.000 km no debería tener cuero pelado ni pedales lisos.</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">Mantenimiento</td>
                  <td className="py-3.5 px-4 text-[#475569]">Facturas de cambio de aceite, correa y pastillas con fecha/km.</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Historial cronológico continuo sin baches de varios años.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Señales que merecen revisión adicional */}
        <section className="mb-10">
          <div className="mb-5">
            <span className="text-xs font-mono font-bold text-[#123B5D] uppercase tracking-wider block mb-1">
              DETECCIÓN DE ALERTAS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Señales que merecen una revisión adicional
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[#CBD5E1] bg-white rounded-2xl p-5 hover:border-[#123B5D]/40 shadow-xs transition-all space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-bold">
                SEÑAL 01
              </span>
              <h3 className="font-bold text-[#17212B] text-base">
                Desgaste que no parece coherente
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Un volante muy desgastado, pedales de freno con el caucho completamente liso o botoneras borradas en un carro que marca 45.000 km justifican sospechas de posible alteración de odómetro.
              </p>
            </div>

            <div className="border border-[#CBD5E1] bg-white rounded-2xl p-5 hover:border-[#123B5D]/40 shadow-xs transition-all space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-bold">
                SEÑAL 02
              </span>
              <h3 className="font-bold text-[#17212B] text-base">
                Información difícil de comprobar
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Si el vendedor afirma que el carro solo se usaba los fines de semana pero no existen registros de talleres ni stickers de cambio de aceite en el marco de la puerta, pide soportes técnicos adicionales.
              </p>
            </div>

            <div className="border border-[#CBD5E1] bg-white rounded-2xl p-5 hover:border-[#123B5D]/40 shadow-xs transition-all space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-bold">
                SEÑAL 03
              </span>
              <h3 className="font-bold text-[#17212B] text-base">
                Diferencias entre registros y vehículo
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                En revisiones técnico-mecánicas anteriores o registros de aseguradoras suele quedar constancia del kilometraje. Si un registro previo marca más que el odómetro actual, hay una alerta grave.
              </p>
            </div>

            <div className="border border-[#CBD5E1] bg-white rounded-2xl p-5 hover:border-[#123B5D]/40 shadow-xs transition-all space-y-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-bold">
                SEÑAL 04
              </span>
              <h3 className="font-bold text-[#17212B] text-base">
                Kilometraje como único argumento de venta
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Un kilometraje bajo no demuestra por sí mismo que el vehículo esté en mejores condiciones. La falta de uso prolongado reseca empaques, pudre mangueras y deteriora la gasolina en el tanque.
              </p>
            </div>
          </div>
        </section>

        {/* Error común */}
        <section className="mb-10">
          <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 sm:p-6 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-900 font-bold block">
                ERROR FRECUENTE DE COMPRA
              </span>
              <h2 className="text-base sm:text-lg font-bold text-amber-950">
                Elegir el vehículo guiándose únicamente por los kilómetros
              </h2>
              <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
                El kilometraje es un indicador, no un diagnóstico. Debe interpretarse junto con la edad del carro, el estado de la suspensión, la compresión de motor y la información legal disponible en el RUNT.
              </p>
            </div>
          </div>
        </section>

        {/* Conclusión */}
        <section className="mb-12 bg-white border border-[#CBD5E1] p-6 sm:p-7 rounded-2xl shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            ¿Qué hacer si el kilometraje genera dudas?
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Registra la observación y compárala con los demás elementos de la revisión física. Si existen inconsistencias relevantes, es conveniente solicitar un escaneo computarizado con escáner OBD2 en peritaje profesional antes de realizar cualquier desembolso de dinero.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            EscaneApp te permite registrar el kilometraje y cotejarlo con el desgaste reportado para generar una calificación estructurada del vehículo.
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
              href="/que-revisar-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Qué revisar en un carro usado
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Lista de inspección de motor, carrocería, frenos e interior.
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
                Aprende la metodología secuencial antes del peritaje.
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