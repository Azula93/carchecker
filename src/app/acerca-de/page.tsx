import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Acerca de EscaneApp",
  description:
    "Conoce qué es EscaneApp, quién lo desarrolla y cómo te ayuda a revisar un carro usado en Colombia antes de comprarlo.",
  alternates: {
    canonical: "/acerca-de",
  },
};

export default function AcercaDePage() {
  return (
    <div className="w-full bg-[#F8FAFC] py-12 md:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 md:p-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
            Información
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0F1B2B] mt-2 mb-8">
            Acerca de EscaneApp
          </h1>

          <div className="space-y-8 text-sm md:text-base text-[#475569] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                Qué es EscaneApp
              </h2>
              <p>
                EscaneApp es una herramienta gratuita para revisar un carro
                usado en Colombia antes de comprarlo. Te guía para verificar el
                kilometraje, consultar antecedentes en fuentes oficiales,
                inspeccionar el vehículo con una lista de 80 puntos y estimar
                posibles costos de reparación.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                Por qué existe
              </h2>
              <p>
                EscaneApp nace de la necesidad de tener a la mano información
                clave al momento de comprar un carro usado. Es una plataforma
                pensada para quienes quieren decidir con más seguridad antes de
                invertir su dinero. Con EscaneApp puedes obtener un primer
                vistazo del estado del vehículo y de sus posibles costos, sin
                necesidad de ser experto en mecánica ni tener conocimientos
                avanzados sobre el tema.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                Quién la desarrolla
              </h2>
              <p>
                EscaneApp es un proyecto independiente desarrollado en Colombia
                por AzulaDev, con el objetivo de brindar a los usuarios una
                herramienta confiable y accesible para la revisión de vehículos
                usados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                De dónde sale la información
              </h2>
              <p>
                Los antecedentes del vehículo se consultan directamente en
                fuentes oficiales como RUNT, SIMIT y Fasecolda. EscaneApp
                facilita el proceso y te ayuda a organizar los hallazgos, pero
                no almacena claves ni reemplaza esas consultas.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                Qué no es EscaneApp
              </h2>
              <p>
                EscaneApp es una revisión preliminar. No es un peritaje, ni un
                diagnóstico mecánico, ni una certificación comercial. Aún Si la
                revisión no muestra señales de alerta y vas a comprar, un
                peritaje profesional sigue siendo el paso recomendado.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                Cómo se financia
              </h2>
              <p>
                El uso de la herramienta es gratuito. El sitio puede mostrar
                publicidad de terceros para cubrir sus costos. Puedes leer más
                en nuestra{" "}
                <Link
                  href="/politica-privacidad"
                  className="font-bold text-[#123B5D] hover:underline"
                >
                  Política de Privacidad
                </Link>
                .
              </p>
            </section>

            <section className="border-t border-[#E2E8F0] pt-6">
              <p>
                ¿Dudas, errores o sugerencias? Escríbenos desde la página de{" "}
                <Link
                  href="/contacto"
                  className="font-bold text-[#123B5D] hover:underline"
                >
                  contacto
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
