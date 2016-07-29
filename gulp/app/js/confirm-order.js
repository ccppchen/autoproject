// 点击收起和显示
$('.click-up').on('click', function() {
    $(this).children('span').toggleClass('toggle-css');
    if ($(this).children('span').is('.toggle-css')) {
        $(this).children('span').html('点击收起');
        $(this).siblings('.list-good').children('ul').removeClass('good-close');
    } else {
        $(this).children('span').html('点击显示全部');
        $(this).siblings('.list-good').children('ul').addClass('good-close');
    }
});
