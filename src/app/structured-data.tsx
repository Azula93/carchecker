export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': 'https://carchecker.kodiquett.com/#webapp',
        name: 'Car Checker',
        alternateName: 'Car Checker Colombia',
        url: 'https://carchecker.kodiquett.com',
        description:
          'Herramienta de revisión preliminar de vehículos usados en Colombia. Permite evaluar kilometraje, antecedentes, estado físico y posibles costos ocultos antes de realizar un peritaje profesional.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        inLanguage: 'es-CO',
        isAccessibleForFree: true,
      },
      {
        '@type': 'Organization',
        '@id': 'https://carchecker.kodiquett.com/#organization',
        name: 'Car Checker',
        url: 'https://carchecker.kodiquett.com',
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