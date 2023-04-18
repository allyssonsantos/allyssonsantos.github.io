import { html, css, javascript } from '../../data/skills';

import { SkillDetails } from './skill-details';

export function Skills() {
  return (
    <section>
      <SkillDetails name="HTML" skills={html} />
      <SkillDetails name="CSS" skills={css} />
      <SkillDetails name="Javascript" skills={javascript} />
    </section>
  );
}
