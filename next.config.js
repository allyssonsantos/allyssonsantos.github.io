/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const { withSentryConfig } = require('@sentry/nextjs');

module.exports = withSentryConfig(
  withContentlayer({
    reactStrictMode: true,
    swcMinify: true,
    images: {
      unoptimized: true,
    },
    sentry: {
      hideSourceMaps: true,
    },
  }),
);
