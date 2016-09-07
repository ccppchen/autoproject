require(['vendor/vendor.min'], function(FastClick){
    FastClick.attach(document.body);
    var translate = 0;
    $('#scroll-top').append($('#scroll-top li').eq(0).clone());

    var time = setInterval(function(){
        if (-translate >= ( $('#scroll-top li').length-1) * $('#scroll-top li').height() ) {
            translate = 0;
        }else{
            $('#scroll-top').transform( 'translate3d(0,' + translate-- + 'px,0)' );
        }

    }, 30);
		/* nav */
		//nav
		$('.j-nav').on('click', function(event) {
		    $(this).toggleClass('show-nav');
		    $(this).siblings('.j-navcontent').toggleClass('show-navcontent')
		});

    // 演示js，开发把下面的js删掉
    // $('.not-login').on('click', function(event) {
    //     $(this).hide();
    //     $('.change,.btn-bottom').show();
    //     setTimeout(function(){
    //         $('.mask').show();
    //         // 中奖了
    //         $('.winp').removeClass('modal-out').addClass('modal-in');
    //         setTimeout(function(){
    //             // 没中奖
    //             $('.modal').removeClass('modal-in').addClass('modal-out');
    //             $('.not-winp').removeClass('modal-out').addClass('modal-in');

    //             setTimeout(function(){
    //                 // 机会用完了
    //                 $('.modal').removeClass('modal-in').addClass('modal-out');
    //                 $('.not-change').removeClass('modal-out').addClass('modal-in');
    //                 setTimeout(function(){
    //                     // 分享
    //                     $('.modal').removeClass('modal-in').addClass('modal-out');
    //                     $('.shake').show();
    //                     setTimeout(function(){
    //                         $('.shake').hide();
    //                         // 炫耀
    //                         $('.flaunt').show();
    //                     }, 2000);
    //                 }, 2000);
    //             }, 2000);
    //         }, 2000);
    //     }, 2000);
    // });
    $('.modal-close,.mask').on('click', function(event) {
        $('.modal').removeClass('modal-in').addClass('modal-out');
        $('.mask,.flaunt,.shake').hide();
    });

});
