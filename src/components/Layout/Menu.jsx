import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { X, Menu as MenuIcon } from 'react-feather';

import MenuButton from './MenuButton';

const Wrapper = styled.div(
  ({ theme: { colors, spacings } }) => css`
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;

    display: none;

    width: 100%;
    height: ${24 + spacings.medium * 2}px;

    padding: ${spacings.medium}px;

    transition: background-color 300ms ease-in-out;

    background-color: ${colors.neutral[50]};
    box-shadow: 0px 0px 10px -5px #000;

    @media (max-width: 1024px) {
      display: flex;
      align-items: center;
    }
  `
);

function Menu({ onClick, close }) {
  const label = close ? 'Fechar menu' : 'Abrir menu';
  return (
    <Wrapper>
      <MenuButton onClick={onClick} aria-label={label} title={label}>
        {close ? (
          <X width={24} height={24} />
        ) : (
          <MenuIcon width={24} height={24} />
        )}
      </MenuButton>
    </Wrapper>
  );
}

Menu.propTypes = {
  onClick: PropTypes.func.isRequired,
  close: PropTypes.bool,
};

Menu.defaultProps = {
  close: false,
};

export default Menu;
