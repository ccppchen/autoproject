require(['config'], function() {
	require(['vendor', 'search'], function(FastClick) {
		FastClick.attach(document.body);

		$("img.lazy").lazyload();

	});

});