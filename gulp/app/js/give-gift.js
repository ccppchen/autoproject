require(['config'], function(){
    require(['vendor','touchslider'], function(){

        //nav
		$('.j-nav').on('click', function(event) {
			$(this).toggleClass('show-nav');
			$(this).siblings('.j-navcontent').toggleClass('show-navcontent')
		}); 
		$(function() {
			TouchSlide({
				slideCell: "#touchSlide",
				mainCell: ".swiper-wrapper",
				effect: "leftLoop",
				prevCell: ".prev",
				nextCell: ".next",
				autoPlay: false,
				delayTime: 300,
				interTime: 2000,
				autoPage: false,
				pageStateCell:".pageState"
			});
		});
    });
});