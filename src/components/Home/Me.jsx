import React from 'react';
import styled, { css } from 'styled-components';

import { useDarkTheme } from '@utils/color-scheme';

const Image = styled.img(
  ({ darkTheme }) => css`
    width: 120px;
    height: 120px;

    border: none;
    border-radius: 50%;

    transition: filter 300ms ease-in-out;

    ${darkTheme
      ? css`
          filter: grayscale(0.8) brightness(1.2);
        `
      : css`
          filter: grayscale(0);
        `}
  `
);

function Me() {
  const { currentTheme } = useDarkTheme();

  return (
    <Image
      src="/me.jpg"
      alt="Allysson Santos"
      darkTheme={currentTheme === 'dark'}
    />
  );
}

export default Me;
