require(['config'], function(){
    require(['vendor', 'touchslider', 'bl-scroll-load','ion-tabs'], function() {
        $(document).on('touchmove', function(e) {
            e.preventDefault();
        });
        $(".ovfs img.lazy").lazyload({
            container: '.ovfs'
        });
        $('#app-download').hide();
        $('#app-download .close').click(function(event) {
            $('#app-download').hide();
        });

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

        $('.title-input .input-control').on('click', function(e) {
            e.preventDefault;
            $('.view').hide();
            $('.search-list').show();
            // $('.form-control .input').focus();
        });

        $('.search-list .cancle-search').on('click', function(e) {
            e.preventDefault;
            $('.search-list').hide();
            $('.view').show();
        });
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
                    $("html,body").scrollTop(0);
                })

                var timmer = null;
                $(window).on("scroll scrollEnd", function() {
                    var d = $(window).scrollTop(),
                        e = $(window).height();
                    e < d ? $backTop.css("bottom", "60px") : $backTop.css("bottom", "-100%");
                });
            }

        }
        var chinaz = new chinaz();
        /* 返回顶部js end */

        /*滑动加载*/
        $.fn.scrollLoad({
            lazy: true,
            sucback: function() {
                $.ajax({
                    type: 'GET',
                    url: 'json/more.json',
                    dataType: 'json',
                    success: function(data) {
                        var result = '';
                        for (var i = 0; i < data.lists.length; i++) {
                            result += '<li class="recommend-item">' + '<a href="javascript:;">' + '<div class="lazy-box">' + '<img class="lazy" data-original="' + data.lists[i].pic + '" alt="">' + '</div>' + '<div class="shop-listText">' + data.lists[i].title + '</div>' + '<span class="color-red shop-price"><i class="price-rmb">¥</i>780.00</span>' + '</a>' + '</li>';
                        }
                        // 为了测试，延迟加载
                        setTimeout(function() {
                            $('.recommend-list').append(result);
                            $("img.lazy").lazyload();
                        }, 300);
                    },
                    error: function(xhr, type) {
                        alert('Ajax error!');
                    }
                });
            }
        });
        /*end*/

        $('.bl-ctn-loading').hide();
        $(document).off('touchmove');
    });

});