import Script from 'next/script';

export function Banner300x250() {
  return (
    <div className="w-full flex justify-center my-8 min-h-[250px]">
      <div className="w-[300px] h-[250px]">
        <Script
          id="adsterra-banner-300x250"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              atOptions = {
                'key' : 'b7db039e979a26af35b518009a567dc1',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            `,
          }}
        />

        <Script
          id="adsterra-banner-300x250-invoke"
          src="https://www.highrevenueformat.com/b7db039e979a26af35b518009a567dc1/invoke.js"
          strategy="afterInteractive"
        />
      </div>
    </div>
  );
}