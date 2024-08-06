import type { ISkills } from '../../../data/skills';

import styles from './skills-list.module.css';

interface IProps {
  skills: Array<ISkills>;
}

export function SkillsList({ skills }: Readonly<IProps>) {
  return (
    <ul className={styles.skills__list}>
      {skills.map((skill) => {
        return (
          <li key={skill.name}>
            {skill.url ? (
              <a href={skill.url} target="_blank" rel="noreferrer">
                {skill.name}
              </a>
            ) : (
              skill.name
            )}
            {skill.children.length ? (
              <SkillsList skills={skill.children} />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
