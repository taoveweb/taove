function SocketClient() {
	var self = this;
	this.version     = "3.2.1";
	this.renewal     = "3.2.0";
	this.port        = "11111";
	//掉钱眼儿下载地址
	this.downloadurl= "https://appsto.re/cn/0qnbbb.i";
    //this.downloadurl = "itms-services://?action=download-manifest&url=https%3A%2F%2Fwww.pgyer.com%2Fapiv1%2Fapp%2Fplist%3FaId%3Dd22d6e0316bf218ce50048082d5b7c2c%26_api_key%3Dd53978828016a50127ba9cf0e382aff1";
	//趣味书屋下载地址
	//this.downloadurl = "https://appsto.re/cn/ndVs_.i";

	//试玩过程中使用的地址
//	this.mainurl     = "AppTesterMain://";
//	this.shareurl    = "AppTesterShare://";
//	this.mainurl    = "cqmusicmain://";
//	this.shareurl   = "cqmusicshare://";
	this.mainurl    = "BookStoreMain://";
	this.shareurl   = "BookStoreShare://";

	//趣味书屋试玩地址
	this.mainurl2    = "BookStoreMain://";
	this.shareurl2   = "BookStoreShare://";

	this.seturl      = "prefs:root=General&path=ManagedConfigurationList";

	this.isonline = false;//是否在线
	this.isnew = false;//是否有更新
	this.isRenewal = false;//是否强制更新
	this.isInstall = false;//监测某个应用是否已经安装
	this.isOpenSuccess = false;//监测该应用是否打开成功
	this.wxlogin = "false";//微信登录是否成功
	this.udid = "";//用户udid
	
	
	this.isStop = false;
}
//来源为钱眼书屋
SocketClient.prototype.appstore = function(){
	this.downloadurl = "https://appsto.re/cn/0qnbbb.i";
//	this.downloadurl = "https://appsto.re/cn/ndVs_.i";
	this.mainurl     = "BookStoreMain://";
	this.shareurl    = "BookStoreShare://";
}
//来源为掉钱眼儿Pro
SocketClient.prototype.bspro = function(){
	//this.downloadurl = "https://appsto.re/cn/ndVs_.i";
	this.mainurl     = "BSProMain://";
	this.shareurl    = "BSProShare://";
}
//来源为钱眼Music
SocketClient.prototype.music = function(){ 
	this.version     = "2.2.0";
	this.downloadurl = "https://appsto.re/cn/Q9Icbb.i";
	this.mainurl     = "cqmusicmain://";
	this.shareurl    = "cqmusicshare://";
}
//来源为钱眼pro
SocketClient.prototype.pro = function(){ 
	this.downloadurl = "https://appsto.re/cn/0qnbbb.i";
	this.mainurl     = "BookStoreMain://";
	this.shareurl    = "BookStoreShare://";
}
SocketClient.prototype.connect = function() {
	var self = this;
	this.socket = new WebSocket("ws://127.0.0.1:"+self.port);

	this.socket.onopen = function() {
		self.onopen.apply(self, arguments);
	};
	this.socket.onmessage = function() {
		self.onmessage.apply(self, arguments);
	};
	this.socket.onclose = function() {
		self.onclose.apply(self, arguments);
	};
};

SocketClient.prototype.deviceAdded = function(params) {

};

SocketClient.prototype.deviceRemoved = function(params) {
	var li = this.visibleElems[params.connection_id];
	li.parentNode.removeChild(li);
};

SocketClient.prototype.onopen = function() {
	var self = this;
	//连接成功事件
	self.socket.send('getChannel');
	self.socket.send('version');
//	self.socket.send('getUserId');
//	self.socket.send('getToken');
	//this.socket.send('GotUserInfo');
	self.isonline = true;
	self.conSuccess();
	//this.changeStatus(this.isonline,this.isnew);
};

SocketClient.prototype.onmessage = function(message) {
	//接收信息事件
	//alert(message.data);
	if(message.data.length>0){
		var data = message.data.split(",");
		if(data.length == 2){
			this.isonline = true;
			switch(data[0]){
			case "version":
				var old_version = data[1];
				if(old_version != this.version){
					this.isnew = check(old_version,this.version);
					this.isRenewal = check(old_version,this.renewal);
				}else{
					this.isnew = false;
				} 
				this.changeStatus(this.isonline,this.isnew,this.isRenewal);
				break;
			case "isPurchasedReDownload":
				//是否首次下载
				var isPurchasedReDownload = false;
				if("true" == data[1]){
					isPurchasedReDownload = true;
				}
				this.reDownload(isPurchasedReDownload);
				break;
			case "isPurchasedReDownload":
				//是否首次下载
				var isPurchasedReDownload = false;
				if("success" == data[1]){
					isPurchasedReDownload = true;
				}
				this.reDownload(isPurchasedReDownload);
				break;
			case "isOpenSuccess":
				if("true" == data[1]){
					this.isOpenSuccess = true;
				}else{
					this.isOpenSuccess = false;
				}
				this.openSuccess(this.isOpenSuccess);
				break;
			case "wsRecieve":
				if("true" == data[1]){
					this.wsRecieve(true);
				}else{
					this.wsRecieve(false);
				}
				break;
			case "idfa":
				this.register(data[1],this.udid);
				break;
			case "udid":
				this.udid = data[1];
				this.getDeviceid();
				break;
			case "channel":
				if(data[1] == "appStore"){
					this.appstore();
					isStop = false;
				}else if(data[1] == "cqmusic"){
					this.socket.send("isAppInterfaceShow,true");
					this.music();
					isStop = false;
//				}else if(data[1] == "bs_pro"){
//					this.socket.send("isAppInterfaceShow,true");
//					this.bspro();
//					isStop = false;
				}else if(data[1] == "cq_bs_pro"){
					this.socket.send("isAppInterfaceShow,true");
					this.pro();
					isStop = false;
				}else{
					this.socket.send("isAppInterfaceShow,false");
					isStop = true;
//					this.downloadNew();
					this.socket.close();
				}
				break;
			case "userId":
//				this.getUserId(data[1]);
				break;
			case "token":
//				var exp = new Date();  
//			    exp.setTime(exp.getTime() + 45* 60 * 1000);//过期时间 5分钟  
//			    document.cookie = 'lovebar_data="' + escape(data[1]) + '";expires=' + exp.toGMTString();  
			}
		}else if(message.data.length > 30){
//			console.log(message.data);
//			this.register(message.data,this.udid);
		}
	}
	//this.changeStatus(this.isonline,this.isnew);
};
function check(v1,v2){
	var ov = v1.split(".");
	var nv = v2.split(".");
	if(nv.length > ov.length){
		ov[ov.length] = "0";
	}
	if(ov.length > nv.length){
		nv[nv.length] = "0";
	}
	for(var i=0;i<ov.length;i++){
		var n = parseInt(nv[i]);
		var o = parseInt(ov[i]);
		//alert("n:"+n+";o:"+o);
		if(n > o){
			return true;
		}else if(n < o){
			return false;
		}
	}
}
SocketClient.prototype.onclose = function() {
	//socket关闭
	var retryInterval = 1000.0;
	console.log('connection closed, retrying in ' + (retryInterval / 1000.0)
			+ ' seconds');
	var self = this;
	window.setTimeout(function() {
		if(!self.isStop){
			self.connect();
		}
	}, retryInterval);
	//alert("是否有更新："+this.isnew);
	this.isonline  = false;
	this.changeStatus(this.isonline,this.isnew,this.isRenewal);
};
//改变状态
SocketClient.prototype.changeStatus= function(){     
	changeStatus.apply(this, arguments);  
	return this;     
} 
//获取设备ID
SocketClient.prototype.getDeviceid= function(){     
	getDeviceid.apply(this, arguments);  
	return this;     
}
//是否首次下载
SocketClient.prototype.reDownload= function(){     
	reDownload.apply(this, arguments);  
	return this;     
}
//改变状态
SocketClient.prototype.changeStatus= function(){     
	changeStatus.apply(this, arguments);  
	return this;     
} 
//连接成功后回调
SocketClient.prototype.conSuccess= function(){     
	conSuccess.apply(this, arguments);  
	return this;     
}
//注册
SocketClient.prototype.register= function(){     
	register.apply(this, arguments);  
	return this;     
}
//打开应用
SocketClient.prototype.openSuccess= function(){     
	openSuccess.apply(this, arguments);  
	return this;     
} 
//注册成功后APP回调
SocketClient.prototype.wsRecieve= function(){     
	wsRecieve.apply(this, arguments);  
	return this;     
}
//获取用户id
SocketClient.prototype.getUserId= function(){     
	getUserId.apply(this, arguments);  
	return this;     
}
//强制更新
SocketClient.prototype.downloadNew= function(){   
	downloadNew.apply(this, arguments);  
	return this;     
} 