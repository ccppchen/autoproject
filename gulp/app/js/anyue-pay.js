require(['vendor/vendor.min'], function(FastClick){
    FastClick.attach(document.body);

    $('.j-order, .j-card, .j-password').on('input', function() {
        if ( $('.j-order').val() != '' && $('.j-card').val() != '' && $('.j-password').val() != '' ) {
            $('.dis-confirmbtn').removeAttr('disabled');

        }else if( $('.j-order').val() == '' || $('.j-card').val() == '' || $('.j-password').val() == '' ){
            $('.dis-confirmbtn').attr('disabled', true);

        }
    });
    // 关闭提示
    $('.modal-button').on('click', function() {
      $('.modal').removeClass('modal-in').addClass('modal-out');
      $('.mask').hide();
    });

    // 关闭提示
    $.fn.closeToast = function(){
        $('.toast').show();
        setTimeout(function(){
            $('.toast').hide();
        }, 2000);
    }
    $.fn.closeToast();
});
