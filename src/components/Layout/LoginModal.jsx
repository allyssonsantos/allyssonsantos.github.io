import React from 'react';
import styled from 'styled-components';
import { Modal } from '@frigobar/core';

import { Subtitle } from '@components/Elements';

import { useAuth } from '../../contexts/AuthContext';
import GoogleBtn from '../SignIn/Google';

const StyledModal = styled(Modal)`
  section {
    border: none;
  }
  button svg {
    stroke: ${(props) => props.theme.colors.neutral[900]};
  }
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;

  min-width: 300px;
  min-height: 200px;
`;

function LoginModal({ onClose, ...props }) {
  const { login } = useAuth();

  return (
    <StyledModal onClose={onClose} {...props}>
      <Content>
        <Subtitle as="h3">Escolha uma forma de login:</Subtitle>
        <GoogleBtn onClick={login} />
      </Content>
    </StyledModal>
  );
}

export default LoginModal;