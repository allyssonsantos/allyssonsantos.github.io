void function(){
	$(document).trigger('pageload', this.href);

	if (!('pushState' in window.history)) return;

	var $body = $('body'),
		  $page = $('.current-page');

	function load(url) {
		console.log('Load', url);

    $('.unloading').remove();
		$page.addClass('unloading');

		$page = $('<div/>').insertBefore($(".footer"));

		$page.load(url + ' main', function() {
			$(document).trigger('pageload', this.href);
			$body.scrollTop(0);
		});
	}

	$body.on('click', 'a', function(event){
		var href = this.getAttribute('href');
		if (href.indexOf('#') == 0 || href.indexOf(':') >= 0) return;

		href = this.href;

		console.log('pushState', href);
		window.history.pushState({push:true}, '', href);

		load(href);

		event.preventDefault();
	});

	window.onpopstate = function(event) {
		console.log('Popstate', location.href);
		if (event.state && event.state.push) {
			load(location.href);
		}
	};

	window.history.replaceState({push:true}, '', location.href);

  $(".blog-back").on("click", function() {
    window.history.back();
  });

  var title = 'Testando';
	var options = {
		icon: 'imgs/icon.png',
		body: 'Testando notificações no load'
	};

	if ('Notification' in window) {
		Notification.requestPermission();

		if ('showNotification' in ServiceWorkerRegistration.prototype) {
			console.log('Notification SW');
			navigator.serviceWorker.ready.then(function(registration){
				registration.showNotification(title, options);
			});
		} else {
			console.log('Notification classic');
			new Notification(title, options);
		}
	}

self.addEventListener("notificationclick", function(event) {
  clients.openWindow('/index.html');
});

}();
