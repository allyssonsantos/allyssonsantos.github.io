import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@frigobar/core';

import trackingEvents from '@utils/trackingEvents';
import { useTracking } from '@contexts/TrackingContext';
import { useModal } from '@contexts/ModalContext';
import { deleteComment } from '@services/comments';

import { Modal } from './styles';

export const DELETE_COMMENT_MODAL_KEY = 'DELETE_COMMENT_MODAL';

function DeleteCommentModal({ selected, slug, ...props }) {
  const { track } = useTracking();
  const { close } = useModal();

  const handleCancel = () => {
    close({ key: DELETE_COMMENT_MODAL_KEY });
  };

  const handleDelete = async () => {
    await deleteComment(selected);
    track(trackingEvents.DELETE_COMMENT, { slug });
    close({ key: DELETE_COMMENT_MODAL_KEY });
  };

  return (
    <Modal role="dialog" {...props}>
      <p>Você tem certeza que deseja deletar esse comentário?</p>
      <Button onClick={handleCancel} style={{ marginRight: 12 }}>
        Cancelar
      </Button>
      <Button skin="danger" onClick={handleDelete}>
        Deletar
      </Button>
    </Modal>
  );
}

DeleteCommentModal.propTypes = {
  selected: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default DeleteCommentModal;
