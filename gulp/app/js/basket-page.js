require(['config', 'comm'], function() {
    require(['vendor', 'touchslider'], function() {
        //轮播图
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
        /**
         * 1.点击增加删除效果
         */

        $('.j-ind li').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        }); /* 1 */

        $("#tabheight li").click(function() {
            $("#tabheight li").removeClass("active");
            $(this).addClass("active");
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() > $(".basket-page").offset().top) {
                $("#tabheight").css({"position": "fixed","margin-top":"-.88rem","z-index": "1002"});
            } else {
                $("#tabheight").removeAttr('style');
            }
        });

        /* 显示分享 */
        $('.j-share').on('click', function(event) {
          $('.share-mask').css('display','block').on('touchmove', function(event) {
            event.preventDefault();
          });
          $('.share-box').css({
            transform: 'translate(0, 0)',
            webkitTransform: 'translate(0, 0)'
          });
        });
        /* 隐藏分享 */
        $('.share-mask, .j-hideshare').on('click', function() {
          $('.share-mask').css('display','none');
          $('.share-box').css({
            transform: 'translate(0, 100%)',
            webkitTransform: 'translate(0, 100%)'
          });
        });
    });
});
