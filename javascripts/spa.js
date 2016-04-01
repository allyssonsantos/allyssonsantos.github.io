void function(){

	if (window.location.pathname.length > 2) {
		$(".blog-back-button").css("display", "inline-block");
		$(".blog-menu-button").css("right", "0");
		$(".blog-menu-button").css("left", "");
	} else {
		$(".blog-back-button").css("display", "none");
		$(".blog-menu-button").css("left", "0");
		$(".blog-menu-button").css("right", "");
	}

	var $body = $('body'),
		$page = $('.current-page'),
		$blogLinksItem = $(".blog-links-item");

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

	$blogLinksItem.on("click", function() {
		$("#blog-menu-controller").prop("checked", false);
	});

}();
