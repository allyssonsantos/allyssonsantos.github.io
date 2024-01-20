import { useState } from 'react';

import type { AuthError } from 'firebase/auth';
import { useTranslation } from 'next-i18next';

import { SIGN_IN_MODAL_KEY } from 'src/constants/modals';
import { login } from 'src/contexts/auth';

import styles from './sign-in-modal.module.css';
import { Modal, GoogleButton, useModals } from '..';

const POPUP_CLOSED_ERROR = 'auth/popup-closed-by-user';

export function SignInModal() {
  const [loginError, setLoginError] = useState(false);
  const { openedModals, closeModal } = useModals();
  const { t } = useTranslation('sign-in-modal');

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
      title={t('title')}
      onClose={closeSignInModal}
      onClickOutside={closeSignInModal}
      id="sign-in-modal"
    >
      <div className={styles['sign-in-modal']}>
        <GoogleButton
          className={styles['sign-in-modal__button']}
          onClick={doLogin}
        />
        {loginError && <div>something went wrong</div>}
        <div className={styles['sign-in-modal__disclaimer']}>
          <small>{t('disclaimer-1')}</small>
          <small>{t('disclaimer-2')}</small>
        </div>
      </div>
    </Modal>
  );
}
