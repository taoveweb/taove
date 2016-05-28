(function() {
	if (typeof window.screenX === "number") {
		// 随机颜色HSL
		var randomHsl = function() {
			return "hsla(" + Math.round(360 * Math.random()) + "," + "60%, 50%, .75)";
		}
		// CSS transform变换应用
		, transform = function(element, value, key) {
			key = key || "Transform";
			["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
				element.style[prefix + key] = value;
			});

			return element;
		}
		// 模糊效果
		, filter = function(element, value, key) {
			key = key || "Filter";
			["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
				element.style[prefix + key] = value;
			});

			return element;
		}
		//移动（主题动画在这里）
		,moveItem = function(position,direction){
			num = getPosition(position);
			console.log("num:"+num);
			arrayPic.forEach(function(i,j) {
				i = direction?(num-j+3)%4+1:((num+j)%4 == 0?4:(num+j)%4);
				$("#piece"+i).dataset.position = direction?parseInt($("#piece"+i).dataset.position) - (j < 2?120:60):parseInt($("#piece"+i).dataset.position) + (j < 2?120:60);
				transform($("#piece"+i), "rotateY("+$("#piece"+i).dataset.position+"deg) translateZ("+ (transZ + 5) +"px)");
			});
		}
		//获取位置
		,getPosition = function(num){
			if(num < 0){
				num = num%4 == 0?1:5+num%4;
			}else{
				num = num%4+1;
			}
			return num;
		}
		// 浏览器选择器API
		, $ = function(selector) {
			return document.querySelector(selector);
		}, $$$ = function(selector) {
			return document.querySelectorAll(selector);
		};


		// 显示图片
		var htmlPic = '', arrayPic = [1, 2, 3, 4],positions=[0,120,180,240], rotate = 360 / 6;

		arrayPic.forEach(function(i) {
			if(i < 5){
				htmlPic = htmlPic + '<img id="piece'+ i +'" src="images/home_img'+ i +'.png" class="piece" />';
			}else{
				htmlPic = htmlPic + '<img id="piece'+ i +'" class="piece" />';
			}
		});

		// 元素
		var eleStage = $("#stage"), eleContainer = $("#container"), indexPiece = 0;
		// 元素
		var elePics = $$$(".piece"), transZ = 100 / Math.tan((rotate / 2 / 180) * Math.PI);

		eleContainer.innerHTML = htmlPic;
		
		var startX,startY,endX, endY,position=0;
		    // touch start listener
		 
		function touchStart(event) {
		         event.preventDefault();
		         var touch = event.touches[0];
		         startX = touch.pageX;
		         startY = touch.pageY;
				console.log('start:'+startX+','+startY);  
		}
		eleContainer.addEventListener("touchstart", touchStart, false);
		

		function touchMove(event) {
		         event.preventDefault();
		         var touch = event.touches[0],
		              x = touch.pageX - startX,
		              y = touch.pageY - startY;
		         //console.log('translate(' + x + 'px, ' + y + 'px)'); 
		         var move = x + position;
		         if(move > -3 * rotate && move < 0){
		        	// console.log("move:"+move);
		        	 //transform(eleContainer, "rotateY("+ move +"deg)");
		        	 //transform(this, "rotateY("+ parseInt(move/45) * 45 +"deg)");
		         }
		}
		eleContainer.addEventListener("touchmove", touchMove, false);
		function touchEnd(event) {
			 event.preventDefault();
	         endX = event.pageX;
	         endY = event.pageY;
	         var direction = true;
	         if(Math.abs(event.pageX - startX) <50) return;
	         
	         filter($("#piece"+getPosition(position)), "blur(2px)");
			 if(event.pageX - startX > 0){
				 position--;
				 direction = false;
			 }else if(event.pageX - startX < 0){
				 position++;
			 }
			 console.log("position:"+position);
			 filter($("#piece"+getPosition(position)), "blur(0px)");
			 moveItem(position,direction);
			 /* if(getPosition(position) == 4){
				 setTimeout(function(){
					 $("#ok").style.display = "block";
				 },600);
			 }else{
				 $("#ok").style.display = "none";
			 } */
		}
		eleContainer.addEventListener("touchend", touchEnd, false);
		arrayPic.forEach(function(i, j) {
			if(i != 1){
				filter($("#piece"+i), "blur(2px)");
			}
			$("#piece"+i).dataset.position = positions[j];
			transform($("#piece"+i), "rotateY("+$("#piece"+i).dataset.position+"deg) translateZ("+ (transZ + 5) +"px)");

		});
		//transform($("#ok"), "rotateY(0deg) translateZ("+ (transZ + 5) +"px)");
	} else {
		alert("您的浏览器版本过低,部分效果将无法显示");
	}
})();