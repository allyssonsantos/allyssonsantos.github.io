import React from 'react';
import { withTheme } from 'styled-components';

import { Box } from '.';

const Title = ({ theme, ...props }) => (
  <Box
    $textAlign="center"
    $mt={62}
    $mb={20}
    $size="1.75rem"
    $color={theme.colors.grays[0]}
    $weight="bold"
    {...props}
  />
);

export default withTheme(Title);
