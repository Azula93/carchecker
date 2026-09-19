import { WizardContainer } from '../../components/wizard/WizardContainer';

export const metadata = {
  title: 'Evaluación y Revisión Preliminar — Car Checker Colombia',
  description:
    'Realiza una revisión preliminar paso a paso: datos básicos, antecedentes legales, checklist de inspección física integral y matriz de costos de reparación antes de un peritaje profesional.',
};

export default function EvaluacionPage() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8">
      <WizardContainer />
    </div>
  );
}
