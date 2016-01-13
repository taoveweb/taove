/**
 * Created by Administrator on 2015/11/9 0009.
 */
$(function () {
    $('.yd-btn').on('click', function () {
        $('.yd-pop').fadeIn();
    })

    $('body').on('click', ".yd-close", function () {
        $('.yd-pop').fadeOut();
    })


    $('.select').find('dt').on('click', function () {
        var that = $(this);
        var parent = that.parent();
        var dd = parent.find('dd');
        dd.fadeIn();

        parent.on('click', 'p', function () {
            that.html($(this).html());
            that.parent().find('input[type=hidden]').val($(this).html());
            dd.fadeOut();
        })
    });


    //通用tab面板

    $('.tab').on('click', ".nenu span", function () {
        var that = $(this);
        var index = that.index();
        that.addClass('current').siblings().removeClass('current');
        $(this).parents('.tab').find('.panel').eq(index).addClass('current').siblings().removeClass('current');
    })


});


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


//意向单


$('.now_intention').click(function () {

    var yd = $('#YdPop');
    var fields = yd.find('form').serializeArray();
    var params = {};
    jQuery.each(fields, function (i, field) {
        params[field.name] = field.value;
    });
    if(!validate.realName(params.name)){
        alertmsg('请检查名字格式是否正确');
        return false;
    }
    if(!validate.phone(params.phone)){
        alertmsg('请检查电话格式是否正确');
        return false;
    }
    params.type="post";
    $.post("/admin", params,
        function (data) {
            alertmsg(data.msg,data);
            if(data.success){
                $('.yd-pop').fadeOut();
               window.location.href= "/admin"
            }
        });

    return false;
});




//消息提示框
function alertmsg(msg,data) {
    var boxmsg=$('.alertmsg');
    if(data && data.success){
        boxmsg.find('p').removeClass('err')
    }else{
        boxmsg.find('p').addClass('err')
    }
    boxmsg.find('p').html(msg);
    boxmsg.css('display', 'block');
    setTimeout(function () {
        boxmsg.fadeOut();
    }, 1500)
}