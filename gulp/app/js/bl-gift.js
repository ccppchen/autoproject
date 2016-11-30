require(['config', 'comm'], function() {
	require(['vendor', 'touchslider', 'top'], function() {
		TouchSlide({
			slideCell: "#mySwipe",
			titCell: ".arrow",
			mainCell: ".swipe-wrap",
			effect: "leftLoop",
			autoPlay: false,
			delayTime: 300,
			interTime: 2000,
			autoPage: true,
		});
		$("#file-top").click(function() {
			$('html,body').css({
				scrollTop: 0
			});
		});
		$(window).scroll(function() {
			if($(window).scrollTop() > 100) {
				$(".file-top").show();
			} else {
				$(".file-top").hide();
			}
		});
	});
});