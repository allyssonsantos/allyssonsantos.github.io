import Image from 'next/image';
import { Menu } from 'react-feather';

import styles from './avatar.module.css';

type AvatarProps = {
  src?: string | null;
  name?: string | null;
  onClick?: () => void;
};

export function Avatar({ src = '', name, onClick }: AvatarProps) {
  return (
    <button className={styles.avatar} onClick={onClick}>
      <Menu size={18} />
      <Image width={32} height={32} src={src || ''} alt={name || ''} />
    </button>
  );
}
