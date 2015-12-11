/**
 * Created by Administrator on 2015/12/11 0011.
 */
$(function(){
    var validate=true;
    $('form').submit(function() {
       var param=$(this).serializeArray();
        for(var i= 0,l=param.length;i<l;i++){
            validateHadler(param[i]['name'],param[i]['value']);
        }

        if (validate){
            $.post("/admin/photographer", param ,function(data){
                    console.log(data);
                }
            )
        }

        return false;
    });

    function validateHadler(name,value){
        switch (name){
            case 'realName':
                if(!validate.realName(value)){
                    $('.realName').html('1到5个字的中文组字');
                    validate=false;
                                    }else{
                    $('.realName').html('通过');
                }
                break;
            case 'phone':
                if(!validate.phone(value)){
                    $('.phone').html('手机号码填的不正确');
                    validate=false;
                }else{
                    $('.phone').html('通过');
                }
                break;
            case 'email':
                if(!validate.email(value)){
                    $('.email').html('电子邮箱不正确如：exapmle@taove.com');
                    validate=false;
                }else{
                    $('.email').html('通过');
                }
                break;
            case 'fromTime':
                if(!validate.fromTime(value)){
                    $('.fromTime').html('从业时间不正确如：2015/7/8');
                    validate=false;
                }else{
                    $('.fromTime').html('通过');
                }
                break;
            case 'singed':
                if(!validate.singed(value)){
                    $('.singed').html('签名为0到20个字符的中文');
                    validate=false;
                }else{
                    $('.singed').html('通过');
                }
                break;
            case 'city':
                if(!validate.city(value)){
                    $('.city').html('1到5个字的中文组字');
                    validate=false;
                }else{
                    $('.city').html('通过');
                }
                break;
            case 'selfIntroduction':
                if(!validate.selfIntroduction(value)){
                    $('.selfIntroduction').html('10到50个字的中文组字');
                    validate=false;
                }else{
                    $('.selfIntroduction').html('通过');
                }
                break;
            case 'makeuperIntroduction':
                if(!validate.makeuperIntroduction(value)){
                    $('.makeuperIntroduction').html('10到20个字的中文组字');
                    validate=false;
                }else{
                    $('.makeuperIntroduction').html('通过');
                }
                break;
            default:
                break;
        }
    }
});
