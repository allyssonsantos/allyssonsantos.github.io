import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Link as GatsbyLink } from 'gatsby';

import { Box } from '.';

const StyledBox = styled(Box)(
  ({ $pt, $pr, $pb, $pl }) => `
  padding-top: ${$pt}px;
  padding-right: ${$pr}px;
  padding-bottom: ${$pb}px;
  padding-left: ${$pl}px;

  &.active {
    background-color: #394d64;
    border-radius: 8px;
    padding: 10px 16px;
    font-weight: bold;
  }
`
);

const Link = ({ theme, $pt, $pr, $pb, $pl, ...props }) => (
  <StyledBox
    as={GatsbyLink}
    {...props}
    $color={props.$color || theme.colors.primary}
    $size={props.$size || '0.875rem'}
    $weight={props.$weight || 'bold'}
    $display={props.$display || 'inline-block'}
    $pt={$pt}
    $pr={$pr}
    $pb={$pb}
    $pl={$pl}
  />
);

Link.propTypes = {
  $pt: PropTypes.number,
  $pr: PropTypes.number,
  $pb: PropTypes.number,
  $pl: PropTypes.number,
};

Link.defaultProps = {
  $pt: 10,
  $pr: 16,
  $pb: 10,
  $pl: 16,
};

export default withTheme(Link);
