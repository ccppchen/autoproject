require({
	    baseUrl: 'js',
	    paths: {
	        vendor: ['vendor/vendor.min'],
	        chart: ['Chart'],

	    }
    }, function(){
    require(['vendor','chart'], function() {
    		var lineChartData = {
			labels : ["1/10","1/11","1/12","1/13","1/14","1/15"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0)",
					strokeColor : "#4A90E2",
					pointColor : "#fff",
					pointStrokeColor : " rgba(73,143,225,0.30)",
					data : [10000,13000,20000,30000,40000,30000]
				}
			]

		}

		var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData,{
           			 bezierCurve: true,
           			 scaleShowGridLines : false,
           			 pointDot : true,
           			 pointDotRadius : 4,
           			 scaleOverride :true ,   //是否用硬编码重写y轴网格线
	                 scaleSteps : 5,        //y轴刻度的个数
	                 scaleStepWidth : 10000,   //y轴每个刻度的宽度
	                 scaleStartValue : 0,    //y轴的起始值
	                 scaleFontColor : "#cccccc",//文字颜色

           }
		);



    });

});
