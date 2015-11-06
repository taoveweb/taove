/**
 * Created by Administrator on 2015/11/6 0006.
 */
$(function () {
    $('#tabMenu').on('click', 'span', function () {
        var that = $(this);
        var index = that.index();
        $('#line').animate({left: that.position().left}, 200);
        that.addClass('tab-c').siblings().removeClass('tab-c');
        $('.panel-group .tab-panel').eq(index).addClass('tab-c').siblings().removeClass('tab-c');
    });


    $('#fogetBtn').on('click', function () {
        //('#forget').addClass('show');
        $('#forget').show();
        $('#forget').animate({top:0});
    })
    $('#forgetBack').on('click', function () {
        //('#forget').addClass('show');
        $('#forget').animate({top:'-100%'});
    })

})
