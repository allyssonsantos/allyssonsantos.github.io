(function() {
  if (window.location.pathname.length > 2) {
    const btnBack = document.querySelector('.back-button');
    btnBack.className += " show";
    btnBack.addEventListener('click', () => history.back());
  }
})();
