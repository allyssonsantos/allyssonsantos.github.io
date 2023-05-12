import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  type PropsWithChildren,
} from 'react';

import { X } from 'react-feather';

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
      const measure = dialogRef.current?.getBoundingClientRect();
      if (measure) {
        if (
          closeOnClickOutside &&
          (event.clientX < measure!.left ||
            event.clientX > measure!.right ||
            event.clientY < measure!.top ||
            event.clientY > measure!.bottom)
        ) {
          handleClose();
        }
      }
    }

    return (
      <dialog
        {...props}
        onClose={onClose}
        ref={dialogRef}
        aria-labelledby="modal-title"
        onClick={handleClickOutside}
      >
        <button onClick={handleClose} aria-label="close modal">
          <X aria-hidden />
        </button>
        <h2 id="modal-title">Title</h2>
        {children}
      </dialog>
    );
  },
);

Modal.displayName = 'Modal';
