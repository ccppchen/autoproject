require(['config'], function() {
    require([ 'comm','vendor', 'fx_methods','touchslider'], function() {
    	 $(function() {

var lottery = {
	index:-1,	//当前转动到哪个位置，起点位置
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:20,	//初始转动速度
	times:0,	//转动次数
	cycle:50,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	init:function(id){
		if ($("#"+id).find(".lottery-unit").length>0) {
			$lottery = $("#"+id);
			$units = $lottery.find(".lottery-unit");
			this.obj = $lottery;
			this.count = $units.length; //获取有多少个奖品格子
			$lottery.find(".lottery-unit-" + this.index).addClass("active");
		};
	},
	roll:function(){
		var index = this.index;
		var count = this.count;
		var lottery = this.obj;
		$(lottery).find(".lottery-unit-" + index).removeClass("active");
		index += 1;
		if (index > count - 1) {
			index = 0;
		};
		$(lottery).find(".lottery-unit-"+index).addClass("active");
		this.index = index;
		return false;
	},
	/*stop:function(index){
		this.prize = index;
		return false;
	}*/
};

/*	计算获得停留格	*/
function getTargetPoint(){
	return 5;//**计算或获得停留目标格子，0~选项格子总数-1
}

/*	转动停留后事件处理	*/
function getPrize(){


	choiceToPlay -= 1;//**
	if(choiceToPlay==3){
  $("#modal-success .modal-button.active").html("继续逛");
  $(".mask").show();
	$("#modal-success").removeClass("modal-out").addClass("modal-in");
	$(".message .txt .yellow").html(choiceToPlay);

  }else if(choiceToPlay==2){
  	$("#modal-success .modal-button.active").html("再来一次");
  	$(".mask").show();
	$("#modal-success").removeClass("modal-out").addClass("modal-in");
	$(".message .txt .yellow").html(choiceToPlay);

  }else	if(choiceToPlay==0){
  $("#modal-fail .modal-button.active").html("继续逛");
  $(".mask").show();
	$("#modal-fail").removeClass("modal-out").addClass("modal-in");
	$(".message .txt").html("<i></i>次数用光了，明天再来吧～");
  }else{
  	$("#modal-fail .modal-button.active").html("再来一次");
  	$(".mask").show();
	  $("#modal-fail").removeClass("modal-out").addClass("modal-in");
	  $(".message .txt .yellow").html(choiceToPlay);
  }

	return false;
}

/*	转动效果	*/
function roll(){
	lottery.times += 1;
	lottery.roll();
	if (lottery.times > lottery.cycle + 10 && lottery.prize == lottery.index) {
		clearTimeout(lottery.timer);
		lottery.prize = -1;
		lottery.times = 0;
		click = false;
		getPrize();
		return false;
	}

	if (lottery.times < lottery.cycle) {
		lottery.speed -= 10;
	}else if(lottery.times == lottery.cycle) {
		lottery.prize = getTargetPoint(); //
	}else{
		if (lottery.times > (lottery.cycle + 10) && ((lottery.prize == 0 && lottery.index == 7) || lottery.prize == (lottery.index + 1))) {
			lottery.speed += 110;
		}else{
			lottery.speed += 20;
		}
	}
	if (lottery.speed < 40) {
		lottery.speed = 40;
	};
	lottery.timer = setTimeout(roll,lottery.speed);//
	return false;
}

/*	变量	*/
var click = false;
var choiceToPlay = 4;//还能玩几次

/*	window事件设定	*/

	lottery.init('lottery');


	$("#lottery dt").click(function(){
		if(choiceToPlay <= 0){
			$("#modal-error .modal-title").html("今天的活动结束了<br/>明天再来吧～");
			$(".mask").show();
			$("#modal-error .modal-button").html("继续逛");
			$("#modal-error").removeClass("modal-out").addClass("modal-in");
			return false;
		}

		if (click) {
			$("#modal-error .modal-title").html("网络出现问题<br/>请刷新～");
			$(".mask").show();
			$("#modal-error .modal-button").html("刷新一下");
			$("#modal-error").removeClass("modal-out").addClass("modal-in");
			return false;
		}else{
			lottery.speed = 100;
			roll();
			click = true;
			return false;
		}

});
$(".modal-close").click(function(){
	$(".modal-in").removeClass("modal-in").addClass("modal-out");
	$(".mask").hide();
});
    	});

   });

});
