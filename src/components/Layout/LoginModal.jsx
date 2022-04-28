import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Alert } from '@frigobar/core';

import trackingEvents from '@utils/trackingEvents';
import { login } from '@contexts/AuthContext';
import { useTracking } from '@contexts/TrackingContext';

import Modal from './Modal';
import GoogleBtn from '../SignIn/Google';

const POPUP_CLOSED_ERROR = 'auth/popup-closed-by-user';

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  min-width: 300px;
  min-height: 200px;

  small {
    display: block;

    text-align: left;

    color: ${(props) => props.theme.colors.neutral[900]};
  }
`;

export const LOGIN_MODAL_KEY = 'LOGIN_MODAL';

function LoginModal({ onClose, ...props }) {
  const [error, setError] = useState(false);
  const { track } = useTracking();

  const handleLogin = useCallback(async () => {
    track(trackingEvents.LOGIN_GOOGLE);
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
    <Modal onClose={onClose} title="Escolha uma forma de login:" {...props}>
      <Content>
        <GoogleBtn onClick={handleLogin} />
        <Alert show={error} type="warning">
          Ocorreu algum problema com o seu login, tente novamente.
        </Alert>
        <div>
          <small>Seu nome será utilizado para exibir seus comentários.</small>
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
