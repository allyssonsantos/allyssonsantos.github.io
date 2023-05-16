import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import classnames from 'classnames';

import styles from './button.module.css';

interface IButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'icon' | 'inverted';
  size?: 'small';
}

export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      type="button"
      className={classnames(className, styles.button, {
        [styles['button-icon']]: variant === 'icon',
        [styles['button-inverted']]: variant === 'inverted',
        [styles['button--small']]: size === 'small',
      })}
      {...props}
    >
      {children}
    </button>
  );
}
