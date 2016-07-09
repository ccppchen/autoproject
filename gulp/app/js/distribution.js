$('#distriWay .list-right').on('touchstart click', function(){
    $(this).children('.check-input').prop('checked', 'checked');
    if ( $('#store').is(':checked') ) {
        $('.js-toggle').show();
    } else{
        $('.js-toggle').hide();
    };
});