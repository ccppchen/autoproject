require(['config', 'comm'], function() {
    require(['vendor', 'swipebl'], function() {
        //轮播效果
        imageCarousel({
            parentContainer: "mySwipe",
            moveContainer: "swipe-wrap",
            imgContainer: "div",
            liContainer: "arrow",
            changeFrequency: 4000,
            imgMoveFrequency: 10,
            moveLength: 8,
            swipeMoveLength: 16,
            automation: false,
            pageButton: true,
            ulStyle: true,
        });
        $('.btn-login').click(function(){ 
            $('#thickdesk').show().siblings('.change-box').show();
        });
        $("#change-box").click(function(){
            $("#change-box").hide();
            $("#thickdesk").hide();
        });
    });
});
