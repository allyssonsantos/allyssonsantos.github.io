import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Menu } from '@frigobar/core';

import { Loading } from '@components/Elements';

import trackingEvents from '@utils/trackingEvents';

import { useTracking } from '@contexts/TrackingContext';
import { useAuth, logout } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

import LoginButton from './Login';
import LoginModal, { LOGIN_MODAL_KEY } from './LoginModal';
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
  const [menuOpen, toggleMenuOpen] = useState(false);
  const anchorRef = useRef(null);
  const { currentUser, loadingUser } = useAuth();
  const { track } = useTracking();
  const { open: openModal, close } = useModal();

  const handleMenu = () => {
    track(trackingEvents.USER_MENU);
    toggleMenuOpen(!menuOpen);
  };

  const handleDoLogin = () => {
    track(trackingEvents.LOGIN_BUTTON);
    openModal({ component: LoginModal, key: LOGIN_MODAL_KEY });
  };

  const handleLogout = () => {
    track(trackingEvents.LOGOUT);
    toggleMenuOpen(false);
    logout();
  };

  const handleDelete = () => {
    track(trackingEvents.DELETE_BUTTON);
    openModal({ component: DeleteAccountModal, key: DELETE_MODAL_KEY });
    toggleMenuOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
      close({ key: LOGIN_MODAL_KEY });
    }
  }, [currentUser]);

  if (loadingUser) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <LoginButton
        skin="neutral"
        onClick={handleDoLogin}
        aria-label="Fazer login"
      >
        Entrar
      </LoginButton>
    );
  }

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
        open={menuOpen}
        handleClickAway={() => toggleMenuOpen(false)}
      >
        <Menu.Item onClick={handleLogout}>Sair</Menu.Item>
        <Menu.Item onClick={handleDelete}>Deletar conta</Menu.Item>
      </Menu>
    </>
  );
}

export default UserInfo;
