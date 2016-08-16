require(['config', 'comm'], function(){
	require(['vendor'], function(FastClick){
		FastClick.attach(document.body);
		$(".quanqiugou-bot").find("li").click(function() {
		    $(this).toggleClass("on");
		});

		// search
		$('.search').on('click', function(event) {
			$('.bar,.content').hide();
			$('.main-info-search').show();
		});
		$('.j-close').on('click', function(event) {
			$('.bar,.content').show();
			$('.main-info-search').hide();
		});
	});
});