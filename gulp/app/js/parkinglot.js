require(['config', 'comm'], function() {
    require(['vendor', 'fx_methods'], function() {
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


    });
});
