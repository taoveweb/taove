/**
 * Created by Administrator on 2015/12/9 0009.
 */

(function(w){
    w.validate={
        phone:function(str){
            return /^1[3|4|5|7|8][0-9]\d{8}$/.test(str);
        },
        realName:function(str){
            return /^[\u4e00-\u9fa5]{1,5}$/.test(str);
        },
        email:function(str){
            return /(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/.test(str);
        },
        fromTime:function(str){
            return /^(20)\d{2}\/[0-9]{1,2}\/\d{1,2}$/.test(str);
        },
        singed:function(str){
            return /^[\u4e00-\u9fa5]{0,20}/.test(str);
        },
        city:function(str){
            return /^[\u4e00-\u9fa5]{1,5}$/.test(str);
        },
        selfIntroduction:function(str){
            return /^[\u4e00-\u9fa5]{10,50}$/.test(str);
        },
        makeuperIntroduction:function(str){
            return /^[\u4e00-\u9fa5]{10,20}$/.test(str);
        },
        password:function(str){
            return /^(\d|[A-Za-z]){6,8}$/.test(str)
        }
    }

})(window);


$(function() {
    $("img").lazyload({
        effect: "fadeIn"
    });
});