require(['config'], function(){
    require(['vendor'], function() {
        // 点击收起和显示
       window.onload = function() {
           var swiper = new Swiper('.red-slide', {
            pagination: '.swiper-pagination',
                direction : 'horizontal',
               slidesPerView: 'auto',
           });
        };
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
