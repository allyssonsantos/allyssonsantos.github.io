void function(){

	//Mostrar e esconder o header
	var ultimoScroll = 0,
		header = $(".blog-header");
	$(window).scroll(function () {
		var posicaoAtual = $(this).scrollTop();
		if (posicaoAtual > ultimoScroll) {
			header.removeClass("blog-header--show");
			header.addClass("blog-header--hide");
		} else {
			header.removeClass("blog-header--hide");
			header.addClass("blog-header--show");
		}
		ultimoScroll = posicaoAtual;
	});

	//Adicionar botão de voltar e alterar posicao do menu
	if (window.location.pathname.length > 2) {
		$(".blog-back-button").css("display", "inline-block");
		$(".blog-menu-button").css("right", "0");
		$(".blog-menu-button").css("left", "");
	} else {
		$(".blog-back-button").css("display", "none");
		$(".blog-menu-button").css("left", "0");
		$(".blog-menu-button").css("right", "");
	}

	//Mostrar e esconder links do menu
	var $blogLinksItem = $(".blog-links-item");
	$blogLinksItem.click(function() {
		$("#blog-menu-controller").prop("checked", false);
	});

		/* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
		var disqus_developer = 1;
		var disqus_shortname = 'allyssonme'; // required: replace example with your forum shortname
		// var disqus_developer = 1; // Comment out when the site is live
		var disqus_identifier = "{{ page.url }}";
		var disqus_url = "{{ page.url }}";

		/* * * DON'T EDIT BELOW THIS LINE * * */
		(function() {
				var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
				dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
				(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
		
			/* * * Disqus Reset Function * * */
		    var reset = function (newIdentifier, newUrl, newTitle, newLanguage) {
		        DISQUS.reset({
		            reload: true,
		            config: function () {
		                this.page.url = "{{ page.url }}";
		                this.page.title = "{{ page.title }}";
		        	}
		    	});
		    }
		})();

}();
