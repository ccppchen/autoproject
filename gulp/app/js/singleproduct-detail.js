$(".sinle-detail").css("bottom",$(".button-buy").height()-$("#detail-container").height());
$(".get-ticket .arrow-back").click(function(){
	$(this).toggleClass("arrow-up")
	$(this).next().toggleClass("spread-ticket");
	
});
