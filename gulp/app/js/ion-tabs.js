require(['config'], function(){
	require(['vendor'], function(){
		$(function() {
		    $('.ion-tabs .ion-tab').on('click', function(event) {
		        $(this).addClass('active').siblings().removeClass('active');
		    });
		});
	});
});