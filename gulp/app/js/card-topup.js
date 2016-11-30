require(['config', 'comm'], function(){
    require(['vendor', 'touchslider'], function(){

            // 选中充值金额时的状态
            $('.phoneMoney li a').on('click', function (){
                $(this).addClass('curr').parent('li').siblings().children('a').removeClass('curr');
            });
            if ($('.phoneMoney').is('.disabledRecharge')) {
                $('.phoneMoney li a').off('click').removeClass('curr');
            }
            // 输入手机号对应空格
            var phoneNumReg = /^1[3|4|5|8][0-9]\d{8}$/;
            $("#number").on('keypress', function(){
                var phoneNumLength = $(this).val().length;
                if (phoneNumLength === 3 || phoneNumLength === 8) {
                    $(this).val($(this).val() + ' ');
                }else if(phoneNumLength > 4){
                    $('.phoneLink').show();

                }
                if(phoneNumLength === 13){
                    $('.phoneLink').hide();

                }
            });
            $("#number").on('keyup', function(){
                var numLength = $(this).val().length;
                var checkNum = $(this).val().replace(/\ +/g,"");
                $('.btnHidden').show();
                $('.icon-icon_userphone').hide();
                if(numLength === 13) {
                    if (phoneNumReg.test(checkNum)) {
                        $('#errorNumber').removeClass('highRed').html('上海联通');
                    }else{
                        $('#errorNumber').addClass('highRed').html('暂不支持此号码充值');
                    }

                }
            })
            // 清空输入框
            $('.btnHidden').on('click', function (){
                $('#number').val('');
                $(this).hide();
                $('.phoneLink').hide();

                $('.icon-icon_userphone').show();
            });
            // 选择支付方式
            $('.payWayItem').on('click', function (){
                $(this).addClass('curr').siblings().removeClass('curr');
            });
    });
});
