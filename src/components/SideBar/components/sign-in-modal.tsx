import { SIGN_IN_MODAL_KEY } from 'src/constants/modals';
import { Modal, GoogleButton, useModals } from '../..';

import styles from './sign-in-modal.module.css';

export function SignInModal() {
  const { openedModals, closeModal } = useModals();
  const isSignUpModalOpen = openedModals.includes(SIGN_IN_MODAL_KEY);

  function closeSignInModal() {
    closeModal(SIGN_IN_MODAL_KEY);
  }

  return (
    <Modal
      isOpen={isSignUpModalOpen}
      title="Escolha uma forma de login:"
      onClose={closeSignInModal}
      closeOnClickOutside
    >
      <div className={styles['sign-in-modal']}>
        <GoogleButton className={styles['sign-in-modal__button']} />
        <div className={styles['sign-in-modal__disclaimer']}>
          <small>Seu nome será utilizado para exibir seus comentários.</small>
          <small>Você pode deletar seus dados a qualquer momento.</small>
        </div>
      </div>
    </Modal>
  );
}
