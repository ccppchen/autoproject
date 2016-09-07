require(['config'], function(){
    require(['vendor'], function(FastClick) {
        FastClick.attach(document.body);
            require(['swiper_around_bl'], function(){
                $('.swiper-mover').swiper_around();
            })

            //弹窗隐藏
            $(".info-button").find("button").click(function(){
                    $(".mztj").hide();
            });
            $(".info-button1").find("button").click(function(){
                    $(".mztj1").hide();
            });
            $(".btn-cancel").find("button").click(function(){
                    $(".yhg").hide();
            });
    });

});
