require(['vendor/vendor.min'], function(FastClick){
    FastClick.attach(document.body);

    $('.j-order, .j-card, .j-password').on('input', function() {
        if ( $('.j-order').val() != '' && $('.j-card').val() != '' && $('.j-password').val() != '' ) {
            $('.dis-confirmbtn').removeAttr('disabled');

        }else if( $('.j-order').val() == '' || $('.j-card').val() == '' || $('.j-password').val() == '' ){
            $('.dis-confirmbtn').attr('disabled', true);

        }
    });
});
