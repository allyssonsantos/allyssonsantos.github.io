import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Menu, Button as FrigobarButton } from '@frigobar/core';
import { useFade } from '@frigobar/animation';

import trackingEvents from '@utils/trackingEvents';
import { Subtitle } from '@components/Elements';
import { useTracking } from '@contexts/TrackingContext';

import Modal from '../Layout/Modal';

import { useAuth, logout, deleteAccount } from '../../contexts/AuthContext';

const Button = styled.button`
  width: 32px;
  height: 32px;

  padding: 0;

  cursor: pointer;

  border: none;
  border-radius: 50%;
  background-color: transparent;
`;

const StyledModal = styled(Modal)`
  section {
    min-height: unset;
  }
`;

function UserInfo() {
  const [open, toggleOpen] = useState(false);
  const anchorRef = useRef(null);
  const { currentUser } = useAuth();
  const { track } = useTracking();

  const [{ animation: modalAnimation, state: modalState }, toggleModal] =
    useFade({
      startOnRender: false,
    });

  return (
    <>
      <Button
        onClick={() => {
          track(trackingEvents.USER_MENU);
          toggleOpen(!open);
        }}
        ref={anchorRef}
        aria-label="Exibir opções da sua conta"
        title="Exibir opções da sua conta"
      >
        <img src={currentUser.photoURL} alt={currentUser.displayName} />
      </Button>
      <Menu
        anchorElement={anchorRef}
        open={open}
        handleClickAway={() => toggleOpen(false)}
      >
        <Menu.Item
          onClick={() => {
            track(trackingEvents.LOGOUT);
            logout();
          }}
        >
          Sair
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            track(trackingEvents.DELETE_BUTTON);
            toggleModal(true);
            toggleOpen(false);
          }}
        >
          Deletar conta
        </Menu.Item>
      </Menu>
      {modalState && (
        <StyledModal
          animation={modalAnimation}
          onClose={() => {
            track(trackingEvents.CLOSE_DELETE_MODAL);
            toggleModal(false);
          }}
          role="dialog"
        >
          <Subtitle as="h3">Deletar conta</Subtitle>
          <p>
            Ao deletar sua conta todos os comentários também serão apagados.
          </p>
          <FrigobarButton
            skin="neutral"
            style={{ marginRight: 12 }}
            onClick={() => {
              track(trackingEvents.CANCEL_DELETE_MODAL);
              toggleModal(false);
            }}
            outline
          >
            Cancelar
          </FrigobarButton>
          <FrigobarButton
            skin="danger"
            onClick={() => {
              track(trackingEvents.CONFIRM_DELETE_ACCOUNT);
              deleteAccount();
            }}
          >
            Deletar conta
          </FrigobarButton>
        </StyledModal>
      )}
    </>
  );
}

export default UserInfo;
