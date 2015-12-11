/**
 * Created by Administrator on 2015/12/9 0009.
 */

(function(w){
    w.validate={
        phone:function(str){
            return /^1[3|4|5|7|8][0-9]\d{8}$/.test(str)
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