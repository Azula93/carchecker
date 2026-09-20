export const metadata = {
  title: 'Términos y Condiciones | Car Checker Colombia',
  description:
    'Términos y condiciones de uso de Car Checker Colombia, herramienta de revisión preliminar de vehículos usados.',
};

export default function TerminosCondicionesPage() {
  return (
    <main className="w-full bg-[#F8FAFC] py-12 md:py-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 md:p-12">
          <span className="text-xs font-mono uppercase tracking-wider text-[#64748B]">
            Información legal
          </span>

          <h1 className="text-3xl md:text-4xl font-bold text-[#0F1B2B] mt-2 mb-4">
            Términos y Condiciones
          </h1>

          <p className="text-sm text-[#64748B] mb-10">
            Última actualización: 20 de septiembre de 2026
          </p>

          <div className="space-y-8 text-sm md:text-base text-[#475569] leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                1. Aceptación de los términos
              </h2>
              <p>
                Al acceder y utilizar Car Checker Colombia, el usuario acepta
                estos términos y condiciones. Si no está de acuerdo con alguno
                de ellos, debe abstenerse de utilizar la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                2. Naturaleza del servicio
              </h2>
              <p>
                Car Checker es una herramienta de revisión preliminar diseñada
                para ayudar al usuario a identificar posibles señales de alerta
                relacionadas con un vehículo usado antes de realizar un
                peritaje profesional.
              </p>
              <p className="mt-3">
                La herramienta no constituye un peritaje, diagnóstico mecánico,
                certificación comercial ni dictamen técnico o judicial.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                3. Resultados de la evaluación
              </h2>
              <p>
                Los resultados, puntuaciones, estimaciones y cálculos
                proporcionados por Car Checker tienen carácter orientativo.
              </p>
              <p className="mt-3">
                El usuario debe verificar la información obtenida y utilizar
                su propio criterio antes de tomar decisiones relacionadas con
                la compra de un vehículo.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                4. Información de fuentes externas
              </h2>
              <p>
                Car Checker proporciona enlaces hacia fuentes externas como
                RUNT, SIMIT y Fasecolda para facilitar la consulta de
                información relacionada con los vehículos.
              </p>
              <p className="mt-3">
                La información presentada en dichos sitios es responsabilidad
                de sus respectivos operadores. Car Checker no garantiza la
                disponibilidad, exactitud, integridad o actualización de la
                información publicada por terceros.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                5. Responsabilidad del usuario
              </h2>
              <p>
                El usuario es responsable de la información que introduce en la
                plataforma y de las decisiones que tome utilizando los
                resultados de la herramienta.
              </p>
              <p className="mt-3">
                La utilización de Car Checker no sustituye la revisión
                documental, legal, mecánica o estructural realizada por
                profesionales especializados.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                6. Almacenamiento local
              </h2>
              <p>
                Actualmente, Car Checker no utiliza una base de datos propia
                para almacenar las evaluaciones. La información puede
                almacenarse localmente en el navegador del usuario mediante
                localStorage.
              </p>
              <p className="mt-3">
                El usuario comprende que dicha información depende del
                dispositivo y navegador utilizados y puede perderse al
                eliminar los datos locales del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                7. Disponibilidad del servicio
              </h2>
              <p>
                Car Checker puede modificar, actualizar, suspender o retirar
                funcionalidades de la plataforma en cualquier momento, cuando
                sea necesario para su mantenimiento, seguridad o evolución.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                8. Propiedad intelectual
              </h2>
              <p>
                El diseño, código, contenidos, elementos gráficos, estructura y
                demás componentes propios de Car Checker están protegidos por
                las normas aplicables de propiedad intelectual.
              </p>
              <p className="mt-3">
                No está permitido copiar, reproducir, modificar, distribuir o
                explotar comercialmente los componentes propios de la
                plataforma sin autorización.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                9. Modificaciones
              </h2>
              <p>
                Estos términos pueden actualizarse cuando cambien las
                funcionalidades, servicios o condiciones de utilización de
                Car Checker.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#0F1B2B] mb-3">
                10. Contacto
              </h2>
              <p>
                Para consultas relacionadas con estos términos y condiciones,
                el usuario podrá utilizar el medio de contacto oficial que se
                habilite en Car Checker.
              </p>
            </section>

            <section className="border-t border-[#E2E8F0] pt-6">
              <p className="text-xs md:text-sm text-[#64748B]">
                Car Checker es una herramienta de revisión preliminar y no
                reemplaza un peritaje profesional del vehículo.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  );
}