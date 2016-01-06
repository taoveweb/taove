/**
 * Created by Administrator on 2015/12/21 0021.
 */
var formidable = require('formidable');
var fs = require('fs');
var db = require('../../models/db');
var ObjectId = db.ObjectId;
var Taove = db.Taove;
var Albums = db.Albums;
var AlbumsImg = db.AlbumsImg;

function getProduction(req, res, next) {
    Albums.find({photographyId: req.session.userId['_id']}, function (err, doc) {
        if (err) next(err);
        res.render('admin/production', {title: '摄影作品', taove: doc, detail:false, layout: 'layout_pc'});
    });
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
                createPhotographyerAlbums(res, req, doc, '没有这个客户')
            } else {
                createPhotographyerAlbums(res, req, doc, '创建成功')
            }
        })
    } else {
        createPhotographyerAlbums(res, req, doc, '创建成功')
    }
}

function getProductiondetail(req, res, next) {
    res.render('admin/production_detail', {title: '摄影作品',detail:true, layout: 'layout_pc'});
}


function createPhotographyerAlbums(res, req, doc, msg) {
    Albums.create(doc, function (err, doc) {
        if (err || !doc) {
            res.json({ok: 0, err: err});
        } else {
            res.json({ok: 1, params: req.body, msg: msg});
        }
    });
}


//证件照
function postProductionimg(req, res, next) {
    console.log(req)
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
        var imgname = new ObjectId();
        var ext = '';
        if (isValidFileName(files.qqfile.path)) {
            ext = getExt(files.qqfile.path);
        } else {
            // 错误处理
        }
        imgname += "." + ext;
        console.log(files)
        fs.renameSync(files.qqfile.path, dir + imgname);
/*
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
            })*/
    });
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
    postimg: postProductionimg
};



