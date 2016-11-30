require(['config', 'comm'], function() {
    require(['vendor', 'touchslider'], function() {
        $(function() {
            TouchSlide({
                slideCell: "#advert-slider-body",
                titCell: "#advert-slider",
                mainCell: "#advert-slider-body .swiper-wrapper",
                effect: "leftLoop",
                autoPlay: false,
                delayTime: 300,
                interTime: 2000,
                autoPage: true
            });
        });
    });
});
