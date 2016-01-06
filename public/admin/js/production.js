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

    $("#title").on('keyup',function(){
        $('.charNum').html($(this).val().length+'/10');
    });
    //创建相册-------------------
    $('#createAlbumsBtn').click(function () {
        var valid = true;
        var that=$(this);
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
        if (phone&&!validate.phone(phone)) {
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
                photographyId:photographyId,
                title: title,
                phone: phone,
                description: description,
                city: city,
                style: style
            }, function (data) {
                console.log(data);
                if (data.ok == 1) {
                    window.setTimeout(function(){
                        that.parents('.pop').fadeOut();
                        window.location.href="/admin/production";
                    },1000)

                }
                parent.find('.responsemsg').html(data.msg);
            })
        }
        return false;
    });


});

var AlbumsImgId=$('.select-selected').attr('data-id');
var imgType=0;
$('.select-widget').on('click','.select-item',function(){
    var newnode=$(this).clone();
    $(newnode).addClass('select-selected');
    $('.select-selected').replaceWith($(newnode));
    AlbumsImgId=$(this).attr('data-id');

});


$('.typeselect').find('input').on('change',function(){
    imgType=$(this).val();
});
var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: '/admin/productionimg',
        params:{"AlbumsImgId":AlbumsImgId,'imgType':imgType}
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
        itemLimit: 5,
        sizeLimit: 15000000
    },
    autoUpload: false,
    debug: true
});

qq(document.getElementById("trigger-upload")).attach("click", function () {
    manualUploader.uploadStoredFiles();
});
