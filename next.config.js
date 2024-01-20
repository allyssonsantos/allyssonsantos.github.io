/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withBundleAnalyzer(
  withContentlayer(
    withFonts(
      withImages(
        withPWA({
          reactStrictMode: true,
          swcMinify: true,
          images: {
            unoptimized: true,
            disableStaticImages: true,
            remotePatterns: [
              {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
              },
            ],
          },
          webpack(config) {
            const fileLoaderRule = config.module.rules.find((rule) =>
              rule.test?.test?.('.svg'),
            );

            config.module.rules.push(
              {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
              },
              {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: /url/ },
                use: ['@svgr/webpack'],
              },
            );

            fileLoaderRule.exclude = /\.svg$/i;

            return config;
          },
        }),
      ),
    ),
  ),
);

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'allyssonme',
    project: 'allyssonme',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  },
);
