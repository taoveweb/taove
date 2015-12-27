$(function(){
    $('.createBtn').click(function(){
        $('.create-pop').fadeIn();
    })

    $('.uploadBtn').click(function(){
        $('.productionPop').fadeIn();
    })

    $('.close').click(function(){
        $(this).parents('.pop').fadeOut();
    })
})