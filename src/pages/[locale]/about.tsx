import type { ReactElement } from 'react';
import type { GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import { useTranslation } from 'next-i18next';

import { getI18nProps, getI18nPaths } from 'src/utils/getI18n';
import { AboutFeature } from 'src/features/about';
import { SITE_BASE_URL } from 'src/constants';
import { BaseLayout } from 'src/layouts';

import type { NextPageWithLayout } from '../_app';

const About: NextPageWithLayout = () => {
  const { t } = useTranslation('about');
  const URL = `${SITE_BASE_URL}/about`;
  const description = 'Senior Front-end Developer.';
  return (
    <>
      <NextSeo
        title={t('title') as string}
        description={description}
        canonical={URL}
        openGraph={{
          url: URL,
          title: `${t('title')} | allysson.me`,
          description: description,
        }}
      />
      <AboutFeature />
    </>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout centralize={false}>
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
