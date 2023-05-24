import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { useFade } from '@frigobar/animation';

const ModalContext = createContext({});

function ModalComponent({ Component, ...props }) {
  return <Component {...props} />;
}

ModalComponent.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

function ModalRender({ Component, props, opened, onClose, ...rest }) {
  const [{ animation: modalAnimation, state: modalState }, toggleModal] =
    useFade();

  useEffect(() => {
    if (opened) {
      toggleModal(true);
    } else {
      toggleModal(false);
    }
  }, [opened]);

  const handleOnClose = () => {
    toggleModal(false);
    if (onClose) onClose();
    if (props?.onClose) props?.onClose();
  };

  return (
    modalState && (
      <ModalComponent
        Component={Component}
        animation={modalAnimation}
        onClose={handleOnClose}
        {...props}
        {...rest}
      />
    )
  );
}

ModalRender.propTypes = {
  Component: PropTypes.elementType.isRequired,
  props: PropTypes.shape({}),
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalRender.defaultProps = {
  props: {},
};

function ModalProvider({ children }) {
  const [modals, setModals] = useState([]);

  function open({ component, props, key }) {
    setModals((prevModals) => [
      ...prevModals.filter((prevModal) => prevModal.key !== key),
      { component, props, opened: true, key },
    ]);
  }

  function close({ key }) {
    setModals((prevModals) =>
      prevModals.map((prevModal) =>
        prevModal.key === key ? { ...prevModal, opened: false } : prevModal
      )
    );
  }

  const value = useMemo(
    () => ({
      open,
      close,
    }),
    [open, close]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modals.map((modal) => (
        <ModalRender
          key={modal.key}
          Component={modal.component}
          props={modal.props}
          opened={modal.opened}
          onClose={() => close({ key: modal.key })}
        />
      ))}
    </ModalContext.Provider>
  );
}

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

export { ModalContext, ModalProvider, useModal };