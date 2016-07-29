require(['vendor', 'fx_methods'], function() {
    // tab
    $('.vegetables-class').on('click', '.ovfs-item', function(event) {
        $(this).addClass('active').siblings().removeClass('active');
    });
    // commodity－content高度自适应触发器
    $('.commodity-content').on('apperBottom', function() {
        $(this).css('bottom', $('.bar-footer').height());
    });

    $('.commodity-content').trigger('apperBottom');

    // 删除单个商品
    $('.chosed-wrap').on('click', '.chose-close', function(event) {
        $(this).parent('.chosed-item').fadeOut('fast', function() {
            $(this).remove();
        });
        setTimeout(function() {
            $('.commodity-content').trigger('apperBottom');
        }, 300);
    });
    // 清空商品
    $(document).on('click', '.js-empty', function(event) {
        $('.chosed-wrap .chosed-item').fadeOut('fast', function() {
            $(this).remove();
        });
        setTimeout(function() {
            $('.commodity-content').trigger('apperBottom');
        }, 300);
    });

    // 商品添加
    $('.bg-bottom').on('click', '.bot-right', function(event) {
        // ....
        setTimeout(function() {
            $('.commodity-content').trigger('apperBottom');
        }, 300);
    });
    $(window).one('touchmove', function(event) {
        event.preventDefault();
        /* Act on the event */
    });
    // 关闭遮罩
    $('.cmiknow').on('click', function(event) {
        $('.modal-mask').fadeOut('fast', function() {
            // ...
        });
    });
    $('.cmmodal-tip').css({
        left: $('.search-content .bot-right img').eq(0).offset().left - 10,
        top: $('.search-content .bot-right img').eq(0).offset().top - 10
    });
});
