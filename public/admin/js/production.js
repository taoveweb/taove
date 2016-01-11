$(function () {
    $('.createBtn').click(function () {
        $('.create-pop').fadeIn();
    });

    $('.uploadBtn').click(function () {
        $('.productionPop').fadeIn();
    });

    $('.close').click(function () {
        $(this).parents('.pop').fadeOut();
    });

    $("#title").on('keyup', function () {
        $('.charNum').html($(this).val().length + '/10');
    });
    //创建相册-------------------
    $('#createAlbumsBtn').click(function () {
        var valid = true;
        var that = $(this);
        var parent = that.parents('form');
        var title = parent.find('input[name=title]').val();
        var phone = parent.find('input[name=phone]').val();
        var description = parent.find('[name=description]').val();
        var city = parent.find('select[name=city]').val();
        var style = parent.find('select[name=style]').val();


        if (!validate.title(title)) {
            $('.title').html('1到15个字的中文').parent().addClass('err');
            valid = false;
        } else {
            $('.title').html('通过').parent().removeClass('err');
        }
        if (phone && !validate.phone(phone)) {
            $('.phone').html('请填写正确的手机号码 或不填').parent().addClass('err');
            valid = false;
        } else {
            $('.phone').html('通过').parent().removeClass('err');
        }
        if (!validate.description(description)) {
            $('.description').html('1到200个字的中文').parent().addClass('err');
            valid = false;
        } else {
            $('.description').html('通过').parent().removeClass('err');
        }


        if (valid) {
            $.post('/admin/production', {
                photographyId: photographyId,
                title: title,
                phone: phone,
                description: description,
                city: city,
                style: style,
                type: 'create'
            }, function (data) {
                console.log(data);
                if (data.ok == 1) {
                    window.setTimeout(function () {
                        that.parents('.pop').fadeOut();
                        window.location.href = "/admin/production";
                    }, 1000)

                }
                parent.find('.responsemsg').html(data.msg);
            })
        }
        return false;
    });


});


//上机相册图片
var AlbumsId = $('.select-selected').attr('data-id') || location.search.split('=')[1];
var imgType = 0;
var imgNum = $('.select-selected').attr('imgNum') || imgNumdetail;
$('.select-widget').on('click', '.select-item', function () {
    var newnode = $(this).clone();
    $(newnode).addClass('select-selected');
    $('.select-selected').replaceWith($(newnode));
    AlbumsId = $(this).attr('data-id');

});


$('.typeselect').find('input').on('change', function () {
    imgType = $(this).val();
    console.log(imgType)
});
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        /*       customHeaders: {Connection:'close'},*/
        endpoint: '/admin/productionimg',
        params: {"AlbumsId": AlbumsId, 'imgType': imgType}
    },
    thumbnails: {
        placeholders: {
            placeholders: {
                waitingPath: '{{static}}common/fine-uploader/placeholders/waiting-generic.png',
                notAvailablePath: '{{static}}common/fine-uploader/placeholders/not_available-generic.png'
            }
        }
    },
    validation: {
        allowedExtensions: ['jpeg', 'jpg', 'png'],
        itemLimit: 10,
        sizeLimit: 1024 * 1024 * 10
    },
    autoUpload: false,
    debug: false,
    callbacks: {
        onComplete: function (id, name, responseJSON, maybeXhr) {
            console.log(responseJSON)
        },
        onAllComplete: function (successful, failed) {
            if(failed.length){
                alert("相册最多只能存150张,上传超了"+failed.length);
               window.location.reload();
            }
            if (!failed.length) {
                window.location.reload();
            }
        }
    }
});

qq(document.getElementById("trigger-upload")).attach("click", function () {
    if (imgNum < 200) {
        var params = {"AlbumsId": AlbumsId, 'imgType': imgType};
        manualUploader.setParams(params);
        manualUploader.uploadStoredFiles();
    } else {
        alert("最多只能上传200张图片哦")
    }

});


//删除相册图片
$('.panel').on('click', ".delete", function () {
    var _id = $(this).parent().attr('data-id');
    var that = $(this);

    $.post("/admin/production", {_id: _id, type: "delete"},
        function (data) {
            if (data.success) {
                that.parents('.item').remove();
                if($('.current').hasClass('grid1')){
                    $grid1.isotope('layout');
                }else{
                    $grid2.isotope('layout');
                }

            }
        });
});


//设置为封面
$('.panel').on('click', ".cover", function () {
    var _id = $(this).parent().attr('data-id');
    var albumsId=window.location.search.split('=')[1];
    var that = $(this);

    $.post("/admin/production", {_id: _id, albumsId:albumsId,type: "cover"},
        function (data) {
            if (data.success) {
                alert('封面设置成功')
            }
        });
});


//瀑布流


var $grid1 = $('.grid1').isotope({
    itemSelector: '.grid-item'
});

var $grid2 = $('.grid2').isotope({
    itemSelector: '.grid-item'
});