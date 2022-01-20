import React from 'react';
import styled from 'styled-components';

import GoogleLogo from '@static/logos/google.svg';

const Button = styled.button`
  display: flex;
  align-items: center;

  padding: 8px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.54);
  background-color: #fff;

  border: none;
  border-radius: 3px;

  cursor: pointer;

  && svg {
    margin-right: 24px;
    stroke: none;
  }
`;

function GoogleBtn({ onClick }) {
  return (
    <Button onClick={onClick}>
      <GoogleLogo /> Entrar com Google
    </Button>
  );
}

export default GoogleBtn;
