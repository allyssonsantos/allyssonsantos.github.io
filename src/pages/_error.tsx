import type { GetStaticProps } from 'next';
import NextErrorComponent, { type ErrorProps } from 'next/error';

import { getI18nProps } from 'src/utils/getI18n';

const CustomErrorComponent = (props: ErrorProps) => {
  return <NextErrorComponent statusCode={props.statusCode} />;
};

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

export default CustomErrorComponent;
