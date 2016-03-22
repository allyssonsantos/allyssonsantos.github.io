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

		setTimeout(function() {
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
	} ,2000);

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
	});

	if('PushManager' in window) {
		console.log("Push suported!");
	}


	window.onload = function() {
		if ('serviceWorker' in navigator) {
			navigator.serviceWorker.register("/service-worker.js").then(function(registration) {

				console.log("Service Worker registrado com sucesso!");
				document.getElementById("not-status").innerHTML = '<h4>allysson notifications</h4><input type="checkbox" name="pushStatus" id="pushStatus" value="false" /><label for="pushStatus">Receba notificações a cada novo post!</label><div id="pushStatusMsg"></div>';

				//Checa se usuário já permite notificação
				checkSubscription();

				//Attacha um listener
				document.getElementById("pushStatus").addEventListener('click', function() {
					subUnsubPush();
				});

			}).catch(function(err) {
				console.log("Registro do service worker falhou!", err);
			});
		}
		else {
			console.log("ServiceWorker não suportado.");
			document.getElementById("not-status").innerHTML = 'ServiceWorker não suportado...';
		}
		function checkSubscription() {
			navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration) {
				ServiceWorkerRegistration.pushManager.getSubscription().then(
					function(pushSubscription) {
						if(!!pushSubscription) {
							//Manda a inscrição para a aplicação
							sendSub(pushSubscription);

							//Manage Interface
							pushStatus = true;
							document.getElementById("pushStatus").checked = true;
							document.getElementById("pushStatusMsg").innerHTML = '<span>Você se inscreveu!</span>';
						} else {
							//Manage Interface
							pushStatus = false;
							document.getElementById("pushStatus").checked = false;
							document.getElementById("pushStatusMsg").innerHTML = '<span>Você não está inscrito</span>';
						}
					}.bind(this)).catch(function(e) {
						console.error('Error getting subscription', e);
					});
			});
		}
		function subscribePush() {
			navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration) {
				ServiceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true})
				.then(function(pushSubscription) {
					//Armazena essa inscrição no servidor da aplicação
					sendSub(pushSubscription);

					//Atualiza o status na Interface
					document.getElementById("pushStatus").checked = true;
					document.getElementById("pushStatusMsg").innerHTML = '<span>Você está inscrito!</span>';
					pushStatus = true;
				})
					.catch(function(e) {
						console.error("Incapaz de registrar push subscription", e);
					});
			});
		}
		function sendSub(pushSubscription) {
			console.log(pushSubscription);
			//get endpoint
			const endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
			fetch("https://android.googleapis.com/gcm/send/"+endPoint).then(function(res) {
				res.json().then(function(data) {
					console.log(data);
				}).catch(function(e) {
					console.error("Error sending subscription to server: ", e);
				});
			});
		}
		function subUnsubPush() {
			//Get current status
			if(!pushStatus) subscribePush();
			else unsubscribePush();
		}
		function unsubscribePush() {
			console.log("unsubscribing...");
			navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration) {

				ServiceWorkerRegistration.pushManager.getSubscription().then(
					function(pushSubscription) {
						//Check if we have a subscription to unsubscribe
						if (!pushSubscription) {
							// Nothing to unsubscribe, set checkbox interface unchecked...
							document.getElementById("pushStatus").checked = false;
							document.getElementById("pushStatusMsg").innerHTML = '<span>Você não está inscrito!</span>';
							pushStatus = false;
							return;
						}

						//We have a subscription, so remove it from application server...
						cancelSub(pushSubscription);

						//... and unsubscribe it
						pushSubscription.unsubscribe().then(function() {
							//Usuário desmarcou o checkbox, mas desmarca de novo...
							document.getElementById("pushStatus").checked = false;
							document.getElementById("pushStatusMsg").innerHTML = '<span>Você não está inscrito</span>';
							pushStatus = false;
						}).catch(function(e) {
							console.log("error unsubscribing: ", e);
						});
					}).catch(function(e) {
						console.error("Error unsubscribing.", e);
					});
			});
		}
		function cancelSub(pushSubscription) {
			const endPoint = pushSubscription.endpoint.slice(pushSubscription.endpoint.lastIndexOf('/')+1);
			fetch("https://allyssonsantos.github.io/unsubscribe/"+endpoint).then(function(res) {
				res.json().then(function(data) {
					console.log(data);
				});
			});
		}
	};
	//
	// if ('Notification' in window) {
	// 	Notification.requestPermission();
	//
	// 	if ('showNotification' in ServiceWorkerRegistration.prototype) {
	// 		console.log('Notification SW');
			// navigator.serviceWorker.ready.then(function(registration){
			// 	registration.showNotification(title, options);
	// 		});
	// 	} else {
	// 		console.log('Notification classic');
	// 		new Notification(title, options);
	// 	}
	// }
	//
	// self.addEventListener("notificationclick", function(event) {
	//   clients.openWindow('/index.html');
	// });


}();
