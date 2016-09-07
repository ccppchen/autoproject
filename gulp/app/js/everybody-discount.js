require(['config'], function(){
    require(['vendor' , 'touchslider'], function() {

        $(function() {
        	$("#know1").hide()
			$("#know").click(function(){
				$(".guide,.guide-arrow,.guide-text").hide();
				$(".detail-2,.finish-task").css("z-index","1");
				$(window).scrollTop($(".my-team-container").offset().top-$(".top-content").offset().top-($(window).height()/2)+$(".my-team-container").height());
				$(".my-team-container").css("z-index" ,"10005");
				$(".guide-team,#know1").show();
				$("#know").hide()
			});
			$("#know1").click(function(){
				$(".guide-team,#know1,.plusMark").hide();
				$(".my-team-container").css("z-index" ,"1");
				$(window).scrollTop("0");
			});
		});


    });

});
