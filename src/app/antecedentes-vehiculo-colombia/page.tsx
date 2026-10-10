import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import {
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  ExternalLink,
  ClipboardCheck,
  Info,
  Search,
  FileText,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Antecedentes de un vehículo en Colombia: qué consultar antes de comprar | EscaneApp',
  description:
    'Guía completa para consultar antecedentes de un vehículo usado en Colombia: RUNT, SIMIT, Fasecolda, revisión documental, contraste de información y checklist.',
  alternates: {
    canonical: '/antecedentes-vehiculo-colombia',
  },
  openGraph: {
    title: 'Antecedentes de un vehículo en Colombia: qué consultar antes de comprar | EscaneApp',
    description:
      'Aprende qué consultar en RUNT, SIMIT y Fasecolda antes de comprar un carro usado en Colombia y cómo contrastar los antecedentes con el vehículo físico.',
    url: 'https://www.escaneapp.com/antecedentes-vehiculo-colombia',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'article',
  },
};

const articleStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': 'https://www.escaneapp.com/antecedentes-vehiculo-colombia#article',
  headline: 'Antecedentes de un vehículo en Colombia: qué consultar antes de comprar',
  description:
    'Guía completa para consultar antecedentes de un vehículo usado en Colombia: RUNT, SIMIT, Fasecolda, contraste de información y registro de hallazgos.',
  url: 'https://www.escaneapp.com/antecedentes-vehiculo-colombia',
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

export default function AntecedentesVehiculoColombiaPage() {
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
                Antecedentes de un vehículo
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA ESCANEAPP · ANTECEDENTES Y REVISIÓN DOCUMENTAL</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            Antecedentes de un vehículo en Colombia: qué consultar antes de comprar
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl mb-4">
            Antes de comprar un vehículo usado en Colombia, conviene revisar tanto su estado físico como la información disponible en fuentes oficiales y especializadas. Estas consultas pueden ayudarte a identificar diferencias en los datos del vehículo, revisar información sobre infracciones y buscar determinados antecedentes de siniestros.
          </p>

          <div className="p-4 rounded-xl bg-white border border-[#CBD5E1] text-xs sm:text-sm text-[#475569] leading-relaxed shadow-xs">
            Sin embargo, ninguna consulta aislada garantiza conocer todo el historial del automóvil. Lo recomendable es verificar varias fuentes, comparar sus resultados con los documentos y el vehículo físico, y pedir aclaraciones cuando encuentres inconsistencias.
          </div>
        </header>

        {/* La ruta de revisión en cuatro pasos */}
        <section className="mb-10">
          <div className="mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#123B5D] block mb-1">
              METODOLOGÍA SECUENCIAL
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              La ruta de revisión en cuatro pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {[
              {
                num: '01',
                title: 'Identifica.',
                desc: 'Reúne los datos del vehículo y la documentación disponible.',
              },
              {
                num: '02',
                title: 'Consulta.',
                desc: 'Accede a las fuentes pertinentes para cada tipo de información.',
              },
              {
                num: '03',
                title: 'Contrasta.',
                desc: 'Compara los resultados con los documentos, los datos del vendedor y el vehículo físico.',
              },
              {
                num: '04',
                title: 'Registra.',
                desc: 'Anota los resultados, las dudas pendientes y las comprobaciones que necesitas realizar.',
              },
            ].map((paso) => (
              <div
                key={paso.num}
                className="bg-white border border-[#CBD5E1] rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-[#123B5D]/40 transition-colors"
              >
                <div>
                  <span className="font-mono text-xs font-extrabold text-[#123B5D] px-2 py-0.5 rounded-md bg-[#123B5D]/10 inline-block mb-3">
                    PASO {paso.num}
                  </span>
                  <h3 className="text-base font-bold text-[#17212B] mb-1.5">
                    {paso.title}
                  </h3>
                  <p className="text-xs text-[#66727D] leading-relaxed">
                    {paso.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 1. Reúne los datos del vehículo */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              1
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Reúne los datos del vehículo
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Antes de iniciar las consultas, identifica correctamente el automóvil que estás evaluando. Ten a mano, según corresponda:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              'Placa.',
              'Marca, línea y modelo.',
              'Número de identificación vehicular (VIN), cuando esté disponible.',
              'Número de motor y chasis, si necesitas contrastarlos.',
              'Kilometraje que muestra el tablero.',
              'Licencia de tránsito y otros documentos suministrados por el vendedor.',
              'Información sobre propietarios anteriores, mantenimiento o reparaciones que el vendedor pueda respaldar documentalmente.',
            ].map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 text-xs sm:text-sm text-[#475569] leading-relaxed">
            Comprueba que los datos de los documentos correspondan al vehículo que tienes delante. Una diferencia puede deberse a un error que requiera aclaración, pero no debe ignorarse ni interpretarse automáticamente como fraude.
          </div>
        </section>

        {/* 2. Consulta las fuentes correspondientes */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-6">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              2
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Consulta las fuentes correspondientes
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Cada plataforma tiene un alcance diferente. Utiliza la fuente adecuada para la información que quieres verificar y ten presente qué aspectos no cubre.
          </p>

          <div className="space-y-5">
            {/* RUNT */}
            <div className="border border-[#CBD5E1] rounded-2xl p-5 sm:p-6 bg-[#F7F9FA] space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-[#CBD5E1] shrink-0 p-1 flex items-center justify-center">
                    <Image
                      src="/logo-runt.png"
                      alt="Logo oficial RUNT"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block">
                      REGISTRO VEHICULAR
                    </span>
                    <h3 className="text-lg font-bold text-[#17212B]">
                      RUNT: información registrada del vehículo
                    </h3>
                  </div>
                </div>

                <a
                  href="https://portalpublico.runt.gov.co/#/consulta-vehiculo/consulta/consulta-ciudadana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#123B5D] text-white text-xs font-bold hover:bg-[#0d2a42] transition-colors shrink-0"
                >
                  <span>Consultar el RUNT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                El Registro Único Nacional de Tránsito permite consultar información registrada sobre el vehículo y determinados datos relacionados con sus trámites. Según la consulta disponible, puedes contrastar información como la identificación del vehículo, sus características registradas y otros datos asociados.
              </p>

              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#17212B] leading-relaxed">
                <strong>Qué hacer:</strong> compara la información consultada con la licencia de tránsito y los identificadores del vehículo. Si encuentras diferencias, solicita una explicación y verifica los datos antes de avanzar.
              </div>

              <p className="text-xs text-[#66727D] leading-relaxed">
                La información disponible depende del servicio consultado. No des por hecho que una consulta pública equivale a un historial completo de propietarios, accidentes, reparaciones o kilometraje.
              </p>
            </div>

            {/* SIMIT */}
            <div className="border border-[#CBD5E1] rounded-2xl p-5 sm:p-6 bg-[#F7F9FA] space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-[#CBD5E1] shrink-0 p-1 flex items-center justify-center">
                    <Image
                      src="/logo-simit.png"
                      alt="Logo oficial SIMIT"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block">
                      INFRACCIONES Y COMPARENDOS
                    </span>
                    <h3 className="text-lg font-bold text-[#17212B]">
                      SIMIT: comparendos y multas de tránsito
                    </h3>
                  </div>
                </div>

                <a
                  href="https://www.fcm.org.co/simit/#/home-public"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#123B5D] text-white text-xs font-bold hover:bg-[#0d2a42] transition-colors shrink-0"
                >
                  <span>Consultar el SIMIT</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                El Sistema Integrado de Información sobre Multas y Sanciones por Infracciones de Tránsito permite consultar información relacionada con comparendos, multas y acuerdos registrados en el sistema. Los resultados de una consulta por placa deben interpretarse según los datos de cada registro y no como una atribución automática de responsabilidad al comprador o al propietario actual.
              </p>

              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#17212B] leading-relaxed">
                <strong>Qué hacer:</strong> revisa los resultados pertinentes e identifica el estado de cada registro. Antes de cerrar la negociación, aclara las obligaciones pendientes y verifica con la autoridad competente a quién corresponde cada una y qué efecto puede tener sobre los trámites. No atribuyas automáticamente todas las multas consultadas al vendedor o al vehículo sin comprobar los datos del registro.
              </div>

              <p className="text-xs text-[#66727D] leading-relaxed">
                El SIMIT no sustituye la consulta de la información registral del vehículo ni permite conocer por sí solo todo su historial jurídico.
              </p>
            </div>

            {/* Fasecolda */}
            <div className="border border-[#CBD5E1] rounded-2xl p-5 sm:p-6 bg-[#F7F9FA] space-y-3.5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-[#CBD5E1] shrink-0 p-1 flex items-center justify-center">
                    <Image
                      src="/logo-fasecolda.png"
                      alt="Logo oficial Fasecolda"
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#66727D] font-bold block">
                      HISTORIAL DE SINIESTROS
                    </span>
                    <h3 className="text-lg font-bold text-[#17212B]">
                      Fasecolda: consulta de determinados siniestros de vehículos asegurados
                    </h3>
                  </div>
                </div>

                <a
                  href="https://www.fasecolda.com/ramos/automoviles/camara/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#123B5D] text-white text-xs font-bold hover:bg-[#0d2a42] transition-colors shrink-0"
                >
                  <span>Consultar Fasecolda</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
                Fasecolda ofrece una consulta pública de reportes de pérdidas de mayor cuantía por daños derivados de colisiones desde 2008, bajo las condiciones de aseguramiento establecidas para el servicio.
              </p>

              <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#17212B] leading-relaxed">
                <strong>Qué hacer:</strong> consulta la placa y revisa el resultado. Si aparece un siniestro, solicita al vendedor documentación sobre el evento y las reparaciones realizadas. Si no aparece información, no concluyas que el vehículo nunca ha sufrido un accidente.
              </div>

              <p className="text-xs text-[#66727D] leading-relaxed">
                La ausencia de resultados no demuestra que el vehículo nunca haya sufrido un accidente. La consulta se limita a los reportes incluidos en el servicio y está condicionada por la información disponible y las condiciones de aseguramiento. Por ello, debe utilizarse como una fuente complementaria, no como un historial completo de siniestros.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Contrasta los resultados */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              3
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Contrasta los resultados
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Después de consultar las fuentes, compara los datos entre sí y con la documentación del vendedor. No te limites a guardar capturas de pantalla: identifica qué comprobaste, qué sigue pendiente y qué necesita una explicación.
          </p>

          {/* Tabla de contraste */}
          <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#123B5D] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Aspecto que revisas</th>
                  <th className="py-3 px-4 font-bold">Qué debes comparar</th>
                  <th className="py-3 px-4 font-bold">Qué hacer si encuentras diferencias</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">
                    Identificación del vehículo
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">
                    Placa, marca, línea, modelo y números de identificación disponibles.
                  </td>
                  <td className="py-3.5 px-4 text-[#66727D]">
                    Solicita aclaración y verifica los documentos y marcaciones físicas pertinentes.
                  </td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">
                    Información registral
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">
                    Datos disponibles en el RUNT y licencia de tránsito.
                  </td>
                  <td className="py-3.5 px-4 text-[#66727D]">
                    Comprueba que correspondan al mismo vehículo y aclara las discrepancias.
                  </td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">
                    Comparendos y multas
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">
                    Resultado de la consulta SIMIT y explicaciones del vendedor.
                  </td>
                  <td className="py-3.5 px-4 text-[#66727D]">
                    Verifica el estado de cada registro y las responsabilidades aplicables.
                  </td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">
                    Siniestros reportados
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">
                    Resultado de Fasecolda y antecedentes de reparaciones aportados.
                  </td>
                  <td className="py-3.5 px-4 text-[#66727D]">
                    Solicita soportes y considera una inspección especializada si hubo daños relevantes.
                  </td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B] whitespace-nowrap">
                    Estado físico
                  </td>
                  <td className="py-3.5 px-4 text-[#475569]">
                    Carrocería, interior, componentes mecánicos y señales de reparación.
                  </td>
                  <td className="py-3.5 px-4 text-[#66727D]">
                    Contrasta los hallazgos con la información disponible y pide una revisión profesional cuando corresponda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Señales que requieren comprobaciones adicionales */}
          <div className="pt-3 border-t border-[#E2E8F0] space-y-3">
            <h3 className="text-base font-bold text-[#17212B]">
              Señales que requieren comprobaciones adicionales
            </h3>
            <p className="text-xs sm:text-sm text-[#66727D]">
              Presta atención cuando:
            </p>

            <ul className="space-y-2">
              {[
                'Los datos de identificación no coinciden entre documentos y vehículo.',
                'El vendedor ofrece explicaciones contradictorias o no puede respaldar información importante.',
                'Aparece un siniestro que no había sido mencionado.',
                'Hay señales de reparación estructural que no se han explicado.',
                'Los documentos disponibles no permiten aclarar una discrepancia relevante.',
              ].map((senal, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#475569]">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{senal}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-xs text-amber-950 leading-relaxed font-medium">
              Estas situaciones no prueban por sí solas que exista fraude o que el vehículo sea inadecuado para comprar. Indican que necesitas obtener más información antes de tomar una decisión.
            </div>
          </div>
        </section>

        {/* 4. Registra lo que encontraste */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
            <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
              4
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
              Registra lo que encontraste
            </h2>
          </div>

          <p className="text-sm text-[#475569] leading-relaxed">
            Lleva un registro sencillo de las comprobaciones. Puedes utilizar una tabla como esta:
          </p>

          {/* Tabla de registro */}
          <div className="overflow-x-auto rounded-xl border border-[#CBD5E1]">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#123B5D] text-white font-mono text-xs uppercase">
                  <th className="py-3 px-4 font-bold">Consulta</th>
                  <th className="py-3 px-4 font-bold">Resultado</th>
                  <th className="py-3 px-4 font-bold">Pendiente</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">RUNT</td>
                  <td className="py-3.5 px-4 text-[#475569]">Datos contrastados</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Aclarar cualquier diferencia</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">SIMIT</td>
                  <td className="py-3.5 px-4 text-[#475569]">Estado de multas y comparendos revisado</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Confirmar las obligaciones que requieran atención</td>
                </tr>
                <tr className="hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">Fasecolda</td>
                  <td className="py-3.5 px-4 text-[#475569]">Resultado de la consulta de siniestros</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Solicitar soportes si aparece un reporte</td>
                </tr>
                <tr className="bg-[#F7F9FA]/60 hover:bg-[#F7F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#17212B]">Inspección física</td>
                  <td className="py-3.5 px-4 text-[#475569]">Observaciones iniciales registradas</td>
                  <td className="py-3.5 px-4 text-[#66727D]">Evaluación especializada si hay dudas</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
            Anota la fecha de cada consulta y conserva los soportes que puedas guardar. Los resultados pueden cambiar con el tiempo y cada servicio tiene sus propias condiciones de acceso y actualización.
          </p>

          <p className="text-xs text-[#66727D] leading-relaxed">
            Si una fuente no ofrece la información que necesitas, registra esa limitación en lugar de interpretar la ausencia de datos como confirmación de que no existen antecedentes.
          </p>
        </section>

        {/* Una consulta no sustituye una verificación profesional */}
        <section className="mb-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            Una consulta no sustituye una verificación profesional
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Las consultas de antecedentes y la revisión documental son una parte del proceso de evaluación. No permiten determinar por sí solas el estado mecánico, estructural o funcional completo de un vehículo.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Si encuentras información contradictoria, reportes de siniestros o señales de reparaciones importantes, considera solicitar una inspección profesional antes de comprometerte con la compra. También conviene revisar por separado los documentos y requisitos necesarios para formalizar la transferencia.
          </p>

          <div className="p-4 rounded-xl bg-[#F7F9FA] border border-[#CBD5E1] text-xs sm:text-sm text-[#17212B] leading-relaxed">
            <strong>La idea no es encontrar una única consulta que responda todas las preguntas, sino reunir evidencia suficiente para tomar una decisión informada.</strong> Si quedan dudas relevantes sin resolver, aplaza la decisión hasta aclararlas o evalúa otras opciones.
          </div>
        </section>

        {/* ¿Cómo puede ayudarte EscaneApp? */}
        <section className="my-10 bg-white border border-[#CBD5E1] p-6 sm:p-8 rounded-2xl shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            ¿Cómo puede ayudarte EscaneApp?
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            EscaneApp puede complementar este proceso mediante una evaluación preliminar estructurada del vehículo. La revisión física y el registro ordenado de observaciones pueden ayudarte a identificar aspectos que merecen atención.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Esta evaluación no reemplaza las consultas en las fuentes correspondientes, no certifica los antecedentes jurídicos ni garantiza que se detecten todos los daños o siniestros. Utilízala como apoyo dentro de una revisión más amplia del vehículo usado.
          </p>

          <div className="pt-2">
            <Link
              href="/evaluacion"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#123B5D] hover:bg-[#0d2a42] text-white text-sm font-bold transition-colors shadow-xs"
            >
              <span>Iniciar evaluación preliminar</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
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
              href="/costo-peritaje-colombia"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Cuánto cuesta un peritaje
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Tarifas de peritaje en Colombia, qué incluye cada paquete y preguntas clave.
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
                Decálogo metodológico antes de solicitar un peritaje.
              </p>
            </Link>

            <Link
              href="/kilometraje-carro-usado"
              className="bg-white border border-[#CBD5E1] rounded-2xl p-5 hover:border-[#123B5D] hover:shadow-xs transition-all group"
            >
              <h3 className="font-bold text-sm text-[#17212B] mb-1.5 group-hover:text-[#123B5D] transition-colors">
                Cómo revisar el kilometraje
              </h3>
              <p className="text-xs text-[#66727D] leading-relaxed">
                Aprende a interpretar el kilometraje y detectar inconsistencias.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="rounded-2xl bg-[#123B5D] px-6 py-10 sm:px-12 sm:py-12 text-center text-white shadow-md mb-8">
          <div className="max-w-xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Organiza tus hallazgos con EscaneApp
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Registra los datos y observaciones de tu revisión preliminar antes de avanzar hacia una inspección profesional.
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
          <strong>Aviso de orientación:</strong> Las consultas de antecedentes deben realizarse directamente en las plataformas oficiales o fuentes correspondientes. EscaneApp funciona como herramienta de organización y revisión preliminar y no sustituye las consultas oficiales ni un peritaje profesional.
        </p>
      </article>
    </div>
  );
}
