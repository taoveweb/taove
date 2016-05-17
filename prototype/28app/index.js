$(function () {
    $('.menu span').on('tap', function () {
        $('.popmenu').toggleClass('active');
    })
    $('.popmenu').on('tap', 'a', function () {
        //$('.popmenu').toggleClass('active');
    })
})


var swiper = new Swiper('.swiper-container', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    autoHeight: true,
    freeMode: true,
    onTouchEnd: function (swiper, event) {
        var pulldistance = swiper.getWrapperTranslate();
        if (pulldistance < 40 && pulldistance > -40) {
            $('.pull').html('下拉刷新');
            $('.push').html('加载中');
        }
    },
    onProgress: function (swiper, progress) {
        console.log(swiper.touches.currentY);
        console.log(swiper.isEnd);
        var pulldistance = swiper.getWrapperTranslate();
        var height = $('.swiper-slide').height() - $('.table').height();
        if (pulldistance > 40) {
            $('.pull').html('松开刷新');
        }
        if (pulldistance < -40) {
            $('.push').html('正在加载中。。。');
        }

        if (pulldistance < 40 && pulldistance + height > -40) {
            $('.pull').html('下拉刷新');
            $('.push').html('加载中');
        }


    }
});


$(function () {
    var stop_auto_reload_up = 0;
    var sections =parseInt($(".sections").html());
    get_count_down();
    function get_count_down() {
        sections--;
        $(".sections").html(sections);

        if(sections==0){
            //这里开奖
            clearTimeout(stop_auto_reload_up);
            return;
        }
        stop_auto_reload_up = setTimeout(function () {
            get_count_down();
        }, 1000);
    }
});
