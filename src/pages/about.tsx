import type { ReactElement } from 'react';
import { Source_Sans_3 } from '@next/font/google';

import { AboutFeature } from 'src/features/about';

import type { NextPageWithLayout } from './_app';
import { BaseLayout } from 'src/layouts';

const sourceSans = Source_Sans_3({ subsets: ['latin'] });

const About: NextPageWithLayout = () => {
  return <AboutFeature />;
};

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout className={sourceSans.className} centralize={false}>
      {page}
    </BaseLayout>
  );
};

export default About;
