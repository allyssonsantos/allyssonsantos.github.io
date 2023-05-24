import Image from 'next/image';

import styles from './avatar.module.css';

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  onClick?: () => void;
};

export function Avatar({ src = '', name, onClick }: AvatarProps) {
  return (
    <button className={styles.avatar} onClick={onClick}>
      <Image width={32} height={32} src={src || ''} alt={name || ''} />
    </button>
  );
}
