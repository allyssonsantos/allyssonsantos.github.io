import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { withFade } from '@frigobar/animation';

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
`;

const Menu = styled.div`
  font-size: 0.875rem;

  a {
    ${({
      theme: {
        colors: { white },
      },
    }) => css`
      color: ${white};
    `}
  }

  a + a {
    margin-left: 32px;
  }
`;

const Logo = styled.h3`
  display: inline-block;

  padding: 10px 0;

  font-size: 0.875rem;
  font-family: 'Roboto', sans-serif;
  font-weight: normal;

  ${({
    theme: {
      colors: { grays },
    },
  }) => css`
    color: ${grays[1]};
  `}
`;

const Highlight = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  margin-right: 74px;
`;

const Title = styled.h2`
  font-size: 44px;
  margin: 0;
  margin-top: 30px;
  margin-bottom: 24px;

  ${({
    theme: {
      colors: { grays },
    },
  }) => css`
    color: ${grays[0]};
  `}
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

const Header = () => (
  <Wrapper>
    <Content>
      <Nav>
        <Link to="/">
          <Logo>allysson</Logo>
        </Link>

        <Menu>
          <Link to="/blog">Blog</Link>
          <Link to="/about">Sobre mim</Link>
        </Menu>
      </Nav>
    </Content>
    <Content>
      <Highlight>
        <Info>
          <Title>E aí, Beleza?</Title>
          <Message>
            Sou o Allysson, desenvolvedor Front End no Gympass e vim trazer mais
            conteúdo em português sobre desenvolvimento.
          </Message>
        </Info>
        <Art>
          <Image width={387} right={60} top={0} src="/browser.png" />
          <Image width={234} right={80} top={63} src="/allysson.svg" />
        </Art>
      </Highlight>
    </Content>
  </Wrapper>
);

export default withFade(Header);
