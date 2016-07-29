$(".sinle-detail").css("bottom",$(".button-buy").height()-$("#detail-container").height());
$(".get-ticket .arrow-back").click(function(){
	$(this).toggleClass("arrow-up")
	$(this).next().toggleClass("spread-ticket");
	
});
$("#suit").click(function(){
	$(".discount-suit").css("bottom","0");
	$(".mark").show();
});
$(".discount-suit .close-suit").click(function(){
	$(".discount-suit").css("bottom","-100%");
	$(".mark").hide();
});

$(".suit .top-right").click(function(){
	$(this).parent().parent().parent().toggleClass("retract-top");
	$(this).parent().parent().next().toggleClass("retract");
	$(this).find("div:last-child").toggleClass("up");
});
var detailup=function(){
	if($(".semi-circle .arrow-back").hasClass("arrow-down")){
		$(".semi-circle .arrow-back").removeClass("arrow-down");
		$(".sinle-detail").css("bottom",$(".button-buy").height()-$("#detail-container").height());
		$(".config-buy").hide();	
		$(".mark").hide();
	}else{
		$(".semi-circle .arrow-back").addClass("arrow-down");
		$(".sinle-detail").css("bottom",$(".button-buy").height());
		$(".mark").show();
		
	}
}

$("#choose,.mark,.semi-circle").click(function(){
	detailup();
});
$(".config-buy,.mark,.parameter").hide();
$(".button-buy a").click(function(){
	$(".semi-circle .arrow-back").addClass("arrow-down");
	$(".sinle-detail").css("bottom",$(".button-buy").height());
	$(".mark").show();
	$(".config-buy").show();
});
$(".close-detail").click(function(){
		$(".semi-circle .arrow-back").removeClass("arrow-down");
		$(".sinle-detail").css("bottom",$(".button-buy").height()-$("#detail-container").height());
		$(".config-buy").hide();
		$(".mark").hide();
});
$('.j-nav').on('click', function(event) {
        $(this).toggleClass('show-nav');
        $(this).siblings('.j-navcontent').toggleClass('show-navcontent')
    });

// chenp
$('.select-body').on('click', 'div', function(event) {
	$(this).not('.cannot').addClass('active').siblings().removeClass('active');
});

if ($('.num-show input').val() >= 98) {
	$('.num-show input').val(99);
	$('.num-add').css('backgroundColor', '#fbfbfb');
	$('.num-minus').css('backgroundColor', '#eeeeee');
}else if($('.num-show input').val() <= 2){
	$('.num-show input').val(1);
	$('.num-minus').css('backgroundColor', '#fbfbfb');
	$('.num-add').css('backgroundColor', '#eeeeee');
}
$('.num-computer').on('click', '.num-add', function(event) {
	var numVal = parseInt($('.num-show input').val());
	if ( numVal >= 98 ) {
		$('.num-show input').val(99);
		$('.num-add').css('backgroundColor', '#fbfbfb');
	}else{
		$('.num-show input').val(numVal+1);
		$('.num-add,.num-minus').css('backgroundColor', '#eeeeee');
	}
});
$('.num-computer').on('click', '.num-minus', function(event) {
	var numVal = parseInt($('.num-show input').val());
	if ( numVal <= 2 ) {
		$('.num-show input').val(1);
		$('.num-minus').css('backgroundColor', '#fbfbfb');
	}else{
		$('.num-show input').val(numVal-1);
		$('.num-add,.num-minus').css('backgroundColor', '#eeeeee');
	}
});
// chenp
$("#parameter").click(function(){
	$(this).addClass("select").siblings().removeClass("select");
	$(".parameter").show();
});
$("#main").click(function(){
	$(this).addClass("select").siblings().removeClass("select");
	$(".parameter").hide();
});





