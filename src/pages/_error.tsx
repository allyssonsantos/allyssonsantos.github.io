import * as Sentry from '@sentry/nextjs';
import type { NextPageContext } from 'next';
import NextErrorComponent, { type ErrorProps } from 'next/error';

import { getI18nProps } from 'src/utils/getI18n';

const CustomErrorComponent = (props: ErrorProps) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

export const getStaticProps = async (context: NextPageContext) => {
  const i18nProps = await getI18nProps(context, [
    'common',
    'home',
    'sign-in-modal',
    'delete-account-modal',
    'sidebar',
  ]);
  await Sentry.captureUnderscoreErrorException(context);
  return { props: { ...i18nProps } };
};

export default CustomErrorComponent;
