/**
 * Created by Administrator on 2016/5/5 0005.
 */
var moveing = false;
var swiper = new Swiper('.swiper-container', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    autoHeight: true,
    freeMode: true,
    onTouchMove: function () {
        moveing = true;
    },
    onTouchEnd: function (swiper, event) {
        moveing = false;
        var pulldistance = swiper.getWrapperTranslate();//滚动条高度
        var height = $('.swiper-container').height();//可见区域高度
        var swiperWrapper = $('.swiper-wrapper').height();//总高度

        if (pulldistance < 40 && pulldistance > -40) {
            $('.pull').html('下拉刷新');
            $('.push').html('上拉加载');
        }
        if (pulldistance > 40) {
            //刷新位置
            $('.pull').html('正在刷新');
            location.href = '';
        }
        if (pulldistance < 0 && Math.abs(pulldistance) + height - $('.swiper-wrapper').height() > 40) {
            $('.push').html('正在加载中。。。');
            //加载位置
            console.log('bbb');
            $.ajax({
                type: "get",
                datatype: 'json',
                async: false, //同步
                url: "/Freeca/ajaxFreecaRecord?&PageNumber=" + PageNumber,
                success: function (data) {
                    $('.push').html('上拉加载');
                    PageNumber++;
                    $(".btops1").append(data.html);
                    swiper.update();
                    console.log('ccc');
                    if (data.state == "complete") {
                        $('.push').html('全部加载完');
                    }

                }
            });
        }
    },
    onProgress: function (swiper, progress) {
        if (moveing) {
            if (moveing) {
                var pulldistance = swiper.getWrapperTranslate();//滚动条高度
                var height = $('.swiper-container').height();//可见区域高度
                var swiperWrapper = $('.swiper-wrapper').height();//总高度

                $('.push').html('上拉加载。');
                $('.pull').html('下拉刷新');
                //console.log(swiper.height*progress);

                if (progress <= 1) {
                    $('.pull').html('松开刷新');
                }
                if (pulldistance < 0 && Math.abs(pulldistance) + height - $('.swiper-wrapper').height() > 40) {
                    $('.push').html('松开加载');
                }
            }
        }

    }
});