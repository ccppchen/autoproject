require(['comm', 'config'], function() {
  require(['vendor'], function() {
    /**
     * 1.商品数量减一
     * 2.商品数量加一
     * 3.滑动删除组件
     * 4.滑动删除和点击编辑
     */
    $('.bagoods-editprice').on('click', '.basminus', function() {
      var num = $(this).siblings('input').val();
      num--;
      if (num == 1) {
        $(this).addClass('disabled').siblings('input').val(num);
      } else if (num != 0) {
        $(this).removeClass('disabled').siblings('input').val(num);
      }

    }); /* 1 */

    $('.bagoods-editprice').on('click', '.basplus', function() {
      var num = $(this).siblings('input').val();
      num++;
      if (num != 100) {
        $(this).siblings('input').val(num);
        $(this).siblings('.basminus').removeClass('disabled');
      }
    }); /* 2 */
    $('.basinput').on('apply', function() {
      if ($(this).val() > 99) {
        $(this).val('99').siblings('.basplus').addClass('disabled');
      } else if ($(this).val() <= 1) {
        $(this).val('1').siblings('.basminus').addClass('disabled');
      }
    });
    $('.basinput').trigger('apply');

    require(['swiper_around_bl'], function() {
      $('.swiper').swiper_around();
    }); /* 3 */
    var canSwipe = true;
    var x, X;

    function receiveTran() {
      $('.love-item').css({
        transform: 'translate3d(0px, 0px, 0px)',
        webkitTransform: 'translate3d(0px, 0px, 0px)',
        mozTransform: 'translate3d(0px, 0px, 0px)'
      }).attr('now_move', 0);
    }
    $('.shops-edit').on('click', function(event) {

      $('.swiper').attr('now_move', function(index, value) {
        if (value < 0) {
          canSwipe = false;
        }
      });
      if (!!canSwipe) {
        $(this).text('完成');
        $('.bask-btn').text('删除');
        $('.love-list .love-item-inner,.love-swiper-remove').addClass('open');
        $('.swiper').on('touchstart', function(event) {
          x = event.targetTouches[0].pageX;
        });
        $('.swiper').on('touchmove', function(event) {
          X = event.targetTouches[0].pageX;
          var moveSpace = X - x;
          if (moveSpace < 0 || moveSpace > 0) {
            receiveTran();
          }
        });
        $('.swiper').on('touchend', function(event) {
          receiveTran();
        });
        canSwipe = false;
      } else {
        receiveTran();
        $(this).text('编辑');
        $('.bask-btn').text('去结算');
        $('.swiper').off('touchstart touchmove touchend');
        $('.love-list .love-item-inner,.love-swiper-remove').removeClass('open');
        canSwipe = true;
      }

    }); /* 4 */

    try {
      var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if(parseInt(ver[1], 10) > 7) {
        $('html').addClass('ios-gt-7');
      }
    } catch(e){
      console.log(e);
    }

  })
})
