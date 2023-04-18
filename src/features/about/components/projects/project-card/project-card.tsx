import type { MouseEventHandler } from 'react';

import { Button } from 'src/components';
import styles from './project-card.module.css';

type ProjectCardProps = {
  name: string;
  description: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function ProjectCard({ name, description, onClick }: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.card__title}>{name}</h3>
      <p className={styles.card__description}>{description}</p>
      <Button
        className={styles['card__see-more']}
        onClick={onClick}
        type="button"
        variant="inverted"
      >
        I want to know more about it!
      </Button>
    </div>
  );
}
