/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');
const { withSentryConfig } = require('@sentry/nextjs');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
});
const withTM = require('next-transpile-modules')([
  '@react95/core',
  '@react95/icons',
]);

module.exports = withSentryConfig(
  withContentlayer(
    withFonts(
      withImages(
        withTM(
          withPWA({
            reactStrictMode: true,
            swcMinify: true,
            images: {
              unoptimized: true,
            },
            sentry: {
              hideSourceMaps: true,
            },
            images: {
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
  ),
);
