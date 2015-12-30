/**
 * Created by Administrator on 2015/12/21 0021.
 */
var formidable = require('formidable');
var fs = require('fs');
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;

function getProduction(req, res, next) {
    res.render('admin/production', {title: '摄影作品', layout: 'layout_pc'});
}
function postProduction(req, res, next) {

    var params = req.body;
    var doc = {
        photographyId: params.photographyId,
        title: params.title,
        description: params.description,
        city: params.city,
        style: params.style
    };
    if (params.phone != "") {
        Taove.findOne({phone: params.phone}, "_id", function (err, taove) {
            doc.customerId = taove._id;
            if (!taove || err) {
                createPhotographyerAlbums(res,req,doc, '没有这个客户')
            } else {
                createPhotographyerAlbums(res,req,doc, '创建成功')
            }
        })
    } else {
        createPhotographyerAlbums(res,req,doc, '创建成功')
    }
}


function getProductiondetail(req, res, next) {
    res.render('admin/production_detail', {title: '摄影作品', layout: 'layout_pc'});
}
function postProductiondetail(req, res, next) {
    res.render('admin/production_detail', {title: '摄影作品', layout: 'layout_pc'});
}


function createPhotographyerAlbums(res,req,doc, msg) {
    Albums.create(doc, function (err, doc) {
        if (err || !doc) {
            res.json({ok: 0, err: err});
        } else {
            res.json({ok: 0, params: req.body, msg: msg});
        }
    })
}

function getPhotographer(req, res, next) {

    Taove.findOne({phone: req.session.userId['phone']}, function (err, taove) {


        var realName = taove.realName;
        if (realName) {
            realName = realName.substr(0, 1) + "*" + realName.substr(-1, 1);
        }
        var email = taove.email;
        if (email) {
            var emailIndex = email.indexOf('@');
            email = email.substr(0, 2) + "***" + email.substr(emailIndex);
        }

        var phone = taove.phone + '';
        var doc = {
            id: taove._id,
            approved: taove.approved,
            "realName": realName,
            "email": email,
            "phone": phone.substr(0, 7) + "***" + phone.substr(-1, 1),
            fromTime: taove.fromTime,
            singed: taove.singed,
            city: taove.city,
            selfIntroduction: taove.selfIntroduction,
            makeuperIntroduction: taove.makeuperIntroduction,
            goodStyle: taove.goodStyle,
            credentialsPhotoUrl: taove.credentialsPhotoUrl,
            application: taove.application
        };
        if (doc.application && !req.query.fix) {
            res.render('admin/photographer',
                {
                    title: '摄影师申请入驻',
                    "taove": doc,
                    application: 1,
                    layout: 'layout_pc'
                })
        } else {
            res.render('admin/photographer',
                {
                    title: '摄影师申请入驻',
                    "taove": doc,
                    application: 0,
                    layout: 'layout_pc'
                })
        }
    });

}
function postPhotographer(req, res, next) {
    console.log('postAlbum------------');

    if (!req.body.fromTime) {
        console.log('img');
        updateCredentialsPhotoUrl(req, res, next);
    } else {
        console.log('info');
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
                credentialsPhotoUrl: "/images/" + new Date().getFullYear() + (new Date().getMonth() + 1) + '/' + imgname
                //updated: new Date(new Date().getTime() + 60 * 60 * 8 * 1000)
            },
            function (err, doc) {
                console.log(err);
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
    console.log(req.body.fromTime);

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
            application: true
            //updated: new Date(new Date().getTime() + 60 * 60 * 8 * 1000)
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
    get: getProduction,
    post: postProduction,
    getdetail: getProductiondetail,
    postdetail: postProductiondetail
};



