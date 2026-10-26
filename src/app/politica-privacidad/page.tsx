import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidad y Tratamiento de Datos | EscaneApp Colombia',
  description:
    'Conoce cómo protegemos tu privacidad en EscaneApp. Tus evaluaciones se quedan en tu dispositivo; no vendemos datos ni almacenamos contraseñas.',
  alternates: {
    canonical: '/politica-privacidad',
  },
  openGraph: {
    title: 'Política de Privacidad | EscaneApp',
    description:
      'Política de privacidad y protección de datos personales de EscaneApp bajo la Ley 1581 de 2012 de Colombia.',
    url: 'https://www.escaneapp.com/politica-privacidad',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/01_logo_horizontal_principal.png',
        width: 1200,
        height: 630,
        alt: 'Política de Privacidad EscaneApp',
      },
    ],
  },
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
      name: 'Política de Privacidad',
      item: 'https://www.escaneapp.com/politica-privacidad',
    },
  ],
};

export default function PoliticaPrivacidadPage() {
  return (
    <div className="w-full bg-[#FAFAFA] min-h-screen text-slate-800 antialiased py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* ==================================================== */}
        {/* ENCABEZADO EDITORIAL                                 */}
        {/* ==================================================== */}
        <header className="space-y-4 border-b border-slate-200/90 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-[11px] font-mono font-semibold uppercase tracking-wider w-fit">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>TRANSPARENCIA TOTAL · HABEAS DATA COLOMBIA (LEY 1581 DE 2012)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
            Política de Privacidad y Tratamiento de Datos
          </h1>

          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Última actualización vigente: 2026 · Proyecto independiente desarrollado en Colombia por AzulaDev.
          </p>
        </header>

        {/* ==================================================== */}
        {/* RESUMEN EN PALABRAS SENCILLAS                       */}
        {/* ==================================================== */}
        <div className="bg-emerald-50/50 border border-emerald-200 rounded-2xl p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-950 font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <h2 className="text-base font-bold text-emerald-950">Resumen en palabras sencillas (para leer en 30 segundos)</h2>
          </div>
          <ul className="text-xs sm:text-sm text-emerald-900 space-y-2 list-disc list-inside leading-relaxed">
            <li><strong>Tus revisiones son tuyas:</strong> Los datos del carro, fotos, notas y puntajes se guardan exclusivamente en la memoria de tu celular o computador (<code className="bg-white/80 px-1 py-0.5 rounded font-mono text-emerald-950">localStorage</code>). No los subimos a ninguna base de datos centralizada.</li>
            <li><strong>No pedimos registro:</strong> No necesitas crear cuenta, ni dejar tu cédula, ni poner contraseñas para usar el evaluador.</li>
            <li><strong>No vendemos datos:</strong> Nunca compartiremos tus datos con concesionarios, aseguradoras o vendedores para que te llamen a ofrecerte nada.</li>
            <li><strong>Bases oficiales seguras:</strong> Cuando consultas RUNT, SIMIT o Fasecolda, lo haces directamente en sus páginas oficiales; nosotros no guardamos tus consultas.</li>
          </ul>
        </div>

        {/* ==================================================== */}
        {/* SECCIONES LEGALES COMPLETAS                         */}
        {/* ==================================================== */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 md:p-10 border border-slate-200/90 shadow-2xs space-y-8 text-sm sm:text-base text-slate-600 leading-relaxed">
          
          {/* Sección 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">1</span>
              <span>Identificación del responsable del tratamiento</span>
            </h2>
            <p>
              EscaneApp es una plataforma digital de consulta e inspección vehicular preliminar desarrollada y operada de forma independiente en la República de Colombia por <strong>AzulaDev</strong>. Para cualquier inquietud sobre protección de datos o ejercicio de derechos de Habeas Data, puedes contactarnos al correo institucional:{' '}
              <a href="mailto:azuladev93@gmail.com" className="font-mono font-semibold text-slate-900 underline hover:text-emerald-700">
                azuladev93@gmail.com
              </a>.
            </p>
          </section>

          {/* Sección 2 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">2</span>
              <span>Información que introduces y almacenamiento en tu dispositivo</span>
            </h2>
            <p>
              Cuando realizas una evaluación en EscaneApp, puedes ingresar información sobre el vehículo (placa, modelo, kilometraje, ciudad, estado de latas, motor o multas consultadas en portales públicos).
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Smartphone className="w-4 h-4 text-slate-700" />
                <span>Almacenamiento 100% Local (Local Storage)</span>
              </div>
              <p>
                Dicha información se almacena <strong>únicamente en el almacenamiento local de tu propio navegador web</strong>. EscaneApp no transmite ni aloja estas fichas de evaluación en servidores propios. En el momento en que borres los datos de navegación de tu teléfono o computador, la información se eliminará por completo.
              </p>
            </div>
          </section>

          {/* Sección 3 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">3</span>
              <span>Enlaces y consultas a portales oficiales de terceros</span>
            </h2>
            <p>
              EscaneApp facilita enlaces directos hacia plataformas oficiales del Estado y gremios automotores en Colombia:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm pl-2">
              <li><strong>RUNT</strong> (Registro Único Nacional de Tránsito)</li>
              <li><strong>SIMIT</strong> (Federación Colombiana de Municipios - Comparendos)</li>
              <li><strong>Fasecolda</strong> (Historial de siniestros de aseguradoras)</li>
              <li><strong>Secretarías de Hacienda</strong> (Impuesto Vehicular departamental)</li>
            </ul>
            <p className="text-xs text-slate-500">
              Ten en cuenta que estos sitios web son completamente independientes de EscaneApp y se rigen bajo sus propios términos y políticas de tratamiento de datos. EscaneApp nunca te solicitará ni almacenará contraseñas privadas de esos portales.
            </p>
          </section>

          {/* Sección 4 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">4</span>
              <span>Cookies y publicidad de terceros (Google AdSense y Redes Asociadas)</span>
            </h2>
            <p>
              Para mantener la plataforma gratuita y accesible para todos los usuarios en Colombia, EscaneApp muestra anuncios publicitarios gestionados por proveedores externos, principalmente <strong>Google AdSense</strong>.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/90 text-xs sm:text-sm text-slate-700 space-y-2.5">
              <p>
                <strong>Uso de cookies y tecnología publicitaria:</strong> Google, como proveedor asociado externo, utiliza cookies (incluida la cookie de publicidad de Google o tecnologías asociadas) para publicar anuncios en nuestro sitio web. La utilización de estas cookies permite a Google y a sus socios comerciales mostrar anuncios a los usuarios en función de sus visitas a EscaneApp o a otros sitios de Internet.
              </p>
              <p>
                <strong>Control y exclusión voluntaria:</strong> Los usuarios pueden inhabilitar la publicidad personalizada en cualquier momento a través de la{' '}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 underline hover:text-emerald-700"
                >
                  Configuración de anuncios de Google
                </a>
                . De igual forma, pueden optar por inhabilitar el uso de cookies para publicidad basada en intereses por parte de proveedores externos visitando{' '}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 underline hover:text-emerald-700"
                >
                  AboutAds.info Choices
                </a>
                {' '}o consultar detalladamente la{' '}
                <a
                  href="https://policies.google.com/technologies/partner-sites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-slate-900 underline hover:text-emerald-700"
                >
                  Política de Privacidad y Términos de Google para sitios asociados
                </a>.
              </p>
            </div>
          </section>

          {/* Sección 5 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">5</span>
              <span>Tus derechos como titular (Habeas Data)</span>
            </h2>
            <p>
              Conforme a la Ley Estatutaria 1581 de 2012 y el Decreto 1377 de 2013 de la República de Colombia, te asisten los derechos a conocer, actualizar, rectificar y solicitar la supresión de cualquier información personal que eventualmente suministres a través de nuestros canales de contacto.
            </p>
            <p className="text-xs sm:text-sm text-slate-600">
              Para tramitar cualquier petición sobre tus datos, puedes dirigir una comunicación a nuestro correo{' '}
              <a href="mailto:azuladev93@gmail.com" className="font-mono font-bold text-slate-900 underline">
                azuladev93@gmail.com
              </a>, la cual será resuelta en los plazos establecidos por la legislación colombiana.
            </p>
          </section>

          {/* Sección 6 */}
          <section className="space-y-3 border-t border-slate-100 pt-6">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-800 text-xs font-mono font-bold flex items-center justify-center shrink-0">6</span>
              <span>Modificaciones a esta política</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Podemos actualizar periódicamente esta política para reflejar mejoras operativas o exigencias legales. La versión vigente siempre estará publicada en esta dirección con la fecha de última revisión visible.
            </p>
          </section>
        </div>

        {/* ==================================================== */}
        {/* BANNER DE NAVEGACIÓN COMPLEMENTARIA                 */}
        {/* ==================================================== */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 text-slate-600">
            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>¿Deseas conocer las condiciones de uso de la herramienta?</span>
          </div>
          <Link
            href="/terminos-condiciones"
            className="font-bold text-slate-900 hover:text-emerald-700 underline shrink-0 font-mono"
          >
            Ver Términos y Condiciones →
          </Link>
        </div>
      </article>
    </div>
  );
}
