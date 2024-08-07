import { useTranslation } from 'next-i18next';

import { companies } from '../../data/companies';
import styles from './companies.module.css';

export function Companies() {
  const { t } = useTranslation(['about', 'common']);

  return (
    <ul className={styles.companies}>
      {companies.map(
        ({ name, description, startYear, endYear, logo: Logo }) => (
          <li key={name} className={styles.companies__company}>
            <div className={styles['companies__company-logo']}>
              <Logo />
            </div>
            <div className={styles['companies__company-description']}>
              {t(`about:${description}`)}
              <div>
                {name}{' '}
                <small>
                  <em>
                    {startYear} - {endYear ?? t('common:present')}
                  </em>
                </small>
              </div>
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
