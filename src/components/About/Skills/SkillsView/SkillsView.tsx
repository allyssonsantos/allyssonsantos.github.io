import { html, css, javascript } from 'src/data/skills';

import { SkillDetails } from '../SkillDetails';

export function SkillsView() {
  return (
    <section>
      <SkillDetails name="HTML" skills={html} />
      <SkillDetails name="CSS" skills={css} />
      <SkillDetails name="Javascript" skills={javascript} />
    </section>
  );
}
