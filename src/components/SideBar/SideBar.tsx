import Link from 'next/link';
import { useState } from 'react';
import {
  Home,
  Book,
  Info,
  ExternalLink,
  GitHub,
  Twitter,
  Instagram,
  Linkedin,
  Sun,
  Moon,
  type Icon,
} from 'react-feather';

import styles from './SideBar.module.css';

interface ILinks {
  title: string;
  href: string;
  external: boolean;
  icon: Icon;
}

const mainLinks: Array<ILinks> = [
  {
    title: 'home',
    href: '/',
    external: false,
    icon: Home,
  },
  {
    title: 'artigos',
    href: '/blog',
    external: false,
    icon: Book,
  },
  {
    title: 'sobre',
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
    title: 'Instagram',
    href: 'https://www.instagram.com/_allysson/',
    external: true,
    icon: Instagram,
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
    <a
      href={href}
      target={external ? '_blank' : '_self'}
      rel="noopener nofollow noreferrer"
      className={styles.sidebar__link}
    >
      <Icon />
      {title}
      {external && <ExternalLink />}
    </a>
  );
}

function SideBar() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  function handleThemeChange() {
    setIsDarkTheme(!isDarkTheme);
  }

  return (
    <aside className={styles.sidebar}>
      <header className={styles.sidebar__header}>
        <Link
          href="/"
          aria-label="voltar para página inicial"
          className={styles.sidebar__logo}
        >
          allysson.me
        </Link>
        <button className={styles.sidebar__login}>Entrar</button>
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
      <button
        type="button"
        aria-label="alterar tema"
        onClick={handleThemeChange}
      >
        {isDarkTheme ? <Sun /> : <Moon />}
      </button>
    </aside>
  );
}

export { SideBar };
