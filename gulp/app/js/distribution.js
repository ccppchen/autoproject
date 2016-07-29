require(['vendor'], function(){
	$('#distriWay .list-right').on('click', function(){
	    $(this).children('.check-input').prop('checked', 'checked');
	    if ( $('#store').is(':checked') ) {
	        $('.js-toggle').show();
	    } else{
	        $('.js-toggle').hide();
	    };
	});
});