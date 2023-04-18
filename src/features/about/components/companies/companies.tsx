import { companies } from '../../data/companies';

import styles from './companies.module.css';

export function Companies() {
  return (
    <ul className={styles.companies}>
      {companies.map((company) => (
        <li key={company.name}>
          {company.name}{' '}
          <small>
            <em>
              {company.startYear} - {company.endYear || 'present'}
            </em>
          </small>
          <blockquote>{company.description}</blockquote>
        </li>
      ))}
    </ul>
  );
}
