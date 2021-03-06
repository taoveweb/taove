/**
 * Created by Administrator on 2015/12/9 0009.
 */

(function(w){
    w.validate={
        phone:function(str){
            return /^1[3|4|5|7|8][0-9]\d{8}$/.test($.trim(str));
        },
        realName:function(str){
            return /^[\u4e00-\u9fa5]{1,5}$/.test($.trim(str));
        },
        email:function(str){
            return /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test($.trim(str));
        },
        fromTime:function(str){
            return /^(20)[0,1][0,1,2,3,4,5,6][0-9]{2}\d{2}$/.test($.trim(str));
        },
        singed:function(str){
            return /^[\u4e00-\u9fa5]{0,20}/.test($.trim(str));
        },
        city:function(str){
            return /^[\u4e00-\u9fa5]{2,10}$/.test($.trim(str));
        },
        title:function(str){
            return /^([\u4e00-\u9fa5]|\d){1,10}$/.test($.trim(str))
        },
        description:function(str){
            return /^([\u4E00-\u9FA5]|\w|（|）|\(|\)|"|'|\.|。|!|,|，|！|\d|\n|\r|、){1,500}$/.test($.trim(str.replace(''," ")));
        },
        password:function(str){
            return /^(\d|[A-Za-z]){6,10}$/.test($.trim(str))
        }

    }

})(window);


$(function() {
    $("img").lazyload({
        effect: "fadeIn",
        threshold : 200
    });
});