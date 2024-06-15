import type React from 'react';
import type { PropsWithChildren } from 'react';
import { cva } from 'class-variance-authority';

import styles from './alert.module.css';

const alert = cva(styles.alert);

export function Alert({
  children,
  className,
}: PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>) {
  return (
    <div role="alert" className={alert({ className })}>
      {children}
    </div>
  );
}
