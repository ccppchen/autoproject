require(['vendor/vendor.min'], function(FastClick) {
    FastClick.attach(document.body);
    $('img.lazy').lazyload();
    /**
     * 1.toast 调用方法，传 需要提示的内容
     * 2.点击删除，清空输入框内容。
     * 3.用户输入时候显示右侧删除按钮，当输入框为空时授权绑定按钮不可点。
     * 4.获取验证码
     */

    $.fn.toast = function(msg) {
        var mask = $("<div class='mask-transparent'></div>").appendTo(document.body);
        var tempHTML = $('<div class="toast"><p>' + msg + '</p></div>');
        $('body').append(tempHTML);
        setTimeout(function() {
            tempHTML.remove();
            $('.mask-transparent').remove();
        }, 2000);

    };
    $.fn.toast('验证码错误，请重新输入'); /* 1 */

    $('.close-button').on('click', function(event) {
        $(this).hide().siblings('input').val('').focus();
        $('.member-inputbox').trigger('input');
        $('.submit-button').attr('disabled', true);
    }); /* 2 */

    $('.fill-box input').on('input', function() {
        $(this).parent().find('.close-button').show();
        if ($(this).val().length === 0) {
            $(this).parent().find('.close-button').hide();
            $('.submit-button').attr('disabled', true);
        }else {
            $('.submit-button').removeAttr('disabled');
        }
    });/* 3 */

});
