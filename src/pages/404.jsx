import React from 'react';

import { SEO } from '@components';

function NotFoundPage() {
  return (
    <>
      <SEO title="404: Not Found" />
      <h1>Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </>
  );
}

export default NotFoundPage;
