import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useFade } from '@frigobar/animation';

const ModalContext = createContext({});

function ModalComponent({ Component, ...props }) {
  return <Component {...props} />;
}

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

  return (
    modalState && (
      <ModalComponent
        animation={modalAnimation}
        Component={Component}
        onClose={() => {
          toggleModal(false);
          onClose && onClose();
          props?.onClose && props?.onClose();
        }}
        {...props}
        {...rest}
      />
    )
  );
}

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

function useModal() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
}

export { ModalContext, ModalProvider, useModal };
