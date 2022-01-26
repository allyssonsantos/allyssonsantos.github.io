import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Menu, Modal, Button as FrigobarButton } from '@frigobar/core';
import { useFade } from '@frigobar/animation';

import { Subtitle } from '@components/Elements';

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

    border: none;
  }

  button svg {
    stroke: ${(props) => props.theme.colors.neutral[900]};
  }
`;

function UserInfo() {
  const [open, toggleOpen] = useState(false);
  const anchorRef = useRef(null);
  const { currentUser } = useAuth();

  const [{ animation: modalAnimation, state: modalState }, toggleModal] =
    useFade({
      startOnRender: false,
    });

  return (
    <>
      <Button
        onClick={() => toggleOpen(!open)}
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
        <Menu.Item onClick={logout}>Sair</Menu.Item>
        <Menu.Item
          onClick={() => {
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
          onClose={() => toggleModal(false)}
        >
          <Subtitle as="h3">Deletar conta</Subtitle>
          <p>
            Ao deletar sua conta todos os comentários também serão apagados.
          </p>
          <FrigobarButton
            skin="neutral"
            style={{ marginRight: 12 }}
            onClick={() => toggleModal(false)}
            outline
          >
            Cancelar
          </FrigobarButton>
          <FrigobarButton
            skin="danger"
            onClick={() => {
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
