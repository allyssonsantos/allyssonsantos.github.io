import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import { Source_Sans_3 } from 'next/font/google';
import { DefaultSeo } from 'next-seo';

import { AuthProvider } from 'src/contexts/auth';
import { ModalProvider } from 'src/components/modal/modal-provider';
import { SITE_BASE_URL, SITE_NAME, TWITTER_HANDLE } from 'src/constants';
import { BaseLayout } from 'src/layouts/base/base';

import '../../styles/theme.css';
import '../../styles/highlight.css';
import '../../styles/globals.css';
import '../../styles/animations.css';
import '../../styles/code-editor.css';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const sourceSans = Source_Sans_3({ subsets: ['latin'] });

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <BaseLayout>{page}</BaseLayout>);

  return (
    <div className={sourceSans.className}>
      <AuthProvider>
        <ModalProvider>
          {getLayout(
            <>
              <DefaultSeo
                titleTemplate={`%s | ${SITE_NAME}`}
                defaultTitle="Allysson Santos"
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
          )}
        </ModalProvider>
      </AuthProvider>
    </div>
  );
}

export default appWithTranslation(MyApp);
