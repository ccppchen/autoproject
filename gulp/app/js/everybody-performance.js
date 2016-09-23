require({
	    baseUrl: 'js',
	    paths: {
	        vendor: ['vendor/vendor.min'],
	        chart: ['Chart.min'],
	        
	    }
    }, function(){
    require(['vendor','chart'], function() {
    		 Chart.defaults.global.customTooltips = function(tooltip) {

		        var tooltipEl = $('#chartjs-tooltip');
		
		        if (!tooltip) {
		            tooltipEl.css({
		                opacity: 0
		            });
		            return;
		        }
		
		       
		        var innerHtml = '';
		        for (var i = tooltip.labels.length - 1; i >= 0; i--) {
		        	innerHtml += [
		        		'<div class="chartjs-tooltip-section">',
		        		'<div class="tooltip-plot"></div>',
		        		'	<div >' + tooltip.labels[i] + '</div>',
		        		'</div>'
		        	].join('');
		        }
		        tooltipEl.html(innerHtml);
		
		        tooltipEl.css({
		            opacity: 1,
		            left:   tooltip.chart.canvas.offsetLeft +tooltip.x + 'px',
		            top:  tooltip.chart.canvas.offsetTop +tooltip.y+ 'px',
		            fontFamily: tooltip.fontFamily,
		            fontSize: tooltip.fontSize,
		            fontStyle: tooltip.fontStyle,
		        });
		    };

    		var lineChartData = {
			labels : ["1/10","1/11","1/12","1/13","1/14","1/15"],
				 datasets: [{
           
		        }, {
		            fillColor: "transparent",
		            strokeColor: "#4A90E2",
		            pointColor: "#fff",
		            pointStrokeColor : "rgba(74,144,226,0.3)",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "#4A90E2",
		           
		            data : [10000,13000,20000,30000,40000,30000]
		        }]
			
			}

			var myLine = new Chart(document.getElementById("canvas").getContext("2d")).Line(lineChartData,{
	           			 bezierCurve: true,
	           			 scaleShowGridLines : false,
	           			 pointDot : true,
	           			 pointDotRadius : 3,
	           			 pointDotStrokeWidth:3,
	           			 scaleOverride :true ,   //是否用硬编码重写y轴网格线
		                 scaleSteps : 5,        //y轴刻度的个数
		                 scaleStepWidth : 10000,   //y轴每个刻度的宽度
		                 scaleStartValue : 0,    //y轴的起始值
		                 scaleFontColor : "#cccccc",//文字颜色
	
	           }
			);
	
    		
    			
    });

});
