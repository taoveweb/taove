QL=window.QL=window.QL||{},QL.EXPORTS=QL.EXPORTS||{},function(e,t,s,n){function a(){C.isandroid&&C.cne&&200!=C.cne&&d.loadData(window.restUrl+"v2/channel/aos",{params:{cne:C.cne},withCredentials:!1,success:function(e){if(e=e||{c:-1,d:"no data"},!e.c){if(e.d.url)return window.location.href=e.d.url,!1;if(e.d.cne){var t="http://pukoo.net/page/channel",s=d.getRequest();return s.cne=e.d.cne,window.location.href=d.getUrl(t,s),!1}}},error:function(e){}})}function i(e){C.iswx||(title="钱鹿，一个人人都在玩的赚钱神器"),0==e?o():1==e?c():2==e&&r()}function r(){s("#house").html(s("#tpl-clean-init").tmpl({id:C.id})).css({"background-color":"#ffd600",height:"100%","-webkit-box-flex":"1"}),document.body.clientHeight<320&&s(".btn-clean").addClass("hide"),C.isios||s(".tip-id").show(),p(1)}function o(){var t=[{name:"素素",desc:'奖励：限时任务《零钱夺宝Pro》，赚了<span class="fc-primary">2.5</span>元',time:"1分钟",siu:"a_5.png"},{name:"电动小马达",desc:'完成：限时任务《携程旅游》，赚了<span class="fc-primary">2.5</span>元',time:"2分钟",siu:"a_4.png"},{name:"Lucy",desc:'完成：新手任务，赚了<span class="fc-primary">0.20元</span>',time:"3分钟",siu:"a_3.png"},{name:"Finih 5",desc:'完成：限时任务《部落风暴》，赚了<span class="fc-primary">2.5</span>元',time:"6分钟",siu:"a_1.png"},{name:"性感的美女",desc:'提现<span class="fc-primary">10</span>元到支付宝',time:"50秒",siu:"a_2.png"},{name:"笑笑",desc:'天天投注（第25期）：中奖啦！获得投注奖金<span class="fc-primary">25</span>元',time:"30秒",siu:"a_6.png"},{name:"再见我的爱2015",desc:'完成：限时任务《部落风暴》，赚了<span class="fc-primary">2.5</span>元',time:"28秒",siu:"a_7.png"},{name:"阿辉",desc:'提现<span class="fc-primary">50</span>元到微信',time:"20秒",siu:"a_8.png"},{name:"林先生的妻子",desc:'天天投注（第25期）：中奖啦！获得投注奖金<span class="fc-primary">20</span>元',time:"17秒",siu:"a_9.png"},{name:"超级玛丽亚",desc:'完成：限时任务《部落风暴》，赚了<span class="fc-primary">2.5</span>元',time:"8秒",siu:"a_10.png"},{name:"大叔",desc:'天天投注（第25期）：中奖啦！获得投注奖金<span class="fc-primary">120</span>元',time:"16秒",siu:"a_11.png"},{name:"松树不倒",desc:'完成：限时任务《百度地图》，赚了<span class="fc-primary">2.5</span>元',time:"15秒",siu:"a_12.png"},{name:"永远坚持",desc:"完成：新用户注册，获得红包3元",time:"12秒",siu:"a_13.png"},{name:"艺高人单打",desc:'充值<span class="fc-primary">20</span>元到手机',time:"8秒",siu:"a_14.png"},{name:"科长达人",desc:"完成：分享任务《大吃家的故事》转发，总共赚了1元",time:"7秒",siu:"a_15.png"},{name:"寂寞的绿色",desc:'完成：限时任务《京东金融》，赚了<span class="fc-primary">2.5</span>元',time:"6秒",siu:"a_16.png"},{name:"baby",desc:"升级到LV 5！完成等级任务《开疆辟土》，获得奖励25元",time:"5秒",siu:"a_17.png"},{name:"杜--坚持到底",desc:"完成：分享任务《大吃家的故事》转发，总共赚了1.6元",time:"5秒",siu:"a_18.png"},{name:"秋天的霞光",desc:'完成：深度任务《百度地图》，赚了<span class="fc-primary">0.3</span>元',time:"3秒",siu:"a_19.png"},{name:"梁静茹在钱鹿",desc:"升级到LV 3！完成等级任务《初创师门》，获得奖励5元",time:"2秒",siu:"a_20.png"},{name:"非",desc:'完成：限时任务《部落风暴》，赚了<span class="fc-primary">2.5</span>元',time:"1秒",siu:"a_21.png"}],n={},a={},i=4,r=t.length,o=d.getRequest();user=C.user,showList="show",s.inArray(e.location.hostname,["m.qianlu.com","test-qiandeer.ymapp.com"])>-1&&(showList="hidden"),s("#house").html(s("#tpl-invite-init").tmpl({showList:showList,icon:"http://s2.qianlu.com/m/images/avatar/a_14.png",name:C.user.name?"我是"+C.user.name:"ID:"+o.id,id:o.id,siu:user.headimg||"http://s2.qianlu.com/m/images/icon/icon_avatar.png",day:user.time||1})),s.inArray(e.location.hostname,["m.qianlu.com","test-qiandeer.ymapp.com"])>-1&&s(".header").css({"min-height":s(e).height()}),s(".ui-page").pages("house",0,function(){n=s(".md-0 .content"),n.html(s("#tpl-invite-item").tmpl(t.slice(0,4))),n.find(".item").first().addClass("first"),s("#ql-share").on("touchmove",function(){return!1}),setTimeout(function(){n.find(".item.first").removeClass("first")},5e3),C.isios||s(".tip-id").show(),setTimeout(function(){setInterval(function(){i>=r&&(i=0),a=s("#tpl-invite-item").tmpl(t.slice(i,i+1)),n.prepend(a),a.addClass("current"),a.animate({height:"88px"},1200,"ease",function(){a.animate({opacity:1},400)}),a.find(".desc").css({color:"#e75735"}),a.find(".desc").animate({color:"#666"},1,"ease",function(){},4e3),setTimeout(function(){n.find(".item").last().remove()},3e3),i++},4e3)},1)})}function c(){var e=d.getRequest(),t=C.user,n={time:t.time||1,apps:t.apps||0,appsIncome:d.moneyFormat(t.appsIncome||0),sons:t.sons||0,sonsIncome:d.moneyFormat(t.sonsIncome||0),totalIncome:d.moneyFormat(t.totalIncome||0),icon:"http://s2.qianlu.com/m/images/avatar/a_14.png",id:e.id};s("#house").html(s("#tpl-prentice-grade").tmpl(n)),s(".ui-page").pages("house",0,function(){s(".prentice-grade").on("touchmove",function(){return!1}),C.isios||s(".grade-tip-id").show()})}function m(){s("#ql-share").on({tap:function(t){t=t||e.event;var n=t.target,a=s(n),i=parseInt(a.data("ck"))||0;parseInt(a.data("id"))||0;switch(i){case 1:if(C.iswx)return s(".share-box-wx-v2").removeClass("hide"),!1;if(C.iswb||C.isqq&&C.isios)return s(".share-box-other").removeClass("hide"),!1;var r=d.getRequest();C.isios?window.location.href=d.strFormat(d.host()+"/login?scode={0}&cne={1}",C.user.scode||r.s||"",C.user.cne||r.c||0):window.location.href=URL_.aos;break;case 10:g.hide();break;case 12:e.location.reload(!0);break;case 14:return C.refer?e.location.href=C.refer:history.back(),!1;default:return!0}return t.preventDefault(),t.stopPropagation(),!1}})}function p(t,n){switch($target=s(".ui-page"),t){case 0:$target.pages("gate",function(e){e.find(".ui-content").html(n)});break;case 1:$target.pages("house",0,function(){e.scrollTo(0,C.y)});break;case 2:$target.pages("yard",function(e){e.find(".ui-content").html(n)},function(){e.scrollTo(0,1)})}}function u(e,t){var t=t||0;0===t?p(0,s("#tpl-notice").tmpl({msg:e})):1===t&&p(0,s("#tpl-notice-1").tmpl({msg:e}))}var d=e.API,g=e.Lightbox,l=d.getRequest();C={sign:"c239e87f6691e88fd360eba573a05fb0",iswx:/MicroMessenger/i.test(navigator.userAgent),iswb:/weibo/i.test(navigator.userAgent)||/TencentMicro/i.test(navigator.userAgent),isqq:/QQ/.test(navigator.userAgent),isandroid:/android/i.test(navigator.userAgent),isios:!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),isios4:/iPhone OS 4/i.test(navigator.userAgent),issafari:/Safari/i.test(navigator.userAgent),issafari6:/Safari/i.test(navigator.userAgent)&&/Version\/6/i.test(navigator.userAgent),issafari70:/Safari/i.test(navigator.userAgent)&&/Version\/7\.0/i.test(navigator.userAgent),issafari8:/Safari/i.test(navigator.userAgent)&&/Version\/8/i.test(navigator.userAgent),isqd:/qiandeer/i.test(navigator.userAgent),iszhengjia:/zhengjia/i.test(navigator.userAgent),isios9:/iPhone OS 9/i.test(navigator.userAgent),isios8:/Version\/8/i.test(navigator.userAgent),isios83:/iPhone OS 8_3/i.test(navigator.userAgent),isios840:/iPhone OS 8_4/i.test(navigator.userAgent),isios841:/iPhone OS 8_4_1/i.test(navigator.userAgent),isios7:/iPhone OS 7_/i.test(navigator.userAgent),isios71:/iPhone OS 7_1/i.test(navigator.userAgent),user:{}},URL_={i:"https://itunes.apple.com/cn/app/id{0}?mt=8",s:"qdeer9dirkt8gk59gk://{0}",aos:"http://aos.qianlu.com/apk?cne=0"},Timer_=0,Times_=0,Lists=function(){},function(e){try{s.extend(C,{m:parseInt(l.m||0),cne:parseInt(l.c||0),id:parseInt(l.id||0),scode:parseInt(l.s||0)});var t=["wx.0231x.cn"],n=["q.17yes.cn","w.17yes.cn","q.db188.cn","w.db188.cn","e.db188.cn","wx.sy2012.cn","web.sy2012.cn"],i=["wx.myskf.cn"],r=["q.17yes.cn","w.17yes.cn","q.db188.cn","w.db188.cn","e.db188.cn","wx.sy2012.cn","web.sy2012.cn"];if(!C.iswx&&-1==e.location.hostname.indexOf("192.168.0.")&&-1==e.location.hostname.indexOf("m.qianlu.com"))return e.location.href=d.getUrl("http://m.qianlu.com/page/s.html",l),!1;if(C.iswx&&s.inArray(e.location.hostname,t)>-1)return e.location.href=d.getUrl("http://"+n[Math.floor(Math.random()*n.length)]+"/page/s.html",l),!1;if(C.iswx&&s.inArray(e.location.hostname,i)>-1)return e.location.href=d.getUrl("http://"+r[Math.floor(Math.random()*r.length)]+"/page/s.html",l),!1;m(),a(),s("#ql-share").addClass(e.innerWidth>e.innerHeight?"landscape":"portrait"),s(e).on("orientationchange",function(){switch(s("#detail_main").css({height:"auto"}),e.orientation){case 0:case 180:C.o=0,s("body").removeClass("landscape").addClass("portrait");break;case-90:case 90:C.o=1,s("body").removeClass("portrait").addClass("landscape")}})}catch(o){u("初始化出错，请刷新重试！"),_hmt.push(["_trackEvent","err-init",JSON.stringify(o)])}}(e),Lists={start:function(){s(function(){s.getTmpl("http://s2.qianlu.com/m/dist/page-share/0.0.15/share.tpl").done(function(){g.init();var t=d.getRequest();d.loadData(e.restUrl+"v2/user/score?id="+t.id,{timeout:6e3,success:function(e){e=e||{c:-1,d:"no data"},e.C?i(C.m):(C.user=e.d,i(C.m))},error:function(){i(C.m)}})}).fail(function(){u("哎呀～资源读取失败"),_hmt.push(["_trackEvent","err-req-wrong","req-wrong"])}).always(function(){})})}},(n.EXPORTS.Lists=Lists).start()}(window,document,Zepto,QL);