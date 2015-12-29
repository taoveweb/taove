/**
 * Created by Administrator on 2015/12/11 0011.
 */
$(function () {
    var valid;
    $('form').submit(function () {
        valid = true;
        var param = $(this).serializeArray();
        for (var i = 0, l = param.length; i < l; i++) {
            validateHadler(param[i]['name'], param[i]['value'])
        }
        if (valid) {
            $.post("/admin/photographer", param, function (data) {
                    if(data.success){

                    }

                    if (!data.success) {
                        $('.submit').html('提交信息有误').parent().addClass('err');
                        valid = false;

                    } else {
                        document.location.href='/admin/photographer';
                        $('.submit').html('提交申请成功正在审批').parent().removeClass('err');
                    }
                }
            )
        }

        return false;
    });

    function validateHadler(name, value) {
        switch (name) {
            case 'realName':
                if (!validate.realName(value)) {
                    $('.realName').html('1到5个字的中文组字').parent().addClass('err');
                    valid = false;

                } else {
                    $('.realName').html('通过').parent().removeClass('err');
                }
                break;
            /*            case 'phone':
             if (!validate.phone(value)) {
             $('.phone').html('手机号码填的不正确').parent().addClass('err');
             valid = false;
             } else {
             $('.phone').html('通过').parent().removeClass('err');
             }
             break;*/
            case 'email':
                if (!validate.email(value)) {
                    $('.email').html('电子邮箱不正确如：exapmle@taove.com').parent().addClass('err');
                    valid = false;
                } else {
                    $('.email').html('通过').parent().removeClass('err');
                }
                break;
            case 'fromTime':
                if (!validate.fromTime(value)) {
                    $('.fromTime').html('从业时间不正确如：20150708').parent().addClass('err');
                    valid = false;
                } else {
                    $('.fromTime').html('通过').parent().removeClass('err');
                }
                break;
            case 'singed':
                if (!validate.singed(value)) {
                    $('.singed').html('签名为0到20个字符的中文').parent().addClass('err');
                    valid = false;
                } else {
                    $('.singed').html('通过').parent().removeClass('err');
                }
                break;
            case 'city':
                if (!validate.city(value)) {
                    $('.city').html('1到5个字的中文组字').parent().addClass('err');
                    valid = false;
                } else {
                    $('.city').html('通过').parent().removeClass('err');
                }
                break;
            case 'selfIntroduction':
                if (!validate.description(value)) {
                    $('.selfIntroduction').html('不能有非法字符').parent().addClass('err');
                    valid = false;
                } else {
                    $('.selfIntroduction').html('通过').parent().removeClass('err');
                }
                break;
            case 'makeuperIntroduction':
                if (!validate.description(value)) {
                    $('.makeuperIntroduction').html('不能有非法字符').parent().addClass('err');
                    valid = false;
                } else {
                    $('.makeuperIntroduction').html('通过').parent().removeClass('err');
                }
                break;
        };

    }
});













