module.exports = {
  debug: process.env.NODE_ENV === 'development',
  i18n: {
    defaultLocale: 'pt',
    locales: ['en', 'pt'],
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
