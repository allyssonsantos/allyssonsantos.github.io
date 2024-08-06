import { type PropsWithChildren, type HTMLAttributes, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { cva, type VariantProps } from 'class-variance-authority';
import { Menu } from 'react-feather';
import { useTranslation } from 'next-i18next';

import { Button } from 'src/components/button/button';
import { SideBar } from 'src/components/side-bar/side-bar';

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
  const { t } = useTranslation('sidebar');

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
            aria-label={t('sidebar:open-menu')}
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
