require({
	baseUrl: 'js',
	paths: {
		vendor: ['vendor/vendor.min'],
		canvas: ['canvas']
	}
}, function() {
	require(['vendor', 'canvas'], function() {
		//nav
		$('.j-nav').on('click', function(event) {
			$(this).toggleClass('show-nav');
			$(this).siblings('.j-navcontent').toggleClass('show-navcontent')
		});

		fluidFire({
			obj: document.getElementById('fire'),
			defaultImgPath: "css/i/try-use/fire.png",
			tierColorTop: 'rgb(255,134,2,1)',
			tierColorBottom: 'rgba(255,194,2,0.6)'
		});
		$(".share-button button").click(function(){
			$(".share-contain").css("bottom","0");
			$(".mark").show();
		});
		$(".cancel-share").click(function(){
			$(".share-contain").css("bottom","-100%");
			$(".mark").hide();
		});
		$(".modal-button").click(function(){
			$(".modal").hide();
		});
		$(".toast").click(function(){
			$(this).hide();
		});
		
	});
});