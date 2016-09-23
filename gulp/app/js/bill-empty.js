require(['config', 'comm'], function(){
    require(['vendor', 'touchslider'], function(){
               $('.itemauto li').on('click', function(){
                   $(this).addClass('bill-select').siblings().removeClass('bill-select');
               });
               //点击隐藏
               $("#know").click(function(){
                   $(".topbg").hide();
               });
       });
});