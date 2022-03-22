import React from 'react';
import mixpanel from 'mixpanel-browser';

import { TrackingProvider } from '@contexts/TrackingContext';
import { wrapRootElement as Wrap } from './wrap-root-element';

export const wrapRootElement = (props) => {
  mixpanel.init(process.env.GATSBY_MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV !== 'production',
  });

  return (
    <TrackingProvider tracking={mixpanel}>
      <Wrap {...props} />
    </TrackingProvider>
  );
};
