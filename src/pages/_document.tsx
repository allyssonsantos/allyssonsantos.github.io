import Document, { Html, Head, Main, NextScript } from 'next/document';

import i18nextConfig from '../../next-i18next.config'

export default class MyDocument extends Document {

  render() {
    const currentLocale = this.props.__NEXT_DATA__.query.locale || i18nextConfig.i18n.defaultLocale;

    return (
      <Html lang={currentLocale as string}>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          <link rel="icon" href="/favicon-16.png" sizes="16x16"></link>
          <link rel="icon" href="/favicon-32.png" sizes="32x32"></link>
          <meta name="theme-color" content="#025050" />
          <link
            rel="stylesheet"
            href={`https://fonts.googleapis.com/css?family=Rubik:400,500,700`}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
