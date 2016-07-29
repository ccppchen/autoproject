require(['vendor'], function(){
    $('.card-title .ovfs-item').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    $('.right-down').on('click', function(){
        $(this).toggleClass('active');
        $('.card-title').toggleClass('open');
        $('.ovfs').scrollLeft($('.ovfs .ovfs-item.active')[0].offsetLeft);
        
    });

    $('.ovfs .ovfs-item').on('click', function(event) {
        $(this).parents('.ovfs').blScrollLeft({
            toT: $(this)[0].offsetLeft - 120
        });
    });
});