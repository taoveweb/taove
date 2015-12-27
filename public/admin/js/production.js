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







var manualUploader = new qq.FineUploader({
    element: document.getElementById('fine-uploader-manual-trigger'),
    template: 'qq-template-manual-trigger',
    request: {
        endpoint: '/admin/production'
    },
    thumbnails: {
        placeholders: {
            waitingPath: '/source/placeholders/waiting-generic.png',
            notAvailablePath: '/source/placeholders/not_available-generic.png'
        }
    },
    validation: {
        allowedExtensions: ['jpeg', 'jpg', 'png'],
        itemLimit: 5,
        sizeLimit: 15000000
    },
    autoUpload: false,
    debug: true
});

qq(document.getElementById("trigger-upload")).attach("click", function() {
    manualUploader.uploadStoredFiles();
});
