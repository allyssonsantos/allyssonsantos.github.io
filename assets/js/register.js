(function() {
  if (!navigator.serviceWorker) return;
  navigator.serviceWorker.register('../../service-worker.js').then(function() {
    console.log('Registered!');
  }).catch(function() {
    console.log('Register failed!');
  });
})();
