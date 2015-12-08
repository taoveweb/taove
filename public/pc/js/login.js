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

});


//注册
$(function(){
  $('#register').click(function(){
     var phone_val=$('#registerPhone').val();
     var password_val=$('#registerPassword').val();
      if(!/^1[3|4|5|7|8][0-9]\d{8}$/.test(phone_val)){
        $('.phone-validate').html('手机格试不正确')
      }
      else{
          $('.phone-validate').html('正常')
      }
      if(!/^(\d|[A-Za-z]){6,8}$/.test(password_val)){
          $('.password-validate').html('密码格式由6到8位字母和数字组成')
      }else{
          $('.password-validate').html('正常')
      }
      $.post('/login', { phone: phone_val, password: password_val,type:'r'},function(data){

      })
  });
});
