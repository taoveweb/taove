/**
 * Created by Administrator on 2015/11/9 0009.
 */
$(function(){
    $('.yd-btn').on('click',function(){
        $('.pop').fadeIn();
    })

    $('body').on('click',".pop-close",function(){
        $('.pop').fadeOut();
    })


    $('.select').find('dt').on('click',function(){
        var that=$(this);
        var parent=that.parent();
        var dd=parent.find('dd');
        dd.fadeIn();

        parent.on('click','p',function(){
            that.html($(this).html());
            dd.fadeOut();
        })
    })





})




//菜单浮动
$(function () {
    var menu = $('.nav-box').eq(0);
    if (!menu.length) return;
    var win = $(window);
    var offsetTop = menu.offset().top;

    setMenuPosition();
    win.on('scroll', function () {
        setMenuPosition();
    });

    function setMenuPosition() {
        if (win.scrollTop() >= offsetTop) {
            menu.addClass('fixed');
        } else {
            menu.removeClass('fixed');
        }
    }
});
