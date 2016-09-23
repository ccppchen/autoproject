require(['vendor/vendor.min'], function(FastClick){
    FastClick.attach(document.body);
    /**
     * 1.用户输入时候显示右侧删除按钮，当输入框为空时授权绑定按钮不可点。
     * 2.点击删除，清空输入框内容。
     * 3.toast
     * 4.获取验证码
     */
    $('.j-form-input input').on('input', function() {
        $(this).parent().find('.form-close').show();
        if ($(this).val().length === 0) {
            $(this).parent().find('.form-close').hide();
        }else if ( $('.j-login').val().length !== 0 && $('.j-code').val().length !== 0 && $('.j-yz-code').val().length !== 0 ) {
            $('.an-submit').removeAttr('disabled');
        }else {
            $('.an-submit').attr('disabled', true);
        }
        if($('.j-login').val().length == 0){
            $('.j-get-code').css('color', '#cccccc');
        }else {
            $('.j-get-code').css('color', '#999999');
        }
    });/* 1 */

    $('.form-close').on('click', function(event) {
        $(this).hide().siblings('input').val('').focus();
        $('.j-login').trigger('input');
    });/* 2 */

    $.fn.toast = function(msg){
        var mask = $("<div class='mask-transparent'></div>").appendTo(document.body);
        var tempHTML = $('<div class="toast"><p>'+ msg +'</p></div>');
        $('body').append(tempHTML);
        setTimeout(function(){
            tempHTML.remove();
            $('.mask-transparent').remove();
        }, 2000);

    }
    $.fn.toast('您输入的短信验证码无效');/* 3 */

    $('.j-get-code').on('click', function() {
        if ($('.j-login').val().length === 0) {
            $.fn.toast('手机号不能为空');
        }else if($('.j-login').val().length !== 11) {
            $.fn.toast('手机号不能少于11位');
        }else {
            var count = 40;
            function CountDown() {
                $(".j-get-code").attr("disabled", true);
                $(".j-get-code").val(count + "s后重新发送");
                if (count == 0) {
                    $(".j-get-code").val("获取短信验证码").removeAttr("disabled");
                    clearInterval(countdown);
                }
                count--;
            }
            CountDown();
            var countdown = setInterval(CountDown, 1000);
        }

    });/* 4 */
});
