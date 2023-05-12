import { createContext, useContext } from 'react';

type ModalContextType = {
  openModal: (modalKey: string) => void;
  closeModal: (modalKey: string) => void;
  openedModals: string[];
};

export const ModalContext = createContext({} as ModalContextType);

export function useModals() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModals must be used within a ModalProvider');
  }
  return context;
}
