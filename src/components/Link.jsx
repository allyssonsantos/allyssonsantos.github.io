import React from 'react';
import styled, { withTheme } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { Box } from '.';

const StyledBox = styled(Box)`
  padding: 10px 16px;
  &.active {
    background-color: #394d64;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: bold;
  }
`;

const Link = ({ theme, ...props }) => (
  <StyledBox
    as={GatsbyLink}
    {...props}
    color={props.color || theme.colors.primary}
    size={props.size || '0.875rem'}
    weight={props.weight || 'bold'}
    display={props.display || 'inline-block'}
  />
);

export default withTheme(Link);
