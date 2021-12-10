import React from 'react';
import styled, { css } from 'styled-components';

import { useDarkTheme } from '@utils/color-scheme';
import rem from '@utils/rem';

const Image = styled.img(
  ({ darkTheme, theme }) => css`
    width: ${rem(120)};
    height: ${rem(120)};

    transition: filter 300ms ease-in-out;

    border: none;
    border-radius: ${theme.radius[1]}px;

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
