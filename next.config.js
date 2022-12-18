/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const { withSentryConfig } = require('@sentry/nextjs');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});

module.exports = withSentryConfig(
  withContentlayer(
    withPWA({
      reactStrictMode: true,
      swcMinify: true,
      images: {
        unoptimized: true,
      },
      sentry: {
        hideSourceMaps: true,
      },
    }),
  ),
);
