void function(){

	function buttonBack() {
		if (window.location.pathname.length > 2) {
			$(".blog-back-button").css("display", "inline-block");
			$(".blog-menu-button").css("right", "15px");
			$(".blog-menu-button").css("left", "");
		} else {
			$(".blog-back-button").css("display", "none");
			$(".blog-menu-button").css("left", "22px");
			$(".blog-menu-button").css("right", "");
		}
	}
	$(document).trigger('pageload', this.href);

	if (!('pushState' in window.history)) return;

	var $body = $('body'),
		$page = $('.current-page'),
		$blogLinksItem = $(".blog-links-item");

	function load(url) {
		console.log('Load', url);

    $('.unloading').remove();
		$page.addClass('unloading');

		$page = $('<div/>').insertBefore($(".footer"));

		$page.load(url + ' main', function() {
			$(document).trigger('pageload', this.href);
		});
		buttonBack();
	}
	buttonBack();
	$body.on('click', 'a', function(event){
		var href = this.getAttribute('href');
		if (href.indexOf('#') == 0 || href.indexOf(':') >= 0) return;

		href = this.href;

		console.log('pushState', href);
		window.history.pushState({push:true}, '', href);

		load(href);
		/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
		var disqus_developer = 1;
		var disqus_shortname = 'allyssonme'; // required: replace example with your forum shortname
		// var disqus_developer = 1; // Comment out when the site is live
		var disqus_identifier = "{{ page.url }}";

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		})();

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

	$blogLinksItem.on("click", function() {
		$("#blog-menu-controller").prop("checked", false);
	});

	$(".blog-posts-category-link").on("click", function(e) {
		e.preventDefault();
	})

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
