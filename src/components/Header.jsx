import React from 'react';
import styled, { css, withTheme } from 'styled-components';

import { Box, Link } from '.';

const Wrapper = styled.header`
  ${({
    full,
    theme: {
      colors: { white, secondary },
      sizes,
    },
  }) => css`
  ${
    full
      ? css`
          height: 526px;
          background: linear-gradient(
            to right,
            ${white} 0%,
            53%,
            ${secondary} 53% 100%
          );
        `
      : css`
          background: ${secondary};
          height: auto;
        `
  }


    @media (max-width: ${sizes.breakpoints.md}px) {
      background: ${white};
      height: auto;
    }
  `}
`;

const Content = styled.div`
  margin: 0 auto;
  padding: 10px;

  ${({
    theme: {
      sizes: { maxWidth },
    },
  }) => css`
    max-width: ${maxWidth}px;
    padding-bottom: 32px;
  `}
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  padding: 20px 10px;

  ${({
    full,
    theme: {
      colors: { secondary, white, grays },
      sizes: { maxWidth, breakpoints },
    },
  }) => css`
    max-width: ${maxWidth}px;

    ${
      full
        ? css`
            ${Box} {
              color: ${grays[1]};
            }
          `
        : css`
            ${Box} {
              color: ${white};
            }
          `
    }
    @media (max-width: ${breakpoints.md}px) {
      background: ${secondary};

      ${Box} {
        color: ${white};
      }
    }
  `}
`;

const Menu = styled.div`
  font-size: 0.875rem;

  a + a {
    margin-left: 6px;
  }

  ${({ theme: { colors } }) => css`
    ${Box} {
      color: ${colors.white};
    }
  `}
`;

const Highlight = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  margin-right: 74px;

  ${({ theme: { sizes } }) => css`
    @media (max-width: ${sizes.breakpoints.md}px) {
      margin: 0;

      ${Box} {
        text-align: center;
      }
    }
  `}
`;

const Art = styled.div`
  position: relative;
  width: 100%;

  ${({ theme: { sizes } }) => css`
    @media (max-width: ${sizes.breakpoints.md}px) {
      display: none;
    }
  `}
`;

const Image = styled.img`
  position: absolute;
  top: ${props => props.top}px;
  right: ${props => props.right}px;

  width: ${props => props.width}px;
`;

const Header = ({ theme, full }) => (
  <Wrapper full={full}>
    <Nav full={full}>
      <Link to="/">
        <Box
          as="h3"
          $display="inline-block"
          $size="0.875rem"
          $color={theme.colors.grays[1]}
          style={{ paddingLeft: 0 }}
        >
          allysson
        </Box>
      </Link>

      <Menu>
        <Link
          to="/blog"
          $color={theme.colors.white}
          $weight="normal"
          activeClassName="active"
        >
          Blog
        </Link>
        <Link
          to="/about"
          $color={theme.colors.white}
          $weight="normal"
          activeClassName="active"
        >
          Sobre mim
        </Link>
      </Menu>
    </Nav>
    {full && (
      <Content>
        <Highlight>
          <Info>
            <Box
              as="h2"
              $size="2.75rem"
              $mt={30}
              $mb={24}
              $color={theme.colors.grays[0]}
              $weight="bold"
            >
              E aí, Beleza?
            </Box>
            <Box as="p" $lh="24px">
              Sou o Allysson, desenvolvedor Front End no Gympass e vim trazer
              mais conteúdo em português sobre desenvolvimento.
            </Box>
          </Info>
          <Art>
            <Image width={387} right={60} top={0} src="/browser.png" />
            <Image width={234} right={80} top={63} src="/allysson.svg" />
          </Art>
        </Highlight>
      </Content>
    )}
  </Wrapper>
);

export default withTheme(Header);
