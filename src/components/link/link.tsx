import React from 'react';
import Link, { type LinkProps } from 'next/link';
import { useRouter } from 'next/router';

type LinkComponentProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    className?: string;
    skipLocaleHandling?: boolean;
  };

export function LinkComponent({
  children,
  skipLocaleHandling,
  ...rest
}: LinkComponentProps) {
  const router = useRouter();
  const locale = rest.locale || router.query.locale || '';

  let href = (rest.href as string) || (router.asPath as string);
  if (href.indexOf('http') === 0) skipLocaleHandling = true;

  if (locale && !skipLocaleHandling) {
    href = href
      ? `/${locale}${href}`
      : router.pathname.replace('[locale]', locale as string);
  }

  return (
    <>
      <Link {...rest} href={href}>
        {children}
      </Link>
    </>
  );
}
