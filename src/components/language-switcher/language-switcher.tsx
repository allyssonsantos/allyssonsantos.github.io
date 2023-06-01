import { useState } from 'react';
import { useRouter } from 'next/router';

import nextI18nextConfig from 'next-i18next.config';
import styles from './language-switcher.module.css';

const languageMap = {
  en: {
    name: 'English',
    flag: '🇺🇸',
  },
  pt: {
    name: 'Português',
    flag: '🇧🇷',
  },
};

export function LanguageSwitcher() {
  const router = useRouter();
  const currentLocale = router.query.locale;
  const [selectedLocale, setSelectedLocale] = useState(currentLocale || 'pt');

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const choosedLocale = event.target.value;
    setSelectedLocale(choosedLocale);

    if (choosedLocale === 'pt') {
      const regex = new RegExp(`${currentLocale}\/?`);
      console.log(router.asPath.replace(regex, ''));
      router.push(`${router.asPath.replace(regex, '')}`);
      return;
    }

    if (!currentLocale) {
      router.push(`/${choosedLocale}${router.asPath}`);
      return;
    }
  }

  return (
    <select
      className={styles['language-switcher']}
      onChange={handleChange}
      value={selectedLocale}
    >
      {nextI18nextConfig.i18n.locales.map((locale) => (
        <option key={locale} value={locale}>
          {languageMap[locale as keyof typeof languageMap].flag}{' '}
          {languageMap[locale as keyof typeof languageMap].name}
        </option>
      ))}
    </select>
  );
}
