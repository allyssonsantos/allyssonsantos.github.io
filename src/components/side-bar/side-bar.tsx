import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';
import { useTranslation } from 'next-i18next';
import FocusTrap from 'focus-trap-react';
import classnames from 'classnames';
import {
  X,
  Home,
  Book,
  Info,
  ExternalLink,
  GitHub,
  Linkedin,
  Sun,
  Moon,
  type Icon,
} from 'react-feather';
import Xlogo from './x-logo.svg';

import { useIsLowerResolution } from 'src/hooks/useIsLowerResolution';
import { useAuth, logout } from 'src/contexts/auth';
import {
  SIGN_IN_MODAL_KEY,
  DELETE_ACCOUNT_MODAL_KEY,
} from 'src/constants/modals';
import { ActiveLink } from '../active-link/active-link';
import { Button } from '../button/button';
import { LinkComponent as Link } from '../link/link';
import { useModals } from '../modal/modal-context';

import styles from './side-bar.module.css';

const Avatar = dynamic(() =>
  import('../avatar/avatar').then((mod) => mod.Avatar),
);
const Menu = dynamic(() => import('../menu/menu').then((mod) => mod.Menu));
const LanguageSwitcher = dynamic(() =>
  import('../language-switcher/language-switcher').then(
    (mod) => mod.LanguageSwitcher,
  ),
);
const SignInModal = dynamic(() =>
  import('../sign-in-modal/sign-in-modal').then((mod) => mod.SignInModal),
);
const DeleteAccountModal = dynamic(() =>
  import('../delete-account-modal/delete-account-modal').then(
    (mod) => mod.DeleteAccountModal,
  ),
);

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
    title: 'X (Twitter)',
    href: 'https://twitter.com/_allyssonsantos',
    external: true,
    icon: Xlogo,
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
  const { t } = useTranslation(['common', 'sidebar']);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useModals();
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === 'dark';
  const { currentUser } = useAuth();
  const isLowerResolution = useIsLowerResolution();

  function handleThemeChange() {
    setTheme(isDarkTheme ? 'light' : 'dark');
  }

  function openSignInModal() {
    openModal(SIGN_IN_MODAL_KEY);
  }

  function openDeleteAccountModal() {
    openModal(DELETE_ACCOUNT_MODAL_KEY);
  }

  function handleMenuOpen() {
    setIsMenuOpen(!isMenuOpen);
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
          aria-label={t('sidebar:close-menu') as string}
          onClick={onSideBarClose}
          variant="icon"
          className={styles['sidebar__close-button']}
        >
          <X />
        </Button>
        <header className={styles.sidebar__header}>
          <Link href="/" className={styles.sidebar__logo}>
            allysson.me
          </Link>
          {currentUser ? (
            <>
              <Avatar
                src={currentUser.photoURL}
                name={currentUser.displayName}
                onClick={handleMenuOpen}
              />
              <Menu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                items={[
                  {
                    text: t('sidebar:sign-out'),
                    onClick: logout,
                  },
                  {
                    text: t('sidebar:delete-account'),
                    onClick: openDeleteAccountModal,
                  },
                ]}
              />
            </>
          ) : (
            <Button className={styles.sidebar__login} onClick={openSignInModal}>
              {t('sidebar:sign-in')}
            </Button>
          )}
          <SignInModal />
          <DeleteAccountModal />
        </header>
        <nav className={styles.sidebar__navigation}>
          <ul className={styles.sidebar__list}>
            {mainLinks.map(({ title, ...rest }) => {
              const tTitle = t(`sidebar:${title}`);
              return (
                <li key={title}>
                  <SideBarLink title={tTitle} {...rest} />
                </li>
              );
            })}
          </ul>
          <div>
            <small className={styles.sidebar__category}>
              {t('sidebar:socials')}
            </small>
            <ul className={styles.sidebar__list}>
              {socialLinks.map((link) => (
                <li key={link.title}>
                  <SideBarLink key={link.title} {...link} />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <label>
              <small className={styles.sidebar__category}>
                {t('sidebar:language')}
              </small>
              <LanguageSwitcher />
            </label>
          </div>
        </nav>
        {mounted && (
          <button
            className={classnames(styles['sidebar__theme-button'], {
              [styles['sidebar__theme-button--active']]: !isDarkTheme,
            })}
            type="button"
            aria-label={t('sidebar:change-theme') as string}
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
