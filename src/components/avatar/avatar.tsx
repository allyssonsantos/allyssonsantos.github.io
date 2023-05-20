import Image from 'next/image';

import styles from './avatar.module.css';

type AvatarProps = {
  src?: string | null;
  name?: string | null;
};

export function Avatar({ src = '', name }: AvatarProps) {
  return (
    <Image
      width={20}
      height={20}
      src={src || ''}
      alt={name || ''}
      className={styles.avatar}
    />
  );
}
