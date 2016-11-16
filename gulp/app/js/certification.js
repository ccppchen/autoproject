require(['comm', 'config'], function() {
  require(['vendor'], function() {
    try {
      var ver = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
      if (parseInt(ver[1], 10) > 7) {
        $('html').addClass('ios-gt-7');
      }
    } catch (e) {
      console.log(e);
    }

    $('.j-name, .j-ident').on('input', function() {
      if ($('.j-name').val() != '' && $('.j-ident').val() != '') {
        $('.confirm-btn').removeAttr('disabled');

      } else {
        $('.confirm-btn').attr('disabled', true);

      }
    });

    // $.fn.toast = function(msg){

    //   var modal = '<div class="modal modal-in">' +
    //                 '<div class="modal-inner">' +
    //                   '<div class="modal-text">'+ msg +'</div>' +
    //                 '</div>' +
    //                 '<div class="modal-buttons">' +
    //                   '<div class="modal-button j-close">知道了</div>' +
    //                 '</div>' +
    //               '</div>';
    //   var mask = $("<div class='mask mask-show'></div>").append($(modal)).appendTo(document.body);
    //   $('.j-close').on('click', function(event) {
    //     $(mask).remove();
    //   });
    // }
    $.fn.toast = function(msg){
        var mask = $("<div class='mask-transparent'></div>").appendTo(document.body);
        var tempHTML = $('<div class="toast"><p>'+ msg +'</p></div>');
        $('body').append(tempHTML);
        setTimeout(function(){
            tempHTML.remove();
            $('.mask-transparent').remove();
        }, 2000);

    };
    // $.fn.toast('您填写的姓名有误')

    var input = $('.hide-file');

    if (typeof FileReader === 'undefined') {
      $.fn.toast('抱歉，你的浏览器不支持上传图片');
      input.prop('disabled', 'disabled');
    } else {
      input.on('change', readFile);
    }

    function readFile() {
      var file = this.files[0];
      var fileType = file.type.replace('image/', '');
      var that = $(this);
      var useVal = '';
      if (!/image\/\w+/.test(file.type)) {
        $.fn.toast('请确保文件为图像类型');
        $(this).val(useVal);
        return false;
      } else if (file.size > 1024 * 200) {
        $.fn.toast('超过200K，请重新上传');
        $(this).val(useVal);
        return false;
      } else if (fileType.toLowerCase() !== 'jpeg') {
        $.fn.toast('仅支持JPEG格式的图片');
        $(this).val(useVal);
        return false;
      }else{
        useVal = $(this).val();
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function(e) {
        that.parents('.picture-main').addClass('on').append($('<img class="up-img" src="' + this.result + '" alt=""/>'))
      }
    }




  })
});
