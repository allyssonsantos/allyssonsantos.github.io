import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';

import { getI18nProps } from 'src/utils/getI18n';

export default function Custom404() {
  const { t } = useTranslation('common');

  return <h1>{t('404-message')}</h1>;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const i18nProps = await getI18nProps(context, [
    'common',
    'home',
    'sign-in-modal',
    'delete-account-modal',
    'sidebar',
  ]);
  return { props: { ...i18nProps } };
};
