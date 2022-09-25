import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';

import { SITE_BASE_URL, SITE_NAME, TWITTER_HANDLE } from 'src/constants';

import '../../styles/globals.css';
import '../../styles/highlight.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        titleTemplate={`%s | ${SITE_NAME}`}
        title="Allysson Santos"
        canonical={SITE_BASE_URL}
        openGraph={{
          type: 'website',
          locale: 'pt_BR',
          url: SITE_BASE_URL,
          site_name: SITE_NAME,
        }}
        twitter={{
          handle: TWITTER_HANDLE,
          cardType: 'summary_large_image',
          site: TWITTER_HANDLE,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
