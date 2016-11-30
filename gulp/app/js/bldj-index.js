require(['config', 'comm'], function() {
	require(['vendor', 'touchslider'], function() {
		var distance = $("#menu").offset().top - $(".content").offset().top-$(".content").height();
		$(window).scroll(function() {
			var topvalue = $("body").scrollTop();
			if(topvalue >= distance) {
				$("#menu").addClass("index-menu");
			} else if(topvalue <= distance) {
				$("#menu").removeClass("index-menu");
			}
		});
		$(".firmenu-li").click(function(){
			$(this).addClass("select").siblings().removeClass("select");
			$(".first-menu").scrollLeft($(this).offset().left-$(".firmenu-li").eq(0).offset().left);
			index= $(".firmenu-li").index($(this));
			$(".secmenu li").eq(index).addClass("choosed").siblings().removeClass("choosed");
		});
		$(".secmenu-li").click(function(){
			$(this).addClass("select").siblings().removeClass("select");
			$(".secmenu").scrollLeft($(this).offset().left-$(this).parent().find(".secmenu-li").eq(0).offset().left);
		});
	});
});