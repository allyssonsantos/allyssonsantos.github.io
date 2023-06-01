import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import i18nextConfig from '../../next-i18next.config';

export function getI18nPaths() {
  return i18nextConfig.i18n.locales
    .filter((lng) => lng !== 'pt')
    .map((lng) => ({
      params: {
        locale: lng,
      },
    }));
}

export async function getI18nProps(
  ctx: GetStaticPropsContext,
  ns = ['common'],
) {
  const locale =
    (ctx?.params?.locale as string) || i18nextConfig.i18n.defaultLocale;

  let props = {
    ...(await serverSideTranslations(locale, ns)),
  };
  return props;
}
