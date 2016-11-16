require(['vendor/vendor.min'], function(FastClick){
  FastClick.attach(document.body);
  $('img.lazy').lazyload();

  /**
  * 1.toast 调用方法，传 需要提示的内容
  * 2.点击删除，清空输入框内容。
  * 3.用户输入时候显示右侧删除按钮，当输入框为空时授权绑定按钮不可点。
  * 4.获取验证码
  */

  $.fn.toast = function(msg){
        var mask = $("<div class='mask-transparent'></div>").appendTo(document.body);
        var tempHTML = $('<div class="toast"><p>'+ msg +'</p></div>');
        $('body').append(tempHTML);
        setTimeout(function(){
            tempHTML.remove();
            $('.mask-transparent').remove();
        }, 2000);

    };
    $.fn.toast('验证码错误，请重新输入');/* 1 */

    $('.form-close').on('click', function(event) {
        $(this).hide().siblings('input').val('').focus();
        $('.j-login').trigger('input');
        $('.an-submit').attr('disabled', true);
    });/* 2 */

    $('.j-form-input input').on('input', function() {
        $(this).parent().find('.form-close').show();
        if ($(this).val().length === 0) {
            $(this).parent().find('.form-close').hide();
            $('.an-submit').attr('disabled', true);
        }else {
            $('.an-submit').removeAttr('disabled');
        }
    });/* 3 */

    $('.j-get-code').on('click', function() {
        var count = 40;
        function CountDown() {
            $(".j-get-code").attr("disabled", true);
            $(".j-get-code").val(count + "s后重新发送");
            if (count === 0) {
                $(".j-get-code").val("获取短信验证码").removeAttr("disabled");
                clearInterval(countdown);
            }
            count--;
        }
        CountDown();
        var countdown = setInterval(CountDown, 1000);

    });/* 4 */


});
