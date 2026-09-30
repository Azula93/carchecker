export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://escaneapp.com/#webapp',
        name: 'EscaneApp',
        alternateName: 'EscaneApp Colombia',
        url: 'https://escaneapp.com',
        description:
          'Herramienta de revisión preliminar de vehículos usados en Colombia. Permite evaluar kilometraje, antecedentes, estado físico y posibles costos ocultos antes de realizar un peritaje profesional.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        inLanguage: 'es-CO',
        isAccessibleForFree: true,
      },
      {
        '@type': 'Organization',
        '@id': 'https://escaneapp.com/#organization',
        name: 'EscaneApp',
        url: 'https://escaneapp.com',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}