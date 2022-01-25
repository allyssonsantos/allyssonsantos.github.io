import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal } from '@frigobar/core';

import { Subtitle } from '@components/Elements';

import { useAuth } from '../../contexts/AuthContext';
import GoogleBtn from '../SignIn/Google';

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;

  min-width: 300px;
  min-height: 200px;

  small {
    display: block;

    text-align: center;

    color: ${(props) => props.theme.colors.neutral[900]};
  }
`;

function LoginModal({ onClose, ...props }) {
  const { login } = useAuth();

  return (
    <Modal onClose={onClose} {...props}>
      <Content>
        <Subtitle as="h3">Escolha uma forma de login:</Subtitle>
        <GoogleBtn onClick={login} />
        <div>
          <small>Seu nome será utilizado para exibir em comentários.</small>
          <small>Você pode deletar seus dados a qualquer momento.</small>
        </div>
      </Content>
    </Modal>
  );
}

LoginModal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginModal;
