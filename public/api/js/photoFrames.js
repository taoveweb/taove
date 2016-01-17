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

    $('#add').click(function(){
        var form = $(this).parents('form');
        var fields = form.serializeArray();
        var params = {};
        jQuery.each(fields, function (i, field) {
            params[field.name] = field.value;
        });
        params.type = "add";
        params._id = $(this).data('id');
        $.post("/api/photoFrames", params,
            function (data) {
                if (data.success) {
                    alert('更新成功')
                }
            });

        return false;
    })


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