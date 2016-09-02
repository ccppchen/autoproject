require.config({
	paths: {
		vendor: ['vendor/vendor.min']
	}
});
require(['vendor'], function(FastClick) {
	FastClick.attach(document.body);
	$('img.lazy').lazyload();
	$.fn.blScrollTo = function(options) {
		var defaults = {
			toT: 0, //滚动目标位置
			durTime: 500, //过渡动画时间
			delay: 30, //定时器时间
			callback: null //回调函数
		};
		var opts = $.extend(defaults, options),
			timer = null,
			_this = this,
			curTop = _this.scrollTop(), //滚动条当前的位置
			subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
			index = 0,
			dur = Math.round(opts.durTime / opts.delay),
			smoothScroll = function(t) {
				index++;
				var per = Math.round(subTop / dur);
				if (index >= dur) {
					_this.scrollTop(t);
					window.clearInterval(timer);
					if (opts.callback && typeof opts.callback == 'function') {
						opts.callback();
					}
					return;
				} else {
					_this.scrollTop(curTop + index * per);
				}
			};
		timer = window.setInterval(function() {
			smoothScroll(opts.toT);
		}, opts.delay);
		return _this;
	};

	$.fn.blScrollLeft = function(options) {
		var defaults = {
			toT: 0, //滚动目标位置
			durTime: 300, //过渡动画时间
			delay: 30, //定时器时间
			callback: null //回调函数
		};
		var opts = $.extend(defaults, options),
			timer = null,
			_this = this,
			curTop = _this.scrollLeft(), //滚动条当前的位置
			subTop = opts.toT - curTop, //滚动条目标位置和当前位置的差值
			index = 0,
			dur = Math.round(opts.durTime / opts.delay),
			smoothScroll = function(t) {
				index++;
				var per = Math.round(subTop / dur);
				if (index >= dur) {
					_this.scrollLeft(t);
					window.clearInterval(timer);
					if (opts.callback && typeof opts.callback == 'function') {
						opts.callback();
					}
					return;
				} else {
					_this.scrollLeft(curTop + index * per);
				}
			};
		timer = window.setInterval(function() {
			smoothScroll(opts.toT);
		}, opts.delay);
		return _this;
	};
	/* 返回顶部 js start */
	$.fn.gotop = function() {
		var $backTop = this.$backTop = $('<div class="gotop"></div>');
		$('body').append($backTop);

		$backTop.on('click', function() {
			$("body").blScrollTo();
		});

		var timmer = null;
		$(window).on("scroll touchmove", function() {
			var d = $(window).scrollTop(),
				e = $(window).height();
				e < d ? $backTop.css("display", "block") : $backTop.css("display", "none");
		});
	};
	$.fn.gotop();
	/* 返回顶部js end */

	//nav
	$('.j-nav').on('click', function(event) {
		$(this).toggleClass('show-nav');
		$(this).siblings('.j-navcontent').toggleClass('show-navcontent')
	});


});