/**
 * Created by Administrator on 2015/11/12 0012.
 */
$(function(){
    $('.tab').find('.menu').on('click'," span",function(){
        var that=$(this);
        var index=that.index();
        that.addClass('current').siblings().removeClass('current');
        $(this).parents('.tab').find('.panel').eq(index).addClass('current').siblings().removeClass('current');

        if($(this).attr('data-open')==1){
            $(this).attr('data-open',0)
            $grid2.isotope('layout');

            $("img").lazyload({
                effect: "fadeIn",
                threshold : 200
            });
        }

    })
});
