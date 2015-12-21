/**
 * Created by Administrator on 2015/12/21 0021.
 */
var formidable = require('formidable');
var fs = require('fs');
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;


function getPhotographer(req, res, next) {

    Taove.findOne({phone: req.session.userId['phone']}, function (err, doc) {
        if (doc.application && !req.query.fix) {
            res.render('admin/photographer',
                {
                    title: '摄影师申请入驻',
                    taove:doc,
                    application:true,
                    layout: 'layout_pc'
                })
        } else {
            res.render('admin/photographer',
                {
                    title: '摄影师申请入驻',
                    taove:doc,
                    application:false,
                    layout: 'layout_pc'
                })
        }
    });

}
function postPhotographer(req, res, next) {
    console.log('postAlbum------------');

    if (!req.body.realName) {
        console.log('这是提交图片');
        updateCredentialsPhotoUrl(req, res, next);
    } else {
        console.log('这是申请摄影师信息');
        update(req, res)
    }


    // res.render('admin/photographer', { title: '摄影师申请入驻',layout:'layout_pc' });
}


//证件照
function updateCredentialsPhotoUrl(req, res, next) {
    var form = new formidable.IncomingForm();
    var dir = "./uploads/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/';
    if (fs.existsSync(dir)) {
        console.log('已经创建过此更新目录了');
    } else {
        fs.mkdirSync(dir);
    }

    form.uploadDir = dir;
    form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.multiples = true;

    form.parse(req, function (err, fields, files) {
        var param = fields;
        var img = files.img;
        var imgname = new ObjectId();
        var ext = '';
        if (isValidFileName(files.qqfile.path)) {
            ext = getExt(files.qqfile.path);
        } else {
            // 错误处理
        }
        imgname += "." + ext;
        fs.renameSync(files.qqfile.path, dir + imgname);
        Taove.findOneAndUpdate(
            {phone: req.session.userId['phone']},
            {
                credentialsPhotoUrl: "/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/' + imgname,
                updated: new Date()
            },
            function (err, doc) {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: '提交图片失败'
                    });
                } else {
                    console.log('提交图片成功');
                    res.json({
                        success: true,
                        msg: '提交图片成功'
                    });
                }
            })

        //update(req)
    });
}


function update(req, res) {

    Taove.update({phone: req.session.userId['phone']},
        {
            realName: req.body.realName,
            email: req.body.email,
            fromTime: req.body.fromTime,
            singed: req.body.singed,
            city: req.body.city,
            selfIntroduction: req.body.selfIntroduction,
            makeuperIntroduction: req.body.makeuperIntroduction,
            goodStyle: req.body.goodStyle,
            application: true,
            updated: new Date()
        }, function (err, doc) {
            if (err) {
                console.log(err)
            } else {
                console.log('申请提交成功');
                res.json({
                    ok: 1,
                    success: true,
                    msg: '申请提交成功'
                });
            }
        })
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


module.exports = {
    get: getPhotographer,
    post: postPhotographer
};



