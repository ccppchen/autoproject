Zepto(function($){
	// tab
	$('.vegetables-class').on('touchstart click', '.ovfs-item', function(event) {
		$(this).addClass('active').siblings().removeClass('active');
	});
	// commodity－content高度自适应触发器
	$('.commodity-content').on('apperBottom', function() {
		$(this).css('bottom', $('.bar-footer').height());
	});

	$('.commodity-content').trigger('apperBottom');

	// 删除单个商品
	$('.chosed-wrap').on('touchstart click', '.chose-close', function(event) {
		$(this).parent('.chosed-item').fadeOut('fast', function() {
			$(this).remove();
		});
		setTimeout(function(){
			$('.commodity-content').trigger('apperBottom');
		}, 300);
	});
	// 清空商品
	$(document).on('touchstart click', '.js-empty', function(event) {
		$('.chosed-wrap .chosed-item').fadeOut('fast', function() {
			$(this).remove();
		});
		setTimeout(function(){
			$('.commodity-content').trigger('apperBottom');
		}, 300);
	});

	// 商品添加
	$('.bg-bottom').on('touchstart click', '.bot-right', function(event) {
		// ....
		setTimeout(function(){
			$('.commodity-content').trigger('apperBottom');
		}, 300);
	});

	// 关闭遮罩
	$('.cmiknow, document').on('touchstart click', function(event) {
		$('.modal-mask').fadeOut('fast', function() {
			// ...
		});
	});
});