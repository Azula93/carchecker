import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://pagead2.googlesyndication.com https://pl31555675.profitableratecpmnetwork.com https://www.highrevenueformat.com https://ep2.adtrafficquality.google;
  style-src-elem 'self' https://pagead2.googlesyndication.com;
  style-src-attr 'unsafe-inline';
  img-src 'self' data: blob: https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://googleads.g.doubleclick.net https://www.google.com https://cdn.cloudvideosa.com https://ep1.adtrafficquality.google;
  font-src 'self' data:;
  connect-src 'self' https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://adservice.google.com https://protrafficinspector.com https://fizzyacerbitymellow.com https://ep1.adtrafficquality.google;
  frame-src https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://tpc.googlesyndication.com https://www.google.com https://www.highrevenueformat.com https://pl31555675.profitableratecpmnetwork.com https://kettledroopingcontinuation.com https://fizzyacerbitymellow.com https://ep2.adtrafficquality.google;
  worker-src 'self';
  form-action 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'self';
`
  .replace(/\s{2,}/g, " ")
  .trim();

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;

