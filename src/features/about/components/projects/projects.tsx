import { QuantumCard, React95Card, YogaCard } from './project-card';

import styles from './projects.module.css';

export function Projects() {
  return (
    <section className={styles.projects}>
      <QuantumCard className={styles.projects__project} />
      <React95Card className={styles.projects__project} />
      <YogaCard className={styles.projects__project} />
    </section>
  );
}
