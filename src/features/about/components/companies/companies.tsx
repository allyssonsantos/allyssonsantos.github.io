import { companies } from '../../data/companies';

import styles from './companies.module.css';

export function Companies() {
  return (
    <ul className={styles.companies}>
      {companies.map(
        ({ name, description, startYear, endYear, logo: Logo }) => (
          <li key={name} className={styles.companies__company}>
            <div className={styles['companies__company-logo']}>
              <Logo />
            </div>
            <div className={styles['companies__company-description']}>
              {description}
              <div>
                {name}{' '}
                <small>
                  <em>
                    {startYear} - {endYear || 'present'}
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
