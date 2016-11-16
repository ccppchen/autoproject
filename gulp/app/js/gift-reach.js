require(['vendor/vendor.min'], function() {
	//nav
	$('.j-nav').on('click', function(event) {
		$(this).toggleClass('show-nav');
		$(this).siblings('.j-navcontent').toggleClass('show-navcontent')
	});
	
});
