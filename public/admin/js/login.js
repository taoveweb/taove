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
        $('#forget').animate({top: 0});
    })
    $('#forgetBack').on('click', function () {
        //('#forget').addClass('show');
        $('#forget').animate({top: '-100%'});
    })

});


//登录注册
$(function () {
    $('#register').click(function () {
        var that = $(this).parent();
        postLogin(that, 'r');
    });

    $('#login').click(function () {
        var that = $(this).parent();
        postLogin(that, 'l');
    });


    //触发登录点击事件
    $(document).keydown(function (e) {
        if (e.which === 13) {
            $('#login').trigger('click');
            e.preventDefault();
        }

    })


    function postLogin(that, s) {
        var parent = that;
        var phone_val = parent.find('.phone').val();
        var password_val = parent.find('.password').val();
        var pass = true;
        if (!validate.phone(phone_val)) {
            parent.find('.phone-validate').html('手机格试不正确');
            pass = false;
        }
        else {
            parent.find('.phone-validate').html('正常');
        }
        if (!validate.password(password_val)) {
            pass = false;
            parent.find('.password-validate').html('密码格式由6到8位字母和数字组成');
        } else {
            parent.find('.password-validate').html('正常');
        }

        if (pass) {
            $.post('/login', {phone: phone_val, password: password_val, type: s}, function (data) {
                if (data.ok == 1) {
                    parent.find('.responsemsg').html(data.msg);
                    if (s == "l") {
                        window.location.href = '/admin';
                    }
                } else {
                    parent.find('.responsemsg').html(data.msg);
                }
            })
        }
    }
});


