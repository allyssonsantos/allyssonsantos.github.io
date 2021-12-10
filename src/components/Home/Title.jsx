import styled, { css } from 'styled-components';
import rem from '@utils/rem';

const Title = styled.h1(
  ({ theme }) => css`
    font-size: ${rem(22)};
    line-height: 1;

    margin: 0;

    color: ${theme.colors.neutral[800]};
  `
);

export default Title;
