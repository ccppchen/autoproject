require(['config', 'comm'], function() {
    require(['vendor', 'fx_methods', 'touchslider'], function() {
        // 下拉刷新
        require(['zepto-refresh'], function(){
            $(window).refresh({
                contentEl: '#J_scroller',
                // 头部的高度
                distanceToRefresh: 55,
                // 开启刷新
                isRefresh: true,
                // 开启加载更多
                isLoadingMore: false,
                // 触发刷新回调
                refreshCallback: function(complete) {
                     setTimeout(function() {
                        window.location.reload();
                        complete();
                     }, 1000)
                }
            });
        });
        // 下拉刷新end
        require(['pickers'], function() {
        	// 省份数据
        	var provinceVal = ['京', '津', '冀', '晋', '蒙', '辽', '吉', '黑', '沪', '苏', '浙', '皖'];
            $(".plate-fir").picker({
                toolbarTemplate: '<header class="bar bar-header bar-light">\
		      <div class="bar-left close-picker">\
		          <a class="button">取消</a>\
		      </div>\
		      <h1 class="title">选择车牌所属地</h1>\
		      <div class="bar-right close-picker">\
		          <a href="javascript:;" class="button red-color confirm-picker">确定</a>\
		      </div>\
		    </header>',
                rotateEffect: true,
                cols: [
                {
                    textAlign: 'center',
                    values: provinceVal
                }
                ]
            });
        });


        $('.plate-input input').on('keypress', function() {
            $(this).siblings('.platei-close').show();
        }).on('blur', function() {
            if ($(this).val() == '') {
                $(this).siblings('.platei-close').hide();
            }
        });
        // 清空车牌号输入框
        $('.platei-close').on('click', function() {
            $('.platei-close').hide();
            $('.plate-input input').val('');
        });

        // 此处为模拟弹窗
        $('.plate-btn').on('click', function() {
        	$('.mask').toggle();
        	$('.modal').removeClass('modal-out').addClass('modal-in');
            $(document).on('touchmove', function(event) {
                event.preventDefault();
            });
        });
        // 关闭弹窗
        $('.modal-button').on('click', function() {
            $('.modal').removeClass('modal-in').addClass('modal-out');
            $('.mask').toggle();
            $(document).off('touchmove');
        });
        // 弹出引导
        $('.j-f-modal').one('show', function() {
            $('.j-f-modal,.mask').show();
            $('.main-body').addClass('filter');
            $('body').on('touchmove', function(event) {
                event.preventDefault();
            });
            // 轮播图
            TouchSlide({
                slideCell: "#touchSlide",
                titCell: ".swiper-pagination ul",
                mainCell: ".swiper-wrapper",
                effect: "left",
                autoPlay: false,
                delayTime: 300,
                interTime: 2000,
                autoPage: true,
                switchLoad: "_src"
            });

        });
        $('.j-f-modal').trigger('show');

        $('.f-modal-close').on('click', function(event) {
            $('.f-modal,.mask').hide();
            $('.main-body').removeClass('filter');
            $('body').off('touchmove');
        });

        // $('.j-g-modal,.mask').show();

    });
});

// require(['http://10.201.128.236/h5/prd/js/eruda.js'], function(eruda){
//     eruda.init();
// })
