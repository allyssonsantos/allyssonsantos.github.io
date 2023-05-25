import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import styles from './button.module.css';

const button = cva(styles.button, {
  variants: {
    variant: {
      icon: styles['button-icon'],
      inverted: styles['button-inverted'],
      ghost: styles['button-ghost'],
    },
    size: {
      small: styles['button--small'],
    },
  },
});

type ButtonProps = PropsWithChildren<VariantProps<typeof button>> &
  ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={button({ variant, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}
