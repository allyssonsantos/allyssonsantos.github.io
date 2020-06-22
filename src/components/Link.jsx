import React from 'react';
import { withTheme } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { Box } from '.';

const Link = ({ theme, ...props }) => (
  <Box
    as={GatsbyLink}
    {...props}
    color={props.color || theme.colors.primary}
    size={props.size || '0.875rem'}
    weight={props.weight || 'bold'}
    display={props.display || 'inline-block'}
  />
);

export default withTheme(Link);
