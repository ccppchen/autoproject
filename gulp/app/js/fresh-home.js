require(['vendor', 'touchslider'], function(){
	TouchSlide({
		slideCell: "#mySwipe",
		titCell: ".ul-point ul",
		mainCell: ".swipe-wrap",
		effect: "leftLoop",
		autoPlay: true,
		delayTime: 300,
		interTime: 3500,
		autoPage: true,
		switchLoad: "_src"
	});
})