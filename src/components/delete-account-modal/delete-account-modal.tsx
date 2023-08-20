import { useTranslation } from 'next-i18next';

import { DELETE_ACCOUNT_MODAL_KEY } from 'src/constants/modals';
import { deleteAccount } from 'src/contexts/auth';
import { Button, Modal, useModals } from '../';

import styles from './delete-account-modal.module.css';

export function DeleteAccountModal() {
  const { t } = useTranslation(['delete-account-modal', 'common']);
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
      title={t('delete-account-modal:title')}
      onClose={handleCancel}
      onClickOutside={handleCancel}
      id="delete-account-modal"
    >
      <p>{t('delete-account-modal:description')}</p>
      <div className={styles.modal__footer}>
        <Button variant="inverted" onClick={handleCancel}>
          {t('common:cancel')}
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {t('delete-account-modal:button')}
        </Button>
      </div>
    </Modal>
  );
}
