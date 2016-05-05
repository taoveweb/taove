/**
 * Created by Administrator on 2016/5/5 0005.
 */
$(function(){
    //按钮
    $('.btn').on('touchstart', function () {
        $(this).addClass('hover');
    });
    $('.btn').on('touchend', function () {
        $(this).removeClass('hover');
    });

    //拖动

    var startTime = 0;
    var moveX = 0;
    var startX = 0;
    var drag=document.querySelector('.drag');
    var wrap=document.querySelector('.wrap');
    $('.setting-btn').on('tap', function () {
        drag.style.webkitTransition = '300ms';
        wrap.style.webkitTransition = '300ms';
        drag.style.webkitTransform = `translateX(0px)`;
        wrap.style.webkitTransform = `translateX(-100%)`;
        $('.drag').addClass('show');
    });
    $('.back ').on('tap', function () {
        $('.drag').toggleClass('show');
        drag.style.webkitTransform = `translateX(100%)`;
        wrap.style.webkitTransform = `translateX(0%)`;
    });



    $(document).on('touchstart', function (e) {
       // e.preventDefault();
        startTime = e.timeStamp;
        startX = e.touches[0].clientX;
        $(document).on('touchmove', function (e) {
            if ($('.drag').hasClass('show')) {
                e.preventDefault();
                moveX = e.touches[0].clientX - startX;
                if(moveX<0) return;
                document.querySelector('.drag').style.cssText = '';
                document.querySelector('.wrap').style.cssText = ''
                console.log('yes')
                drag.style.webkitTransform = `translateX(${moveX}px)`;
                wrap.style.webkitTransform = `translateX(${moveX-$(document).width()}px)`;
            }
        })

    });
    $(document).on('touchend', function (e) {

        if ($('.drag').hasClass('show') ) {
            var bl=moveX/(e.timeStamp-startTime);
            drag.style.webkitTransition = '300ms';
            wrap.style.webkitTransition = '300ms';
            if (moveX > $(document).width() / 2 || bl>1) {
                drag.style.webkitTransform = `translateX(100%)`;
                wrap.style.webkitTransform = `translateX(0%)`;
                $('.drag').removeClass('show');
            } else {
                drag.style.webkitTransform = `translateX(0px)`;
                wrap.style.webkitTransform = `translateX(-100%)`;
            }
        }
    })
});
