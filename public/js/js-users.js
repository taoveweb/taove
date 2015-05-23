/**
 * Created by Administrator on 2015/5/23.
 */
$(function(){
    //创建数据
    $("#postDataBtn").on('click',function(){
        var postData=$('#postData').find("input").serializeArray();
        console.log(postData);
        $.ajax({
            url: "/api/users/new",
            type: "POST",
            data: postData,
            dataType: "json",
            success: function(data,status, xhr){
                console.log(data)
            },
            error: function (data, status, xhr){
                console.log(data)
            }
        });
    });

});