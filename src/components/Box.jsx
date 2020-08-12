import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { normal } from '../utils/theme';

const Box = styled.div`
  margin-bottom: 26px;
  margin-top: 26px;

  line-height: 28px;

  ${({ $mt, $mr, $mb, $ml, $lh, $color, $size, $weight, $display, $textAlign }) => css`
    display: ${$display};

    margin-top: ${$mt}px;
    margin-right: ${$mr}px;
    margin-bottom: ${$mb}px;
    margin-left: ${$ml}px;

    line-height: ${$lh};

    color: ${$color};
    font-size: ${$size};
    font-weight: ${$weight};
    text-align: ${$textAlign};
  `}
`;

Box.propTypes = {
  $mt: PropTypes.number,
  $mr: PropTypes.number,
  $mb: PropTypes.number,
  $ml: PropTypes.number,
  $lh: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  $color: PropTypes.string,
  $size: PropTypes.string,
  $weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  $display: PropTypes.string,
  $textAlign: PropTypes.string,
};

Box.defaultProps = {
  $mt: 0,
  $mr: 0,
  $mb: 0,
  $ml: 0,
  $lh: 'initial',
  $color: normal.colors.grays[0],
  $size: '1rem',
  $weight: 'normal',
  $display: 'block',
  $textAlign: 'left',
};

export default Box;
