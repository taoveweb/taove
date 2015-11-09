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
