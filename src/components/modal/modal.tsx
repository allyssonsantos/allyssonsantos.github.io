import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  type PropsWithChildren,
} from 'react';

import { X } from 'react-feather';

import { Button } from '../button';
import styles from './modal.module.css';

type ModalProps = PropsWithChildren<{
  title: string;
  closeOnClickOutside?: boolean;
  isOpen: boolean;
}> &
  React.DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    { title, children, closeOnClickOutside, isOpen, onClose, ...props },
    ref,
  ) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => dialogRef.current!);

    useEffect(() => {
      if (isOpen && !dialogRef.current?.open) {
        dialogRef.current?.showModal();
      }

      if (!isOpen && dialogRef.current?.open) {
        dialogRef.current?.close();
      }
    }, [isOpen]);

    function handleClose() {
      dialogRef.current?.close();
    }

    function handleClickOutside(event: React.MouseEvent<HTMLDialogElement>) {
      if ((event.target as HTMLElement).nodeName === 'DIALOG') {
        handleClose();
      }
    }

    return (
      <dialog
        {...props}
        onClose={onClose}
        ref={dialogRef}
        aria-labelledby="modal-title"
        onClick={handleClickOutside}
        className={styles.modal}
      >
        <div className={styles.modal__wrapper}>
          <div className={styles.modal__header}>
            <h2 id="modal-title" className={styles.modal__title}>
              {title}
            </h2>
            <Button
              onClick={handleClose}
              aria-label="close modal"
              variant="icon"
              size="small"
            >
              <X aria-hidden />
            </Button>
          </div>
          {children}
        </div>
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';
