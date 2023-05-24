import { Button, Modal, useModals } from '../';
import { DELETE_ACCOUNT_MODAL_KEY } from 'src/constants/modals';

export function DeleteAccountModal() {
  const { openedModals, closeModal } = useModals();
  const isDeleteAccountModalOpen = openedModals.includes(
    DELETE_ACCOUNT_MODAL_KEY,
  );

  function handleCancel() {
    closeModal(DELETE_ACCOUNT_MODAL_KEY);
  }

  return (
    <Modal
      isOpen={isDeleteAccountModalOpen}
      title="Delete my account"
      onClose={handleCancel}
    >
      <p>All your comments will be deleted as well.</p>
      <Button variant="inverted" onClick={handleCancel}>
        Cancel
      </Button>
      <Button>Delete account</Button>
    </Modal>
  );
}
