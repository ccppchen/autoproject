// JavaScript Document

//配置文件格式
/*var swipeConfig={
0	parentContainer:"mySwipe",      //父容器
1	moveContainer:"mySwipe", ,      //移动容器
2	imgContainer:"div",             //图片容器
3	liContainer:"div",              //对应的<li>标签容器
4	changeFrequency:4000,           //图片自动切换间隔
5	imgMoveFrequency:10,            //1-无限大 ,越小越快,动画移动频率间隔
6	moveLength:8,                   //单次移动像素 长度 , 不能大于图片宽度
7	swipeMoveLength:16,             //滑屏操作后的 自动 滚动速度
8	automation:true,                //是否允许自动动画
9   pageButton:true,                //是否启用了 翻页按钮  ,如果页面定义有翻页按钮的话
10	ulStyle:true,                   //动画 显示进度条  样式 控制 默认为false(小圆点方式显示)	
	
	}*/
	
//启动方式
/* imageCarousel({
		parentContainer:"mySwipe",      
		moveContainer:"swipe-wrap",     
		imgContainer:"div",            
		liContainer:"arrow", //这个参数已经不需要了 ,直接找到父元素下的 ul标签  不在通过clss或id 查找          
		changeFrequency:4000,          
		imgMoveFrequency:10,            
		moveLength:8,                   
		swipeMoveLength:16,            
		automation:false,
		pageButton:true,
	    ulStyle:true,                
	});*/
function imageCarousel(swipeConfig){
	
function swipeAnimate(obj){
	//***************************************************************************************
	    window.onblur=function(){
			clearInterval(anT);
			clearInterval(TT);
			};
		 window.onfocus=function(){
			TT=setInterval(animation,swipeConfig.changeFrequency);
			};
	  var mySwipe=document.getElementById(swipeConfig.parentContainer)||obj;
	  var swipeWrap=mySwipe.getElementsByClassName(swipeConfig.moveContainer)[0]; //移动窗体
	  var imgs=swipeWrap.getElementsByTagName(swipeConfig.imgContainer);
	  var arrow=mySwipe.getElementsByTagName("ul")[0];
	  var myWidth=mySwipe.clientWidth;
	  var imgsLength=imgs.length;
	  // 如果少于两张图下面的都不操作
if(imgsLength>1){
	  // 前后插入一张图克隆的 后 前图; 
	  var imgS=imgs[imgsLength-1].cloneNode(true);
	  var imgE=imgs[0].cloneNode(true);
	      swipeWrap.insertBefore(imgS,swipeWrap.childNodes[0]);
		  swipeWrap.style.left="-"+myWidth+"px";
		  swipeWrap.insertBefore(imgE,swipeWrap.childNodes[99]);
		  imgs.length=imgsLength+2;
		  imgsLength+=2;
	  var len=imgsLength;
	  //初始化图片的宽度************************************************************
	  //生成选择框li标签*********************************************************
	  var str=[];
	  var imgLLL=imgsLength-2;
	   while(imgsLength--){
		   //str[imgsLength]="<li></li>"
		   imgs[imgsLength].style.width=myWidth+"px";
		   imgs[imgsLength].style.display="block";
		   };
	if(!swipeConfig.ulStyle){	   
		while(imgLLL--){
			str[imgLLL]="<li></li>"
			};
		  arrow.innerHTML=str.join("");
		  var lis=arrow.getElementsByTagName("li");
			  lis[0].className="active";
	    }else{
		      arrow.setAttribute("class","arrow ");
		};
//***************************************************************************************************************************************************************
	   try{
		   $(window).resize(function(){
			   resizeAdjust();
			   });
		   }catch(e){
			   window.onresize=function(){
				   resizeAdjust();
				   };
			   };
	   
	   function resizeAdjust(){
		  
		  myWidth=mySwipe.clientWidth;
		  var imgL=len;
			while(imgL--){
				imgs[imgL].style.width=myWidth+"px";
				
				};
		  swipeWrap.style.width=myWidth*len+"px";//调整swipe-wrap 宽度
		  swipEndCase();
		  };
		  swipeWrap.style.width=myWidth*len+"px";//调整swipe-wrap 宽度
		
//touch 相关事件********************************************************************************************************
	  var start;
	  //var sTime;
	  var startY;
	  var mValue;
	  //var totalTime;
      var nowLeft;
	    //触屏开始
		 mySwipe.addEventListener("touchstart",function(e){
			  start=e.targetTouches[0].clientX;
			  startY=e.targetTouches[0].clientY;
			  nowLeft=Number((swipeWrap.style.left).slice(0,-2));
			 clearInterval(anT);
			 clearInterval(TT);
			 clearTimeout(timeT); //导致动画无法启动
			 tFlag=true;
		}, false);
		
		//触屏移动
		var swipFlag=true;
		var moveDistance;
		var nowMove;
		
		 mySwipe.addEventListener("touchmove",function(e){
			 mValue=e.targetTouches[0].clientX-start;
		 var endY=e.targetTouches[0].clientY;	 
			 moveDistance=(mValue/myWidth).toFixed(4)*100;
		     nowMove=nowLeft+mValue;
			 swipeWrap.style.left=nowMove+"px";
			 moveDistance>=15&&swipFlag?(swipFlag=false,starIndex--,claseLi(starIndex)):null;
		     moveDistance<=-15&&swipFlag?(swipFlag=false,starIndex++,claseLi(starIndex)):null;
		 var totalY=endY-startY;
		    if(moveDistance>0.5||moveDistance<-0.5){
				e.preventDefault();
				};
		},false);
		
		//触屏离开
		var TT;
		var tFlag=true;
		var timeT;
		
		mySwipe.addEventListener("touchend",function(e){
			//totalTime=(new Date()).getTime()-sTime;
			  swipFlag=true;
			moveDistance>-15&&moveDistance<15&&swipFlag?(swipEndCase(nowMove,true)):null;//swipEndCase(nowMove,false
			(moveDistance<=-15||moveDistance>=15)?(swipEndCase(nowMove,false)):null;
			//swipEndCase(nowMove,false);
			clearInterval(animation);
			tFlag?(tFlag=false,timeT=setTimeout(hh,1800)):null;
			function hh(){
				tFlag=true;
			  swipFlag?(TT=setInterval(animation,swipeConfig.changeFrequency)):null;
			};
		},false);
		// 左右button 翻页事件
		var clearTimer=function(){
			             clearInterval(anT);
						 clearInterval(TT);
						 clearTimeout(timeT)
			};
		   if(swipeConfig.pageButton){
			    var directionButton=mySwipe.getElementsByClassName('direction-button')[0];
				    directionButton.style.display='block';
			    var pageButton=directionButton.getElementsByTagName('li');
				    pageButton[0].addEventListener("touchstart",function(e){
						  clearTimer();
						  RuningFlag?animation(false,true):null;
						  e.stopPropagation();
						});
					pageButton[0].addEventListener("touchend",function(e){
						   e.stopPropagation();
						   clearTimer();
						   anT=setInterval(animation,swipeConfig.changeFrequency+500); 
						});
					pageButton[1].addEventListener("touchstart",function(e){
						 clearTimer();
						 RuningFlag?animation(true,true):null;
						 e.stopPropagation();
						});	
					pageButton[1].addEventListener("touchend",function(e){
						 e.stopPropagation();
						 clearTimer();
						 anT=setInterval(animation,swipeConfig.changeFrequency+500); 
						});	
			   };
		
		
		//########################################################################################################
	
// 自动动画
		var speed;
		var starIndex=1;
		var animationFlag=swipeConfig.automation;
		var RuningFlag=true;;		
	 function animation(direction,pagebutton){
		  animationFlag||pagebutton?asdf():null;
			  function asdf(){
		        speed=(swipeWrap.style.left).slice(0,-2);
		    var moveCount=0;
			var moveLength=swipeConfig.moveLength;
		        !direction?starIndex++:(starIndex--,moveLength=-swipeConfig.moveLength);
		    var t=setInterval(start,swipeConfig.imgMoveFrequency);
		    var aFalg=true;
			
		   function start(){
			         RuningFlag=false;
				     speed-=moveLength;
				 moveCount+=swipeConfig.moveLength;
			     swipeWrap.style.left=speed+"px";
				 moveCount>=(myWidth/2)&&aFalg?(aFalg=false,claseLi(starIndex)):null;
				 moveCount>=myWidth?(clearInterval(t),swipEndCase(),RuningFlag=true):null;	 
			   };
			  };
		 };
		var anT=setInterval(animation,swipeConfig.changeFrequency);  //动画执行器 
	//滑动切图判断
	var endAnimate;
	 function 	swipEndCase(offset,spec){
		     //console.log("swipEndCase starIndex=="+starIndex);
			           moveDistance=0;
			           starIndex>=len-1?starIndex=1:null;
					   starIndex<=0?starIndex=len-2:null;
		           var tLength=starIndex*(-myWidth);
				   var tt2=tLength;
				   offset!=undefined?offsetAnimate():null;
				      
				     function offsetAnimate(){
							var xxx=nowLeft+mValue;
							clearInterval(endAnimate);
						   endAnimate=setInterval(swipEndAnimate,10);
							
							var specFlag0=false;
							var specFlag1=false;
							var m=0;
							var direction;
							!spec&&mValue<0?(m=-(swipeConfig.swipeMoveLength),direction=0):null;
							!spec&&mValue>0?(m=(swipeConfig.swipeMoveLength),direction=1):null;
							!spec&&mValue<0&&starIndex==1?(specFlag0=true,tLength=(-myWidth)*(len-1)):null;
							!spec&&mValue>0&&starIndex==(len-2)?(specFlag1=true,tLength=0):null;
							//console.log("xxx2="+xxx);
							function swipEndAnimate(){
								xxx+=m;
							   !spec?(swipeWrap.style.left=xxx+"px"):(clearInterval(endAnimate),defaultP());
							   
							  // console.log("tLength="+tLength+"  xxx="+xxx+"   m="+m);
							 !spec&&direction==0&&xxx<=tLength&&!specFlag0?(clearInterval(endAnimate),defaultP()):null;
							  !spec&&direction==1&&xxx>=tLength&&!specFlag1?(clearInterval(endAnimate),defaultP()):null;
							  !spec&&specFlag0&&xxx<=tLength?(clearInterval(endAnimate),swipeWrap.style.left=-myWidth+"px"):null;
							 !spec&&specFlag1&&xxx>=tLength?(clearInterval(endAnimate),swipeWrap.style.left=-myWidth*(len-2)+"px"):null;
							  function defaultP(){
								  swipeWrap.style.left=tLength+"px";
								  };
						};
					 };
			      offset==undefined?(swipeWrap.style.left=tLength+"px"):null;
					  //swipFlag=true;
		 }; 
			  
	function claseLi(liIndex){
		// alert(liIndex);
						 var o=0;
						 liIndex<len-1&&liIndex>=1?(o=liIndex-1):null;
						 liIndex==len-1?(o=0,liIndex=1):null;
						 liIndex==0?(o=len-3,liIndex=len-2):null;
						 
						 var L=len-2;
						if(!swipeConfig.ulStyle){
							 while(L--){
							 lis[L].className="";
							 };
							 lis[o].className="active";
						}else{
							arrow.innerHTML=o+1+"/"+L;
						};
						//console.log("o="+o+"   len="+len);
					};	
		claseLi(1); 			  
	  };//if end 判断图片张数
  };
/*function caseJudge(){
	  var imgL=document.getElementsByClassName(swipeConfig.moveContainer)[0].getElementsByTagName("img");
	  var imgLengh=imgL.length;
	  var flagCase=true;
	   setTimeout(startThis,300);
	  function startThis(){
	  while(imgLengh--){
		   var thisHeight=imgL[imgLengh].height;
		   thisHeight==0?flagCase=false:null; 
		   imgLengh==0&&flagCase?swipeAnimate():null;
		 };	
	  };
	};
caseJudge();*/
var setTim=function(obj){
	     setTimeout(function(){
				   swipeAnimate(obj);
				   },300);
	  };
if(document.getElementById(swipeConfig.parentContainer)){
	var obj=document.getElementById(swipeConfig.parentContainer);
        if(!obj.flag){
			obj.flag=true;
			setTim(obj);
		};
}else{
   var obj=document.getElementsByClassName(swipeConfig.parentContainer);
   var L=obj.length;
	   while(L--){
		   if(!obj[L].flag){
			   obj[L].flag=true;
			   setTim(obj[L]);
			  };
		};
};
//addonloadEvent(caseJudge);  //原始的默认自动启动
  
//addonloadEvent(swipeAnimate);
};