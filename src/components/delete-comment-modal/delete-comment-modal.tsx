import { DELETE_COMMENT_MODAL_KEY } from 'src/constants/modals';
import { Button, Modal, useModals } from '../';
import { deleteComment } from 'src/services/comments';

import styles from './delete-comment-modal.module.css';

type DeleteCommentModalProps = {
  commentId: string;
  message: string;
};

export function DeleteCommentModal({
  commentId,
  message,
}: DeleteCommentModalProps) {
  const modalId = `${DELETE_COMMENT_MODAL_KEY}-${commentId}`;
  const { openedModals, closeModal } = useModals();
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
      title="Delete comment"
      onClose={handleCancel}
      onClickOutside={handleCancel}
    >
      <p>Are you sure that you want to delete this comment?</p>
      <blockquote className={styles.modal__message}>{message}</blockquote>
      <div className={styles.modal__footer}>
        <Button variant="inverted" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}
