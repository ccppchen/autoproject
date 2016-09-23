require(['config'], function() {
    require([ 'comm','vendor'], function() {
    	 $(function() {
    	 	$(".header-nav").find("div").click(function(){ //抢购部分 切换
	$(this).addClass("on").siblings("div").removeClass("on");
});
$(".stores-show-font").find("i").click(function(){
	$(this).parents(".stores-show").hide();
	$(this).parents(".stores-show2").hide();
});
var u=0;
for(var p=0;p<$(".header-class").find("li").length;p++){
	u=u+$(".header-class").find("li").eq(p).width();
}
$(".header-class").find("ul").width(u);
$(window).resize(function() {
    var u=0;
	for(var p=0;p<$(".header-class").find("li").length;p++){
		u=u+$(".header-class").find("li").eq(p).width();
	}
	$(".header-class").find("ul").width(u);
});
    	});
    	
   });

});