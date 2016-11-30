require(['config'], function(){
    require(['vendor'], function(){
    	/**
    	 * 1.点击增加删除效果
    	 */

        $('.ad-mendian li').on('click', function(){
            $(".open-show").addClass("close");
            $(this).find(".open-show").removeClass("close");
        });/* 1 */ 
        $('.tt-mendian').on('click', function(){
            $(".open-show").addClass("close");
            $(this).next().removeClass("close");
        });/* 1 */ 
    });
});