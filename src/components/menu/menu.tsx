import type React from 'react';
import { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

import styles from './menu.module.css';

type MenuProps = {
  isOpen?: boolean;
  items: {
    text: string;
    onClick: () => void;
  }[];
} & React.DialogHTMLAttributes<HTMLDialogElement>;

export const Menu = forwardRef<HTMLDialogElement, MenuProps>(
  ({ isOpen, items, onClose }, ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);
    useImperativeHandle(ref, () => dialogRef.current!);

    useEffect(() => {
      if (isOpen && !dialogRef.current!.open) {
        dialogRef.current?.show();
      }

      if (!isOpen && dialogRef.current!.open) {
        dialogRef.current?.close();
      }
    }, [isOpen]);

    function handleClose() {
      dialogRef.current!.close();
    }

    return (
      <dialog className={styles.menu} onClose={onClose} ref={dialogRef}>
        <ul className={styles.menu__list}>
          {items.map(({ text, onClick }) => (
            <li key={text}>
              <button
                className={styles.menu__item}
                onClick={() => {
                  onClick();
                  handleClose();
                }}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </dialog>
    );
  },
);

Menu.displayName = 'Menu';
