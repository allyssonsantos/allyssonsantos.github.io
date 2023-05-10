import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import FocusTrap from 'focus-trap-react';
import classnames from 'classnames';
import {
  X,
  Home,
  Book,
  Info,
  ExternalLink,
  GitHub,
  Twitter,
  Linkedin,
  Sun,
  Moon,
  type Icon,
} from 'react-feather';

import { useIsLowerResolution } from 'src/hooks';
import { ActiveLink, Button } from '..';

import styles from './SideBar.module.css';

interface ILinks {
  title: string;
  href: string;
  external: boolean;
  icon: Icon;
}

interface ISideBarProps {
  isOpen: boolean;
  onSideBarClose: () => void;
}

const mainLinks: Array<ILinks> = [
  {
    title: 'home',
    href: '/',
    external: false,
    icon: Home,
  },
  {
    title: 'blog',
    href: '/blog',
    external: false,
    icon: Book,
  },
  {
    title: 'about',
    href: '/about',
    external: false,
    icon: Info,
  },
];

const socialLinks: Array<ILinks> = [
  {
    title: 'GitHub',
    href: 'https://github.com/allyssonsantos',
    external: true,
    icon: GitHub,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/_allyssonsantos',
    external: true,
    icon: Twitter,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/allyssonsantos/',
    external: true,
    icon: Linkedin,
  },
];

function SideBarLink({ title, href, external, icon: Icon }: ILinks) {
  return (
    <ActiveLink
      href={href}
      target={external ? '_blank' : '_self'}
      rel="noopener nofollow noreferrer"
      className={styles.sidebar__link}
      activeClassName={styles['sidebar__link--active']}
    >
      <Icon />
      {title}
      {external && <ExternalLink />}
    </ActiveLink>
  );
}

function SideBar({ isOpen, onSideBarClose }: ISideBarProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const isLowerResolution = useIsLowerResolution();

  function handleThemeChange() {
    setTheme(isDarkTheme ? 'light' : 'dark');
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <FocusTrap
      active={isLowerResolution && isOpen}
      focusTrapOptions={{
        allowOutsideClick: true,
      }}
    >
      <aside
        className={classnames(styles.sidebar, {
          [styles['sidebar--opened']]: isOpen,
        })}
      >
        <Button
          aria-label="fechar menu"
          onClick={onSideBarClose}
          variant="icon"
          className={styles['sidebar__close-button']}
        >
          <X />
        </Button>
        <header className={styles.sidebar__header}>
          <Link
            href="/"
            aria-label="voltar para página inicial"
            className={styles.sidebar__logo}
          >
            allysson.me
          </Link>
          <Button className={styles.sidebar__login}>Sign In</Button>
        </header>
        <nav className={styles.sidebar__navigation}>
          <ul className={styles.sidebar__list}>
            {mainLinks.map((link) => (
              <li key={link.title}>
                <SideBarLink {...link} />
              </li>
            ))}
          </ul>
          <div>
            <small className={styles.sidebar__category}>Redes sociais</small>
            <ul className={styles.sidebar__list}>
              {socialLinks.map((link) => (
                <li key={link.title}>
                  <SideBarLink key={link.title} {...link} />
                </li>
              ))}
            </ul>
          </div>
        </nav>
        {mounted && (
          <button
            className={classnames(styles['sidebar__theme-button'], {
              [styles['sidebar__theme-button--active']]: !isDarkTheme,
            })}
            type="button"
            aria-label="alterar tema"
            onClick={handleThemeChange}
          >
            <Sun />
            <Moon />
          </button>
        )}
      </aside>
    </FocusTrap>
  );
}

export { SideBar };
