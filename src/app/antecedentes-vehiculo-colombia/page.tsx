import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Antecedentes de un vehículo en Colombia: qué consultar antes de comprar",
  description:
    "Conoce qué información revisar sobre los antecedentes de un vehículo usado en Colombia y cómo organizar las consultas antes de comprarlo.",
  alternates: {
    canonical:
      "https://carchecker.kodiquett.com/antecedentes-vehiculo-colombia",
  },
  openGraph: {
    title:
      "Antecedentes de un vehículo en Colombia: qué consultar antes de comprar",
    description:
      "Guía práctica para organizar la revisión de antecedentes de un vehículo usado antes de comprarlo.",
    url: "https://carchecker.kodiquett.com/antecedentes-vehiculo-colombia",
    siteName: "Car Checker Colombia",
    locale: "es_CO",
    type: "article",
  },
};

const articleStructuredData = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id":
    "https://carchecker.kodiquett.com/antecedentes-vehiculo-colombia#article",
  headline:
    "Antecedentes de un vehículo en Colombia: qué consultar antes de comprar",
  description:
    "Guía práctica para organizar la revisión de antecedentes de un vehículo usado antes de comprarlo.",
  url: "https://carchecker.kodiquett.com/antecedentes-vehiculo-colombia",
  inLanguage: "es-CO",
  isPartOf: {
    "@id": "https://carchecker.kodiquett.com/#webapp",
  },
  publisher: {
    "@type": "Organization",
    name: "Car Checker",
    url: "https://carchecker.kodiquett.com",
  },
};

export default function AntecedentesVehiculoColombiaPage() {
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
            GUÍA CAR CHECKER · ANTECEDENTES
          </p>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-[#0F1B2B] leading-tight mb-5">
            Antecedentes de un vehículo en Colombia: qué consultar antes de
            comprar
          </h1>

          <p className="text-lg md:text-xl text-slate-600 leading-8">
            Antes de comprar un vehículo usado no basta con revisar su estado
            físico. También es importante verificar la información disponible
            sobre el vehículo y contrastarla con los datos proporcionados por el
            vendedor.
          </p>
        </header>

        {/* Flujo visual */}
        <section className="mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              ["01", "Identifica", "Reúne los datos del vehículo."],
              ["02", "Consulta", "Revisa las fuentes disponibles."],
              ["03", "Contrasta", "Compara la información obtenida."],
              ["04", "Registra", "Anota hallazgos e inconsistencias."],
            ].map(([number, title, text]) => (
              <div
                key={number}
                className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5"
              >
                <span className="font-mono text-xs text-[#64748B]">
                  {number}
                </span>

                <h2 className="text-base font-bold text-[#0F1B2B] mt-2 mb-2">
                  {title}
                </h2>

                <p className="text-xs text-[#475569] leading-6">{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Datos necesarios */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            1. Reúne primero los datos del vehículo
          </h2>

          <p className="text-slate-700 leading-8 mb-5">
            Antes de realizar consultas, identifica correctamente el vehículo
            que estás evaluando. La información disponible dependerá del trámite
            o servicio que estés consultando.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Placa",
              "Marca y línea",
              "Modelo",
              "Kilometraje",
              "Información suministrada por el vendedor",
              "Documentación disponible",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border border-[#E2E8F0] rounded-lg p-4"
              >
                <span className="w-2 h-2 rounded-full bg-[#0F1B2B]" />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Fuentes */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-5">
            2. Consulta las fuentes correspondientes
          </h2>

          <p className="text-slate-700 leading-8 mb-6">
            No toda la información relacionada con un vehículo se encuentra en
            un mismo lugar. Dependiendo de lo que quieras verificar, puedes
            necesitar consultar diferentes plataformas o fuentes.
          </p>

          <div className="space-y-4">
            <div className="border border-[#E2E8F0] rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    FUENTE OFICIAL
                  </span>

                  <h3 className="text-lg font-bold text-[#0F1B2B] mt-1">
                    RUNT
                  </h3>
                </div>

                <a
                  href="https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#64748B] hover:text-[#0F1B2B] transition-colors"
                >
                  CONSULTAR ↗
                </a>
              </div>

              <p className="text-sm text-[#475569] leading-7">
                Utiliza los canales oficiales correspondientes para consultar la
                información disponible sobre el vehículo y sus trámites.
              </p>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    INFRACCIONES
                  </span>

                  <h3 className="text-lg font-bold text-[#0F1B2B] mt-1">
                    SIMIT
                  </h3>
                </div>

                <a
                  href="https://www.fcm.org.co/simit/#/home-public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#64748B] hover:text-[#0F1B2B] transition-colors"
                >
                  CONSULTAR ↗
                </a>
              </div>

              <p className="text-sm text-[#475569] leading-7">
                Consulta la información disponible relacionada con infracciones
                y comparendos mediante los canales oficiales.
              </p>
            </div>

            <div className="border border-[#E2E8F0] rounded-xl p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#64748B]">
                    REFERENCIA DEL VEHÍCULO
                  </span>

                  <h3 className="text-lg font-bold text-[#0F1B2B] mt-1">
                    Fasecolda
                  </h3>
                </div>

                <a
                  href="https://www.fasecolda.com/ramos/automoviles/historial-de-accidentes-de-vehiculos-asegurados/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#64748B] hover:text-[#0F1B2B] transition-colors"
                >
                  CONSULTAR ↗
                </a>
              </div>

              <p className="text-sm text-[#475569] leading-7">
                Puedes utilizar herramientas y fuentes especializadas para
                consultar información de referencia relacionada con vehículos.
              </p>
            </div>
          </div>
        </section>

        {/* Contrastar */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            3. Contrasta la información
          </h2>

          <p className="text-slate-700 leading-8 mb-5">
            Consultar una fuente no significa que la revisión haya terminado. El
            siguiente paso consiste en comparar la información obtenida con los
            datos proporcionados por el vendedor y con lo observado físicamente
            en el vehículo.
          </p>

          <div className="rounded-xl overflow-hidden border border-[#E2E8F0]">
            <div className="grid grid-cols-3 bg-[#0F1B2B] text-white text-xs font-mono uppercase tracking-wider">
              <div className="p-4">Información</div>
              <div className="p-4">Comparar con</div>
              <div className="p-4">Si no coincide</div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#E2E8F0] text-sm">
              <div className="p-4 font-semibold text-[#0F1B2B]">
                Datos del vehículo
              </div>
              <div className="p-4 text-slate-600">
                Documentación y vehículo físico.
              </div>
              <div className="p-4 text-slate-600">Solicitar aclaración.</div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#E2E8F0] bg-[#F8FAFC] text-sm">
              <div className="p-4 font-semibold text-[#0F1B2B]">
                Información consultada
              </div>
              <div className="p-4 text-slate-600">
                Información del vendedor.
              </div>
              <div className="p-4 text-slate-600">
                Investigar antes de avanzar.
              </div>
            </div>

            <div className="grid grid-cols-3 border-t border-[#E2E8F0] text-sm">
              <div className="p-4 font-semibold text-[#0F1B2B]">
                Estado físico
              </div>
              <div className="p-4 text-slate-600">
                Historial y mantenimiento.
              </div>
              <div className="p-4 text-slate-600">
                Considerar inspección profesional.
              </div>
            </div>
          </div>
        </section>

        {/* Señales */}
        <section className="mb-12">
          <div className="rounded-xl border-l-4 border-[#B45309] bg-[#FFFBEB] p-6">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#92400E]">
              Señales para detenerse y verificar
            </span>

            <ul className="mt-4 space-y-3 text-sm text-[#475569] leading-7 list-disc pl-5">
              <li>
                Información del vehículo que no coincide entre diferentes
                fuentes.
              </li>
              <li>Datos que el vendedor no puede explicar o respaldar.</li>
              <li>
                Diferencias importantes entre el estado físico y la información
                proporcionada.
              </li>
              <li>
                Antecedentes que requieren una aclaración antes de continuar.
              </li>
            </ul>
          </div>
        </section>

        {/* Importante */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F1B2B] mb-4">
            Una consulta no sustituye una verificación profesional
          </h2>

          <p className="text-slate-700 leading-8 mb-4">
            Las consultas de antecedentes y la revisión documental son una parte
            del proceso de evaluación. No permiten determinar por sí solas el
            estado mecánico, estructural o funcional completo de un vehículo.
          </p>

          <p className="text-slate-700 leading-8">
            Cuando existen dudas relevantes, una inspección profesional puede
            aportar información adicional antes de tomar una decisión de compra.
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
              href="/como-revisar-carro-usado"
              className="border border-[#E2E8F0] rounded-xl p-5 hover:border-[#0F1B2B] transition-colors"
            >
              <h3 className="font-bold text-[#0F1B2B] mb-2">
                Cómo revisar un carro usado
              </h3>
              <p className="text-sm text-[#475569] leading-6">
                Conoce qué revisar antes de comprar un vehículo usado.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-[#0F1B2B] px-6 py-8 md:px-10 md:py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Organiza tus hallazgos con Car Checker
          </h2>

          <p className="text-slate-300 leading-7 mb-6 max-w-2xl mx-auto">
            Registra los datos y observaciones de tu revisión preliminar antes
            de avanzar hacia una inspección profesional.
          </p>

          <Link
            href="/evaluacion"
            className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-white text-[#0F1B2B] text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Iniciar evaluación
          </Link>
        </section>

        <p className="text-xs text-slate-500 leading-6 mt-8">
          <strong>Aviso:</strong> Las consultas de antecedentes deben realizarse
          directamente en las plataformas oficiales o fuentes correspondientes.
          Car Checker funciona como herramienta de organización y revisión
          preliminar y no sustituye las consultas oficiales ni un peritaje
          profesional.
        </p>
      </article>
    </main>
  );
}
