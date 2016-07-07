/* 返回顶部 js start */
function chinaz() {
    this.init();
}
chinaz.prototype = {
    constructor: chinaz,
    init: function() {
        this._initBackTop();
    },
    _initBackTop: function() {
        var $backTop = this.$backTop = $('<div class="gotop"></div>');
        $('body').append($backTop);

        $backTop.on('touchstart click', function() {
            $("html,body").scrollTop(0);
        })

        var timmer = null;
        $(window).on("scroll scrollEnd", function() {
            var d = $(window).scrollTop(),
                e = $(window).height();
            e < d ? $backTop.css("bottom", "1.42rem") : $backTop.css("bottom", "-100%");
        });
    }

}
var chinaz = new chinaz();
/* 返回顶部js end */
