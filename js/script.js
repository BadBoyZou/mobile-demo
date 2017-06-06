// document.addEventListener(
// 	'touchstart',
// 	function(e){
// 		e.preventDefault();
// 	}
// );
function cssStyle(){
	// 根据实参的个数决定是获取还是设置
	if ( arguments.length === 2 ){  //获取
		return arguments[0].style[arguments[1]];
		// 'box'.style.background
	}else if( arguments.length === 3 ){ // 设置
		arguments[0].style[arguments[1]] = arguments[2];
	};
};

window.onload = function(){
	var main = document.querySelector('.main-slide');
	
	var oUl = main.querySelector('ul');
	oUl.innerHTML += oUl.innerHTML;
	var aLi = oUl.querySelectorAll('li');
	var dot = main.querySelectorAll('.dot span');
	oUl.style.width = aLi.length+'00%';
	
	var now = 0;
	var timer = null;
	
	for (var i=0;i<aLi.length;i++ )
	{
		aLi[i].style.width = (1/aLi.length)*100+'%';
	};
	
	
	var startPoint = 0;  //手指按下去的坐标
	var startX = 0; // ul的left值
	cssStyle( oUl , 'left' , 0 );
	main.addEventListener(
		'touchstart',
		function(e){
			clearInterval( timer );
			oUl.style.transition = 'none';
			var left = parseInt( cssStyle( oUl,'left' ) );
			now = Math.round(-left/main.offsetWidth);
			if( now ==0 )
			{
				now = dot.length;
			}
			if ( now == aLi.length-1 )
			{
				now = dot.length-1;
			}
			
			cssStyle( oUl , 'left' , -now*main.offsetWidth+'px' );
			startPoint = e.changedTouches[0].pageX;
			startX = parseInt( cssStyle( oUl,'left' ) );
		}
	);
	main.addEventListener(
		'touchmove',
		function(e){
			var nowPoint = e.changedTouches[0].pageX;
			var disX = nowPoint - startPoint;
			var left = startX + disX;
			cssStyle( oUl ,'left' , left+'px' )
		}
	)
	
	main.addEventListener(
		'touchend',
		function(e){
			var left = parseInt( cssStyle( oUl,'left' ) );
			now = Math.round(-left/main.offsetWidth);
			//left = -now*main.offsetWidth;
			tab();
			autoPlay()
		}
	);

	autoPlay();
	function autoPlay(){
		clearInterval( timer );
		timer = setInterval(function(){
			if ( now == aLi.length-1 )
			{
				now = dot.length-1;
			}
			oUl.style.transition = 'none';
			cssStyle( oUl ,'left' , -now*main.offsetWidth+'px' );
			
			setTimeout(function(){
				now++;
				tab();
			},100);
		},2500);
	};
	function tab(){
		oUl.style.transition = '1s';
		cssStyle( oUl ,'left' , -now*main.offsetWidth+'px' );
		for (var i=0;i<dot.length;i++ )
		{
			dot[i].className = '';
		}
		dot[now%dot.length].className = 'on';
	}
/*
	main.addEventListener(
		'touchstart',
		function(e){
			startPoint = e.changedTouches[0].pageX;
			startX = oUl.offsetLeft;
			oUl.style.transition = '';
		}
	);	
	
	main.addEventListener(
		'touchmove',
		function(e){
			var nowPoint = e.changedTouches[0].pageX;
			var disX = nowPoint - startPoint;
			var left = startX + disX;
			
			oUl.style.left = left + 'px';
		}
	);
	
	main.addEventListener(
		'touchend',
		function(){
			var left = oUl.offsetLeft;
			var now = Math.round(-left/main.offsetWidth);
			//console.log( now );
			left = -now*main.offsetWidth;
			
			if ( now >= aLi.length-1  )
			{
				now = aLi.length-1;
				left = -now*main.offsetWidth
			}
			
			if ( left > 0 )
			{
				left = 0;
				now = 0;
			}	
			console.log( left );
			oUl.style.transition = '0.5s';
			oUl.style.left = left + 'px';

			for (var i=0;i<dot.length;i++ )
			{
				dot[i].className = '';
			}
			dot[now].className = 'on';
		}
	);
*/

};