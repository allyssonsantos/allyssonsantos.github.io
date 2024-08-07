import type { ISkills } from '../../../data/skills';
import { SkillsList } from '../skills-list/skills-list';

import styles from './skill-details.module.css';

interface IProps {
  name: string;
  skills: Array<ISkills>;
}

export function SkillDetails({ name, skills }: Readonly<IProps>) {
  return (
    <details className={styles.skill__details}>
      <summary className={styles['skill__details-summary']}>{name}</summary>
      <SkillsList skills={skills} />
    </details>
  );
}
