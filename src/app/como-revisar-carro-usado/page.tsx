import Link from 'next/link';
import type { Metadata } from 'next';
import {
  FileText,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  AlertTriangle,
  HelpCircle,
  Wrench,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cómo revisar un carro usado en Colombia antes de comprarlo | EscaneApp',
  description:
    'Aprende qué revisar en un carro usado antes de comprarlo en Colombia: kilometraje, antecedentes, carrocería, motor, interior, prueba de ruta y posibles costos de reparación.',
  alternates: {
    canonical:
      'https://carchecker.kodiquett.com/como-revisar-carro-usado',
  },
  openGraph: {
    title: 'Cómo revisar un carro usado en Colombia antes de comprarlo | EscaneApp',
    description:
      'Guía práctica para revisar un vehículo usado antes de comprarlo y detectar posibles señales de alerta antes de realizar un peritaje profesional.',
    url: 'https://carchecker.kodiquett.com/como-revisar-carro-usado',
    siteName: 'EscaneApp Colombia',
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
    name: 'EscaneApp',
    url: 'https://carchecker.kodiquett.com',
  },
};

const PASOS_GUIA = [
  { id: 'datos-basicos', num: '1', title: 'Verifica los datos básicos del vehículo' },
  { id: 'kilometraje', num: '2', title: 'Revisa el kilometraje y desgaste' },
  { id: 'antecedentes', num: '3', title: 'Consulta los antecedentes y RUNT' },
  { id: 'carroceria', num: '4', title: 'Inspecciona la carrocería y pintura' },
  { id: 'motor', num: '5', title: 'Revisa el motor y componentes mecánicos' },
  { id: 'interior', num: '6', title: 'Revisa el habitáculo interior' },
  { id: 'prueba-ruta', num: '7', title: 'Realiza una prueba de ruta dinámica' },
  { id: 'costos', num: '8', title: 'Estima posibles costos de reparación' },
  { id: 'peritaje', num: '9', title: 'Cuándo solicitar un peritaje profesional' },
];

export default function ComoRevisarCarroUsadoPage() {
  return (
    <main className="w-full bg-[#F7F9FA] min-h-screen text-[#17212B]">
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
                Cómo revisar un carro usado
              </span>
            </li>
          </ol>
        </nav>

        {/* Encabezado */}
        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#123B5D]" />
            <span>GUÍA ESCANEAPP · METODOLOGÍA PRE-COMPRA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#17212B] leading-tight mb-4">
            Cómo revisar un carro usado en Colombia antes de comprarlo
          </h1>

          <p className="text-base sm:text-lg text-[#66727D] leading-relaxed max-w-3xl">
            Comprar un vehículo usado requiere revisar más que su apariencia exterior. Antes de tomar una decisión, conviene verificar sus datos, consultar antecedentes, inspeccionar componentes físicos y estimar costos de puesta a punto.
          </p>
        </header>

        {/* Introducción */}
        <section className="mb-8 bg-white border border-[#CBD5E1] p-5 sm:p-6 rounded-2xl shadow-xs text-sm sm:text-base text-[#475569] leading-relaxed space-y-3">
          <p>
            Una revisión preliminar permite identificar señales de riesgo que justifican una inspección más detallada. No se trata de sustituir un peritaje profesional, sino de contar con un filtro ordenado para descartar malas opciones antes de asumir gastos o compromisos de compra.
          </p>
          <p className="text-xs sm:text-sm text-[#66727D]">
            En esta guía encontrarás los 9 pasos metodológicos que puedes seguir antes de llevar un carro usado a un centro de diagnóstico automotriz.
          </p>
        </section>

        {/* Índice interactivo */}
        <nav
          aria-label="Contenido de la guía"
          className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-4 h-4 text-[#123B5D]" />
            <h2 className="text-base font-bold text-[#17212B]">
              Pasos de la metodología
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            {PASOS_GUIA.map((paso) => (
              <a
                key={paso.id}
                href={`#${paso.id}`}
                className="flex items-center gap-2.5 p-2 rounded-xl text-[#475569] hover:text-[#123B5D] hover:bg-[#F7F9FA] transition-colors"
              >
                <span className="w-5 h-5 rounded-md bg-[#123B5D]/10 text-[#123B5D] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {paso.num}
                </span>
                <span className="font-medium">{paso.title}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Secciones de contenido */}
        <div className="space-y-6">
          {/* 1 */}
          <section id="datos-basicos" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                1
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Verifica los datos básicos del vehículo
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Antes de revisar componentes mecánicos, comprueba que la información suministrada por el vendedor corresponda físicamente con el vehículo que estás inspeccionando.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Marca, línea y versión comercial exacta.',
                'Año modelo y año de matrícula en tarjeta de propiedad.',
                'Placa y municipio donde está matriculado.',
                'Número de chasis (VIN) en panorámico y carrocería.',
                'Tipo de combustible (gasolina, diésel, híbrido, gas).',
                'Tipo de transmisión (mecánica, automática, CVT).',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-[#66727D] pt-1">
              Cualquier diferencia entre la publicación y la tarjeta física debe aclararse antes de continuar.
            </p>
          </section>

          {/* 2 */}
          <section id="kilometraje" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                2
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Revisa el kilometraje
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              El kilometraje ayuda a contextualizar el uso que ha tenido un vehículo, pero nunca debe analizarse de manera aislada sin contrastarlo con el desgaste de piezas clave.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 flex items-start gap-3">
              <HelpCircle className="w-4 h-4 text-[#123B5D] shrink-0 mt-0.5" />
              <p className="text-xs text-[#475569] leading-relaxed">
                <strong>Regla de oro:</strong> Un promedio normal en Colombia es de 12.000 a 15.000 km por año. Un carro de 6 años con 25.000 km requiere sustento documental verificable. Consulta nuestra guía sobre{' '}
                <Link href="/kilometraje-carro-usado" className="font-bold text-[#123B5D] hover:underline">
                  cómo revisar el kilometraje →
                </Link>
              </p>
            </div>
          </section>

          {/* 3 */}
          <section id="antecedentes" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                3
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Consulta los antecedentes del vehículo
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Antes de transferir dinero para separar un vehículo, consulta su historial oficial en el Registro Único Nacional de Tránsito (RUNT) y el Sistema Integrado de Información sobre Multas (SIMIT).
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Historial de propietarios anteriores.',
                'Registro de siniestros o pérdidas de mayor cuantía.',
                'Medidas cautelares, embargos o prendas bancarias.',
                'Comparendos pendientes del propietario actual.',
                'Vigencia de SOAT y revisión técnico-mecánica.',
                'Historial de cancelaciones de matrícula o regrabaciones.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 4 */}
          <section id="carroceria" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                4
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Inspecciona la carrocería
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Examina la carrocería bajo la luz del día. Pasa la mano por los bordes de los guardabarros y observa las líneas de unión entre puertas y parales para detectar impactos pasados.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Diferencias de tono entre puertas, capó y guardabarros.',
                'Espaciado irregular entre paneles o farolas torcidas.',
                'Grumos de pintura, cáscara de naranja o cinta en cauchos.',
                'Tornillos de capó y guardabarros con pintura levantada.',
                'Puntos de soldadura no originales en el baúl.',
                'Desgaste parejo en los 4 neumáticos.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 5 */}
          <section id="motor" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                5
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Revisa el motor y los componentes mecánicos
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Abre el capó antes de encender el motor para verificar si está frío. Un motor previamente calentado por el vendedor puede ocultar problemas de arranque o fallas de inyección.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Nivel y aspecto del aceite (sin pasta lechosa).',
                'Color del refrigerante (nunca agua de la llave con óxido).',
                'Ausencia de manchas frescas de aceite en empaquetaduras.',
                'Encendido rápido sin chirridos de correa ni traqueteo.',
                'Ralentí parejo sin oscilaciones en la aguja de RPM.',
                'Ausencia de humo espeso al acelerar progresivamente.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 flex items-start gap-3 mt-3">
              <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Advertencia:</strong> Un compartimiento de motor lavado en exceso con desengrasante puede estar camuflando fugas activas de aceite o líquido de dirección.
              </p>
            </div>
          </section>

          {/* 6 */}
          <section id="interior" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                6
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Revisa el habitáculo interior
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              El estado de la cabina revela el trato y cuidado que tuvo el carro con sus anteriores dueños.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Firmeza y ausencia de holgura en asientos.',
                'Olor a humedad o moho debajo de tapetes (posible inundación).',
                'Elevavidrios, espejos y bloqueo central operativos.',
                'Funcionamiento del aire acondicionado en frío máximo.',
                'Mandos de timón, conectividad Bluetooth y parlantes.',
                'Testigos del tablero (todos deben encender y apagarse).',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 7 */}
          <section id="prueba-ruta" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                7
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Realiza una prueba de ruta dinámica
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Conducir el vehículo es imprescindible para detectar ruidos en el tren delantero, vibraciones en el pedal de freno o deslizamiento del embrague.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {[
                'Empuje continuo y respuesta al acelerador.',
                'Cambios de marcha precisos sin resistencia ni crujidos.',
                'Dirección firme que mantenga la trayectoria recta.',
                'Frenado estable sin vibración en el volante ni chillidos.',
                'Absorción de baches sin golpeteos metálicos secos.',
                'Temperatura del refrigerante estable en la mitad.',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2EAD68] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 8 */}
          <section id="costos" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                8
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                Estima posibles costos de reparación
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Una llanta desgastada, un juego de pastillas agotadas o la proximidad del cambio de correa de repartición representan gastos inminentes que debes descontar del precio de negociación.
            </p>

            <div className="rounded-xl border border-[#CBD5E1] bg-[#F7F9FA] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[#17212B] block">¿Quieres saber cuánto te costará mantener este vehículo?</span>
                <span className="text-xs text-[#66727D]">Calcula combustible, SOAT, impuestos y mantenimiento preventivo anual.</span>
              </div>
              <Link
                href="/cuanto-cuesta-mantener-carro-usado-colombia"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#123B5D] text-white text-xs font-bold hover:bg-[#0d2a42] shrink-0 transition-colors"
              >
                <span>Calcular costos TCO →</span>
              </Link>
            </div>
          </section>

          {/* 9 */}
          <section id="peritaje" className="rounded-2xl border border-[#CBD5E1] bg-white p-6 sm:p-7 shadow-xs scroll-mt-24 space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E2E8F0] pb-3">
              <span className="w-7 h-7 rounded-lg bg-[#123B5D] text-white text-xs font-bold font-mono flex items-center justify-center shrink-0">
                9
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                ¿Cuándo realizar un peritaje profesional?
              </h2>
            </div>

            <p className="text-sm text-[#475569] leading-relaxed">
              Si el vehículo aprueba tu inspección preliminar y el precio es acorde al mercado, el paso definitivo antes de firmar contrato de compraventa y realizar el traspaso es llevar el carro a un peritaje técnico profesional.
            </p>

            <p className="text-sm text-[#475569] leading-relaxed">
              Un centro especializado verificará con medidor de espesores si hubo choques estructurales en el chasis, medirá la compresión en los cilindros del motor y escaneará los módulos electrónicos para detectar códigos de falla ocultos.
            </p>
          </section>
        </div>

        {/* Conclusión */}
        <section className="my-10 bg-white border border-[#CBD5E1] p-6 sm:p-7 rounded-2xl shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#17212B]">
            Una revisión ordenada ayuda a tomar una decisión informada
          </h2>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            Revisar un carro usado implica observar diferentes aspectos y no depender de una sola señal. Los datos del vehículo, sus antecedentes, el estado físico, el comportamiento dinámico y los posibles costos de reparación deben analizarse conjuntamente.
          </p>

          <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
            EscaneApp te permite estructurar esta revisión preliminar para que identifiques el nivel de riesgo antes de comprometer tus ahorros.
          </p>
        </section>

        {/* Recursos relacionados */}
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
                Checklist visual de carrocería, luces, frenos y neumáticos.
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
                Aprende a interpretar el kilometraje y detectar alteraciones.
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
              ¿Ya tienes un carro en mente?
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Realiza una evaluación preliminar y organiza los principales aspectos que debes revisar antes de comprar con el asistente de EscaneApp.
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
          <strong>Aviso de orientación:</strong> La información de esta guía tiene carácter general y orientativo. EscaneApp no sustituye un peritaje, diagnóstico técnico especializado o inspección profesional del vehículo.
        </p>
      </article>
    </main>
  );
}