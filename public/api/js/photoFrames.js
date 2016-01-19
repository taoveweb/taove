/**
 * Created by kiiekin on 16/1/17.
 */
$(function () {

    $('.addTitle').on('blur', function () {
        var parent = $(this).parents('.users');
        var obj = eachPhotoframesData(photoＦramesData, $(this).val());
        parent.find('[name="size"]').val(obj.size);
        parent.find('[name="promise"]').val(obj.promise);
        parent.find('[name="stockNum"]').val(obj.stockNum);
        parent.find('[name="pageNum"]').val(obj.pageNum);
        parent.find('[name="price"]').val(obj.price);
        parent.find('[name="sort"]').val(obj.sort);

    });

    $('#addCollection').click(function () {
        var form = $(this).parents('form');
        var fields = form.serializeArray();
        var params = {};
        var pass = true;
        pass = jQuery.each(fields, function (i, field) {
            params[field.name] = field.value;
            if ($.trim(field.value) == "") {
                alertmsg("不能为空");
                return false;
            }
            return true;
        });
        params.type = "addCollection";
        params._id = $(this).data('id');
        if (pass) {
            $.post("/api/photoFrames", params,
                function (data) {
                    if (data.success) {
                        alertmsg(data.msg);
                        window.location.reload();
                    }
                });

        }
        return false;
    });


    $('.intention-box').on('click', '.photoFrames-delete-btn', function () {
        var params = {};
        var id = $(this).attr('data-id');
        params.type = 'deleteCollection';
        params.id = id;
        $.post("/api/photoFrames", params,
            function (data) {
                if (data.success) {
                    alertmsg("删除成功");
                }
            });
    });

    $('.intention-box').on('click', '.deleteImg', function () {
        var that = $(this);
        var params = {};
        var imgId = $(this).attr('data-imgId');
        var collectionId = $(this).attr('data-collectionId');
        params.type = 'deleteImg';
        params.imgId = imgId;
        params.collectionId = collectionId;
        $.post("/api/photoFrames", params,
            function (data) {
                if (data.success) {
                    that.parent().remove();
                    alertmsg("删除成功");
                }
            });
    });


    function eachPhotoframesData(photoframesData, val) {
        var obj = {};
        for (var i = 0; i < photoＦramesData.length; i++) {
            if (photoＦramesData[i].title == val) {
                obj = photoframesData[i];
                break;
            }
        }
        return obj;
    }
});


$(function () {

    //境加图片
    $('body').on('click', '.add-item-txt', function (event) {
        $(this).parent().find('.fileupload').trigger('click');
    })
    $('.fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            if(data.files.length){
                alertmsg("添加成功");
                window.location.reload();
            }
        }
    });


    //百度编缉器
    if ($('#editor1').length) {
        var ue = UE.getEditor('editor1');
        var param = "&type=lb&id=";
        ue.ready(function () {
            //阻止工具栏的点击向上冒泡
            $(this.container).click(function (e) {
                e.stopPropagation()
            });
        });
        $('.content').click(function (e) {
            var $target = $(this);
            var content = $target.html();
            var currentParnet = ue.container.parentNode.parentNode;
            var currentContent = ue.getContent();
            $target.html('');
            $target.append(ue.container.parentNode);
            ue.reset();
            param = "&type=" + $target.attr('type') + "&id=" + "";
            setTimeout(function () {
                ue.setContent(content);
            }, 200);
            $(currentParnet).html(currentContent);
        })


        //更新所有
        $('.intention-box').on('click', '.photoFrames-update-btn', function () {
            var form = $(this).parents('form');
            var fields = form.serializeArray();
            var pass=true;
            var params = {};
            jQuery.each(fields, function (i, field) {
                params[field.name] = field.value;
            });
            params.type = "updateCollection";
            params._id = $(this).data('id');
            delete params.editorValue;
            if (form.find("#editor1").length) {
                params.detail = ue.getContent()
            } else {
                params.detail = form.find('.content').html();
            }
            pass = jQuery.each(fields, function (i, field) {
                params[field.name] = field.value;
                if ($.trim(field.value) == "") {
                    alertmsg("不能为空");
                    return false;
                }
                return true;
            });
            if (pass) {
                $.post("/api/photoFrames", params,
                    function (data) {
                        alertmsg(data.msg, data);
                    });
            }

            return false;
        })
    }


});


