import React from 'react';

import useTransition from '@utils/useTransition';
import { Description, SEO } from '@components';
import { Title } from '@components/Home';

function NotFoundPage() {
  const { animation } = useTransition();

  return (
    <div animation={animation}>
      <SEO title="404: Not Found" />
      <Title>Not Found</Title>
      <Description>Essa página não existe 🧐</Description>
    </div>
  );
}

export default NotFoundPage;
