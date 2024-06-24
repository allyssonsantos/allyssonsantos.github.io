/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer2');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withImages = require('next-images');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withBundleAnalyzer(
  withContentlayer(
    withImages(
      withPWA({
        output: 'export',
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
);

const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(module.exports, {
  org: 'allyssonme',
  project: 'allyssonme',
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
