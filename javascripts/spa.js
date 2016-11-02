(function () {
    if (!navigator.serviceWorker) return;
    navigator.serviceWorker.register('../service-worker.js').then(function() {
        console.log('Registered!');
    }).catch(function() {
        console.log('Register failed!');
    });

    'use strict';

    var toggleHeader,
        header,
        posicaoAtual,
        ultimoScroll = 0,
        btnBack = document.querySelector(".blog-back-button");

    toggleHeader = function () {
        header = document.querySelector(".blog-header");
        posicaoAtual = window.scrollY;

        if (posicaoAtual > ultimoScroll && posicaoAtual > 100) {
            header.classList.remove("blog-header--show");
            header.classList.add("blog-header--hide");
        } else {
            header.classList.remove("blog-header--hide");
            header.classList.add("blog-header--show");
        }
        ultimoScroll = posicaoAtual;
    };

    if (window.innerWidth < 768) {
        window.addEventListener("scroll", toggleHeader);
    }

    if (window.location.pathname.length > 2) {
        btnBack.className = "blog-back-button--show";
    }
})();

(function() {
    if (!document.querySelector(".post-comments")) {
        return;
    }
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
})();