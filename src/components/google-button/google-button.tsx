import type { PropsWithChildren } from 'react';
import { cva } from 'class-variance-authority';

import GoogleLogo from './google-logo.svg';
import styles from './google-button.module.css';

type GoogleButtonProps = PropsWithChildren &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const googleButton = cva(styles['google-button']);

export function GoogleButton(props: GoogleButtonProps) {
  return (
    <button
      {...props}
      aria-label="entre utilizando sua conta do Google"
      className={googleButton({ className: props.className })}
    >
      <div className={styles['google-button__logo']}>
        <GoogleLogo />
      </div>
      <span className={styles['google-button__label']}>Entrar com google</span>
    </button>
  );
}
