/**
 * Created by Administrator on 2015/12/21 0021.
 */
var formidable = require('formidable');
var fs = require('fs');
var ObjectId = require('../../models/db').ObjectId;


function getPhotographer(req, res, next) {
    res.render('admin/photographer', {title: '摄影师申请入驻', layout: 'layout_pc'});
}
function postPhotographer(req, res, next) {
    console.log('postAlbum------------');

    var form = new formidable.IncomingForm();
    var dir="./uploads/images/"+ new Date().getFullYear()+ (new Date().getMonth()+1)+'/';
    if (fs.existsSync(dir)) {
        console.log('已经创建过此更新目录了');
    } else {
        fs.mkdirSync(dir);
    }

    form.uploadDir =dir;
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, function (err, fields, files) {
        var param = fields;
        var img = files.img;
        var name=new ObjectId();


        var ext = '';
        if (isValidFileName(files.qqfile.path)) {
            ext = getExt(files.qqfile.path);
        } else {
            // 错误处理
        }
        name+="." + ext;
        fs.renameSync(files.qqfile.path, dir +name);
        var imgS = [];
    });

    res.json({ok: 1});
    // res.render('admin/photographer', { title: '摄影师申请入驻',layout:'layout_pc' });
}


function getExt(filename) {
    var split = filename.split('.');
    return split[split.length - 1];
}
function isValidFileName(filename) {
    var split = filename.split('.');
    if (split.length < 2) {
        return false;
    }
    return true;
}


module.exports={
    get:getPhotographer,
    post:postPhotographer
}