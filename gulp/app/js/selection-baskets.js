require(['vendor/vendor.min'], function(FastClick) {
  FastClick.attach(document.body);
  /**
   * 1.滑动删除组件
   * 2.点击篮筐图标，从下往上滑篮筐商品
   * 3.弹出清空弹窗
   * 4.隐藏清空弹窗
   * 5.阻止下层元素滑动
   * 6.商品数量减一
   * 7.商品数量加一
   */

  require(['swiper_around_bl']); /* 1 */

  require(['fx_methods'], function(){
    $('.j-tigger-bask,.mask').on('click', function() {
      $('.basket-edit').toggleClass('open');
      if ($('.basket-edit').is('.open')) {
        $('.mask').fadeIn();
      }else {
        $('.mask').fadeOut();
      }
    });
  }); /* 2 */

  $('.j-empty').on('click', function() {
    $('.modal').removeClass('modal-out').addClass('modal-in');
    $('.mask').css('zIndex', '1004');
  }); /* 3 */

  $('.j-cancle').on('click', function() {
    $('.modal').removeClass('modal-in').addClass('modal-out');
    $('.mask').css('zIndex', '1002');
  }); /* 4 */

  $('.mask').on('touchmove', function(event) {
    event.preventDefault();
  }); /* 5 */

  $('.bagoods-editprice').on('click', '.basminus', function() {
    var num = $(this).siblings('input').val();
    num --;
    if (num == 1) {
      $(this).addClass('disabled').siblings('input').val(num);
    }else if(num != 0){
      $(this).removeClass('disabled').siblings('input').val(num);
    }

  }); /* 6 */

  $('.bagoods-editprice').on('click', '.basplus', function() {
    var num = $(this).siblings('input').val();
    num ++;
    if (num != 100) {
      $(this).siblings('input').val(num);
      $(this).siblings('.basminus').removeClass('disabled');
    }
  }); /* 7 */
  $('.basinput').on('apply', function() {
    if ($(this).val() > 99) {
      $(this).val('99').siblings('.basplus').addClass('disabled');
    }else if ($(this).val() <= 1) {
      $(this).val('1').siblings('.basminus').addClass('disabled');
    }
  });
  $('.basinput').trigger('apply');


});
