require(['config'], function(){
  require(['comm','vendor', 'touchslider', 'fx_methods'], function(){
        TouchSlide({
          slideCell: "#touchSlide",
          titCell: ".swiper-pagination ul",
          mainCell: ".swiper-wrapper",
          effect: "leftLoop",
          /*autoPlay: true,*/
          delayTime: 300,
          interTime: 2000,
          autoPage: true
        });
        
        $(window).on("scroll touchmove",function() {
          var tab_top =$(".pic-list").offset().top-$("#ovfs-line").height()-$("header").height();       
          var u = $(window).scrollTop();
          //console.log(u);   
          if( u >=tab_top ){
            $("#ovfs-line").css("position","fixed");  
      
          }else{
            $("#ovfs-line").attr('style','display:inline-block');
          }
          
        });
        $("#ovfs-line li").click(function(){
          var list_index = $(this).index();
          $("#ovfs-line li").removeClass("active");
          $(this).addClass("active");
          $(".pic-list ul").removeClass("show");
          $(".pic-list ul").eq(list_index).addClass("show");
        });
        $(".ovfs-special li").click(function(){
          var special_index = $(this).index();
          var special_position = special_index*$(".ovfs-special li").width();
          $(".ovfs-special .through-line").animate({"left":special_position},200);
          $(".pic-list ul").removeClass("show");
          $(".pic-list ul").eq(special_index).addClass("show");
        });
  });
});