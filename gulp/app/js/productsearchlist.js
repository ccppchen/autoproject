$(function(){
	$(".pro-item").find("li").click(function(){
		if($(this).attr("class")=="on" || $(this).attr("class")=="on pro-li" || $(this).attr("class")=="pro-li on"){
			$(this).toggleClass("pro-li");
			if($(this).attr("class")=="on pro-li" || $(this).attr("class")=="pro-li on"){
				if($(this).index()==0){
					$("html").addClass("html-overflow");
					var i=($("body").height()-$(this).parents(".pro-item").find(".bg-show").offset().top);
					$(this).parents(".pro-item").find(".bg-show").show().height(i);
				}
			}else{
				$("html").removeClass("html-overflow").find(".bg-show").hide();
			}
		}else{
			$(this).addClass("on").siblings("li").removeClass("on").removeClass("pro-li");
			$("html").removeClass("html-overflow").find(".bg-show").hide();
		}
	});
	$(".pro-item-show").find("dd").click(function(){
		$(this).addClass("no-1").siblings("dd").removeClass("no-1");
	});
	$(".pro-item").find(".bg-show").click(function(){
		$("html").removeClass("html-overflow");
		$(".pro-item").find(".bg-show").hide();
		$(".pro-item").find("li").removeClass("pro-li");
	});
	$(".pro-label").find(".bg-show").click(function(){
		$(".item-number").removeClass("on");
		$(this).hide();
	});
	$(".pro-label").find(".item-number").find("span").click(function(){
		var k=$("body").height()-$(this).parents(".pro-label").offset().top;
		$(this).parents(".item-number").toggleClass("on").find(".bg-show").toggle().height(k).parents(".item-number").siblings(".item-number").removeClass("on").find(".bg-show").hide();
	});
	$(".item-number").find("dd").click(function(){
		if($(this).attr("class")!="pro-dd"){
			$(this).toggleClass("on");
		}
	});
	$(".but-1").click(function(){
		$(".item-number").removeClass("on");
		$(this).parents(".item-number").find(".bg-show").hide();
		if($(this).parents(".item-number").find(".on").length>0){
			$(this).parents(".item-number").find("span").text("");
			for(var g=0;g<$(this).parents(".item-number").find(".on").length;g++){
				$(this).parents(".item-number").find("span").append($(this).parents(".item-number").find(".on").eq(g).text()+",");
			}
			$(this).parents(".item-number").addClass("bor");
		}else{
			switch($(this).parents(".item-number").index())
			{
			case 0:
			  s="百联自营";
			  break;
			case 1:
			  s="品牌";
			  break;
			case 2:
			  s="分类";
			  break;
			case 3:
			  s="活动";
			  break;
			default:
			}
			$(this).parents(".item-number").removeClass("bor").find("span").text(s);
		}
	});
	$(".but-2").click(function(){
		$(this).parents("dl").find("dd").removeClass("on");
	});
	$(".pro-header").find("span").click(function(){
		$("body").toggleClass("list-item");
	});
	$(".pro-header").find("input").focus(function(){
		$(".mian-info").hide().siblings(".main-info-search").show();
		$(".list-header").find("input").focus();
	});
	$(".i-close").click(function(){
		$(".mian-info").show().siblings(".main-info-search").hide();
	});
	$(".list-header").find("button").click(function(){
		if($(this).siblings("div").find("input").val()!=""){
			$(".mian-info").show().siblings(".main-info-search").hide();
			$(".pro-header").find("input").val($(this).siblings("div").find("input").val());
		}
	});
	$(".pro-header").find("img").click(function(){
		$(".search-main").show().siblings(".search-criteria").hide();
		$(this).siblings("input").val("");
		$(".list-header").find("input").val("");
	});
	$(".list-header").find("input").keyup(function(){
		if($(".list-header").find("input").val()!=""){
			$(".search-main").hide().siblings(".search-criteria").show();
		}else{
			$(".search-main").show().siblings(".search-criteria").hide();
		}
	});
	$(".search-main").find("li").click(function(){
		$(".list-header").find("input").val($(this).find("a").text());
	});
	$(".search-criteria").find("dd").click(function(){
		$(".list-header").find("input").val($(this).find("a").text());
	});
});

/*筛选*/
$(function(){
	$('#tryAgain').click(function(event) {
		$(".screen-fixed").css( {left:"100%"},2000);
		$("html").removeClass("html-overflow");
	});
	$(".bgf2f2-ul-1").find("li") .click(function(){
		$(this).toggleClass("on");
	});
	$(".bgf2f2-ul-2").find("li") .click(function(){
		$(this).toggleClass("on");
		var lv="";
		for(var sj=0;sj<$(this).parents(".bgf2f2-ul-2").find(".on").length;sj++){
			lv=lv+$(this).parents(".bgf2f2-ul-2").find(".on").eq(sj).text()+",";
		}
		if(lv==""){
			$(this).parents(".bgf2f2-ul-2").siblings("a").find(".fr-popup").show();
			$(this).parents(".bgf2f2-ul-2").siblings("a").find(".arrow-back").show();
			$(this).parents(".bgf2f2-ul-2").siblings("a").find(".popup-all").show();
		}else{
			$(this).parents(".bgf2f2-ul-2").siblings("a").find(".fr-popup").hide();
			$(this).parents(".bgf2f2-ul-2").siblings("a").find(".arrow-back").hide();
			$(this).parents(".bgf2f2-ul-2").siblings("a").find(".popup-all").hide();
		}
		$(this).parents(".bgf2f2-ul-2").siblings("a").find(".popup-fonts").text(lv);
	});
	$(".item-popup").find(".fr-popup").click(function(){
		$(this).parents(".item-popup").find(".bgf2f2-ul-2").toggleClass("popup-height");
		$(this).find("div").toggleClass("icon-up").toggleClass("icon-down");
	});
	$(".screen-button").click(function(){
		$(".screen-fixed").css( {left:0},2000);
		$("html").addClass("html-overflow");
	});
	$(".brand").click(function(){
		$(".fclass").hide().siblings(".pro-modal-1").show();
	});
	$(".brand-choice").click(function(){
		$(".fclass").hide().siblings(".pro-modal-2").show();
	});
	$(".bar-left").click(function(){
		$(".fclass").show().siblings(".pro-modal-1").hide().siblings(".pro-modal-2").hide();
	});
	var aa=$('.pop-up-1 ul').children('li').eq(0);
	var cc2=$('.popup2-bottom dl').children('dd');
	aa.click(function(){
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".fclass").show().siblings(".pro-modal-1").hide();
		cc2.removeClass("on");
		$('.popup2-height').removeClass("popup2-height");
		$(".brand").find(".popup-all").text($(this).text());
	});
	$(".item-popup2").find(".popup2-xiajiantou").click(function(){
		$(this).parents(".item-popup2").find(".popup2-bottom").toggleClass("popup2-height");
		$(this).find("div").toggleClass("icon-up").toggleClass("icon-down");
	});
	cc2.click(function(){
		$(this).addClass("on").siblings("dd").removeClass("on");
		$(".fclass").show().siblings(".pro-modal-1").hide();
		aa.removeClass("on");
		$(".brand").find(".popup-all").text($(this).text());
	});
	$(".popup-font-title").find("li").click(function(){ 
		$(this).addClass("on").siblings("li").removeClass("on");
		$(".popup-list").find(".popup-top-title").eq($(this).index()).show().find(".p-but").addClass("on").parents(".popup-top-title").siblings(".popup-top-title").hide().find("li").removeClass("on");
	});
    var aaa=$(".popup-top-title").find("li");
	    aaa.click(function(){
			if($(this).attr("class")=="p-but" || $(this).attr("class")=="p-but on" || $(this).attr("class")=="on p-but"){
				aaa.removeClass("on");
				$(this).toggleClass("on");
			}else{
				$(".popup-top-title").find("li.p-but").removeClass("on");
				$(this).toggleClass("on");
			}
	});
	$(".sure").click(function(){
		var ur=$(".popup-font-title").find("li").index($(".popup-font-title").find("li.on"));
		var ny="";
		if($(".popup-list").find(".popup-top-title").eq(ur).find(".p-but").attr("class")=="p-but on" || $(".popup-list").find(".popup-top-title").eq(ur).find(".p-but").attr("class")=="on p-but"){
			for(var lg=1;lg<$(".popup-list").find(".popup-top-title").eq(ur).find("li").length;lg++){
				ny=ny+$(".popup-list").find(".popup-top-title").eq(ur).find("li").eq(lg).text()+",";
			}
			$(".pp-img").text(ny);
		}else{
			for(var lg=0;lg<$(".popup-list").find(".popup-top-title").eq(ur).find(".on").length;lg++){
				ny=ny+$(".popup-list").find(".popup-top-title").eq(ur).find(".on").eq(lg).text()+",";
			}
			$(".pp-img").text(ny);
		}
		$(".fclass").show().siblings(".pro-modal-1").hide().siblings(".pro-modal-2").hide();
	});
});


/*防点穿*/


navigator.userAgent.match(/Mac OS/i)?iphone():android();

function iphone(){	
		var penetrate=document.getElementsByClassName("penetrate");
		var pLength=penetrate.length;
			while(pLength--){
				penetrate[pLength].addEventListener("touchmove",function(e){
					 e.preventDefault();
					});
		};
		var mainBody=document.getElementsByClassName("penetrate-body");
		var mL=mainBody.length;
		//var movieflag=[]; 
		var movieflag; 
		var insideScroll=document.getElementsByClassName("penetrate-croll");
		var iLength=insideScroll.length;//4
		var ttFlg=true;
		
		while(mL--){
			//movieflag[mL]=true; 
			mainBody[mL].addEventListener("touchstart",function(e){
						//movieflag[mL]=true;
						movieflag=true;  
						ttFlg=true;
					});
			mainBody[mL].addEventListener("touchmove",function(e){
					//movieflag[mL]?(e.preventDefault()):null;
					  movieflag?(e.preventDefault()):null;
					});
			/* mainBody[mL].addEventListener("touchend",function(e){
					//movieflag[mL]=true;
					movieflag=true;
					ttFlg=true;
					});*/
			};
		 
		 while(iLength--){
				/* insideScroll[iLength].addEventListener("touchstart",function(e){
					 //movieflag[mL]=true;
						movieflag=true;
						});*/
				 insideScroll[iLength].addEventListener("touchmove",function(e){
						ttFlg?(ttFlg=false,setTimeout(prevent,30)):null;
						  function prevent(){
							  //movieflag[mL]=false;
							  movieflag=false;
							  };
						});
			 };
};
function android(){
	var htm=document.getElementsByTagName("html")[0];
	var bod=document.getElementsByTagName("body")[0];
	var on_off=document.getElementsByClassName("on-off");
	var L=on_off.length;
	var flag=true;
	   while(L--){
		   on_off[L].addEventListener("touchstart",function(e){
				   e.preventDefault();
				   e.stopPropagation();
				   if(flag){
					  flag=false;
					  htm.setAttribute("style","height: 100%;overflow: hidden;position: relative;")
					  bod.setAttribute("style","height: 100%;overflow: hidden;")
					}else{
					  flag=true;
					  htm.setAttribute("style"," ");
					  bod.setAttribute("style"," ");
					};
			   });
	   };
	};	