import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 14px 16px;

  font-size: 1rem;
  font-weight: bold;

  border: none;

  text-decoration: none;

  ${({ theme: { colors, radius } }) => css`
    background-color: ${colors.primary};
    color: ${colors.white};

    border-radius: ${radius}px;
  `}
`;

export default Button;
