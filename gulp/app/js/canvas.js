
var fluidFire=function(options){
        var OBJ=options.obj.length?options.obj[0]:options.obj;
            OBJ.innerHTML="<canvas id='fluid-fire' style='position: absolute;top:0;left:0;margin-top:0;'></canvas><img src='"+options.defaultImgPath+"' style='display:block;width:101%;height:100%;position:absolute;top:0;left:-0.5%;'/>";
		var fireObj=document.getElementById('fluid-fire');
		var fire=fireObj.getContext('2d');
        var OW,OH,s,s2,w,xz,m2,m3,h,b,wave;
		var color1=options.tierColorBottom,color2=options.tierColorTop;
	var config=function(){
         OW=OBJ.clientWidth;
         OH=OBJ.clientHeight;
		 fireObj.width=OW;
	     fireObj.height=OW;
	     s=-1/3*OW;
		 s2=s;
		 w=4/15*OW;
		 xz=3/2*w;
		 m2=s+w*2;
		 m3=m2;
		 h=2/3*OW; //顶高度
		 b=53/60*OW; //底高度
		 wave=1/15*OW;
		};	
		config();
		window.onresize=function(){
			config();
			};
		var fireAnimation=function(ctx){
				var animation=function(start,mStart,start2,mStart2,width,h,b,wave){	
					ctx.clearRect(0,0,OW,OW);
						var x=mStart;
						var v=width;
						var m=width/2;
						    ctx.beginPath();
						    ctx.moveTo(start,h);
						    ctx.lineTo(mStart,h);
						    ctx.quadraticCurveTo(x+m,h-wave,x+=v,h);
						    ctx.quadraticCurveTo(x+m,h+wave,x+=v,h);
						    ctx.quadraticCurveTo(x+m,h-wave,x+=v,h);
						    ctx.quadraticCurveTo(x+m,h+wave,x+=v,h);
						    ctx.lineTo(start+v*6,h);
						    ctx.lineTo(start+v*6,b);
						    ctx.lineTo(start,b);
						    ctx.closePath();
						    ctx.fillStyle=color1;
						    ctx.fill();
						    ctx.stroke();
					//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
					    var x2=mStart2;
						    ctx.beginPath();
						    ctx.moveTo(start2,h);
						    ctx.lineTo(mStart2,h);
						    ctx.quadraticCurveTo(x2+m,h+wave,x2+=v,h);
						    ctx.quadraticCurveTo(x2+m,h-wave,x2+=v,h);
						    ctx.quadraticCurveTo(x2+m,h+wave,x2+=v,h);
						    ctx.quadraticCurveTo(x2+m,h-wave,x2+=v,h);
						    ctx.lineTo(start+v*6,h);
						    ctx.lineTo(start+v*6,b);
						    ctx.lineTo(start2,b);
						    ctx.closePath();
						    ctx.fillStyle=color2;
						    ctx.fill();
						    ctx.stroke();
					};
				var setme=setInterval(function(){
					  s+=1/150*OW;
					  m2-=1/150*OW;
					  (s-s2)>=w*2?s=s2:null;
					  (m3-m2)>=w*2?m2=m3:null;
					  animation(s2,s,s2,m2,w,h,b,wave);
				    },20)
		};
		fireAnimation(fire);
  };


