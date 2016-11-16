require(['comm', 'config'], function() {
  require(['vendor'], function() {
    $('.ion-tabs .ion-tab').on('click', function(event) {
      $(this).addClass('active').siblings().removeClass('active');
    });
  })
})
