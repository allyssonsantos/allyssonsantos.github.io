import { useTranslation } from 'next-i18next';

import { Projects } from './components/projects/projects';
import { Skills } from './components/skills/skills';
import { Companies } from './components/companies/companies';

import styles from './about.module.css';

export function AboutFeature() {
  const { t } = useTranslation('about');

  return (
    <div>
      <section className={styles['about-centralized']}>
        <h1 className={styles.about__title}>{t('title')}</h1>
        <p>{t('description-1')}</p>
        <p>{t('description-2')}</p>
      </section>
      <section className={styles['about-centralized']}>
        <Skills />
      </section>
      <section className={styles.about__highlighted}>
        <div className={styles['about-centralized']}>
          <h2 className={`${styles.about__subtitle}`}>{t('projects-title')}</h2>
          <Projects />
        </div>
      </section>
      <section className={styles['about-centralized']}>
        <h2
          className={`${styles.about__subtitle}  ${styles['about__subtitle--without-padding']}`}
        >
          {t('experiences-title')}
        </h2>
        <Companies />
      </section>
    </div>
  );
}
