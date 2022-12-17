(function changeTheme() {
  var themeStorageKey = 'allysson-theme';
  var query = '(prefers-color-scheme: dark)';

  var html = document.querySelector('html');

  window.matchMedia(query).addEventListener('change', function (e) {
    const colorScheme = e.matches ? 'dark' : 'light';

    if (colorScheme === 'dark') {
      html.setAttribute('class', 'dark');
      window.localStorage.setItem(themeStorageKey, 'dark');
    } else {
      html.setAttribute('class', 'light');
      window.localStorage.setItem(themeStorageKey, 'light');
    }
  });

  var selectedTheme =
    window.localStorage.getItem(themeStorageKey) ||
    window.matchMedia(query).matches
      ? 'dark'
      : '';

  html.setAttribute('class', selectedTheme);
})();
