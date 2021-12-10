import React from 'react';
import { wrapRootElement as wrap } from './wrap-root-element';

const HeadComponents = [
  <link key="dns" rel="dns-prefetch" href="https://fonts.googleapis.com" />,
  <link
    key="preconnect"
    rel="preconnect"
    href="https://fonts.googleapis.com"
  />,
];

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(HeadComponents);
};

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((first) =>
    first.key === 'dns' || first.key === 'preconnect' ? -1 : 1
  );
  replaceHeadComponents(headComponents);
};

export const wrapRootElement = wrap;
