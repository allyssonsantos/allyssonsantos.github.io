import React from 'react';
import styled from 'styled-components';

import { Button } from '@frigobar/core';

import trackingEvents from '@utils/trackingEvents';
import { useTracking } from '@contexts/TrackingContext';
import { useModal } from '@contexts/ModalContext';
import { deleteAccount } from '@contexts/AuthContext';

import Modal from '../Elements/Modal';

const StyledModal = styled(Modal)`
  section {
    min-height: unset;

    p {
      margin-top: 0;
    }
  }
`;

export const DELETE_MODAL_KEY = 'DELETE_MODAL';

function DeleteAccountModal({ ...props }) {
  const { track } = useTracking();
  const { close } = useModal();

  const handleOnClose = () => {
    track(trackingEvents.CLOSE_DELETE_MODAL);
    close({ key: DELETE_MODAL_KEY });
  };

  const handleOnCancel = () => {
    track(trackingEvents.CANCEL_DELETE_MODAL);
    close({ key: DELETE_MODAL_KEY });
  };

  const handleOnDelete = () => {
    track(trackingEvents.CONFIRM_DELETE_ACCOUNT);
    deleteAccount();
    close({ key: DELETE_MODAL_KEY });
  };

  return (
    <StyledModal title="Deletar conta" {...props} onClose={handleOnClose}>
      <p>Ao deletar sua conta todos os comentários também serão apagados.</p>
      <Button
        skin="neutral"
        style={{ marginRight: 12 }}
        onClick={handleOnCancel}
        outline
      >
        Cancelar
      </Button>
      <Button skin="danger" onClick={handleOnDelete}>
        Deletar conta
      </Button>
    </StyledModal>
  );
}

export default DeleteAccountModal;
