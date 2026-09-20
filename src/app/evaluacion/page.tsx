import type { Metadata } from 'next';
import { WizardContainer } from '../../components/wizard/WizardContainer';

export const metadata: Metadata = {
  title: 'Evaluación de un carro usado | Car Checker Colombia',
  description:
    'Evalúa un carro usado paso a paso en Colombia: kilometraje, antecedentes, inspección física y posibles costos de reparación antes de realizar un peritaje profesional.',
  alternates: {
    canonical: 'https://carchecker.kodiquett.com/evaluacion',
  },
  openGraph: {
    title: 'Evaluación de un carro usado | Car Checker Colombia',
    description:
      'Realiza una evaluación preliminar de un carro usado antes de comprarlo.',
    url: 'https://carchecker.kodiquett.com/evaluacion',
    siteName: 'Car Checker Colombia',
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