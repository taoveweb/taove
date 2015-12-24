/**
 * Created by kiiekin on 15/12/24.
 */

$('.next-btn').click(function(){
    var current=parseInt($('#current').html());
    var total=parseInt($(this).parent().attr('total'));
    var next=current<total?current+1:current;
    document.location.href="/api/?p="+next;
});

$('.pre-btn').click(function(){
    var current=parseInt($('#current').html());
    var total=parseInt($(this).parent().attr('total'));
    var pre=current>1?current-1:current;
    document.location.href="/api/?p="+pre;
});

$('#search').click(function(){
    var application=$('.application').prop('checked');
    var parms='/api/?application=';
    var phone=$('#phone').val();
    var realName=$('#realName').val();
    parms+=application;
    if($.trim(phone)!=''){
        parms+='&phone='+phone;
    }
    if($.trim(realName)!=''){
        parms+='&realName='+realName;
    }
    document.location.href=parms;
});


$('body').on('click','.fixed',function(){
    var params=$(this).parents('form').serializeArray();
    var parent=$(this).parents('form');
    $.post('/api',{
        phone:$(this).attr('phone'),
        admin:parent.find('[name="admin"]').prop('checked'),
        approved:parent.find('[name="approved"]').prop('checked'),
        banned:parent.find('[name="banned"]').prop('checked'),
        application:parent.find('[name="application"]').prop('checked')
    },function(data){
       if(data.success){
           alert(data.msg)
       }else{
           alert(data.err)
       }
       //console.log(data);
    });
    return false;
});