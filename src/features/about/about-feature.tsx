import { Projects, Skills, Companies } from './components';

import styles from './about.module.css';

export function AboutFeature() {
  return (
    <section>
      <h1 className={styles.about__title}>Hi! I&apos;m Allysson Santos</h1>
      <p>
        This space is where I test new things I want to learn and write about
        thoughts and technology in general but mainly about front-end stuff.
      </p>
      <hr className={styles.about__divider} />
      <p>
        I&apos;ve worked with several front-end tools, from the basics to the
        most recent frameworks and libraries, such as: (click in the language to
        open)
      </p>
      <Skills />
      <p>
        Today I&apos;m working with design-systems and micro frontends
        implementations.
      </p>
      <hr className={styles.about__divider} />
      <h2 className={styles.about__subtitle}>My previous experiences</h2>
      <p>Worked in these companies:</p>
      <Companies />
      <hr className={styles.about__divider} />
      <h2 className={styles.about__subtitle}>
        Projects I&apos;m proud to have been a part of
      </h2>
      <Projects />
    </section>
  );
}
