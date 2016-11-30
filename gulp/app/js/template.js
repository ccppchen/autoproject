require(['config', 'comm'], function() {
    require(['vendor', 'jquery-2.1.3.min', 'touchslider'], function(FastClick) {
        $(function() {

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

            /* 固定导航子元素点击后 现实位置坐标图标 start */
            var num = 6.875 * $(".scrollspy-iscroll li").length;
            $(".scrollspy-iscroll ul").css('width', num + 'rem');

            $('.scrollspy-iscroll li').click(function(event) {
                event.preventDefault();
                $('.scrollspy-iscroll .click-logo img').hide();
                $(this).find('.click-logo').find('img').show();
                $(".scrollspy-iscroll ul").css('width', num + 'rem');
                $('.main-nav').removeClass('open');
            });
            $('.scrollspy-iscroll li:first-child').click();
            /* 固定导航子元素点击后 现实位置坐标图标 end */

            /* 打开切换楼层 start */
            $('.scrollspy-btn').on('click', function() {
                if ($('.main-nav').hasClass('open')) {
                    $(".scrollspy-iscroll ul").css('width', num + 'rem');
                } else {

                    $(".scrollspy-iscroll ul").css('width', 'auto');
                }
                $('.main-nav').toggleClass('open');
            });
            /* 打开切换楼层 end */

            /* 固定导航点击后 现实地点坐标  */
            $('.scrollspy-iscroll li').each(function(index, ele) {
                var liLeft = $(this).offset().left - $('.scrollspy-iscroll li:first-child').offset().left;
                $(ele).click(function() {
                    $('.scrollspy-iscroll').animate({
                        scrollLeft: liLeft
                    }, 200);
                });
            })

            /* 点击底部 更多分会场 显示分会场弹窗 start */
            $('.open-main-pop').on('click', function() {
                    $('.popover,.plusMark').stop().fadeToggle(200);
                })
                /* 点击底部 更多分会场 显示分会场弹窗 end */
                /* 返回顶部 js start */
            function chinaz() {
                this.init();
            }
            chinaz.prototype = {
                constructor: chinaz,
                init: function() {
                    this._initBackTop();
                },
                _initBackTop: function() {
                    var $backTop = this.$backTop = $('<div class="cp-gotop"></div>');
                    $('body').append($backTop);

                    $backTop.on('click', function() {
                        $("html, body").animate({
                            scrollTop: 0
                        }, 300);
                    })

                    var timmer = null;
                    $(window).bind("scroll scrollEnd", function() {
                        var d = $(document).scrollTop(),
                            e = $(window).height();
                        e < d ? $backTop.css("bottom", "60px") : $backTop.css("bottom", "-60px");
                        clearTimeout(timmer);
                        timmer = setTimeout(function() {
                            clearTimeout(timmer)
                        }, 100);
                    });
                }

            }
            var chinaz = new chinaz();
            /* 返回顶部js end */
        })
    });
});