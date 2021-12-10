import styled, { css, keyframes } from 'styled-components';

const BorderAnimation = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`;

const Hr = styled.hr(
  ({ theme }) => css`
    width: 100%;
    height: 1px;

    margin-top: ${theme.spacings.xlarge}px;
    margin-bottom: ${theme.spacings.xlarge}px;

    animation: ${BorderAnimation} 8s ease-in-out infinite;

    background: linear-gradient(
      to right,
      ${theme.colors.primary[500]},
      ${theme.colors.secondary[500]},
      ${theme.colors.primary[500]}
    );
    background-size: 200% 200%;
  `
);

export default Hr;
