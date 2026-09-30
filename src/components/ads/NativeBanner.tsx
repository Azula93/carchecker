import Script from 'next/script';

export function NativeBanner() {
  return (
    <div className="w-full flex justify-center my-8">
      <div>
        <Script
          id="adsterra-native-banner"
          src="https://pl31555675.profitableratecpmnetwork.com/e68293d6879af737d91ada3bb4a667f5/invoke.js"
          strategy="afterInteractive"
          data-cfasync="false"
        />

        <div id="container-e68293d6879af737d91ada3bb4a667f5" />
      </div>
    </div>
  );
}