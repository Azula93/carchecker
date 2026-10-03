export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://www.escaneapp.com/#website',
        url: 'https://www.escaneapp.com/',
        name: 'EscaneApp',
        alternateName: 'EscaneApp Colombia',
        description:
          'Herramienta para evaluar vehículos usados en Colombia antes de comprarlos.',
        inLanguage: 'es-CO',
      },
      {
        '@type': 'WebApplication',
        '@id': 'https://www.escaneapp.com/#webapp',
        name: 'EscaneApp',
        alternateName: 'EscaneApp Colombia',
        url: 'https://www.escaneapp.com/',
        description:
          'Herramienta de revisión preliminar de vehículos usados en Colombia. Permite evaluar kilometraje, antecedentes, estado físico y posibles costos ocultos antes de realizar un peritaje profesional.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        inLanguage: 'es-CO',
        isAccessibleForFree: true,
      },
      {
        '@type': 'Organization',
        '@id': 'https://www.escaneapp.com/#organization',
        name: 'EscaneApp',
        url: 'https://www.escaneapp.com/',
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