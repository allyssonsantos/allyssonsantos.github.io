import type { MouseEventHandler } from 'react';

import { Button } from 'src/components';
import styles from './project-card.module.css';

type ProjectCardProps = React.HTMLAttributes<HTMLDivElement> & {
  name: string;
  description: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  borderPrimaryColor: string;
  borderSecondaryColor: string;
};

export function ProjectCard({
  name,
  description,
  onClick,
  className,
  borderPrimaryColor,
  borderSecondaryColor,
}: ProjectCardProps) {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={
        {
          '--color-primary': borderPrimaryColor,
          '--color-secondary': borderSecondaryColor,
        } as React.CSSProperties
      }
    >
      <h3 className={styles.card__title}>{name}</h3>
      <p className={styles.card__description}>{description}</p>
      <Button
        className={styles['card__see-more']}
        onClick={onClick}
        type="button"
        variant="inverted"
      >
        see more
      </Button>
    </div>
  );
}
