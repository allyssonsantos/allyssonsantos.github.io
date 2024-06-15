import type React from 'react';
import type { PropsWithChildren } from 'react';
import { cva } from 'class-variance-authority';
import { useTranslation } from 'next-i18next';

import GoogleLogo from './google-logo.svg';
import styles from './google-button.module.css';

type GoogleButtonProps = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const googleButton = cva(styles['google-button']);

export function GoogleButton(props: GoogleButtonProps) {
  const { t } = useTranslation('sign-in-modal');

  return (
    <button
      {...props}
      aria-label={t('sign-in-with-google-label') as string}
      className={googleButton({ className: props.className })}
    >
      <div className={styles['google-button__logo']}>
        <GoogleLogo />
      </div>
      <span className={styles['google-button__label']}>
        {t('sign-in-with-google')}
      </span>
    </button>
  );
}
