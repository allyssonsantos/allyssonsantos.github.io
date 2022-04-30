import React from 'react';
import PropTypes from 'prop-types';
import TransitionLink from 'gatsby-plugin-transition-link';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import {
  Sun,
  Moon,
  ExternalLink,
  GitHub,
  Twitter,
  Instagram,
  Linkedin,
  Home,
  Book,
  Info,
} from 'react-feather';

import UserInfo from '@components/SignIn/UserInfo';

import rem from '@utils/rem';
import trackingEvents from '@utils/trackingEvents';
import { useDarkTheme } from '@utils/color-scheme';

import { useTracking } from '@contexts/TrackingContext';

import MenuButton, { Wrapper as MenuWrapper } from './MenuButton';

const Nav = styled.nav(
  ({ opened, theme }) => css`
    position: sticky;
    top: 0;
    left: 0;

    display: flex;
    overflow: auto;
    flex-direction: column;
    flex-shrink: 0;

    width: 240px;
    height: calc(100vh - ${theme.spacings.medium}px);

    grid-area: nav;

    margin-left: -${theme.spacings.medium}px;
    padding: ${theme.spacings.medium}px;

    transition: background-color 300ms ease-in-out, transform 300ms ease-in-out,
      border-color 300ms ease-in-out;

    border-right: ${theme.borders.tiny}px solid ${theme.colors.neutral[100]};

    background-color: ${theme.colors.neutral[50]};

    ${MenuWrapper} {
      box-shadow: none;
    }

    svg {
      stroke: ${theme.colors.neutral[900]};
    }

    @media (max-width: 1024px) {
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;

      height: 100%;

      margin: 0;
      padding-top: ${theme.spacings.huge}px;

      transform: translateX(${opened ? '0%' : '-120%'});
    }
  `
);

const Header = styled.div(
  ({ theme }) => css`
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-bottom: ${theme.spacings.medium}px;
  `
);

const Name = styled(TransitionLink)(
  ({ theme }) => css`
    font-size: ${rem(16)};

    display: flex;
    align-items: center;
    justify-content: space-between;

    margin: 0;
    padding-left: ${theme.spacings.xsmall}px;

    text-decoration: none;

    color: ${theme.colors.neutral[900]};
  `
);

const ChangeThemeButton = styled.button(
  ({ isDarkTheme, theme }) => css`
    display: flex;
    overflow: hidden;
    flex-shrink: 0;

    width: ${rem(26)};
    height: ${rem(26)};

    margin-top: auto;
    padding: 0;

    cursor: pointer;

    border: none;
    border-radius: 50%;
    background-color: transparent;

    &:hover {
      background-color: ${theme.colors.neutral[200]};
    }

    svg {
      width: ${rem(16)};
      height: ${rem(16)};
    }

    svg + svg {
      margin-top: ${rem(3)};
    }

    div {
      transition: transform 300ms cubic-bezier(0.21, 0.54, 0.29, 0.92);

      transform: translateY(${isDarkTheme ? `-${rem(19)}` : rem(5)});
    }
  `
);

const Category = styled.li(
  ({ theme }) => css`
    font-size: ${rem(12)};

    padding-right: ${theme.spacings.small}px;
    padding-left: ${theme.spacings.small}px;

    color: ${theme.colors.neutral[800]};

    && {
      margin-top: ${theme.spacings.xxlarge}px;
    }
  `
);

const Link = styled(GatsbyLink)(
  ({ theme }) => css`
    font-size: ${rem(14)};
    line-height: ${rem(14)};

    display: flex;
    align-items: center;
    gap: 12px;

    padding: ${theme.spacings.xsmall}px ${theme.spacings.xsmall}px;

    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;
    text-decoration: none;

    color: ${theme.colors.neutral[900]};

    border-radius: ${theme.radius[1]}px;
    background-color: ${theme.colors.neutral[50]};

    svg {
      width: ${rem(14)};
      height: ${rem(14)};
    }

    &:hover {
      background-color: ${theme.colors.neutral[200]};
    }

    svg:nth-child(2) {
      margin-left: auto;
    }

    &.active {
      color: ${theme.colors.neutral[50]};
      background-color: ${theme.colors.neutral[900]};

      svg {
        stroke: ${theme.colors.neutral[50]};
      }
    }
  `
);

const List = styled.ul`
  margin: 0;
  padding: 0;

  list-style: none;

  li + li {
    margin-top: ${(props) => props.theme.spacings.xsmall}px;
  }
`;

const siteLinks = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Artigos', href: '/blog', icon: Book },
  { title: 'Sobre', href: '/about', icon: Info },
];

const socialLinks = [
  {
    title: 'Github',
    href: 'https://github.com/allyssonsantos',
    icon: GitHub,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/_allyssonsantos',
    icon: Twitter,
  },
  {
    title: 'Instagram',
    href: 'https://www.instagram.com/_allysson/',
    icon: Instagram,
  },
  {
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/allyssonsantos/',
    icon: Linkedin,
  },
];

const Navigation = React.forwardRef(({ opened, onMenuClick }, ref) => {
  const { currentTheme, toggleDarkTheme } = useDarkTheme();
  const buttonLabel = `Trocar para tema ${currentTheme}`;
  const { track } = useTracking();

  const handleChangeTheme = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    toggleDarkTheme(newTheme);
    track(trackingEvents.CHANGE_THEME, { currentTheme: newTheme });
  };

  const trackLink = (title, href) =>
    track(
      trackingEvents.NAVIGATION_LINK,
      { title, href },
      { send_immediately: true }
    );

  return (
    <Nav opened={opened} ref={ref}>
      <MenuButton onClick={onMenuClick} close />
      <Header>
        <Name
          to="/"
          entry={{ length: 0.11, delay: 0.11 }}
          exit={{ length: 0.11 }}
        >
          allysson.me
        </Name>

        <UserInfo />
      </Header>
      <List>
        {siteLinks.map(({ title, href, icon: Icon }) => (
          <React.Fragment key={title}>
            <li>
              <Link
                as={TransitionLink}
                to={href}
                activeClassName="active"
                partiallyActive={href !== '/'}
                entry={{ length: 0.11, delay: 0.11 }}
                exit={{ length: 0.11 }}
                onClick={(e) => {
                  trackLink(title, href);
                  onMenuClick(e);
                }}
              >
                <Icon width={14} height={14} />
                {title}
              </Link>
            </li>
          </React.Fragment>
        ))}
        <Category>Redes sociais</Category>
        {socialLinks.map(({ title, href, icon: Icon }) => (
          <React.Fragment key={title}>
            <li>
              <Link as="a" href={href} onClick={() => trackLink(title, href)}>
                <Icon width={14} height={14} />
                {title}
                <ExternalLink width={14} height={14} />
              </Link>
            </li>
          </React.Fragment>
        ))}
      </List>
      <ChangeThemeButton
        onClick={handleChangeTheme}
        title={buttonLabel}
        isDarkTheme={currentTheme === 'dark'}
      >
        <div>
          <Moon />
          <Sun />
        </div>
      </ChangeThemeButton>
    </Nav>
  );
});

Navigation.displayName = 'Navigation';

Navigation.propTypes = {
  opened: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

Navigation.displayName = 'Navigation';

export default Navigation;
