import { useTranslation } from 'next-i18next';

import { Projects, Skills, Companies } from './components';
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
        <p>{t('description-3')}</p>
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
