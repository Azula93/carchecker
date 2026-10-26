import type { Metadata } from 'next';
import { WizardContainer } from '../../components/wizard/WizardContainer';

export const metadata: Metadata = {
  title: 'Revisión y Peritaje Preliminar de Carro Usado',
  description:
    'Evalúa un carro usado paso a paso: kilometraje, antecedentes, inspección física y posibles costos de reparación antes de realizar un peritaje profesional.',
  alternates: {
    canonical: '/evaluacion',
  },
  openGraph: {
    title: 'Revisión y Peritaje Preliminar de Carro Usado | EscaneApp',
    description:
      'Realiza una evaluación preliminar de un carro usado en Colombia antes de comprarlo: 80 puntos técnicos, legales y costos.',
    url: 'https://www.escaneapp.com/evaluacion',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/01_logo_horizontal_principal.png',
        width: 1200,
        height: 630,
        alt: 'EscaneApp — Evaluación preliminar de carro usado',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Revisión y Peritaje Preliminar de Carro Usado | EscaneApp',
    description:
      'Realiza una evaluación preliminar de un carro usado en Colombia antes de comprarlo.',
    images: ['/01_logo_horizontal_principal.png'],
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
      name: 'Evaluación de vehículo',
      item: 'https://www.escaneapp.com/evaluacion',
    },
  ],
};

export default function EvaluacionPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <WizardContainer />
    </div>
  );
}