require(['vendor/vendor.min'], function(FastClick){
  FastClick.attach(document.body);
  $('img.lazy').lazyload();

  /*
  * 1. 选项卡
  * 2. 支付方式
  */

  $.Huitab = function(tabBar,tabCon,class_name,tabEvent,i){
      var $tab_menu = $(tabBar);
    // 初始化操作
    $tab_menu.removeClass(class_name);
    $(tabBar).eq(i).addClass(class_name);
    $(tabCon).hide();
    $(tabCon).eq(i).show();

    $tab_menu.on(tabEvent,function(){
      $tab_menu.removeClass(class_name);
      $(this).addClass(class_name);
      var index = $tab_menu.index(this);
      $(tabCon).hide();
      $(tabCon).eq(index).show();
    });
  }

  $.Huitab('.ctabs-title .ctitle-item', '.ctabs-content .ccontent-item', 'active', 'click', '0'); /* 1 */

  $('.pic-list-three ul li').not('.other').on('click', function() {
    $('.j-pay-modal').removeClass('modal-out').addClass('modal-in');
    $('.mask').show();
  });

  $('.modal-close').on('click', function() {
    $('.modal').removeClass('modal-in').addClass('modal-out');
    $('.mask').hide();
  });

});
