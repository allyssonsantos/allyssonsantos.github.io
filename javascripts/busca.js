(function(){
	"use strict";
$("#blog-busca").on("input", function(){

	//guarda o valor digitado removendo espaços extras
	var busca = $(this).val().trim();

	if(busca.length){
		$(".blog-posts-link").hide().filter(function(){
			return $(this).find(".blog-posts-post")
						  .text()
						  .match(new RegExp(busca, "i"));
		}).show();
	}else{
		$(".blog-posts-link").show();
	}
});
})();
