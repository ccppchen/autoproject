require(['vendor/vendor.min'], function(FastClick){
  FastClick.attach(document.body);
  require(['vendor/weui.min'], function(){
    $(document).on("click", "#show-actions", function() {
      $.actions({
        onClose: function() {

        },
        actions: [
          {
            text: "联系客服",
            onClick: function() {
              window.location.href = "tel:4006661166";
            }
          }
        ]
      });
    });
    $(document).on("click", "#j-notRevPhone", function() {
      $.actions({
        onClose: function() {

        },
        actions: [
          {
            text: "重新获取验证码",
            onClick: function() {
              // TODO
            }
          },
          {
            text: "使用密码验证",
            onClick: function() {
              $('.j-password').removeAttr('hidden');
              $('.j-auth-code').attr('hidden', 'hidden');
            }
          }
        ]
      });
    });
    $(document).on("click", "#j-forgetPass", function() {
      $.actions({
        onClose: function() {

        },
        actions: [
          {
            text: "使用手机短信验证",
            onClick: function() {
              $('.j-auth-code').removeAttr('hidden');
              $('.j-password').attr('hidden', 'hidden');
            }
          }
        ]
      });
    });

    $.toast("纯文本", "text");

  });
})
