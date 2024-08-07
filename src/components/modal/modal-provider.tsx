import { type PropsWithChildren, useState, useMemo, useCallback } from 'react';
import { ModalContext } from './modal-context';

export function ModalProvider({ children }: Readonly<PropsWithChildren<{}>>) {
  const [openedModals, setOpenedModals] = useState<string[]>([]);

  const openModal = useCallback((modalKey: string) => {
    setOpenedModals((prev) => [...prev, modalKey]);
  }, []);

  const closeModal = useCallback((modalKey: string) => {
    setOpenedModals((prev) => prev.filter((modal) => modal !== modalKey));
  }, []);

  const value = useMemo(
    () => ({
      openedModals,
      openModal,
      closeModal,
    }),
    [openedModals, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
