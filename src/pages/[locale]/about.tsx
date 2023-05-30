import type { ReactElement } from 'react';
import { NextSeo } from 'next-seo';
import { Source_Sans_3 } from '@next/font/google';

import { AboutFeature } from 'src/features/about';
import { SITE_BASE_URL } from 'src/constants';

import type { NextPageWithLayout } from '../_app';
import { BaseLayout } from 'src/layouts';

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

export default About;
