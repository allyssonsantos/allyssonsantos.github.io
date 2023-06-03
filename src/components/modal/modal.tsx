import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

import { cva } from 'class-variance-authority';
import { X } from 'react-feather';
import { useTranslation } from 'next-i18next';

import { Button } from '../button';
import styles from './modal.module.css';

const modal = cva(styles.modal, {
  variants: {
    fadeIn: {
      true: 'fade-in slide-in-mobile',
    },
    fadeOut: {
      true: 'fade-out slide-out-mobile',
    },
  },
});

type ModalProps = PropsWithChildren<{
  title: string;
  onClickOutside?: () => void;
  isOpen: boolean;
}> &
  React.DialogHTMLAttributes<HTMLDialogElement>;

export const Modal = forwardRef<HTMLDialogElement, ModalProps>(
  (
    { title, children, onClickOutside, isOpen, onClose, className, ...props },
    ref,
    ) => {
      const dialogRef = useRef<HTMLDialogElement | null>(null);
      const [internalClosed, setInternalClosed] = useState(false);
      const { t } = useTranslation('common');

    useImperativeHandle(ref, () => dialogRef.current!);

    useEffect(() => {
      if (isOpen && !dialogRef.current?.open) {
        dialogRef.current?.showModal();
      }
    }, [isOpen]);

    function handleClose() {
      setInternalClosed(true);
    }

    function handleClickOutside(event: React.MouseEvent<HTMLDialogElement>) {
      if (
        (event.target as HTMLElement).nodeName === 'DIALOG' &&
        onClickOutside
      ) {
        onClickOutside();
      }
    }

    return (
      <dialog
        {...props}
        onClose={onClose}
        ref={dialogRef}
        aria-labelledby="modal-title"
        onClick={handleClickOutside}
        onAnimationEnd={() => {
          if (!isOpen || internalClosed) {
            dialogRef.current?.close();
            setInternalClosed(false);
          }
        }}
        className={modal({
          className,
          fadeIn: isOpen && !internalClosed,
          fadeOut: !isOpen || internalClosed,
        })}
      >
        <div className={styles.modal__wrapper}>
          <div className={styles.modal__header}>
            <h2 id="modal-title" className={styles.modal__title}>
              {title}
            </h2>
            <Button
              onClick={handleClose}
              aria-label={t('close-modal')}
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
