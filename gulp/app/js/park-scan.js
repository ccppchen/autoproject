require(['vendor/vendor.min'], function(FastClick){
  FastClick.attach(document.body);
  $('img.lazy').lazyload();

  /**
  * 1.toast 调用方法，传 需要提示的内容
  * 2.获取验证码
  * 3.
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
    $.fn.toast('恭喜您！<br>领取优惠券成功！');/* 1 */
    $.fn.toast('对不起<br>优惠券已过期');/* 1 */

    $('.j-get-code').on('click', function() {
        var count = 40;
        function CountDown() {
            $(".j-get-code").attr("disabled", true);
            $(".j-get-code").val("再次获取(" + count + "s)");
            if (count === 0) {
                $(".j-get-code").val("获取短信验证码").removeAttr("disabled");
                clearInterval(countdown);
            }
            count--;
        }
        CountDown();
        var countdown = setInterval(CountDown, 1000);

    });/* 2 */


});
