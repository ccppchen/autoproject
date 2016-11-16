require(['config','comm'], function(){
    require(['vendor' , 'touchslider'], function() {
        $(".sinle-detail").css("bottom", $(".button-buy").height() - $("#detail-container").height());
        $(".sinle-detail").css("visibility","initial");
        $(".get-ticket .arrow-back").click(function() {
            $(this).toggleClass("arrow-up")
            $(this).next().toggleClass("spread-ticket");

        });
        $("#suit").click(function() {
            $(".discount-suit").css("bottom", "0");
            $(".mark").show();
        });
        $(".discount-suit .close-suit").click(function() {
            $(".discount-suit").css("bottom", "-100%");
            $(".mark").hide();
        });

        $(".suit .top-right").click(function() {
            $(this).parent().parent().parent().toggleClass("retract-top");
            $(this).parent().parent().next().toggleClass("retract");
            $(this).find("div:last-child").toggleClass("up");
        });
        var detailup = function() {
            if ($(".semi-circle .arrow-back").hasClass("arrow-down")) {
                $(".semi-circle .arrow-back").removeClass("arrow-down");
                $(".sinle-detail").css("bottom", $(".button-buy").height() - $("#detail-container").height());
                $(".config-buy").hide();
                $(".mark").hide();
            } else {
                $(".semi-circle .arrow-back").addClass("arrow-down");
                $(".sinle-detail").css("bottom", $(".button-buy").height());
                $(".mark").show();

            }
        }

        $("#choose,.mark,.semi-circle").click(function() {
            detailup();
        });
        $(".config-buy,.mark,.parameter,.comment").hide();
        $(".button-buy a").click(function() {
            $(".semi-circle .arrow-back").addClass("arrow-down");
            $(".sinle-detail").css("bottom", $(".button-buy").height());
            $(".mark").show();
            $(".config-buy").show();
        });
        $(".close-detail").click(function() {
            $(".semi-circle .arrow-back").removeClass("arrow-down");
            $(".sinle-detail").css("bottom", $(".button-buy").height() - $("#detail-container").height());
            $(".config-buy").hide();
            $(".mark").hide();
        });
        $('.j-nav').on('click', function(event) {
            $(this).toggleClass('show-nav');
            $(this).siblings('.j-navcontent').toggleClass('show-navcontent')
        });

        // chenp
        $('.select-body').on('click', 'div', function(event) {
            $(this).not('.cannot').addClass('active').siblings().removeClass('active');
        });

        function numPan(){
            if ($('.num-show input').val() >= 98) {
                $('.num-show input').val(99);
                $('.select-num .num-add').css('backgroundColor', '#fbfbfb');
                $('.select-num .num-minus').css('backgroundColor', '#eeeeee');
            } else if ($('.num-show input').val() <= 2) {
                $('.num-show input').val(1);
                $('.select-num .num-minus').css('backgroundColor', '#fbfbfb');
                $('.select-num .num-add').css('backgroundColor', '#eeeeee');
            }
        };
        numPan();
        $('.select-num .num-computer').on('click shuru', '.num-add', function(event) {
            var numVal = parseInt($('.num-show input').val());
            if (numVal >= 98) {
                $('.num-show input').val(99);
                $('.num-add').css('backgroundColor', '#fbfbfb');
            } else {
                $('.num-show input').val(numVal + 1);
                $('.num-add,.num-minus').css('backgroundColor', '#eeeeee');
            }
        });
        $('.select-num .num-computer').on('click shuru', '.num-minus', function(event) {
            var numVal = parseInt($('.num-show input').val());
            if (numVal <= 2) {
                $('.num-show input').val(1);
                $('.num-minus').css('backgroundColor', '#fbfbfb');
            } else {
                $('.num-show input').val(numVal - 1);
                $('.num-add,.num-minus').css('backgroundColor', '#eeeeee');
            }
        });
        $('.num-show input').on('change', function(event) {
            numPan();
        });
        // j-nav
        $('.j-nav').on('click', function(event) {
            $(this).toggleClass('show-nav');
            $(this).siblings('.j-navcontent').toggleClass('show-navcontent')
        });
        // chenp
        $("#parameter").click(function() {
            $(this).addClass("select").siblings().removeClass("select");
            $(".parameter").show();
            $("#pagemain").hide();
        });
        $("#main").click(function() {
            $(this).addClass("select").siblings().removeClass("select");
            $(".parameter").hide();
             $("#pagemain").show();
        });

        $(function() {
			TouchSlide({
				slideCell: "#touchSlide",
				titCell: ".swiper-pagination ul",
				mainCell: ".swiper-wrapper",
				effect: "leftLoop",
				autoPlay: false,
				delayTime: 300,
				interTime: 2000,
				autoPage: true,
                switchLoad: "_src"
			});
			TouchSlide({
				slideCell: "#recommend-body",
				titCell: ".swiper-pagination ul",
				mainCell: ".swiper-wrapper",
				effect: "leftLoop",
				/*autoPlay: true,*/
				delayTime: 300,
				interTime: 2000,
				autoPage: true
			});
		});

        /* 10-13 chenpeng 加定金预售 */
        $('.modal-close,.j-know').on('click', function(event) {
            $('.j-presale').addClass('modal-out').removeClass('modal-in');
            $('.premask').hide();
        });
        $('.j-prerolus').on('click', function(event) {
            $('.j-presale').removeClass('modal-out').addClass('modal-in');
            $('.premask').show();
        });
        $(document).on("touchmove",function(e) {
           if(e.target.className.indexOf("premask") >= 0 || e.target.className.indexOf("modal") >= 0) {
                e.preventDefault();
            } else {
                e.stopPropagation();
            }
        });
        /* 10-21 chenpeng 加百联财礼 */
        $('.subhead-tabs').on('click', '.subhead-tabs-item', function(event) {
            $(this).addClass('active').siblings().removeClass('active');
        });

        // $('.pride-bottom-box .num-computer').on('click', '.num-add', function(event) {
        //     var numVal = parseInt($('.num-show input').val());
        //     if (numVal >= 98) {
        //         $('.num-show input').val(99);
        //     } else {
        //         $('.num-show input').val(numVal + 1);
        //     }
        // });
        // $('.pride-bottom-box .num-computer').on('click', '.num-minus', function(event) {
        //     var numVal = parseInt($('.num-show input').val());
        //     if (numVal <= 2) {
        //         $('.num-show input').val(1);
        //     } else {
        //         $('.num-show input').val(numVal - 1);
        //     }
        // });


    });

});
