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
          var tab_top =$(".ovfs-fix").offset().top-$("header").height();       
          var u = $(window).scrollTop();
          //console.log(u);   
          if( u >=tab_top ){
            $("#ovfs-line").css("position","fixed");  
            $("#ovfs-line").addClass("ovfs-line-position");      
          }else{
            $("#ovfs-line").attr('style','display:inline-block');
            $("#ovfs-line").removeClass("ovfs-line-position"); 
          }
          
        });
var end_date = 9000;   
     
	function lastTimer(times,wrap){
	var timer_d = null;
	var interval = 1000; 
	var lsTimes = times;//剩余时间戳，服务器获取
	
	showTimes(lsTimes);
	timer_d = setInterval(function(){
		showTimes(lsTimes);
		lsTimes-=1000;   //减一秒
	}, interval);
	
	function showTimes(times){
	   var oSec = 1000;     //1000为一秒
	   var oMin = oSec * 60;//60000为一分钟
	   var oHo = oMin * 60; //3600000为一小时
	   var oDay = oHo*24;   //86400000为一天
	   
	   var iDay = 0;
	   var iHo = 0;
	   var iMin = 0;
	   var iSec = 0;
	   var iLast = 0;
	   var str = ''; 
	   
	   //设置剩余时间格式
	   if(times>=oDay){
		  iDay = parseInt(times/oDay);
		   day_message= "<span id='day'>"+iDay+"</span>&#x5929; <span> ";
	   }else{
	   	day_message="";
	   }
	   iLast = times%oDay;
	   if(iLast>=oHo){
		  iHo = parseInt(iLast/oHo);
	   }
	   iLast = iLast%oHo;
	   if(iLast>=oMin){
		  iMin = parseInt(iLast/oMin);
	   }
	   iLast = iLast%oMin;
	   if(iLast>=oSec){
		  iSec = (iLast/oSec);
	   }
	   iLast = iLast%oSec;
	   
	   //时间补零
	   if(iHo<10){
		  iHo = "0"+iHo;
	   }
	   if(iMin<10){
		  iMin = "0"+iMin;
	   }
	   if(iSec<10){
		  iSec = "0"+iSec;
	   }
	   
	   if(iDay<=0 && iHo<=0 &&iMin<=0 &&iSec<=0){
		   clearInterval(timer_d);
		   str="&#x6D3B;&#x52A8;&#x5DF2;&#x7ED3;&#x675F;";
	   }else{
	   

		   str = "&#x5269; "+day_message+"<span>"+iHo+"</span>&#x5C0F;&#x65F6; <span>"+iMin+"</span>&#x5206;&#x949F;<span>"+iSec+"</span> &#x79D2;";
		 }

	   wrap.html(str);
	   
     }
}
lastTimer(end_date,$(".sale-head .text .time"));        
   

  });
});