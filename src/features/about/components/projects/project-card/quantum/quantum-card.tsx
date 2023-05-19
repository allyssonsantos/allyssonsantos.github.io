import { Card, Button } from '@catho/quantum';
import { cva } from 'class-variance-authority';

import { quantumCard } from '../../../../data/projects';
import styles from './quantum-card.module.css';

const quantumCardStyles = cva(styles['quantum-card']);

export function QuantumCard({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Card className={quantumCardStyles({ className })}>
      <Card.Header>
        <Card.HeaderText>
          <Card.Title>{quantumCard.name}</Card.Title>
        </Card.HeaderText>
      </Card.Header>
      <Card.Content>{quantumCard.description}</Card.Content>
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
