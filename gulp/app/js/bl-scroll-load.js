/*
* 滑动到底部加载更多
*/
;(function($){
	$.fn.scrollLoad = function(opts){
		var defaults = {
			sucback: 	function(){}
		};
		$.extend(defaults, opts);

		var _init = function(){
			//真实内容的高度
			var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);
			//视窗的高度
			var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
			//隐藏的高度
			var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			if(pageHeight - viewportHeight - scrollHeight == 0){    //如果满足触发条件，执行
			    defaults.sucback();
			}
		};

		$(document).on("scroll touchmove",$(window), _init);
	};
})(window.jQuery || window.Zepto);