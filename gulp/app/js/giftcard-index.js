require(['config','comm'], function(){
    require(['vendor','touchslider'], function(){
        $(function() {
				TouchSlide({
					slideCell: "#touchSlide",
					titCell: ".swiper-pagination ul",
					mainCell: ".swiper-wrapper",
					effect: "leftLoop",
					/*autoPlay: true,*/
					delayTime: 300,
					interTime: 2000,
					autoPage: true
				});
			});
    });
});