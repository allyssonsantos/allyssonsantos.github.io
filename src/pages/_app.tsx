import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Source_Sans_3 } from '@next/font/google';
import { DefaultSeo } from 'next-seo';

import { SITE_BASE_URL, SITE_NAME, TWITTER_HANDLE } from 'src/constants';
import { BaseLayout } from 'src/layouts';

import '../../styles/theme.css';
import '../../styles/globals.css';
import '../../styles/highlight.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const sourceSans = Source_Sans_3({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page) => (
      <BaseLayout className={sourceSans.className}>{page}</BaseLayout>
    ));

  return getLayout(
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
    </>,
  );
}

export default MyApp;
