import { DELETE_ACCOUNT_MODAL_KEY } from 'src/constants/modals';
import { Button, Modal, useModals } from '../';
import { deleteAccount } from 'src/contexts/auth';

import styles from './delete-account-modal.module.css';

export function DeleteAccountModal() {
  const { openedModals, closeModal } = useModals();
  const isDeleteAccountModalOpen = openedModals.includes(
    DELETE_ACCOUNT_MODAL_KEY,
  );

  function handleCancel() {
    closeModal(DELETE_ACCOUNT_MODAL_KEY);
  }

  function handleDelete() {
    deleteAccount();
    closeModal(DELETE_ACCOUNT_MODAL_KEY);
  }

  return (
    <Modal
      isOpen={isDeleteAccountModalOpen}
      title="Delete my account"
      onClose={handleCancel}
      onClickOutside={handleCancel}
    >
      <p>All your comments will be deleted as well.</p>
      <div className={styles.modal__footer}>
        <Button variant="inverted" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          Delete account
        </Button>
      </div>
    </Modal>
  );
}
