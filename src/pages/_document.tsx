import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <link rel="icon" href="/favicon-16.png" sizes="16x16"></link>
        <link rel="icon" href="/favicon-32.png" sizes="32x32"></link>
        <meta name="theme-color" content="#025050" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
