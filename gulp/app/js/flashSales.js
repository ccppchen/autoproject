require(['config', 'comm'], function(){
    require(['vendor','touchslider'], function(){
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

        $('.j-ind li').on('click', function(){
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('.card-title .ovfs-item').on('click', function(){
            $(this).addClass('active').siblings().removeClass('active');
            $(this).parents('.ovfs').blScrollLeft({
                toT: $(this)[0].offsetLeft - 80
            });
        });

        $('.right-down').on('click', function(){
            $(this).toggleClass('active');
            $('.card-title').toggleClass('open');
            $('.ovfs').scrollLeft($('.ovfs .ovfs-item.active')[0].offsetLeft - 80);
            $('.mask').toggle();
            $('body').toggleClass('hidden');
        });

        $.each($('.scroll-list'), function(index, val) {
             $(this).children('.ovfs').attr('id', 'j-scroll-'+ index);
             $('#j-scroll-'+index+' img.lazy-x').lazyload({
                container: '#j-scroll-'+index
             });
        });

        // search
        $('.search').on('click', function(event) {
            $('.bar,.content').hide();
            $('.main-info-search').show();
        });
        $('.j-close').on('click', function(event) {
            $('.bar,.content').show();
            $('.main-info-search').hide();
        });
    });
});