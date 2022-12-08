import type { PropsWithChildren, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { SideBar } from 'src/components/SideBar';

import styles from './Base.module.css';

interface IBaseLayout
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

function BaseLayout({ children, className }: IBaseLayout) {
  return (
    <div className={classnames(className, styles.base)}>
      <SideBar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export { BaseLayout };
