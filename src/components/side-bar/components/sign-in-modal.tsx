import { useState } from 'react';

import { SIGN_IN_MODAL_KEY } from 'src/constants/modals';
import { login } from 'src/contexts/auth';
import { Modal, GoogleButton, useModals } from '../..';

import styles from './sign-in-modal.module.css';
import { type AuthError } from 'firebase/auth';

const POPUP_CLOSED_ERROR = 'auth/popup-closed-by-user';

export function SignInModal() {
  const [loginError, setLoginError] = useState(false);
  const { openedModals, closeModal } = useModals();
  const isSignUpModalOpen = openedModals.includes(SIGN_IN_MODAL_KEY);

  function closeSignInModal() {
    closeModal(SIGN_IN_MODAL_KEY);
  }

  async function doLogin() {
    try {
      await login();
      setLoginError(false);
      closeModal(SIGN_IN_MODAL_KEY);
    } catch (err) {
      const error = err as AuthError;
      if (error.code === POPUP_CLOSED_ERROR) {
        return;
      }

      setLoginError(true);
    }
  }

  return (
    <Modal
      isOpen={isSignUpModalOpen}
      title="Escolha uma forma de login:"
      onClose={closeSignInModal}
      closeOnClickOutside
    >
      <div className={styles['sign-in-modal']}>
        <GoogleButton
          className={styles['sign-in-modal__button']}
          onClick={doLogin}
        />
        {loginError && <div>something went wrong</div>}
        <div className={styles['sign-in-modal__disclaimer']}>
          <small>Seu nome será utilizado para exibir seus comentários.</small>
          <small>Você pode deletar seus dados a qualquer momento.</small>
        </div>
      </div>
    </Modal>
  );
}
