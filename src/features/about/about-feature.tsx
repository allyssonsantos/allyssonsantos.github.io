import { Projects, Skills, Companies } from './components';

import styles from './about.module.css';

export function AboutFeature() {
  return (
    <div>
      <section className={styles['about-centralized']}>
        <h1 className={styles.about__title}>Hi! I&apos;m Allysson Santos</h1>
        <p>
          This space is where I test new things I want to learn and write about
          thoughts and technology in general but mainly about front-end stuff.
        </p>
        <p>
          I&apos;ve worked with several front-end tools, from the basics to the
          most recent frameworks and libraries, such as: (click in the language
          to open)
        </p>
      </section>
      <section className={styles['about-centralized']}>
        <Skills />
        <p>
          Today I&apos;m working with design-systems and micro frontends
          implementations.
        </p>
      </section>
      <section className={styles.about__experiences}>
        <div className={styles['about-centralized']}>
          <h2 className={styles.about__subtitle}>My previous experiences</h2>
          <Companies />
        </div>
      </section>
      <section className={styles['about-centralized']}>
        <h2 className={styles.about__subtitle}>
          Projects I&apos;m proud to have been a part of
        </h2>
        <Projects />
      </section>
    </div>
  );
}
