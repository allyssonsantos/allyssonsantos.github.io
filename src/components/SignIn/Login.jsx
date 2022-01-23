import styled, { css } from 'styled-components';

const Button = styled.button(
  ({ theme }) => css`
    font-size: 14px;

    padding: 8px;

    cursor: pointer;

    transition: color 0.3s ease;

    color: ${theme.colors.neutral[900]};

    border: none;
    border-radius: ${theme.radius[1]}px;
    background-color: transparent;

    &:hover {
      background-color: ${theme.colors.neutral[100]};
    }
  `
);

export default Button;
