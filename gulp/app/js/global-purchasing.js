require(['config', 'comm'], function(){
	require(['vendor'], function(){
		$(".quanqiugou-bot").find("li").click(function() {
		    $(this).toggleClass("on");
		});
	});
});