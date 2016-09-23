require({
    baseUrl: 'js',
    paths: {
        vendor: ['vendor/vendor.min'],
        canvas:['canvas']
    }
    }, function() {
	require(['vendor','canvas'], function() {
		//nav
		$('.j-nav').on('click', function(event) {
			$(this).toggleClass('show-nav');
			$(this).siblings('.j-navcontent').toggleClass('show-navcontent')
		});

		  
			 fluidFire({
					   obj:document.getElementById('fire'),
					   defaultImgPath:"css/i/try-use/fire.png",
					   tierColorTop:'rgb(255,0,0,0.6)',
					   tierColorBottom:'rgba(255,0,0,0.4)'
					  });
					  

		
	});
});