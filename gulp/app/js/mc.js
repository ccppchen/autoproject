require(['comm', 'config'], function(){
	require(['vendor'], function(){
		require(['swiper_around_bl'], function(){
			$('.swiper').swiper_around();
		})
		
		require(['pickers'], function(){
			var dataTime = [];
			for (var i = 0; i < 24; i++) {
				dataTime.push(i);
			}

			$('#dataTime').picker({
				toolbarTemplate: '<header class="bar bar-box">\
			      <div>起始时间</div>\
			      <div>结束时间</div>\
			    </header>',
		    	onlyInPopover: true,
		    	cssClass: 'edit-time',
		    	value: ['22', '7'],
                rotateEffect: true,
                formatValue: function (p, values, displayValues) {
                  return '每日 ' + displayValues[0] + ':00 - 次日 ' + values[1] + ':00';
                },
                cols: [
	                {
	                    textAlign: 'center',
	                    values: dataTime
	                },
	                {
	                    textAlign: 'center',
	                    values: dataTime
	                }
                ]
            });
            $('#dataTime').trigger('click');
            $('html').off("click");

		})
	})
})