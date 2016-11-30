require(['vendor/vendor.min'], function() {
	var time = 60;
	var timetext = function() {
		$(".code-button").text(time+"s后重新获取");
		time--;
		timecut();
	};
	var timecut = function() {
		if(time > 0) {
			$(".code-button").text(time+"s后重新获取");
			$(".code-button").addClass("minus-time");

			setTimeout(function() {          
				timetext();      
			}, 1000);
		} else {
			$(".code-button").text("获取验证码");
			$(".code-button").removeClass("minus-time");
			time = 60;
		}
	};
	$(function() {
		$(".code-button").click(function() {
			if(time == 60) {
				time = 60;
				timecut();
			}
		});
	});
});