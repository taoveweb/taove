/**
 * Created by Administrator on 2015/5/10.
 */
$(function () {
    //查询
    var baseUrl = document.location.href;
    $('#searchBtn').on('click', function () {
        document.location.href = "http://" + document.location.hostname + ":3000/admin/" + $('#searchVal').val();
    })

    //删除


    $('#tableform').on('click', '.delBtn', function () {
        console.log('delBtn-click');
        var data = $(this).attr("_id");
        var that = $(this);
        $.ajax({
            url: '/admin',
            data: {_id: data},
            type: "DELETE"
        }).done(function (d) {
            if (d.state === 1) {
                that.parent().parent().remove();
            }
        })
    });



    $('#tableform').on('click', '.delete-imgBtn', function () {
        console.log('delBtn-click');
        var data = $(this).attr("imgId");
        var that = $(this);
        $.ajax({
            url: '/admin',
            data: {imgId: data,_id:that.attr("_id")},
            type: "DELETE"
        }).done(function (d) {
            if (d.state === 1) {
                that.parent().remove();
            }
        })
    });

    $('#tableform').on('click', '.putBtn', function () {
        console.log('putBtn');
        var data = $(this).attr("imgId");
        var that = $(this);
        var arr=$(this).parent().parent().find(":input").serializeArray();
        console.log(arr);
        $.ajax({
            url: '/admin',
            data: arr,
            type: "PUT"
        }).done(function (d) {
            if (d.state === 1) {
                console.log("成功了");
            }
        })
    });

});