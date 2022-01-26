import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

import { useDarkTheme } from '@utils/color-scheme';
import rem from '@utils/rem';

const Picture = styled.picture(
  ({ theme }) => css`
    flex-shrink: 0;

    margin-bottom: 24px;

    border: none;
    border-radius: ${theme.radius[1]}px;

    @media (min-width: 540px) {
      margin-left: 24px;
    }
  `
);

const Image = styled.img(
  ({ darkTheme }) => css`
    width: ${rem(120)};
    height: ${rem(120)};

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

function Me({ children, ...props }) {
  const { currentTheme } = useDarkTheme();

  return (
    <Picture>
      {children}
      <Image
        alt="Allysson Santos"
        darkTheme={currentTheme === 'dark'}
        src="/me.jpg"
        {...props}
      />
    </Picture>
  );
}

Me.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Me;
