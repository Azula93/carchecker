import type { Metadata } from 'next';
import { WizardContainer } from '../../components/wizard/WizardContainer';

export const metadata: Metadata = {
  title: 'Evaluación de un carro usado',
  description:
    'Evalúa un carro usado paso a paso: kilometraje, antecedentes, inspección física y posibles costos de reparación antes de realizar un peritaje profesional.',
  alternates: {
    canonical: '/evaluacion',
  },
  openGraph: {
    title: 'Evaluación de un carro usado | EscaneApp',
    description:
      'Realiza una evaluación preliminar de un carro usado antes de comprarlo.',
    url: 'https://www.escaneapp.com/evaluacion',
    siteName: 'EscaneApp',
    locale: 'es_CO',
    type: 'website',
  },
};

export default function EvaluacionPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      <WizardContainer />
    </div>
  );
}