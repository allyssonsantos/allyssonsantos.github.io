import { Card, Button } from '@catho/quantum';
import { cva } from 'class-variance-authority';
import { useTranslation } from 'next-i18next';

import { quantumCard } from '../../../../data/projects';
import styles from './quantum-card.module.css';

const quantumCardStyles = cva(styles['quantum-card']);

export function QuantumCard({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { t } = useTranslation('about');

  return (
    <Card className={quantumCardStyles({ className })}>
      <Card.Header>
        <Card.Thumbnail
          src="/images/about-me/quantum_logo.svg"
          alt="quantum logo"
        />
      </Card.Header>
      <Card.Content>{t(quantumCard.description)}</Card.Content>
      <Card.Footer
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          marginTop: 'auto',
        }}
      >
        <Button
          stroked
          size="small"
          onClick={() => window.open(quantumCard.githubUrl)}
        >
          repo
        </Button>
        <Button
          stroked
          size="small"
          onClick={() => window.open(quantumCard.website)}
        >
          docs
        </Button>
      </Card.Footer>
    </Card>
  );
}
