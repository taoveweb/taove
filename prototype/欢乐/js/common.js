$(function () {

    if ($('.ykdjs').length != 0) {
        var intervalid = window.setInterval(function () {
            $('.ykdjs').each(function () {
                var milliseconds = $(this).attr('seconds') * 1000;
                milliseconds = milliseconds - 1000;
                $(this).attr('seconds', milliseconds / 1000);
                ShowCountDown(milliseconds, this);
            });
        }, 1000);
    }

    //某一天的

    var kdzBtn=true;//可投注开并

    function ShowCountDown(milliseconds, obj) {

        var leftsecond = parseInt(milliseconds / 1000);
        var day1 = Math.floor(leftsecond / (60 * 60 * 24));
        var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
        var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
        var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
        var temp = 0;
        day1 = day1 + '';
        hour = hour + '';
        minute = minute + '';
        second = second + '';

        if (day1.length > 2) {
            temp = 3;
            day1 = day1;
        } else {
            day1 = day1.length === 2 ? day1 : '0' + day1;
        }

        hour = hour.length === 2 ? hour : '0' + hour;
        minute = minute.length === 2 ? minute : '0' + minute;
        //second = second.length === 2 ? second : '0' + second;

        if (leftsecond <= 1) {
            //倒计时结束-------------
            if ($('.ykdjs').hasClass('tzsj')) {
                kdzBtn=false;
                $('.ykdjs').attr('seconds', '6');
                $(obj).html("<p>距离开奖时间还剩 <span>5<em>秒</em></span></p>");
            }
            if ($('.ykdjs').hasClass('kjsj')) {
                //进入开奖中。。。。 进入ajax请求....没开奖前一直是
                if (leftsecond == 1) {
                    $('.ykdjs').attr('seconds', '2');//一直在开奖中-------------------------------后台操作------------------------------------
                    $('.ykdjs').attr('seconds', '1');//进入开奖-----------------------------------
                    $('.kj-pop').addClass('active');

                   // $.ajax();
                }

                $(obj).html("<p>距离开奖时间还剩 <span>1<em>秒</em></span></p>");
                switch ($('.ykdjs').attr('seconds')) {
                    case '-1':
                        //开第一个号码
                        $('.sz-list').find('.sz').eq(0).removeClass('kzj');
                        break;
                    case '-3':
                        //开第二个号码
                        $('.sz-list').find('.sz').eq(1).removeClass('kzj');
                        //开第三个号码
                        break;
                    case '-5':

                        $('.sz-list').find('.sz').eq(2).removeClass('kzj');
                        $('.zj').show();
                        $('.djs').hide();
                        break;
                    case '-8':
                        //关闭弹出框
                        $('.kj-pop').removeClass('active');
                        break;

                    case '-11':
                        //重置
                        kdzBtn=true;
                        $('.zj').hide();
                        $('.djs').show();
                        $('.ykdjs').attr('seconds', '25');
                        $('.ykdjs').removeClass('kjsj').addClass('tzsj');
                        $(obj).html("<p>投注时间还剩 <span>25<em>秒</em></span></p>");
                        $('.sz-list').find('.sz').addClass('kzj');
                        $('.dnxb-btn').removeClass('active').find('.dz').css('opacity',0).find('em').html('');
                        $('.dnxb-btn').data('val','0');
                        $('.list').eq(0).addClass('active').siblings().removeClass('active');
                        break;
                }
                return;
            }
            $('.ykdjs').removeClass('tzsj').addClass('kjsj');
        }

        if ($('.ykdjs').hasClass('tzsj')) {
            $(obj).html("<p>投注时间还剩 <span>" + second + "<em>秒</em></span></p>");
        } else {
            $(obj).html("<p>距离开奖时间还剩 <span>" + second + "<em>秒</em></span></p>");
        }


    }


    $('.dz-list').on('click', '.list', function () {
        $(this).addClass('active').siblings().removeClass('active');

    });

    jQuery('body').on('click','.dnxb-btn,.bztz-btn',function(){

        if(!kdzBtn) return;

        var that=$(this);
        that.addClass('active');
        var val=+that.data('val')||0;
        var addVal=+$('.list.active').attr('val');
        that.data('val',val+addVal);
        if(that.hasClass('active')){
            var parent=$('.list.active');
            var dzClone=parent.find('.pst');
            var dnxbOffset=$(this).offset();
            var dzOffset=dzClone.offset();
            var ol=(dzClone.width()-$(this).width())/2;
           var strans='translate('+(parseInt(dnxbOffset.left)-parseInt(dzOffset.left)-ol)+'px,'+(parseInt(dnxbOffset.top)-parseInt(dzOffset.top)+30)+'px)';
            dzClone.finish();

            $(dzClone).animate({
                transform:strans,
                opacity:1
            },function(){
                $(this).animate({
                    transform:'translate(0,0)',
                    opacity:0
                },20);
                $('.dnxb-btn.active').find('.dz').css({'opacity':1});
                that.find('.dz em').html(that.data('val'));
            });

        }
    })



});

