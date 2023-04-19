import Image from 'next/image';
import { companies } from '../../data/companies';

import styles from './companies.module.css';

export function Companies() {
  return (
    <ul className={styles.companies}>
      {companies.map((company) => (
        <li key={company.name} className={styles.companies__company}>
          <div className={styles['companies__company-logo']}>
            <Image
              src={`/images/logos/companies/${company.logo}`}
              alt={`${company.name} logo`}
              width={150}
              height={90}
            />
          </div>
          <div className={styles['companies__company-description']}>
            {company.description}
            <div>
              {company.name}{' '}
              <small>
                <em>
                  {company.startYear} - {company.endYear || 'present'}
                </em>
              </small>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
