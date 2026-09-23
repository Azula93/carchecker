import Link from 'next/link';
import type { Metadata } from 'next';
import { CalculadoraCostoReal } from '@/components/calculator/CalculadoraCostoReal';

export const metadata: Metadata = {
  title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
  description:
    'Calcula cuánto cuesta realmente mantener un carro usado en Colombia. Incluye gasolina, SOAT, tecnomecánica, impuestos, mantenimiento, reparaciones y otros gastos.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia',
  },
  openGraph: {
    title: '¿Cuánto cuesta mantener un carro usado en Colombia?',
    description:
      'Calcula cuánto cuesta realmente mantener un carro usado en Colombia. Incluye gasolina, SOAT, tecnomecánica, impuestos, mantenimiento, reparaciones y otros gastos.',
    url: 'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia',
    siteName: 'Car Checker Colombia',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id':
    'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia#article',
  headline: '¿Cuánto cuesta mantener un carro usado en Colombia?',
  description:
    'Calcula cuánto cuesta realmente mantener un carro usado en Colombia. Incluye gasolina, SOAT, tecnomecánica, impuestos, mantenimiento, reparaciones y otros gastos.',
  url: 'https://carchecker.kodiquett.com/cuanto-cuesta-mantener-carro-usado-colombia',
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

const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto es lo mínimo para mantener un carro en Colombia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para un carro pequeño y económico que se use poco (menos de 600 km al mes), el costo mínimo suele rondar entre $500.000 y $700.000 COP al mes, sumando SOAT, tecnomecánica, impuestos proporcionales, mantenimiento básico y gasolina.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué gasta más: gasolina o mantenimiento?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En la mayoría de los casos, la gasolina representa el gasto continuo más alto. Sin embargo, un daño mayor en motor, caja de cambios o suspensión puede superar en un solo pago varios meses de combustible.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Conviene comprar un carro usado si gano el salario mínimo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Mantener un carro en Colombia suele requerir al menos el 50% o más de un salario mínimo legal vigente cada mes, únicamente en gastos de uso y mantenimiento (sin contar cuotas de compra). Para la mayoría de personas en ese rango de ingresos, los gastos del vehículo pueden representar una carga financiera importante.',
      },
    },
  ],
};

export default function CuantoCuestaMantenerCarroUsadoPage() {
  return (
    <main className="w-full bg-white">
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

      <article className="max-w-4xl mx-auto px-5 sm:px-6 py-10 md:py-16">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-[#475569]">
            <li>
              <Link href="/" className="hover:text-[#0F1B2B] transition-colors">
                Inicio
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">/</li>
            <li>
              <span className="text-[#0F1B2B] font-medium">
                Costo de mantener un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado Principal */}
        <header className="mb-10">
          <p className="text-xs sm:text-sm font-mono font-semibold text-[#166534] mb-3 tracking-wide">
            GUÍA CAR CHECKER · COSTOS Y MANTENIMIENTO
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F1B2B] leading-tight mb-6">
            ¿Cuánto cuesta mantener un carro usado en Colombia?
          </h1>

          <p className="text-lg md:text-xl text-[#475569] leading-relaxed">
            Comprar un carro usado no significa solamente pagar el precio acordado con el vendedor. Después de la compra aparecen gastos que pueden repetirse cada mes, cada año o de forma inesperada.
          </p>
        </header>

        {/* Introducción */}
        <section className="prose prose-slate max-w-none text-slate-700 leading-8 mb-12">
          <p className="mb-5">
            Gasolina, SOAT, revisión tecnomecánica, impuesto vehicular, mantenimiento, reparaciones, parqueadero y peajes forman parte del costo de tener un vehículo.
          </p>
          <p className="mb-5">
            Por eso, antes de comprar un carro usado, conviene responder una pregunta más completa:
          </p>
          <div className="p-5 rounded-xl bg-[#F8FAFC] border-l-4 border-[#0F1B2B] my-6">
            <p className="text-xl font-bold text-[#0F1B2B] m-0">
              ¿Cuánto me va a costar realmente tener y usar este vehículo?
            </p>
          </div>
          <p>
            El valor depende del tipo de carro, su antigüedad, el kilometraje recorrido cada mes y la ciudad donde circule.
          </p>
        </section>

        {/* Gastos fijos obligatorios */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            Gastos fijos obligatorios de un carro en Colombia
          </h2>
          <p className="text-slate-700 leading-8 mb-6">
            Hay gastos que existen por el simple hecho de tener el vehículo, se use mucho o poco.
          </p>

          <div className="space-y-6">
            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white hover:border-slate-300 transition-colors">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">1</span>
                SOAT
              </h3>
              <p className="text-slate-700 leading-7 mb-3">
                El Seguro Obligatorio de Accidentes de Tránsito debe pagarse una vez al año.
              </p>
              <p className="text-slate-700 leading-7">
                El valor cambia según la categoría del vehículo, cilindraje y modelo. Para automóviles suele ubicarse de forma general entre <strong>$450.000 y $900.000 COP</strong> al año, aunque puede ser mayor según el tipo de carro.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white hover:border-slate-300 transition-colors">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">2</span>
                Revisión tecnomecánica
              </h3>
              <p className="text-slate-700 leading-7 mb-3">
                Es obligatoria para garantizar condiciones mínimas de seguridad y emisiones contaminantes.
              </p>
              <p className="text-slate-700 leading-7">
                En vehículos particulares suele empezar a exigirse a partir del quinto o sexto año de matrícula (según la normativa vigente al momento de la revisión) y luego se renueva cada año. Costo aproximado: entre <strong>$280.000 y $350.000 COP</strong> al año.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white hover:border-slate-300 transition-colors">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">3</span>
                Impuesto vehicular
              </h3>
              <p className="text-slate-700 leading-7 mb-3">
                Se paga anualmente ante el departamento correspondiente según el avalúo comercial del vehículo.
              </p>
              <p className="text-slate-700 leading-7 mb-3">
                Para la mayoría de vehículos particulares la tarifa suele ser del 1.5% del valor comercial, aunque puede subir al 2.5% o 3.5% en vehículos de mayor valor.
              </p>
              <div className="bg-[#F8FAFC] rounded-lg p-3.5 border border-[#E2E8F0] text-sm text-[#475569]">
                <strong>Ejemplo aproximado:</strong> Un vehículo avaluado en $30.000.000 COP pagaría cerca de <strong>$450.000 COP</strong> al año.
              </div>
            </div>
          </div>
        </section>

        {/* Gastos variables */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            Gastos variables según el uso
          </h2>
          <p className="text-slate-700 leading-8 mb-6">
            Estos gastos dependen directamente de cuánto se use el vehículo y por dónde circule.
          </p>

          <div className="space-y-6">
            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">1</span>
                Gasolina
              </h3>
              <p className="text-slate-700 leading-7 mb-3">
                La gasolina suele ser el gasto recurrente más alto. Depende del consumo del vehículo (km por galón) y del kilometraje mensual.
              </p>
              <div className="bg-[#F8FAFC] rounded-lg p-4 border border-[#E2E8F0] text-sm text-[#475569] leading-relaxed">
                <p className="font-semibold text-[#0F1B2B] mb-1">Ejemplo típico en Colombia:</p>
                <p>
                  Un carro que recorre 1.000 km al mes y rinde 35 km por galón consumirá cerca de 28.5 galones al mes. Con una gasolina de referencia cercana a $16.000 COP por galón, el gasto mensual ronda los <strong>$457.000 COP</strong> ($5.480.000 COP al año).
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">2</span>
                Mantenimiento preventivo
              </h3>
              <p className="text-slate-700 leading-7 mb-3">
                Todo carro requiere cambios periódicos para seguir funcionando correctamente:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 mb-3 text-sm sm:text-base">
                <li>Cambio de aceite y filtro (cada 5.000 a 10.000 km)</li>
                <li>Filtros de aire y combustible</li>
                <li>Pastillas de freno</li>
                <li>Alineación y balanceo</li>
                <li>Rotación de llantas</li>
              </ul>
              <p className="text-slate-700 leading-7">
                Un promedio razonable para un carro particular suele ubicarse entre <strong>$800.000 y $1.800.000 COP</strong> al año si no hay daños mayores.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">3</span>
                Reparaciones imprevistas
              </h3>
              <p className="text-slate-700 leading-7 mb-3">
                En carros usados siempre existe la posibilidad de que aparezcan piezas desgastadas:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-slate-700 mb-3 text-sm sm:text-base">
                <li>Batería (cada 2 a 3 años)</li>
                <li>Llantas (cada 40.000 a 60.000 km)</li>
                <li>Suspensión (amortiguadores, bujes, terminales)</li>
                <li>Embrague (clutch)</li>
                <li>Sistema de refrigeración</li>
              </ul>
              <p className="text-slate-700 leading-7">
                Tener un fondo de reserva de <strong>$1.000.000 a $2.500.000 COP</strong> al año para imprevistos es una práctica recomendada al comprar un carro usado.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-6 bg-white">
              <h3 className="text-xl font-bold text-[#0F1B2B] mb-2 flex items-center gap-2">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#F1F5F9] text-[#0F1B2B] text-sm font-bold">4</span>
                Parqueadero, peajes y lavado
              </h3>
              <ul className="space-y-2 text-slate-700 leading-relaxed text-sm sm:text-base">
                <li><strong>Parqueadero mensual o por horas:</strong> $100.000 a $300.000 COP al mes según ciudad y zona.</li>
                <li><strong>Lavado:</strong> $30.000 a $80.000 COP al mes.</li>
                <li><strong>Peajes:</strong> variable según los viajes por carretera.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cálculo estimado: cuánto cuesta mantener un carro al año */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            Cálculo estimado: cuánto cuesta mantener un carro al año
          </h2>
          <p className="text-slate-700 leading-8 mb-6">
            Veamos un ejemplo representativo para un automóvil particular promedio en Colombia (recorrido estimado de 12.000 km al año):
          </p>

          <div className="border border-[#E2E8F0] rounded-xl overflow-hidden mb-6 shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#0F1B2B] text-white font-medium">
                  <tr>
                    <th scope="col" className="p-3.5">Concepto</th>
                    <th scope="col" className="p-3.5 text-right">Costo mensual estimado</th>
                    <th scope="col" className="p-3.5 text-right">Costo anual estimado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] bg-white">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">Gasolina (aprox. 1.000 km/mes)</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$450.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$5.400.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">SOAT</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$55.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$660.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">Revisión tecnomecánica</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$27.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$320.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">Impuesto vehicular</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$42.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$500.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">Mantenimiento preventivo</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$100.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$1.200.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">Imprevistos y desgaste</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$125.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$1.500.000</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-medium text-[#0F1B2B]">Parqueadero y lavado</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$180.000</td>
                    <td className="p-3.5 text-right font-mono text-slate-700">$2.160.000</td>
                  </tr>
                  <tr className="bg-[#F8FAFC] font-bold">
                    <td className="p-3.5 text-[#0F1B2B]">Total estimado</td>
                    <td className="p-3.5 text-right font-mono text-[#0F1B2B] text-base">$979.000</td>
                    <td className="p-3.5 text-right font-mono text-[#0F1B2B] text-base">$11.740.000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-100 text-slate-700 text-sm md:text-base leading-relaxed border border-slate-200">
            Esto significa que mantener un carro usado en Colombia suele costar entre <strong>$800.000 y $1.300.000 COP al mes</strong>, aun cuando el vehículo ya esté pagado y no tenga cuota de crédito.
          </div>
        </section>

        {/* Calculadora de costo real del vehículo */}
        <section id="calculadora" className="mb-16 scroll-mt-10">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-3">
              Calculadora de costo real del vehículo
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Utiliza esta calculadora para estimar el costo mensual y anual de tener tu próximo vehículo. Puedes seleccionar tu ciudad para obtener el precio de referencia de la gasolina o ajustar los valores según tu caso.
            </p>
          </div>

          {/* Componente Interactivo */}
          <div className="my-8">
            <CalculadoraCostoReal />
          </div>
        </section>

        {/* Consejos para reducir el costo */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-6">
            Consejos para reducir el costo de mantener un carro usado
          </h2>

          <div className="space-y-6">
            <div className="border-l-2 border-[#166534] pl-4">
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-1">
                1. Revisa el estado del vehículo antes de comprar
              </h3>
              <p className="text-slate-700 leading-7 text-sm sm:text-base">
                Un carro barato que requiera cambiar llantas, suspensión y embrague puede terminar costando varios millones más durante el primer año. Consulta nuestra guía sobre{' '}
                <Link
                  href="/que-revisar-carro-usado"
                  className="font-medium text-[#166534] hover:underline underline-offset-4"
                >
                  qué revisar en un carro usado
                </Link>{' '}
                y evalúa las alertas antes de cerrar el negocio.
              </p>
            </div>

            <div className="border-l-2 border-[#166534] pl-4">
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-1">
                2. Consulta los antecedentes antes de pagar
              </h3>
              <p className="text-slate-700 leading-7 text-sm sm:text-base">
                Asegúrate de que el vehículo esté al día en impuestos y no tenga multas pendientes que debas asumir. Aprende cómo{' '}
                <Link
                  href="/antecedentes-vehiculo-colombia"
                  className="font-medium text-[#166534] hover:underline underline-offset-4"
                >
                  consultar antecedentes de un vehículo en Colombia
                </Link>.
              </p>
            </div>

            <div className="border-l-2 border-[#166534] pl-4">
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-1">
                3. Conduce de forma eficiente
              </h3>
              <p className="text-slate-700 leading-7 text-sm sm:text-base">
                Evitar aceleraciones bruscas, mantener la presión correcta de las llantas y no cargar peso innecesario puede reducir el consumo de gasolina entre un 10% y un 20%.
              </p>
            </div>

            <div className="border-l-2 border-[#166534] pl-4">
              <h3 className="text-lg font-bold text-[#0F1B2B] mb-1">
                4. No descuides los cambios de aceite
              </h3>
              <p className="text-slate-700 leading-7 text-sm sm:text-base">
                Cambiar el aceite a tiempo es una de las formas más económicas de prevenir daños costosos en el motor.
              </p>
            </div>
          </div>
        </section>

        {/* Preguntas frecuentes */}
        <section className="mb-14">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-6">
            Preguntas frecuentes sobre el costo de mantener un carro en Colombia
          </h2>

          <div className="space-y-5">
            <div className="rounded-xl border border-[#E2E8F0] p-5 bg-[#F8FAFC]">
              <h3 className="font-bold text-[#0F1B2B] text-base sm:text-lg mb-2">
                ¿Cuánto es lo mínimo para mantener un carro en Colombia?
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Para un carro pequeño y económico que se use poco (menos de 600 km al mes), el costo mínimo suele rondar entre $500.000 y $700.000 COP al mes, sumando SOAT, tecnomecánica, impuestos proporcionales, mantenimiento básico y gasolina.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-5 bg-[#F8FAFC]">
              <h3 className="font-bold text-[#0F1B2B] text-base sm:text-lg mb-2">
                ¿Qué gasta más: gasolina o mantenimiento?
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                En la mayoría de los casos, la gasolina representa el gasto continuo más alto. Sin embargo, un daño mayor en motor, caja de cambios o suspensión puede superar en un solo pago varios meses de combustible.
              </p>
            </div>

            <div className="rounded-xl border border-[#E2E8F0] p-5 bg-[#F8FAFC]">
              <h3 className="font-bold text-[#0F1B2B] text-base sm:text-lg mb-2">
                ¿Conviene comprar un carro usado si gano el salario mínimo?
              </h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Mantener un carro en Colombia suele requerir al menos el 50% o más de un salario mínimo legal vigente cada mes, únicamente en gastos de uso y mantenimiento (sin contar cuotas de compra). Para la mayoría de personas en ese rango de ingresos, los gastos del vehículo pueden representar una carga financiera importante.
              </p>
            </div>
          </div>
        </section>

        {/* Artículos relacionados */}
        <section className="mb-14 border-t border-[#E2E8F0] pt-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#475569]">
            RECURSOS RELACIONADOS
          </span>

          <h2 className="text-2xl font-bold text-[#0F1B2B] mt-2 mb-6">
            También te puede interesar
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/que-revisar-carro-usado"
              className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors group"
            >
              <h3 className="font-bold text-[#0F1B2B] mb-2 group-hover:text-[#166534] transition-colors">
                Qué revisar en un carro usado
              </h3>
              <p className="text-sm text-[#475569] leading-6">
                Consulta los principales componentes que debes inspeccionar antes de comprar.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors group"
            >
              <h3 className="font-bold text-[#0F1B2B] mb-2 group-hover:text-[#166534] transition-colors">
                Revisión del kilometraje
              </h3>
              <p className="text-sm text-[#475569] leading-6">
                Aprende cómo interpretar el kilometraje y compararlo con el desgaste real.
              </p>
            </Link>

            <Link
              href="/antecedentes-vehiculo-colombia"
              className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors group"
            >
              <h3 className="font-bold text-[#0F1B2B] mb-2 group-hover:text-[#166534] transition-colors">
                Antecedentes del vehículo
              </h3>
              <p className="text-sm text-[#475569] leading-6">
                Conoce qué información jurídica, multas e historial consultar antes de pagar.
              </p>
            </Link>
          </div>
        </section>

        {/* Llamado a la Acción (CTA) */}
        <section className="rounded-2xl bg-[#0F1B2B] px-6 py-8 md:px-10 md:py-10 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Evalúa tu próximo carro usado antes de comprarlo
          </h2>

          <p className="text-slate-300 leading-7 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
            El costo de mantener un carro depende en gran medida del estado en el que lo compres. Usa la lista de chequeo de CarCheck para detectar señales de alerta antes de tomar una decisión.
          </p>

          <Link
            href="/evaluacion"
            className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-white text-[#0F1B2B] text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Iniciar evaluación
          </Link>
        </section>

        {/* Aviso de Alcance Legal */}
        <p className="text-xs text-[#475569] leading-6">
          <strong>Aviso de orientación:</strong> Los cálculos y valores presentados en este artículo y herramienta interactiva corresponden a estimaciones y referencias promedio para Colombia. No constituyen una cotización formal ni sustituyen una inspección técnica o peritaje profesional.
        </p>
      </article>
    </main>
  );
}
