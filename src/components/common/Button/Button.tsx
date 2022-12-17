import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';

import styles from './Button.module.css';

interface IButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'icon';
}

export function Button({
  children,
  variant,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      type="button"
      className={classnames(className, styles.button, {
        [styles['button-icon']]: variant === 'icon',
      })}
      {...props}
    >
      {children}
    </button>
  );
}
