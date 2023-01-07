import { ISkills } from 'src/data/skills';
import { SkillsList } from '../SkillsList';

import styles from './SkillDetails.module.css';

interface IProps {
  name: string;
  skills: Array<ISkills>;
}

export function SkillDetails({ name, skills }: IProps) {
  return (
    <details className={styles.skill__details}>
      <summary className={styles['skill__details-summary']}>{name}</summary>
      <SkillsList skills={skills} />
    </details>
  );
}
