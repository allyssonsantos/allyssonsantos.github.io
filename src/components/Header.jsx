import React from 'react';
import styled, { css, withTheme } from 'styled-components';

import { Box, Link } from '.';

const Wrapper = styled.header`
  height: 526px;

  ${({
    theme: {
      colors: { white, secondary },
    },
  }) => css`
    background: linear-gradient(
      to right,
      ${white} 0%,
      53%,
      ${secondary} 53% 100%
    );
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
  `}
`;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 55px;
`;

const Menu = styled.div`
  font-size: 0.875rem;

  a + a {
    margin-left: 32px;
  }
`;

const Highlight = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  margin-right: 74px;
`;

const Message = styled.p`
  line-height: 24px;
`;

const Art = styled.div`
  position: relative;
  width: 100%;
`;

const Image = styled.img`
  position: absolute;
  top: ${props => props.top}px;
  right: ${props => props.right}px;

  width: ${props => props.width}px;
`;

const Header = ({ theme }) => (
  <Wrapper>
    <Content>
      <Nav>
        <Link to="/">
          <Box
            as="h3"
            display="inline-block"
            size="0.875rem"
            color={theme.colors.grays[1]}
          >
            allysson
          </Box>
        </Link>

        <Menu>
          <Link to="/blog" color={theme.colors.white} weight="normal">
            Blog
          </Link>
          <Link to="/about" color={theme.colors.white} weight="normal">
            Sobre mim
          </Link>
        </Menu>
      </Nav>
    </Content>
    <Content>
      <Highlight>
        <Info>
          <Box
            as="h2"
            size="2.75rem"
            mt={30}
            mb={24}
            color={theme.colors.grays[0]}
            weight="bold"
          >
            E aí, Beleza?
          </Box>
          <Box as="p" lh="24px">
            Sou o Allysson, desenvolvedor Front End no Gympass e vim trazer mais
            conteúdo em português sobre desenvolvimento.
          </Box>
        </Info>
        <Art>
          <Image width={387} right={60} top={0} src="/browser.png" />
          <Image width={234} right={80} top={63} src="/allysson.svg" />
        </Art>
      </Highlight>
    </Content>
  </Wrapper>
);

export default withTheme(Header);
