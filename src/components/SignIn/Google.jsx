import React from 'react';
import styled from 'styled-components';

import GoogleLogo from '@static/logos/google.svg';

const Button = styled.button`
  font-size: 14px;

  display: flex;
  align-items: center;

  padding: 8px 12px 8px 8px;

  cursor: pointer;

  color: rgba(0, 0, 0, 0.54);

  border: 1px solid ${(props) => props.theme.colors.neutral[200]};
  border-radius: 3px;
  background-color: #fff;

  && svg {
    margin-right: 8px;
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
