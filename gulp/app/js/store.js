require(['config', 'comm', 'require.min'], function() {
    require(['vendor'], function(FastClick) {
        //关注店铺 切换
        $(".header-nav").find("div").click(function() {
            $(this).addClass("on").siblings("div").removeClass("on");
            // $(".discount-ul").find("ul").eq($(this).index()).show().siblings("ul").hide();
        });

        require(['swiper_around_bl'], function() {
            $('.swiper').swiper_around();
        })
    });
});
