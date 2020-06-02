import React from 'react';
import { Link } from 'gatsby';
import styled, { css } from 'styled-components';
import { withFade } from '@frigobar/animation';

const Wrapper = styled.header`
  max-width: 740px;
  margin: 0 auto;
`;

const Title = styled.h2`
  display: inline-block;

  margin: 20px 10px 0;
  padding: 10px 0;

  font-size: 1.1rem;
  font-family: 'Roboto', sans-serif;

  text-decoration: none;

  ${({
    theme: {
      colors: { primary },
    },
  }) => `
    color: ${primary};
  `}
`;

const Header = ({ title }) => (
  <Wrapper>
    <Link to="/">
      <Title>{title}</Title>
    </Link>
  </Wrapper>
);

export default withFade(Header);
