/**
 * Created by Administrator on 2015/12/21 0021.
 */
var db = require('../../models/db');
var Intention = db.Intention;
var Taove = db.Taove;
var path = require('path');
var ueditor = require("ueditor");
var co = require('co');
//相册性能需更改
/*function photoframesDetail(req, res, next) {
    co(function *(){
        var intention=yield Intention.find({}).exec();
        res.render('api/photoframes', {
            layout: "layout_api",
            title: "相册",
            intention:intention
        });
    });
}*/




module.exports =ueditor(path.join(__baseDir, 'uploads'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    console.log(req.query.type+'a------------');
    if (req.query.action === 'uploadimage') {

        // 这里你可以获得上传图片的信息
        var foo = req.ueditor;

        // 下面填写你要把图片保存到的路径 （ 以 path.join(__dirname, 'public') 作为根路径）
        var img_url ="/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url =img_url; // 要展示给客户端的文件夹路径
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        // 这里填写 ueditor.config.json 这个文件的路径
        res.redirect('/common/ueditorphp/config.json')
    }
});




