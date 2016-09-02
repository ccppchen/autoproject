require(['vendor/vendor.min'], function(FastClick){
    FastClick.attach(document.body);
	$('#getCode').on('click', function(event) {
		event.preventDefault();
		var count = 60;
        function CountDown() {
            $("#getCode").attr("disabled", true);
            $("#getCode").html("再次获取（" + count + "）");
            if (count == 0) {
                $("#getCode").html("获取短信验证码").removeAttr("disabled");
                clearInterval(countdown);
            }
            count--;
        }
        CountDown();
        var countdown = setInterval(CountDown, 1000);
	});

    $('.j-phone,.j-mess-code').on('input', function() {
        if ( $('.j-phone').val() != '' && $('.j-mess-code').val() != '' ) {
            $('.dis-confirmbtn').removeAttr('disabled');
            
        }else if( $('.j-phone').val() == '' || $('.j-mess-code').val() == '' ){
            $('.dis-confirmbtn').attr('disabled', true);
            
        }
    });
});