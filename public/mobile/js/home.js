var aws = null,
	awp = null,
	awo = null,
	at = 200;
var ws = null;
var list = null;
var i = 2;

var aniShow = "pop-in";
//只有ios支持的功能需要在Android平台隐藏；
/*      if (mui.os.android) {
 var list = document.querySelectorAll('.ios-only');
 if (list) {
 for (var i = 0; i < list.length; i++) {
 list[i].css.display = 'none';
 }
 }
 //Android平台暂时使用slide-in-right动画
 aniShow = "slide-in-right"
 }*/

// 判断扩展API是否准备，否则监听"plusready"事件
if (window.plus) {
	plusReady();
} else {
	document.addEventListener("plusready", plusReady, false);
}


// H5 plus事件处理
function AlubmplusReady() {
	aws = plus.webview.currentWebview();
	//awo = aws.opener();
	if ('iOS' == plus.os.name) {
		at = 300;
	}
	awp = plus.webview.create('album.html', 'album.html', {
		scrollIndicator: 'none',
		scalable: false,
		popGesture: 'hide'
	}, {
		preate: true
	});
	if (!aws.preate) {
		awp.addEventListener('loaded', function() {
			//awo && awo.evalJS("closeWaiting()");
			aws.show(aniShow, at);
		}, false);
	}

}

// 关闭窗口
function preateBack() {
	if (!aws.preate) {
		awp && awp.close();
	}
	back();
}


// 扩展API加载完毕，现在可以正常调用扩展API
function plusReady() {
	//document.addEventListener( "plusscrollbottom", plusscrollbottomCallback, true );
	AlubmplusReady();
	ws = plus.webview.currentWebview();
	ws.setPullToRefresh({
		support: true,
		height: "50px",
		range: "200px",
		contentdown: {
			caption: "下拉可以刷新"
		},
		contentover: {
			caption: "释放立即刷新"
		},
		contentrefresh: {
			caption: "正在刷新..."
		}
	}, onRefresh);

	//document.addEventListener("plusscrollbottom", plusscrollbottomCallback);
}


下接到底部
//$(document).on('scroll', function () {
//  //console.log($(document).height()-$(document).scrollTop()-document.documentElement.clientHeight-20);
//  if (($(document).height() - $(document).scrollTop() - document.documentElement.clientHeight - 200) < 0) {
//      plusscrollbottomCallback();
//  }
//})


$('body').on("vmousedown", function(){
	console.log('yes')
});


function plusscrollbottomCallback(event) {
	console.log('yes')
	if (list) {

		for (var l = 2; l < 6; l++) {
			var item = document.createElement("article");
			item.innerHTML = '<header>\
                                <a><img src="img/myphoto.png" alt=""/>摄影师小伍</a><span>57秒</span>\
                                </header>\
                                <div class="img">\
                                <a><img src="images/' + l + '.png"></a>\
                                </div>\
                                <div>\
                                <section>\
                                <div><span class="like icon">&#xe602;</span><span class="chat icon">&#xe604;</span><span class="report icon">&#xe603;</span></div>\
                                </section>\
                                <ul class="comments">\
                                <li><a>第一条是发布者</a><span>发布的文字内容</span></li>\
                                <li><a href="">评论者1</a><span>评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容</span></li>\
                                <li><a href="">评论者2</a><span>评论的内容这是一个内容</span></li>\
                                <li><a href="">评论者3</a><span>评论的内容这是一个内容</span><em>100跟帖</em></li>\
                                </ul>\
                                </div>';
			list.appendChild(item);
			// $(list).scrollTop(1000)
		}
	}

}


// DOM构建完成获取列表元素
$(function() {
	list = document.getElementById("list");
	$('#list').on('click', 'li', function() {
		console.log('lis');
		awp.show(aniShow, at);
	});
	console.log(list)
})

// 刷新页面

function onRefresh() {

	if (list) {
		i++;
		if (i >= 6) {
			i = 1
		}
		var item = document.createElement("article");
		console.log(i)
		item.innerHTML = '<header>\
                                <a><img src="img/myphoto.png" alt=""/>摄影师小伍</a><span>57秒</span>\
                                </header>\
                                <div class="img">\
                                <a><img src="images/' + i + '.png"></a>\
                                </div>\
                                <div>\
                                <section>\
                                <div><span class="like icon">&#xe602;</span><span class="chat icon">&#xe604;</span><span class="report icon">&#xe603;</span></div>\
                                </section>\
                                <ul class="comments">\
                                <li><a>第一条是发布者</a><span>发布的文字内容</span></li>\
                                <li><a href="">评论者1</a><span>评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容评论的内容这是一个内容</span></li>\
                                <li><a href="">评论者2</a><span>评论的内容这是一个内容</span></li>\
                                <li><a href="">评论者3</a><span>评论的内容这是一个内容</span><em>100跟帖</em></li>\
                                </ul>\
                                </div>';

		list.insertBefore(item, list.firstChild);
	}
	ws.endPullToRefresh();

}



//举报----------------------------
var wsR = null,
	wReport = null,
	wCommets = null,
	wCommentsHeader = null;
// 扩展API加载完毕，现在可以正常调用扩展API
function plusReadyR() {
	wsR = plus.webview.getLaunchWebview();
	// 用户点击后
	wsR.addEventListener("maskClick", function() {
		wReport.close("auto");
	}, false);
}
// 判断扩展API是否准备，否则监听"plusready"事件
if (window.plus) {
	plusReadyR();
} else {
	document.addEventListener("plusready", plusReadyR, false);
}
// 显示侧滑页面
function showReport() {
	// 防止快速点击可能导致多次创建
	if (wReport) {
		return;
	}
	// 开启遮罩
	wsR.setStyle({
		mask: "rgba(0,0,0,0.5)"
	});
	// 创建侧滑页面
	wReport = plus.webview.create("report.html", "report", {
		bottom: 0,
		height: 200,
		popGesture: "none"
	});
	// 侧滑页面关闭后关闭遮罩
	wReport.addEventListener('close', function() {
		wsR.setStyle({
			mask: "none"
		});
		wReport = null;
	}, false);
	// 侧滑页面加载后显示（避免白屏）
	wReport.addEventListener("loaded", function() {
		wReport.show("slide-in-bottom", 300);
	}, false);
}

function showCommets() {
	// 防止快速点击可能导致多次创建
	if (wCommets) {
		return;
	}

	// 创建侧滑页面
	wCommets = plus.webview.create("comments.html", "comments.html", {
		popGesture: "close"
	});
	wCommentsHeader = plus.webview.create("comments_header.html", "comments_header", {
		top: 0,
		height: 46,
		popGesture: "none",
		position: 'absolute'
	});
	wCommets.append(wCommentsHeader);
	// 侧滑页面关闭后关闭遮罩
	wCommets.addEventListener('close', function() {
		wCommets = null;
		wCommentsHeader = null;
	}, false);
	// 侧滑页面加载后显示（避免白屏）
	wCommets.addEventListener("loaded", function() {
		wCommets.show(aniShow, 300);
	}, false);
}

$(function() {

	//显示举报页面
	$('body').on('touchend', '.report', function() {
			showReport();
		})
		//显示评论页面
	$('body').on('touchend', '.chat', function() {
			showCommets();
		})
		//点赞页面
	$('body').on('touchend', '.like', function() {
		if ($(this).hasClass('red')) {
			$(this).html('&#xe602;').removeClass('red')
		} else {
			$(this).html('&#xe605;').addClass('red')
		}

	})
});