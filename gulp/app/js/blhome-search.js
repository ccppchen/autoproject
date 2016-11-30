require(['vendor/vendor.min'], function(FastClick) {
    FastClick.attach(document.body);
    $('.search-title .sort').click(function() {
    	if($(this).hasClass("down-on")){
    		$(this).removeClass("down-on");
            $(this).addClass("up-on");

    	}else{
            $(this).removeClass("up-on");
            $(this).addClass("down-on");
        }
    });
});
