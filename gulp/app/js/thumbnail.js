require(['comm', 'config'], function(){
  require(['vendor', 'touchslider'], function(){
    // 轮播图
    TouchSlide({
      slideCell: "#touchSlide",
      mainCell: ".swiper-wrapper",
      effect: "leftLoop",
      autoPlay: false,
      delayTime: 300,
      interTime: 2000,
      autoPage: false,
      pageStateCell: '.title',
      switchLoad: "_src"
    });

  })
})
