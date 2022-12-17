import { PropsWithChildren, HTMLAttributes, useState } from 'react';
import classnames from 'classnames';
import { Menu } from 'react-feather';

import { SideBar } from 'src/components/common/SideBar';
import { Button } from 'src/components/common';

import styles from './Base.module.css';

interface IBaseLayout
  extends PropsWithChildren,
    HTMLAttributes<HTMLDivElement> {}

function BaseLayout({ children, className }: IBaseLayout) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  function handleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <div className={classnames(className, styles.base)}>
      <SideBar isOpen={isSideBarOpen} onSideBarClose={handleSideBar} />
      <main className={styles.main}>
        <Button
          onClick={handleSideBar}
          variant="icon"
          className={styles['main__menu-button']}
        >
          <Menu />
        </Button>
        {children}
      </main>
    </div>
  );
}

export { BaseLayout };
