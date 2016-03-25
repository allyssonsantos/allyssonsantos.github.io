void function(){
  var reg;
  var sub;
  var isSubscribed = false;
  var subscribeButton = document.querySelector('button');
  if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker.register('service-worker.js').then(function() {
      return navigator.serviceWorker.ready;
    }).then(function(ServiceWorkerRegistration) {
      reg = ServiceWorkerRegistration;
      subscribeButton.disabled = false;
      console.log('Service Worker is ready :^)', reg);
    }).catch(function(error) {
      console.log('Service Worker Error :^(', error);
    });
  }
  subscribeButton.addEventListener('click', function() {
    if (isSubscribed) {
      unsubscribe();
    } else {
      subscribe();
    }
  });
  function subscribe() {
    var $chave = document.querySelector("#chave");
    reg.pushManager.subscribe({userVisibleOnly: true}).
    then(function(pushSubscription){
      sub = pushSubscription;
      console.log('Subscribed! Endpoint:', sub.endpoint);
      const id = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
      console.log("ID:" + id);
      $chave.innerHTML = id;
      subscribeButton.textContent = 'Unsubscribe';
      $.ajax({
        method: "get",
        url: "https://allysson.herokuapp.com/index.php",
        data: "id=" + id,
        success: console.log("Foi!")
      });
      isSubscribed = true;
    });
  }
  function unsubscribe() {
    sub.unsubscribe().then(function(event) {
      subscribeButton.textContent = 'Subscribe';
      console.log('Unsubscribed!', event);
      isSubscribed = false;
    }).catch(function(error) {
      console.log('Error unsubscribing', error);
      subscribeButton.textContent = 'Subscribe';
    });
  }
}();
