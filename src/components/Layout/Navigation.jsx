import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';
import TransitionLink from 'gatsby-plugin-transition-link';

import { Sun, Moon, ExternalLink } from 'react-feather';

import rem from '@utils/rem';
import { useDarkTheme } from '@utils/color-scheme';

import Menu from './Menu';

const Nav = styled.nav(
  ({ opened, theme }) => css`
    width: 240px;
    height: calc(100vh - ${theme.spacings.medium}px);

    grid-area: nav;
    flex-shrink: 0;

    position: sticky;
    top: 0;
    left: 0;

    margin-left: -${theme.spacings.medium}px;
    padding: ${theme.spacings.medium}px;

    background-color: ${theme.colors.neutral[50]};

    border-right: ${theme.borders.tiny}px solid ${theme.colors.neutral[100]};

    transition: background-color 300ms ease-in-out, transform 300ms ease-in-out,
      border-color 300ms ease-in-out;

    @media (max-width: 1024px) {
      height: 100%;

      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;

      margin: 0;
      padding-top: ${theme.spacings.huge}px;

      transform: translateX(${opened ? '0%' : '-120%'});
    }

    > div {
      box-shadow: none;
    }
  `
);

const Name = styled.p(
  ({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin: 0;
    margin-bottom: ${theme.spacings.medium}px;
    padding-left: ${theme.spacings.xsmall}px;
    font-size: ${rem(16)};
  `
);

const ChangeThemeButton = styled.button(
  ({ isDarkTheme, theme }) => css`
    display: flex;
    width: 26px;
    height: 26px;

    padding: 0;

    background-color: transparent;
    border: none;
    border-radius: 50%;

    overflow: hidden;
    cursor: pointer;

    &:hover {
      background-color: ${theme.colors.neutral[200]};
    }

    svg {
      width: 16px;
      height: 16px;
    }

    svg + svg {
      margin-top: 2px;
    }

    div {
      transform: translateY(${isDarkTheme ? -16 : 5}px);

      transition: transform 300ms cubic-bezier(0.21, 0.54, 0.29, 0.92);
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
    display: flex;
    align-items: center;
    gap: 12px;

    font-size: ${rem(14)};
    line-height: ${rem(14)};
    color: ${theme.colors.neutral[900]};

    padding: ${theme.spacings.xsmall}px ${theme.spacings.xsmall}px;

    background-color: ${theme.colors.neutral[50]};
    border-radius: ${theme.radius[1]}px;

    text-decoration: none;
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    &:hover {
      background-color: ${theme.colors.neutral[200]};
    }

    &.active {
      background-color: ${theme.colors.neutral[900]};
      color: ${theme.colors.neutral[50]};

      svg {
        stroke: ${theme.colors.neutral[50]};
      }
    }

    svg:nth-child(2) {
      margin-left: auto;
    }
  `
);

const List = styled.ul`
  padding: 0;
  margin: 0;

  list-style: none;

  li + li {
    margin-top: ${(props) => props.theme.spacings.xsmall}px;
  }
`;

const Navigation = React.forwardRef(
  ({ items, socials, opened, onMenuClick }, ref) => {
    const { currentTheme, toggleDarkTheme } = useDarkTheme();
    const buttonLabel = `Trocar para tema ${currentTheme}`;

    return (
      <Nav opened={opened} ref={ref}>
        <Menu onClick={onMenuClick} close />
        <List>
          <Name>
            allysson.me
            <ChangeThemeButton
              onClick={() =>
                toggleDarkTheme(currentTheme === 'dark' ? 'light' : 'dark')
              }
              title={buttonLabel}
              isDarkTheme={currentTheme === 'dark'}
            >
              <div aria-label={buttonLabel}>
                <Moon />
                <Sun />
              </div>
            </ChangeThemeButton>
          </Name>
          {items.map(({ title, href, icon: Icon }) => (
            <React.Fragment key={title}>
              <li>
                <Link
                  as={TransitionLink}
                  to={href}
                  activeClassName="active"
                  partiallyActive={href !== '/'}
                  entry={{ length: 0.11, delay: 0.11 }}
                  exit={{ length: 0.11 }}
                >
                  <Icon width={14} height={14} />
                  {title}
                </Link>
              </li>
            </React.Fragment>
          ))}
          <Category>Redes sociais</Category>
          {socials.map(({ title, href, icon: Icon }) => (
            <React.Fragment key={title}>
              <li>
                <Link as="a" href={href}>
                  <Icon width={14} height={14} />
                  {title}
                  <ExternalLink width={14} height={14} />
                </Link>
              </li>
            </React.Fragment>
          ))}
        </List>
      </Nav>
    );
  }
);

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  socials: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
    })
  ).isRequired,
  opened: PropTypes.bool.isRequired,
  onMenuClick: PropTypes.func.isRequired,
};

export default Navigation;
