import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';

const sharedTitleStyle = ({
  theme: {
    colors: { white },
  },
}) => css`
  margin: 0;
  padding: 0;

  color: ${white};
  text-decoration: none;
`;

const Wrapper = styled.header(
  ({
    theme: {
      colors: { primary },
    },
  }) => css`
    position: fixed;
    top: 0;
    width: 100%;
    padding: 5px;

    background-color: ${primary};

    text-align: center;
  `
);

const Title = styled.h2(
  ({
    theme: {
      colors: { white },
    },
  }) => css`
    font-size: 1rem;

    ${sharedTitleStyle}
  `
);

const SubTitle = styled.span(
  ({
    theme: {
      colors: { white },
    },
  }) => css`
    font-size: 0.8rem;

    ${sharedTitleStyle}
  `
);

const Header = () => (
  <Wrapper>
    <Link to="/">
      <Title>Allysson Santos</Title>
      <SubTitle>Front-end Developer</SubTitle>
    </Link>
  </Wrapper>
);

export default Header;
