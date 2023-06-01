import { useTranslation } from 'next-i18next';

import { DELETE_COMMENT_MODAL_KEY } from 'src/constants/modals';
import { deleteComment } from 'src/services/comments';

import { Button, Modal, useModals } from '../';
import styles from './delete-comment-modal.module.css';

type DeleteCommentModalProps = {
  commentId: string;
  message: string;
};

export function DeleteCommentModal({
  commentId,
  message,
}: DeleteCommentModalProps) {
  const { t, i18n } = useTranslation(['delete-comment-modal', 'common']);
  const { openedModals, closeModal } = useModals();

  const modalId = `${DELETE_COMMENT_MODAL_KEY}-${commentId}`;
  const isDeleteCommentModalOpen = openedModals.includes(modalId);

  function handleCancel() {
    closeModal(modalId);
  }

  function handleDelete() {
    deleteComment(commentId);
    closeModal(modalId);
  }

  return (
    <Modal
      isOpen={isDeleteCommentModalOpen}
      title={t('delete-comment-modal:title')}
      onClose={handleCancel}
      onClickOutside={handleCancel}
    >
      <p>{t('delete-comment-modal:description')}</p>
      <blockquote className={styles.modal__message}>{message}</blockquote>
      <div className={styles.modal__footer}>
        <Button variant="inverted" onClick={handleCancel}>
          {t('common:cancel')}
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {t('common:delete')}
        </Button>
      </div>
    </Modal>
  );
}
