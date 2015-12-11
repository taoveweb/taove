/**
 * Created by Administrator on 2015/12/11 0011.
 */
$(function(){
    var validate=true;
    $('form').submit(function(e) {
       var param=$(this).serializeArray();
        for(var i= 0,l=param.length;i<l;i++){
            validateHadler(param[i]['name'],param[i]['vlaue']);
        }
        return false;
    });

    function validateHadler(name,value){
        switch (name){
            case 'realName':
                if(!validate(value)){
                    $('.realName').html('1到5个字的中文组字');
                }else{
                    $('.realName').html('通过');
                }
                break;
            case 'phone':
                if(!validate(value)){
                    $('.phone').html('手机号码填的不正确');
                }else{
                    $('.phone').html('通过');
                }
                break;
            case 'email':
                if(!validate(value)){
                    $('.email').html('电子邮箱不正确如：exapmle@taove.com');
                }else{
                    $('.email').html('通过');
                }
                break;
            case 'fromTime':
                if(!validate(value)){
                    $('.fromTime').html('从业时间不正确如：2015/7/8');
                }else{
                    $('.fromTime').html('通过');
                }
                break;
            case 'singed':
                if(!validate(value)){
                    $('.singed').html('签名为1到20个字符的中文');
                }else{
                    $('.singed').html('通过');
                }
                break;
            case 'city':
                if(!validate(value)){
                    $('.city').html('1到5个字的中文组字');
                }else{
                    $('.city').html('通过');
                }
                break;
            case 'selfIntroduction':
                if(!validate(value)){
                    $('.selfIntroduction').html('10到50个字的中文组字');
                }else{
                    $('.selfIntroduction').html('通过');
                }
                break;
            case 'makeuperIntroduction':
                if(!validate(value)){
                    $('.makeuperIntroduction').html('10到20个字的中文组字');
                }else{
                    $('.makeuperIntroduction').html('通过');
                }
                break;
            default:
                break;
        }
    }
});
