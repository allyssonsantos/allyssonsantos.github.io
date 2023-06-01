import type { ReactElement } from 'react';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { Source_Sans_3 } from '@next/font/google';

import { getI18nProps, getI18nPaths } from 'src/utils/getI18n';
import { AboutFeature } from 'src/features/about';
import { SITE_BASE_URL } from 'src/constants';
import { BaseLayout } from 'src/layouts';

import type { NextPageWithLayout } from '../_app';

const sourceSans = Source_Sans_3({ subsets: ['latin'] });

const About: NextPageWithLayout = () => {
  const URL = `${SITE_BASE_URL}/about`;
  const description = 'Senior Front-end Developer.';
  return (
    <>
      <NextSeo
        title="About Me"
        description={description}
        canonical={URL}
        openGraph={{
          url: URL,
          title: 'About Me | allysson.me',
          description: description,
        }}
      />
      <AboutFeature />
    </>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout className={sourceSans.className} centralize={false}>
      {page}
    </BaseLayout>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const i18nProps = await getI18nProps(context, [
    'common',
    'about',
    'sign-in-modal',
    'delete-account-modal',
    'sidebar',
  ]);
  return { props: { ...i18nProps } };
};

export const getStaticPaths = () => ({
  fallback: false,
  paths: getI18nPaths(),
});

export default About;
