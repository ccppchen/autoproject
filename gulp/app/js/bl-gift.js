require(['config', 'comm'], function() {
    require(['vendor', 'swipebl', 'top'], function() {
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
            automation: true
        });
        var t = $(".recommend-ul").find("li").width() * $(".recommend-ul").find("li").length;
        $(".recommend-ul").find("ul").width(t);

        $("#file-top").click(function() {
            $('html,body').css({ scrollTop: 0 });
        });
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $(".file-top").show();
            } else {
                $(".file-top").hide();
            }
        });
    });
});