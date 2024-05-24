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

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'allyssonme',
  project: 'allyssonme',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
