import React from 'react';

import { wrapRootElement as Wrap } from './wrap-root-element';

export const wrapRootElement = (props) => {
  return <Wrap {...props} />;
};
