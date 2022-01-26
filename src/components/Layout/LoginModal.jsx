import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Modal, Alert } from '@frigobar/core';

import { Subtitle } from '@components/Elements';

import { login } from '../../contexts/AuthContext';
import GoogleBtn from '../SignIn/Google';

const POPUP_CLOSED_ERROR = 'auth/popup-closed-by-user';

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
  const [error, setError] = useState(false);

  const handleLogin = useCallback(async () => {
    try {
      await login();
    } catch (err) {
      if (err.code === POPUP_CLOSED_ERROR) {
        return;
      }

      setError(err);
    }
  }, []);

  return (
    <Modal onClose={onClose} {...props}>
      <Content>
        <Subtitle as="h3">Escolha uma forma de login:</Subtitle>
        <GoogleBtn onClick={handleLogin} />
        <Alert show={error} type="warning">
          Ocorreu algum problema com o seu login, tente novamente.
        </Alert>
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
