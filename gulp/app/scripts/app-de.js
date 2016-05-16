(function($) {
    $.extend({
        var _modalTemplateTempDiv = document.createElement('div');
        alert: function() {
            if (arguments.length) {
                $._isalert = 1;
                $.confirm.apply($, arguments);
            }
        },
        confirm: function() {
            var args = arguments;
            args[1] = args[1] || '确定';
            args[2] = args[2] || '取消';
            if (args.length && (typeof args[0] == 'string') && !$('.alert_overlay').length) {
                var dialog = $('<div class="alert_overlay"></div><div class="alert_msg"><div class="alert_content">' + args[0] + '</div><div class="alert_buttons"><button class="alert_btn alert_btn_ok">' + args[1] + '</button><button class="alert_btn alert_btn_cancel">' + args[2] + '</button></div></div>');
                if ($._isalert) dialog.find('.alert_btn_cancel').hide();
                dialog.on('contextmenu', function() {
                    return !1;
                }).on('click', '.alert_btn_ok', function() {
                    dialog.remove();
                    if (typeof args[1] == 'function') args[1].call($, !0);
                }).on('click', '.alert_btn_cancel', function() {
                    dialog.remove();
                    if (typeof args[1] == 'function') args[1].call($, !1);
                }).appendTo('body');
            }
            $._isalert = 0;
        },
        notify: function(){
            var args = arguments;
            var $toast = $("<div class='modal toast'>"+args[0]+"</div>").appendTo(document.body);
            setTimeout(function () {
                $toast.remove();
            }, args[1] || 3000);
        }
    });
})($);
