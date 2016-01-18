/**
 * Created by kiiekin on 16/1/17.
 */
$(function(){

    $('.addTitle').on('blur',function(){
        var parent=$(this).parents('.users');
        var obj=eachPhotoＦramesData(photoＦramesData,$(this).val());
        parent.find('[name="size"]').val(obj.size);
        parent.find('[name="promise"]').val(obj.promise);
        parent.find('[name="stockNum"]').val(obj.stockNum);
        parent.find('[name="pageNum"]').val(obj.pageNum);
        parent.find('[name="price"]').val(obj.price);
        parent.find('[name="sort"]').val(obj.sort);

    });

    $('#addCollection').click(function(){
        var form = $(this).parents('form');
        var fields = form.serializeArray();
        var params = {};
        var pass=true;
        return jQuery.each(fields, function (i, field) {
            params[field.name] = field.value;
            if($.trim(field.value)==""){
                alertmsg("不能为空");
                return false;
            }
        });
        params.type = "addCollection";
        params._id = $(this).data('id');
        $.post("/api/photoFrames", params,
            function (data) {
                if (data.success) {
                    alert('更新成功')
                }
            });

        return false;
    });


    $('.intention-box').on('click','.photoFrames-delete-btn',function(){
        var params = {};
        var id=$(this).attr('data-id');
        params.type='deleteCollection';
        params.id=id;
        $.post("/api/photoFrames", params,
            function (data) {
                if (data.success) {
                    alertmsg("删除成功");
                }
            });
    });

    $('.intention-box').on('click','.deleteImg',function(){
        var that=$(this);
        var params = {};
        var imgId=$(this).attr('data-imgId');
        var collectionId=$(this).attr('data-collectionId');
        params.type='deleteImg';
        params.imgId=imgId;
        params.collectionId=collectionId;
        $.post("/api/photoFrames", params,
            function (data) {
                if (data.success) {
                    that.parent().remove();
                    alertmsg("删除成功");
                }
            });
    });


    function eachPhotoＦramesData(photoＦramesData,val){
        var obj={};
        for(var i=0;i<photoＦramesData.length;i++){
            if(photoＦramesData[i].title==val){
                obj=photoＦramesData[i];
                break;
            }
        }
        return obj;
    }
});



$(function () {
    $('.fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data.files)

        }
    });
});


