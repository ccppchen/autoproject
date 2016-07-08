Zepto(function($) {
    $(window).on('scroll scrollEnd', function() {
        var percent = $(window).scrollTop() / $('.bar-header').height();
        var d = percent > 1 ? 1 : percent;
        $('.bar-header').css('backgroundColor', 'rgba(245,245,245, '+d+')' );
        if (d >= 1) {
            $('.bar-header .button').css('color', '#000');
        }else {
            $('.bar-header .button').css('color', '#fff');
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
        autoPage: true
    });
});