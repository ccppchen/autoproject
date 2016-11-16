require(['comm'], function(){
  require(['vendor'], function(){
    /*
    * 1. 分类和排序点击事件
    * 2. 分类和排序的下拉点击事件
    */

    $('.j-list-tabs .subheader-item').on('click', function() {
      var indexLength = $(this).index();
      $('.subheader-inner .subheader-hd').eq(indexLength).toggle().siblings().hide();
      $(this).toggleClass('active').siblings().removeClass('active');
      if ($('.subheader-tabs .subheader-item').hasClass('active')) {
        $('.mask,.subheader-inner').show();
      }else {
        $('.mask,.subheader-inner').hide();
      }
    }); /* 1 */

    $('.j-list-sorting .list-item, .class-right .list-item').on('click', function() {
      $('.mask, .subheader-inner .subheader-hd').hide();
      $(this).addClass('active').siblings().removeClass('active');
      $('.subheader-tabs .subheader-item').removeClass('active');
    }); /* 2 */

    $('.class-left .list-item').on('click', function() {
      $(this).toggleClass('active').siblings().removeClass('active');
    });

    $(document).on("touchmove",function(e) {
       if(e.target.className.indexOf("subheader-inner") >= 0 || e.target.className.indexOf("mask") >= 0) {
            e.preventDefault();
        } else {
            e.stopPropagation();
        }
    });

    var xx,yy,XX,YY,swipeX,swipeY;
    var h = $(window).height() - $(".subheader-height").height();
    $('.class-right').on('touchstart', function(e){
      xx = e.targetTouches[0].screenX;
      yy = e.targetTouches[0].screenY;
      swipeX = true;
      swipeY = true;
    });
    $('.class-right').on('touchmove', function(e){
      XX = e.targetTouches[0].screenX;
      YY = e.targetTouches[0].screenY;
      p = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      if (swipeX && Math.abs(XX - xx) - Math.abs(YY - yy) > 0) {
        // 左右滑动
        e.stopPropagation();
        e.preventDefault();
        swipeY = false;
      } else if (swipeY && Math.abs(XX - xx) - Math.abs(YY - yy) < 0){
        // 上下滑动
        nScrollHight = $(this)[0].scrollHeight;
        nScrollTop = $(this)[0].scrollTop;
        // 到达底部
        if (nScrollTop + h >= nScrollHight) {
          // 下滑
          if(YY<=yy){
            $(this)[0].addEventListener('touchmove', bodyScroll(e), false);
          }
        }
        // 到达顶部
        if(nScrollTop===0){
          // 下滑
          if(YY>=yy){
            $(this)[0].addEventListener('touchmove', bodyScroll(e), false);
          }
        }

      }
    });
    function bodyScroll(e){
      e.preventDefault();
    }

    $.fn.toast = function(msg){
          var mask = $("<div class='mask-transparent'></div>").appendTo(document.body);
          var tempHTML = $('<div class="toast"><p>'+ msg +'</p></div>');
          $('body').append(tempHTML);
          setTimeout(function(){
              tempHTML.remove();
              $('.mask-transparent').remove();
          }, 2000);

      };
      $.fn.toast('验证码错误，请重新输入');/* 1 */

  });
});
