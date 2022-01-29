import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader } from 'react-feather';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledLoader = styled(Loader)`
  animation: ${spin};
  animation-duration: 2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

function Loading() {
  return <StyledLoader width={18} height={18} />;
}

export default Loading;
