import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Search } from 'react-feather';

import rem from '@utils/rem';

const Wrapper = styled.div(
  ({ theme: { spacings } }) => css`
    position: relative;

    max-width: 280px;

    margin-left: 20px;

    svg {
      position: absolute;
      top: 50%;
      left: ${spacings.small}px;

      transform: translateY(-50%);

      pointer-events: none;
    }
  `
);

const Field = styled.input`
  font-size: ${rem(16)};

  width: 100%;

  ${({ theme: { colors, spacings } }) => css`
    padding: ${spacings.small}px;
    padding-left: ${spacings.xxlarge}px;

    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    color: ${colors.neutral[900]};
    border: none;
    border-bottom: 1px solid ${colors.neutral[400]};
    background-color: ${colors.neutral[50]};

    ::placeholder {
      font-size: ${rem(14)};

      color: ${colors.neutral[400]};
    }
  `}
`;

function Input({ onChange, placeholder }) {
  return (
    <Wrapper>
      <Search width={16} height={16} />

      <Field type="text" onChange={onChange} placeholder={placeholder} />
    </Wrapper>
  );
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Input;
