import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Menu } from '@frigobar/core';

import trackingEvents from '@utils/trackingEvents';
import { useTracking } from '@contexts/TrackingContext';
import { useAuth, logout } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

import DeleteAccountModal, { DELETE_MODAL_KEY } from './DeleteAccountModal';

const Button = styled.button`
  width: 32px;
  height: 32px;

  padding: 0;

  cursor: pointer;

  border: none;
  border-radius: 50%;
  background-color: transparent;
`;

function UserInfo() {
  const [open, toggleOpen] = useState(false);
  const anchorRef = useRef(null);
  const { currentUser } = useAuth();
  const { track } = useTracking();
  const { open: openModal } = useModal();

  const handleMenu = () => {
    track(trackingEvents.USER_MENU);
    toggleOpen(!open);
  };

  const handleLogout = () => {
    track(trackingEvents.LOGOUT);
    toggleOpen(false);
    logout();
  };

  const handleDelete = () => {
    track(trackingEvents.DELETE_BUTTON);
    openModal({ component: DeleteAccountModal, key: DELETE_MODAL_KEY });
    toggleOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleMenu}
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
        <Menu.Item onClick={handleLogout}>Sair</Menu.Item>
        <Menu.Item onClick={handleDelete}>Deletar conta</Menu.Item>
      </Menu>
    </>
  );
}

export default UserInfo;
