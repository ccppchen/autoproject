require(['config', 'comm'], function(){
    require(['vendor', 'touchslider'], function(){
        $(window).on('scroll touchmove', function() {
            var percent = $(window).scrollTop() / $('.bar-header').height();
            var d = percent > 1 ? 1 : percent;
            $('.bar-header').css('backgroundColor', 'rgba(245,245,245, ' + d + ')');
            if (d >= 1) {
                $('.bar-header .button').css('color', '#000').removeClass('bor-radius');
                $('.title').css('opacity', 1);
            } else {
                $('.bar-header .button').css('color', '#fff').addClass('bor-radius');
                $('.title').css('opacity', 0);
            };
        });

        // 轮播图
        TouchSlide({
            slideCell: "#touchSlide",
            titCell: ".swiper-pagination ul",
            mainCell: ".swiper-wrapper",
            effect: "leftLoop",
            autoPlay: true,
            delayTime: 300,
            interTime: 2000,
            autoPage: true,
            switchLoad: "_src"
        });
    });
});