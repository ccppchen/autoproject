require(['config'], function(){
	require(['comm','vendor'], function(){
			$(".search-txt").click(function(){
				$("#normal-form").hide();
				$("#search-form").show();
				$(".search-input input").focus();
			});
			$(".search-line .cancel").click(function(){
				$("#search-form").hide();
				$("#normal-form").show();
			});
			$(".search-line input").bind('input propertychange',function(){
	    	var a=$(this).val();
	    	if(a!=""){
			    $(".search-line em").show();
	    	}else{
			    $(".search-line em").hide();
	    	}
	    });
	    $(".search-line em").click(function(){
	    	$(".search-line input").val("");
	    	$(this).hide();
	    });
	});
});