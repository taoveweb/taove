/**
 * Created by kiiekin on 15/12/24.
 */

$('.next-btn').click(function(){
    var current=parseInt($(this).parent().attr('current'));
    var total=parseInt($(this).parent().attr('total'));
    var next=current<total?current+1:current;
    $(this).parent().attr('current',next);
    document.location.href="/api/?p="+next;
})

$('.next-pre').click(function(){
    var current=parseInt($(this).parent().attr('current'));
    var total=parseInt($(this).parent().attr('total'));
    var pre=current>0?current-1:current;
    $(this).parent().attr('current',pre);
    document.location.href="/api/?p="+pre;
})
