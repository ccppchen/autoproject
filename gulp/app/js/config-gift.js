require(['vendor/vendor.min'], function(FastClick){
    $('.control-show').on('click', function() {
            $(this).toggleClass('show-all');
            $(".gift-list").toggleClass('all-list');
     });
});
