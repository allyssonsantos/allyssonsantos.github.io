import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Modal as FrigobarModal } from '@frigobar/core';

import { useSlide } from '@frigobar/animation';

const StyledModal = styled(FrigobarModal)`
  @media (max-width: 768px) {
    > :first-child {
      animation: ${(props) => props.mobileAnimation};
    }
  }
`;

function Modal({ onClose, ...props }) {
  const [{ animation }, toggleSlide] = useSlide({
    from: { x: 0, y: '100%' },
    to: { x: 0, y: 0 },
  });

  const handleClose = () => {
    toggleSlide(false);
    onClose();
  };

  return (
    <StyledModal {...props} mobileAnimation={animation} onClose={handleClose} />
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Modal;
