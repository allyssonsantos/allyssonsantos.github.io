import { type PropsWithChildren, type HTMLAttributes, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { cva, type VariantProps } from 'class-variance-authority';
import { Menu } from 'react-feather';

import { Button, SideBar } from 'src/components';

import styles from './base.module.css';

const baseAlign = cva(styles.main, {
  variants: {
    centralize: {
      true: styles['main--centralized'],
    },
  },
});

type BaseLayoutProps = PropsWithChildren &
  HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof baseAlign>;

function BaseLayout({
  children,
  className = '',
  centralize = true,
}: BaseLayoutProps) {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const router = useRouter();

  router.events?.on('routeChangeStart', () => {
    setIsSideBarOpen(false);
  });

  function handleSideBar() {
    setIsSideBarOpen(!isSideBarOpen);
  }

  return (
    <ThemeProvider attribute="class">
      <div className={`${className} ${styles.base}`}>
        <SideBar isOpen={isSideBarOpen} onSideBarClose={handleSideBar} />
        <main className={baseAlign({ centralize })}>
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
    </ThemeProvider>
  );
}

export { BaseLayout };
