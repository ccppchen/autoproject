require(['vendor/vendor.min', 'touchslider'], function() {
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
	$('.btn-login').click(function() {
		$('#thickdesk').show().siblings('.change-box').show();
	});
	$("#change-box").click(function() {
		$("#change-box").hide();
		$("#thickdesk").hide();
	});
});